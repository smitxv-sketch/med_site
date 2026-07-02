import type { StrapiClient } from '../strapiClient.js';
import { categoryLegacyId } from './spbServiceTabMapper.js';
import {
  categoryEnrichToPayload,
  loadSpbCategoryModxEnrich,
  resolveCategoryModxIds,
  resolveEnrichCategoryNames,
} from './spbCategoryContent.js';
import { inheritSpbCategoryContent } from './spbCategoryContentParents.js';
import { SPB_LOCALE } from '../../types/serviceSync.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type CategoryEnrichReport = {
  categories: string[];
  updated: number;
  skipped: number;
  missingModx: string[];
  errors: Array<{ category: string; message: string }>;
};

/**
 * Обогащение ServiceCategory текстами с MODX-страниц направлений.
 * Не перезаписывает поля, если contentLocked или поле уже заполнено.
 */
export async function syncSpbCategoryContent(
  client: StrapiClient,
  options: { categories?: string[] } = {},
): Promise<CategoryEnrichReport> {
  let categories = options.categories;
  if (!categories?.length) {
    const strapiRows = await client.listEntries('service-categories', {
      locale: SPB_LOCALE,
      fields: ['title'],
    });
    const strapiTitles = strapiRows
      .map((r) => String(r.attrs.title ?? '').trim())
      .filter(Boolean);
    categories = await resolveEnrichCategoryNames({ strapiTitles });
  }

  const modxIds = await resolveCategoryModxIds(categories);
  const enrichByResource = await loadSpbCategoryModxEnrich([...modxIds.values()]);

  const report: CategoryEnrichReport = {
    categories,
    updated: 0,
    skipped: 0,
    missingModx: [],
    errors: [],
  };

  for (const category of categories) {
    const resourceId = modxIds.get(category);
    if (!resourceId) {
      report.missingModx.push(category);
      continue;
    }
    const enrich = enrichByResource.get(resourceId);
    if (!enrich) {
      report.missingModx.push(category);
      continue;
    }

    const legacyId = categoryLegacyId(category);
    try {
      const existing = await client.findByLegacyId('service-categories', legacyId, SPB_LOCALE);
      if (!existing?.documentId) {
        report.errors.push({ category, message: 'Нет ServiceCategory в Strapi' });
        continue;
      }
      if (existing.contentLocked) {
        report.skipped += 1;
        continue;
      }

      const cur = existing.attrs ?? {};
      const patch = categoryEnrichToPayload(enrich);
      const fields = ['seoTitle', 'seoDescription', 'expertIntro', 'aboutHeader', 'aboutText', 'bodyMiddle'] as const;
      const toWrite: Record<string, string> = {};
      for (const key of fields) {
        if (patch[key] && !String(cur[key] ?? '').trim()) toWrite[key] = patch[key];
      }
      if (!Object.keys(toWrite).length) {
        report.skipped += 1;
        continue;
      }

      await client.updateEntry('service-categories', existing.documentId, {
        ...toWrite,
        locale: SPB_LOCALE,
      });
      report.updated += 1;
      await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
    } catch (e) {
      report.errors.push({
        category,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  const inheritReport = await inheritSpbCategoryContent(client);
  report.updated += inheritReport.inherited;
  report.errors.push(...inheritReport.errors);

  return report;
}
