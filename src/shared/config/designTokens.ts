/**
 * SSOT дизайн-токенов · med_site
 * Примитивные HEX/RGB — только здесь. Компоненты используют SEMANTIC / CSS_VAR / tailwind-классы.
 */

/** Уровень 1: примитивы (единственное место с HEX) */
export const PRIMITIVE = {
  brand: {
    violet: '#7c3aed',
    orange: '#f97316',
    blue: '#3b82f6',
    turquoise: '#0d9488',
  },
  semantic: {
    textPrimary: '#111827',
    textSecondary: '#6b7280',
    textMuted: '#888888',
    surface: '#ffffff',
    surfaceMuted: '#f9fafb',
    surfaceSecondary: '#f7f7f7',
    border: '#e0e0e0',
    borderLight: '#e8e8e8',
    inactive: '#aaaaaa',
    white: '#ffffff',
    black: '#000000',
  },
  status: {
    urgent: '#ef4444',
    warning: '#f97316',
    success: '#1b5e20',
    successBg: '#e8f5e9',
    successBorder: '#a5d6a7',
  },
  hero: {
    vrtCardBg: '#f0ebfa',
    vrtCardBorder: '#c9b8f0',
    vrtChipBg: '#f5f0ff',
    fallbackBgVrt: '#1a1a2e',
    fallbackBgClinic: '#0f3d1f',
    overlayDark: 'rgba(0,0,0,0.5)',
    tagBadgeOnPhoto: 'rgba(0,0,0,0.35)',
    badgeVrt: 'rgba(124,58,237,0.85)',
    badgeCosmo: 'rgba(59,130,246,0.85)',
    promoTrack: 'rgba(124, 58, 237, 0.15)',
  },
  platform: {
    vk: '#0077FF',
    ok: '#EE8208',
    prodoctorov: '#0083CA',
    prodoctorovText: '#005bff',
    gis2: '#A4C516',
    yandex: '#FF0000',
    whatsapp: '#25D366',
    prodoctorsBadge: '#00BFA5',
  },
  a11y: {
    bgLight: '#ffffff',
    fgLight: '#000000',
    bgDark: '#000000',
    fgDark: '#ffffff',
    bgBlue: '#9dd1ff',
    fgBlue: '#063462',
  },
  admin: {
    terminalBg: '#0f172a',
  },
  marketing: {
    rose: '#E91E63',
    green: '#4CAF50',
    blue: '#03A9F4',
    purple: '#673AB7',
    borderGray: '#e5e7eb',
    borderGrayDark: '#d1d5db',
    nodeStroke: '#CBD5E1',
  },
  loyalty: {
    gold: '#D4AF37',
    startFrom: '#00D09C',
    startTo: '#009E73',
  },
} as const;

/** CSS-значения для inline style и var() */
export const CSS_VAR = {
  brand: 'hsl(var(--brand-h) var(--brand-s) var(--brand-l))',
  brandFg: 'var(--brand-fg)',
  brandBlue: 'var(--color-brand-blue)',
  brandOrange: 'var(--color-brand-orange)',
  brandTurquoise: 'var(--color-brand-turquoise)',
  brandViolet: 'var(--color-brand-violet)',
  textPrimary: 'var(--color-text-primary)',
  surface: 'var(--color-surface)',
  surfaceMuted: 'var(--color-surface-muted)',
  platformVk: 'var(--color-platform-vk)',
  platformOk: 'var(--color-platform-ok)',
  /** Динамический бренд с opacity — бейджи направлений */
  badgeClinic: 'hsl(var(--brand-h) var(--brand-s) var(--brand-l) / 0.85)',
} as const;

/** Уровень 2: Tailwind-классы */
export const SEMANTIC = {
  textPrimary: 'text-gray-900',
  textSecondary: 'text-gray-500',
  textMuted: 'text-gray-400',
  textBrand: 'text-brand',
  surface: 'bg-white',
  surfaceMuted: 'bg-gray-50',
  surfaceSecondary: 'bg-gray-100',
  border: 'border-gray-200',
  borderTertiary: 'border-gray-200',
  textOnBrand: 'text-white',
  bgBrand: 'bg-brand',
  hoverBrand: 'hover:bg-brand',
  textBrandBlue: 'text-brand-blue',
  bgSlateMuted: 'bg-slate-50',
} as const;

