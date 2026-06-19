import { DIRECTION_TOKENS } from '@/shared/config/designTokens';
import type { HeroSlide } from '@/shared/domain/hero/types';
import { HERO_THEME } from '../config/heroTheme';
import { MOBILE_HERO_CONFIG } from '../config/mobileHeroConfig';

export type HeroSlideDirectionKey = 'vrt' | 'clinic' | 'cosmo';

export function resolveHeroSlideDirection(
  slide: HeroSlide
): HeroSlideDirectionKey {
  if (slide.direction === 'vrt') return 'vrt';
  if (slide.direction === 'cosmo') return 'cosmo';
  return 'clinic';
}

/** Токены направления слайда — badge, CTA, fallback (SSOT через DIRECTION_TOKENS) */
export function getHeroSlideDirectionTokens(slide: HeroSlide) {
  const dir = resolveHeroSlideDirection(slide);
  const direction = DIRECTION_TOKENS[dir];

  return {
    dir,
    badgeBg: direction.badgeBg,
    badgeLabel: HERO_THEME.directionBadgeLabel[dir],
    ctaColor: direction.cssAccent,
    fallbackBg:
      dir === 'vrt'
        ? MOBILE_HERO_CONFIG.fallbackBg.vrt
        : MOBILE_HERO_CONFIG.fallbackBg.clinic,
  };
}
