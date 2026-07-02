import { pool, getPrefix } from '../../db.js';
import { LegacyMysqlGateway } from '../../legacy/LegacyMysqlGateway.js';

export type SpbPricelistRow = {
  id: number;
  resource_id: number | null;
  doc_id: string;
  name: string;
  price: string;
  published: number;
  tab: string;
  category: string;
  sorts: number | null;
  deleted: number | null;
};

/** Строки прайса СПб (live = не deleted) */
export async function loadSpbPricelistRows(categoryFilter?: string): Promise<SpbPricelistRow[]> {
  const prefix = getPrefix();
  const params: string[] = [];
  let where = '(deleted IS NULL OR deleted = 0)';
  if (categoryFilter) {
    where += ' AND category = ?';
    params.push(categoryFilter);
  }
  const [rows] = await pool.query(
    `SELECT id, resource_id, doc_id, name, price, published, tab, category, sorts, deleted
     FROM ${prefix}pricelist_items2
     WHERE ${where}
     ORDER BY doc_id, published DESC, sorts ASC, id ASC`,
    params,
  );
  return (rows as SpbPricelistRow[]).map((row) => ({
    ...row,
    doc_id: String(row.doc_id ?? '').trim(),
    category: String(row.category ?? '').trim(),
    tab: String(row.tab ?? '').trim(),
    name: String(row.name ?? '').trim(),
  }));
}

export type AggregatedSpbService = {
  article: string;
  title: string;
  price: string;
  published: boolean;
  tabLegacy: string;
  categories: string[];
  modxResourceId: number | null;
  legacyPriceRowId: number;
  sortOrder: number;
};

/** Одна услуга = один doc_id; несколько строк прайса сливаются */
export function aggregateSpbServices(rows: SpbPricelistRow[]): AggregatedSpbService[] {
  const byArticle = new Map<string, SpbPricelistRow[]>();
  for (const row of rows) {
    const article = String(row.doc_id ?? '').trim();
    if (!article) continue;
    const list = byArticle.get(article) ?? [];
    list.push(row);
    byArticle.set(article, list);
  }

  const out: AggregatedSpbService[] = [];
  for (const [article, group] of byArticle) {
    const publishedRows = group.filter((r) => Number(r.published) === 1);
    const pick = publishedRows[0] ?? group[0];
    const categories = [...new Set(group.map((r) => r.category).filter(Boolean))];
    out.push({
      article,
      title: pick.name?.trim() || article,
      price: String(pick.price ?? '').trim(),
      published: publishedRows.length > 0,
      tabLegacy: pick.tab?.trim() || '',
      categories,
      modxResourceId: pick.resource_id ? Number(pick.resource_id) : null,
      legacyPriceRowId: pick.id,
      sortOrder: Number(pick.sorts ?? 0) || 0,
    });
  }
  return out;
}

export type SpbModxPageEnrich = {
  description?: string;
  summary?: string;
  seoTitle?: string;
};

/** Краткое обогащение со страницы MODX (templates 6/32) — import-once */
export async function loadSpbModxEnrich(
  resourceIds: number[],
): Promise<Map<number, SpbModxPageEnrich>> {
  const out = new Map<number, SpbModxPageEnrich>();
  if (!resourceIds.length) return out;

  const gw = LegacyMysqlGateway.get('spb');
  const prefix = gw.getPrefix();
  const ids = [...new Set(resourceIds)].filter((id) => id > 0);
  if (!ids.length) return out;

  const [tvs] = await gw.query(
    `SELECT tvc.contentid, tv.name, tvc.value
     FROM ${prefix}site_tmplvar_contentvalues tvc
     JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
     WHERE tvc.contentid IN (${ids.join(',')})
       AND tv.name IN ('des', 'minText', 'title')`,
  );

  for (const row of tvs as Array<{ contentid: number; name: string; value: string }>) {
    const cur = out.get(row.contentid) ?? {};
    const val = String(row.value ?? '').trim();
    if (!val) continue;
    if (row.name === 'des') cur.description = val;
    if (row.name === 'minText') cur.summary = val;
    if (row.name === 'title') cur.seoTitle = val;
    out.set(row.contentid, cur);
  }
  return out;
}
