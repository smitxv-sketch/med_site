import type { QmsPriceItem } from '../types/qmsPrice.js';
import type { StrapiClient } from './strapiClient.js';
import { fetchQmsPriceItems } from './qms/syncQmsPrices.js';
import { mapQmsSectionVal } from './spb/spbServiceTabMapper.js';
import {
  loadChelDirection,
  loadChelServicesForDirection,
  parseWpBool,
  type ChelDirectionBundle,
  type ChelServiceRow,
} from './chel/chelServicesSource.js';
import { chelCategoryLegacyId, chelServiceLegacyId } from './chel/chelServiceIds.js';
import {
  CHEL_LOCALE,
  SAFE_SERVICE_CATEGORY_FIELDS,
  SAFE_SERVICE_FIELDS,
  SYNC_MAP_CITY,
  type ServiceSyncReport,
  type TabQms,
} from '../types/serviceSync.js';
import { generateHash, getSyncMap, updateSyncMap } from './syncWorker.js';
import { withSyncMutex } from '../lib/syncMutex.js';
import { LEGACY_DB_GUARD } from '../config/legacyDbGuard.js';

const CITY_KEY = SYNC_MAP_CITY.chel;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type SyncChelServicesOptions = {
  /** Пилот: term_id рубрики directions (по умолчанию Анестезиология) */
  directionId?: number;
  mergeQms?: boolean;
};

function categoryPayload(direction: ChelDirectionBundle): Record<string, unknown> {
  const m = direction.contentMeta;
  return {
    title: direction.name,
    slug: direction.slug,
    legacyId: chelCategoryLegacyId(direction.termId),
    legacySource: 'chel',
    tabQms: null,
    tabLegacy: '',
    sortOrder: Number.parseInt(m.ord ?? '0', 10) || 0,
    enabled: parseWpBool(m.enabled, true),
    showInMenu: parseWpBool(m.enabled_menu, true),
    showFaqs: parseWpBool(m.faqs_view, false),
    showReviews: parseWpBool(m.reviews_view, false),
    locale: CHEL_LOCALE,
  };
}

function categoryImportOnce(direction: ChelDirectionBundle): Record<string, unknown> {
  const m = direction.contentMeta;
  const patch: Record<string, unknown> = {};
  if (m.text?.trim()) patch.expertIntro = m.text.trim();
  if (m.about_header?.trim()) patch.aboutHeader = m.about_header.trim();
  if (m.about_text?.trim()) patch.aboutText = m.about_text.trim();
  if (m.about_video?.trim()) patch.aboutVideo = m.about_video.trim();
  if (m.seo_title?.trim()) patch.seoTitle = m.seo_title.trim();
  if (m.seo_description?.trim()) patch.seoDescription = m.seo_description.trim();
  if (m.text_middle?.trim()) patch.bodyMiddle = m.text_middle.trim();
  return patch;
}

async function upsertCategory(
  client: StrapiClient,
  direction: ChelDirectionBundle,
  report: ServiceSyncReport,
): Promise<string | null> {
  const payload = categoryPayload(direction);
  const legacyId = String(payload.legacyId);
  const existing = await client.findByLegacyId('service-categories', legacyId, CHEL_LOCALE);
  const hash = generateHash(payload);

  if (!existing) {
    await client.createEntry('service-categories', {
      ...payload,
      ...categoryImportOnce(direction),
      publishedAt: parseWpBool(direction.contentMeta.enabled, true)
        ? new Date().toISOString()
        : undefined,
    });
    const created = await client.findByLegacyId('service-categories', legacyId, CHEL_LOCALE);
    if (created?.documentId) {
      await updateSyncMap(CITY_KEY, 'service-category', legacyId, created.documentId, hash);
      report.categories.created += 1;
      return created.documentId;
    }
    return null;
  }

  if (existing.contentLocked) {
    report.categories.skipped += 1;
    return existing.documentId;
  }

  const mapRow = await getSyncMap(CITY_KEY, 'service-category', legacyId);
  if (mapRow?.data_hash === hash) {
    report.categories.skipped += 1;
    return existing.documentId;
  }

  const patch: Record<string, unknown> = {};
  for (const key of SAFE_SERVICE_CATEGORY_FIELDS) {
    patch[key] = payload[key];
  }
  await client.updateEntry('service-categories', existing.documentId, {
    ...patch,
    locale: CHEL_LOCALE,
  });
  await updateSyncMap(CITY_KEY, 'service-category', legacyId, existing.documentId, hash);
  report.categories.updated += 1;
  return existing.documentId;
}

async function buildQmsIndex(merge: boolean): Promise<Map<string, QmsPriceItem>> {
  const map = new Map<string, QmsPriceItem>();
  if (!merge) return map;
  try {
    const { items } = await fetchQmsPriceItems('chel');
    for (const item of items) map.set(item.article, item);
  } catch {
    // пилот без QMS — legacy price/title
  }
  return map;
}

