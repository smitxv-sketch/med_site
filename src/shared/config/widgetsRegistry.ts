import { WidgetDefinition } from '@/shared/types/widget';
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

export const WIDGETS_REGISTRY: Record<string, WidgetDefinition> = {
  'HeroWidget': HeroWidgetSchema,
  'CategoriesWidget': CategoriesWidgetSchema,
  'PromotionsWidget': PromotionsWidgetSchema,
  'SpecialOffersWidget': SpecialOffersWidgetSchema,
  'DirectionsWidget': DirectionsWidgetSchema,
  'DoctorsWidget': DoctorsWidgetSchema,
  'LocationsWidget': LocationsWidgetSchema,
  'GalleryWidget': GalleryWidgetSchema,
  'FeaturesWidget': FeaturesWidgetSchema,
  'TimelineWidget': TimelineWidgetSchema,
  'FaqWidget': FaqWidgetSchema,
  'ReviewsWidget': ReviewsWidgetSchema,
  'CalculatorWidget': CalculatorWidgetSchema,
  'PortfolioWidget': PortfolioWidgetSchema,
  'showcase': showcaseSchema,
  'program': programSchema,
  'header': headerSchema,
  'footer': footerSchema,
  'GridContainerWidget': GridContainerWidgetSchema,
  'ReferenceWidget': ReferenceWidgetSchema,
};