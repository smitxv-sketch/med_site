import type {
  EngineState,
  PageBlock,
  SiteThemeDto,
  StudioDraftDto,
  StudioDraftPatchDto,
  StudioPageSeoDto,
} from '@med-site/contracts';
import {
  DEFAULT_BRAND_VOICE,
  DEFAULT_ENGINE_STATE,
  DEFAULT_HOME_BLOCKS,
} from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';
import { fetchPageFromStrapi } from './strapiClient.js';
import { pageSeoFromStrapi } from './studioSeoMapper.js';

interface StrapiSingleResponse<T> {
  data: T | null;
}

interface StrapiListResponse<T> {
  data: T[];
}

/** Черновики в RAM до полного Strapi draft-write (Wave 1B) */
export const draftOverlay = new Map<string, StudioDraftDto>();

function draftKey(tenantId: string, locale: string, pageSlug: string) {
  return `${tenantId}:${locale}:${pageSlug}`;
}

async function strapiGet<T>(path: string, locale?: string): Promise<T> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  const url = new URL(`${base}/api${path}`);
  if (locale) url.searchParams.set('locale', locale);
  url.searchParams.set('publicationState', 'live');

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url.toString(), { headers, cache: 'no-store' });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function fetchSiteThemeFromStrapi(
  locale: string,
): Promise<SiteThemeDto | null> {
  try {
    const json = await strapiGet<
      StrapiSingleResponse<{
        engineState?: EngineState;
        activePresetId?: string | null;
        draftRevision?: number;
        locale?: string;
      }>
    >('/site-theme', locale);

    const data = json.data;
    if (!data?.engineState) return null;

    return {
      locale: data.locale ?? locale,
      engineState: { ...DEFAULT_ENGINE_STATE, ...data.engineState },
      activePresetId: data.activePresetId ?? null,
      draftRevision: data.draftRevision ?? 0,
    };
  } catch {
    return null;
  }
}

export async function fetchGlobalSettingsFromStrapi(
  locale: string,
): Promise<{ brandVoice: string } | null> {
  try {
    const json = await strapiGet<
      StrapiSingleResponse<{ brandVoice?: string }>
    >('/global-setting', locale);
    if (!json.data) return null;
    return {
      brandVoice: json.data.brandVoice ?? DEFAULT_BRAND_VOICE,
    };
  } catch {
    return null;
  }
}

function defaultPageMeta(): { pageTitle: string; pageSeo: StudioPageSeoDto } {
  const seo = pageSeoFromStrapi(null);
  return { pageTitle: seo.title, pageSeo: seo };
}

function buildDraftBase(
  tenantId: string,
  locale: string,
  pageSlug: string,
  theme: SiteThemeDto | null,
  pageTitle: string,
  pageSeo: StudioPageSeoDto,
  brandVoice: string,
  pageBlocks: PageBlock[],
): StudioDraftDto {
  return {
    tenantId,
    locale,
    pageSlug,
    revision: theme?.draftRevision ?? 0,
    engineState: theme?.engineState ?? DEFAULT_ENGINE_STATE,
    pageBlocks,
    activePresetId: theme?.activePresetId ?? null,
    pageTitle,
    pageSeo,
    brandVoice,
    updatedAt: new Date().toISOString(),
  };
}
export async function getStudioDraft(
  tenantId: string,
  locale: string,
  pageSlug: string,
): Promise<StudioDraftDto> {
  const key = draftKey(tenantId, locale, pageSlug);
  const cached = draftOverlay.get(key);
  if (cached) return cached;

  // Лабораторные страницы — только overlay
  if (pageSlug.startsWith('lab-')) {
    const { pageTitle, pageSeo } = defaultPageMeta();
    const draft = buildDraftBase(
      tenantId,
      locale,
      pageSlug,
      null,
      pageTitle,
      pageSeo,
      DEFAULT_BRAND_VOICE,
      DEFAULT_HOME_BLOCKS,
    );
    draftOverlay.set(key, draft);
    return draft;
  }

  const [page, theme, globalSettings] = await Promise.all([
    fetchPageFromStrapi(pageSlug, locale),
    fetchSiteThemeFromStrapi(locale),
    fetchGlobalSettingsFromStrapi(locale),
  ]);

  const pageSeo = pageSeoFromStrapi(page);
  const draft = buildDraftBase(
    tenantId,
    locale,
    pageSlug,
    theme,
    page?.title ?? pageSeo.title,
    pageSeo,
    globalSettings?.brandVoice ?? DEFAULT_BRAND_VOICE,
    page?.blocks?.length ? page.blocks : DEFAULT_HOME_BLOCKS,
  );

  draftOverlay.set(key, draft);
  return draft;
}

export async function patchStudioDraft(
  tenantId: string,
  locale: string,
  pageSlug: string,
  patch: StudioDraftPatchDto,
): Promise<StudioDraftDto> {
  const current = await getStudioDraft(tenantId, locale, pageSlug);

  if (
    patch.revision !== undefined &&
    patch.revision !== current.revision
  ) {
    const err = new Error('Revision conflict') as Error & { status?: number };
    err.status = 409;
    throw err;
  }

  const nextPageSeo = patch.pageSeo
    ? { ...current.pageSeo, ...patch.pageSeo }
    : current.pageSeo;

  const next: StudioDraftDto = {
    ...current,
    revision: current.revision + 1,
    engineState: patch.engineState
      ? { ...current.engineState, ...patch.engineState }
      : current.engineState,
    pageBlocks: patch.pageBlocks ?? current.pageBlocks,
    activePresetId:
      patch.activePresetId !== undefined
        ? patch.activePresetId
        : current.activePresetId,
    pageTitle: patch.pageTitle ?? current.pageTitle,
    pageSeo: nextPageSeo,
    brandVoice: patch.brandVoice ?? current.brandVoice,
    updatedAt: new Date().toISOString(),
  };

  draftOverlay.set(draftKey(tenantId, locale, pageSlug), next);
  return next;
}
