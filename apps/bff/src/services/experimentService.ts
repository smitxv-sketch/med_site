import type {
  ApplyExperimentWinnerDto,
  CreateExperimentDto,
  EvolutionSuggestionDto,
  ExperimentDto,
  ExperimentListDto,
} from '@med-site/contracts';
import { DEFAULT_ENGINE_STATE } from '@med-site/contracts';
import { patchStudioDraft, getStudioDraft } from './studioDraftService.js';

const store = new Map<string, ExperimentDto>();

function key(tenantId: string, locale: string, id: string) {
  return `${tenantId}:${locale}:${id}`;
}

function newId() {
  return `exp-${Date.now().toString(36)}`;
}

export function listExperiments(tenantId: string, locale: string): ExperimentListDto {
  const experiments = [...store.values()]
    .filter((e) => e.tenantId === tenantId && e.locale === locale)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return { experiments };
}

export function createExperiment(
  tenantId: string,
  locale: string,
  body: CreateExperimentDto,
): ExperimentDto {
  const now = new Date().toISOString();
  const id = newId();
  const exp: ExperimentDto = {
    id,
    tenantId,
    locale,
    name: body.name,
    hypothesis: body.hypothesis,
    status: 'draft',
    variants: body.variants,
    metrics: { impressions: 0, conversions: {} },
    winnerVariantId: null,
    createdAt: now,
    updatedAt: now,
  };
  store.set(key(tenantId, locale, id), exp);
  return exp;
}

export function getExperiment(
  tenantId: string,
  locale: string,
  id: string,
): ExperimentDto | null {
  return store.get(key(tenantId, locale, id)) ?? null;
}

export function updateExperimentStatus(
  tenantId: string,
  locale: string,
  id: string,
  status: ExperimentDto['status'],
): ExperimentDto {
  const exp = getExperiment(tenantId, locale, id);
  if (!exp) throw Object.assign(new Error('Experiment not found'), { status: 404 });

  const next: ExperimentDto = {
    ...exp,
    status,
    updatedAt: new Date().toISOString(),
  };
  store.set(key(tenantId, locale, id), next);
  return next;
}

/** Имитация метрик (до подключения Метрики) */
export function recordExperimentImpression(
  tenantId: string,
  locale: string,
  id: string,
  variantId: string,
  converted = false,
): ExperimentDto {
  const exp = getExperiment(tenantId, locale, id);
  if (!exp || exp.status !== 'running') {
    throw Object.assign(new Error('Experiment not running'), { status: 400 });
  }

  const conversions = { ...exp.metrics.conversions };
  if (converted) {
    conversions[variantId] = (conversions[variantId] ?? 0) + 1;
  }

  const next: ExperimentDto = {
    ...exp,
    metrics: {
      impressions: exp.metrics.impressions + 1,
      conversions,
    },
    updatedAt: new Date().toISOString(),
  };
  store.set(key(tenantId, locale, id), next);
  return next;
}

/** Worker: предложить победителя по конверсиям (human-in-the-loop) */
export function suggestExperimentWinner(
  tenantId: string,
  locale: string,
  id: string,
): EvolutionSuggestionDto {
  const exp = getExperiment(tenantId, locale, id);
  if (!exp) throw Object.assign(new Error('Experiment not found'), { status: 404 });
  if (exp.variants.length < 2) {
    throw Object.assign(new Error('Need at least 2 variants'), { status: 400 });
  }

  let bestId = exp.variants[0].id;
  let bestRate = -1;

  for (const v of exp.variants) {
    const conv = exp.metrics.conversions[v.id] ?? 0;
    const rate = exp.metrics.impressions > 0 ? conv / exp.metrics.impressions : 0;
    if (rate > bestRate) {
      bestRate = rate;
      bestId = v.id;
    }
  }

  const confidence = Math.min(0.95, 0.5 + bestRate * 10);

  return {
    experimentId: id,
    suggestedWinnerId: bestId,
    reason: `Вариант «${exp.variants.find((v) => v.id === bestId)?.label ?? bestId}» лидирует по конверсии (${(bestRate * 100).toFixed(1)}% при ${exp.metrics.impressions} показах).`,
    confidence,
    requiresHumanApproval: true,
  };
}

/** Применить победителя — только после явного подтверждения в Studio */
export async function applyExperimentWinner(
  tenantId: string,
  locale: string,
  id: string,
  body: ApplyExperimentWinnerDto,
): Promise<ExperimentDto> {
  const exp = getExperiment(tenantId, locale, id);
  if (!exp) throw Object.assign(new Error('Experiment not found'), { status: 404 });

  const variant = exp.variants.find((v) => v.id === body.variantId);
  if (!variant) throw Object.assign(new Error('Variant not found'), { status: 404 });

  if (body.applyToDraft) {
    const pageSlug = body.pageSlug ?? 'home';
    const draft = await getStudioDraft(tenantId, locale, pageSlug);
    await patchStudioDraft(tenantId, locale, pageSlug, {
      revision: draft.revision,
      engineState: {
        ...DEFAULT_ENGINE_STATE,
        ...draft.engineState,
        ...variant.engineStateOverrides,
      },
      pageBlocks: variant.pageBlocks ?? draft.pageBlocks,
    });
  }

  const next: ExperimentDto = {
    ...exp,
    status: 'concluded',
    winnerVariantId: body.variantId,
    updatedAt: new Date().toISOString(),
  };
  store.set(key(tenantId, locale, id), next);
  return next;
}
