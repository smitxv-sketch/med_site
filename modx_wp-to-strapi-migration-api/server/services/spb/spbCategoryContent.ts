import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LegacyMysqlGateway } from '../../legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';
import { resolveSpbMappingPath } from './spbMappingPaths.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type SpbCategoryModxEnrich = {
  modxResourceId: number;
  seoTitle?: string;
  seoDescription?: string;
  expertIntro?: string;
  aboutHeader?: string;
  aboutText?: string;
  bodyMiddle?: string;
};

type OverridesFile = Record<string, number | string>;

function loadOverrides(): Map<string, number> {
  const p = resolveSpbMappingPath('spb-category-modx-overrides.json');
  const map = new Map<string, number>();
  if (!p) return map;
  const raw = JSON.parse(fs.readFileSync(p, 'utf8')) as OverridesFile;
  for (const [cat, id] of Object.entries(raw)) {
    if (cat.startsWith('_')) continue;
    const n = Number(id);
    if (n > 0) map.set(cat.trim(), n);
  }
  return map;
}

/** Топ рубрик по числу опубликованных строк прайса */
export async function loadTopPublishedCategories(limit = 10): Promise<string[]> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const [rows] = await gw.query(
    `SELECT TRIM(category) AS category, COUNT(*) AS c
     FROM ${prefix}pricelist_items2
     WHERE (deleted IS NULL OR deleted = 0) AND published = 1 AND TRIM(category) != ''
     GROUP BY TRIM(category)
     ORDER BY c DESC
     LIMIT ?`,
    [limit],
  );
  return (rows as Array<{ category: string }>).map((r) => String(r.category).trim());
}

/** Все опубликованные рубрики из прайса MODX */
export async function loadAllPublishedPricelistCategories(): Promise<string[]> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const [rows] = await gw.query(
    `SELECT DISTINCT TRIM(category) AS category
     FROM ${prefix}pricelist_items2
     WHERE (deleted IS NULL OR deleted = 0) AND published = 1 AND TRIM(category) != ''
     ORDER BY category`,
  );
  return (rows as Array<{ category: string }>).map((r) => String(r.category).trim());
}

/** Приоритет обогащения: override + все рубрики прайса + опционально Strapi */
export async function resolveEnrichCategoryNames(
  options: { extra?: string[]; strapiTitles?: string[] } = {},
): Promise<string[]> {
  const overrides = loadOverrides();
  const must = [...overrides.keys(), ...(options.extra ?? [])];
  const allPublished = await loadAllPublishedPricelistCategories();
  const fromStrapi = (options.strapiTitles ?? []).map((s) => s.trim()).filter(Boolean);
  return [...new Set([...must, ...allPublished, ...fromStrapi])];
}

/** MODX resource id для рубрики: override → мода resource_id из прайса */
export async function resolveCategoryModxIds(
  categories: string[],
): Promise<Map<string, number>> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const overrides = loadOverrides();
  const out = new Map<string, number>();

  for (const cat of categories) {
    const override = overrides.get(cat);
    if (override) {
      out.set(cat, override);
      continue;
    }
    const [rows] = await gw.query(
      `SELECT resource_id, COUNT(*) AS c
       FROM ${prefix}pricelist_items2
       WHERE (deleted IS NULL OR deleted = 0) AND published = 1
         AND TRIM(category) = ? AND resource_id IS NOT NULL AND resource_id > 0
       GROUP BY resource_id
       ORDER BY c DESC
       LIMIT 1`,
      [cat],
    );
    const id = Number((rows as Array<{ resource_id: number }>)[0]?.resource_id);
    if (id > 0) out.set(cat, id);
    await sleep(LEGACY_DB_GUARD.queryDelayMs);
  }
  return out;
}

const CATEGORY_TVS = [
  'des',
  'minText',
  'title',
  'text',
  'docText',
  'docIntrotext',
  'about_header',
  'about_text',
  'text_middle',
];

/** Тексты направления с MODX-страницы */
export async function loadSpbCategoryModxEnrich(
  resourceIds: number[],
): Promise<Map<number, SpbCategoryModxEnrich>> {
  const out = new Map<number, SpbCategoryModxEnrich>();
  const ids = [...new Set(resourceIds)].filter((id) => id > 0);
  if (!ids.length) return out;

  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();

  const [pages] = await gw.query(
    `SELECT id, pagetitle, description, introtext, content
     FROM ${prefix}site_content
     WHERE id IN (${ids.join(',')})`,
  );

  for (const p of pages as Array<Record<string, unknown>>) {
    const id = Number(p.id);
    const pagetitle = String(p.pagetitle ?? '').trim();
    const cur = out.get(id) ?? { modxResourceId: id };
    cur.aboutHeader = pagetitle || undefined;
    cur.bodyMiddle = String(p.content ?? '').trim() || undefined;
    const introtext = String(p.introtext ?? '').trim();
    const description = String(p.description ?? '').trim();
    if (!cur.expertIntro && introtext.length > 20) cur.expertIntro = introtext;
    if (!cur.expertIntro && description.length > 20) cur.expertIntro = description;
    out.set(id, cur);
  }

  const [tvs] = await gw.query(
    `SELECT tvc.contentid, tv.name, tvc.value
     FROM ${prefix}site_tmplvar_contentvalues tvc
     JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
     WHERE tvc.contentid IN (${ids.join(',')})
       AND tv.name IN (${CATEGORY_TVS.map((n) => `'${n}'`).join(',')})`,
  );

  for (const row of tvs as Array<{ contentid: number; name: string; value: string }>) {
    const id = Number(row.contentid);
    const cur = out.get(id) ?? { modxResourceId: id };
    const val = String(row.value ?? '').trim();
    if (!val) continue;
    if (row.name === 'des') cur.seoDescription = val;
    if (row.name === 'minText') cur.expertIntro = val;
    if (row.name === 'title') cur.seoTitle = val;
    if (row.name === 'text' || row.name === 'docText') cur.aboutText = val;
    if (row.name === 'docIntrotext' && !cur.expertIntro) cur.expertIntro = val;
    // Короткий about_header («Ухо», «Нос») не подменяет название направления
    if (row.name === 'about_header' && val.length >= 12) cur.aboutHeader = val;
    if (row.name === 'about_text') cur.aboutText = val;
    if (row.name === 'text_middle') cur.bodyMiddle = val;
    out.set(id, cur);
  }

  return out;
}

export function categoryEnrichToPayload(enrich: SpbCategoryModxEnrich): Record<string, string> {
  const patch: Record<string, string> = {};
  if (enrich.seoTitle) patch.seoTitle = enrich.seoTitle;
  if (enrich.seoDescription) patch.seoDescription = enrich.seoDescription;
  if (enrich.expertIntro) {
    patch.expertIntro = enrich.expertIntro;
  } else if (enrich.seoDescription && enrich.seoDescription.length > 40) {
    // У части направлений нет minText — краткий intro из meta description
    patch.expertIntro = enrich.seoDescription;
  }
  if (enrich.aboutHeader) patch.aboutHeader = enrich.aboutHeader;
  if (enrich.aboutText) patch.aboutText = enrich.aboutText;
  if (enrich.bodyMiddle) patch.bodyMiddle = enrich.bodyMiddle;
  return patch;
}
