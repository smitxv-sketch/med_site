import React from 'react';
import { PageRenderer } from '@/shared/ui/PageRenderer';
import { PageBlock } from '@/shared/types/block';
import { DEFAULT_PAGE_BLOCKS } from '@/shared/store/cmsStore'; // Actually let's manually define the blocks to ensure all widgets are there

const DEMO_BLOCKS: PageBlock[] = [
  { id: 'hero-1', type: 'HeroWidget' },
  { id: 'categories-1', type: 'CategoriesWidget' },
  { id: 'features-1', type: 'FeaturesWidget' },
  { id: 'timeline-1', type: 'TimelineWidget' },
  { id: 'promotions-1', type: 'PromotionsWidget' },
  { id: 'offers-1', type: 'SpecialOffersWidget' },
  { id: 'directions-1', type: 'DirectionsWidget' },
  { id: 'gallery-1', type: 'GalleryWidget' },
  { id: 'reviews-1', type: 'ReviewsWidget' },
  { id: 'doctors-1', type: 'DoctorsWidget' },
  { id: 'locations-1', type: 'LocationsWidget' },
  { id: 'faq-1', type: 'FaqWidget' },
];

export function DemoPage() {
  return (
    <div className="relative">
      <div className="bg-gray-100 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Демонстрационная страница</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          На этой странице представлены все доступные платформенные виджеты (блоки), оформленные в текущей тематике.
        </p>
      </div>
      <div className="flex flex-col gap-[var(--spacing-section)] py-12">
        <PageRenderer blocks={DEMO_BLOCKS} onUpdateBlocks={() => {}} />
      </div>
    </div>
  );
}
