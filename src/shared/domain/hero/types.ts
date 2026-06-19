/** SSOT типов hero-слайдов */
export type HeroDirection = 'vrt' | 'clinic' | 'cosmo';

/** Цель навигации для mobile F (переключатель вкладок) */
export type HeroSlideNavTarget = 'vrt' | 'clinic';

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  badgeColor: string;
  bgLight: string;
  direction?: HeroDirection;
  /** Слайд для переключателя Поликлиника / ВРТ в mobile F */
  navTarget?: HeroSlideNavTarget;
  fullBleedBackground?: boolean;
  themeAccent?: 'green' | 'violet';
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  promoId?: number;
}

export type HeroDesktopVariant = 'A' | 'B' | 'C' | 'D';
export type HeroMobileVariant = 'A' | 'B' | 'C' | 'E' | 'F';
