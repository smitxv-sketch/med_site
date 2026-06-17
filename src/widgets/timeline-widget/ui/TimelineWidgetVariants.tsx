import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUISettingsStore } from "@/shared/store/uiSettingsStore";
import { MapPin, ArrowRight } from "lucide-react";

export interface TimelineStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface VariantsProps {
  steps: TimelineStep[];
}

// --- Variant A: Vertical Timeline ---
export function TimelineVariantA({ steps }: VariantsProps) {
  const { layoutDensity } = useUISettingsStore();

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6 relative">
      {/* Vertical Line */}
      <div className="absolute left-[27px] md:left-[39px] top-6 bottom-6 w-0.5 bg-gray-100 z-0" />

      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className="flex gap-6 md:gap-8 relative z-10"
        >
          <div
            className={cn(
              "w-14 h-14 md:w-20 md:h-20 shrink-0 rounded-full flex items-center justify-center font-bold text-lg md:text-2xl shadow-sm border-[4px] border-white",
              `bg-green-50 text-green-600`,
            )}
          >
            {step.number}
          </div>

          <div
            className={cn(
              "flex flex-col gap-2 pt-2 md:pt-4 pb-8 border-b border-gray-100 w-full",
              i === steps.length - 1 ? "border-b-0 pb-0" : "",
            )}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant B: Horizontal Scroll ---
export function TimelineVariantB({ steps }: VariantsProps) {
  const { layoutDensity } = useUISettingsStore();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    const maxDots = Math.min(steps.length, 5);
    setActiveDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const maxDots = Math.min(steps.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center -mx-4 px-4 sm:mx-0 sm:px-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto pb-4 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-hide"
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="shrink-0 w-[280px] sm:w-[320px] snap-center flex flex-col gap-6 relative"
          >
            {/* connecting line */}
            {i !== steps.length - 1 && (
              <div className="hidden md:block absolute top-7 left-20 right-0 w-full h-[2px] bg-gray-100 -z-10" />
            )}

            <div
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl",
                `bg-green-600 text-white shadow-md`,
              )}
            >
              {step.number}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {steps.length > 1 && (
        <div className="flex gap-1.5 items-center mt-2">
          {Array.from({ length: Math.min(steps.length, 5) }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              aria-label={`Scroll to page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-theme ${i === activeDot ? "w-6 bg-brand" : "w-1.5 bg-brand/20 hover:bg-brand/40"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
