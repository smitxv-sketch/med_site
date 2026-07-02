#!/usr/bin/env node
/**
 * Probe блока врача на рубрике ЧЛБ через bridge.
 *
 *   node scripts/probe-chel-direction-meta.mjs
 *   node scripts/probe-chel-direction-meta.mjs 569
 *   node scripts/probe-chel-direction-meta.mjs --inventory
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

const TOKEN = process.env.BRIDGE_API_TOKEN || process.env.LEGACY_BRIDGE_TOKEN;
const BASE = (process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru').replace(/\/$/, '');

async function bridgeGet(pathname) {
  const res = await fetch(`${BASE}${pathname}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    signal: AbortSignal.timeout(120_000),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  return JSON.parse(text);
}

async function fetchInventory() {
  const items = [];
  let offset = 0;
  const limit = 25;
  while (true) {
    const j = await bridgeGet(`/api/chel/directions/meta/inventory?limit=${limit}&offset=${offset}`);
    items.push(...(j.data ?? []));
    if (!j._meta?.pagination?.hasMore) break;
    offset = j._meta.pagination.nextOffset ?? offset + limit;
    await new Promise((r) => setTimeout(r, 600));
  }
  return items;
}

async function main() {
  if (!TOKEN) {
    console.error('Нужен BRIDGE_API_TOKEN в infra/env/legacy-bridge-istochnik.env');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const inventory = args.includes('--inventory');

  if (inventory) {
    console.log('Сканируем inventory рубрик с meta врача…');
    const rows = await fetchInventory();
    const withBlock = rows.filter((r) => r.hasDoctorMeta || r.hasIntroMeta);
    const out = path.join(ROOT, 'docs', 'mappings', 'chel-direction-meta-inventory.json');
    fs.writeFileSync(
      out,
      JSON.stringify({ generatedAt: new Date().toISOString(), total: rows.length, withBlock: withBlock.length, rows }, null, 2),
    );
    console.log(`Всего рубрик: ${rows.length}, с блоком врача/текста: ${withBlock.length}`);
    console.log('Сохранено:', out);
    return;
  }

  const termId = args[0] || '569';
  console.log(`Probe direction term_id=${termId}…`);
  const j = await bridgeGet(`/api/chel/directions/${termId}/meta`);
  const out = path.join(ROOT, 'docs', 'mappings', `chel-direction-meta-${termId}.json`);
  fs.writeFileSync(out, JSON.stringify(j, null, 2));
  console.log(JSON.stringify(j.data, null, 2));
  console.log('\nСохранено:', out);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
