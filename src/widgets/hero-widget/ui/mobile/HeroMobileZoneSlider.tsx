import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MOBILE_HERO_CONFIG } from '../../config/mobileHeroConfig';
import { getHeroSlideDirectionTokens } from '../../lib/heroDirectionTokens';
import type { HeroSlide } from '@/shared/domain/hero/types';
import { HeroSlideDots } from '../HeroSlideDots';

interface HeroMobileZoneSliderProps {
  slides: HeroSlide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

export function HeroMobileZoneSlider({
  slides,
  currentSlide,
  goToSlide,
}: HeroMobileZoneSliderProps) {
  const slide = slides[currentSlide];
  if (!slide) return null;

  const cfg = MOBILE_HERO_CONFIG.slider;
  const accent = getHeroSlideDirectionTokens(slide);
  const hasImage = Boolean(slide.image && slide.fullBleedBackground !== false);
  const titleLong = slide.subtitle.length > cfg.titleLongThreshold;

  return (
    <div
      className="relative overflow-hidden shrink-0"
      style={{
        height: cfg.height,
        marginTop: cfg.marginTop,
        marginLeft: cfg.marginX,
        marginRight: cfg.marginX,
        borderRadius: cfg.borderRadius,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          {hasImage ? (
            <>
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: cfg.gradient }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: accent.fallbackBg }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <span
        className="absolute top-3 right-3 z-10 text-white font-semibold tracking-[0.08em] uppercase px-3 py-1 rounded-full"
        style={{
          fontSize: cfg.tagSize,
          backgroundColor: accent.badgeBg,
        }}
      >
        {accent.badgeLabel}
      </span>

      <div className="absolute bottom-3.5 left-3.5 right-14 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p
              className="uppercase mb-1 line-clamp-1"
              style={{
                fontSize: cfg.tagSize,
                color: MOBILE_HERO_CONFIG.textOnPhoto.muted,
                letterSpacing: '0.1em',
              }}
            >
              {slide.title}
            </p>
            <h2
              className="text-white font-medium leading-tight line-clamp-2 mb-1"
              style={{
                fontSize: titleLong ? cfg.titleSizeLong : cfg.titleSize,
              }}
            >
              {slide.subtitle}
            </h2>
            {slide.description && (
              <p
                className="line-clamp-2 mb-2.5"
                style={{
                  fontSize: cfg.subtitleSize,
                  color: MOBILE_HERO_CONFIG.textOnPhoto.soft,
                }}
              >
                {slide.description}
              </p>
            )}
            <Link
              to={slide.link}
              className="inline-flex items-center font-medium px-5 py-2 rounded-[30px] bg-white"
              style={{
                fontSize: 13,
                color: accent.ctaColor,
              }}
            >
              {slide.linkText}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-3.5 right-3.5 z-10">
        <HeroSlideDots
          count={slides.length}
          current={currentSlide}
          onSelect={goToSlide}
          variant="light"
          className="gap-1.5"
          activeWidth={MOBILE_HERO_CONFIG.slider.dotActiveWidth}
          inactiveSize={MOBILE_HERO_CONFIG.slider.dotInactiveSize}
        />
      </div>
    </div>
  );
}
