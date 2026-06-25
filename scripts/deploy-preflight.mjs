#!/usr/bin/env node
/**
 * Deploy preflight — ловит классы ошибок ДО push/Coolify.
 *
 * Классы (история 2026-06):
 * A) Общий .dockerignore исключает пути, нужные другому Dockerfile (studio/cms)
 * B) ci:platform = npm build, не docker build → A не ловился
 * C) Дублирование тяжёлых RUN apk в параллельных стадиях → OOM на сервере
 * D) smoke:prod без skip BFF → ложные 6/8
 *
 * Запуск: node scripts/deploy-preflight.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Пути, обязательные для COPY в каждом Dockerfile (контекст = корень monorepo) */
const DOCKER_APPS = [
  {
    name: 'site-ci',
    dockerfile: 'apps/platform/Dockerfile',
    requiredPaths: [
      'apps/web',
      'apps/bff',
      'packages/contracts',
      'packages/page-engine',
      'src',
      'scripts/dedupe-react.mjs',
      'scripts/start-platform.mjs',
      'package.json',
    ],
  },
  {
    name: 'studio-istochnik',
    dockerfile: 'apps/studio/Dockerfile',
    requiredPaths: [
      'apps/studio',
      'packages/contracts',
      'packages/page-engine',
      'src',
      'scripts/dedupe-react.mjs',
      'package.json',
    ],
    /** Стадия build не должна ставить apk (только deps) — иначе OOM на Coolify */
    forbidApkInBuildStage: true,
  },
  {
    name: 'strapi-istochnik',
    dockerfile: 'apps/cms/Dockerfile',
    requiredPaths: ['apps/cms', 'packages/contracts', 'package.json'],
    forbidApkInBuildStage: true,
  },
];

function loadDockerignoreLines() {
  const raw = fs.readFileSync(path.join(root, '.dockerignore'), 'utf8');
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#') && !l.startsWith('!'));
}

/** Упрощённая проверка: путь попадает под правило dockerignore */
function isIgnored(relPath, rules) {
  const p = relPath.replace(/\\/g, '/');
  for (const rule of rules) {
    if (rule.includes('*')) {
      const prefix = rule.replace(/\*\*/g, '').replace(/\*/g, '');
      if (p.includes(prefix.replace(/\/$/, ''))) return true;
      continue;
    }
    if (p === rule || p.startsWith(`${rule}/`)) return true;
  }
  return false;
}

function checkDockerignore() {
  const rules = loadDockerignoreLines();
  const errors = [];

  for (const app of DOCKER_APPS) {
    for (const req of app.requiredPaths) {
      if (!fs.existsSync(path.join(root, req))) {
        errors.push(`[${app.name}] missing on disk: ${req}`);
        continue;
      }
      if (isIgnored(req, rules)) {
        errors.push(
          `[${app.name}] .dockerignore blocks required path: ${req} (see ${app.dockerfile})`,
        );
      }
    }
  }

  return errors;
}

function checkNoDuplicateApkInBuild() {
  const errors = [];
  for (const app of DOCKER_APPS) {
    if (!app.forbidApkInBuildStage) continue;
    const df = fs.readFileSync(path.join(root, app.dockerfile), 'utf8');
    const buildBody =
      df.match(/FROM node:\d+-alpine AS build\n([\s\S]*?)(?=\nFROM )/)?.[1] ?? '';
    if (/RUN apk add/.test(buildBody)) {
      errors.push(
        `[${app.name}] Dockerfile build stage must not RUN apk add (OOM risk; g++ only in deps)`,
      );
    }
  }
  return errors;
}

function main() {
  console.log('[preflight] deploy checks…\n');
  const errors = [...checkDockerignore(), ...checkNoDuplicateApkInBuild()];

  for (const app of DOCKER_APPS) {
    const blocked = app.requiredPaths.filter((req) =>
      isIgnored(req, loadDockerignoreLines()),
    );
    console.log(
      `  ${app.name}: ${blocked.length ? 'BLOCKED ' + blocked.join(', ') : 'OK'}`,
    );
  }

  if (errors.length) {
    console.error('\n[preflight] FAIL:\n' + errors.map((e) => `  - ${e}`).join('\n'));
    process.exit(1);
  }

  console.log('\n[preflight] OK — docker context + Dockerfile guards passed');
}

main();
