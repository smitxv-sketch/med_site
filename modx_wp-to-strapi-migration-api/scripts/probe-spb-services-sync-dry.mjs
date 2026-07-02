#!/usr/bin/env node
/**
 * Dry-run пилота синка СПб: читает pricelist_items2, агрегирует по doc_id.
 * Strapi не трогаем — только отчёт в stdout.
 *
 *   npx tsx scripts/probe-spb-services-sync-dry.mjs
 *   npx tsx scripts/probe-spb-services-sync-dry.mjs "Кардиология"
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  aggregateSpbServices,
  loadSpbPricelistRows,
} from '../server/services/spb/spbPricelistSource.ts';
import {
  categoryLegacyId,
  mapQmsSectionVal,
  mapSpbLegacyTab,
  serviceLegacyId,
} from '../server/services/spb/spbServiceTabMapper.ts';

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

const category = process.argv[2]?.trim() || 'Кардиология';

const rows = await loadSpbPricelistRows(category);
const services = aggregateSpbServices(rows);

console.log(JSON.stringify({
  ok: true,
  category,
  rawRows: rows.length,
  uniqueArticles: services.length,
  categoryLegacyId: categoryLegacyId(category),
  tabLegacy: rows[0]?.tab ?? null,
  tabQms: mapSpbLegacyTab(rows[0]?.tab ?? '') ?? null,
  sample: services.slice(0, 5).map((s) => ({
    legacyId: serviceLegacyId(s.article),
    article: s.article,
    title: s.title,
    price: s.price,
    published: s.published,
    tabQms: mapSpbLegacyTab(s.tabLegacy),
    modxResourceId: s.modxResourceId,
    categories: s.categories,
  })),
}, null, 2));
