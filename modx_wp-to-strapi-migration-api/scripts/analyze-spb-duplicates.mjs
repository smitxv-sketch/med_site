#!/usr/bin/env node
/** Анализ дублей pricelist_items2: один doc_id в нескольких рубриках/вкладках */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../server/legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../server/config/legacyDbGuard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'docs/mappings/spb-duplicate-analysis.json');

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

const [stats] = await gw.query(`
  SELECT
    COUNT(*) AS rows_pub,
    COUNT(DISTINCT doc_id) AS articles_pub
  FROM ${prefix}pricelist_items2
  WHERE (deleted IS NULL OR deleted = 0) AND published = 1 AND doc_id != ''
`);

const [multiCat] = await gw.query(`
  SELECT doc_id,
         COUNT(*) AS row_count,
         COUNT(DISTINCT category) AS cat_cnt,
         COUNT(DISTINCT tab) AS tab_cnt,
         GROUP_CONCAT(DISTINCT category ORDER BY category SEPARATOR ' | ') AS cats,
         GROUP_CONCAT(DISTINCT tab ORDER BY tab SEPARATOR ' | ') AS tabs,
         MAX(name) AS name
  FROM ${prefix}pricelist_items2
  WHERE (deleted IS NULL OR deleted = 0) AND published = 1 AND doc_id != ''
  GROUP BY doc_id
  HAVING cat_cnt > 1 OR tab_cnt > 1
  ORDER BY cat_cnt DESC, tab_cnt DESC, row_count DESC
`);
await sleep(LEGACY_DB_GUARD.queryDelayMs);

const [gastro] = await gw.query(`
  SELECT doc_id, name, price, tab, category, resource_id
  FROM ${prefix}pricelist_items2
  WHERE (deleted IS NULL OR deleted = 0) AND published = 1
    AND (category LIKE '%астро%' OR name LIKE '%астроэнтеролог%')
  ORDER BY doc_id, tab, category
`);
await sleep(LEGACY_DB_GUARD.queryDelayMs);

const [programs] = await gw.query(`
  SELECT id, pagetitle, alias FROM ${prefix}site_content
  WHERE template = 12 AND deleted = 0 AND published = 1
`);
const progIds = programs.map((x) => x.id);
const programJsonSamples = [];
if (progIds.length) {
  const [tvs] = await gw.query(`
    SELECT tvc.contentid, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tv.name = 'json_data' AND tvc.contentid IN (${progIds.join(',')})
  `);
  for (const tv of tvs) {
    try {
      const arr = JSON.parse(tv.value);
      if (!Array.isArray(arr) || !arr[0]) continue;
      const prog = programs.find((p) => p.id === tv.contentid);
      programJsonSamples.push({
        programId: tv.contentid,
        title: prog?.pagetitle,
        alias: prog?.alias,
        url: prog?.alias ? `https://cispb.com/${prog.alias}` : null,
        itemCount: arr.length,
        firstItemKeys: Object.keys(arr[0]),
        sampleItems: arr.slice(0, 3).map((i) => ({
          id: i.id ?? i.MIGX_id,
          name: i.name ?? i.title,
          price: i.price,
        })),
      });
    } catch {
      /* skip */
    }
  }
}

// MODX alias для гастро-строк с resource_id
const resIds = [...new Set(gastro.map((r) => r.resource_id).filter(Boolean))];
let resourceAliases = [];
if (resIds.length) {
  const [res] = await gw.query(`
    SELECT id, alias, pagetitle, parent FROM ${prefix}site_content WHERE id IN (${resIds.join(',')})
  `);
  resourceAliases = res;
}

const out = {
  generatedAt: new Date().toISOString(),
  stats: stats[0],
  multiCategorySummary: {
    articlesWithMultipleCategoriesOrTabs: multiCat.length,
    topExamples: multiCat.slice(0, 15),
  },
  gastroenterology: {
    rowCount: gastro.length,
    uniqueArticles: [...new Set(gastro.map((r) => r.doc_id))].length,
    rows: gastro,
    modxPages: resourceAliases.map((r) => ({
      id: r.id,
      alias: r.alias,
      title: r.pagetitle,
      url: r.alias ? `https://cispb.com/${r.alias}` : null,
    })),
  },
  programsTemplate12: {
    count: programs.length,
    samples: programJsonSamples.slice(0, 5),
    note: 'json_data — состав комплекса; id часто = MODX resource id услуги из прайса',
  },
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(JSON.stringify({
  stats: out.stats,
  multiCat: multiCat.length,
  gastro: out.gastroenterology,
  programs: programs.length,
  saved: OUT,
}, null, 2));
