import React, { useRef, useState, useEffect } from 'react';
import { Slot, DaySchedule } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from './Skeleton';

interface DoctorScheduleProps {
  slots: Slot[];
  loading: boolean;
  onSelectSlot: (slot: Slot) => void;
  onDateChange: (date: string) => void;
  selectedDate: string;
  days: DaySchedule[];
  compact?: boolean;
  onShowMore?: () => void;
  priceElement?: React.ReactNode;
}

export const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ 
  slots, 
  loading, 
  onSelectSlot, 
  onDateChange, 
  selectedDate,
  days,
  compact,
  onShowMore,
  priceElement
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    if (!compact) {
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => window.removeEventListener('resize', checkScroll);
    }
  }, [days, compact]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  if (compact) {
    const selectedDay = days.find(d => d.date === selectedDate);
    const dateText = selectedDay ? selectedDay.dateLabel.split(',')[0] : selectedDate;
    const displaySlots = slots.slice(0, 4);
    const hasMore = slots.length > 4 || days.length > 1;

    return (
      <div className="space-y-3">
        {loading ? (
           <div className="space-y-2">
             <div className="flex items-center justify-between">
               <Skeleton className="h-4 w-32" />
               {priceElement}
             </div>
             <div className="flex gap-2">
               <Skeleton className="h-10 w-16 rounded-lg" />
               <Skeleton className="h-10 w-16 rounded-lg" />
               <Skeleton className="h-10 w-16 rounded-lg" />
             </div>
           </div>
        ) : slots.length === 0 ? (
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm text-[var(--color-text-secondary)] bg-[var(--color-surface)] p-3 rounded-xl border border-[var(--color-border)] border-dashed text-center flex-1">
              Нет доступных слотов для онлайн-записи
            </div>
            {priceElement}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                Ближайшая запись: <span className="text-[var(--color-primary)]">{dateText}</span>
              </span>
              {priceElement}
            </div>
            <div className="flex flex-wrap gap-2">
              {displaySlots.map((slot) => (
                <button 
                  key={slot.time} 
                  onClick={(e) => { e.stopPropagation(); onSelectSlot(slot); }} 
                  disabled={!slot.isAvailable} 
                  className={`
                    py-2 px-3 rounded-lg text-xs font-bold border transition-all duration-200
                    flex items-center justify-center min-h-[40px] active:scale-95
                    ${slot.isAvailable 
                      ? 'bg-[var(--color-surface)] border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-sm' 
                      : 'bg-[var(--color-surface)] border-transparent text-[var(--color-text-secondary)]/30 cursor-not-allowed'
                    }
                  `}
                >
                  {slot.time}
                </button>
              ))}
              {hasMore && (
                <button
                  onClick={(e) => { e.stopPropagation(); onShowMore?.(); }}
                  className="py-2 px-3 rounded-lg text-xs font-bold border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200 min-h-[40px]"
                >
                  Ещё
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {priceElement && (
        <div className="flex justify-end mb-2">
          {priceElement}
        </div>
      )}
      {/* Calendar Strip */}
      <div className="relative group">
        {canScrollLeft && (
          <button 
            onClick={(e) => { e.stopPropagation(); scroll('left'); }} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/90 backdrop-blur rounded-full shadow-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-hide snap-x px-1 pr-12"
          style={{
            maskImage: canScrollRight ? 'linear-gradient(to right, black calc(100% - 40px), transparent 100%)' : 'none',
            WebkitMaskImage: canScrollRight ? 'linear-gradient(to right, black calc(100% - 40px), transparent 100%)' : 'none'
          }}
        >
          {days.map((day) => {
            const isSelected = selectedDate === day.date;
            return (
              <button
                key={day.date}
                onClick={(e) => { e.stopPropagation(); onDateChange(day.date); }}
                className={`
                  snap-start flex-shrink-0 flex flex-col items-center justify-center 
                  w-[3.5rem] h-[4rem] rounded-lg border transition-all duration-200 relative overflow-hidden active:scale-95
                  ${isSelected 
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm' 
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
                  }
                `}
              >
                <span className={`text-[9px] font-bold uppercase mb-0.5 opacity-80 tracking-wider`}>
                  {day.shifts} 
                </span>
                <span className={`text-lg font-bold leading-none`}>
                  {day.dateLabel.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>

        {canScrollRight && (
          <button 
            onClick={(e) => { e.stopPropagation(); scroll('right'); }} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/90 backdrop-blur rounded-full shadow-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Slots Grid */}
      <div className="min-h-[100px] relative">
        {loading ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-[44px] rounded-lg" />
            ))}
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-6 flex flex-col items-center justify-center bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] border-dashed">
            <span className="text-[var(--color-text-secondary)] font-medium text-xs">Нет свободного времени</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {slots.map((slot) => (
              <button 
                key={slot.time} 
                onClick={(e) => { e.stopPropagation(); onSelectSlot(slot); }} 
                disabled={!slot.isAvailable} 
                className={`
                  py-2 px-1 rounded-lg text-xs font-bold border transition-all duration-200
                  flex items-center justify-center min-h-[44px] active:scale-95
                  ${slot.isAvailable 
                    ? 'bg-[var(--color-surface)] border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-sm' 
                    : 'bg-[var(--color-surface)] border-transparent text-[var(--color-text-secondary)]/30 cursor-not-allowed'
                  }
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
