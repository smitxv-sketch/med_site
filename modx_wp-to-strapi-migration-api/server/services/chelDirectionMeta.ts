import { dbChel } from '../dbChel.js';

/** ACF служебные ключи — не контент */
const SKIP_META_PREFIX = '_';

/** Ключи termmeta, по которым ищем блок «врач + текст» на рубрике */
const DOCTOR_META_HINTS = /doctor|vrach|sotrudnik|specialist|expert|curator/i;
const INTRO_META_HINTS = /desc|text|welcome|about|intro|anonce|content/i;

export type ChelDirectionTermRow = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  taxonomy: string;
  description: string;
};

export type ChelResolvedStaffPost = {
  id: number;
  postType: string;
  title: string;
  slug: string;
  status: string;
  photoUrl: string | null;
  position: string | null;
};

export type ChelDirectionMetaProbe = {
  term: ChelDirectionTermRow;
  meta: Record<string, string>;
  /** Поля без ACF-префикса _ — для маппинга в Strapi */
  contentMeta: Record<string, string>;
  doctorMetaKeys: string[];
  introMetaKeys: string[];
  resolvedStaff: ChelResolvedStaffPost | null;
  linkedServicesCount: number;
  sampleServiceIds: number[];
};

function isContentMetaKey(key: string): boolean {
  return Boolean(key) && !key.startsWith(SKIP_META_PREFIX);
}

function pickMetaHints(meta: Record<string, string>) {
  const doctorMetaKeys: string[] = [];
  const introMetaKeys: string[] = [];
  for (const key of Object.keys(meta)) {
    if (!isContentMetaKey(key)) continue;
    if (DOCTOR_META_HINTS.test(key)) doctorMetaKeys.push(key);
    if (INTRO_META_HINTS.test(key)) introMetaKeys.push(key);
  }
  return { doctorMetaKeys, introMetaKeys };
}

/** Разрешаем ID поста сотрудника из значения meta (ACF post object / ID) */
function parsePostId(raw: string | undefined): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (/^\d+$/.test(trimmed)) return Number.parseInt(trimmed, 10);
  try {
    const parsed = JSON.parse(trimmed) as { ID?: number; id?: number };
    const id = parsed.ID ?? parsed.id;
    return typeof id === 'number' ? id : null;
  } catch {
    return null;
  }
}

async function fetchStaffByUserId(userId: number): Promise<ChelResolvedStaffPost | null> {
  const [users] = await dbChel.query(
    `SELECT ID, display_name FROM wp_users WHERE ID = ? LIMIT 1`,
    [userId],
  );
  const user = (users as Array<{ ID: number; display_name: string }>)[0];
  if (!user) return null;

  const [posts] = await dbChel.query(
    `SELECT ID, post_title, post_name, post_type, post_status
     FROM wp_posts
     WHERE post_author = ? AND post_status = 'publish'
       AND post_type IN ('sotrudniki', 'doctor', 'doctors', 'specialist')
     ORDER BY ID DESC LIMIT 1`,
    [userId],
  );
  const post = (posts as Array<Record<string, unknown>>)[0];
  if (post) {
    return fetchStaffPost(Number(post.ID));
  }

  return {
    id: userId,
    postType: 'wp_user',
    title: user.display_name,
    slug: '',
    status: 'publish',
    photoUrl: null,
    position: null,
  };
}

async function fetchStaffPost(postId: number): Promise<ChelResolvedStaffPost | null> {
  const [posts] = await dbChel.query(
    `SELECT ID, post_title, post_name, post_type, post_status
     FROM wp_posts WHERE ID = ? LIMIT 1`,
    [postId],
  );
  const row = (posts as Array<Record<string, unknown>>)[0];
  if (!row) return null;

  const id = Number(row.ID);
  const [metaRows] = await dbChel.query(
    `SELECT meta_key, meta_value FROM wp_postmeta
     WHERE post_id = ? AND meta_key IN ('_photo', 'photo', 'position', 'anonce', 'feed_spec')`,
    [id],
  );

  const metaMap: Record<string, string> = {};
  for (const m of metaRows as Array<{ meta_key: string; meta_value: string }>) {
    metaMap[m.meta_key] = m.meta_value;
  }

  let photoUrl: string | null = null;
  const photoRef = metaMap._photo || metaMap.photo;
  if (photoRef && /^\d+$/.test(photoRef)) {
    const [files] = await dbChel.query(
      `SELECT guid FROM wp_posts WHERE ID = ? AND post_type = 'attachment' LIMIT 1`,
      [Number.parseInt(photoRef, 10)],
    );
    const file = (files as Array<{ guid: string }>)[0];
    photoUrl = file?.guid ?? null;
  }

  return {
    id,
    postType: String(row.post_type ?? ''),
    title: String(row.post_title ?? ''),
    slug: String(row.post_name ?? ''),
    status: String(row.post_status ?? ''),
    photoUrl,
    position: metaMap.position || metaMap.anonce || metaMap.feed_spec || null,
  };
}

