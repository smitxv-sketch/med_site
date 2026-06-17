import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Review, PlatformType } from "@/entities/review/model/types";
import { Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUISettingsStore } from "@/shared/store/uiSettingsStore";

// Helper to render platform badge
const PlatformBadge = ({ platform }: { platform: PlatformType }) => {
  const getBadgeStyle = () => {
    switch (platform) {
      case "yandex":
        return "bg-red-50 text-red-600 border-red-100";
      case "2gis":
        return "bg-green-50 text-green-600 border-green-100";
      case "prodoctors":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "napopravku":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "internal":
        return "bg-gray-50 text-gray-600 border-gray-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getPlatformName = () => {
    switch (platform) {
      case "yandex":
        return "Яндекс";
      case "2gis":
        return "2ГИС";
      case "prodoctors":
        return "ПроДокторов";
      case "napopravku":
        return "НаПоправку";
      case "internal":
        return "На сайте";
      default:
        return "";
    }
  };

  return (
    <span
      className={cn(
        "text-[10px] font-semibold px-2 py-0.5 rounded-full border",
        getBadgeStyle(),
      )}
    >
      {getPlatformName()}
    </span>
  );
};

const Avatar = ({
  src,
  fallback,
  size = "w-10 h-10",
}: {
  src?: string;
  fallback: string;
  size?: string;
}) => {
  return src ? (
    <img
      src={src}
      alt={fallback}
      className={cn(
        "rounded-full object-cover bg-gray-100 border border-gray-100",
        size,
      )}
    />
  ) : (
    <div
      className={cn(
        "rounded-full bg-brand/10 flex items-center justify-center font-semibold text-brand text-sm",
        size,
      )}
    >
      {fallback.charAt(0).toUpperCase()}
    </div>
  );
};

// --- Variant A: Classic Grid ---
export function ReviewsVariantA({ reviews }: { reviews: Review[] }) {
  const { layoutDensity, shadowStyle } = useUISettingsStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={cn(
            "p-6 rounded-2xl flex flex-col gap-5 border",
            shadowStyle === "soft"
              ? "shadow-sm hover:shadow-md"
              : "shadow-none hover:shadow-sm",
            "bg-white border-gray-100 transition-all flex-[1_0_auto]",
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar
                src={review.authorAvatar}
                fallback={review.authorName}
                size="w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900 text-sm">
                  {review.authorName}
                </span>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
            </div>
            <PlatformBadge platform={review.platform} />
          </div>

          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < review.rating
                    ? `text-green-400 fill-green-400`
                    : "text-gray-200 fill-gray-200",
                )}
              />
            ))}
          </div>

          <p className="text-sm text-gray-700 leading-relaxed font-sans line-clamp-4 flex-1">
            "{review.text}"
          </p>

          {review.doctorName && (
            <div className="mt-2 pt-4 border-t border-gray-100 flex items-center gap-3">
              {review.doctorAvatar ? (
                <img
                  src={review.doctorAvatar}
                  alt={review.doctorName}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <Star className="w-4 h-4 text-gray-400" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 line-clamp-1">
                  {review.doctorSpecialty || "Врач клиники"}
                </span>
                <span className="text-sm font-medium text-gray-900 line-clamp-1">
                  {review.doctorName}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant B: Horizontal Scroll ---
export function ReviewsVariantB({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    const maxDots = Math.min(reviews.length, 5);
    setActiveDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const maxDots = Math.min(reviews.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <div className="w-full overflow-hidden flex flex-col items-center">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-6 snap-x snap-mandatory scrollbar-hide"
      >
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={cn(
              "shrink-0 w-[300px] sm:w-[400px] snap-center rounded-3xl p-6 md:p-8 bg-gray-50 border border-gray-100 flex flex-col gap-6",
            )}
          >
            <div className="flex justify-between items-center">
              <PlatformBadge platform={review.platform} />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < review.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200 fill-gray-200",
                    )}
                  />
                ))}
              </div>
            </div>

            <p className="text-gray-800 text-base md:text-lg leading-relaxed flex-1 italic line-clamp-5">
              «{review.text}»
            </p>

            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <Avatar
                  src={review.authorAvatar}
                  fallback={review.authorName}
                  size="w-10 h-10"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 text-sm">
                    {review.authorName}
                  </span>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>

              {review.doctorName && (
                <div className="bg-white rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                  {review.doctorAvatar ? (
                    <img
                      src={review.doctorAvatar}
                      alt={review.doctorName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <span className="text-xs text-brand font-medium line-clamp-1">
                      {review.doctorSpecialty}
                    </span>
                    <span className="text-sm text-gray-900 line-clamp-1">
                      {review.doctorName}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {reviews.length > 1 && (
        <div className="flex gap-1.5 items-center mt-4">
          {Array.from({ length: Math.min(reviews.length, 5) }).map((_, i) => (
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

// --- Variant C: Platform Focus (Masonry / Editorial style) ---
export function ReviewsVariantC({ reviews }: { reviews: Review[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mt-8">
      {reviews.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex flex-col gap-4 group"
        >
          <div className="flex items-center gap-4 mb-2">
            <Avatar
              src={review.authorAvatar}
              fallback={review.authorName}
              size="w-12 h-12"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-lg">
                {review.authorName}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-2">
                <PlatformBadge platform={review.platform} />• {review.date}
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  i < review.rating
                    ? "text-gray-900 fill-gray-900"
                    : "text-gray-200 fill-gray-200",
                )}
              />
            ))}
          </div>

          <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic font-serif">
            "{review.text}"
          </p>

          {review.doctorName && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-px h-8 bg-brand mx-2" />
              {review.doctorAvatar && (
                <img
                  src={review.doctorAvatar}
                  alt={review.doctorName}
                  className="w-8 h-8 rounded-full object-cover grayscale opacity-80"
                />
              )}
              <span className="text-sm text-gray-500">
                Отзыв о враче:{" "}
                <span className="text-gray-900 font-medium">
                  {review.doctorName}
                </span>
                {review.doctorSpecialty &&
                  ` (${review.doctorSpecialty?.toLowerCase()})`}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// --- Variant D: Aggregate Info + Platform Filter Slider ---
export function ReviewsVariantD({ reviews }: { reviews: Review[] }) {
  const [activePlatformFilter, setActivePlatformFilter] = useState<'Все' | 'yandex' | '2gis' | 'prodoctors'>('Все');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Platform stats
  const aggregateRating = 4.9;
  const totalReviews = 6751;
  const platforms = [
    { id: 'Все', label: 'Все', rating: null },
    { id: 'yandex', label: 'Яндекс', rating: 4.9 },
    { id: '2gis', label: '2GIS', rating: 4.9 },
    { id: 'prodoctors', label: 'Продокторов', rating: 5.0 },
  ] as const;

  const filteredReviews = useMemo(() => {
    if (activePlatformFilter === 'Все') return reviews;
    return reviews.filter(r => r.platform === activePlatformFilter);
  }, [activePlatformFilter, reviews]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;
    const maxScroll = scrollWidth - clientWidth;
    const progress = scrollLeft / maxScroll;
    const maxDots = Math.min(filteredReviews.length, 5);
    setActiveDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    if (scrollWidth <= clientWidth) return;

    const maxScroll = scrollWidth - clientWidth;
    const maxDots = Math.min(filteredReviews.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // Reset scroll on filter change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activePlatformFilter]);

  return (
    <div className="w-full overflow-hidden flex flex-col items-center bg-brand/5 py-12 -mx-4 px-4 sm:mx-0 sm:px-6 lg:px-8 sm:rounded-[2rem]">
      {/* Top Aggregate Block */}
      <div className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 mb-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 lg:gap-12 shadow-sm border border-white/50">
        
        {/* Rating and total */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 bg-white p-2 px-3 sm:px-4 rounded-xl sm:rounded-2xl shadow-sm border border-brand/5">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xl sm:text-2xl font-bold text-brand">
            {aggregateRating} <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400 -mt-1" />
          </div>
          <div className="w-px h-6 sm:h-8 bg-gray-100" />
          <div className="flex items-center gap-2 text-sm sm:text-base font-medium text-gray-600">
             <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
             {totalReviews} отзыв
          </div>
        </div>

        {/* Platform tabs */}
        <div className="flex overflow-x-auto gap-2 sm:gap-4 lg:gap-8 min-w-0 pb-1 sm:pb-0 scrollbar-hide w-full md:w-auto">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setActivePlatformFilter(p.id)}
              className={`flex items-center gap-2 px-2 py-1 relative text-sm sm:text-base font-semibold whitespace-nowrap transition-all duration-300 ${activePlatformFilter === p.id ? 'text-brand' : 'text-gray-500 hover:text-gray-800'}`}
            >
              {p.label} {p.rating && <span className={activePlatformFilter === p.id ? "text-brand" : "text-gray-400"}>{p.rating}</span>}
              {activePlatformFilter === p.id && (
                <motion.div layoutId="activePlatform" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 sm:gap-6 lg:gap-8 snap-x snap-mandatory scrollbar-hide"
      >
        {filteredReviews.length === 0 ? (
          <div className="w-full text-center text-sm text-gray-500 py-12 rounded-3xl bg-white/50 border border-white/50">Отзывов на данной платформе пока нет, но мы работаем над этим.</div>
        ) : (
          filteredReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                "shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] snap-center rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 bg-white/90 backdrop-blur-sm border border-white flex flex-col gap-4 sm:gap-6 hover:shadow-xl transition-all duration-300",
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                    {review.authorName}
                  </span>
                  <span className="text-xs text-gray-500 mb-2">{review.date} на <span className="font-medium">{platforms.find(p => p.id === review.platform)?.label || review.platform}</span></span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3 sm:w-4 sm:h-4",
                          i < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200 fill-gray-200",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1 line-clamp-6">
                {review.text}
              </p>

              {review.text.length > 150 && (
                 <button className="text-xs text-brand hover:text-brand-dark text-left mt-auto transition-colors">читать полностью</button>
              )}
            </motion.div>
          ))
        )}
      </div>

      {filteredReviews.length > 1 && (
        <div className="flex items-center w-full max-w-5xl mx-auto gap-4 mt-4 px-4 sm:px-0">
          <div className="flex-1 h-0.5 bg-gray-200 rounded-full overflow-hidden relative">
             <div 
                className="absolute top-0 left-0 bottom-0 bg-brand transition-all duration-300" 
                style={{ width: `${Math.max(10, ((activeDot + 1) / Math.min(filteredReviews.length, 5)) * 100)}%` }} 
              />
          </div>
          <div className="flex gap-2">
            <button 
               onClick={() => handleDotClick(Math.max(0, activeDot - 1))}
               className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-400 hover:text-brand hover:bg-brand/10 flex items-center justify-center shadow-sm transition-all"
            >
               <svg className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button 
               onClick={() => handleDotClick(Math.min(Math.min(filteredReviews.length, 5) - 1, activeDot + 1))}
               className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-gray-400 hover:text-brand hover:bg-brand/10 flex items-center justify-center shadow-sm transition-all"
            >
               <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
