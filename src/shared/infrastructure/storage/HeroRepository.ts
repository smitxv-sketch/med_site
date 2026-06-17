import { fetchHeroSlides } from '../../api/contentApi';

export interface IHeroRepository {
  getHeroSlides(): Promise<any[]>;
}

export class APIHeroRepository implements IHeroRepository {
  async getHeroSlides(): Promise<any[]> {
    return fetchHeroSlides();
  }
}
