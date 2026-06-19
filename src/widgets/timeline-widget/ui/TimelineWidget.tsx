import React from 'react';
import { motion } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { TimelineStep, TimelineVariantA, TimelineVariantB } from './TimelineWidgetVariants';
import { resolveWidgetVariants } from '@/shared/lib/widgets/resolveWidgetVariant';
import {
  TIMELINE_VARIANT_ALIASES,
  TIMELINE_VALID_VARIANTS,
} from '@/shared/lib/widgets/variantAliases';

const MOCK_STEPS: TimelineStep[] = [
  {
    id: 's1',
    number: '01',
    title: 'Запись на приём',
    description: 'Оставьте заявку на сайте или позвоните нам. Администратор подберет удобное окно.',
  },
  {
    id: 's2',
    number: '02',
    title: 'Первичный осмотр',
    description: 'Врач внимательно выслушает жалобы, соберет анамнез и проведет базовый осмотр.',
  },
  {
    id: 's3',
    number: '03',
    title: 'Диагностика',
    description: 'Сдача анализов или прохождение УЗИ/МРТ по назначению. Быстро и без очередей.',
  },
  {
    id: 's4',
    number: '04',
    title: 'План лечения',
    description: 'Повторный приём для подробного разбора результатов и составим персональный план лечения.',
  },
  {
    id: 's5',
    number: '05',
    title: 'Выздоровление',
    description: 'Следуем рекомендациям и остаемся на связи до полного восстановления вашего здоровья.',
  },
];


export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

interface TimelineWidgetProps {
  title?: string;
  subtitle?: string;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: '-' | 'A' | 'B'; // legacy
  variant?: string; // legacy
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayoutPattern; // legacy
}

export function TimelineWidget({
  title = 'Как проходит лечение',
  subtitle = 'Простые шаги к вашему здоровью и отличному самочувствию',
  desktopVariant = 'vertical',
  mobileVariant = 'vertical',
  variantOverride = '-',
  variant,
  intent,
  layoutPattern,
}: TimelineWidgetProps) {
  const { layoutDensity } = useUISettingsStore();

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
        defaultValue: 'vertical',
        aliasMap: TIMELINE_VARIANT_ALIASES,
        validValues: TIMELINE_VALID_VARIANTS,
      },
      {
        defaultValue: 'vertical',
        aliasMap: TIMELINE_VARIANT_ALIASES,
        validValues: TIMELINE_VALID_VARIANTS,
      }
    );
  const dataIntent = intent || 'educational';
  
  const finalLayout = resolvedDesktopVariant; // Uses same component, usually manages responsiveness internally if needed.

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
        <div className="w-full mt-4 md:mt-8">
          {finalLayout === 'vertical' && <TimelineVariantA steps={MOCK_STEPS} />}
          {finalLayout === 'carousel' && <TimelineVariantB steps={MOCK_STEPS} />}
        </div>
        
      </div>
    </section>
  );
}
