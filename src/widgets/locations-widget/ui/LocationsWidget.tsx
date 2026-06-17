import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Container } from '@/shared/ui/Container';

const locations = [
  {
    id: 1,
    name: 'Клиника в ЖК Александровский',
    address: 'ул. 40-летия Победы, 11, Челябинск',
    phone: '+7 (351) 778-88-87',
    image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Клиника в ЖК Подсолнухи',
    address: 'ул. Чичерина, 34А, Челябинск',
    phone: '+7 (351) 778-88-87',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Клиника в Лесном Острове',
    address: 'ул. Градостроителей, 1/3, Челябинск',
    phone: '+7 (351) 778-88-87',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80'
  }
];

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive' | 'trust-building';
export type WidgetLayout = 'grid' | 'carousel' | 'compact';

export interface LocationsWidgetProps {
  intent?: WidgetIntent;
  desktopVariant?: string;
  mobileVariant?: string;
  layoutPattern?: WidgetLayout;
}

export function LocationsWidget({ intent, desktopVariant = 'carousel', mobileVariant = 'carousel', layoutPattern }: LocationsWidgetProps = {}) {
  const locationsRef = useRef<HTMLDivElement>(null);
  const [activeLocationDot, setActiveLocationDot] = useState(0);

  const resolvedDesktopVariant = desktopVariant || layoutPattern || 'carousel';
  const resolvedMobileVariant = mobileVariant || layoutPattern || 'carousel';
  const dataIntent = intent || 'educational';

  const handleLocationsScroll = () => {
    if (!locationsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = locationsRef.current;
    if (scrollWidth <= clientWidth) return;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const maxDots = Math.min(locations.length, 5);
    setActiveLocationDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!locationsRef.current) return;
    const container = locationsRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const maxDots = Math.min(locations.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  return (
    <Container>
    <section data-intent={dataIntent} data-desktop-variant={resolvedDesktopVariant} data-mobile-variant={resolvedMobileVariant}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Адреса клиник</h2>
          {locations.length > 1 && (
            <div className="flex gap-1.5 items-center mt-1">
              {Array.from({ length: Math.min(locations.length, 5) }).map((_, i) => (
                <button
                  key={i} 
                  onClick={() => handleDotClick(i)}
                  aria-label={`Scroll to location ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-theme ${i === activeLocationDot ? 'w-6 bg-brand' : 'w-1.5 bg-gray-200 hover:bg-gray-300'}`} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div 
        ref={locationsRef}
        onScroll={handleLocationsScroll}
        className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 scrollbar-hide"
      >
        {locations.map((loc) => (
          <Card key={loc.id} className="snap-start shrink-0 w-[320px] md:w-[400px] flex flex-col">
            <div className="h-48 bg-gray-200 relative">
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <Link to="/contacts" className="text-xl font-bold text-gray-900 mb-2 hover:text-brand transition-colors inline-block">
                {loc.name}
              </Link>
              <p className="text-gray-600 mb-6 flex-1">{loc.address}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <Button 
                  as="a"
                  href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                  variant="primary"
                  className="flex-1 whitespace-nowrap"
                >
                  {loc.phone}
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                >
                  Маршрут
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {/* Spacer for right padding on mobile */}
        <div className="w-1 shrink-0 sm:hidden"></div>
      </div>
    </section>
    </Container>
  );
}
