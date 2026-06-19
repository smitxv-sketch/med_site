import { SERVICES_DATA } from '../constants/servicesData';
import heroSlidesData from '../content/heroSlides.json';
import promotionsData from '../content/promotions.json';
import { hydrateHeroSlides, hydratePromotions } from './contentHydrator';

export type { HeroSlide } from '../domain/hero/types';
export type { Promotion } from '../domain/promotion/types';
export type { ServiceDirection } from '../domain/direction/types';

import type { HeroSlide } from '../domain/hero/types';
import type { Promotion } from '../domain/promotion/types';
import type { ServiceDirection } from '../domain/direction/types';

export const fetchDirections = async (): Promise<ServiceDirection[]> => {
  return SERVICES_DATA;
};

export const fetchPromotions = async (): Promise<Promotion[]> => {
  return hydratePromotions(promotionsData.promotions);
};

export const fetchHeroSlides = async (): Promise<HeroSlide[]> => {
  return hydrateHeroSlides(heroSlidesData.slides);
};
