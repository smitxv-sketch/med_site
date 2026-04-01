import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSlider } from '../../../../shared/hooks/useSlider';

const slides = [
  {
    id: 1,
    title: 'Забота о вашем здоровье',
    subtitle: 'Многопрофильная клиника для всей семьи',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    cta: 'Записаться на прием',
  },
  {
    id: 2,
    title: 'Современное оборудование',
    subtitle: 'Точная диагностика и эффективное лечение',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80',
    cta: 'Узнать больше',
  },
  {
    id: 3,
    title: 'Опытные специалисты',
    subtitle: 'Врачи высшей категории с многолетним стажем',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
    cta: 'Наши врачи',
  },
];

export function HeroImmersive() {
  const { currentSlide, goToSlide } = useSlider(slides.length, 5000);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const lastScrollUpdate = useRef(Date.now());

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
      className="relative h-[100dvh] overflow-hidden mt-[-7rem]" 
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}
    >
      {/* Slides Container */}
      <div 
        ref={scrollContainerRef}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        onScroll={handleScroll}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex-shrink-0 snap-center"
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Dark Gradient Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end px-6 pb-32 sm:pb-40 lg:pb-48 max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 font-medium max-w-lg">
                  {slide.subtitle}
                </p>
                
                <button className="group flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-green/90 transition-all active:scale-95 shadow-lg shadow-brand-green/30">
                  {slide.cta}
                  <div className="bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </button>
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
            className={`transition-all duration-300 rounded-full ${
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
