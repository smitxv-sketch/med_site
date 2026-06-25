#!/usr/bin/env node
/**
 * Локальная проверка Docker-сборки site-ci (класс B в DEPLOY_FAILURE_CLASSES.md).
 * Не заменяет ci:platform — дополняет перед деплоем при смене Dockerfile/.dockerignore.
 *
 * Usage:
 *   npm run preflight:docker:site
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const image = 'med-site-platform-preflight:local';

function run(label, cmd, args) {
  console.log(`\n[docker-preflight] ${label}: ${cmd} ${args.join(' ')}`);
  const res = spawnSync(cmd, args, { cwd: root, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`[docker-preflight] FAIL: ${label}`);
    process.exit(res.status ?? 1);
  }
}

run('build', 'docker', ['build', '-f', 'apps/platform/Dockerfile', '-t', image, '.']);
console.log('\n[docker-preflight] OK — platform Docker image builds locally');