export type DirectionId =
  | 'vrt'
  | 'clinic'
  | 'kids'
  | 'cosmo'
  | 'ambulance'
  | 'programs';

/** Направления · DESIGN_SYSTEM.md */
export const DIRECTION_TOKENS: Record<
  DirectionId,
  {
    accentClass: string;
    accentBgClass: string;
    accentTextClass: string;
    cssAccent: string;
    badgeBg: string;
  }
> = {
  vrt: {
    accentClass: 'brand-violet',
    accentBgClass: 'bg-brand-violet',
    accentTextClass: 'text-brand-violet',
    cssAccent: PRIMITIVE.brand.violet,
    badgeBg: PRIMITIVE.hero.badgeVrt,
  },
  clinic: {
    accentClass: 'brand',
    accentBgClass: 'bg-brand',
    accentTextClass: 'text-brand',
    cssAccent: CSS_VAR.brand,
    badgeBg: CSS_VAR.badgeClinic,
  },
  kids: {
    accentClass: 'brand-orange',
    accentBgClass: 'bg-brand-orange',
    accentTextClass: 'text-brand-orange',
    cssAccent: PRIMITIVE.brand.orange,
    badgeBg: `rgba(249, 115, 22, 0.85)`,
  },
  cosmo: {
    accentClass: 'brand-blue',
    accentBgClass: 'bg-brand-blue',
    accentTextClass: 'text-brand-blue',
    cssAccent: CSS_VAR.brandBlue,
    badgeBg: PRIMITIVE.hero.badgeCosmo,
  },
  ambulance: {
    accentClass: 'red-500',
    accentBgClass: 'bg-red-500',
    accentTextClass: 'text-red-500',
    cssAccent: PRIMITIVE.status.urgent,
    badgeBg: 'rgba(239, 68, 68, 0.85)',
  },
  programs: {
    accentClass: 'brand-turquoise',
    accentBgClass: 'bg-brand-turquoise',
    accentTextClass: 'text-brand-turquoise',
    cssAccent: PRIMITIVE.brand.turquoise,
    badgeBg: 'rgba(13, 148, 136, 0.85)',
  },
};

/** UI-классы для карточек направлений и hero-слайдов */
export const DIRECTION_UI: Record<
  DirectionId,
  {
    textColor: string;
    accentBg: string;
    iconColor: string;
    iconBgLight: string;
    iconBgSolid: string;
    badgeColor: string;
    bgLight: string;
  }
> = {
  vrt: {
    textColor: 'text-brand-violet',
    accentBg: 'bg-brand-violet/10',
    iconColor: 'text-brand-violet',
    iconBgLight: 'bg-brand-violet/20',
    iconBgSolid: 'bg-brand-violet',
    badgeColor: 'bg-white shadow-sm text-brand-violet',
    bgLight: 'bg-brand-violet/5',
  },
  clinic: {
    textColor: 'group-hover:text-brand',
    accentBg: 'bg-brand',
    iconColor: 'text-brand',
    iconBgLight: 'bg-brand/10',
    iconBgSolid: 'bg-brand',
    badgeColor: 'bg-white shadow-sm text-brand',
    bgLight: 'bg-brand/5',
  },
  kids: {
    textColor: 'group-hover:text-brand-orange',
    accentBg: 'bg-brand-orange',
    iconColor: 'text-brand-orange',
    iconBgLight: 'bg-brand-orange/10',
    iconBgSolid: 'bg-brand-orange',
    badgeColor: 'bg-white shadow-sm text-brand-orange',
    bgLight: 'bg-brand-orange/5',
  },
  cosmo: {
    textColor: 'group-hover:text-brand-blue',
    accentBg: 'bg-brand-blue',
    iconColor: 'text-brand-blue',
    iconBgLight: 'bg-brand-blue/10',
    iconBgSolid: 'bg-brand-blue',
    badgeColor: 'bg-white shadow-sm text-brand-blue',
    bgLight: 'bg-brand-blue/5',
  },
  ambulance: {
    textColor: 'group-hover:text-red-500',
    accentBg: 'bg-red-500',
    iconColor: 'text-red-500',
    iconBgLight: 'bg-red-500/10',
    iconBgSolid: 'bg-red-500',
    badgeColor: 'bg-white shadow-sm text-red-500',
    bgLight: 'bg-red-500/5',
  },
  programs: {
    textColor: 'group-hover:text-brand-turquoise',
    accentBg: 'bg-brand-turquoise',
    iconColor: 'text-brand-turquoise',
    iconBgLight: 'bg-brand-turquoise/10',
    iconBgSolid: 'bg-brand-turquoise',
    badgeColor: 'bg-white shadow-sm text-brand-turquoise',
    bgLight: 'bg-brand-turquoise/5',
  },
};

