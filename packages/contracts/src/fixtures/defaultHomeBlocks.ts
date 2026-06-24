import type { PageBlock } from '../types/page.js';

/** Дефолтная главная — как в прототипе cmsStore */
export const DEFAULT_HOME_BLOCKS: PageBlock[] = [
  { id: 'hero-1', type: 'HeroWidget' },
  { id: 'promotions-1', type: 'PromotionsWidget' },
  { id: 'offers-1', type: 'SpecialOffersWidget' },
  { id: 'directions-1', type: 'DirectionsWidget' },
  { id: 'doctors-1', type: 'DoctorsWidget' },
  { id: 'reviews-1', type: 'ReviewsWidget', content: { limit: 3 } },
];

export const DEFAULT_HOME_SEO = {
  metaTitle: 'Клиника «Источник»',
  metaDescription: 'Медицинский центр «Источник» — запись к врачу онлайн',
};
