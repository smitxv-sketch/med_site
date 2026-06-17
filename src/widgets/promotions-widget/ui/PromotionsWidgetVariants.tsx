import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { formatTypography } from "@/widget/utils/formatters";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { SERVICES_DATA } from "@/shared/constants/servicesData";
import { useAnalytics } from "@/shared/infrastructure/analytics/AnalyticsService";

export const CORPORATE_COLORS = [
  { bg: "bg-brand", text: "text-brand" },
  { bg: "bg-brand-orange", text: "text-brand-orange" },
  { bg: "bg-brand-violet", text: "text-brand-violet" },
  { bg: "bg-brand-blue", text: "text-brand-blue" },
  { bg: "bg-brand-turquoise", text: "text-brand-turquoise" },
];

export function getThemeForDirection(
  directionId?: string,
  fallbackIndex: number = 0,
) {
  if (directionId) {
    const direction = SERVICES_DATA.find((d) => d.id === directionId);
    if (direction) {
      return {
        bg: direction.iconBgSolid || direction.accentBg || "bg-brand",
        text: direction.iconColor || direction.textColor || "text-brand",
      };
    }
  }
  return CORPORATE_COLORS[fallbackIndex % CORPORATE_COLORS.length];
}

export function getDaysWord(days: number) {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return "дней";
  if (lastDigit === 1) return "день";
  if (lastDigit >= 2 && lastDigit <= 4) return "дня";
  return "дней";
}

export interface PromotionsVariantProps {
  promotions: any[];
}

