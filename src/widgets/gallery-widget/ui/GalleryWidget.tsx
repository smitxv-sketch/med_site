import React from 'react';
import { motion } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { GalleryImage, GalleryVariantA, GalleryVariantB, GalleryVariantC, GalleryVariantD } from './GalleryWidgetVariants';

const MOCK_IMAGES: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop', title: 'Светлые кабинеты', span: 'col-span-2 row-span-2' },
  { id: '2', url: 'https://images.unsplash.com/photo-1581595220887-f4099a5824b3?q=80&w=800&auto=format&fit=crop', title: 'Современное оборудование', span: 'col-span-1 row-span-1', portrait: true },
  { id: '3', url: 'https://images.unsplash.com/photo-1551076805-e1869043e560?q=80&w=800&auto=format&fit=crop', title: 'Зона ожидания', span: 'col-span-1 row-span-1' },
  { id: '4', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop', title: 'Лаборатория', span: 'col-span-1 row-span-2', portrait: true },
  { id: '5', url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop', title: 'Приемная', span: 'col-span-2 row-span-1' },
  { id: '6', url: 'https://images.unsplash.com/photo-1538108149393-cebb47ac1960?q=80&w=800&auto=format&fit=crop', title: 'Операционная', span: 'col-span-1 row-span-1' },
  { id: '7', url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=800&auto=format&fit=crop', title: 'Наши специалисты', span: 'col-span-1 row-span-1' },
  { id: '8', url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1200&auto=format&fit=crop', title: 'Палаты стационара', span: 'col-span-2 row-span-2' },
];

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive' | 'trust-building';
export type WidgetLayout = 'grid' | 'masonry' | 'bento' | 'carousel' | 'split' | 'accordion';

interface GalleryWidgetProps {
  title?: string;
  subtitle?: string;
  variantOverride?: '-' | 'A' | 'B' | 'C' | 'D'; // legacy
  variant?: string; // standard
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayout;
}

export function GalleryWidget({
  title = 'Наша инфраструктура',
  subtitle = 'Познакомьтесь с тем, как устроена наша клиника изнутри',
  variantOverride = '-',
  variant,
  intent,
  layoutPattern,
}: GalleryWidgetProps) {
  const { layoutDensity } = useUISettingsStore();

  let finalLayout = 'bento';
  
  if (variant && variant !== '-') {
    if (variant === 'A') finalLayout = 'grid';
    if (variant === 'B') finalLayout = 'masonry';
    if (variant === 'C') finalLayout = 'bento';
    if (variant === 'D') finalLayout = 'carousel';
  } else if (variantOverride !== '-' && variantOverride) {
    if (variantOverride === 'A') finalLayout = 'grid';
    if (variantOverride === 'B') finalLayout = 'masonry';
    if (variantOverride === 'C') finalLayout = 'bento';
    if (variantOverride === 'D') finalLayout = 'carousel';
  } else if (layoutPattern) {
    finalLayout = layoutPattern;
  } else if (intent) {
    if (intent === 'educational') finalLayout = 'grid';
    else if (intent === 'immersive') finalLayout = 'masonry';
    else if (intent === 'direct-response') finalLayout = 'carousel';
    else finalLayout = 'bento';
  }

  return (
    <section className="py-[var(--spacing-section)] bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-[var(--spacing-widget-inner)]">
        
        {/* Header */}
        {(title || subtitle) && (
          <div className="flex flex-col gap-2 md:gap-4 md:items-center md:text-center">
            {title && (
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
            )}
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
        )}

        {/* Content */}
        <div className="w-full">
          {finalLayout === 'grid' && <GalleryVariantA images={MOCK_IMAGES.slice(0, 8)} />}
          {finalLayout === 'masonry' && <GalleryVariantB images={MOCK_IMAGES} />}
          {finalLayout === 'bento' && <GalleryVariantC images={MOCK_IMAGES} />}
          {finalLayout === 'carousel' && <GalleryVariantD images={MOCK_IMAGES} />}
        </div>
        
      </div>
    </section>
  );
}
