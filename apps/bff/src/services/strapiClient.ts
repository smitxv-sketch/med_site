import {
  DEFAULT_CHEL_SOCIAL_LINKS,
  DEFAULT_FOOTER_CONTENT,
  DEFAULT_HOME_BLOCKS,
  DEFAULT_HOME_SEO,
  mapStrapiBlocks,
  type GlobalLayoutDto,
  type GlobalSettingDto,
  type NavigationDto,
  type PageDto,
  type SocialLinkDto,
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

function mapSocialLinks(
  raw?: Array<{ platform?: string; url?: string; label?: string }>,
): SocialLinkDto[] {
  if (!raw?.length) return [];
  return raw
    .filter((item) => item.platform && item.url)
    .map((item) => ({
      platform: item.platform as SocialLinkDto['platform'],
      url: item.url!,
      label: item.label,
    }));
}

export async function fetchPageFromStrapi(
  slug: string,
  locale: string,
): Promise<PageDto | null> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  const qs = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale,
    'populate[blocks][populate]': '*',
    'populate[seo]': '*',
    publicationState: 'live',
  });

  const url = `${base}/api/pages?${qs}`;
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers, cache: 'no-store' });
  // API /pages ещё не задеплоен или пуст — не валим BFF
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Strapi ${res.status}: ${slug}`);
  }

  const json = (await res.json()) as StrapiListResponse<StrapiPageAttributes>;

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

export async function fetchGlobalSettingFromStrapi(
  locale: string,
): Promise<GlobalSettingDto> {
  try {
    // Компоненты в Strapi лучше populate явно (targeted) — не используем populate=*.
    const qs = 'populate[defaultSeo]=*&populate[socialLinks]=*';
    const json = await strapiFetch<
      StrapiSingleResponse<{
        brandVoice?: string;
        siteName?: string;
        contactPhone?: string;
        contactEmail?: string;
        contactAddress?: string;
        socialLinks?: Array<{ platform?: string; url?: string; label?: string }>;
        footerSocialTitle?: string;
        footerSocialDescription?: string;
        workingHours?: string;
        legalNotice?: string;
        medicalDisclaimer?: string;
        citySelectorHint?: string;
        locale?: string;
      }>
    >(`/global-setting?${qs}`, locale);

    const data = json.data;
    return {
      locale: data?.locale ?? locale,
      brandVoice: data?.brandVoice,
      siteName: data?.siteName,
      contactPhone: data?.contactPhone,
      contactEmail: data?.contactEmail,
      contactAddress: data?.contactAddress,
      socialLinks: mapSocialLinks(data?.socialLinks),
      footerSocialTitle: data?.footerSocialTitle,
      footerSocialDescription: data?.footerSocialDescription,
      workingHours: data?.workingHours,
      legalNotice: data?.legalNotice,
      medicalDisclaimer: data?.medicalDisclaimer,
      citySelectorHint: data?.citySelectorHint,
    };
  } catch {
    return { locale };
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
      { label: 'Контакты', url: '/contacts' },
    ],
    footerColumns: [
      {
        title: 'О компании',
        links: [
          { label: 'О клинике', url: '/about' },
          { label: 'Наши врачи', url: '/doctors' },
          { label: 'Вакансии', url: '/vacancies' },
          { label: 'Отзывы', url: '/reviews' },
          { label: 'Контакты', url: '/contacts' },
        ],
      },
      {
        title: 'Пациентам',
        links: [
          { label: 'Услуги и цены', url: '/prices' },
          { label: 'Акции', url: '/promotions' },
          { label: 'Программы', url: '/programs' },
          { label: 'Подготовка к анализам', url: '/preparation' },
          { label: 'Вопрос-ответ', url: '/faq' },
        ],
      },
    ],
  };
}

export function getMockGlobalSetting(locale: string): GlobalSettingDto {
  return {
    locale,
    siteName: 'Сеть клиник «Источник»',
    contactPhone: '+7 (351) 778-88-87',
    contactEmail: 'info@ci74.ru',
    contactAddress: 'г. Челябинск, ул. 40-летия Победы, 11',
    socialLinks:
      locale === 'ru-chel' || locale === 'chel'
        ? DEFAULT_CHEL_SOCIAL_LINKS
        : [],
    ...DEFAULT_FOOTER_CONTENT,
    brandVoice: undefined,
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