function PromoCardA({
  promo,
  index,
  isLast,
}: {
  promo: any;
  index: number;
  isLast: boolean;
}) {
  const statsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(statsRef, {
    once: true,
    margin: "0px 0px -40px 0px",
    amount: 0.8,
  });

  const today = new Date();
  const startDate = new Date(promo.startDate);
  const endDate = new Date(promo.endDate);
  const totalDaysRaw = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalDays = Math.max(1, totalDaysRaw);
  const daysLeft = Math.max(
    0,
    Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const [displayDays, setDisplayDays] = useState(totalDays);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isInView) {
      const controlsDays = animate(totalDays, daysLeft, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setDisplayDays(Math.round(value)),
      });

      const targetProgress = Math.min(100, (daysLeft / totalDays) * 100);
      const controlsProgress = animate(100, targetProgress, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setProgress(value),
      });

      return () => {
        controlsDays.stop();
        controlsProgress.stop();
      };
    }
  }, [isInView, totalDays, daysLeft]);

  const colorTheme = getThemeForDirection(promo.directionId, index);
  const textColorClass = colorTheme.text;
  const progressBgClass = colorTheme.bg;
  const analytics = useAnalytics();

  return (
    <React.Fragment>
      <Link
        to={`/promotions/${promo.id}`}
        className="group flex-1 flex flex-col justify-between p-4 sm:p-5 hover:bg-brand/5 transition-colors relative h-full"
        onClick={() =>
          analytics.trackEvent("promotion_clicked", {
            promotionId: promo.id,
            variant: "A",
          })
        }
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 ${progressBgClass}`}
        />

        <div className="flex-1 mb-4 flex flex-col pl-2 sm:pl-3">
          <div
            className="hidden md:block w-full h-32 lg:h-40 overflow-hidden mb-4 relative bg-gray-100"
            style={{ borderRadius: "calc(var(--app-radius) * 0.7)" }}
          >
            <img
              src={promo.image}
              alt={promo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          <h3
            className={`text-base sm:text-lg font-bold text-gray-900 group-hover:${textColorClass.replace("text-", "")} transition-colors leading-[1.15]`}
          >
            {formatTypography(promo.title)}
          </h3>
        </div>

        <div
          ref={statsRef}
          className="shrink-0 flex flex-col gap-2.5 w-full mt-auto pl-2 sm:pl-3"
        >
          <div className="flex items-end justify-between">
            <div className={`flex items-center gap-2 ${textColorClass}`}>
              <span className="text-3xl font-black tracking-tighter leading-none">
                {displayDays}
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none mb-0.5">
                  Осталось
                </span>
                <span className="text-sm font-medium opacity-80 leading-none">
                  {getDaysWord(displayDays)}
                </span>
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

export function PromotionsVariantA({ promotions }: PromotionsVariantProps) {
  return (
    <Card className="relative overflow-hidden flex flex-col md:flex-row p-0">
      {promotions.map((promo, index) => (
        <PromoCardA
          key={promo.id}
          promo={promo}
          index={index}
          isLast={index === promotions.length - 1}
        />
      ))}
    </Card>
  );
}

function PromoCardD({
  promo,
  index,
  isFeatured,
}: {
  promo: any;
  index: number;
  isFeatured?: boolean;
}) {
  const statsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(statsRef, {
    once: true,
    margin: "0px 0px -40px 0px",
    amount: 0.8,
  });

  const today = new Date();
  const startDate = new Date(promo.startDate);
  const endDate = new Date(promo.endDate);
  const totalDaysRaw = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalDays = Math.max(1, totalDaysRaw);
  const daysLeft = Math.max(
    0,
    Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const [displayDays, setDisplayDays] = useState(totalDays);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isInView) {
      const controlsDays = animate(totalDays, daysLeft, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setDisplayDays(Math.round(value)),
      });

      const targetProgress = Math.min(100, (daysLeft / totalDays) * 100);
      const controlsProgress = animate(100, targetProgress, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setProgress(value),
      });

      return () => {
        controlsDays.stop();
        controlsProgress.stop();
      };
    }
  }, [isInView, totalDays, daysLeft]);

  const colorTheme = getThemeForDirection(promo.directionId, index);
  const textColorClass = colorTheme.text;
  const progressBgClass = colorTheme.bg;
  const analytics = useAnalytics();

  return (
    <Card
      as={Link}
      to={`/promotions/${promo.id}`}
      className={`group relative overflow-hidden flex flex-col p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border-0 ${isFeatured ? 'md:col-span-2 md:grid md:grid-cols-2 md:gap-6' : ''}`}
      onClick={() =>
        analytics.trackEvent("promotion_clicked", {
          promotionId: promo.id,
          variant: "A",
        })
      }
    >
      {/* Background tint based on color theme */}
      <div className={`absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 ${progressBgClass}`} />
      
      {/* Image Block (If featured, it goes left. If not, it's a small thumbnail or hidden if no image) */}
      {promo.image && (
        <div className={`relative overflow-hidden bg-gray-100 rounded-2xl shrink-0 ${isFeatured ? 'md:h-full h-40 mb-4 md:mb-0 order-first' : 'h-32 mb-4 w-full'}`}>
           <img
             src={promo.image}
             alt={promo.title}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content Block */}
      <div className="relative z-10 flex flex-col flex-1 h-full">
         <div className="flex-1">
           <h3 className={`text-lg sm:text-xl font-bold text-gray-900 leading-[1.25] mb-2 group-hover:${textColorClass.replace('text-', '')} transition-colors ${isFeatured ? 'md:text-2xl' : 'line-clamp-3'}`}>
             {formatTypography(promo.title)}
           </h3>
           {promo.description && isFeatured && (
             <p className="text-gray-500 text-sm line-clamp-3 mb-4 mt-2">
               {promo.description}
             </p>
           )}
         </div>

         {/* Bottom Status & CTA Area */}
         <div ref={statsRef} className="mt-6 pt-4 border-t border-gray-100 flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5 flex-1 max-w-[200px]">
               <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl font-black tracking-tighter leading-none ${textColorClass}`}>
                    {displayDays}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {getDaysWord(displayDays)} осталось
                  </span>
               </div>
               <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                 <div
                   className={`h-full rounded-full transition-all duration-300 ${progressBgClass}`}
                   style={{ width: `${progress}%` }}
                 />
               </div>
            </div>

            <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:${progressBgClass} group-hover:text-white transition-colors duration-300 text-gray-400`}>
               <ArrowRight className="w-4 h-4" />
            </div>
         </div>
      </div>
    </Card>
  );
}

export function PromotionsVariantD({ promotions }: PromotionsVariantProps) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {promotions.map((promo, index) => {
          const isFeatured = index === 0 && promotions.length > 2;
          return (
            <PromoCardD
              key={promo.id}
              promo={promo}
              index={index}
              isFeatured={isFeatured}
            />
          );
        })}
      </div>
    );
  }

export function PromotionsVariantB({ promotions }: PromotionsVariantProps) {
  const analytics = useAnalytics();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    const maxDots = Math.min(promotions.length, 5);
    setActiveDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const maxDots = Math.min(promotions.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <div className="w-full overflow-hidden flex flex-col items-center">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory gap-gap pb-4 -mx-4 px-4 scroll-pl-4 sm:mx-0 sm:px-0 sm:scroll-pl-0 hide-scrollbar"
      >
        {promotions.map((promo, index) => {
          const today = new Date();
          const endDate = new Date(promo.endDate);
          const daysLeft = Math.max(
            0,
            Math.round(
              (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
            ),
          );
          const colorTheme = getThemeForDirection(promo.directionId, index);
          const textColorClass = colorTheme.text;
          const progressBgClass = colorTheme.bg;

          return (
            <Card
              key={promo.id}
              as={Link}
              to={`/promotions/${promo.id}`}
              onClick={() =>
                analytics.trackEvent("promotion_clicked", {
                  promotionId: promo.id,
                  variant: "B",
                })
              }
              className="shrink-0 w-[280px] sm:w-[320px] snap-start flex flex-col group"
            >
              <div className="h-40 w-full relative overflow-hidden bg-gray-100">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span
                    className={`text-lg font-black leading-none ${textColorClass}`}
                  >
                    {daysLeft}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-none">
                    {getDaysWord(daysLeft)}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 relative">
                <h3
                  className={`text-lg font-bold text-gray-900 pr-8 group-hover:${textColorClass.replace("text-", "")} transition-colors leading-[1.15] mb-3`}
                >
                  {formatTypography(promo.title)}
                </h3>
                <div
                  className={`absolute top-5 right-5 w-8 h-8 rounded-full ${progressBgClass.replace("bg-", "bg-").replace("500", "100")} ${textColorClass} flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:${progressBgClass.replace("bg-", "")} group-hover:text-white transition-all duration-theme`}
                >
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {promotions.length > 1 && (
        <div className="flex gap-1.5 items-center mt-2">
          {Array.from({ length: Math.min(promotions.length, 5) }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                aria-label={`Scroll to page ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-theme ${i === activeDot ? "w-6 bg-brand" : "w-1.5 bg-brand/20 hover:bg-brand/40"}`}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

export function PromotionsVariantC({ promotions }: PromotionsVariantProps) {
  const analytics = useAnalytics();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {promotions.map((promo, index) => {
        const today = new Date();
        const endDate = new Date(promo.endDate);
        const daysLeft = Math.max(
          0,
          Math.round(
            (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
          ),
        );
        const colorTheme = getThemeForDirection(promo.directionId, index);
        const textColorClass = colorTheme.text;
        const progressBgClass = colorTheme.bg;

        return (
          <Card
            key={promo.id}
            as={Link}
            to={`/promotions/${promo.id}`}
            onClick={() =>
              analytics.trackEvent("promotion_clicked", {
                promotionId: promo.id,
                variant: "C",
              })
            }
            hoverable
            className="group relative flex flex-col overflow-hidden p-0"
          >
            <div className="relative h-52 sm:h-60 overflow-hidden bg-gray-50 shrink-0">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              <div className="absolute top-5 left-5">
                <Badge variant="promo" className="shadow-md">
                  Акция
                </Badge>
              </div>
            </div>

            <div className="absolute top-52 sm:top-60 right-6 transform -translate-y-1/2 z-10">
              <div
                className={`w-16 h-16 bg-white flex flex-col items-center justify-center border border-gray-50 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500`}
                style={{
                  borderRadius: "calc(var(--app-radius) * 0.7)",
                  boxShadow: "var(--app-shadow)",
                }}
              >
                <span
                  className={`text-2xl font-black leading-none ${textColorClass}`}
                >
                  {daysLeft}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-1">
                  {getDaysWord(daysLeft)}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-1 bg-white relative z-0">
              <h3
                className={`text-xl sm:text-2xl font-bold text-gray-900 leading-[1.15] mb-2 pr-10 group-hover:${textColorClass.replace("text-", "")} transition-colors line-clamp-3`}
              >
                {formatTypography(promo.title)}
              </h3>

              <div
                className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 ${progressBgClass.replace("bg-", "bg-").replace("500", "100")} ${textColorClass} transition-all duration-theme`}
              >
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
              </div>
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 h-1.5 ${progressBgClass} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}
            />
          </Card>
        );
      })}
    </div>
  );
}

