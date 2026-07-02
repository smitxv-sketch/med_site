import type { StrapiClient } from '../strapiClient.js';
import { LegacyMysqlGateway } from '../../legacy/LegacyMysqlGateway.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';
import { SPB_LOCALE } from '../../types/serviceSync.js';
import { serviceLegacyId } from './spbServiceTabMapper.js';
import {
  isProgramPricelistRow,
  mergeProgramItems,
  parseJsonDataTv,
  parseUslugiPriceTv,
  type ParsedProgramItem,
} from './spbProgramParser.js';
import { loadSpbPricelistRows } from './spbPricelistSource.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type ProgramSyncReport = {
  scanned: number;
  updated: number;
  skipped: number;
  noComposition: string[];
  errors: Array<{ article: string; message: string }>;
};

type ModxTvs = {
  json_data?: string;
  uslugiPrice?: string;
  descriptionProgramm?: string;
  textContent?: string;
};

/** resource_id → doc_id из прайса (для связи json_data.id → Service) */
async function buildModxToArticleMap(): Promise<Map<string, string>> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const [rows] = await gw.query(
    `SELECT DISTINCT resource_id, TRIM(doc_id) AS article
     FROM ${prefix}pricelist_items2
     WHERE (deleted IS NULL OR deleted = 0) AND published = 1
       AND resource_id IS NOT NULL AND resource_id > 0 AND TRIM(doc_id) != ''`,
  );
  const map = new Map<string, string>();
  for (const r of rows as Array<{ resource_id: number; article: string }>) {
    map.set(String(r.resource_id), String(r.article).trim());
  }
  return map;
}

async function loadModxProgramTvs(resourceIds: number[]): Promise<Map<number, ModxTvs>> {
  const out = new Map<number, ModxTvs>();
  const ids = [...new Set(resourceIds)].filter((id) => id > 0);
  if (!ids.length) return out;

  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const names = ['json_data', 'uslugiPrice', 'descriptionProgramm', 'textContent'];
  const [tvs] = await gw.query(
    `SELECT tvc.contentid, tv.name, tvc.value
     FROM ${prefix}site_tmplvar_contentvalues tvc
     JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
     WHERE tvc.contentid IN (${ids.join(',')})
       AND tv.name IN (${names.map((n) => `'${n}'`).join(',')})`,
  );

  for (const row of tvs as Array<{ contentid: number; name: string; value: string }>) {
    const cur = out.get(row.contentid) ?? {};
    cur[row.name as keyof ModxTvs] = String(row.value ?? '');
    out.set(row.contentid, cur);
  }
  return out;
}

/** Если resource_id из прайса — рубрика, ищем страницу программы по названию */
async function resolveProgramResourceId(
  name: string,
  fallbackId: number | null,
): Promise<number | null> {
  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const hint = String(name ?? '').trim().slice(0, 48);
  if (hint.length >= 8) {
    const [rows] = await gw.query(
      `SELECT id FROM ${prefix}site_content
       WHERE template IN (6, 12, 32) AND deleted = 0
         AND pagetitle LIKE ?
       ORDER BY published DESC, id DESC
       LIMIT 1`,
      [`%${hint.replace(/[%_]/g, '')}%`],
    );
    const hit = Number((rows as Array<{ id: number }>)[0]?.id);
    if (hit > 0) return hit;
  }
  return fallbackId && fallbackId > 0 ? fallbackId : null;
}

/** Индекс Strapi: article и modxResourceId → documentId */
async function buildServiceIndex(
  client: StrapiClient,
): Promise<{ byArticle: Map<string, string>; byModxId: Map<string, string> }> {
  const byArticle = new Map<string, string>();
  const byModxId = new Map<string, string>();
  const rows = await client.listEntries('services', {
    locale: SPB_LOCALE,
    fields: ['article', 'modxResourceId', 'legacyId', 'contentLocked'],
  });

  for (const row of rows) {
    const article = String(row.attrs.article ?? '').trim();
    if (article) byArticle.set(article, row.documentId);
    const modxId = row.attrs.modxResourceId;
    if (modxId) byModxId.set(String(modxId), row.documentId);
  }

  return { byArticle, byModxId };
}

