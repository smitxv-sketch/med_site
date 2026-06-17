export type ColorTheme = 'green' | 'blue' | 'purple' | 'rose' | 'custom';
export type ColorIntensity = 'pastel' | 'standard' | 'vibrant' | 'manual';
export type FontFamily = 'inter' | 'outfit' | 'playfair' | 'nunito';
export type ShadowStyle = 'none' | 'soft' | 'hard' | 'neo' | 'bordered';
export type AnimationTheme = 'spring' | 'smooth' | 'instant' | 'default';

export type LayoutDensity = 'compact' | 'standard' | 'relaxed';
export type SocialProofLevel = 'minimal' | 'balanced' | 'aggressive';
export type PricingStrategy = 'open' | 'from' | 'hidden';
export type UrgencyLevel = 'none' | 'soft' | 'hard';

// State definition representing the state controlled by rules and presets
export interface EngineState {
  // Architectural Blocks
  homePageConcept: 'classic' | 'immersive';
  heroDesktopVariant: 'A' | 'B' | 'C';
  heroMobileVariant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  bottomNavVariant: 'A' | 'B' | 'C' | 'D';
  bottomNavBehavior: 'always-visible' | 'hide-on-scroll-down' | 'hidden-on-top';
  bottomNavActionAnimation: 'pulse' | 'border-beam' | 'shimmer' | 'neon';
  doctorsSectionVariant: 'A' | 'B';
  promotionsSectionVariant: 'A' | 'B' | 'C' | 'D' | 'E';
  quickActionsVariant: 'none' | 'A' | 'B' | 'C';
  directionsIconVariant: 'A' | 'B' | 'C';
  directionsSectionVariant: 'A' | 'B' | 'C' | 'D';
  
  // Theme Configurator
  colorTheme: ColorTheme;
  colorIntensity: ColorIntensity;
  appRadius: number;
  
  customHue: number;
  customSaturation: number;
  customLightness: number;

  fontFamily: FontFamily;
  shadowStyle: ShadowStyle;
  animationTheme: AnimationTheme;

  // System UI / Marketing Config
  marketingTriggers: boolean;
  layoutDensity: number;
  socialProofLevel: SocialProofLevel;
  pricingStrategy: PricingStrategy;
  urgencyLevel: UrgencyLevel;
}

export interface StrategyPreset {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  isCustom?: boolean;
  state: Partial<EngineState>;
  pageBlocks?: any[];
}

export interface MarketingRule {
  id: string;
  name: string;
  desc: string;
  emoji: string;
  weight: number;
  metric: string;
  highManipulation: boolean;
  stateOverrides: Partial<EngineState>;
}
