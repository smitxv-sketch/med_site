import { fetchPromotions, fetchHeroSlides, Promotion, HeroSlide } from '../../../../src/shared/api/contentApi';

export interface IPromotionsRepository {
  /**
   * Retrieves active promotions
   */
  getPromotions: () => Promise<Promotion[]>;
  
  /**
   * Retrieves hero slides (news, updates, etc)
   */
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
