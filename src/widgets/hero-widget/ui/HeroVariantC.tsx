import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { usePromotionsRepository } from '@/shared/di/DIContext';
import { Button } from '@/shared/ui/Button';
import { GhostTyping } from '@/shared/ui/GhostTyping';
import { HeroSlide } from './HeroMobileVariants';
import { HeroSlideDots } from './HeroSlideDots';
import {
  HERO_DOCTOR_CARD,
  HERO_THEME,
  HERO_VRT_FALLBACK,
} from '../config/heroTheme';
import {
  formatDaysLeft,
  getDaysUntilExpiry,
  pickActiveVrtPromotion,
} from '../lib/heroUtils';

export interface HeroVariantCProps {
  slides: HeroSlide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
}

function HeroCSlider({
  slides,
  currentSlide,
  goToSlide,
  className,
}: HeroVariantCProps & { className?: string }) {
  const slide = slides[currentSlide];
  if (!slide) return null;

  const hasImage = Boolean(slide.image && slide.fullBleedBackground !== false);
  const accentGreen = slide.themeAccent === 'green';
  const accentViolet = slide.themeAccent === 'violet';
  const isVrtSlide = slide.direction === 'vrt';

  return (
    <div
      className={cn(
        'relative overflow-hidden flex flex-col justify-end rounded-2xl min-h-[260px] md:min-h-[380px] h-full',
        className
      )}
      style={{ borderRadius: HERO_THEME.borderRadius }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: HERO_THEME.slideFadeMs / 1000 }}
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
                style={{ background: HERO_THEME.sliderCardGradient }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: accentViolet
                  ? HERO_THEME.brandViolet
                  : accentGreen
                    ? HERO_THEME.brandGreen
                    : HERO_THEME.brandGreen,
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex flex-col justify-center flex-1 p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="max-w-lg"
          >
            <span
              className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.08em] uppercase mb-4 w-fit text-white border border-white/20',
                !hasImage && 'bg-white/20'
              )}
              style={
                hasImage
                  ? { backgroundColor: HERO_THEME.tagBadgeOnPhoto }
                  : undefined
              }
            >
              {slide.title}
            </span>
            <h2
              className={cn(
                'text-2xl md:text-3xl font-medium mb-4 leading-tight tracking-tight',
                hasImage ? 'text-white' : 'text-white'
              )}
              lang="ru"
            >
              <GhostTyping text={slide.subtitle} startDelay={80} typingSpeed={28} />
            </h2>
            {slide.description && (
              <p
                className={cn(
                  'text-sm md:text-base mb-6 line-clamp-2 leading-relaxed',
                  hasImage ? 'text-white/85' : 'text-white/90'
                )}
              >
                {slide.description}
              </p>
            )}
            <Button
              as={Link}
              to={slide.link}
              className="rounded-[30px] text-[13px] font-medium px-6 h-10 shadow-md"
              style={
                isVrtSlide
                  ? {
                      backgroundColor: '#ffffff',
                      color: HERO_THEME.brandViolet,
                    }
                  : { backgroundColor: HERO_THEME.brandGreen, color: '#ffffff' }
              }
            >
              {slide.linkText}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex justify-center pb-5">
        <HeroSlideDots
          count={slides.length}
          current={currentSlide}
          onSelect={goToSlide}
          variant="light"
        />
      </div>
    </div>
  );
}

function HeroDoctorCard({ className }: { className?: string }) {
  const card = HERO_DOCTOR_CARD;

  return (
    <div
      className={cn(
        'relative flex flex-col p-5 rounded-2xl bg-white flex-1 min-h-0',
        className
      )}
      style={{
        borderRadius: HERO_THEME.borderRadius,
        border: `0.5px solid ${HERO_THEME.cardBorder}`,
      }}
    >
      <h3 className="text-base font-medium text-gray-900 leading-snug pr-16 mb-0.5">
        {card.eyebrow}
      </h3>
      <p className="text-xs text-gray-600 mb-1">{card.doctorName}</p>
      <p className="text-[11px] text-gray-500 mb-2">{card.specialization}</p>
      <p className="text-sm text-gray-500 mb-3">{card.discount}</p>

      <div className="absolute top-4 right-4">
        <img
          src={card.image}
          alt={card.doctorName}
          className="w-[52px] h-[52px] rounded-full object-cover shadow-sm"
        />
      </div>

      <div className="mt-auto">
        <Button
          as={Link}
          to={card.ctaLink}
          className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5"
          style={{ backgroundColor: HERO_THEME.brandGreen }}
        >
          {card.ctaText}
        </Button>
      </div>
    </div>
  );
}

