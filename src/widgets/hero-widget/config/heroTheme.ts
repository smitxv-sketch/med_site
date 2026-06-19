/** Токены hero-блоков — SSOT для цветов и размеров из ТЗ */
export const HERO_THEME = {
  brandGreen: '#2b8a3e',
  brandViolet: '#7c3aed',
  brandCosmo: '#b45a8c',
  vrtCardBg: '#f0ebfa',
  vrtCardBorder: '#c9b8f0',
  cardBorder: '#e0e0e0',
  sliderMinHeightDesktop: 380,
  sliderMinHeightMobile: 260,
  fullscreenHeight: {
    lg: 480,
    md: 420,
    sm: 320,
  },
  borderRadius: 16,
  gridGap: 16,
  rightColumnWidth: 300,
  dotActiveWidth: 24,
  dotInactiveSize: 8,
  overlayDark: 'rgba(0,0,0,0.5)',
  fullscreenGradient:
    'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.10) 100%)',
  directionBadge: {
    vrt: 'rgba(124,58,237,0.85)',
    clinic: 'rgba(43,138,62,0.85)',
    cosmo: 'rgba(180,90,140,0.85)',
  },
  directionBadgeLabel: {
    vrt: 'ВРТ · ЦЕНТР ЭКО',
    clinic: 'ПОЛИКЛИНИКА',
    cosmo: 'КОСМЕТОЛОГИЯ',
  },
  slideIntervalMs: 5000,
  slideFadeMs: 400,
} as const;

export const HERO_DOCTOR_CARD = {
  eyebrow: 'Знакомство с доктором',
  discount: 'Скидка 30%',
  ctaText: 'Выбрать врача',
  ctaLink: '/doctors',
  doctorName: 'Иванова Анна Сергеевна',
  specialization: 'Акушер-гинеколог',
  image:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
} as const;

export const HERO_VRT_FALLBACK = {
  label: 'ВРТ · ЦЕНТР ЭКО',
  title: 'Центр ЭКО — узнать о программах',
  ctaText: 'Подробнее',
  ctaLink: '/services/vrt',
  programsLink: '/services/vrt',
  programsText: '→ Все программы ЭКО',
} as const;
