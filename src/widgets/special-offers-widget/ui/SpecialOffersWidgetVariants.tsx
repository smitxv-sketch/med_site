import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Percent, ArrowRight, Calendar } from 'lucide-react';
import { formatTypography } from '@/widget/utils/formatters';
import { useAnalytics } from '@/shared/infrastructure/analytics/AnalyticsService';
import { Card } from '@/shared/ui/Card';
import { cn } from '@/lib/utils';
import { SpecialOffer } from '@/shared/infrastructure/storage/SpecialOffersRepository';

// ========= COMMONS =========

function getBackgroundGradients(index: number) {
  const gradients = [
    'from-brand-blue/90 to-cyan-600/90',
    'from-brand-orange/90 to-orange-600/90',
    'from-brand/90 to-brand-turquoise/90',
    'from-brand-violet/90 to-purple-600/90',
  ];
  return gradients[index % gradients.length];
}

// ========= DESKTOP VARIANTS =========

// Desktop A: Classic (Original)
export function DesktopClassic({ offers }: { offers: SpecialOffer[] }) {
  const analytics = useAnalytics();
  return (
    <Card className="relative flex flex-col md:flex-row pl-1.5 min-h-[160px]">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-brand to-transparent z-10" />
      {offers.map((offer, index) => {
        const isLast = index === offers.length - 1;
        return (
          <React.Fragment key={offer.id}>
            <Link 
              to={`/special-offers`} 
              className="group flex-1 flex flex-col justify-between p-5 hover:bg-gray-50 transition-colors relative"
              onClick={() => analytics.trackEvent('special_offer_clicked', { offerId: offer.id, variant: 'desktop_classic' })}
            >
              <div className="flex-1 mb-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand transition-colors leading-tight">
                  {formatTypography(offer.title)}
                </h3>
              </div>
              <div className="shrink-0 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-brand shrink-0" />
                  <span className="truncate">До <span className="text-gray-900 group-hover:text-brand transition-colors">{offer.validUntil}</span></span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand/5 flex items-center justify-center group-hover:bg-brand group-hover:text-white text-brand transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
            {!isLast && (
              <div className="w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent my-4 shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </Card>
  );
}

// Desktop B: Bento Grid
export function DesktopBento({ offers }: { offers: SpecialOffer[] }) {
  const analytics = useAnalytics();
  
  if (offers.length === 0) return null;
  
  // Custom layout for up to 4 items in Bento style
  return (
    <div className="grid grid-cols-3 gap-4 auto-rows-[220px]">
      {offers.map((offer, index) => {
        // Bento sizing logic: 
        // 1st is large (2 cols, 2 rows) if there's a lot, else varying.
        // For 4 items:
        // Item 0: col-span-2 row-span-2
        // Item 1: col-span-1 row-span-1
        // Item 2: col-span-1 row-span-1
        // Item 3: col-span-1 row-span-1 (wait, 3 cols * 2 rows = 6 cells. 2x2 = 4 cells + 2 * 1 cell = 6! Perfect for 3 items...)
        // Actually for 4 items:
        // col-span-2 row-span-1, col-span-1 row-span-1
        // col-span-1 row-span-1, col-span-2 row-span-1
        const isWide = index === 0 || index === 3;
        
        return (
          <Link
            key={offer.id}
            to={`/special-offers`}
            onClick={() => analytics.trackEvent('special_offer_clicked', { offerId: offer.id, variant: 'desktop_bento' })}
            className={cn(
              "group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-900 flex flex-col justify-end p-6",
              isWide ? "col-span-2" : "col-span-1"
            )}
          >
            {offer.image ? (
              <>
                <img 
                  src={offer.image} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-black/0" />
              </>
            ) : (
              <div className={cn("absolute inset-0 opacity-90", getBackgroundGradients(index))} />
            )}
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Percent className="w-5 h-5" />
                  </div>
              </div>
              <div className="mt-8">
                <h3 className={cn("font-bold text-white mb-2 md:mb-3 leading-tight", isWide ? "text-2xl md:text-3xl line-clamp-3" : "text-xl line-clamp-4")}>
                  {formatTypography(offer.title)}
                </h3>
                {/* Visual intent: intentionally hiding "Valid until" on immersive grid, leaving it for actual page */}
                <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                  <span>Подробнее</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// Desktop C: Carousel / Marquee (Horizontal cards)
export function DesktopCarousel({ offers }: { offers: SpecialOffer[] }) {
  const analytics = useAnalytics();
  return (
    <div className="grid grid-cols-4 gap-4">
       {offers.map((offer, index) => (
         <Link
            key={offer.id}
            to={`/special-offers`}
            onClick={() => analytics.trackEvent('special_offer_clicked', { offerId: offer.id, variant: 'desktop_carousel' })}
            className="group relative h-[300px] rounded-2xl overflow-hidden bg-gray-100 flex flex-col block"
          >
            {offer.image ? (
               <div className="h-[140px] relative overflow-hidden shrink-0">
                  <img src={offer.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               </div>
            ) : (
               <div className={cn("h-[140px] shrink-0", "bg-gradient-to-br " + getBackgroundGradients(index))} />
            )}
            <div className="p-5 flex flex-col flex-1 bg-white border border-t-0 border-gray-100 rounded-b-2xl">
                <h3 className="font-bold text-gray-900 line-clamp-3 leading-tight text-lg mb-2 group-hover:text-brand transition-colors">
                  {formatTypography(offer.title)}
                </h3>
                <div className="mt-auto flex items-center justify-between text-brand text-sm font-medium">
                  <span>Смотреть акцию</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
          </Link>
       ))}
    </div>
  )
}

// ========= MOBILE VARIANTS =========

// Mobile A: Classic (Original vertical stack)
export function MobileClassic({ offers }: { offers: SpecialOffer[] }) {
  const analytics = useAnalytics();
  return (
    <Card className="relative flex flex-col pl-1.5">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-brand to-transparent z-10" />
      {offers.map((offer, index) => {
        const isLast = index === offers.length - 1;
        return (
          <React.Fragment key={offer.id}>
            <Link 
              to={`/special-offers`} 
              className="group flex-1 flex flex-col p-4 active:bg-gray-50 transition-colors relative"
              onClick={() => analytics.trackEvent('special_offer_clicked', { offerId: offer.id, variant: 'mobile_classic' })}
            >
              <h3 className="text-base font-bold text-gray-900 mb-3 leading-tight">
                {formatTypography(offer.title)}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-brand shrink-0" />
                  <span className="truncate">До <span className="text-gray-900 font-medium">{offer.validUntil}</span></span>
                </div>
                <div className="w-7 h-7 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
            {!isLast && (
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4 shrink-0" />
            )}
          </React.Fragment>
        );
      })}
    </Card>
  );
}

// Mobile B: Compact (All fit on one screen ideally)
export function MobileCompact({ offers }: { offers: SpecialOffer[] }) {
  const analytics = useAnalytics();
  return (
    <div className="grid grid-cols-2 gap-2">
      {offers.map((offer, index) => (
        <Link
          key={offer.id}
          to={`/special-offers`}
          onClick={() => analytics.trackEvent('special_offer_clicked', { offerId: offer.id, variant: 'mobile_compact' })}
          className="group relative rounded-xl overflow-hidden aspect-[4/5] flex flex-col justify-end p-3 active:scale-[0.98] transition-transform"
        >
           {offer.image ? (
              <>
                <img 
                  src={offer.image} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-black/0" />
              </>
            ) : (
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", getBackgroundGradients(index))} />
            )}
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mt-auto">
                <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                    <Percent className="w-3 h-3" />
                </div>
                <h3 className="font-bold text-white text-xs sm:text-sm line-clamp-3 leading-tight mb-1">
                  {formatTypography(offer.title)}
                </h3>
              </div>
            </div>
        </Link>
      ))}
    </div>
  );
}

// Mobile C: Auto-scroll Snap (Horizontal carousel)
export function MobileAutoScroll({ offers }: { offers: SpecialOffer[] }) {
  const analytics = useAnalytics();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Implementation of auto-scroll mechanic on mobile
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let intervalId: NodeJS.Timeout;
    let isTouching = false;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!el || isTouching) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' });
        }
      }, 3000); // 3 seconds per slide switch
    };

    const stopScroll = () => {
      clearInterval(intervalId);
    };

    // Intersection observer to only scroll when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startScroll();
      } else {
        stopScroll();
      }
    }, { threshold: 0.5 });

    observer.observe(el);

    const handleTouchStart = () => { isTouching = true; };
    const handleTouchEnd = () => { isTouching = false; };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      stopScroll();
      if (el) {
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 -mx-4 px-4 pb-4 pt-1" 
    >
       {offers.map((offer, index) => (
         <Link
            key={offer.id}
            to={`/special-offers`}
            onClick={() => analytics.trackEvent('special_offer_clicked', { offerId: offer.id, variant: 'mobile_autoscroll' })}
            className="relative shrink-0 w-[85vw] snap-center rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 flex flex-col h-[280px]"
          >
            {offer.image ? (
               <div className="h-[140px] relative overflow-hidden shrink-0">
                  <img src={offer.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
               </div>
            ) : (
               <div className={cn("h-[140px] shrink-0", "bg-gradient-to-br " + getBackgroundGradients(index))} />
            )}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 line-clamp-3 leading-tight text-base mb-2">
                  {formatTypography(offer.title)}
                </h3>
                <div className="flex items-center justify-between text-brand text-sm font-medium mt-auto">
                  <span>Смотреть акцию</span>
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
            </div>
          </Link>
       ))}
    </div>
  )
}
