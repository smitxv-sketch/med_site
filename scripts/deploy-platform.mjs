#!/usr/bin/env node
/**
 * Оркестратор деплоя платформы «Источник».
 *
 * Нормальный поток (без шоу):
 *   1. npm run ci:platform          — сборка до push
 *   2. git push origin main         — Coolify GitHub App подхватывает коммит
 *   3. npm run deploy:wait          — дождаться очереди (опционально)
 *   4. npm run smoke:prod           — проверка снаружи
 *
 * Ручной триггер (если webhook не сработал):
 *   COOLIFY_URL=... COOLIFY_API_TOKEN=... npm run deploy:platform
 *
 * Флаги:
 *   --dry-run       только план, без API
 *   --skip-ci       не гонять ci-platform перед деплоем
 *   --only=site-ci  один сервис из manifest
 *   --no-wait       не ждать завершения
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'infra/platform.manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const args = new Set(process.argv.slice(2));
const dryRun = args.has('--dry-run');
const skipCi = args.has('--skip-ci');
const noWait = args.has('--no-wait');
const onlyArg = [...args].find((a) => a.startsWith('--only='));
const onlyName = onlyArg?.split('=')[1];

const coolifyUrl = (process.env.COOLIFY_URL ?? '').replace(/\/$/, '');
const coolifyToken = process.env.COOLIFY_API_TOKEN ?? '';

function appsToDeploy() {
  const order = manifest.deployOrder.filter((name) => manifest.applications[name]);
  if (onlyName) {
    if (!manifest.applications[onlyName]) {
      console.error(`[deploy] unknown app: ${onlyName}`);
      process.exit(1);
    }
    return [onlyName];
  }
  return order;
}

async function coolifyFetch(pathname, init = {}) {
  if (!coolifyUrl || !coolifyToken) {
    throw new Error('COOLIFY_URL и COOLIFY_API_TOKEN обязательны для API-деплоя');
  }
  const res = await fetch(`${coolifyUrl}${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${coolifyToken}`,
      Accept: 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new Error(`Coolify ${res.status} ${pathname}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }
  return body;
}

async function triggerDeploy(appUuid) {
  // Coolify v4: GET /api/v1/deploy?uuid=...
  return coolifyFetch(`/api/v1/deploy?uuid=${encodeURIComponent(appUuid)}&force=false`, {
    method: 'GET',
  });
}

async function waitForApp(appName, appUuid, timeoutMs = 45 * 60 * 1000) {
  const started = Date.now();
  console.log(`[deploy] waiting ${appName} (${appUuid})...`);

  while (Date.now() - started < timeoutMs) {
    const list = await coolifyFetch(
      `/api/v1/applications/${appUuid}/deployments?page=1&per_page=1`,
    );
    const dep = list?.data?.[0] ?? list?.[0];
    const status = dep?.status ?? dep?.deployment_status;
    if (status === 'finished' || status === 'success') {
      console.log(`[deploy] OK ${appName}`);
      return true;
    }
    if (status === 'failed' || status === 'error') {
      console.error(`[deploy] FAIL ${appName}:`, dep?.commit_message ?? status);
      return false;
    }
    await new Promise((r) => setTimeout(r, 15_000));
  }
  console.error(`[deploy] TIMEOUT ${appName}`);
  return false;
}

function printPlan() {
  console.log('\n=== Deploy plan (infra/platform.manifest.json) ===\n');
  for (const name of appsToDeploy()) {
    const app = manifest.applications[name];
    console.log(`  ${name}`);
    console.log(`    uuid: ${app.uuid}`);
    console.log(`  watch: ${(app.watchPaths ?? []).join(', ')}`);
    if (app.dependsOn?.length) {
      console.log(`    depends: ${app.dependsOn.join(', ')}`);
    }
  }
  console.log('\nРекомендуемый поток: push в main → webhook Coolify → smoke:prod');
  console.log('Секреты: см. infra/coolify.env.example (только в Coolify UI)\n');
}

async function main() {
  printPlan();

  if (dryRun) {
    console.log('[deploy] dry-run — выход');
    return;
  }

  if (!skipCi) {
    const ci = spawnSync(process.execPath, ['scripts/ci-platform.mjs', '--skip-install'], {
      cwd: root,
      stdio: 'inherit',
    });
    if (ci.status !== 0) process.exit(ci.status ?? 1);
  }

  if (!coolifyUrl || !coolifyToken) {
    console.log(
      '[deploy] COOLIFY_URL / COOLIFY_API_TOKEN не заданы — делайте git push origin main',
    );
    console.log('[deploy] Coolify GitHub App задеплоит приложения по watch_paths');
    return;
  }

  let ok = true;
  for (const name of appsToDeploy()) {
    const app = manifest.applications[name];
    console.log(`\n[deploy] trigger ${name}...`);
    await triggerDeploy(app.uuid);
    if (!noWait) {
      const passed = await waitForApp(name, app.uuid);
      if (!passed) ok = false;
    }
  }

  if (!ok) process.exit(1);

  if (!noWait) {
    const smoke = spawnSync(process.execPath, ['scripts/smoke-platform.mjs', '--prod'], {
      cwd: root,
      stdio: 'inherit',
    });
    process.exit(smoke.status ?? 0);
  }
}

main().catch((err) => {
  console.error('[deploy]', err);
  process.exit(1);
});
