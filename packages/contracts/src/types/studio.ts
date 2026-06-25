import type { EngineState } from './engine.js';
import type { MarketingContextDto } from './marketing.js';
import type { PageBlock } from './page.js';

/** SEO страницы в формате Command Center UI */
export interface StudioPageSeoDto {
  title: string;
  description: string;
}

/** Снимок черновика для Command Center (Studio) */
export interface StudioDraftDto {
  tenantId: string;
  locale: string;
  pageSlug: string;
  revision: number;
  engineState: EngineState;
  pageBlocks: PageBlock[];
  activePresetId: string | null;
  /** Заголовок страницы (Strapi Page.title) */
  pageTitle: string;
  /** Meta title/description для UI */
  pageSeo: StudioPageSeoDto;
  /** Tone of Voice (GlobalSettings.brandVoice) */
  brandVoice: string;
  updatedAt: string;
}

/** Тело PATCH /studio/draft */
export interface StudioDraftPatchDto {
  revision?: number;
  engineState?: Partial<EngineState>;
  pageBlocks?: PageBlock[];
  activePresetId?: string | null;
  pageTitle?: string;
  pageSeo?: Partial<StudioPageSeoDto>;
  brandVoice?: string;
}

export interface DesignPresetDto {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  tenant: 'chel' | 'spb' | 'all';
  isSystem: boolean;
  engineState: Partial<EngineState>;
  pageBlocks?: PageBlock[];
}

export interface SiteThemeDto {
  locale: string;
  engineState: EngineState;
  activePresetId: string | null;
  draftRevision: number;
  /** Wave 2: какое UTM-правило сработало на этом запросе */
  marketing?: MarketingContextDto;
}
