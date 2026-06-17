import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, PhoneCall, Calendar } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { GhostTyping } from '@/shared/ui/GhostTyping';
import { HeroSlide } from './HeroMobileVariants';

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

// Variant C: Competitor Inspiration (Left Slider + Right Action & Promos)
export const HeroDesktopVariantC = ({ slides, currentSlide, goToSlide, nextSlide, prevSlide }: HeroDesktopVariantProps) => {
  const slide = slides[currentSlide];
  if (!slide) return null;

  return (
    <div className="w-full relative flex gap-6 lg:gap-8 h-[460px]">
      {/* Left side - Slider taking about 60% */}
      <Card className="flex-1 overflow-hidden relative p-0 border-0 bg-transparent flex flex-col h-full rounded-[var(--app-radius)] shadow-none">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 ${slide.bgLight} transition-colors duration-1000 z-0 h-full w-full`}
          />
        </AnimatePresence>

        <div className="absolute inset-0 z-0 h-full w-full opacity-60">
            <img src={slide.image} alt="" className="w-full h-full object-cover mix-blend-multiply" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />

        <div className="relative z-20 flex flex-col h-full p-8 lg:p-10 justify-center w-2/3">
           <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full justify-center"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase w-fit mb-4 bg-white/70 text-gray-900 border border-gray-200/50`}>
                    {slide.title}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight max-w-[400px]">
                    <GhostTyping text={slide.subtitle} startDelay={100} typingSpeed={30} />
                  </h2>
                  <div className="mt-auto flex items-center gap-4">
                     <Button as={Link} to={slide.link} variant="primary">
                       {slide.linkText}
                     </Button>
                  </div>
                </motion.div>
           </AnimatePresence>
        </div>

        {/* Minimal Navigation */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm border border-gray-200/50">
             <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-theme ${idx === currentSlide ? 'w-6 bg-brand' : 'w-1.5 bg-gray-400 hover:bg-gray-500'}`}
                  />
                ))}
              </div>
        </div>
      </Card>

      {/* Right side - 40% - Grid of small banners / actions */}
      <div className="w-[340px] xl:w-[400px] shrink-0 flex flex-col gap-4 h-full">
         <Card className="flex flex-col p-6 shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 leading-tight pr-4">Знакомство <br/>с доктором</h3>
             <p className="text-gray-500 text-sm mb-4">Скидка 30%</p>
             <div className="mt-auto">
               <Button as={Link} to="/doctors" variant="primary" size="sm" className="w-fit relative z-20 shadow-md">
                 Выбрать врача
               </Button>
             </div>
             {/* Decorative image placeholder */}
             <div className="absolute top-4 right-4 w-24 h-24  opacity-80 mix-blend-multiply flex items-end">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" className="object-cover rounded-full w-20 h-20 shadow-sm" alt=""/>
             </div>
         </Card>
         
         <Card className="flex flex-col p-6 shadow-sm border border-gray-100 flex-1 hover:shadow-md transition-shadow relative overflow-hidden bg-brand/5">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand/10 z-0"></div>
             <div className="relative z-10 flex flex-col h-full">
               <h3 className="font-bold text-lg mb-2 leading-tight">Подарки <br/>для любимых</h3>
               <p className="text-gray-600 font-medium text-sm mb-4 bg-white/80 backdrop-blur px-2 py-1 rounded w-fit">Сертификаты на услуги клиники</p>
               <div className="mt-auto">
                 <Button as={Link} to="/services" variant="outline" size="sm" className="w-fit bg-white border-brand text-brand hover:bg-brand/10">
                   Подробности
                 </Button>
               </div>
             </div>
             
             {/* Decorative graphic */}
             <div className="absolute -bottom-4 -right-4 w-32 h-32 opacity-90 z-0">
               <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150" alt="" className="object-cover rounded-tl-[64px] rounded-br-[var(--app-radius)] w-full h-full shadow-lg"/>
             </div>
         </Card>
      </div>
    </div>
  );
};

export const HeroDesktopVariantD = ({ slides, currentSlide, goToSlide, nextSlide, prevSlide }: HeroDesktopVariantProps) => {
  const slide = slides[currentSlide];
  if (!slide) return null;

  return (
    <div className="relative h-[100svh] overflow-hidden w-full group -mt-[5rem] sm:-mt-[6rem] lg:-mt-[8rem] -mx-4 sm:-mx-6 lg:-mx-8 xl:mx-[calc(50%-50vw)] xl:w-[100vw]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col justify-end px-8 pb-32 sm:pb-40 lg:pb-48 max-w-7xl mx-auto w-full z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl pointer-events-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 font-medium max-w-2xl text-balance drop-shadow">
              {slide.subtitle}
            </p>

            <Button 
              as={Link}
              to={slide.link}
              variant="primary" 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 shadow-xl transition-all font-semibold rounded-full px-8 h-14"
            >
              {slide.linkText}
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-10 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-8 right-8 z-20 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto transition-colors">
            <ChevronLeft className="w-6 h-6" />
         </button>
         <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto transition-colors">
            <ChevronRight className="w-6 h-6" />
         </button>
      </div>
    </div>
  );
};

export const DesktopHeroRegistry: Record<string, React.FC<HeroDesktopVariantProps>> = {
  A: HeroDesktopVariantA,
  B: HeroDesktopVariantB,
  C: HeroDesktopVariantC,
  D: HeroDesktopVariantD,
};
