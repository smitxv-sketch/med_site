import { fetchHeroSlides } from '@/shared/api/contentApi';
import type { HeroSlide } from '@/shared/domain/hero/types';

export interface IHeroRepository {
  getHeroSlides(): Promise<HeroSlide[]>;
}

export class APIHeroRepository implements IHeroRepository {
  async getHeroSlides(): Promise<HeroSlide[]> {
    return fetchHeroSlides();
  }
}
