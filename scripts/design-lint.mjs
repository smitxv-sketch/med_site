/**
 * Fail CI if hardcoded HEX found outside whitelist.
 * Usage: node scripts/design-lint.mjs
 */
import fs from 'fs';
import path from 'path';

const WHITELIST = [
  /src[\\/]shared[\\/]config[\\/]designTokens\.ts$/,
  /src[\\/]index\.css$/,
  /src[\\/]app[\\/]styles[\\/]accessibility\.css$/,
  /src[\\/]widget[\\/]/,
];

const exts = new Set(['.tsx', '.ts', '.css']);
const skip = /node_modules|dist|design_audit/;
const hexRe = /#([0-9a-fA-F]{3,8})\b/g;

function isWhitelisted(file) {
  const norm = file.replace(/\\/g, '/');
  return WHITELIST.some((re) => re.test(norm));
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (skip.test(p)) continue;
    if (e.isDirectory()) walk(p, files);
    else if (exts.has(path.extname(e.name))) files.push(p);
  }
  return files;
}

const violations = [];

for (const file of walk('src')) {
  const rel = file.replace(/\\/g, '/');
  if (isWhitelisted(rel)) continue;

  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    hexRe.lastIndex = 0;
    let m;
    while ((m = hexRe.exec(line))) {
      violations.push({ file: rel, line: i + 1, hex: '#' + m[1], context: line.trim().slice(0, 100) });
    }
  });
}

if (violations.length > 0) {
  console.error(`design-lint: ${violations.length} hardcoded HEX violation(s):\n`);
  for (const v of violations.slice(0, 50)) {
    console.error(`  ${v.file}:${v.line}  ${v.hex}  ${v.context}`);
  }
  if (violations.length > 50) {
    console.error(`  ... and ${violations.length - 50} more`);
  }
  process.exit(1);
}

console.log('design-lint: OK — no hardcoded HEX outside whitelist');
