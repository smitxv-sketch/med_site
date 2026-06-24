#!/usr/bin/env node
/**
 * Удаляем вложенные копии react/react-dom в apps/web — иначе Next SSR ловит React #31.
 * Вызывается из nixpacks после npm install.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nested = [
  path.join(root, 'apps/web/node_modules/react'),
  path.join(root, 'apps/web/node_modules/react-dom'),
  path.join(root, 'apps/web/node_modules/scheduler'),
];

for (const dir of nested) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log('[dedupe-react] removed', path.relative(root, dir));
  }
}

const rootReact = path.join(root, 'node_modules/react/package.json');
if (fs.existsSync(rootReact)) {
  const v = JSON.parse(fs.readFileSync(rootReact, 'utf8')).version;
  console.log('[dedupe-react] root react', v);
} else {
  console.warn('[dedupe-react] WARN: root react not found');
  process.exit(1);
}
