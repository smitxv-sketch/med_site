import React from 'react';
import { motion } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { FaqItem, FaqVariantA, FaqVariantB, FaqVariantC } from './FaqWidgetVariants';
import { resolveWidgetVariants } from '@/shared/lib/widgets/resolveWidgetVariant';
import {
  FAQ_VARIANT_ALIASES,
  FAQ_VALID_VARIANTS,
} from '@/shared/lib/widgets/variantAliases';

const MOCK_FAQ: FaqItem[] = [
  {
    id: 'q1',
    question: 'Как записаться на приём к специалисту?',
    answer: 'Вы можете оставить заявку на нашем сайте, позвонить по телефону колл-центра или воспользоваться удобным мессенджером. Наши администраторы подберут для вас оптимальное время.',
  },
  {
    id: 'q2',
    question: 'Нужна ли специальная подготовка к анализам?',
    answer: 'Для большинства анализов крови требуется сдавать их натощак. Дополнительные рекомендации (например, по диете перед УЗИ) вам обязательно сообщит администратор при записи.',
  },
  {
    id: 'q3',
    question: 'Можно ли получить результаты онлайн?',
    answer: 'Да, все результаты исследований, а также заключения врачей, автоматически загружаются в ваш личный кабинет на сайте и могут быть отправлены на безопасную электронную почту по вашему желанию.',
  },
  {
    id: 'q4',
    question: 'Работаете ли вы по полисам ДМС?',
    answer: 'Мы сотрудничаем с большинством крупных страховых компаний. Пожалуйста, уточните информацию о вашей страховой у администратора перед визитом.',
  },
  {
    id: 'q5',
    question: 'Есть ли у клиники парковка для пациентов?',
    answer: 'Да, для наших пациентов предусмотрена бесплатная охраняемая парковка. При въезде просто сообщите охране, что вы направляетесь в нашу клинику.',
  },
];

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

interface FaqWidgetProps {
  title?: string;
  subtitle?: string;
  desktopVariant?: string;
  mobileVariant?: string;
  variantOverride?: '-' | 'A' | 'B' | 'C'; // legacy
  variant?: string; // standard
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayoutPattern;
}

export function FaqWidget({
  title = 'Частые вопросы',
  subtitle = 'Мы ответили на вопросы, которые нам задают чаще всего',
  desktopVariant = 'accordion',
  mobileVariant = 'accordion',
  variantOverride = '-',
  variant,
  intent,
  layoutPattern,
}: FaqWidgetProps) {
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
        defaultValue: 'accordion',
        aliasMap: FAQ_VARIANT_ALIASES,
        validValues: FAQ_VALID_VARIANTS,
      },
      {
        defaultValue: 'accordion',
        aliasMap: FAQ_VARIANT_ALIASES,
        validValues: FAQ_VALID_VARIANTS,
      }
    );
  const dataIntent = intent || 'educational';
  
  const finalLayout = resolvedDesktopVariant;

  return (
    <section className="py-[var(--spacing-section)] bg-white w-full overflow-hidden" data-intent={dataIntent} data-desktop-variant={resolvedDesktopVariant} data-mobile-variant={resolvedMobileVariant}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {finalLayout === 'split' ? (
          // Split layout for Variant C
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
             <div className="flex flex-col gap-4 lg:sticky lg:top-24">
               {title && (
                 <motion.h2 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className={`font-sans tracking-tight text-gray-900 ${
                     layoutDensity < 1 ? 'text-2xl md:text-3xl font-semibold' : 'text-3xl md:text-4xl font-bold'
                   }`}
                 >
                   {title}
                 </motion.h2>
               )}
               {subtitle && (
                 <motion.p 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.1 }}
                   className="text-base md:text-lg text-gray-500"
                 >
                   {subtitle}
                 </motion.p>
               )}
             </div>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
               <FaqVariantC items={MOCK_FAQ} />
             </motion.div>
          </div>
        ) : (
          // Standard layout for A and B
          <div className="flex flex-col gap-[var(--spacing-widget-inner)]">
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

            <div className="w-full">
              {finalLayout === 'grid' && <FaqVariantA items={MOCK_FAQ} />}
              {finalLayout === 'accordion' && <FaqVariantB items={MOCK_FAQ} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