function resolveIncludedServiceDocId(
  item: ParsedProgramItem,
  modxToArticle: Map<string, string>,
  byArticle: Map<string, string>,
  byModxId: Map<string, string>,
): string | undefined {
  if (item.legacyArticle) {
    const hit = byArticle.get(item.legacyArticle);
    if (hit) return hit;
  }
  if (item.legacyModxId) {
    const viaModx = byModxId.get(item.legacyModxId);
    if (viaModx) return viaModx;
    const article = modxToArticle.get(item.legacyModxId);
    if (article) return byArticle.get(article);
  }
  return undefined;
}

function itemsToComponents(
  items: ParsedProgramItem[],
  modxToArticle: Map<string, string>,
  byArticle: Map<string, string>,
  byModxId: Map<string, string>,
): Array<Record<string, unknown>> {
  return items.map((item) => {
    const serviceDocId = resolveIncludedServiceDocId(item, modxToArticle, byArticle, byModxId);
    const row: Record<string, unknown> = {
      label: item.label,
      sortOrder: item.sortOrder,
    };
    if (item.legacyModxId) row.legacyModxId = item.legacyModxId;
    if (serviceDocId) row.service = serviceDocId;
    return row;
  });
}

/**
 * Проставить isProgram и includedItems из MODX json_data / uslugiPrice.
 */
export async function syncSpbPrograms(
  client: StrapiClient,
  options: { categoryFilter?: string } = {},
): Promise<ProgramSyncReport> {
  const report: ProgramSyncReport = {
    scanned: 0,
    updated: 0,
    skipped: 0,
    noComposition: [],
    errors: [],
  };

  const rows = await loadSpbPricelistRows(options.categoryFilter);
  const candidates = rows.filter(
    (r) =>
      Number(r.published) === 1
      && String(r.doc_id).trim()
      && isProgramPricelistRow(r.tab, r.category, r.name),
  );

  const byArticle = new Map<string, { resourceId: number | null; name: string }>();
  for (const r of candidates) {
    const article = String(r.doc_id).trim();
    if (!byArticle.has(article)) {
      byArticle.set(article, {
        resourceId: r.resource_id ? Number(r.resource_id) : null,
        name: r.name,
      });
    }
  }

  const resourceIdByArticle = new Map<string, number>();
  for (const [article, meta] of byArticle) {
    const rid = await resolveProgramResourceId(meta.name, meta.resourceId);
    if (rid) resourceIdByArticle.set(article, rid);
  }

  const resourceIds = [...resourceIdByArticle.values()];

  const [modxTvs, modxToArticle, serviceIndex] = await Promise.all([
    loadModxProgramTvs(resourceIds),
    buildModxToArticleMap(),
    buildServiceIndex(client),
  ]);

  for (const [article, meta] of byArticle) {
    report.scanned += 1;
    const legacyId = serviceLegacyId(article);
    const existing = await client.findByLegacyId('services', legacyId, SPB_LOCALE);
    if (!existing?.documentId) {
      report.errors.push({ article, message: 'Нет Service в Strapi' });
      continue;
    }
    if (existing.contentLocked) {
      report.skipped += 1;
      continue;
    }

    const resourceId = resourceIdByArticle.get(article) ?? meta.resourceId ?? undefined;
    const tvs = resourceId ? modxTvs.get(resourceId) : undefined;
    const items = mergeProgramItems(
      parseJsonDataTv(tvs?.json_data ?? ''),
      parseUslugiPriceTv(tvs?.uslugiPrice ?? ''),
    );

    if (!items.length) {
      report.noComposition.push(article);
      continue;
    }

    const includedItems = itemsToComponents(
      items,
      modxToArticle,
      serviceIndex.byArticle,
      serviceIndex.byModxId,
    );

    const patch: Record<string, unknown> = {
      isProgram: true,
      includedItems,
      includedListTitle: 'Что входит в программу',
      locale: SPB_LOCALE,
    };
    const desc = String(tvs?.descriptionProgramm ?? tvs?.textContent ?? '').trim();
    if (desc) patch.description = desc;

    try {
      await client.updateEntry('services', existing.documentId, patch);
      report.updated += 1;
      await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
    } catch (e) {
      report.errors.push({
        article,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return report;
}
