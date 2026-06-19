import { fetchPromotions, fetchHeroSlides } from '@/shared/api/contentApi';
import type { Promotion } from '@/shared/domain/promotion/types';
import type { HeroSlide } from '@/shared/domain/hero/types';

export interface IPromotionsRepository {
  getPromotions: () => Promise<Promotion[]>;
  getHeroSlides: () => Promise<HeroSlide[]>;
}

export class APIPromotionsRepository implements IPromotionsRepository {
  async getPromotions(): Promise<Promotion[]> {
    return fetchPromotions();
  }

  async getHeroSlides(): Promise<HeroSlide[]> {
    return fetchHeroSlides();
  }
}
