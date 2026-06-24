#!/usr/bin/env node
/**
 * Прод-старт: BFF + Next.js web (monorepo platform).
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = process.env.PORT ?? '3002';
const bffPort = process.env.BFF_PORT ?? '3001';

process.env.BFF_INTERNAL_URL = process.env.BFF_INTERNAL_URL ?? `http://127.0.0.1:${bffPort}`;
process.env.NEXT_PUBLIC_BFF_URL = process.env.NEXT_PUBLIC_BFF_URL ?? process.env.BFF_INTERNAL_URL;

function run(cmd, args, cwd, label) {
  const child = spawn(cmd, args, {
    cwd,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env },
  });
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[platform] ${label} exited with ${code}`);
      process.exit(code);
    }
  });
  return child;
}

// BFF
run('node', ['dist/index.js'], path.join(root, 'apps/bff'), 'bff');

// Next (слушает PORT для Coolify)
setTimeout(() => {
  run(
    'npx',
    ['next', 'start', '-H', '0.0.0.0', '-p', String(port)],
    path.join(root, 'apps/web'),
    'web',
  );
}, 2000);

console.log(`PLATFORM_READY bff:${bffPort} web:${port}`);
