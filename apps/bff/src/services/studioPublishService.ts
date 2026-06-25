import {
  mapPageBlocksToStrapi,
  type EngineState,
  type StudioDraftDto,
} from '@med-site/contracts';
import {
  getRevalidateSecret,
  getStrapiToken,
  getStrapiUrl,
  getWebRevalidateUrl,
} from '../config/env.js';
import { draftOverlay, getStudioDraft } from './studioDraftService.js';
import { pageSeoToStrapi } from './studioSeoMapper.js';

interface StrapiListResponse<T> {
  data: T[];
}

async function strapiWrite(
  method: string,
  path: string,
  body: unknown,
  locale?: string,
): Promise<Response> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  if (!token) {
    throw Object.assign(new Error('STRAPI_API_TOKEN not configured'), { status: 503 });
  }

  const url = new URL(`${base}/api${path}`);
  if (locale) url.searchParams.set('locale', locale);

  return fetch(url.toString(), {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
}

async function findPageDocumentId(
  slug: string,
  locale: string,
): Promise<string | null> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  const qs = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale,
    publicationState: 'live',
  });
  const res = await fetch(`${base}/api/pages?${qs}`, {
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json = (await res.json()) as StrapiListResponse<{ documentId?: string }>;
  return json.data?.[0]?.documentId ?? null;
}

async function pushDraftToStrapi(draft: StudioDraftDto): Promise<void> {
  const token = getStrapiToken();
  if (!token) return;

  const documentId = await findPageDocumentId(draft.pageSlug, draft.locale);
  if (documentId) {
    const pageRes = await strapiWrite(
      'PUT',
      `/pages/${documentId}`,
      {
        data: {
          title: draft.pageTitle,
          blocks: mapPageBlocksToStrapi(draft.pageBlocks),
          seo: pageSeoToStrapi(draft.pageSeo),
        },
      },
      draft.locale,
    );
    if (!pageRes.ok) {
      throw new Error(`Strapi page update failed: ${pageRes.status}`);
    }
  }

  const themeRes = await strapiWrite(
    'PUT',
    '/site-theme',
    {
      data: {
        engineState: draft.engineState,
        activePresetId: draft.activePresetId,
        draftRevision: draft.revision,
      },
    },
    draft.locale,
  );
  if (!themeRes.ok) {
    throw new Error(`Strapi site-theme update failed: ${themeRes.status}`);
  }

  const globalRes = await strapiWrite(
    'PUT',
    '/global-setting',
    { data: { brandVoice: draft.brandVoice } },
    draft.locale,
  );
  if (!globalRes.ok) {
    throw new Error(`Strapi global-setting update failed: ${globalRes.status}`);
  }
}

async function triggerRevalidate(): Promise<void> {
  const secret = getRevalidateSecret();
  const url =
    getWebRevalidateUrl() ?? 'https://istochnik.smitx.ru/api/revalidate';
  if (!secret) {
    console.warn('[bff] REVALIDATE_SECRET not set — skip revalidate');
    return;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-revalidate-token': secret,
    },
    body: JSON.stringify({ model: 'page', tags: ['page:home', 'site-theme'] }),
  });
  if (!res.ok) {
    console.warn('[bff] revalidate failed:', res.status);
  }
}

export async function publishStudioDraft(
  tenantId: string,
  locale: string,
  pageSlug: string,
): Promise<StudioDraftDto> {
  const draft = await getStudioDraft(tenantId, locale, pageSlug);

  if (getStrapiToken()) {
    await pushDraftToStrapi(draft);
    draftOverlay.delete(`${tenantId}:${locale}:${pageSlug}`);
    await triggerRevalidate();
  }

  return {
    ...draft,
    updatedAt: new Date().toISOString(),
  };
}

/** Экспорт для тестов: применить engine state */
export function mergeEngineState(
  base: EngineState,
  patch: Partial<EngineState>,
): EngineState {
  return { ...base, ...patch };
}
