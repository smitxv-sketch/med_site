import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { HeroMobileVariant } from '@/shared/domain/hero/types';
import type { HeroSlide } from '@/shared/domain/hero/types';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { MobileHeroRegistry } from './HeroMobileVariants';
import { MOBILE_HERO_CONFIG } from '../config/mobileHeroConfig';

export interface HeroMobileClassicProps {
  slides: HeroSlide[];
  mobileVariant: HeroMobileVariant;
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export function HeroMobileClassic({
  slides,
  mobileVariant,
  currentSlide,
  goToSlide,
}: HeroMobileClassicProps) {
  const isE = mobileVariant === 'E';
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const lastScrollUpdate = useRef(Date.now());

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    if (isProgrammaticScroll.current) return;
    if (Date.now() - lastScrollUpdate.current < 500) return;

    const container = scrollContainerRef.current;

    if (isE) {
      const slideHeight = container.clientHeight;
      const targetScroll = currentSlide * slideHeight;

      if (Math.abs(container.scrollTop - targetScroll) > 10) {
        isProgrammaticScroll.current = true;
        container.scrollTo({ top: targetScroll, behavior: 'smooth' });
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 800);
      }
    } else {
      const slideWidth = container.clientWidth;
      const gap = 16;
      const targetScroll = currentSlide * (slideWidth + gap);

      if (Math.abs(container.scrollLeft - targetScroll) > 10) {
        isProgrammaticScroll.current = true;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 800);
      }
    }
  }, [currentSlide, isE]);

  const handleScroll = () => {
    if (!scrollContainerRef.current || isProgrammaticScroll.current) return;

    const container = scrollContainerRef.current;
    let newIndex = currentSlide;

    if (isE) {
      const scrollPosition = container.scrollTop;
      const slideHeight = container.clientHeight;
      newIndex = Math.round(scrollPosition / slideHeight);
    } else {
      const scrollPosition = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const gap = 16;
      newIndex = Math.round(scrollPosition / (slideWidth + gap));
    }

    if (newIndex !== currentSlide && newIndex >= 0 && newIndex < slides.length) {
      lastScrollUpdate.current = Date.now();
      goToSlide(newIndex);
    }
  };

  return (
    <div
      className={`flex lg:hidden flex-col relative w-full ${
        isE
          ? 'h-[100svh] pb-0 -mt-[80px] sm:-mt-[96px]'
          : mobileVariant === 'A'
            ? 'pb-8 bg-gray-50/50'
            : 'pb-8'
      }`}
    >
      {mobileVariant === 'A' && (
        <div className="w-full px-4 mt-4 shrink-0 z-10 relative">
          <Card
            className="p-4 sm:p-5 flex flex-col gap-4 border border-brand/10 shadow-md relative overflow-hidden bg-white w-full"
            style={{ borderRadius: 'var(--app-radius)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

            <div className="flex justify-between items-center gap-3 relative z-10">
              <div className="w-10 h-10 flex items-center justify-center text-brand bg-brand/10 rounded-full shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-[17px] font-bold text-gray-900 leading-tight">
                  Запись на приём
                </h2>
                <p className="text-[13px] text-gray-500 mt-0.5 leading-tight">
                  В клинику или онлайн
                </p>
              </div>
            </div>
            <div className="flex gap-3 relative z-10 mt-1">
              <Button
                as={Link}
                to="/booking"
                variant="primary"
                className="flex-1 shadow-lg shadow-brand/25 hover:shadow-brand/40 h-11 text-[15px] font-semibold transition-all"
              >
                Записаться
              </Button>
              <Button
                variant="outline"
                className="flex-[0.8] bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-11 text-[15px] font-semibold transition-all"
              >
                Позвонить
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className={`flex w-full ${
          isE
            ? 'flex-col overflow-y-auto snap-y gap-0 h-[100svh]'
            : `overflow-x-auto snap-x pb-6 gap-3 px-4 ${mobileVariant === 'A' ? 'pt-3' : 'pt-1'}`
        } snap-mandatory scrollbar-hide`}
        onScroll={handleScroll}
      >
        {slides.map((slideItem, index) => {
          const VariantComponent =
            MobileHeroRegistry[mobileVariant] || MobileHeroRegistry.A;
          return (
            <div
              key={index}
              className={`${isE ? 'w-full h-[100svh]' : 'w-[calc(100vw-32px)]'} flex-shrink-0 snap-center snap-always relative`}
            >
              <VariantComponent slide={slideItem} />
            </div>
          );
        })}
      </div>

      {!isE && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bottom-2 bg-white/80 py-1 px-2 rounded-full shadow-sm border border-gray-100">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-theme ${
                idx === currentSlide
                  ? 'w-5 bg-brand'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {isE && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-1.5 rounded-full transition-all duration-theme ${
                idx === currentSlide
                  ? 'h-6 bg-white'
                  : 'h-1.5 bg-white/50 hover:bg-white/80'
              }`}
              style={
                idx === currentSlide
                  ? { boxShadow: `0 0 8px ${MOBILE_HERO_CONFIG.dotGlowWhite}` }
                  : undefined
              }
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
