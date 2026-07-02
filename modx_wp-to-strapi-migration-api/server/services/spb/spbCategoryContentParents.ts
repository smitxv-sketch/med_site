import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { StrapiClient } from '../strapiClient.js';
import { SPB_LOCALE } from '../../types/serviceSync.js';
import { LEGACY_DB_GUARD } from '../../config/legacyDbGuard.js';

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
  const roots = [
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../docs/mappings/spb-category-content-parents.json'),
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../mappings/spb-category-content-parents.json'),
  ];
  const out = new Map<string, string>();
  for (const p of roots) {
    if (!fs.existsSync(p)) continue;
    const raw = JSON.parse(fs.readFileSync(p, 'utf8')) as Record<string, string>;
    for (const [child, parent] of Object.entries(raw)) {
      if (child.startsWith('_')) continue;
      const c = child.trim();
      const par = String(parent ?? '').trim();
      if (c && par) out.set(c, par);
    }
    break;
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

    const toWrite: Record<string, unknown> = {};
    for (const key of CONTENT_FIELDS) {
      const cur = String(child.attrs[key] ?? '').trim();
      const fromParent = String(parent.attrs[key] ?? '').trim();
      if (!cur && fromParent) toWrite[key] = fromParent;
    }

    if (!child.attrs.parent) {
      toWrite.parent = parent.documentId;
      report.linked += 1;
    }

    if (!Object.keys(toWrite).length) {
      report.skipped += 1;
      continue;
    }

    try {
      await client.updateEntry('service-categories', child.documentId, {
        ...toWrite,
        locale: SPB_LOCALE,
      });
      report.inherited += 1;
      await sleep(LEGACY_DB_GUARD.syncUpsertDelayMs);
    } catch (e) {
      report.errors.push({
        category: childTitle,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return report;
}