async function resolveStaffFromMeta(
  meta: Record<string, string>,
  doctorMetaKeys: string[],
): Promise<ChelResolvedStaffPost | null> {
  // Явный doctor_id на рубрике (ACF) — приоритет
  const directId = parsePostId(meta.doctor_id);
  if (directId) {
    const byPost = await fetchStaffPost(directId);
    if (byPost) return byPost;
    const byUser = await fetchStaffByUserId(directId);
    if (byUser) return byUser;
  }

  for (const key of doctorMetaKeys) {
    const postId = parsePostId(meta[key]);
    if (postId) {
      const staff = await fetchStaffPost(postId);
      if (staff) return staff;
    }
  }
  return null;
}

async function countLinkedServices(termId: number): Promise<{ count: number; sampleIds: number[] }> {
  const [rows] = await dbChel.query(
    `SELECT DISTINCT p.ID
     FROM wp_posts p
     INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
     INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
     WHERE tt.term_id = ? AND p.post_type = 'services' AND p.post_status = 'publish'
     LIMIT 10`,
    [termId],
  );
  const ids = (rows as Array<{ ID: number }>).map((r) => r.ID);
  const [countRows] = await dbChel.query(
    `SELECT COUNT(DISTINCT p.ID) AS c
     FROM wp_posts p
     INNER JOIN wp_term_relationships tr ON p.ID = tr.object_id
     INNER JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
     WHERE tt.term_id = ? AND p.post_type = 'services' AND p.post_status = 'publish'`,
    [termId],
  );
  const count = Number((countRows as Array<{ c: number }>)[0]?.c ?? 0);
  return { count, sampleIds: ids };
}

/** Мета одной рубрики directions (блок врача на service-group) */
export async function getChelDirectionMetaProbe(termId: number): Promise<ChelDirectionMetaProbe | null> {
  const [terms] = await dbChel.query(
    `SELECT t.term_id AS id, t.name, t.slug, tt.parent, tt.taxonomy, tt.description
     FROM wp_terms t
     INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
     WHERE t.term_id = ? AND tt.taxonomy IN ('directions', 'direction')
     LIMIT 1`,
    [termId],
  );
  const term = (terms as ChelDirectionTermRow[])[0];
  if (!term) return null;

  const [metaRows] = await dbChel.query(
    `SELECT meta_key, meta_value FROM wp_termmeta WHERE term_id = ? ORDER BY meta_key`,
    [termId],
  );

  const meta: Record<string, string> = {};
  const contentMeta: Record<string, string> = {};
  for (const row of metaRows as Array<{ meta_key: string; meta_value: string }>) {
    meta[row.meta_key] = row.meta_value ?? '';
    if (isContentMetaKey(row.meta_key)) {
      contentMeta[row.meta_key] = row.meta_value ?? '';
    }
  }

  const { doctorMetaKeys, introMetaKeys } = pickMetaHints(contentMeta);
  const resolvedStaff = await resolveStaffFromMeta(contentMeta, doctorMetaKeys);
  const { count, sampleIds } = await countLinkedServices(termId);

  return {
    term,
    meta,
    contentMeta,
    doctorMetaKeys,
    introMetaKeys,
    resolvedStaff,
    linkedServicesCount: count,
    sampleServiceIds: sampleIds,
  };
};

export type ChelDirectionMetaInventoryRow = {
  termId: number;
  name: string;
  slug: string;
  hasDoctorMeta: boolean;
  hasIntroMeta: boolean;
  doctorMetaKeys: string[];
  introMetaKeys: string[];
};

/** Инвентарь: у каких рубрик есть поля блока врача (chunk + пауза снаружи) */
export async function listChelDirectionMetaInventory(
  limit: number,
  offset: number,
): Promise<ChelDirectionMetaInventoryRow[]> {
  const [terms] = await dbChel.query(
    `SELECT t.term_id AS id, t.name, t.slug
     FROM wp_terms t
     INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
     WHERE tt.taxonomy IN ('directions', 'direction')
     ORDER BY t.term_id ASC
     LIMIT ? OFFSET ?`,
    [limit, offset],
  );

  const result: ChelDirectionMetaInventoryRow[] = [];

  for (const term of terms as Array<{ id: number; name: string; slug: string }>) {
    const [metaRows] = await dbChel.query(
      `SELECT meta_key, meta_value FROM wp_termmeta WHERE term_id = ?`,
      [term.id],
    );
    const contentMeta: Record<string, string> = {};
    for (const row of metaRows as Array<{ meta_key: string; meta_value: string }>) {
      if (isContentMetaKey(row.meta_key)) {
        contentMeta[row.meta_key] = row.meta_value ?? '';
      }
    }
    const { doctorMetaKeys, introMetaKeys } = pickMetaHints(contentMeta);
    result.push({
      termId: term.id,
      name: term.name,
      slug: term.slug,
      hasDoctorMeta: doctorMetaKeys.length > 0,
      hasIntroMeta: introMetaKeys.length > 0,
      doctorMetaKeys,
      introMetaKeys,
    });
  }

  return result;
}
