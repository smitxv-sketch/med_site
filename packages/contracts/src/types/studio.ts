import type { EngineState } from './engine.js';
import type { PageBlock } from './page.js';

/** Снимок черновика для Command Center (Studio) */
export interface StudioDraftDto {
  tenantId: string;
  locale: string;
  pageSlug: string;
  revision: number;
  engineState: EngineState;
  pageBlocks: PageBlock[];
  activePresetId: string | null;
  updatedAt: string;
}

/** Тело PATCH /studio/draft */
export interface StudioDraftPatchDto {
  revision?: number;
  engineState?: Partial<EngineState>;
  pageBlocks?: PageBlock[];
  activePresetId?: string | null;
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
}
