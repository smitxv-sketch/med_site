import {
  DEFAULT_HOME_BLOCKS,
  DEFAULT_HOME_SEO,
  mapStrapiBlocks,
  type GlobalLayoutDto,
  type NavigationDto,
  type PageDto,
  type StrapiBlockEntry,
} from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

interface StrapiListResponse<T> {
  data: T[];
}

interface StrapiSingleResponse<T> {
  data: T | null;
}

interface StrapiPageAttributes {
  title: string;
  slug: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    canonicalUrl?: string;
  };
  blocks?: StrapiBlockEntry[];
  locale?: string;
}

async function strapiFetch<T>(path: string, locale: string): Promise<T> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  const url = new URL(`${base}/api${path}`);
  url.searchParams.set('locale', locale);
  url.searchParams.set('publicationState', 'live');

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url.toString(), { headers, cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Strapi ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchPageFromStrapi(
  slug: string,
  locale: string,
): Promise<PageDto | null> {
  const qs = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale,
    'populate[blocks][populate]': '*',
    'populate[seo]': '*',
  });

  const json = await strapiFetch<StrapiListResponse<StrapiPageAttributes>>(
    `/pages?${qs}`,
    locale,
  );

  const item = json.data?.[0];
  if (!item) return null;

  return {
    slug: item.slug,
    title: item.title,
    locale: item.locale ?? locale,
    seo: item.seo ?? {},
    blocks: mapStrapiBlocks(item.blocks),
  };
}

export async function fetchNavigationFromStrapi(
  locale: string,
): Promise<NavigationDto> {
  try {
    const qs = 'populate[headerMenu][populate]=*&populate[footerColumns][populate]=*';
    const json = await strapiFetch<
      StrapiSingleResponse<{
        headerMenu?: NavigationDto['headerMenu'];
        footerColumns?: NavigationDto['footerColumns'];
        locale?: string;
      }>
    >(`/navigation?${qs}`, locale);

    const data = json.data;
    return {
      headerMenu: data?.headerMenu ?? [],
      footerColumns: data?.footerColumns ?? [],
      locale: data?.locale ?? locale,
    };
  } catch {
    return { headerMenu: [], footerColumns: [], locale };
  }
}

export async function fetchGlobalLayoutFromStrapi(
  locale: string,
): Promise<GlobalLayoutDto> {
  try {
    const qs =
      'populate[headerBlocks][populate]=*&populate[footerBlocks][populate]=*&populate[mobileNavBlocks][populate]=*';
    const json = await strapiFetch<
      StrapiSingleResponse<{
        headerBlocks?: StrapiBlockEntry[];
        footerBlocks?: StrapiBlockEntry[];
        mobileNavBlocks?: StrapiBlockEntry[];
        locale?: string;
      }>
    >(`/global-layout?${qs}`, locale);

    const data = json.data;
    return {
      headerBlocks: mapStrapiBlocks(data?.headerBlocks),
      footerBlocks: mapStrapiBlocks(data?.footerBlocks),
      mobileNavBlocks: mapStrapiBlocks(data?.mobileNavBlocks),
      locale: data?.locale ?? locale,
    };
  } catch {
    return {
      headerBlocks: [],
      footerBlocks: [],
      mobileNavBlocks: [],
      locale,
    };
  }
}

export function getMockPage(slug: string, locale: string): PageDto {
  return {
    slug,
    title: 'Клиника «Источник»',
    locale,
    seo: DEFAULT_HOME_SEO,
    blocks: DEFAULT_HOME_BLOCKS,
  };
}

export function getMockNavigation(locale: string): NavigationDto {
  return {
    locale,
    headerMenu: [
      { label: 'Услуги и цены', url: '/prices' },
      { label: 'Врачи', url: '/doctors' },
      { label: 'Акции', url: '/promotions' },
      { label: 'О клинике', url: '/about' },
    ],
    footerColumns: [],
  };
}

export function getMockGlobalLayout(locale: string): GlobalLayoutDto {
  return {
    locale,
    headerBlocks: [{ id: 'hdr', type: 'header', content: {} }],
    footerBlocks: [{ id: 'ftr', type: 'footer', content: {} }],
    mobileNavBlocks: [],
  };
}
