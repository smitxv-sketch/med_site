import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Container } from '@/shared/ui/Container';
import { useSpecialOffersRepository } from '@/shared/di/DIContext'; 
import { SpecialOffer } from '@/shared/infrastructure/storage/SpecialOffersRepository';
import { 
  DesktopClassic, 
  DesktopBento, 
  DesktopCarousel, 
  MobileClassic, 
  MobileCompact, 
  MobileAutoScroll 
} from './SpecialOffersWidgetVariants';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type DesktopLayoutPattern = 'classic' | 'bento' | 'carousel';
export type MobileLayoutPattern = 'classic' | 'compact' | 'auto-scroll';

export interface SpecialOffersWidgetProps {
  intent?: WidgetIntent;
  desktopVariant?: DesktopLayoutPattern;
  mobileVariant?: MobileLayoutPattern;
  // keep legacy layoutPattern support for backwards compatibility
  layoutPattern?: string; 
}

export function SpecialOffersWidget({ desktopVariant = 'bento', mobileVariant = 'auto-scroll', layoutPattern }: SpecialOffersWidgetProps = {}) {
  const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);
  const specialOffersRepository = useSpecialOffersRepository();

  useEffect(() => {
    let active = true;
    specialOffersRepository.getSpecialOffers().then(data => {
      if(active) setSpecialOffers(data);
    });
    return () => { active = false; };
  }, [specialOffersRepository]);

  if (specialOffers.length === 0) return null;

  // Resolve legacy layoutPattern if provided
  const resolvedDesktop = layoutPattern === 'grid' ? 'classic' : (layoutPattern === 'carousel' ? 'carousel' : (layoutPattern === 'bento' ? 'bento' : desktopVariant));
  const resolvedMobile = layoutPattern === 'grid' ? 'classic' : (layoutPattern === 'carousel' ? 'auto-scroll' : mobileVariant);

  return (
    <Container>
    <section data-desktop-variant={resolvedDesktop} data-mobile-variant={resolvedMobile}>
      <div className="flex items-center justify-between mb-5 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight truncate">Спецпредложения</h2>
        <Button as={Link} to="/special-offers" variant="secondary" size="sm" className="shrink-0">
          <span className="hidden sm:inline">Все спецпредложения</span>
          <span className="inline sm:hidden">Все</span>
          <ArrowRight className="w-4 h-4 ml-1 sm:ml-2" />
        </Button>
      </div>
      
      {/* Desktop Views */}
      <div className="hidden md:block">
        {resolvedDesktop === 'classic' && <DesktopClassic offers={specialOffers} />}
        {resolvedDesktop === 'bento' && <DesktopBento offers={specialOffers} />}
        {resolvedDesktop === 'carousel' && <DesktopCarousel offers={specialOffers} />}
      </div>

      {/* Mobile Views */}
      <div className="block md:hidden">
        {resolvedMobile === 'classic' && <MobileClassic offers={specialOffers} />}
        {resolvedMobile === 'compact' && <MobileCompact offers={specialOffers} />}
        {resolvedMobile === 'auto-scroll' && <MobileAutoScroll offers={specialOffers} />}
      </div>

    </section>
    </Container>
  );
}
