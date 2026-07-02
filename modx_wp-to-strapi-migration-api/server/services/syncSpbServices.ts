import type { QmsPriceItem } from '../types/qmsPrice.js';
import type { StrapiClient } from './strapiClient.js';
import { fetchQmsPriceItems } from './qms/syncQmsPrices.js';
import {
  aggregateSpbServices,
  loadSpbModxEnrich,
  loadSpbPricelistRows,
} from './spb/spbPricelistSource.js';
import {
  categoryLegacyId,
  categorySlug,
  mapQmsSectionVal,
  mapSpbLegacyTab,
  serviceLegacyId,
} from './spb/spbServiceTabMapper.js';
import { syncSpbPlacements } from './spb/syncSpbPlacements.js';
import {
  SAFE_SERVICE_CATEGORY_FIELDS,
  SAFE_SERVICE_FIELDS,
  SPB_LOCALE,
  type ServiceSyncReport,
  type TabQms,
} from '../types/serviceSync.js';
import { generateHash, getSyncMap, updateSyncMap } from './syncWorker.js';
import { withSyncMutex } from '../lib/syncMutex.js';
import { LEGACY_DB_GUARD } from '../config/legacyDbGuard.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type SyncSpbServicesOptions = {
  /** Пилот: только одна рубрика pricelist_items2.category; undefined / all = весь прайс */
  categoryFilter?: string;
  /** Подпись в отчёте (например `all` или имя рубрики) */
  pilotLabel?: string;
  /** Подтянуть title/price/tab из QMS getPr */
  mergeQms?: boolean;
  /** Обогатить description/summary с MODX-страницы при создании */
  modxEnrich?: boolean;
};

function pickTabQms(tabLegacy: string, qmsSection?: string): TabQms | null {
  return mapQmsSectionVal(qmsSection ?? '') ?? mapSpbLegacyTab(tabLegacy);
}

async function upsertCategory(
  client: StrapiClient,
  name: string,
  tabLegacy: string,
  report: ServiceSyncReport,
): Promise<string | null> {
  const legacyId = categoryLegacyId(name);
  const payload = {
    title: name,
    slug: categorySlug(name),
    legacyId,
    legacySource: 'spb' as const,
    tabLegacy,
    tabQms: pickTabQms(tabLegacy),
    enabled: true,
    showInMenu: true,
    locale: SPB_LOCALE,
  };

  const existing = await client.findByLegacyId('service-categories', legacyId, SPB_LOCALE);
  const hash = generateHash(payload);

  if (!existing) {
    await client.createEntry('service-categories', {
      ...payload,
      publishedAt: new Date().toISOString(),
    });
    const created = await client.findByLegacyId('service-categories', legacyId, SPB_LOCALE);
    if (created?.documentId) {
      await updateSyncMap('spb', 'service-category', legacyId, created.documentId, hash);
      report.categories.created += 1;
      return created.documentId;
    }
    return null;
  }

  if (existing.contentLocked) {
    report.categories.skipped += 1;
    return existing.documentId;
  }

  const mapRow = await getSyncMap('spb', 'service-category', legacyId);
  if (mapRow?.data_hash === hash) {
    report.categories.skipped += 1;
    return existing.documentId;
  }

  const patch: Record<string, unknown> = {};
  for (const key of SAFE_SERVICE_CATEGORY_FIELDS) {
    patch[key] = payload[key as keyof typeof payload];
  }
  await client.updateEntry('service-categories', existing.documentId, {
    ...patch,
    locale: SPB_LOCALE,
  });
  await updateSyncMap('spb', 'service-category', legacyId, existing.documentId, hash);
  report.categories.updated += 1;
  return existing.documentId;
}

async function buildQmsIndex(merge: boolean): Promise<Map<string, QmsPriceItem>> {
  const map = new Map<string, QmsPriceItem>();
  if (!merge) return map;
  try {
    const { items } = await fetchQmsPriceItems('spb');
    for (const item of items) map.set(item.article, item);
  } catch {
    // пилот без QMS — остаёмся на legacy price
  }
  return map;
}

