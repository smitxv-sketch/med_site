import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { useSlider } from '@/shared/hooks/useSlider';
import { Button } from '@/shared/ui/Button';
import { GhostTyping } from '@/shared/ui/GhostTyping';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useAnalytics } from '@/shared/infrastructure/analytics/AnalyticsService';

const slides = [
  {
    id: 1,
    title: 'Забота о вашем здоровье',
    subtitle: 'Многопрофильная клиника для всей семьи',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80',
    cta: 'Записаться на приём',
  },
  {
    id: 2,
    title: 'Современное оборудование',
    subtitle: 'Точная диагностика и эффективное лечение',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    cta: 'Узнать больше',
  },
  {
    id: 3,
    title: 'Опытные специалисты',
    subtitle: 'Врачи высшей категории с многолетним стажем',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
    cta: 'Наши врачи',
  },
];

export function HeroImmersive() {
  const { currentSlide, goToSlide } = useSlider(slides.length, 5000);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const lastScrollUpdate = useRef(Date.now());
  const { socialProofLevel } = useUISettingsStore();
  const analytics = useAnalytics();

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

  return (
    <section 
      data-marketing-block="true"
      data-variant="immersive"
      className="relative h-[100svh] overflow-hidden mt-[-7rem] md:mt-[-8rem] -mx-4 sm:-mx-6 lg:-mx-8 xl:mx-[calc(50%-50vw)] xl:w-[100vw]" 
    >
      {/* Slides Container */}
      <div 
        ref={scrollContainerRef}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide items-stretch"
        onScroll={handleScroll}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative min-w-full w-full min-h-full flex-shrink-0 snap-center flex flex-col"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
               
              />
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end px-6 pb-32 sm:pb-40 lg:pb-48 max-w-7xl mx-auto w-full z-10 pointer-events-none">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-2xl pointer-events-auto"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <div className="text-lg sm:text-xl text-white/90 mb-6 font-medium max-w-lg">
                  <GhostTyping text={slide.subtitle} startDelay={300} typingSpeed={30} highlightFirstWord={false} />
                </div>
                
                {socialProofLevel === 'aggressive' && (
                  <div className="flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-full border border-white/20">
                    <div className="flex -space-x-2">
                       <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=80" alt="avatar" />
                       <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" alt="avatar" />
                       <img className="w-6 h-6 rounded-full border-2 border-[#121212] object-cover" src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80" alt="avatar" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-white text-xs font-bold leading-none">4.9 из 5 на ПроДокторов</span>
                    </div>
                  </div>
                )}

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="group flex items-center gap-3 rounded-full"
                  onClick={() => analytics.trackEvent('appointment_started', { source: 'hero_immersive', slideId: slide.id })}
                >
                  {slide.cta}
                  <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Button>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-theme rounded-full ${
              currentSlide === index
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
