import type { HeroDirection, HeroSlideNavTarget } from './types';

/** Запись hero-слайда в content JSON */
export interface HeroSlideContentRecord {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  linkText: string;
  image?: string;
  imageKey?: string;
  direction?: HeroDirection;
  navTarget?: HeroSlideNavTarget;
  fullBleedBackground?: boolean;
  ctaSecondaryText?: string;
  ctaSecondaryUrl?: string;
  promoId?: number;
}

export interface HeroDoctorCardContent {
  eyebrow: string;
  discount: string;
  ctaText: string;
  ctaLink: string;
  doctorName: string;
  specialization: string;
  image: string;
}

export interface HeroVrtFallbackContent {
  label: string;
  title: string;
  ctaText: string;
  ctaLink: string;
  programsLink: string;
  programsText: string;
}