async function upsertService(
  client: StrapiClient,
  row: ReturnType<typeof aggregateSpbServices>[number],
  categoryDocIds: string[],
  qms: Map<string, QmsPriceItem>,
  modx: Map<number, { description?: string; summary?: string; seoTitle?: string }>,
  report: ServiceSyncReport,
): Promise<void> {
  const legacyId = serviceLegacyId(row.article);
  const qmsRow = qms.get(row.article);

  const payload: Record<string, unknown> = {
    article: row.article,
    title: qmsRow?.title?.trim() || row.title,
    price: qmsRow?.price?.trim() || row.price,
    tabQms: pickTabQms(row.tabLegacy, qmsRow?.sectionVal),
    legacyId,
    legacySource: 'spb',
    modxResourceId: row.modxResourceId,
    sortOrder: row.sortOrder,
    legacyOnly: !qmsRow,
    locale: SPB_LOCALE,
  };

  if (qmsRow) {
    payload.qmsSectionVal = qmsRow.sectionVal;
    payload.qmsOrgId = qmsRow.orgId;
    payload.misSyncAt = new Date().toISOString();
    report.qmsMerged = (report.qmsMerged ?? 0) + 1;
  }

  const existing = await client.findByLegacyId('services', legacyId, SPB_LOCALE);
  const hash = generateHash({ ...payload, categoryDocIds });

  if (!existing) {
    const enrich = row.modxResourceId ? modx.get(row.modxResourceId) : undefined;
    await client.createEntry('services', {
      ...payload,
      ...(enrich?.description ? { description: enrich.description } : {}),
      ...(enrich?.summary ? { summary: enrich.summary } : {}),
      ...(enrich?.seoTitle ? { seoTitle: enrich.seoTitle } : {}),
      publishedAt: row.published ? new Date().toISOString() : undefined,
    });
    const created = await client.findByLegacyId('services', legacyId, SPB_LOCALE);
    if (created?.documentId) {
      await client.setRelations(
        'services',
        created.documentId,
        { categories: categoryDocIds },
        SPB_LOCALE,
      );
      await updateSyncMap('spb', 'service', legacyId, created.documentId, hash);
      report.services.created += 1;
      report.relations.linked += 1;
    }
    return;
  }

  if (existing.contentLocked) {
    report.services.skipped += 1;
    return;
  }

  const mapRow = await getSyncMap('spb', 'service', legacyId);
  if (mapRow?.data_hash === hash) {
    report.services.skipped += 1;
    return;
  }

  const patch: Record<string, unknown> = {};
  for (const key of SAFE_SERVICE_FIELDS) {
    if (key === 'title' && existing.titleLocked) continue;
    if (key === 'price' && existing.priceLocked) continue;
    patch[key] = payload[key];
  }
  await client.updateEntry('services', existing.documentId, {
    ...patch,
    locale: SPB_LOCALE,
  });
  await client.setRelations(
    'services',
    existing.documentId,
    { categories: categoryDocIds },
    SPB_LOCALE,
  );
  await updateSyncMap('spb', 'service', legacyId, existing.documentId, hash);
  report.services.updated += 1;
  report.relations.linked += 1;
}

/**
 * Синк рубрик и услуг СПб из pricelist_items2 (+ опц. QMS, MODX enrich).
 */
export async function syncSpbServices(
  client: StrapiClient,
  options: SyncSpbServicesOptions = {},
): Promise<ServiceSyncReport> {
  const categoryFilter = options.categoryFilter?.trim() || undefined;
  const pilotLabel = options.pilotLabel ?? categoryFilter ?? 'all';
  const mergeQms = options.mergeQms !== false;
  const modxEnrich = options.modxEnrich !== false;

  return withSyncMutex(`services:spb:${pilotLabel}`, async () => {
    const report: ServiceSyncReport = {
      entity: 'service',
      pilotCategory: pilotLabel,
      categories: { created: 0, updated: 0, skipped: 0 },
      services: { created: 0, updated: 0, skipped: 0 },
      placements: { created: 0, updated: 0, skipped: 0 },
      relations: { linked: 0 },
      errors: [],
      qmsMerged: 0,
    };

    const rows = await loadSpbPricelistRows(categoryFilter);
    if (!rows.length) {
      throw new Error(
        categoryFilter
          ? `Нет строк прайса для category=${categoryFilter}`
          : 'Нет строк прайса (полный синк)',
      );
    }

    const aggregated = aggregateSpbServices(rows);
    const qms = await buildQmsIndex(mergeQms);

    const categoryNames = [...new Set(rows.map((r) => r.category).filter(Boolean))];
    const categoryDocIdByName = new Map<string, string>();

    for (const name of categoryNames) {
      const tabLegacy = rows.find((r) => r.category === name)?.tab ?? '';
      try {
        const docId = await upsertCategory(client, name, tabLegacy, report);
        if (docId) categoryDocIdByName.set(name, docId);
        await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
      } catch (e) {
        report.errors.push({
          legacyId: categoryLegacyId(name),
          message: e instanceof Error ? e.message : String(e),
        });
      }
    }

    const modxIds = modxEnrich
      ? aggregated.map((s) => s.modxResourceId).filter((id): id is number => Boolean(id))
      : [];
    const modx = modxEnrich ? await loadSpbModxEnrich(modxIds) : new Map();

    for (const service of aggregated) {
      const categoryDocIds = service.categories
        .map((c) => categoryDocIdByName.get(c))
        .filter((id): id is string => Boolean(id));

      if (!categoryDocIds.length) {
        report.errors.push({
          legacyId: serviceLegacyId(service.article),
          message: 'Нет Strapi category для услуги',
        });
        continue;
      }

      try {
        await upsertService(client, service, categoryDocIds, qms, modx, report);
        await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
      } catch (e) {
        report.errors.push({
          legacyId: serviceLegacyId(service.article),
          message: e instanceof Error ? e.message : String(e),
        });
      }
    }

    // Размещения: 1 строка pricelist_items2 → 1 ServicePlacement (без дублирования Service)
    await syncSpbPlacements(client, rows, categoryDocIdByName, report);

    return report;
  });
}