function HeroVrtCard({ className }: { className?: string }) {
  const promotionsRepository = usePromotionsRepository();
  const { data: promotions = [] } = useQuery({
    queryKey: ['heroVrtPromotion'],
    queryFn: () => promotionsRepository.getPromotions(),
  });

  const vrtPromo = pickActiveVrtPromotion(promotions);
  const fallback = !vrtPromo;

  const daysLeft = vrtPromo
    ? getDaysUntilExpiry(vrtPromo.endDate)
    : null;

  return (
    <div
      className={cn('relative flex flex-col p-5 rounded-2xl flex-1 min-h-0', className)}
      style={{
        borderRadius: HERO_THEME.borderRadius,
        backgroundColor: HERO_THEME.vrtCardBg,
        border: `0.5px solid ${HERO_THEME.vrtCardBorder}`,
      }}
    >
      <p
        className="text-[10px] font-medium tracking-[0.08em] uppercase mb-2"
        style={{ color: HERO_THEME.brandViolet }}
      >
        {HERO_VRT_FALLBACK.label}
      </p>

      {fallback ? (
        <>
          <h3 className="text-base font-medium text-gray-900 leading-snug pr-14 mb-4 flex-1">
            {HERO_VRT_FALLBACK.title}
          </h3>
          <Button
            as={Link}
            to={HERO_VRT_FALLBACK.ctaLink}
            className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5 w-fit"
            style={{ backgroundColor: HERO_THEME.brandViolet }}
          >
            {HERO_VRT_FALLBACK.ctaText}
          </Button>
        </>
      ) : (
        <>
          <h3 className="text-base font-medium text-[var(--color-text-primary,#111827)] leading-snug pr-14 mb-1 flex-1">
            {vrtPromo.title}
          </h3>
          {daysLeft !== null && (
            <p
              className="text-xs mb-3"
              style={{ color: HERO_THEME.brandViolet }}
            >
              {formatDaysLeft(daysLeft)}
            </p>
          )}
          <Button
            as={Link}
            to="/booking"
            className="rounded-[30px] text-[13px] font-medium text-white h-9 px-5 w-fit mb-2"
            style={{ backgroundColor: HERO_THEME.brandViolet }}
          >
            Записаться
          </Button>
          <Link
            to={HERO_VRT_FALLBACK.programsLink}
            className="text-xs no-underline hover:underline w-fit"
            style={{ color: HERO_THEME.brandViolet }}
          >
            {HERO_VRT_FALLBACK.programsText}
          </Link>
        </>
      )}

      {vrtPromo?.image && (
        <img
          src={vrtPromo.image}
          alt=""
          className="absolute top-4 right-4 w-[52px] h-[52px] rounded-full object-cover shadow-sm"
        />
      )}
    </div>
  );
}

/** Вариант C: слайдер слева + две плашки справа (адаптив с md) */
export function HeroVariantC({
  slides,
  currentSlide,
  goToSlide,
}: HeroVariantCProps) {
  return (
    <section className="w-full pt-4" data-variant="C">
      {/* Desktop / tablet: grid */}
      <div
        className="hidden md:grid w-full min-h-[380px]"
        style={{
          gridTemplateColumns: `1fr ${HERO_THEME.rightColumnWidth}px`,
          gap: HERO_THEME.gridGap,
        }}
      >
        <HeroCSlider
          slides={slides}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
        />
        <div className="flex flex-col min-h-[380px]" style={{ gap: HERO_THEME.gridGap }}>
          <HeroDoctorCard />
          <HeroVrtCard />
        </div>
      </div>

      {/* Mobile: слайдер + горизонтальный скролл плашек */}
      <div className="flex md:hidden flex-col gap-3">
        <HeroCSlider
          slides={slides}
          currentSlide={currentSlide}
          goToSlide={goToSlide}
          className="min-h-[260px] h-[260px]"
        />
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-1 px-1">
          <HeroDoctorCard className="min-w-[260px] snap-center shrink-0 min-h-[200px]" />
          <HeroVrtCard className="min-w-[260px] snap-center shrink-0 min-h-[200px]" />
        </div>
      </div>
    </section>
  );
}
