import React from "react";
import { ChevronRight } from "lucide-react";
import { useAnalytics } from "@/shared/infrastructure/analytics/AnalyticsService";

// Assuming actions have this structure based on mock-data
export interface QuickActionItem {
  id: string;
  label: string;
  icon: string | React.ReactNode;
}

export interface CategoriesVariantProps {
  actions: QuickActionItem[];
}

export const CategoriesVariantB = ({ actions }: CategoriesVariantProps) => {
  const analytics = useAnalytics();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    const maxDots = Math.min(actions.length, 5);
    setActiveDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const maxDots = Math.min(actions.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <section className="py-app flex flex-col items-center">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x items-center justify-start md:justify-center w-full scrollbar-hide"
      >
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={() =>
              analytics.trackEvent("category_clicked", {
                categoryId: act.id,
                label: act.label,
              })
            }
            className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-4 shadow-[var(--app-shadow)] whitespace-nowrap hover:-translate-y-1 active:scale-95 transition-all snap-start shrink-0"
            style={{
              borderRadius: "var(--app-radius)",
              border: "var(--app-border)",
            }}
          >
            <span className="text-2xl bg-white p-2 rounded-full shadow-sm">
              {act.icon}
            </span>
            <span className="text-base font-bold text-gray-900">
              {act.label}
            </span>
          </button>
        ))}
      </div>

      {actions.length > 1 && (
        <div className="flex gap-1.5 items-center mt-2 md:hidden">
          {Array.from({ length: Math.min(actions.length, 5) }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Scroll to page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-theme ${i === activeDot ? "w-6 bg-brand" : "w-1.5 bg-brand/20 hover:bg-brand/40"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export const CategoriesVariantC = ({ actions }: CategoriesVariantProps) => {
  const analytics = useAnalytics();
  return (
    <section className="py-app">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gap">
        {actions.map((act) => (
          <button
            key={act.id}
            onClick={() =>
              analytics.trackEvent("category_clicked", {
                categoryId: act.id,
                label: act.label,
              })
            }
            className="bg-white p-6 md:p-8 shadow-[var(--app-shadow)] flex flex-col items-start justify-between min-h-[160px] hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all group"
            style={{
              borderRadius: "var(--app-radius)",
              border: "var(--app-border)",
            }}
          >
            <div className="flex justify-between w-full items-start mb-4">
              <span className="text-4xl shadow-sm bg-gray-50/50 p-3 flex items-center justify-center rounded-2xl">
                {act.icon}
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand transition-colors" />
              </div>
            </div>
            <span className="text-sm md:text-lg font-bold text-gray-900 text-left leading-tight group-hover:text-brand transition-colors">
              {act.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export const CategoriesVariantA = ({ actions }: CategoriesVariantProps) => {
  const analytics = useAnalytics();
  return (
    <section className="py-app">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 items-start justify-items-center">
        {actions.map((act) => (
          <div
            key={act.id}
            className="flex flex-col items-center group cursor-pointer w-full"
            onClick={() =>
              analytics.trackEvent("category_clicked", {
                categoryId: act.id,
                label: act.label,
              })
            }
          >
            <button
              className="w-full max-w-[76px] sm:max-w-[96px] md:max-w-[120px] aspect-square bg-white flex items-center justify-center text-3xl sm:text-4xl md:text-5xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300 active:scale-95 mx-auto relative overflow-hidden"
              style={{
                borderRadius: "calc(var(--app-radius) + 8px)",
                border: "var(--app-border)",
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/[0.02] pointer-events-none" />
              <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                {act.icon}
              </span>
            </button>
            <span className="mt-2.5 text-[10.5px] sm:text-xs md:text-sm font-semibold text-gray-800 text-center leading-[1.1] tracking-tight group-hover:text-brand transition-colors text-balance w-full px-0.5">
              {act.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export const CategoriesVariantRegistry: Record<
  string,
  React.FC<CategoriesVariantProps>
> = {
  A: CategoriesVariantA,
  B: CategoriesVariantB,
  C: CategoriesVariantC,
};
