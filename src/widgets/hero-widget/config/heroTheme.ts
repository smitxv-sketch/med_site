/** Токены hero-блоков — цвета из designTokens, размеры из ТЗ */
import { HERO_TOKENS } from '@/shared/config/designTokens';
import heroCardsData from '@/shared/content/heroCards.json';

export const HERO_THEME = {
  brandGreen: HERO_TOKENS.brandGreen,
  brandViolet: HERO_TOKENS.brandViolet,
  brandCosmo: HERO_TOKENS.brandCosmo,
  vrtCardBg: HERO_TOKENS.vrtCardBg,
  vrtCardBorder: HERO_TOKENS.vrtCardBorder,
  cardBorder: HERO_TOKENS.cardBorder,
  sliderMinHeightDesktop: HERO_TOKENS.sliderMinHeightDesktop,
  sliderMinHeightMobile: HERO_TOKENS.sliderMinHeightMobile,
  fullscreenHeight: HERO_TOKENS.fullscreenHeight,
  borderRadius: HERO_TOKENS.borderRadius,
  gridGap: HERO_TOKENS.gridGap,
  rightColumnWidth: HERO_TOKENS.rightColumnWidth,
  dotActiveWidth: HERO_TOKENS.dotActiveWidth,
  dotInactiveSize: HERO_TOKENS.dotInactiveSize,
  overlayDark: HERO_TOKENS.overlayDark,
  sliderCardGradient: HERO_TOKENS.sliderCardGradient,
  tagBadgeOnPhoto: HERO_TOKENS.tagBadgeOnPhoto,
  fullscreenGradient: HERO_TOKENS.fullscreenGradient,
  directionBadge: HERO_TOKENS.directionBadge,
  directionBadgeLabel: HERO_TOKENS.directionBadgeLabel,
  slideIntervalMs: HERO_TOKENS.slideIntervalMs,
  slideFadeMs: HERO_TOKENS.slideFadeMs,
  gapToPromotionsDesktop: HERO_TOKENS.gapToPromotionsDesktop,
  discountBadge: HERO_TOKENS.discountBadge,
  promoProgress: HERO_TOKENS.promoProgress,
  textOnBrand: HERO_TOKENS.textOnBrand,
} as const;

export const HERO_DOCTOR_CARD = heroCardsData.doctorCard;
export const HERO_VRT_FALLBACK = heroCardsData.vrtFallback;
