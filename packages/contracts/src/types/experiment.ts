import type { EngineState } from './engine.js';
import type { PageBlock } from './page.js';

export type ExperimentStatus = 'draft' | 'running' | 'concluded';

/** Вариант A/B эксперимента */
export interface ExperimentVariantDto {
  id: string;
  label: string;
  weight: number;
  engineStateOverrides?: Partial<EngineState>;
  pageBlocks?: PageBlock[];
}

export interface ExperimentMetricsDto {
  impressions: number;
  conversions: Record<string, number>;
}

export interface ExperimentDto {
  id: string;
  tenantId: string;
  locale: string;
  name: string;
  hypothesis: string;
  status: ExperimentStatus;
  variants: ExperimentVariantDto[];
  metrics: ExperimentMetricsDto;
  winnerVariantId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentListDto {
  experiments: ExperimentDto[];
}

export interface CreateExperimentDto {
  name: string;
  hypothesis: string;
  variants: ExperimentVariantDto[];
}

export interface EvolutionSuggestionDto {
  experimentId: string;
  suggestedWinnerId: string;
  reason: string;
  confidence: number;
  requiresHumanApproval: true;
}

export interface ApplyExperimentWinnerDto {
  variantId: string;
  applyToDraft?: boolean;
  pageSlug?: string;
}
