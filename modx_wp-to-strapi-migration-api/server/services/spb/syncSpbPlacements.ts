import type { StrapiClient } from '../strapiClient.js';
import type { SpbPricelistRow } from './spbPricelistSource.js';
import {
  mapQmsSectionVal,
  mapSpbLegacyTab,
  placementLegacyId,
  serviceLegacyId,
} from './spbServiceTabMapper.js';
import {
  SAFE_PLACEMENT_FIELDS,
  SPB_LOCALE,
  type ServiceSyncReport,
  type TabQms,
} from '../../types/serviceSync.js';
import { generateHash, getSyncMap, updateSyncMap } from '../syncWorker.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function pickTabQms(tabLegacy: string, qmsSection?: string): TabQms | null {
  return mapQmsSectionVal(qmsSection ?? '') ?? mapSpbLegacyTab(tabLegacy);
}

/** Живые опубликованные строки прайса → размещения (1 строка = 1 placement) */
export function rowsForPlacements(rows: SpbPricelistRow[]): SpbPricelistRow[] {
  return rows.filter(
    (r) =>
      String(r.doc_id ?? '').trim() !== ''
      && String(r.category ?? '').trim() !== ''
      && (r.deleted === null || Number(r.deleted) === 0)
      && Number(r.published) === 1,
  );
}

async function upsertPlacement(
  client: StrapiClient,
  row: SpbPricelistRow,
  serviceDocId: string,
  categoryDocId: string,
  report: ServiceSyncReport,
): Promise<void> {
  const article = String(row.doc_id).trim();
  const category = String(row.category).trim();
  const tabLegacy = String(row.tab ?? '').trim();
  const legacyId = placementLegacyId(article, category, tabLegacy);

  const payload = {
    legacyId,
    service: serviceDocId,
    category: categoryDocId,
    tabQms: pickTabQms(tabLegacy),
    tabLegacy,
    sortOrder: Number(row.sorts ?? 0) || 0,
    enabled: true,
    locale: SPB_LOCALE,
  };

  const hash = generateHash(payload);
  const existing = await client.findByLegacyId('service-placements', legacyId, SPB_LOCALE);

  if (!existing) {
    await client.createEntry('service-placements', payload);
    const created = await client.findByLegacyId('service-placements', legacyId, SPB_LOCALE);
    if (created?.documentId) {
      await updateSyncMap('spb', 'service-placement', legacyId, created.documentId, hash);
      report.placements.created += 1;
    }
    return;
  }

  const mapRow = await getSyncMap('spb', 'service-placement', legacyId);
  if (mapRow?.data_hash === hash) {
    report.placements.skipped += 1;
    return;
  }

  const patch: Record<string, unknown> = {};
  for (const key of SAFE_PLACEMENT_FIELDS) {
    patch[key] = payload[key as keyof typeof payload];
  }
  patch.service = serviceDocId;
  patch.category = categoryDocId;

  await client.updateEntry('service-placements', existing.documentId, {
    ...patch,
    locale: SPB_LOCALE,
  });
  await updateSyncMap('spb', 'service-placement', legacyId, existing.documentId, hash);
  report.placements.updated += 1;
}

/**
 * Синк ServicePlacement из сырых строк pricelist_items2.
 * Вызывать после upsert Service (нужны documentId услуг и рубрик).
 */
export async function syncSpbPlacements(
  client: StrapiClient,
  rows: SpbPricelistRow[],
  categoryDocIdByName: Map<string, string>,
  report: ServiceSyncReport,
): Promise<void> {
  for (const row of rowsForPlacements(rows)) {
    const article = String(row.doc_id).trim();
    const category = String(row.category).trim();
    const categoryDocId = categoryDocIdByName.get(category);
    if (!categoryDocId) {
      report.errors.push({
        legacyId: placementLegacyId(article, category, String(row.tab ?? '')),
        message: `Нет Strapi category для placement: ${category}`,
      });
      continue;
    }

    const service = await client.findByLegacyId(
      'services',
      serviceLegacyId(article),
      SPB_LOCALE,
    );
    if (!service?.documentId) {
      report.errors.push({
        legacyId: placementLegacyId(article, category, String(row.tab ?? '')),
        message: `Нет Strapi service для article=${article}`,
      });
      continue;
    }

    try {
      await upsertPlacement(client, row, service.documentId, categoryDocId, report);
      await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
    } catch (e) {
      report.errors.push({
        legacyId: placementLegacyId(article, category, String(row.tab ?? '')),
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }
}
