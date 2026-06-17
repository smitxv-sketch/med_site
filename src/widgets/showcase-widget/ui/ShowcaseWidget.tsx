import React from 'react';
import { ShowcaseData } from '../ShowcaseWidgetVariants';
import { ShowcaseVariantClassic } from './variants/ShowcaseVariantClassic';

export interface ShowcaseWidgetProps {
  showcase?: ShowcaseData;
  desktopVariant?: string;
  mobileVariant?: string;
  layoutPattern?: 'classic' | 'bento' | 'immersive-scroll'; // legacy
}

const MOCK_SHOWCASE: ShowcaseData = {
  id: 'mock-1',
  title: 'Каскад',
  subtitle: 'Архитектурно-монументальный комплекс',
  tags: ['Достопримечательность', 'Архитектура'],
  description: 'Огромная лестница из молочного туфа, соединяющая нижний и верхний город. Внутри находятся выставочные залы Центра искусств Гафесчяна.',
  featuresText: 'Подняться по ступеням, насладиться панорамой Еревана и видом на гору Арарат, посетить выставки современного искусства.',
  season: 'Круглый год',
  duration: '1-3 часа',
  gallery: [
    { url: 'https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&w=1200&q=80', caption: 'Вид снизу' },
    { url: 'https://images.unsplash.com/photo-1518182170546-076616fd63f8?auto=format&fit=crop&w=1200&q=80', caption: 'Панорама' },
    { url: 'https://images.unsplash.com/photo-1533580554157-19e917d091fc?auto=format&fit=crop&w=1200&q=80', caption: 'Арарат' }
  ],
  location: { address: 'Ереван, ул. Таманяна, 10' }
};

export const ShowcaseWidget = ({ showcase = MOCK_SHOWCASE, desktopVariant = 'classic', mobileVariant = 'classic', layoutPattern }: ShowcaseWidgetProps) => {
  const finalDesktop = desktopVariant || layoutPattern || 'classic';
  const finalMobile = mobileVariant || layoutPattern || 'classic';

  return (
    <section className="w-full relative bg-surface" data-desktop-variant={finalDesktop} data-mobile-variant={finalMobile}>
      <ShowcaseVariantClassic showcase={showcase} />
    </section>
  );
};
