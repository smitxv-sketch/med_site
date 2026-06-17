import React, { useRef, useState, useEffect } from 'react';
import { Slot, DaySchedule } from '../types';
import { ChevronLeft, ChevronRight, Flame, Zap } from 'lucide-react';
import { Skeleton } from './Skeleton';
import { useUISettingsStore } from '../../shared/store/uiSettingsStore';

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
  const { marketingTriggers, urgencyLevel } = useUISettingsStore();
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
            
            {urgencyLevel === 'hard' && slots.filter(s => s.isAvailable).length > 0 && slots.filter(s => s.isAvailable).length <= 2 && (
               <div className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded inline-flex items-center gap-1">
                 <Flame className="w-3 h-3" /> Осталось мало мест
               </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {displaySlots.map((slot, index) => {
                const totalAvailableSlots = slots.filter(s => s.isAvailable).length;
                const isSmartFastTrack = (urgencyLevel === 'soft' || urgencyLevel === 'hard') && slot.isAvailable && index === displaySlots.findIndex(s => s.isAvailable);
                const isSmartScarcity = urgencyLevel === 'hard' && slot.isAvailable && totalAvailableSlots > 0 && totalAvailableSlots <= 2;
                
                return (
                <button 
                  key={slot.time} 
                  onClick={(e) => { e.stopPropagation(); onSelectSlot(slot); }} 
                  disabled={!slot.isAvailable} 
                  className={`
                    relative py-2 px-3 rounded-lg text-xs font-bold border transition-all duration-200
                    flex items-center justify-center min-h-[40px] active:scale-95
                    ${slot.isAvailable 
                      ? 'bg-[var(--color-surface)] border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-sm' 
                      : 'bg-[var(--color-surface)] border-transparent text-[var(--color-text-secondary)]/30 cursor-not-allowed'
                    }
                  `}
                >
                  {isSmartScarcity ? (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm z-10 pointer-events-none">
                      Последнее
                    </span>
                  ) : isSmartFastTrack ? (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-0.5 pointer-events-none">
                      Ближайшее
                    </span>
                  ) : null}
                  {slot.time}
                </button>
              )})}
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
            
            // Smart Scarcity algorithm: only show warning if very few slots left (indicated by "count")
            const isHighDemand = urgencyLevel === 'hard' && day.count > 0 && day.count <= 2;
            
            return (
              <button
                key={day.date}
                onClick={(e) => { e.stopPropagation(); onDateChange(day.date); }}
                className={`
                  snap-start flex-shrink-0 flex flex-col items-center justify-center 
                  w-[4rem] h-[4.5rem] rounded-xl border transition-all duration-200 relative overflow-hidden active:scale-95
                  ${isSelected 
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md translate-y-[-2px]' 
                    : 'bg-gray-50 border-gray-200 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                  }
                `}
              >
                {isHighDemand && !isSelected && (
                  <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-red-400 opacity-90" />
                )}
                <span className={`text-[10px] font-bold uppercase mb-0.5 opacity-90 tracking-wider ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                  {day.shifts} 
                </span>
                <span className={`text-base font-bold leading-none tracking-tight ${isSelected ? 'text-white' : 'text-gray-900'}`}>
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

      <div className="min-h-[100px] relative">
        {urgencyLevel === 'hard' && slots.filter(s => s.isAvailable).length > 0 && slots.filter(s => s.isAvailable).length <= 2 && (
           <div className="absolute -top-7 left-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
             <Flame className="w-3 h-3" /> Осталось мало мест
           </div>
        )}
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
            {slots.map((slot, index) => {
              const totalAvailableSlots = slots.filter(s => s.isAvailable).length;
              const isSmartFastTrack = (urgencyLevel === 'soft' || urgencyLevel === 'hard') && slot.isAvailable && index === slots.findIndex(s => s.isAvailable);
              const isSmartScarcity = urgencyLevel === 'hard' && slot.isAvailable && totalAvailableSlots > 0 && totalAvailableSlots <= 2;
              
              return (
              <button 
                key={slot.time} 
                onClick={(e) => { e.stopPropagation(); onSelectSlot(slot); }} 
                disabled={!slot.isAvailable} 
                className={`
                  relative py-2 px-1 rounded-lg text-xs font-bold border transition-all duration-200
                  flex items-center justify-center min-h-[44px] active:scale-95
                  ${slot.isAvailable 
                    ? 'bg-[var(--color-surface)] border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:shadow-sm' 
                    : 'bg-[var(--color-surface)] border-transparent text-[var(--color-text-secondary)]/30 cursor-not-allowed'
                  }
                `}
              >
                {isSmartScarcity ? (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm z-10 pointer-events-none">
                    Последнее
                  </span>
                ) : isSmartFastTrack ? (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-0.5 pointer-events-none">
                    <Zap className="w-2 h-2" />
                    Быстро
                  </span>
                ) : null}
                {slot.time}
              </button>
            )})}
          </div>
        )}
      </div>
    </div>
  );
};
