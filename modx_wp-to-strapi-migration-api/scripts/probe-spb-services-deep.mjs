#!/usr/bin/env node
/**
 * Доп. probe СПб: программы (t12), MIGX json_data/uslugiPrice, прайс vs published.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../server/legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../server/config/legacyDbGuard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'docs/mappings/spb-services-deep-audit.json');

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

const gw = LegacyMysqlGateway.get('spb');
const prefix = gw.getPrefix();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseJson(val) {
  if (!val || typeof val !== 'string') return null;
  try {
    const p = JSON.parse(val);
    return Array.isArray(p) ? p : null;
  } catch {
    return null;
  }
}

function migxKeys(rows, tvName) {
  const keys = new Set();
  const samples = [];
  for (const row of rows) {
    if (row.tv_name !== tvName) continue;
    const arr = parseJson(row.value);
    if (!arr?.[0]) continue;
    Object.keys(arr[0]).forEach((k) => keys.add(k));
    if (samples.length < 3) {
      samples.push({ contentId: row.contentid, itemCount: arr.length, firstItem: arr[0] });
    }
  }
  return { fieldKeys: [...keys].sort(), samples };
}

// --- Прайс: живые строки ---
const [priceStats] = await gw.query(`
  SELECT
    COUNT(*) AS total,
    SUM(CASE WHEN (deleted IS NULL OR deleted = 0) AND published = 1 THEN 1 ELSE 0 END) AS live_published,
    SUM(CASE WHEN (deleted IS NULL OR deleted = 0) AND (published IS NULL OR published = 0) THEN 1 ELSE 0 END) AS live_hidden,
    SUM(CASE WHEN deleted = 1 THEN 1 ELSE 0 END) AS deleted_rows
  FROM ${prefix}pricelist_items2
`);

// --- Программы template 12 (включая deleted) ---
const [programs] = await gw.query(`
  SELECT id, pagetitle, alias, parent, published, deleted
  FROM ${prefix}site_content WHERE template = 12
  ORDER BY id
`);
const progIds = programs.map((p) => p.id);
let progTvStats = {};
let progTvSamples = [];
if (progIds.length) {
  const [tvs] = await gw.query(`
    SELECT tvc.contentid, tv.name AS tv_name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (${progIds.join(',')})
  `);
  const bucket = {};
  for (const tv of tvs) {
    if (!bucket[tv.tv_name]) bucket[tv.tv_name] = { filled: 0, maxLen: 0 };
    if (tv.value && String(tv.value).trim()) {
      bucket[tv.tv_name].filled += 1;
      bucket[tv.tv_name].maxLen = Math.max(bucket[tv.tv_name].maxLen, String(tv.value).length);
    }
  }
  progTvStats = Object.fromEntries(
    Object.entries(bucket)
      .sort((a, b) => b[1].filled - a[1].filled)
      .map(([name, st]) => [name, { ...st, pct: Math.round((st.filled / programs.length) * 100) }]),
  );
  progTvSamples = programs.slice(0, 5).map((p) => {
    const rowTvs = tvs.filter((t) => t.contentid === p.id);
    const map = {};
    for (const t of rowTvs) map[t.tv_name] = String(t.value).slice(0, 300);
    return { ...p, tvs: map };
  });
}
await sleep(LEGACY_DB_GUARD.queryDelayMs);

// --- MIGX на templates 6+32 ---
const [migxRows] = await gw.query(`
  SELECT tvc.contentid, tv.name AS tv_name, tvc.value
  FROM ${prefix}site_tmplvar_contentvalues tvc
  JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
  JOIN ${prefix}site_content c ON c.id = tvc.contentid
  WHERE c.template IN (6, 32) AND c.deleted = 0
    AND tv.name IN ('json_data', 'uslugiPrice', 'faq_services', 'spoiler_services', 'equipment_list')
    AND tvc.value IS NOT NULL AND tvc.value != '' AND tvc.value != '[]'
`);

const migx = {
  json_data: migxKeys(migxRows, 'json_data'),
  uslugiPrice: migxKeys(migxRows, 'uslugiPrice'),
  faq_services: migxKeys(migxRows, 'faq_services'),
  spoiler_services: migxKeys(migxRows, 'spoiler_services'),
  equipment_list: migxKeys(migxRows, 'equipment_list'),
};

// --- Сверка: doc_id в прайсе без строки с published=1 ---
const [hiddenOnly] = await gw.query(`
  SELECT doc_id, COUNT(*) c
  FROM ${prefix}pricelist_items2
  WHERE doc_id IS NOT NULL AND doc_id != '' AND (deleted IS NULL OR deleted = 0)
  GROUP BY doc_id
  HAVING SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) = 0
  LIMIT 20
`);

// --- category vs MODX parent: примеры расхождения ---
const [categoryModxSample] = await gw.query(`
  SELECT pi.doc_id, pi.category, pi.tab, pi.resource_id, c.pagetitle AS modx_title, p.pagetitle AS modx_parent
  FROM ${prefix}pricelist_items2 pi
  LEFT JOIN ${prefix}site_content c ON c.id = pi.resource_id
  LEFT JOIN ${prefix}site_content p ON p.id = c.parent
  WHERE (pi.deleted IS NULL OR pi.deleted = 0) AND pi.published = 1
  LIMIT 15
`);

const out = {
  generatedAt: new Date().toISOString(),
  pricelistStats: priceStats[0],
  programsTemplate12: {
    total: programs.length,
    publishedNotDeleted: programs.filter((p) => p.published === 1 && p.deleted === 0).length,
    publishedDeleted: programs.filter((p) => p.published === 1 && p.deleted === 1).length,
    tvStats: progTvStats,
    samples: progTvSamples,
  },
  migxSchemas: migx,
  articlesOnlyHiddenInPricelist: hiddenOnly,
  pricelistVsModxParentSample: categoryModxSample,
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log('saved', OUT);
console.log('pricelist', priceStats[0]);
console.log('programs', programs.length, 'migx keys', Object.keys(migx));
