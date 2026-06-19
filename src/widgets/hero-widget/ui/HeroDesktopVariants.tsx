import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { usePromotionsRepository } from '@/shared/di/DIContext';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { GhostTyping } from '@/shared/ui/GhostTyping';
import { HeroSlide } from './HeroMobileVariants';
import { HeroSlideDots } from './HeroSlideDots';
import { HERO_THEME } from '../config/heroTheme';
import { formatDaysLeft, getDaysUntilExpiry } from '../lib/heroUtils';
import { HeroVariantC } from './HeroVariantC';

export interface HeroDesktopVariantProps {
  slides: HeroSlide[];
  currentSlide: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

// Variant A: Classic Split Layout (Current one)
export const HeroDesktopVariantA = ({ slides, currentSlide, goToSlide, nextSlide, prevSlide }: HeroDesktopVariantProps) => {
  const slide = slides[currentSlide];
  if (!slide) return null;

  return (
    <Card className="relative min-h-[460px] flex-col justify-center p-0 border-0 overflow-hidden w-full h-full flex">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 ${slide.bgLight} transition-colors duration-1000`}
        />
      </AnimatePresence>

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center p-8 lg:p-12 gap-8 xl:gap-16">
        {/* Text Content */}
        <div className="w-full lg:w-[50%] flex flex-col justify-between pr-4 min-h-[400px] h-full py-4">
          <div className="relative w-full flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-center py-4"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 w-fit ${slide.badgeColor}`}>
                  {slide.title}
                </div>
                <h2 
                  className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight"
                  lang="ru"
                >
                  <GhostTyping text={slide.subtitle} startDelay={100} typingSpeed={30} />
                </h2>
                <p className="text-gray-600 text-lg mb-4 max-w-xl leading-relaxed">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
              
          <div className="flex flex-wrap items-center gap-8 mt-2 shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide + '-btn'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  as={Link}
                  to={slide.link}
                  variant="primary"
                  size="lg"
                >
                  {slide.linkText}
                </Button>
              </motion.div>
            </AnimatePresence>

            {/* Inline Navigation Controls */}
            <div className="flex items-center gap-5 px-6 h-14 bg-white/60 backdrop-blur-md rounded-full border border-gray-200/60 shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-theme ${idx === currentSlide ? 'w-8 bg-brand' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="w-px h-5 bg-gray-300" />
              <div className="flex items-center gap-1">
                <button 
                  onClick={prevSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-brand hover:bg-white shadow-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-brand hover:bg-white shadow-sm transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-[50%] min-h-[400px] h-full relative shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden shadow-2xl"
              style={{ borderRadius: 'var(--app-radius)' }}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

export const HeroDesktopVariantB = ({ slides, currentSlide, goToSlide, nextSlide, prevSlide }: HeroDesktopVariantProps) => {
  const slide = slides[currentSlide];
  if (!slide) return null;

  return (
    <Card className="relative w-full min-h-[460px] lg:min-h-[540px] flex flex-col items-center justify-center text-center overflow-hidden p-0 rounded-[var(--app-radius)] border-0">
      <AnimatePresence mode="wait">
        <motion.div
           key={currentSlide}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.8 }}
           className="absolute inset-0 z-0 h-full w-full"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center p-8 pt-16 pb-28 max-w-4xl w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 w-fit bg-white text-gray-900 shadow-sm border-none">
              {slide.title}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-md">
              <GhostTyping text={slide.subtitle} startDelay={100} typingSpeed={30} />
            </h2>
            <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed drop-shadow-sm text-balance">
              {slide.description}
            </p>
            <Button as={Link} to={slide.link} className="bg-white text-black hover:bg-gray-100 shadow-xl transition-all font-semibold rounded-full px-10 py-6 text-lg">
              {slide.linkText}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-lg">
         <button onClick={prevSlide} className="text-white/80 hover:text-white transition-colors p-1"><ChevronLeft className="w-5 h-5"/></button>
         <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-theme ${idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
         <button onClick={nextSlide} className="text-white/80 hover:text-white transition-colors p-1"><ChevronRight className="w-5 h-5"/></button>
      </div>
    </Card>
  );
};

// Variant C — см. HeroVariantC.tsx
export { HeroVariantC as HeroDesktopVariantC } from './HeroVariantC';

export const HeroDesktopVariantD = ({
  slides,
  currentSlide,
  goToSlide,
  pause,
  resume,
}: HeroDesktopVariantProps & {
  pause?: () => void;
  resume?: () => void;
}) => {
  const slide = slides[currentSlide];
  const promotionsRepository = usePromotionsRepository();
  const { data: promotions = [] } = useQuery({
    queryKey: ['heroPromotions'],
    queryFn: () => promotionsRepository.getPromotions(),
  });

  if (!slide) return null;

  const linkedPromo = slide.promoId
    ? promotions.find((p) => p.id === slide.promoId) ?? null
    : null;
  const daysLeft = linkedPromo
    ? getDaysUntilExpiry(linkedPromo.endDate)
    : null;

  const direction = slide.direction ?? 'clinic';
  const badgeBg = HERO_THEME.directionBadge[direction];
  const badgeLabel = HERO_THEME.directionBadgeLabel[direction];
  const ctaTextColor =
    direction === 'vrt'
      ? HERO_THEME.brandViolet
      : direction === 'cosmo'
        ? HERO_THEME.brandCosmo
        : HERO_THEME.brandGreen;

  const hasSecondary = Boolean(slide.ctaSecondaryText?.trim());

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl group"
      style={{ borderRadius: HERO_THEME.borderRadius }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: HERO_THEME.slideFadeMs / 1000, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: HERO_THEME.fullscreenGradient }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Бейдж направления — только desktop */}
        <div
          className="hidden md:block absolute top-5 right-5 z-20 text-white text-[11px] font-medium tracking-[0.08em] uppercase px-3.5 py-1.5 rounded-[20px]"
          style={{ backgroundColor: badgeBg }}
        >
          {badgeLabel}
        </div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 md:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`d-content-${currentSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="max-w-[600px]"
            >
              <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/70 mb-3">
                {slide.title}
              </p>
              <h2 className="text-[22px] md:text-[30px] lg:text-[36px] font-medium text-white leading-[1.2] mb-3 max-w-[600px]">
                {slide.subtitle}
              </h2>
              <p className="text-[15px] text-white/[0.82] leading-relaxed max-w-[500px] mb-7">
                {slide.description}
              </p>

              <div
                className={cn(
                  'flex gap-3',
                  hasSecondary
                    ? 'flex-col sm:flex-row items-stretch sm:items-center'
                    : 'justify-start'
                )}
              >
                <Link
                  to={slide.link}
                  className="inline-flex items-center justify-center rounded-[30px] px-6 py-[11px] text-sm font-medium bg-white transition-colors hover:bg-gray-100"
                  style={{ color: ctaTextColor }}
                >
                  {slide.linkText}
                </Link>
                {hasSecondary && slide.ctaSecondaryUrl && (
                  <Link
                    to={slide.ctaSecondaryUrl}
                    className="inline-flex items-center justify-center rounded-[30px] px-6 py-[11px] text-sm text-white border border-white/60 hover:bg-white/10 transition-colors"
                  >
                    {slide.ctaSecondaryText}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6 md:mt-8">
            <HeroSlideDots
              count={slides.length}
              current={currentSlide}
              onSelect={goToSlide}
              variant="light"
            />
            {linkedPromo && daysLeft !== null && (
              <span className="text-xs text-white/70 hidden sm:block">
                {formatDaysLeft(daysLeft)} до конца акции
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const DesktopHeroRegistry: Record<string, React.FC<HeroDesktopVariantProps>> = {
  A: HeroDesktopVariantA,
  B: HeroDesktopVariantB,
  C: HeroVariantC as React.FC<HeroDesktopVariantProps>,
  D: HeroDesktopVariantD,
};
