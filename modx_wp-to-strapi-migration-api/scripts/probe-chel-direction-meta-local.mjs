#!/usr/bin/env node
/**
 * Локальный probe termmeta (минуя полный bridge-server).
 * Требует CHEL_DB_* в infra/env/legacy-bridge-istochnik.env
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getChelDirectionMetaProbe, listChelDirectionMetaInventory } from '../server/services/chelDirectionMeta.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function loadEnv(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    if (!process.env[key]) process.env[key] = t.slice(eq + 1).trim();
  }
}

loadEnv('infra/env/legacy-bridge-istochnik.env');

const termId = Number(process.argv[2] || 569);
const inventory = process.argv.includes('--inventory');

if (inventory) {
  const rows = [];
  let offset = 0;
  const limit = 25;
  while (true) {
    const chunk = await listChelDirectionMetaInventory(limit, offset);
    rows.push(...chunk);
    if (chunk.length < limit) break;
    offset += limit;
    await new Promise((r) => setTimeout(r, 500));
  }
  const withBlock = rows.filter((r) => r.hasDoctorMeta || r.hasIntroMeta);
  const out = path.join(ROOT, 'docs', 'mappings', 'chel-direction-meta-inventory.json');
  fs.writeFileSync(
    out,
    JSON.stringify({ generatedAt: new Date().toISOString(), total: rows.length, withBlock: withBlock.length, rows }, null, 2),
  );
  console.log(`inventory: ${rows.length} terms, ${withBlock.length} with doctor/intro meta`);
  console.log('saved', out);
  process.exit(0);
}

const data = await getChelDirectionMetaProbe(termId);
if (!data) {
  console.error('Direction not found:', termId);
  process.exit(1);
}

const out = path.join(ROOT, 'docs', 'mappings', `chel-direction-meta-${termId}.json`);
fs.writeFileSync(out, JSON.stringify({ data }, null, 2));
console.log(JSON.stringify(data, null, 2));
console.log('saved', out);
