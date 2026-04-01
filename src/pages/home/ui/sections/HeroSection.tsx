import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchHeroSlides } from '../../../../shared/api/contentApi';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';
import { useSlider } from '../../../../shared/hooks/useSlider';

export function HeroSection() {
  const { data: slides = [], isLoading } = useQuery({
    queryKey: ['heroSlides'],
    queryFn: fetchHeroSlides,
  });

  // Используем глобальный стор для варианта мобильного отображения
  const mobileVariant = useUISettingsStore(state => state.heroMobileVariant);

  const { currentSlide, nextSlide, prevSlide, goToSlide } = useSlider(slides.length, 9000);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const lastScrollUpdate = useRef(Date.now());

  // Синхронизация скролла с текущим слайдом (для автоплея и кликов по точкам)
  useEffect(() => {
    if (scrollContainerRef.current) {
      // If the slide changed due to user scroll recently, don't force scroll
      if (Date.now() - lastScrollUpdate.current < 100) return;

      const container = scrollContainerRef.current;
      const slideWidth = container.clientWidth;
      const targetScroll = currentSlide * slideWidth;
      
      if (Math.abs(container.scrollLeft - targetScroll) > 5) {
        isProgrammaticScroll.current = true;
        container.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500);
      }
    }
  }, [currentSlide]);

  if (isLoading || slides.length === 0) {
    return (
      <section className="relative rounded-3xl overflow-hidden mt-2 min-h-[480px] md:min-h-[500px] flex flex-col justify-center bg-gray-50 border border-gray-100 animate-pulse">
        {/* Skeleton loader */}
      </section>
    );
  }

  const slide = slides[currentSlide];

  // Обработчик скролла для мобильной версии (синхронизация точек с ручным свайпом)
  const handleScroll = () => {
    if (!scrollContainerRef.current || isProgrammaticScroll.current) return;
    
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollLeft;
    const slideWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / slideWidth);
    
    if (newIndex !== currentSlide && newIndex >= 0 && newIndex < slides.length) {
      lastScrollUpdate.current = Date.now();
      goToSlide(newIndex);
    }
  };

  return (
    <section className="relative group">
      {/* ========================================== */}
      {/* DESKTOP LAYOUT (Split Layout)              */}
      {/* ========================================== */}
      <div className="hidden lg:flex relative rounded-3xl overflow-hidden min-h-[500px] flex-col justify-center bg-white border border-gray-100 shadow-sm">
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

        <div className="relative z-10 w-full h-full flex items-center p-12 lg:p-16 gap-8 xl:gap-12">
          {/* Text Content */}
          <div className="w-[55%] flex flex-col justify-between pr-4 xl:pr-8 h-[400px]">
            <div className="relative w-full flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 w-fit ${slide.badgeColor}`}>
                    {slide.title}
                  </div>
                  <h2 
                    className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.1] tracking-tight break-words hyphens-auto"
                    lang="ru"
                  >
                    {slide.subtitle}
                  </h2>
                  <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
                    {slide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
                
            <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-2 shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide + '-btn'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={slide.link}
                    className="inline-flex items-center justify-center px-8 h-14 text-base font-bold text-white bg-brand-green rounded-full shadow-lg shadow-brand-green/30 hover:bg-brand-green/90 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 shrink-0"
                  >
                    {slide.linkText}
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Inline Navigation Controls - Aligned to the right */}
              <div className="flex items-center gap-5 px-6 h-14 bg-white/60 backdrop-blur-md rounded-full border border-gray-200/60 shadow-sm shrink-0">
                {/* Dots */}
                <div className="flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-brand-green' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                
                <div className="w-px h-5 bg-gray-300" />
                
                {/* Arrows */}
                <div className="flex items-center gap-1">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-brand-green hover:bg-white shadow-sm transition-all"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:text-brand-green hover:bg-white shadow-sm transition-all"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="w-[45%] h-[400px] relative shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: -20 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* MOBILE LAYOUT (A/B/C Variants)             */}
      {/* ========================================== */}
      <div className="flex lg:hidden relative w-full">
        <div 
          ref={scrollContainerRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          onScroll={handleScroll}
        >
          {slides.map((slideItem, index) => (
            <div key={index} className="w-full flex-shrink-0 snap-center relative">
              {mobileVariant === 'A' && (
                /* ВАРИАНТ А: Идеальный мобильный Hero (Full-bleed + Scrim) */
                <div className="relative w-full h-[calc(100dvh-130px)] min-h-[500px] max-h-[700px] rounded-3xl overflow-hidden shadow-sm">
                  <img 
                    src={slideItem.image} 
                    alt={slideItem.title} 
                    className="absolute inset-0 w-full h-full object-cover object-center" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />
                  
                  <div className="relative z-10 w-full h-full flex flex-col justify-end p-5 pb-20">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 w-fit ${slideItem.badgeColor}`}>
                      {slideItem.title}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                      {slideItem.subtitle}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed max-w-sm">
                      {slideItem.description}
                    </p>
                    <Link 
                      to={slideItem.link} 
                      className="inline-flex items-center justify-center px-6 py-4 text-sm font-bold text-white bg-brand-green rounded-full shadow-lg shadow-brand-green/30 active:scale-95 transition-transform w-full sm:w-auto"
                    >
                      {slideItem.linkText}
                    </Link>
                  </div>
                </div>
              )}

              {mobileVariant === 'B' && (
                /* ВАРИАНТ B: Старый вариант со светлым наложением (фиксированная высота) */
                <div className="relative w-full h-[520px] rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                  <img 
                    src={slideItem.image} 
                    alt={slideItem.title} 
                    className="absolute inset-0 w-full h-full object-cover object-top" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/10" />
                  
                  <div className="relative z-10 w-full h-full flex flex-col justify-end p-5 pb-10">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 w-fit ${slideItem.badgeColor}`}>
                      {slideItem.title}
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                      {slideItem.subtitle}
                    </h2>
                    <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                      {slideItem.description}
                    </p>
                    <Link 
                      to={slideItem.link} 
                      className="inline-flex items-center justify-center px-6 py-4 text-sm font-bold text-white bg-brand-green rounded-full shadow-lg shadow-brand-green/30 active:scale-95 transition-transform w-full"
                    >
                      {slideItem.linkText}
                    </Link>
                  </div>
                </div>
              )}

              {mobileVariant === 'C' && (
                /* ВАРИАНТ C: Старый вариант с компактной карточкой */
                <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col">
                  <div className="w-full h-[240px] relative shrink-0">
                    <img 
                      src={slideItem.image} 
                      alt={slideItem.title} 
                      className="w-full h-full object-cover object-center" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 pb-10 flex flex-col flex-1">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 w-fit ${slideItem.badgeColor}`}>
                      {slideItem.title}
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">
                      {slideItem.subtitle}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {slideItem.description}
                    </p>
                    <Link 
                      to={slideItem.link} 
                      className="inline-flex items-center justify-center px-6 py-4 text-sm font-bold text-white bg-brand-green rounded-full shadow-lg shadow-brand-green/30 active:scale-95 transition-transform w-full mt-auto"
                    >
                      {slideItem.linkText}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Dots */}
        <div className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 ${mobileVariant === 'A' ? 'bottom-8' : 'bottom-4'}`}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-brand-green' : 'w-1.5 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