function servicePayload(
  row: ChelServiceRow,
  qmsRow: QmsPriceItem | undefined,
): Record<string, unknown> {
  const m = row.meta;
  const article = (qmsRow?.article || m.article || '').trim();
  const tabQms: TabQms | null = qmsRow?.sectionVal
    ? mapQmsSectionVal(qmsRow.sectionVal)
    : null;

  const published =
    row.status === 'publish' && parseWpBool(m.enabled, true);

  return {
    article: article || chelServiceLegacyId(row.postId),
    title: qmsRow?.title?.trim() || row.title,
    price: qmsRow?.price?.trim() || String(m.price ?? '').trim(),
    tabQms,
    legacyId: chelServiceLegacyId(row.postId),
    legacySource: 'chel',
    legacyDextraId: m.dextra_id?.trim() || undefined,
    legacyDextraCategoryId: m.dextra_category_id?.trim() || undefined,
    sortOrder: Number.parseInt(m.ord ?? '0', 10) || 0,
    legacyOnly: !qmsRow,
    hasDetailPage: parseWpBool(m.item_view, false),
    showFaqs: parseWpBool(m.faqs_view, false),
    showReviews: parseWpBool(m.reviews_view, false),
    isTelemedicine: parseWpBool(m.telemedecine, false),
    locale: CHEL_LOCALE,
    _published: published,
  };
}

function serviceImportOnce(row: ChelServiceRow): Record<string, unknown> {
  const m = row.meta;
  const patch: Record<string, unknown> = {};
  const desc = m.text?.trim() || m.about_text?.trim();
  if (desc) patch.description = desc;
  if (m.text_welcome?.trim()) patch.intro = m.text_welcome.trim();
  if (m.anonce?.trim()) patch.summary = m.anonce.trim();
  if (m.seo_title?.trim()) patch.seoTitle = m.seo_title.trim();
  if (m.seo_description?.trim()) patch.seoDescription = m.seo_description.trim();
  return patch;
}

async function upsertService(
  client: StrapiClient,
  row: ChelServiceRow,
  categoryDocId: string,
  qms: Map<string, QmsPriceItem>,
  report: ServiceSyncReport,
): Promise<void> {
  const articleKey = row.meta.article?.trim();
  const qmsRow = articleKey ? qms.get(articleKey) : undefined;
  const raw = servicePayload(row, qmsRow);
  const published = Boolean(raw._published);
  delete raw._published;

  const payload = raw;
  if (qmsRow) {
    payload.qmsSectionVal = qmsRow.sectionVal;
    payload.qmsOrgId = qmsRow.orgId;
    payload.misSyncAt = new Date().toISOString();
    report.qmsMerged = (report.qmsMerged ?? 0) + 1;
  }

  const legacyId = String(payload.legacyId);
  const categoryDocIds = [categoryDocId];
  const existing = await client.findByLegacyId('services', legacyId, CHEL_LOCALE);
  const hash = generateHash({ ...payload, categoryDocIds });

  if (!existing) {
    await client.createEntry('services', {
      ...payload,
      ...serviceImportOnce(row),
      publishedAt: published ? new Date().toISOString() : undefined,
    });
    const created = await client.findByLegacyId('services', legacyId, CHEL_LOCALE);
    if (created?.documentId) {
      await client.setRelations(
        'services',
        created.documentId,
        { categories: categoryDocIds },
        CHEL_LOCALE,
      );
      await updateSyncMap(CITY_KEY, 'service', legacyId, created.documentId, hash);
      report.services.created += 1;
      report.relations.linked += 1;
    }
    return;
  }

  if (existing.contentLocked) {
    report.services.skipped += 1;
    return;
  }

  const mapRow = await getSyncMap(CITY_KEY, 'service', legacyId);
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
    locale: CHEL_LOCALE,
  });
  await client.setRelations(
    'services',
    existing.documentId,
    { categories: categoryDocIds },
    CHEL_LOCALE,
  );
  await updateSyncMap(CITY_KEY, 'service', legacyId, existing.documentId, hash);
  report.services.updated += 1;
  report.relations.linked += 1;
}

/**
 * Синк рубрики directions + услуг ЧЛБ (пилот по term_id).
 */
export async function syncChelServices(
  client: StrapiClient,
  options: SyncChelServicesOptions = {},
): Promise<ServiceSyncReport> {
  const directionId = options.directionId ?? 569;
  const mergeQms = options.mergeQms !== false;

  return withSyncMutex(`services:chel:${directionId}`, async () => {
    const report: ServiceSyncReport = {
      entity: 'service',
      pilotCategory: `direction:${directionId}`,
      categories: { created: 0, updated: 0, skipped: 0 },
      services: { created: 0, updated: 0, skipped: 0 },
      placements: { created: 0, updated: 0, skipped: 0 },
      relations: { linked: 0 },
      errors: [],
      qmsMerged: 0,
    };

    const direction = await loadChelDirection(directionId);
    if (!direction) {
      throw new Error(`Рубрика directions не найдена: term_id=${directionId}`);
    }

    const services = await loadChelServicesForDirection(directionId);
    if (!services.length) {
      throw new Error(`Нет опубликованных услуг для term_id=${directionId}`);
    }

    const qms = await buildQmsIndex(mergeQms);

    let categoryDocId: string | null = null;
    try {
      categoryDocId = await upsertCategory(client, direction, report);
      await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
    } catch (e) {
      report.errors.push({
        legacyId: chelCategoryLegacyId(directionId),
        message: e instanceof Error ? e.message : String(e),
      });
    }

    if (!categoryDocId) {
      return report;
    }

    for (const service of services) {
      try {
        await upsertService(client, service, categoryDocId, qms, report);
        await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
      } catch (e) {
        report.errors.push({
          legacyId: chelServiceLegacyId(service.postId),
          message: e instanceof Error ? e.message : String(e),
        });
      }
    }

    return report;
  });
}
