import marketingConfig from '../../api/marketingConfig.json';
import { StrategyPreset, MarketingRule } from '../../domain/marketing/types';

export interface IMarketingRepository {
  getPresets(): Promise<StrategyPreset[]>;
  getSemanticRules(): Promise<MarketingRule[]>;
}

/**
 * Local JSON Implementation of Marketing Repository
 * Later this can be swapped with StrapiMarketingRepository 
 * without modifying the actual store logic.
 */
export class JSONMarketingRepository implements IMarketingRepository {
  async getPresets(): Promise<StrategyPreset[]> {
    return marketingConfig.presets as StrategyPreset[];
  }

  async getSemanticRules(): Promise<MarketingRule[]> {
    return marketingConfig.semanticRules as MarketingRule[];
  }
}

// Simple factory/singleton 
export const marketingRepository = new JSONMarketingRepository();