/** Платформы (соцсети, агрегаторы) */
export const PLATFORM_COLORS = {
  vk: {
    hex: PRIMITIVE.platform.vk,
    hoverClass: 'hover:bg-platform-vk',
    bgClass: 'bg-platform-vk',
  },
  ok: {
    hex: PRIMITIVE.platform.ok,
    hoverClass: 'hover:bg-platform-ok',
    bgClass: 'bg-platform-ok',
  },
  prodoctorov: {
    hex: PRIMITIVE.platform.prodoctorov,
    textHex: PRIMITIVE.platform.prodoctorovText,
    bgClass: 'bg-platform-prodoctorov',
    textClass: 'text-platform-prodoctorov',
    badgeBg: 'bg-blue-50/50 hover:bg-blue-50',
    badgeBorder: 'border-blue-100',
  },
  gis2: {
    hex: PRIMITIVE.platform.gis2,
    bgTint: 'bg-platform-gis2/5 hover:bg-platform-gis2/10',
    borderTint: 'border-platform-gis2/20',
    bgClass: 'bg-platform-gis2',
  },
  yandex: {
    hex: PRIMITIVE.platform.yandex,
    bgClass: 'bg-platform-yandex',
    badgeBg: 'bg-red-50/50 hover:bg-red-50',
    badgeBorder: 'border-red-100',
  },
  whatsapp: {
    hex: PRIMITIVE.platform.whatsapp,
    bgClass: 'bg-platform-whatsapp',
    shadowClass: 'shadow-platform-whatsapp/30',
  },
  prodoctorsBadge: {
    hex: PRIMITIVE.platform.prodoctorsBadge,
    bgClass: 'bg-platform-prodoctors/10',
    textClass: 'text-platform-prodoctors',
    borderClass: 'border-platform-prodoctors/20',
  },
} as const;

/** Hero-специфичные токены (размеры + цвета из ТЗ) */
export const HERO_TOKENS = {
  brandGreen: CSS_VAR.brand,
  brandViolet: PRIMITIVE.brand.violet,
  brandCosmo: CSS_VAR.brandBlue,
  vrtCardBg: PRIMITIVE.hero.vrtCardBg,
  vrtCardBorder: PRIMITIVE.hero.vrtCardBorder,
  cardBorder: PRIMITIVE.semantic.border,
  sliderMinHeightDesktop: 380,
  sliderMinHeightMobile: 260,
  fullscreenHeight: { lg: 480, md: 420, sm: 320 },
  borderRadius: 16,
  gridGap: 16,
  rightColumnWidth: 300,
  dotActiveWidth: 24,
  dotInactiveSize: 8,
  overlayDark: PRIMITIVE.hero.overlayDark,
  sliderCardGradient:
    'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 100%)',
  tagBadgeOnPhoto: PRIMITIVE.hero.tagBadgeOnPhoto,
  fullscreenGradient:
    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.10) 100%)',
  directionBadge: {
    vrt: PRIMITIVE.hero.badgeVrt,
    clinic: CSS_VAR.badgeClinic,
    cosmo: PRIMITIVE.hero.badgeCosmo,
  },
  directionBadgeLabel: {
    vrt: 'ВРТ · ЦЕНТР ЭКО',
    clinic: 'ПОЛИКЛИНИКА',
    cosmo: 'КОСМЕТОЛОГИЯ',
  },
  slideIntervalMs: 5000,
  slideFadeMs: 400,
  gapToPromotionsDesktop: 24,
  discountBadge: {
    bg: PRIMITIVE.status.successBg,
    color: PRIMITIVE.status.success,
    border: PRIMITIVE.status.successBorder,
  },
  promoProgress: {
    track: PRIMITIVE.hero.promoTrack,
    urgent: PRIMITIVE.status.urgent,
    warning: PRIMITIVE.status.warning,
    neutral: PRIMITIVE.brand.violet,
  },
} as const;

