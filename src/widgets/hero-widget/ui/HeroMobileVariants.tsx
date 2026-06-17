import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { GhostTyping } from '@/shared/ui/GhostTyping';

// Define the interface for a Slide (matching what is returned from fetchHeroSlides)
export interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
  linkText: string;
  link: string;
  image: string;
  badgeColor: string;
  bgLight: string;
}

export interface HeroMobileVariantProps {
  slide: HeroSlide;
}

export const HeroMobileVariantA = ({ slide }: HeroMobileVariantProps) => (
  <Card className="flex-1 w-full overflow-hidden p-0 relative shadow-sm border-0 flex flex-col h-full aspect-[2/1] min-h-[160px] max-h-[180px]" style={{ borderRadius: 'var(--app-radius)' }}>
     <div className="absolute inset-0 z-0 opacity-80 h-[100%]">
        <img src={slide.image} alt="" className="w-full h-full object-cover object-center mix-blend-multiply" />
     </div>
     <div className={`absolute inset-0 z-0 bg-gradient-to-tr from-white via-white/80 to-transparent`} />
     
     <div className="relative z-10 flex flex-col p-4 h-full">
        <h3 className="text-xl sm:text-2xl font-bold leading-tight mb-2 max-w-[200px] text-gray-900 drop-shadow-sm">
           <GhostTyping text={slide.subtitle} startDelay={100} typingSpeed={30} />
        </h3>
        <div className="mt-auto z-20 w-fit">
           <Button as={Link} to={slide.link} variant="primary" size="sm" className="rounded-full shadow-lg h-9 px-4 text-xs font-semibold">
              Читать
           </Button>
        </div>
     </div>
  </Card>
);

export const HeroMobileVariantB = ({ slide }: HeroMobileVariantProps) => (
  <Card className="relative w-full flex flex-col p-0 overflow-hidden h-full">
    <div className="w-full relative shrink-0 aspect-[4/3]">
      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" />
    </div>
    <div className="p-5 pb-12 flex flex-col flex-1 bg-white">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 w-fit ${slide.badgeColor}`}>
        {slide.title}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-[1.15] tracking-tight">
        <GhostTyping text={slide.subtitle} startDelay={300} typingSpeed={30} />
      </h2>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
        {slide.description}
      </p>
      <div className="mt-auto">
        <Button as={Link} to={slide.link} variant="primary" size="md" fullWidth>
          {slide.linkText}
        </Button>
      </div>
    </div>
  </Card>
);

export const HeroMobileVariantC = ({ slide }: HeroMobileVariantProps) => (
  <div className="relative w-full min-h-[440px] sm:min-h-[480px] overflow-hidden flex flex-col h-full bg-white" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)', border: 'var(--app-border)' }}>
    <div className="absolute inset-0 z-0 h-[60%] shrink-0">
      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-top" />
    </div>
    <div className="relative z-10 flex-1 flex flex-col mt-[45%]">
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      <div className="flex flex-col relative z-20 bg-white px-4 pb-8 sm:px-5 sm:pb-10 pt-4 flex-1">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 w-fit ${slide.badgeColor}`}>
          {slide.title}
        </div>
        <div className="mb-2 flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 leading-[1.10]">
            <GhostTyping text={slide.subtitle} startDelay={300} typingSpeed={30} />
          </h2>
        </div>
        <p className="text-gray-700 text-sm mb-6 leading-snug line-clamp-3">
          {slide.description}
        </p>
        <Button as={Link} to={slide.link} variant="primary" size="md" className="w-full sm:w-auto mt-auto shrink-0 shadow-xl relative z-20">
          {slide.linkText}
        </Button>
      </div>
    </div>
  </div>
);

export const HeroMobileVariantE = ({ slide }: HeroMobileVariantProps) => (
  <div className="relative w-full h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden pb-[100px] pt-[80px]">
    <div className="absolute inset-0 z-0">
      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-0" />
    
    <div className="relative z-10 w-full px-5 flex flex-col items-center justify-center h-full select-none cursor-default max-w-[400px]">
      <div className="flex-1" />
      <div className="flex flex-col items-center mt-auto w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase mb-2 w-fit bg-white text-gray-900 shadow-sm border-none">
          {slide.title}
        </div>
        <h2 className="text-[26px] leading-[1.1] min-[400px]:text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-3 tracking-tight drop-shadow-md">
          <GhostTyping text={slide.subtitle} startDelay={300} typingSpeed={30} />
        </h2>
        <p className="text-white/90 text-xs sm:text-[13px] max-w-[280px] leading-snug drop-shadow-sm mb-4 sm:mb-6 text-balance line-clamp-3">
          {slide.description}
        </p>
      </div>
      
      <Button as={Link} to={slide.link} className="bg-white text-black hover:bg-gray-100 shadow-xl transition-all font-semibold rounded-full px-6 py-3.5 shrink-0 w-full min-h-[48px] text-[15px] mt-2 mb-2">
        {slide.linkText}
      </Button>
    </div>
    
    {/* Optional: Swipe indicator at bottom */}
    <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center animate-pulse z-10 hidden sm:flex">
      <span className="text-[10px] uppercase tracking-widest font-bold mb-1">Свайп</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 19-7-7 7-7"/><path d="m19 19-7-7 7-7"/>
      </svg>
    </div>
  </div>
);

// --- The Registry --- //
export const MobileHeroRegistry: Record<string, React.FC<HeroMobileVariantProps & { slides?: HeroSlide[] }>> = {
  A: HeroMobileVariantA,
  B: HeroMobileVariantB,
  C: HeroMobileVariantC,
  E: HeroMobileVariantE,
};
