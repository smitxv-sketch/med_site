import type {
  CoverImageDto,
  NewsDto,
  PromotionDto,
  PromotionKind,
  VacancyDto,
} from '@med-site/contracts';
import {
  isNewsVisible,
  isPromotionVisible,
  mapStrapiNews,
  mapStrapiPromotion,
  mapStrapiVacancy,
} from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

function absolutizeCover(cover?: CoverImageDto): CoverImageDto | undefined {
  if (!cover) return undefined;
  const base = getStrapiUrl().replace(/\/$/, '');
  const abs = (url: string) => (url.startsWith('http') ? url : `${base}${url}`);
  return {
    ...cover,
    url: abs(cover.url),
    mobileUrl: cover.mobileUrl ? abs(cover.mobileUrl) : undefined,
  };
}

interface StrapiListResponse<T> {
  data: T[];
}

const MEDIA_POPULATE =
  'populate[coverImage]=*&populate[coverImageMobile]=*';

async function strapiList<T>(
  collection: string,
  locale: string,
  extraQs = '',
): Promise<T[]> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  const qs = new URLSearchParams({
    locale,
    publicationState: 'live',
    'pagination[pageSize]': '100',
    sort: 'updatedAt:desc',
  });
  const url = `${base}/api/${collection}?${qs}${extraQs ? `&${extraQs}` : ''}`;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers, cache: 'no-store' });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${collection}`);

  const json = (await res.json()) as StrapiListResponse<T>;
  return json.data ?? [];
}

async function strapiOne<T>(
  collection: string,
  slug: string,
  locale: string,
): Promise<T | null> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  const qs = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale,
    publicationState: 'live',
  });
  const url = `${base}/api/${collection}?${qs}&${MEDIA_POPULATE}`;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers, cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${collection}/${slug}`);

  const json = (await res.json()) as StrapiListResponse<T>;
  return json.data?.[0] ?? null;
}

export async function fetchPromotionsFromStrapi(
  locale: string,
  kind?: PromotionKind,
): Promise<PromotionDto[]> {
  let extra = MEDIA_POPULATE;
  if (kind) extra += `&filters[kind][$eq]=${kind}`;

  const rows = await strapiList<Parameters<typeof mapStrapiPromotion>[0]>(
    'promotions',
    locale,
    extra,
  );

  return rows
    .map((row) => mapStrapiPromotion(row, locale))
    .filter((item) => isPromotionVisible(item))
    .map((item) => ({ ...item, cover: absolutizeCover(item.cover) }));
}

export async function fetchPromotionBySlugFromStrapi(
  slug: string,
  locale: string,
): Promise<PromotionDto | null> {
  const row = await strapiOne<Parameters<typeof mapStrapiPromotion>[0]>(
    'promotions',
    slug,
    locale,
  );
  if (!row) return null;
  const item = mapStrapiPromotion(row, locale);
  if (!isPromotionVisible(item)) return null;
  return { ...item, cover: absolutizeCover(item.cover) };
}

export async function fetchNewsFromStrapi(locale: string): Promise<NewsDto[]> {
  const rows = await strapiList<Parameters<typeof mapStrapiNews>[0]>(
    'news-items',
    locale,
    `${MEDIA_POPULATE}&sort=publishedAt:desc`,
  );

  return rows
    .map((row) => mapStrapiNews(row, locale))
    .filter((item) => isNewsVisible(item))
    .map((item) => ({ ...item, cover: absolutizeCover(item.cover) }));
}

export async function fetchNewsBySlugFromStrapi(
  slug: string,
  locale: string,
): Promise<NewsDto | null> {
  const row = await strapiOne<Parameters<typeof mapStrapiNews>[0]>(
    'news-items',
    slug,
    locale,
  );
  if (!row) return null;
  const item = mapStrapiNews(row, locale);
  if (!isNewsVisible(item)) return null;
  return { ...item, cover: absolutizeCover(item.cover) };
}

export async function fetchVacanciesFromStrapi(
  locale: string,
): Promise<VacancyDto[]> {
  const rows = await strapiList<Parameters<typeof mapStrapiVacancy>[0]>(
    'vacancies',
    locale,
  );
  return rows.map((row) => mapStrapiVacancy(row, locale));
}

export async function fetchVacancyBySlugFromStrapi(
  slug: string,
  locale: string,
): Promise<VacancyDto | null> {
  const row = await strapiOne<Parameters<typeof mapStrapiVacancy>[0]>(
    'vacancies',
    slug,
    locale,
  );
  return row ? mapStrapiVacancy(row, locale) : null;
}
