/**
 * SSOT: состояние UI Engine (Command Center / ThemeProvider).
 * Дублирует контракт из src/shared/domain/marketing/types.ts для BFF/Strapi/Studio.
 */

export type ColorTheme = 'green' | 'blue' | 'purple' | 'rose' | 'custom';
export type ColorIntensity = 'pastel' | 'standard' | 'vibrant' | 'manual';
export type FontFamily = 'inter' | 'outfit' | 'playfair' | 'nunito';
export type ShadowStyle = 'none' | 'soft' | 'hard' | 'neo' | 'bordered';
export type AnimationTheme = 'spring' | 'smooth' | 'instant' | 'default';
export type SocialProofLevel = 'minimal' | 'balanced' | 'aggressive';
export type PricingStrategy = 'open' | 'from' | 'hidden';
export type UrgencyLevel = 'none' | 'soft' | 'hard';

export interface EngineState {
  homePageConcept: 'classic' | 'immersive';
  heroDesktopVariant: 'A' | 'B' | 'C' | 'D';
  heroMobileVariant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  bottomNavVariant: 'A' | 'B' | 'C' | 'D' | 'E';
  bottomNavBehavior: 'always-visible' | 'hide-on-scroll-down' | 'hidden-on-top';
  bottomNavActionAnimation: 'pulse' | 'border-beam' | 'shimmer' | 'neon';
  doctorsSectionVariant: 'A' | 'B';
  promotionsSectionVariant: 'A' | 'B' | 'C' | 'D' | 'E';
  quickActionsVariant: 'none' | 'A' | 'B' | 'C';
  directionsIconVariant: 'A' | 'B' | 'C';
  directionsSectionVariant: 'A' | 'B' | 'C' | 'D';
  colorTheme: ColorTheme;
  colorIntensity: ColorIntensity;
  appRadius: number;
  customHue: number;
  customSaturation: number;
  customLightness: number;
  fontFamily: FontFamily;
  shadowStyle: ShadowStyle;
  animationTheme: AnimationTheme;
  marketingTriggers: boolean;
  layoutDensity: number;
  socialProofLevel: SocialProofLevel;
  pricingStrategy: PricingStrategy;
  urgencyLevel: UrgencyLevel;
}

/** Частичное обновление темы/вариантов из пресета или правила */
export type EngineStatePatch = Partial<EngineState>;
