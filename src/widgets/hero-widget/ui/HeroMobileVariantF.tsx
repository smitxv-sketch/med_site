import React, { useCallback } from 'react';
import type { HeroSlide } from '@/shared/domain/hero/types';
import { useSlider } from '@/shared/hooks/useSlider';
import { MOBILE_HERO_CONFIG, MobileHeroTabKey } from '../config/mobileHeroConfig';
import { findHeroSlideIndexByNavTarget } from '../lib/heroSlideUtils';
import { HeroMobileZoneSlider } from './mobile/HeroMobileZoneSlider';
import { HeroMobileZoneNav } from './mobile/HeroMobileZoneNav';
import { HeroMobileZoneCta } from './mobile/HeroMobileZoneCta';
import { HeroMobileZonePromos } from './mobile/HeroMobileZonePromos';

export interface HeroMobileVariantFProps {
  slides: HeroSlide[];
}

export function HeroMobileVariantF({ slides }: HeroMobileVariantFProps) {
  const { currentSlide, goToSlide } = useSlider(
    slides.length,
    MOBILE_HERO_CONFIG.slider.slideIntervalMs
  );

  const handleTabChange = useCallback(
    (tab: MobileHeroTabKey) => {
      goToSlide(findHeroSlideIndexByNavTarget(slides, tab));
    },
    [slides, goToSlide]
  );

  return (
    <section
      className="w-full lg:hidden -mx-4 sm:-mx-6"
      data-variant="F"
      data-marketing-block="true"
      style={{ paddingBottom: MOBILE_HERO_CONFIG.contentBottomPadding }}
    >
      <HeroMobileZoneSlider
        slides={slides}
        currentSlide={currentSlide}
        goToSlide={goToSlide}
      />
      <HeroMobileZoneNav onTabChange={handleTabChange} />
      <HeroMobileZoneCta />
      <HeroMobileZonePromos />
    </section>
  );
}
