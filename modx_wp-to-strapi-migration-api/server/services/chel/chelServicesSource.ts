import { dbChel } from '../../dbChel.js';

const CONTENT_META_SKIP = /^_/;

export type ChelDirectionBundle = {
  termId: number;
  name: string;
  slug: string;
  parent: number;
  meta: Record<string, string>;
  contentMeta: Record<string, string>;
};

export type ChelServiceRow = {
  postId: number;
  title: string;
  slug: string;
  status: string;
  meta: Record<string, string>;
  /** Все рубрики directions поста (для M2M) */
  directionTermIds: number[];
};

function toContentMeta(meta: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (!CONTENT_META_SKIP.test(key)) out[key] = value;
  }
  return out;
}

/** Рубрика directions + termmeta */
export async function loadChelDirection(termId: number): Promise<ChelDirectionBundle | null> {
  const [terms] = await dbChel.query(
    `SELECT t.term_id AS termId, t.name, t.slug, tt.parent
     FROM wp_terms t
     INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
     WHERE t.term_id = ? AND tt.taxonomy IN ('directions', 'direction')
     LIMIT 1`,
    [termId],
  );
  const term = (terms as Array<{ termId: number; name: string; slug: string; parent: number }>)[0];
  if (!term) return null;

  const [metaRows] = await dbChel.query(
    `SELECT meta_key, meta_value FROM wp_termmeta WHERE term_id = ?`,
    [termId],
  );

  const meta: Record<string, string> = {};
  for (const row of metaRows as Array<{ meta_key: string; meta_value: string }>) {
    meta[row.meta_key] = row.meta_value ?? '';
  }

  return {
    termId: term.termId,
    name: term.name,
    slug: term.slug,
    parent: term.parent,
    meta,
    contentMeta: toContentMeta(meta),
  };
}

const SERVICE_META_KEYS = [
  'article',
  'price',
  'enabled',
  'ord',
  'item_view',
  'faqs_view',
  'reviews_view',
  'telemedecine',
  'dextra_id',
  'dextra_category_id',
  'text',
  'text_welcome',
  'anonce',
  'about_text',
  'seo_title',
  'seo_description',
] as const;

/** Услуги одной рубрики directions (publish) */
export async function loadChelServicesForDirection(termId: number): Promise<ChelServiceRow[]> {
  const [posts] = await dbChel.query(
    `SELECT DISTINCT p.ID AS postId, p.post_title AS title, p.post_name AS slug, p.post_status AS status
     FROM wp_posts p
     INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
     INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
     WHERE tt.term_id = ? AND p.post_type = 'services' AND p.post_status = 'publish'
     ORDER BY p.ID`,
    [termId],
  );

  const rows = posts as Array<{ postId: number; title: string; slug: string; status: string }>;
  if (!rows.length) return [];

  const postIds = rows.map((r) => r.postId);
  const metaByPost = await loadServiceMetaBatch(postIds);
  const directionsByPost = await loadServiceDirectionsBatch(postIds);

  return rows.map((row) => ({
    postId: row.postId,
    title: row.title,
    slug: row.slug,
    status: row.status,
    meta: metaByPost.get(row.postId) ?? {},
    directionTermIds: directionsByPost.get(row.postId) ?? [termId],
  }));
}

async function loadServiceMetaBatch(postIds: number[]): Promise<Map<number, Record<string, string>>> {
  const out = new Map<number, Record<string, string>>();
  if (!postIds.length) return out;

  const placeholders = postIds.map(() => '?').join(',');
  const keys = SERVICE_META_KEYS.map((k) => `'${k}'`).join(',');
  const [metaRows] = await dbChel.query(
    `SELECT post_id, meta_key, meta_value
     FROM wp_postmeta
     WHERE post_id IN (${placeholders}) AND meta_key IN (${keys})`,
    postIds,
  );

  for (const row of metaRows as Array<{ post_id: number; meta_key: string; meta_value: string }>) {
    const cur = out.get(row.post_id) ?? {};
    cur[row.meta_key] = row.meta_value ?? '';
    out.set(row.post_id, cur);
  }
  return out;
}

async function loadServiceDirectionsBatch(postIds: number[]): Promise<Map<number, number[]>> {
  const out = new Map<number, number[]>();
  if (!postIds.length) return out;

  const placeholders = postIds.map(() => '?').join(',');
  const [relRows] = await dbChel.query(
    `SELECT tr.object_id AS postId, tt.term_id AS termId
     FROM wp_term_relationships tr
     INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
     WHERE tr.object_id IN (${placeholders})
       AND tt.taxonomy IN ('directions', 'direction')`,
    postIds,
  );

  for (const row of relRows as Array<{ postId: number; termId: number }>) {
    const list = out.get(row.postId) ?? [];
    if (!list.includes(row.termId)) list.push(row.termId);
    out.set(row.postId, list);
  }
  return out;
}

export function parseWpBool(raw: string | undefined, defaultValue = true): boolean {
  if (raw === undefined || raw === '') return defaultValue;
  const v = raw.trim().toLowerCase();
  if (v === '0' || v === 'false' || v === 'no') return false;
  return true;
}
