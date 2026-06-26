#!/usr/bin/env node
/** Обёртка для e2e:prod (кроссплатформенно задаёт SMOKE_ENV). */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isProd = process.argv.includes('--prod');
const env = { ...process.env };
if (isProd) env.SMOKE_ENV = 'prod';

const res = spawnSync(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['playwright', 'test', '-c', 'e2e/playwright.config.ts', ...process.argv.slice(2).filter((a) => a !== '--prod')],
  { cwd: root, stdio: 'inherit', env, shell: process.platform === 'win32' },
);

process.exit(res.status ?? 1);
