import React from 'react';
import { motion } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { FeatureItem, FeaturesVariantA, FeaturesVariantB, FeaturesVariantC } from './FeaturesWidgetVariants';

const MOCK_FEATURES: FeatureItem[] = [
  {
    id: 'f1',
    title: 'Доказательная база',
    description: 'Мы опираемся только на современные международные протоколы и клинические рекомендации.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'f2',
    title: 'Экономия времени',
    description: 'Все профильные специалисты и виды диагностики в одном здании — за один день.',
    iconName: 'Clock'
  },
  {
    id: 'f3',
    title: 'Врачи экспертного класса',
    description: 'Наши специалисты регулярно проходят стажировки и участвуют в научных конференциях.',
    iconName: 'Award'
  },
  {
    id: 'f4',
    title: 'Забота и эмпатия',
    description: 'Индивидуальный подход без спешки. Мы создаем комфортную обстановку для каждого пациента.',
    iconName: 'Heart'
  },
  {
    id: 'f5',
    title: 'Командный подход',
    description: 'При сложных случаях мы быстро организуем консилиум и обсуждаем план лечения совместно.',
    iconName: 'Users'
  },
];

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

interface FeaturesWidgetProps {
  title?: string;
  subtitle?: string;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: '-' | 'A' | 'B' | 'C'; // legacy
  variant?: string; // standard
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayoutPattern;
}

export function FeaturesWidget({
  title = 'Наши преимущества',
  subtitle = 'Почему пациенты доверяют нам своё здоровье',
  desktopVariant = 'bento',
  mobileVariant = 'stack',
  variantOverride = '-',
  variant,
  intent,
  layoutPattern,
}: FeaturesWidgetProps) {
  const { layoutDensity } = useUISettingsStore();

  const mapVariant = (v: string | undefined | null, defaultVal: string) => {
    if (!v || v === '-') return defaultVal;
    if (v === 'A' || v === 'grid' || v === 'fluid') return 'grid';
    if (v === 'B' || v === 'list' || v === 'stack') return 'list';
    if (v === 'C' || v === 'bento' || v === 'split') return 'bento';
    return defaultVal;
  };

  const resolvedDesktopVariant = mapVariant(desktopVariant || layoutPattern || variant || variantOverride, 'bento');
  const resolvedMobileVariant = mapVariant(mobileVariant || layoutPattern || variant || variantOverride, 'stack');
  const dataIntent = intent || 'educational';
  
  const finalLayout = resolvedDesktopVariant; 

  return (
    <section className="py-[var(--spacing-section)] bg-white w-full overflow-hidden" data-intent={dataIntent} data-desktop-variant={resolvedDesktopVariant} data-mobile-variant={resolvedMobileVariant}>
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
          {finalLayout === 'grid' && <FeaturesVariantA features={MOCK_FEATURES} />}
          {finalLayout === 'list' && <FeaturesVariantB features={MOCK_FEATURES} />}
          {finalLayout === 'bento' && <FeaturesVariantC features={MOCK_FEATURES} />}
        </div>
        
      </div>
    </section>
  );
}