function PromoCardE({
  promo,
  index,
}: {
  promo: any;
  index: number;
}) {
  const statsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(statsRef, {
    once: true,
    margin: "0px 0px -40px 0px",
    amount: 0.8,
  });

  const today = new Date();
  const startDate = new Date(promo.startDate);
  const endDate = new Date(promo.endDate);
  const totalDaysRaw = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalDays = Math.max(1, totalDaysRaw);
  const daysLeft = Math.max(
    0,
    Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

  const [displayDays, setDisplayDays] = useState(totalDays);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isInView) {
      const controlsDays = animate(totalDays, daysLeft, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setDisplayDays(Math.round(value)),
      });

      const targetProgress = Math.min(100, (daysLeft / totalDays) * 100);
      const controlsProgress = animate(100, targetProgress, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (value) => setProgress(value),
      });

      return () => {
        controlsDays.stop();
        controlsProgress.stop();
      };
    }
  }, [isInView, totalDays, daysLeft]);

  const colorTheme = getThemeForDirection(promo.directionId, index);
  const textColorClass = colorTheme.text;
  const progressBgClass = colorTheme.bg;
  const analytics = useAnalytics();

  return (
    <Card
      as={Link}
      to={`/promotions/${promo.id}`}
      className={`group relative overflow-hidden flex flex-row p-3 gap-4 shadow-sm hover:shadow-md transition-all duration-300 border-0 h-40 w-full`}
      onClick={() =>
        analytics.trackEvent("promotion_clicked", {
          promotionId: promo.id,
          variant: "E",
        })
      }
    >
      <div className={`absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 ${progressBgClass}`} />
      
      {/* Image Left */}
      {promo.image && (
        <div className="relative overflow-hidden bg-gray-100 rounded-xl shrink-0 w-2/5 max-w-[140px] h-full shadow-sm">
           <img
             src={promo.image}
             alt={promo.title}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
           />
           <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
        </div>
      )}

      {/* Content Right */}
      <div className="relative z-10 flex flex-col flex-1 h-full py-1">
         <div className="flex-1">
           <h3 className={`text-sm sm:text-base font-bold text-gray-900 leading-tight mb-1 group-hover:${textColorClass.replace('text-', '')} transition-colors line-clamp-3`}>
             {formatTypography(promo.title)}
           </h3>
         </div>

         <div ref={statsRef} className="mt-auto pt-2 flex flex-col gap-1.5">
            <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-black tracking-tighter leading-none ${textColorClass}`}>
                  {displayDays}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 leading-none">
                  {getDaysWord(displayDays)} осталось
                </span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${progressBgClass}`}
                style={{ width: `${progress}%` }}
              />
            </div>
         </div>
      </div>
    </Card>
  );
}

export function PromotionsVariantE({ promotions }: PromotionsVariantProps) {
  return (
    <div className="flex flex-col gap-3">
      {promotions.map((promo, index) => (
        <PromoCardE
          key={promo.id}
          promo={promo}
          index={index}
        />
      ))}
    </div>
  );
}

export const PromotionsVariantRegistry: Record<
  string,
  React.FC<PromotionsVariantProps>
> = {
  A: PromotionsVariantA,
  B: PromotionsVariantB,
  C: PromotionsVariantC,
  D: PromotionsVariantD,
  E: PromotionsVariantE,
};