/** Мобильный hero */
export const MOBILE_HERO_TOKENS = {
  fallbackBg: {
    vrt: PRIMITIVE.hero.fallbackBgVrt,
    clinic: PRIMITIVE.hero.fallbackBgClinic,
  },
  navZoneBg: PRIMITIVE.semantic.surfaceSecondary,
  colors: {
    brandGreen: CSS_VAR.brand,
    brandViolet: PRIMITIVE.brand.violet,
    textSecondary: PRIMITIVE.semantic.textMuted,
    borderTertiary: PRIMITIVE.semantic.border,
    bgPrimary: PRIMITIVE.semantic.surface,
    bgSecondary: PRIMITIVE.semantic.surfaceSecondary,
    timerUrgent: PRIMITIVE.status.urgent,
    timerWarning: PRIMITIVE.status.warning,
    timerViolet: PRIMITIVE.brand.violet,
    directionAccent: {
      vrt: PRIMITIVE.brand.violet,
      adult: CSS_VAR.brand,
      kids: PRIMITIVE.brand.orange,
      default: CSS_VAR.brand,
    },
  },
  vrtChipStyle: {
    bg: PRIMITIVE.hero.vrtChipBg,
    border: PRIMITIVE.hero.vrtCardBorder,
    color: PRIMITIVE.brand.violet,
  },
} as const;

/** Bottom nav */
export const BOTTOM_NAV_TOKENS = {
  activeColor: CSS_VAR.brand,
  inactiveColor: PRIMITIVE.semantic.inactive,
  bg: PRIMITIVE.semantic.surface,
  borderTop: `0.5px solid ${PRIMITIVE.semantic.borderLight}`,
} as const;

/** Темы интегратора (marketing panel) */
export const INTEGRATOR_THEME_PRESETS = [
  { id: 'green', name: 'Источник (Классика)', hex: PRIMITIVE.marketing.green },
  { id: 'blue', name: 'Медицина (Доверие)', hex: PRIMITIVE.marketing.blue },
  { id: 'purple', name: 'Премиум (Уверенность)', hex: PRIMITIVE.marketing.purple },
  { id: 'rose', name: 'Забота (Теплота)', hex: PRIMITIVE.marketing.rose },
] as const;

/** Прототип приложения — уровни лояльности */
export const LOYALTY_TIER_STYLES = {
  start: {
    bg: 'bg-gradient-to-br from-teal-500 to-emerald-700',
    text: 'text-white',
    badge: 'bg-white/20 text-white',
  },
  comfort: {
    bg: 'bg-gradient-to-br from-slate-200 to-slate-300',
    text: 'text-gray-900',
    badge: 'bg-gray-900/10 text-gray-900',
  },
  premium: {
    bg: 'bg-gradient-to-br from-amber-200 to-amber-600',
    text: 'text-amber-900',
    badge: 'bg-amber-900/10 text-amber-900',
  },
  vip: {
    bg: 'bg-gradient-to-br from-gray-900 to-black',
    text: 'text-white',
    badge: 'bg-yellow-600/20 text-yellow-600',
    vipBadge: true,
  },
} as const;
