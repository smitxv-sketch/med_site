import { StrapiClient } from './strapiClient.js';
import { getChelNews, getChelAnonces, getChelArticles, getChelVacancies } from './wpService.js';
import {
  getSyncMap,
  updateSyncMap,
  generateHash,
} from './syncWorker.js';

export type SyncReport = {
  entity: string;
  created: number;
  updated: number;
  skipped: number;
  errors: Array<{ legacyId: string; message: string }>;
};

const CITY = 'chelyabinsk';
const LOCALE = 'ru-chel';

type NewsKind = 'news' | 'anonce' | 'article';

async function syncNewsLike(
  client: StrapiClient,
  entity: string,
  collection: 'news-items' | 'vacancies',
  kind: NewsKind | null,
  rows: Array<Record<string, unknown>>,
  mapField: (row: Record<string, unknown>) => Record<string, unknown>,
): Promise<SyncReport> {
  const report: SyncReport = {
    entity,
    created: 0,
    updated: 0,
    skipped: 0,
    errors: [],
  };

  for (const row of rows) {
    const legacyId = String(row.id ?? row.ID ?? '');
    if (!legacyId) continue;

    try {
      const payload = mapField(row);
      const hash = generateHash(payload);
      const existing = await client.findByLegacyId(collection, legacyId, LOCALE);

      if (!existing) {
        await client.createEntry(collection, {
          ...payload,
          ...(kind ? { kind } : {}),
          legacyId,
          legacySource: 'chel',
          locale: LOCALE,
          publishedAt: payload.publishedAt || new Date().toISOString(),
        });
        const created = await client.findByLegacyId(collection, legacyId, LOCALE);
        if (created?.documentId) {
          await updateSyncMap(CITY, entity, legacyId, String(created.documentId), hash);
        }
        report.created += 1;
        continue;
      }

      if (existing.contentLocked) {
        report.skipped += 1;
        continue;
      }

      const mapRow = await getSyncMap(CITY, entity, legacyId);
      if (mapRow?.data_hash === hash) {
        report.skipped += 1;
        continue;
      }

      const safePatch = { ...payload };
      delete safePatch.content;
      delete safePatch.bio;

      await client.updateEntry(collection, existing.documentId, safePatch);
      await updateSyncMap(CITY, entity, legacyId, existing.documentId, hash);
      report.updated += 1;
    } catch (e) {
      report.errors.push({
        legacyId,
        message: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return report;
}

export async function syncChelNewsContent(client: StrapiClient) {
  const [novosti, anonces, articles, vacancies] = await Promise.all([
    getChelNews(500, 0),
    getChelAnonces(500, 0),
    getChelArticles(500, 0),
    getChelVacancies(500, 0),
  ]);

  const newsReport = await syncNewsLike(
    client,
    'news',
    'news-items',
    'news',
    novosti as Array<Record<string, unknown>>,
    (row) => ({
      title: String(row.post_title ?? row.title ?? 'Новость'),
      slug: String(row.post_name ?? row.slug ?? `news-${row.id}`),
      excerpt: String(row.anonce ?? row.excerpt ?? ''),
      content: String(row.content ?? row.post_content ?? ''),
      publishedAt: String(row.created ?? row.post_date ?? new Date().toISOString()),
    }),
  );

  const anonceReport = await syncNewsLike(
    client,
    'anonce',
    'news-items',
    'anonce',
    anonces as Array<Record<string, unknown>>,
    (row) => ({
      title: String(row.header ?? row.post_title ?? 'Анонс'),
      slug: String(row.post_name ?? `anonce-${row.id}`),
      excerpt: String(row.anonce ?? ''),
      anonceLink: String(row.anonce_link ?? ''),
      sortOrder: Number(row.ord ?? 0),
      showOnHome: row.enabled === 1 || row.enabled === true,
      publishedAt: new Date().toISOString(),
    }),
  );

  const articleReport = await syncNewsLike(
    client,
    'article',
    'news-items',
    'article',
    articles as Array<Record<string, unknown>>,
    (row) => ({
      title: String(row.post_title ?? 'Статья'),
      slug: String(row.post_name ?? `article-${row.id}`),
      excerpt: String(row.anonce ?? ''),
      content: String(row.content ?? row.text ?? ''),
      publishedAt: String(row.created ?? new Date().toISOString()),
    }),
  );

  const vacancyReport = await syncNewsLike(
    client,
    'vacancy',
    'vacancies',
    null,
    vacancies as Array<Record<string, unknown>>,
    (row) => ({
      title: String(row.post_title ?? 'Вакансия'),
      slug: String(row.post_name ?? `vacancy-${row.id}`),
      content: String(row.content ?? row.duties ?? ''),
      experience: String(row.experience ?? ''),
    }),
  );

  return { newsReport, anonceReport, articleReport, vacancyReport };
}
