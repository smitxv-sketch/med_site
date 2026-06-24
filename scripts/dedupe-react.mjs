#!/usr/bin/env node
/**
 * Удаляем вложенные копии react/react-dom в apps/web — иначе Next SSR ловит React #31.
 * Удаляем ТОЛЬКО если react уже есть в корневом node_modules.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rootReact = path.join(root, 'node_modules/react/package.json');

if (!fs.existsSync(rootReact)) {
  console.log('[dedupe-react] skip: root react not installed yet');
  process.exit(0);
}

const rootVersion = JSON.parse(fs.readFileSync(rootReact, 'utf8')).version;
console.log('[dedupe-react] root react', rootVersion);

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
