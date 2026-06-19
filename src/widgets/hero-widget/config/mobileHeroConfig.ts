/** SSOT для мобильного hero (вариант F) — mobile_hero_TZ.md */
import { MOBILE_HERO_TOKENS } from '@/shared/config/designTokens';

export const MOBILE_HERO_CONFIG = {
  slider: {
    height: 220,
    borderRadius: 14,
    marginTop: 12,
    marginX: 16,
    gradient:
      'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)',
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
    phone: '+7 (351) 778-88-87',
    phoneHref: 'tel:+73517788887',
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
  vrtChipStyle: MOBILE_HERO_TOKENS.vrtChipStyle,
  tabs: {
    clinic: {
      key: 'clinic' as const,
      label: 'Поликлиника',
      allDirectionsPath: '/services',
      totalCount: 38,
      chips: [
        { label: 'Гинекология', path: '/services/adult' },
        { label: 'Терапия', path: '/services/adult' },
        { label: 'Диагностика', path: '/services/adult' },
        { label: 'УЗИ', path: '/services/adult' },
      ],
    },
    vrt: {
      key: 'vrt' as const,
      label: 'ВРТ-клиника',
      allDirectionsPath: '/services/vrt',
      totalCount: 12,
      chips: [
        { label: 'ЭКО', path: '/services/vrt' },
        { label: 'Ведение беременности', path: '/services/vrt' },
        { label: 'Генетика', path: '/services/vrt' },
        { label: 'Репродуктология', path: '/services/vrt' },
      ],
    },
  },
} as const;

export type MobileHeroTabKey = keyof typeof MOBILE_HERO_CONFIG.tabs;
