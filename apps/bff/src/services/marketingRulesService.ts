import type {
  EngineState,
  MarketingCondition,
  MarketingContextDto,
  MarketingRuleDto,
} from '@med-site/contracts';
import rulesConfig from '../config/marketingRules.json' with { type: 'json' };

export interface MarketingQueryContext {
  utm_source?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_medium?: string;
  hour?: number;
}

const RULES = (rulesConfig as { rules: MarketingRuleDto[] }).rules.sort(
  (a, b) => b.priority - a.priority,
);

function readField(ctx: MarketingQueryContext, field: MarketingCondition['field']): string {
  if (field === 'hour') return String(ctx.hour ?? new Date().getHours());
  const raw = ctx[field];
  return (raw ?? '').toLowerCase();
}

function matchCondition(ctx: MarketingQueryContext, cond: MarketingCondition): boolean {
  const actual = readField(ctx, cond.field);
  const expected = cond.value.toLowerCase();

  switch (cond.operator) {
    case 'equals':
      return actual === expected;
    case 'contains':
      return actual.includes(expected);
    case 'greater_than':
      return Number(actual) > Number(expected);
    case 'less_than':
      return Number(actual) < Number(expected);
    default:
      return false;
  }
}

function matchRule(ctx: MarketingQueryContext, rule: MarketingRuleDto): boolean {
  const { operator, rules } = rule.conditions;
  if (operator === 'AND') return rules.every((r) => matchCondition(ctx, r));
  return rules.some((r) => matchCondition(ctx, r));
}

/** Оценка UTM-правил (SSOT: marketingRules.json) */
export function evaluateMarketingRules(
  query: MarketingQueryContext,
): MarketingContextDto {
  const ctx: MarketingQueryContext = {
    ...query,
    hour: query.hour ?? new Date().getHours(),
  };

  for (const rule of RULES) {
    if (!matchRule(ctx, rule)) continue;

    return {
      appliedRuleId: rule.actions.applyRuleId ?? rule.id,
      appliedPresetId: rule.actions.applyPresetId ?? null,
      engineStateOverrides: rule.actions.engineStateOverrides ?? null,
    };
  }

  return {
    appliedRuleId: null,
    appliedPresetId: null,
    engineStateOverrides: null,
  };
}

export function mergeEngineState(
  base: EngineState,
  overrides: Partial<EngineState> | null,
): EngineState {
  if (!overrides) return base;
  return { ...base, ...overrides };
}

export function marketingContextFromQuery(
  reqQuery: Record<string, unknown>,
): MarketingQueryContext {
  return {
    utm_source: String(reqQuery.utm_source ?? ''),
    utm_campaign: String(reqQuery.utm_campaign ?? ''),
    utm_term: String(reqQuery.utm_term ?? ''),
    utm_medium: String(reqQuery.utm_medium ?? ''),
  };
}
