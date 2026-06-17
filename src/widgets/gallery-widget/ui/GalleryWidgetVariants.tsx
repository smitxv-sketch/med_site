import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  span?: string; // used for bento
  portrait?: boolean; // used for masonry hints
}

interface VariantsProps {
  images: GalleryImage[];
}

// --- Variant A: Classic Grid (1:1 Aspect Ratios) ---
export function GalleryVariantA({ images }: VariantsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {images.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer shadow-sm hover:shadow-lg transition-all"
        >
          <img
            src={img.url}
            alt={img.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {/* Defensive AI Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
            <span className="text-white w-full font-medium text-sm translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
              {img.title}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant B: Masonry ---
export function GalleryVariantB({ images }: VariantsProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
      {images.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="relative overflow-hidden rounded-2xl group cursor-pointer inline-block w-full"
        >
          <img
            src={img.url}
            alt={img.title}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant C: Bento Grid ---
export function GalleryVariantC({ images }: VariantsProps) {
  // Take first 6 as Bento looks best with specific counts
  const bentoImages = images.slice(0, 6);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[auto] gap-3 md:gap-4 lg:gap-5 auto-rows-[160px] md:auto-rows-[220px]">
      {bentoImages.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={cn(
            "relative overflow-hidden rounded-3xl group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500",
            img.span || "col-span-1 row-span-1",
          )}
        >
          <img
            src={img.url}
            alt={img.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Defensive AI Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 z-10 pointer-events-none">
            <h4 className="text-white font-semibold md:text-lg line-clamp-2">
              {img.title}
            </h4>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant D: Horizontal Slider ---
export function GalleryVariantD({ images }: VariantsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = React.useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    const maxDots = Math.min(images.length, 5);
    setActiveDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const maxDots = Math.min(images.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <div className="w-full overflow-hidden flex flex-col items-center -mx-4 px-4 sm:mx-0 sm:px-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto pb-4 gap-4 md:gap-6 snap-x snap-mandatory scrollbar-hide"
      >
        {images.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="shrink-0 w-[260px] sm:w-[340px] md:w-[420px] snap-center aspect-[4/3] relative rounded-3xl overflow-hidden group cursor-pointer"
          >
            <img
              src={img.url}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none">
              <span className="text-gray-900 font-medium line-clamp-2">
                {img.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="flex gap-1.5 items-center mt-2">
          {Array.from({ length: Math.min(images.length, 5) }).map((_, i) => (
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
