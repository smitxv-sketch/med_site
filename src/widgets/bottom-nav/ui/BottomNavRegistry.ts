import type { ComponentType } from 'react';
import type {
  BottomNavActionAnimation,
  BottomNavVariant,
} from '@/shared/domain/bottom-nav/types';
import { ENGINE_WIDGET_DEFAULTS } from '@/shared/domain/marketing/engineDefaults';
import { BottomNavVariantA } from './BottomNavVariantA';
import { BottomNavVariantB } from './BottomNavVariantB';
import { BottomNavVariantC } from './BottomNavVariantC';
import { BottomNavVariantD } from './BottomNavVariantD';
import { BottomNavVariantE } from './BottomNavVariantE';

export interface BottomNavVariantProps {
  isHidden: boolean;
  actionAnimation: BottomNavActionAnimation;
}

export interface BottomNavClassicContentProps {
  actionAnimation: BottomNavActionAnimation;
}

/** Внутренний контент для floating-вариантов A–D */
export const BottomNavClassicRegistry: Record<
  'A' | 'B' | 'C' | 'D',
  ComponentType<BottomNavClassicContentProps>
> = {
  A: BottomNavVariantA,
  B: BottomNavVariantB,
  C: BottomNavVariantC,
  D: BottomNavVariantD,
};

/** Полные варианты (включая flat E) */
export const BottomNavRegistry: Record<
  BottomNavVariant,
  ComponentType<BottomNavVariantProps>
> = {
  A: BottomNavVariantA as ComponentType<BottomNavVariantProps>,
  B: BottomNavVariantB as ComponentType<BottomNavVariantProps>,
  C: BottomNavVariantC as ComponentType<BottomNavVariantProps>,
  D: BottomNavVariantD as ComponentType<BottomNavVariantProps>,
  E: BottomNavVariantE,
};

export function resolveBottomNavVariant(
  value: string | undefined
): BottomNavVariant {
  const allowed: BottomNavVariant[] = ['A', 'B', 'C', 'D', 'E'];
  if (value && allowed.includes(value as BottomNavVariant)) {
    return value as BottomNavVariant;
  }
  return ENGINE_WIDGET_DEFAULTS.bottomNavVariant as BottomNavVariant;
}

export function isFloatingBottomNavVariant(
  variant: BottomNavVariant
): variant is 'A' | 'B' | 'C' | 'D' {
  return variant !== 'E';
}
