import type { EngineState } from './engine.js';

/** Условие маркетингового правила (UTM, время и т.д.) */
export interface MarketingCondition {
  field: 'utm_source' | 'utm_campaign' | 'utm_term' | 'utm_medium' | 'hour';
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

export interface MarketingRuleDto {
  id: string;
  name: string;
  priority: number;
  conditions: {
    operator: 'AND' | 'OR';
    rules: MarketingCondition[];
  };
  actions: {
    applyPresetId?: string;
    applyRuleId?: string;
    engineStateOverrides?: Partial<EngineState>;
  };
}

/** Результат оценки правил на BFF */
export interface MarketingContextDto {
  appliedRuleId: string | null;
  appliedPresetId: string | null;
  engineStateOverrides: Partial<EngineState> | null;
}
