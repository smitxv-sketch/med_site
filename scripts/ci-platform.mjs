#!/usr/bin/env node
/**
 * Единый CI-контур платформы (локально и в GitHub Actions).
 * Ловит React dedupe (#31) и ошибки сборки ДО деплоя.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(cmd, args, label) {
  console.log(`\n[ci] ${label}: ${cmd} ${args.join(' ')}`);
  const res = spawnSync(cmd, args, { cwd: root, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`[ci] FAIL: ${label}`);
    process.exit(res.status ?? 1);
  }
}

const skipInstall = process.argv.includes('--skip-install');

if (!skipInstall) {
  run(npm, ['install', '--legacy-peer-deps', '--ignore-scripts'], 'install');
}

run(process.execPath, [path.join(root, 'scripts/dedupe-react.mjs')], 'dedupe-react');
run(npm, ['run', 'build:packages'], 'packages');
run(npm, ['run', 'build', '-w', '@med-site/bff'], 'bff');
run(npm, ['run', 'build', '-w', '@med-site/web'], 'web');
run(npm, ['run', 'build', '-w', '@med-site/studio'], 'studio');

console.log('\n[ci] OK — platform + studio build passed');
