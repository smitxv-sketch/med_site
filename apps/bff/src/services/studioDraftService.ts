import type {
  DesignPresetDto,
  EngineState,
  PageBlock,
  SiteThemeDto,
  StudioDraftDto,
  StudioDraftPatchDto,
} from '@med-site/contracts';
import {
  DEFAULT_ENGINE_STATE,
  DEFAULT_HOME_BLOCKS,
} from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';
import { fetchPageFromStrapi } from './strapiClient.js';

interface StrapiSingleResponse<T> {
  data: T | null;
}

interface StrapiListResponse<T> {
  data: T[];
}

/** Черновики в RAM до полного Strapi draft-write (Wave 1B) */
const draftOverlay = new Map<string, StudioDraftDto>();

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

export async function fetchDesignPresetsFromStrapi(): Promise<DesignPresetDto[]> {
  try {
    const json = await strapiGet<
      StrapiListResponse<{
        id: number;
        documentId?: string;
        slug: string;
        name: string;
        description?: string;
        emoji?: string;
        tenant: DesignPresetDto['tenant'];
        isSystem?: boolean;
        engineState: Partial<EngineState>;
        pageBlocks?: PageBlock[];
      }>
    >('/design-presets?pagination[pageSize]=100');

    return (json.data ?? []).map((item) => ({
      id: item.documentId ?? String(item.id),
      slug: item.slug,
      name: item.name,
      description: item.description ?? '',
      emoji: item.emoji ?? '🎨',
      tenant: item.tenant,
      isSystem: Boolean(item.isSystem),
      engineState: item.engineState ?? {},
      pageBlocks: item.pageBlocks,
    }));
  } catch {
    return [];
  }
}

export async function getStudioDraft(
  tenantId: string,
  locale: string,
  pageSlug: string,
): Promise<StudioDraftDto> {
  const key = draftKey(tenantId, locale, pageSlug);
  const cached = draftOverlay.get(key);
  if (cached) return cached;

  const [page, theme] = await Promise.all([
    fetchPageFromStrapi(pageSlug, locale),
    fetchSiteThemeFromStrapi(locale),
  ]);

  const draft: StudioDraftDto = {
    tenantId,
    locale,
    pageSlug,
    revision: theme?.draftRevision ?? 0,
    engineState: theme?.engineState ?? DEFAULT_ENGINE_STATE,
    pageBlocks: page?.blocks?.length ? page.blocks : DEFAULT_HOME_BLOCKS,
    activePresetId: theme?.activePresetId ?? null,
    updatedAt: new Date().toISOString(),
  };

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
    updatedAt: new Date().toISOString(),
  };

  draftOverlay.set(draftKey(tenantId, locale, pageSlug), next);
  return next;
}
