/** SSOT для нижнего меню (вариант E) — bottom_nav_TZ.md */
import { BOTTOM_NAV_TOKENS } from '@/shared/config/designTokens';

export const BOTTOM_NAV_THEME = {
  barHeight: 56,
  contentGap: 8,
  centerButtonSize: 48,
  centerButtonLift: 20,
  centerBorderWidth: 3,
  iconSize: 22,
  labelSize: 10,
  activeColor: BOTTOM_NAV_TOKENS.activeColor,
  inactiveColor: BOTTOM_NAV_TOKENS.inactiveColor,
  bg: BOTTOM_NAV_TOKENS.bg,
  borderTop: BOTTOM_NAV_TOKENS.borderTop,
  centerButtonBg: BOTTOM_NAV_TOKENS.centerButtonBg,
  centerButtonFg: BOTTOM_NAV_TOKENS.centerButtonFg,
  hideTransitionMs: 200,
  pulseScale: 1.06,
  pulseDurationMs: 2000,
  contentPaddingExpr:
    'calc(var(--bottom-nav-bar-height) + env(safe-area-inset-bottom, 0px) + var(--bottom-nav-content-gap))',
  legacyContentPaddingExpr:
    'calc(80px + env(safe-area-inset-bottom, 0px))',
} as const;

export const BOTTOM_NAV_ITEMS_E = [
  { icon: 'home' as const, label: 'Главная', path: '/' },
  { icon: 'activity' as const, label: 'Услуги и цены', path: '/prices' },
  { icon: 'calendar-plus' as const, label: 'Запись', path: '/booking', isCenter: true },
  { icon: 'stethoscope' as const, label: 'Врачи', path: '/doctors' },
  { icon: 'user-circle' as const, label: 'ЛК', path: '/profile' },
] as const;
