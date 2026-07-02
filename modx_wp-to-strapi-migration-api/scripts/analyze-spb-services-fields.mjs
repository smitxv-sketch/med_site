#!/usr/bin/env node
/**
 * Глубокий аудит услуг СПб: MODX site_content (templates 6,32,12) + pricelist_items2 + TV.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../server/legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../server/config/legacyDbGuard.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT_SERVICES = path.join(ROOT, 'docs/mappings/spb-services-fields-audit.json');
const OUT_PRICES = path.join(ROOT, 'docs/mappings/spb-pricelist-fields-audit.json');

const DELAY_MS = LEGACY_DB_GUARD.queryDelayMs;
const SERVICE_TEMPLATES = [6, 32];
const PROGRAM_TEMPLATE = 12;

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function isFilled(val) {
  if (val === null || val === undefined) return false;
  const s = String(val).trim();
  if (!s || s === '0' || s === 'false' || s === '[]' || s === '{}') return false;
  return true;
}

function updateFieldStats(stats, key, value, id) {
  if (!stats[key]) {
    stats[key] = { filled: 0, empty: 0, maxLen: 0, samples: [], looksJson: 0, looksHtml: 0 };
  }
  const row = stats[key];
  if (isFilled(value)) {
    row.filled += 1;
    const s = String(value);
    row.maxLen = Math.max(row.maxLen, s.length);
    if (s.startsWith('[') || s.startsWith('{')) row.looksJson += 1;
    if (/<[a-z][\s\S]*>/i.test(s)) row.looksHtml += 1;
    if (row.samples.length < 3) {
      row.samples.push({ id, preview: s.length > 120 ? `${s.slice(0, 120)}…` : s });
    }
  } else {
    row.empty += 1;
  }
}

function serializeStats(stats, total) {
  return Object.fromEntries(
    Object.entries(stats)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, st]) => [key, { ...st, pct: total ? Math.round((st.filled / total) * 100) : 0 }]),
  );
}

async function auditModxResources(gw, prefix, templates, label) {
  const tplList = templates.join(',');
  const [rows] = await gw.query(
    `SELECT id, pagetitle, longtitle, description, introtext, content, alias, parent, template, published, deleted, menuindex
     FROM ${prefix}site_content
     WHERE template IN (${tplList}) AND deleted = 0`,
  );

  const total = rows.length;
  const published = rows.filter((r) => r.published === 1).length;
  console.log(`${label}: ${total} ресурсов (${published} published)`);

  const contentFields = {};
  const ids = rows.map((r) => r.id);

  for (const field of ['pagetitle', 'longtitle', 'description', 'introtext', 'content', 'alias']) {
    contentFields[field] = { filled: 0, empty: 0, maxLen: 0 };
    for (const r of rows) {
      if (isFilled(r[field])) {
        contentFields[field].filled += 1;
        contentFields[field].maxLen = Math.max(contentFields[field].maxLen, String(r[field]).length);
      } else {
        contentFields[field].empty += 1;
      }
    }
    contentFields[field].pct = total ? Math.round((contentFields[field].filled / total) * 100) : 0;
  }

  // TV values chunk
  const tvStats = {};
  const CHUNK = 100;
  for (let i = 0; i < ids.length; i += CHUNK) {
    const chunkIds = ids.slice(i, i + CHUNK);
    const [tvs] = await gw.query(
      `SELECT tvc.contentid AS resource_id, tv.name AS tv_name, tvc.value
       FROM ${prefix}site_tmplvar_contentvalues tvc
       JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
       WHERE tvc.contentid IN (${chunkIds.join(',')})`,
    );
    for (const tv of tvs) {
      updateFieldStats(tvStats, tv.tv_name, tv.value, tv.resource_id);
    }
    process.stdout.write(`\r${label} TV: ${Math.min(i + CHUNK, ids.length)}/${ids.length}`);
    await sleep(DELAY_MS);
  }
  console.log('');

  // Parent distribution
  const parentCounts = {};
  for (const r of rows) {
    const p = String(r.parent);
    parentCounts[p] = (parentCounts[p] || 0) + 1;
  }

  return {
    label,
    templates,
    total,
    published,
    contentFields,
    templateTv: serializeStats(tvStats, total),
    topParents: Object.entries(parentCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([parentId, count]) => ({ parentId: Number(parentId), count })),
  };
}

async function auditPricelist(gw, prefix) {
  const [cols] = await gw.query(`SHOW COLUMNS FROM ${prefix}pricelist_items2`);
  const columnNames = cols.map((c) => c.Field);

  const [rows] = await gw.query(`SELECT * FROM ${prefix}pricelist_items2`);
  const total = rows.length;
  console.log(`pricelist_items2: ${total} строк, колонки: ${columnNames.join(', ')}`);

  const fieldStats = {};
  for (const col of columnNames) {
    fieldStats[col] = { filled: 0, empty: 0, maxLen: 0, uniqueValues: new Set() };
  }

  const tabStats = {};
  const categoryStats = {};

  for (const row of rows) {
    for (const col of columnNames) {
      const st = fieldStats[col];
      if (isFilled(row[col])) {
        st.filled += 1;
        const s = String(row[col]);
        st.maxLen = Math.max(st.maxLen, s.length);
        if (st.uniqueValues.size < 30) st.uniqueValues.add(s);
      } else {
        st.empty += 1;
      }
    }
    if (isFilled(row.tab)) tabStats[row.tab] = (tabStats[row.tab] || 0) + 1;
    if (isFilled(row.category)) categoryStats[row.category] = (categoryStats[row.category] || 0) + 1;
  }

  const serializedFields = {};
  for (const [col, st] of Object.entries(fieldStats)) {
    serializedFields[col] = {
      filled: st.filled,
      empty: st.empty,
      pct: total ? Math.round((st.filled / total) * 100) : 0,
      maxLen: st.maxLen,
      sampleUnique: [...st.uniqueValues].slice(0, 10),
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    table: 'pricelist_items2',
    totalRows: total,
    columns: columnNames,
    fields: serializedFields,
    uniqueTabs: Object.keys(tabStats).length,
    tabDistribution: tabStats,
    uniqueCategories: Object.keys(categoryStats).length,
    topCategories: Object.entries(categoryStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([name, count]) => ({ name, count })),
  };
}

const gw = LegacyMysqlGateway.get('spb');
const prefix = gw.getPrefix();

const servicesAudit = await auditModxResources(gw, prefix, SERVICE_TEMPLATES, 'Услуги MODX 6+32');
await sleep(DELAY_MS);
const programsAudit = await auditModxResources(gw, prefix, [PROGRAM_TEMPLATE], 'Программы MODX 12');
await sleep(DELAY_MS);
const pricelistAudit = await auditPricelist(gw, prefix);

const out = {
  generatedAt: new Date().toISOString(),
  services: servicesAudit,
  programs: programsAudit,
};

fs.mkdirSync(path.dirname(OUT_SERVICES), { recursive: true });
fs.writeFileSync(OUT_SERVICES, JSON.stringify(out, null, 2));
fs.writeFileSync(OUT_PRICES, JSON.stringify(pricelistAudit, null, 2));
console.log('saved', OUT_SERVICES);
console.log('saved', OUT_PRICES);
