import type { StudioLabListDto, StudioLabPageDto, StudioDraftDto } from '@med-site/contracts';
import { DEFAULT_ENGINE_STATE, DEFAULT_HOME_BLOCKS } from '@med-site/contracts';
import { getStudioDraft, patchStudioDraft } from './studioDraftService.js';

const LAB_PREFIX = 'lab-';
const labIndex = new Map<string, StudioLabPageDto>();

function labKey(tenantId: string, locale: string, slug: string) {
  return `${tenantId}:${locale}:${slug}`;
}

export function isLabSlug(slug: string): boolean {
  return slug.startsWith(LAB_PREFIX);
}

/** Создать черновую лабораторную страницу (не публикуется на сайт до rename/publish) */
export async function createLabPage(
  tenantId: string,
  locale: string,
  title = 'Лаборатория',
): Promise<StudioLabPageDto> {
  const pageSlug = `${LAB_PREFIX}${Date.now().toString(36)}`;
  const now = new Date().toISOString();

  const meta: StudioLabPageDto = {
    pageSlug,
    tenantId,
    locale,
    title,
    createdAt: now,
    updatedAt: now,
  };

  labIndex.set(labKey(tenantId, locale, pageSlug), meta);

  await patchStudioDraft(tenantId, locale, pageSlug, {
    pageBlocks: DEFAULT_HOME_BLOCKS,
    engineState: DEFAULT_ENGINE_STATE,
    activePresetId: null,
  });

  return meta;
}

export function listLabPages(tenantId: string, locale: string): StudioLabListDto {
  const pages = [...labIndex.values()]
    .filter((p) => p.tenantId === tenantId && p.locale === locale)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return { pages };
}

export async function loadLabDraft(
  tenantId: string,
  locale: string,
  pageSlug: string,
): Promise<StudioDraftDto> {
  if (!isLabSlug(pageSlug)) {
    throw Object.assign(new Error('Not a lab slug'), { status: 400 });
  }
  return getStudioDraft(tenantId, locale, pageSlug);
}

export function touchLabPage(tenantId: string, locale: string, pageSlug: string) {
  const key = labKey(tenantId, locale, pageSlug);
  const existing = labIndex.get(key);
  if (existing) {
    labIndex.set(key, { ...existing, updatedAt: new Date().toISOString() });
  }
}
