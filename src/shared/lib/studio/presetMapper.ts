import type { DesignPresetDto } from '@med-site/contracts';
import type { StrategyPreset } from '@/shared/domain/marketing/types';

/** DesignPresetDto (BFF) → StrategyPreset (Command Center UI) */
export function designPresetToStrategy(preset: DesignPresetDto): StrategyPreset {
  return {
    id: preset.id,
    name: preset.name,
    desc: preset.description,
    emoji: preset.emoji,
    isCustom: !preset.isSystem,
    state: preset.engineState,
    pageBlocks: preset.pageBlocks,
  };
}
