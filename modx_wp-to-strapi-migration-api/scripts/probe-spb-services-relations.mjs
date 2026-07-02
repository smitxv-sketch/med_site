#!/usr/bin/env node
/**
 * Глубокий probe связей услуг СПб:
 * - pricelist ↔ MODX resource_id
 * - doc_id в нескольких category/tab
 * - template 12 программы (все deleted)
 * - структура MIGX: json_data, uslugiPrice, faq_services
 * - дерево parent для templates 6,32,12
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../server/legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../server/config/legacyDbGuard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'docs/mappings/spb-services-relations-audit.json');
const DELAY = LEGACY_DB_GUARD.queryDelayMs;

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const gw = LegacyMysqlGateway.get('spb');
const prefix = gw.getPrefix();

function parseMigx(val) {
  if (!val) return null;
  try {
    const p = JSON.parse(val);
    return Array.isArray(p) ? p : null;
  } catch {
    return null;
  }
}

// --- 1. Template counts ---
const [templateCounts] = await gw.query(`
  SELECT template, published, deleted, COUNT(*) c
  FROM ${prefix}site_content
  WHERE template IN (6, 12, 32)
  GROUP BY template, published, deleted
  ORDER BY template, deleted, published
`);

// --- 2. Pricelist: doc_id → many categories/tabs ---
const [multiCategory] = await gw.query(`
  SELECT doc_id,
    COUNT(DISTINCT category) AS categories,
    COUNT(DISTINCT tab) AS tabs,
    COUNT(*) AS rows
  FROM ${prefix}pricelist_items2
  WHERE doc_id IS NOT NULL AND doc_id != '' AND (deleted IS NULL OR deleted = 0)
  GROUP BY doc_id
  HAVING categories > 1 OR tabs > 1
  ORDER BY rows DESC
  LIMIT 30
`);

const [categoryPerArticle] = await gw.query(`
  SELECT cat_count, COUNT(*) articles FROM (
    SELECT doc_id, COUNT(DISTINCT category) cat_count
    FROM ${prefix}pricelist_items2
    WHERE doc_id IS NOT NULL AND doc_id != '' AND (deleted IS NULL OR deleted = 0)
    GROUP BY doc_id
  ) x GROUP BY cat_count ORDER BY cat_count
`);

// --- 3. resource_id linkage ---
const [resourceLink] = await gw.query(`
  SELECT
    SUM(CASE WHEN resource_id IS NOT NULL AND resource_id != 0 THEN 1 ELSE 0 END) AS with_resource,
    SUM(CASE WHEN resource_id IS NULL OR resource_id = 0 THEN 1 ELSE 0 END) AS without_resource,
    COUNT(*) AS total
  FROM ${prefix}pricelist_items2
  WHERE deleted IS NULL OR deleted = 0
`);

const [orphanResources] = await gw.query(`
  SELECT pi.doc_id, pi.resource_id, pi.name
  FROM ${prefix}pricelist_items2 pi
  LEFT JOIN ${prefix}site_content c ON c.id = pi.resource_id
  WHERE (pi.deleted IS NULL OR pi.deleted = 0)
    AND pi.resource_id IS NOT NULL AND pi.resource_id != 0
    AND c.id IS NULL
  LIMIT 15
`);
await sleep(DELAY);

// --- 4. Parent tree for service pages ---
const [parentLevels] = await gw.query(`
  SELECT c.template, c.parent, p.pagetitle AS parent_title, COUNT(*) c
  FROM ${prefix}site_content c
  LEFT JOIN ${prefix}site_content p ON p.id = c.parent
  WHERE c.template IN (6, 32) AND c.deleted = 0
  GROUP BY c.template, c.parent, p.pagetitle
  ORDER BY c DESC
  LIMIT 25
`);

// --- 5. MIGX structure samples ---
const [migxRows] = await gw.query(`
  SELECT tvc.contentid, tv.name, tvc.value
  FROM ${prefix}site_tmplvar_contentvalues tvc
  JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
  JOIN ${prefix}site_content c ON c.id = tvc.contentid
  WHERE c.template IN (6, 32) AND c.deleted = 0
    AND tv.name IN ('json_data', 'uslugiPrice', 'faq_services')
    AND tvc.value IS NOT NULL AND tvc.value != '' AND tvc.value != '[]'
  LIMIT 15
`);

const migxSchemas = {};
for (const row of migxRows) {
  const parsed = parseMigx(row.value);
  if (!parsed || !parsed[0]) continue;
  if (!migxSchemas[row.name]) migxSchemas[row.name] = { keys: new Set(), samples: [] };
  Object.keys(parsed[0]).forEach((k) => migxSchemas[row.name].keys.add(k));
  if (migxSchemas[row.name].samples.length < 2) {
    migxSchemas[row.name].samples.push({
      contentId: row.contentid,
      firstItem: parsed[0],
      itemCount: parsed.length,
    });
  }
}
const migxOut = {};
for (const [name, data] of Object.entries(migxSchemas)) {
  migxOut[name] = {
    fieldKeys: [...data.keys].sort(),
    samples: data.samples,
  };
}

// --- 6. Programs template 12 — sample TVs ---
const [progSample] = await gw.query(`
  SELECT c.id, c.pagetitle, c.published, c.deleted, c.parent
  FROM ${prefix}site_content c
  WHERE c.template = 12
  LIMIT 10
`);
let progTvs = [];
if (progSample.length) {
  const ids = progSample.map((p) => p.id);
  const [tvs] = await gw.query(`
    SELECT tvc.contentid, tv.name, LEFT(tvc.value, 200) AS value_preview
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (${ids.join(',')})
  `);
  progTvs = tvs;
}

// --- 7. All TVs used on template 12 (registry) ---
const [t12TvRegistry] = await gw.query(`
  SELECT tv.name, COUNT(DISTINCT tvc.contentid) resources, COUNT(*) values_count
  FROM ${prefix}site_tmplvar_contentvalues tvc
  JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
  JOIN ${prefix}site_content c ON c.id = tvc.contentid
  WHERE c.template = 12
  GROUP BY tv.name
  ORDER BY resources DESC
`);

const out = {
  generatedAt: new Date().toISOString(),
  templateCounts,
  categoriesPerArticle: categoryPerArticle,
  multiCategoryArticlesSample: multiCategory,
  pricelistResourceLink: resourceLink[0],
  orphanResourceRows: orphanResources,
  serviceParentDistribution: parentLevels,
  migxFieldSchemas: migxOut,
  programsTemplate12: {
    sampleResources: progSample,
    sampleTvs: progTvs,
    tvRegistry: t12TvRegistry,
  },
  gaps: {
    note: 'Прайс-строка и MODX-страница связаны через resource_id; состав комплекса — json_data MIGX',
  },
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log('saved', OUT);
