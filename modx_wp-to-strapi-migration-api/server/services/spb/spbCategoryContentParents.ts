import fs from 'node:fs';
import type { StrapiClient } from '../strapiClient.js';
import { SPB_LOCALE } from '../../types/serviceSync.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';
import { resolveSpbMappingPath } from './spbMappingPaths.js';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const CONTENT_FIELDS = [
  'expertIntro',
  'aboutText',
  'aboutHeader',
  'seoTitle',
  'seoDescription',
  'bodyMiddle',
] as const;

/** Загрузить маппинг «дочерняя рубрика → родительская» */
export function loadCategoryContentParents(): Map<string, string> {
  const out = new Map<string, string>();
  const p = resolveSpbMappingPath('spb-category-content-parents.json');
  if (!p) return out;
  const raw = JSON.parse(fs.readFileSync(p, 'utf8')) as Record<string, string>;
  for (const [child, parent] of Object.entries(raw)) {
    if (child.startsWith('_')) continue;
    const c = child.trim();
    const par = String(parent ?? '').trim();
    if (c && par) out.set(c, par);
  }
  return out;
}

export type CategoryInheritReport = {
  inherited: number;
  linked: number;
  skipped: number;
  missingParent: string[];
  errors: Array<{ category: string; message: string }>;
};

/**
 * Дочерние рубрики без своего MODX-текста наследуют контент родителя в Strapi.
 * Также проставляет relation parent, если ещё не задан.
 */
export async function inheritSpbCategoryContent(
  client: StrapiClient,
): Promise<CategoryInheritReport> {
  const parents = loadCategoryContentParents();
  const report: CategoryInheritReport = {
    inherited: 0,
    linked: 0,
    skipped: 0,
    missingParent: [],
    errors: [],
  };

  const byTitle = new Map<string, { documentId: string; attrs: Record<string, unknown> }>();
  const rows = await client.listEntries('service-categories', {
    locale: SPB_LOCALE,
    fields: [...CONTENT_FIELDS, 'title', 'contentLocked', 'parent'],
  });
  for (const row of rows) {
    const title = String(row.attrs.title ?? '').trim();
    if (title) byTitle.set(title, { documentId: row.documentId, attrs: row.attrs });
  }

  for (const [childTitle, parentTitle] of parents) {
    const child = byTitle.get(childTitle);
    const parent = byTitle.get(parentTitle);
    if (!child) {
      report.skipped += 1;
      continue;
    }
    if (!parent) {
      report.missingParent.push(`${childTitle}→${parentTitle}`);
      continue;
    }
    if (child.attrs.contentLocked) {
      report.skipped += 1;
      continue;
    }

    const contentPatch: Record<string, unknown> = {};
    for (const key of CONTENT_FIELDS) {
      const cur = String(child.attrs[key] ?? '').trim();
      const fromParent = String(parent.attrs[key] ?? '').trim();
      if (!cur && fromParent) contentPatch[key] = fromParent;
    }

    let didWork = false;
    try {
      if (Object.keys(contentPatch).length) {
        await client.updateEntry('service-categories', child.documentId, {
          ...contentPatch,
          locale: SPB_LOCALE,
        });
        didWork = true;
      }
      if (!child.attrs.parent) {
        await client.updateEntry('service-categories', child.documentId, {
          parent: parent.documentId,
          locale: SPB_LOCALE,
        });
        report.linked += 1;
        didWork = true;
      }
      if (didWork) {
        report.inherited += 1;
        await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
      } else {
        report.skipped += 1;
      }
    } catch (e) {
      report.errors.push({
        category: childTitle,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return report;
}
