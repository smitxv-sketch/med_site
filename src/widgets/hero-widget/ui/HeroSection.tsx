import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useHeroRepository } from '@/shared/di/DIContext';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useSlider } from '@/shared/hooks/useSlider';
import { DesktopHeroRegistry } from './HeroDesktopVariants';
import { HeroVariantC } from './HeroVariantC';
import { HeroMobileVariantF } from './HeroMobileVariantF';
import { HeroMobileClassic } from './HeroMobileClassic';
import { HERO_THEME } from '../config/heroTheme';
import { resolveHeroVariants } from '../lib/resolveHeroVariants';

export interface HeroSectionProps {
  desktopVariant?: string;
  mobileVariant?: string;
}

export function HeroSection({
  desktopVariant: desktopProp,
  mobileVariant: mobileProp,
}: HeroSectionProps = {}) {
  const heroRepository = useHeroRepository();
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['heroSlides'],
    queryFn: () => heroRepository.getHeroSlides(),
  });

  const storeDesktop = useUISettingsStore((s) => s.heroDesktopVariant);
  const storeMobile = useUISettingsStore((s) => s.heroMobileVariant);
  const { desktop: desktopVariant, mobile: mobileVariant } = resolveHeroVariants(
    { desktopVariant: desktopProp, mobileVariant: mobileProp },
    { heroDesktopVariant: storeDesktop, heroMobileVariant: storeMobile }
  );

  const isVariantC = desktopVariant === 'C';
  const isVariantD = desktopVariant === 'D';
  const isMobileF = mobileVariant === 'F';

  const parentSliderEnabled =
    slides.length > 0 && (mobileVariant !== 'F' || isVariantC);

  const slideInterval = isVariantD ? HERO_THEME.slideIntervalMs : 9000;
  const { currentSlide, nextSlide, prevSlide, goToSlide, pause, resume } =
    useSlider(slides.length, slideInterval, {
      pauseOnHover: isVariantD,
      enabled: parentSliderEnabled,
    });

  if (isLoading || slides.length === 0) {
    return (
      <section className="relative rounded-[var(--app-radius)] overflow-hidden mt-2 min-h-[420px] sm:min-h-[480px] md:min-h-[500px] flex flex-col justify-center bg-gray-50 border border-gray-100">
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[var(--app-radius)]" />
      </section>
    );
  }

  return (
    <section
      className="relative group flex flex-col w-full"
      data-marketing-block="true"
      data-desktop-variant={desktopVariant}
      data-mobile-variant={mobileVariant}
    >
      <div className="hidden lg:block w-full">
        {isVariantC ? (
          <HeroVariantC
            slides={slides}
            currentSlide={currentSlide}
            goToSlide={goToSlide}
          />
        ) : DesktopHeroRegistry[desktopVariant] ? (
          React.createElement(DesktopHeroRegistry[desktopVariant], {
            slides,
            currentSlide,
            goToSlide,
            nextSlide,
            prevSlide,
            ...(isVariantD ? { pause, resume } : {}),
          })
        ) : (
          <DesktopHeroRegistry.A
            slides={slides}
            currentSlide={currentSlide}
            goToSlide={goToSlide}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        )}
      </div>

      {isMobileF ? (
        <HeroMobileVariantF slides={slides} />
      ) : (
        <HeroMobileClassic
          slides={slides}
          mobileVariant={mobileVariant}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
        />
      )}
    </section>
  );
}
