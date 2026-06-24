import type { PageBlock } from '../types/page.js';
import type { StrapiBlockEntry } from './mapStrapiBlocks.js';

const WIDGET_TO_COMPONENT: Record<string, string> = {
  HeroWidget: 'blocks.hero',
  PromotionsWidget: 'blocks.promotions',
  SpecialOffersWidget: 'blocks.special-offers',
  DirectionsWidget: 'blocks.directions',
  DoctorsWidget: 'blocks.doctors',
  ReviewsWidget: 'blocks.reviews',
};

/** PageBlock[] → Strapi Dynamic Zone (обратный маппинг для publish) */
export function mapPageBlocksToStrapi(blocks: PageBlock[]): StrapiBlockEntry[] {
  return blocks.map((block) => {
    const component =
      WIDGET_TO_COMPONENT[block.type] ?? 'blocks.generic-widget';

    return {
      __component: component,
      widgetType: block.type,
      content: block.content ?? {},
      design: block.design ?? {},
      config: block.config ?? {},
    };
  });
}
