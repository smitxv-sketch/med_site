import type { HeroSlide, HeroSlideNavTarget } from '@/shared/domain/hero/types';

/** Индекс слайда для вкладки mobile F */
export function findHeroSlideIndexByNavTarget(
  slides: HeroSlide[],
  target: HeroSlideNavTarget
): number {
  const byNav = slides.findIndex((s) => s.navTarget === target);
  if (byNav >= 0) return byNav;

  if (target === 'vrt') {
    const byDirection = slides.findIndex((s) => s.direction === 'vrt');
    return byDirection >= 0 ? byDirection : 0;
  }

  const byClinic = slides.findIndex((s) => s.direction === 'clinic');
  return byClinic >= 0 ? byClinic : 0;
}
