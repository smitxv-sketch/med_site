import React from 'react';
import { ProgramData } from './ProgramWidgetVariants';
import { ProgramVariantClassic } from './variants/ProgramVariantClassic';

export interface ProgramWidgetProps {
  program?: ProgramData;
  desktopVariant?: string;
  mobileVariant?: string;
  layoutPattern?: string; // legacy
}

const MOCK_PROGRAM: ProgramData = {
  id: 'prog-1',
  title: 'Классическая Армения за 3 дня',
  subtitle: 'Исследовательский тур: Ереван, Гарни, Гегард',
  pricing: 'От 45,000 ֏',
  duration: '3 дня',
  capacity: 'До 15 человек',
  language: 'RU / EN',
  gallery: [
    { url: 'https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=2000&q=80' }
  ],
  description: 'Погрузитесь в историю первой христианской страны. Мы посетим античный храм Гарни, скальный монастырь Гегард и насладимся видами высокогорного озера.',
  highlights: [
    'Обзорная экскурсия',
    'Древняя архитектура',
    'Национальная кухня'
  ],
  schedule: [
    {
      stepNumber: 1,
      title: 'Знакомство с Ереваном',
      description: 'Встреча в аэропорту. Обзорная экскурсия по розовому городу: Площадь Республики, Каскад.',
      tags: ['Город', 'Архитектура'],
      nestedBlocks: [
        {
          id: 'nested-place-1',
          type: 'showcase',
          props: {}
        }
      ]
    },
    {
      stepNumber: 2,
      title: 'У подножия библейской горы',
      description: 'Поездка в монастырь Хор Вирап, где открывается самый близкий вид на Арарат.',
      tags: ['Природа', 'История']
    }
  ],
  features: [
    { text: 'Трансфер', isIncluded: true },
    { text: 'Услуги гида', isIncluded: true },
    { text: 'Авиаперелет', isIncluded: false }
  ],
  author: {
    name: 'Арам Хачатрян',
    photoUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80',
    description: 'Влюбленный в родную страну историк.',
    role: 'Ведущий гид'
  }
};

export const ProgramWidget = ({ program = MOCK_PROGRAM, desktopVariant = 'classic', mobileVariant = 'classic', layoutPattern }: ProgramWidgetProps) => {
  const finalDesktop = desktopVariant || layoutPattern || 'classic';
  const finalMobile = mobileVariant || layoutPattern || 'classic';

  return (
    <section className="w-full relative bg-surface" data-desktop-variant={finalDesktop} data-mobile-variant={finalMobile}>
      <ProgramVariantClassic program={program} />
    </section>
  );
};
