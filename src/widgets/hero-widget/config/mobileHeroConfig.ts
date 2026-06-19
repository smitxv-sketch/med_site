/** SSOT для мобильного hero (вариант F) — mobile_hero_TZ.md */
import { MOBILE_HERO_TOKENS } from '@/shared/config/designTokens';
import mobileHeroContent from '@/shared/content/mobileHero.json';

export const MOBILE_HERO_CONFIG = {
  slider: {
    height: 220,
    borderRadius: 14,
    marginTop: 12,
    marginX: 16,
    gradient: MOBILE_HERO_TOKENS.sliderGradient,
    titleSize: 20,
    titleSizeLong: 18,
    titleLongThreshold: 40,
    tagSize: 10,
    subtitleSize: 12,
    ctaRadius: 30,
    slideIntervalMs: 5000,
    dotActiveWidth: 18,
    dotInactiveSize: 6,
  },
  fallbackBg: MOBILE_HERO_TOKENS.fallbackBg,
  navZone: {
    borderRadius: 14,
    marginTop: 12,
    marginX: 16,
    padding: 14,
    bg: MOBILE_HERO_TOKENS.navZoneBg,
    chipFadeMs: 150,
  },
  ctaZone: {
    marginTop: 12,
    marginX: 16,
    gap: 10,
    ...mobileHeroContent.cta,
  },
  promoZone: {
    marginTop: 12,
    marginX: 16,
    labelSize: 11,
    cardMinWidth: 200,
    cardSingleWidthPercent: 85,
    maxPromos: 4,
    gap: 10,
  },
  contentBottomPadding: 70,
  colors: MOBILE_HERO_TOKENS.colors,
  textOnPhoto: MOBILE_HERO_TOKENS.textOnPhoto,
  dotGlowWhite: MOBILE_HERO_TOKENS.dotGlowWhite,
  vrtChipStyle: MOBILE_HERO_TOKENS.vrtChipStyle,
  tabs: mobileHeroContent.tabs,
} as const;

export type MobileHeroTabKey = keyof typeof MOBILE_HERO_CONFIG.tabs;
