#!/usr/bin/env node
/**
 * Полный синк услуг СПб через bridge: по одной рубрике (без HTTP-таймаута).
 *
 *   node scripts/run-spb-full-sync-bridge.mjs
 *   node scripts/run-spb-full-sync-bridge.mjs --no-qms
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../modx_wp-to-strapi-migration-api/server/legacy/LegacyMysqlGateway.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs/mappings/spb-full-sync-report.json');

function loadEnv(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const k = t.slice(0, eq).trim();
    if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
  }
}
loadEnv('infra/env/legacy-bridge-istochnik.env');

const BRIDGE = (process.env.BRIDGE_URL || 'https://bridge.istochnik.smitx.ru').replace(/\/$/, '');
const TOKEN = process.env.BRIDGE_API_TOKEN;
if (!TOKEN) {
  console.error('Нужен BRIDGE_API_TOKEN');
  process.exit(1);
}

const mergeQms = !process.argv.includes('--no-qms');
const modxEnrich = !process.argv.includes('--no-modx');

const gw = LegacyMysqlGateway.get('spb');
const prefix = gw.getPrefix();
const [rows] = await gw.query(`
  SELECT DISTINCT category
  FROM ${prefix}pricelist_items2
  WHERE (deleted IS NULL OR deleted = 0)
    AND published = 1
    AND category != ''
  ORDER BY category
`);

const categories = rows.map((r) => String(r.category ?? '').trim()).filter(Boolean);
console.log(`Рубрик для синка: ${categories.length}`);

const totals = {
  categories: { created: 0, updated: 0, skipped: 0 },
  services: { created: 0, updated: 0, skipped: 0 },
  placements: { created: 0, updated: 0, skipped: 0 },
  relations: { linked: 0 },
  qmsMerged: 0,
  errors: [],
};

for (let i = 0; i < categories.length; i++) {
  const category = categories[i];
  const url = `${BRIDGE}/api/sync/spb/services?category=${encodeURIComponent(category)}&modxEnrich=${modxEnrich ? '1' : '0'}&mergeQms=${mergeQms ? '1' : '0'}`;
  console.log(`[${i + 1}/${categories.length}] ${category}…`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}` },
      signal: AbortSignal.timeout(600_000),
    });
    const body = await res.json();
    if (!res.ok || !body.ok) {
      totals.errors.push({
        legacyId: `category:${category}`,
        message: body.error || `HTTP ${res.status}`,
        category,
      });
      console.warn('  FAIL', body.error || res.status);
      continue;
    }
    const r = body.report;
    for (const key of ['categories', 'services', 'placements']) {
      totals[key].created += r[key]?.created ?? 0;
      totals[key].updated += r[key]?.updated ?? 0;
      totals[key].skipped += r[key]?.skipped ?? 0;
    }
    totals.relations.linked += r.relations?.linked ?? 0;
    totals.qmsMerged += r.qmsMerged ?? 0;
    if (r.errors?.length) {
      for (const e of r.errors) totals.errors.push({ ...e, category });
    }
    console.log(
      `  ok: svc +${r.services?.created}/~${r.services?.updated} place +${r.placements?.created} qms ${r.qmsMerged}`,
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    totals.errors.push({ legacyId: `category:${category}`, message, category });
    console.warn('  ERR', message);
  }
}

const result = { ok: true, generatedAt: new Date().toISOString(), totals, categoryCount: categories.length };
fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log('\nИтого:', JSON.stringify(totals, null, 2));
console.log('Отчёт:', OUT);
