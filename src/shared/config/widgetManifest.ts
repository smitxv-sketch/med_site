import React, { ComponentType, lazy, LazyExoticComponent } from 'react';
import type { WidgetDefinition } from '@/shared/types/widget';

import { HeroWidgetSchema } from '@/widgets/hero-widget/schema';
import { CategoriesWidgetSchema } from '@/widgets/categories-widget/schema';
import { PromotionsWidgetSchema } from '@/widgets/promotions-widget/schema';
import { SpecialOffersWidgetSchema } from '@/widgets/special-offers-widget/schema';
import { DirectionsWidgetSchema } from '@/widgets/directions-widget/schema';
import { DoctorsWidgetSchema } from '@/widgets/doctors-widget/schema';
import { LocationsWidgetSchema } from '@/widgets/locations-widget/schema';
import { GalleryWidgetSchema } from '@/widgets/gallery-widget/schema';
import { FeaturesWidgetSchema } from '@/widgets/features-widget/schema';
import { TimelineWidgetSchema } from '@/widgets/timeline-widget/schema';
import { FaqWidgetSchema } from '@/widgets/faq-widget/schema';
import { ReviewsWidgetSchema } from '@/widgets/reviews-widget/schema';
import { CalculatorWidgetSchema } from '@/widgets/calculator-widget/schema';
import { PortfolioWidgetSchema } from '@/widgets/portfolio-widget/schema';
import { showcaseSchema } from '@/widgets/showcase-widget/schema';
import { programSchema } from '@/widgets/program-widget/schema';
import { headerSchema } from '@/widgets/header-widget/schema';
import { footerSchema } from '@/widgets/footer-widget/schema';
import { GridContainerWidgetSchema } from '@/widgets/container-widget/schema';
import { ReferenceWidgetSchema } from '@/widgets/reference-widget/schema';

import { HeroWidget } from '@/widgets/hero-widget/ui/HeroWidget';
import { CategoriesWidget } from '@/widgets/categories-widget/ui/CategoriesWidget';
import { HeaderWidget } from '@/widgets/header-widget';

export type WidgetComponent =
  | ComponentType<Record<string, unknown>>
  | LazyExoticComponent<ComponentType<Record<string, unknown>>>;

export interface WidgetManifestEntry {
  type: string;
  schema: WidgetDefinition;
  component: WidgetComponent;
  /** Legacy block.type aliases */
  aliases?: string[];
}

const lazyNamed = (
  importFunc: () => Promise<Record<string, ComponentType<Record<string, unknown>>>>,
  exportName: string
) =>
  lazy(() =>
    importFunc().then((module) => ({ default: module[exportName] }))
  );

const PromotionsWidget = lazyNamed(
  () => import('@/widgets/promotions-widget/ui/PromotionsWidget'),
  'PromotionsWidget'
);
const SpecialOffersWidget = lazyNamed(
  () => import('@/widgets/special-offers-widget/ui/SpecialOffersWidget'),
  'SpecialOffersWidget'
);
const DirectionsWidget = lazyNamed(
  () => import('@/widgets/directions-widget/ui/DirectionsWidget'),
  'DirectionsWidget'
);
const DoctorsWidget = lazyNamed(
  () => import('@/widgets/doctors-widget/ui/DoctorsWidget'),
  'DoctorsWidget'
);
const LocationsWidget = lazyNamed(
  () => import('@/widgets/locations-widget/ui/LocationsWidget'),
  'LocationsWidget'
);
const ReviewsWidget = lazyNamed(
  () => import('@/widgets/reviews-widget/ui/ReviewsWidget'),
  'ReviewsWidget'
);
const GalleryWidget = lazyNamed(
  () => import('@/widgets/gallery-widget/ui/GalleryWidget'),
  'GalleryWidget'
);
const FeaturesWidget = lazyNamed(
  () => import('@/widgets/features-widget/ui/FeaturesWidget'),
  'FeaturesWidget'
);
const TimelineWidget = lazyNamed(
  () => import('@/widgets/timeline-widget/ui/TimelineWidget'),
  'TimelineWidget'
);
const FaqWidget = lazyNamed(
  () => import('@/widgets/faq-widget/ui/FaqWidget'),
  'FaqWidget'
);
const CalculatorWidget = lazyNamed(
  () => import('@/widgets/calculator-widget/ui/CalculatorWidget'),
  'CalculatorWidget'
);
const PortfolioWidget = lazyNamed(
  () => import('@/widgets/portfolio-widget/ui/PortfolioWidget'),
  'PortfolioWidget'
);
const ShowcaseWidget = lazyNamed(
  () => import('@/widgets/showcase-widget'),
  'ShowcaseWidget'
);
const ProgramWidget = lazyNamed(
  () => import('@/widgets/program-widget'),
  'ProgramWidget'
);
const FooterWidget = lazyNamed(
  () => import('@/widgets/footer-widget'),
  'FooterWidget'
);
const GridContainerWidget = lazyNamed(
  () => import('@/widgets/container-widget/ui/GridContainerWidget'),
  'GridContainerWidget'
);

