import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView, animate } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchPromotions } from '../../../../shared/api/contentApi';
import { formatTypography } from '../../../../widget/utils/formatters';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';
import { VariantSwitcher } from '../../../../shared/ui/VariantSwitcher';
import { ArrowRight } from 'lucide-react';

const CORPORATE_COLORS = [
  { bg: 'bg-brand-green', text: 'text-brand-green' },
  { bg: 'bg-brand-orange', text: 'text-brand-orange' },
  { bg: 'bg-brand-violet', text: 'text-brand-violet' },
  { bg: 'bg-brand-blue', text: 'text-brand-blue' },
  { bg: 'bg-brand-turquoise', text: 'text-brand-turquoise' }
];

function getDaysWord(days: number) {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'дней';
  if (lastDigit === 1) return 'день';
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
  return 'дней';
}

// --- VARIANT A (Current Compact List) ---
function PromoCardA({ promo, index, isLast }: { promo: any, index: number, isLast: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  const today = new Date();
  const startDate = new Date(promo.startDate);
  const endDate = new Date(promo.endDate);
  const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  const [displayDays, setDisplayDays] = useState(totalDays);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isInView) {
      const controlsDays = animate(totalDays, daysLeft, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setDisplayDays(Math.round(value))
      });
      
      const targetProgress = (daysLeft / totalDays) * 100;
      const controlsProgress = animate(100, targetProgress, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setProgress(value)
      });

      return () => {
        controlsDays.stop();
        controlsProgress.stop();
      };
    }
  }, [isInView, totalDays, daysLeft]);

  const colorTheme = CORPORATE_COLORS[index % CORPORATE_COLORS.length];
  const textColorClass = colorTheme.text;
  const progressBgClass = colorTheme.bg;

  return (
    <React.Fragment>
      <Link 
        ref={ref}
        to={`/promotions/${promo.id}`} 
        className="group flex-1 flex flex-col justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors relative h-full"
      >
        <div className="flex-1 mb-4 flex flex-col">
          {/* Desktop Image */}
          <div className="hidden md:block w-full h-32 lg:h-40 rounded-2xl overflow-hidden mb-4 relative bg-gray-100">
            <img 
              src={promo.image} 
              alt={promo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug">
            {formatTypography(promo.title)}
          </h3>
        </div>
        
        <div className="shrink-0 flex flex-col gap-2.5 w-full mt-auto">
          <div className="flex items-end justify-between">
            <div className={`flex items-center gap-2 ${textColorClass}`}>
              <span className="text-3xl font-black tracking-tighter leading-none">{displayDays}</span>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-0.5">Осталось</span>
                <span className="text-sm font-medium opacity-80 leading-none">{getDaysWord(displayDays)}</span>
              </div>
            </div>
          </div>
          
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${progressBgClass}`} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Link>
      {!isLast && (
        <>
          <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent my-4" />
          <div className="md:hidden h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-4" />
        </>
      )}
    </React.Fragment>
  );
}

function PromotionsVariantA({ promotions }: { promotions: any[] }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden flex flex-col md:flex-row pl-2">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-teal-400 via-purple-400 to-orange-400" />
      {promotions.map((promo, index) => (
        <PromoCardA 
          key={promo.id} 
          promo={promo} 
          index={index}
          isLast={index === promotions.length - 1}
        />
      ))}
    </div>
  );
}

// --- VARIANT B (Carousel with Images) ---
function PromotionsVariantB({ promotions }: { promotions: any[] }) {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
      {promotions.map((promo, index) => {
        const today = new Date();
        const endDate = new Date(promo.endDate);
        const daysLeft = Math.max(0, Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        const colorTheme = CORPORATE_COLORS[index % CORPORATE_COLORS.length];

        return (
          <Link
            key={promo.id}
            to={`/promotions/${promo.id}`}
            className="shrink-0 w-[280px] sm:w-[320px] snap-start bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group"
          >
            <div className="h-40 w-full relative overflow-hidden bg-gray-100">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className={`text-lg font-black leading-none ${colorTheme.text}`}>{daysLeft}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-none">
                  {getDaysWord(daysLeft)}
                </span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors leading-snug mb-3">
                {formatTypography(promo.title)}
              </h3>
              <div className="mt-auto flex items-center text-sm font-medium text-gray-400 group-hover:text-brand-green transition-colors">
                Подробнее <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// --- VARIANT C (Premium / Clean Utility) ---
function PromotionsVariantC({ promotions }: { promotions: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {promotions.map((promo, index) => {
        const today = new Date();
        const endDate = new Date(promo.endDate);
        const daysLeft = Math.max(0, Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        const colorTheme = CORPORATE_COLORS[index % CORPORATE_COLORS.length];

        return (
          <Link
            key={promo.id}
            to={`/promotions/${promo.id}`}
            className="group relative bg-white rounded-[2rem] flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 border border-gray-100/80 overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative h-52 sm:h-60 overflow-hidden bg-gray-50 shrink-0">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              
              {/* Tag */}
              <div className="absolute top-5 left-5">
                <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest ${colorTheme.bg} text-white shadow-md`}>
                  Акция
                </div>
              </div>
            </div>

            {/* Floating Days Left Badge */}
            <div className="absolute top-52 sm:top-60 right-6 transform -translate-y-1/2 z-10">
              <div className={`w-16 h-16 rounded-2xl bg-white shadow-[0_8px_20px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center border border-gray-50 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500`}>
                <span className={`text-2xl font-black leading-none ${colorTheme.text}`}>{daysLeft}</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">{getDaysWord(daysLeft)}</span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 pt-10 flex flex-col flex-1 bg-white relative z-0">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-4 group-hover:text-brand-green transition-colors line-clamp-3">
                {formatTypography(promo.title)}
              </h3>
              
              <div className="mt-auto flex items-center justify-between pt-6">
                <span className={`text-sm font-bold ${colorTheme.text} uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all`}>
                  Подробнее 
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            
            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${colorTheme.bg} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
          </Link>
        );
      })}
    </div>
  );
}

export function PromotionsSection() {
  const { data: promotions = [], isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromotions,
  });
  
  const { promotionsSectionVariant, setPromotionsSectionVariant } = useUISettingsStore();

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Акции</h2>
        </div>
        <div className="bg-gray-100 rounded-3xl h-64 animate-pulse" />
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Акции</h2>
          <VariantSwitcher 
            currentVariant={promotionsSectionVariant} 
            onChange={setPromotionsSectionVariant} 
            variants={['A', 'B', 'C'] as const}
            mode="cycle"
            className="md:hidden w-8 h-8 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 uppercase"
          />
          <VariantSwitcher 
            currentVariant={promotionsSectionVariant} 
            onChange={setPromotionsSectionVariant} 
            variants={['A', 'B', 'C'] as const}
            mode="pill"
            className="hidden md:flex"
          />
        </div>
        <Link to="/promotions" className="text-brand-green font-medium hover:underline">
          Показать все
        </Link>
      </div>
      
      {promotionsSectionVariant === 'A' && <PromotionsVariantA promotions={promotions} />}
      {promotionsSectionVariant === 'B' && <PromotionsVariantB promotions={promotions} />}
      {promotionsSectionVariant === 'C' && <PromotionsVariantC promotions={promotions} />}
    </section>
  );
}
