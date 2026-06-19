import type {
  HeroDesktopVariant,
  HeroMobileVariant,
} from '@/shared/domain/hero/types';
import { ENGINE_WIDGET_DEFAULTS } from '@/shared/domain/marketing/engineDefaults';

const DESKTOP_VARIANTS: HeroDesktopVariant[] = ['A', 'B', 'C', 'D'];
const MOBILE_VARIANTS: HeroMobileVariant[] = ['A', 'B', 'C', 'E', 'F'];

function coerceVariant<T extends string>(
  value: string | undefined,
  allowed: readonly T[],
  fallback: T
): T {
  if (value && allowed.includes(value as T)) return value as T;
  return fallback;
}

export interface ResolveHeroVariantsInput {
  desktopVariant?: string;
  mobileVariant?: string;
}

export function resolveHeroVariants(
  input: ResolveHeroVariantsInput,
  store: {
    heroDesktopVariant: string;
    heroMobileVariant: string;
  } = {
    heroDesktopVariant: ENGINE_WIDGET_DEFAULTS.heroDesktopVariant,
    heroMobileVariant: ENGINE_WIDGET_DEFAULTS.heroMobileVariant,
  }
): { desktop: HeroDesktopVariant; mobile: HeroMobileVariant } {
  return {
    desktop: coerceVariant(
      input.desktopVariant ?? store.heroDesktopVariant,
      DESKTOP_VARIANTS,
      ENGINE_WIDGET_DEFAULTS.heroDesktopVariant as HeroDesktopVariant
    ),
    mobile: coerceVariant(
      input.mobileVariant ?? store.heroMobileVariant,
      MOBILE_VARIANTS,
      ENGINE_WIDGET_DEFAULTS.heroMobileVariant as HeroMobileVariant
    ),
  };
}