/** Единый manifest: schema + runtime component + aliases */
export const WIDGET_MANIFEST: WidgetManifestEntry[] = [
  {
    type: 'HeroWidget',
    schema: HeroWidgetSchema,
    component: HeroWidget,
    aliases: ['hero'],
  },
  {
    type: 'CategoriesWidget',
    schema: CategoriesWidgetSchema,
    component: CategoriesWidget,
  },
  {
    type: 'PromotionsWidget',
    schema: PromotionsWidgetSchema,
    component: PromotionsWidget,
  },
  {
    type: 'SpecialOffersWidget',
    schema: SpecialOffersWidgetSchema,
    component: SpecialOffersWidget,
  },
  {
    type: 'DirectionsWidget',
    schema: DirectionsWidgetSchema,
    component: DirectionsWidget,
  },
  {
    type: 'DoctorsWidget',
    schema: DoctorsWidgetSchema,
    component: DoctorsWidget,
  },
  {
    type: 'LocationsWidget',
    schema: LocationsWidgetSchema,
    component: LocationsWidget,
  },
  {
    type: 'GalleryWidget',
    schema: GalleryWidgetSchema,
    component: GalleryWidget,
  },
  {
    type: 'FeaturesWidget',
    schema: FeaturesWidgetSchema,
    component: FeaturesWidget,
    aliases: ['features'],
  },
  {
    type: 'TimelineWidget',
    schema: TimelineWidgetSchema,
    component: TimelineWidget,
  },
  {
    type: 'FaqWidget',
    schema: FaqWidgetSchema,
    component: FaqWidget,
  },
  {
    type: 'ReviewsWidget',
    schema: ReviewsWidgetSchema,
    component: ReviewsWidget,
  },
  {
    type: 'CalculatorWidget',
    schema: CalculatorWidgetSchema,
    component: CalculatorWidget,
  },
  {
    type: 'PortfolioWidget',
    schema: PortfolioWidgetSchema,
    component: PortfolioWidget,
  },
  {
    type: 'showcase',
    schema: showcaseSchema,
    component: ShowcaseWidget,
  },
  {
    type: 'program',
    schema: programSchema,
    component: ProgramWidget,
  },
  {
    type: 'header',
    schema: headerSchema,
    component: HeaderWidget,
  },
  {
    type: 'footer',
    schema: footerSchema,
    component: FooterWidget,
  },
  {
    type: 'GridContainerWidget',
    schema: GridContainerWidgetSchema,
    component: GridContainerWidget,
  },
  {
    type: 'ReferenceWidget',
    schema: ReferenceWidgetSchema,
    component: React.Fragment as unknown as WidgetComponent,
  },
];

function buildManifestMaps() {
  const registry: Record<string, WidgetDefinition> = {};
  const components: Record<string, WidgetComponent> = {};

  for (const entry of WIDGET_MANIFEST) {
    registry[entry.type] = entry.schema;
    components[entry.type] = entry.component;
    entry.aliases?.forEach((alias) => {
      components[alias] = entry.component;
    });
  }

  return { registry, components };
}

const { registry, components } = buildManifestMaps();

/** Schema map for editor / PageRenderer metadata */
export const WIDGETS_REGISTRY: Record<string, WidgetDefinition> = registry;

/** Runtime component map for PageRenderer */
export const WIDGET_COMPONENT_MAP: Record<string, WidgetComponent> = components;

export function getWidgetComponent(type: string): WidgetComponent | undefined {
  return WIDGET_COMPONENT_MAP[type];
}

export function getWidgetSchema(type: string): WidgetDefinition | undefined {
  return WIDGETS_REGISTRY[type];
}
