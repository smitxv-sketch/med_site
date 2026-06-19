import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Review } from '@/entities/review/model/types';
import { reviewsRepository } from '@/entities/review/api/reviewsRepository';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { ReviewsVariantA, ReviewsVariantB, ReviewsVariantC, ReviewsVariantD } from './ReviewsWidgetVariants';
import { resolveWidgetVariants } from '@/shared/lib/widgets/resolveWidgetVariant';
import {
  REVIEWS_VARIANT_ALIASES,
  REVIEWS_VALID_VARIANTS,
} from '@/shared/lib/widgets/variantAliases';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

interface ReviewsWidgetProps {
  title?: string;
  subtitle?: string;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: '-' | 'A' | 'B' | 'C' | 'D'; // legacy
  variant?: string; // standard
  limit?: number;
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayoutPattern;
}

export function ReviewsWidget({
  title = 'Отзывы пациентов',
  subtitle = 'Что говорят о нашей клинике и врачах',
  desktopVariant,
  mobileVariant,
  variantOverride = '-',
  variant,
  limit,
  intent,
  layoutPattern,
}: ReviewsWidgetProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { layoutDensity } = useUISettingsStore();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    reviewsRepository.getReviews(limit).then((data) => {
      if (isMounted) {
        setReviews(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [limit]);

  // Determine layout maps
  const { desktop: resolvedDesktopVariant, mobile: resolvedMobileVariant } =
    resolveWidgetVariants(
      {
        desktopVariant,
        mobileVariant,
        layoutPattern,
        variant,
        variantOverride,
      },
      {
        defaultValue: 'grid',
        aliasMap: REVIEWS_VARIANT_ALIASES,
        validValues: REVIEWS_VALID_VARIANTS,
      },
      {
        defaultValue: 'carousel',
        aliasMap: REVIEWS_VARIANT_ALIASES,
        validValues: REVIEWS_VALID_VARIANTS,
      }
    );
  const dataIntent = intent || 'educational';
  
  // For now using desktop resolution 
  const finalLayout = resolvedDesktopVariant;

  if (isLoading) {
    return (
      <section className="py-[var(--spacing-section)] bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full animate-pulse flex flex-col gap-8">
           <div className="h-8 bg-gray-200 rounded w-1/4" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-100 rounded-2xl w-full" />
              ))}
           </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return null;
  }

  return (
    <section className="py-[var(--spacing-section)] bg-white w-full overflow-hidden" data-intent={dataIntent} data-desktop-variant={resolvedDesktopVariant} data-mobile-variant={resolvedMobileVariant}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-[var(--spacing-widget-inner)]">
        
        {/* Header */}
        <div className="flex flex-col gap-2 md:gap-4 md:items-center md:text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-sans tracking-tight text-gray-900 ${
              layoutDensity < 1 ? 'text-2xl md:text-3xl font-semibold' : 'text-3xl md:text-5xl font-bold'
            }`}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Content */}
        <div className="w-full">
          {finalLayout === 'grid' && <ReviewsVariantA reviews={reviews} />}
          {finalLayout === 'carousel' && <ReviewsVariantB reviews={reviews} />}
          {finalLayout === 'masonry' && <ReviewsVariantC reviews={reviews} />}
          {finalLayout === 'slider-filtered' && <ReviewsVariantD reviews={reviews} />}
        </div>
        
      </div>
    </section>
  );
}
