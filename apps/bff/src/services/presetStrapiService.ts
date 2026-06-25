import type { DesignPresetDto, EngineState, PageBlock } from '@med-site/contracts';
import { getStrapiToken, getStrapiUrl } from '../config/env.js';

interface StrapiListResponse<T> {
  data: T[];
}

interface StrapiPresetRow {
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
}

function mapRow(item: StrapiPresetRow): DesignPresetDto {
  return {
    id: item.slug,
    slug: item.slug,
    name: item.name,
    description: item.description ?? '',
    emoji: item.emoji ?? '🎨',
    tenant: item.tenant,
    isSystem: Boolean(item.isSystem),
    engineState: item.engineState ?? {},
    pageBlocks: item.pageBlocks,
  };
}

async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getStrapiUrl();
  const token = getStrapiToken();
  if (!token) {
    throw Object.assign(new Error('STRAPI_API_TOKEN not configured'), { status: 503 });
  }

  const res = await fetch(`${base}/api${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers as Record<string, string> | undefined),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    throw Object.assign(new Error(`Strapi ${res.status}: ${text.slice(0, 200)}`), {
      status: res.status,
    });
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

/** Все пресеты из Strapi (system + custom) */
export async function listPresetsFromStrapi(): Promise<DesignPresetDto[]> {
  try {
    const json = await strapiFetch<StrapiListResponse<StrapiPresetRow>>(
      '/design-presets?pagination[pageSize]=200&publicationState=live',
    );
    return (json.data ?? []).map(mapRow);
  } catch {
    return [];
  }
}

/** Алиас для обратной совместимости */
export const fetchDesignPresetsFromStrapi = listPresetsFromStrapi;

async function findPresetDocumentId(slug: string): Promise<string | null> {
  const qs = new URLSearchParams({
    'filters[slug][$eq]': slug,
    publicationState: 'live',
  });
  const json = await strapiFetch<StrapiListResponse<{ documentId?: string }>>(
    `/design-presets?${qs}`,
  );
  return json.data?.[0]?.documentId ?? null;
}

export async function createPresetInStrapi(
  input: Omit<DesignPresetDto, 'id'> & { slug: string },
): Promise<DesignPresetDto> {
  const slug = input.slug.replace(/^custom_/, 'custom-');

  const json = await strapiFetch<{ data: StrapiPresetRow }>('/design-presets', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        name: input.name,
        slug,
        emoji: input.emoji,
        description: input.description,
        engineState: input.engineState ?? {},
        pageBlocks: input.pageBlocks ?? null,
        tenant: input.tenant ?? 'chel',
        isSystem: false,
      },
    }),
  });

  const docId = json.data.documentId;
  if (docId) {
    await strapiFetch(`/design-presets/${docId}`, {
      method: 'PUT',
      body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
    }).catch(() => {
      /* Strapi 5 publish через documents API — best-effort */
    });
  }

  return mapRow(json.data);
}

export async function updatePresetInStrapi(
  slug: string,
  input: Partial<DesignPresetDto> & {
    name?: string;
    description?: string;
    engineState?: Partial<EngineState>;
    pageBlocks?: PageBlock[];
  },
): Promise<DesignPresetDto> {
  const normalizedSlug = slug.replace(/^custom_/, 'custom-');
  const documentId = await findPresetDocumentId(normalizedSlug);
  if (!documentId) {
    throw Object.assign(new Error('Preset not found'), { status: 404 });
  }

  const existing = (await listPresetsFromStrapi()).find((p) => p.slug === normalizedSlug);
  if (existing?.isSystem) {
    throw Object.assign(new Error('Cannot update system preset'), { status: 403 });
  }

  const json = await strapiFetch<{ data: StrapiPresetRow }>(
    `/design-presets/${documentId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.description !== undefined ? { description: input.description } : {}),
          ...(input.emoji !== undefined ? { emoji: input.emoji } : {}),
          ...(input.engineState !== undefined ? { engineState: input.engineState } : {}),
          ...(input.pageBlocks !== undefined ? { pageBlocks: input.pageBlocks } : {}),
        },
      }),
    },
  );

  return mapRow(json.data);
}

export async function deletePresetFromStrapi(slug: string): Promise<void> {
  const normalizedSlug = slug.replace(/^custom_/, 'custom-');
  const documentId = await findPresetDocumentId(normalizedSlug);
  if (!documentId) {
    throw Object.assign(new Error('Preset not found'), { status: 404 });
  }

  const existing = (await listPresetsFromStrapi()).find((p) => p.slug === normalizedSlug);
  if (existing?.isSystem) {
    throw Object.assign(new Error('Cannot delete system preset'), { status: 403 });
  }

  await strapiFetch(`/design-presets/${documentId}`, { method: 'DELETE' });
}
