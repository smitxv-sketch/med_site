#!/usr/bin/env node
/** Быстрая проверка результата enrich на проде */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function loadEnv(rel) {
  const p = path.join(ROOT, rel);
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

const STRAPI = (process.env.STRAPI_URL || 'https://cms.istochnik.smitx.ru').replace(/\/$/, '');
const TOKEN = process.env.STRAPI_API_TOKEN || '';
const SITE = 'https://istochnik.smitx.ru';

async function strapiCount(filters) {
  const qs = new URLSearchParams({
    locale: 'ru-spb',
    'pagination[pageSize]': '1',
    publicationState: 'live',
    ...filters,
  });
  const r = await fetch(`${STRAPI}/api/services?${qs}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  const j = await r.json();
  return j.meta?.pagination?.total ?? 0;
}

const [withSummary, isProgram, categories] = await Promise.all([
  strapiCount({ 'filters[summary][$notNull]': 'true' }),
  strapiCount({ 'filters[isProgram][$eq]': 'true' }),
  fetch(`${STRAPI}/api/service-categories?locale=ru-spb&pagination[pageSize]=100&fields[0]=title&fields[1]=expertIntro&fields[2]=slug`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  }).then((r) => r.json()),
]);

const catsWithIntro = (categories.data || []).filter((c) => String(c.expertIntro || '').trim().length > 20);

const pricesRes = await fetch(`${SITE}/api/catalog/prices?tenant=spb`);
const prices = await pricesRes.json().catch(() => ({}));

const programRes = await fetch(`${SITE}/api/catalog/services/B03.36?tenant=spb`);
const program = programRes.ok ? await programRes.json() : null;

console.log(
  JSON.stringify(
    {
      strapi: {
        servicesWithSummary: withSummary,
        isProgramServices: isProgram,
        categoriesWithExpertIntro: catsWithIntro.length,
        sampleCategory: catsWithIntro[0]?.title,
      },
      bffCatalogPrices: {
        status: pricesRes.status,
        placementCount: prices.placementCount,
        categoryCount: prices.categoryCount,
      },
      sampleProgram: program
        ? {
            article: program.article,
            isProgram: program.isProgram,
            includedCount: program.includedItems?.length ?? 0,
          }
        : { status: programRes.status },
    },
    null,
    2,
  ),
);
