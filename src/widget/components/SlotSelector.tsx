import React, { useState, useRef } from 'react';
import { Slot, DaySchedule } from '../types';
import { ChevronLeft, ChevronRight, Clock, Loader2 } from 'lucide-react';

interface SlotSelectorProps {
  slots: Slot[];
  loading: boolean;
  onSelectSlot: (slot: Slot) => void;
  onDateChange: (date: string) => void;
  selectedDate: string;
}

export const SlotSelector: React.FC<SlotSelectorProps> = ({ slots, loading, onSelectSlot, onDateChange, selectedDate }) => {
  const [days] = useState<DaySchedule[]>(() => {
    const nextDays: DaySchedule[] = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
      const dayNum = date.getDate();
      const month = date.toLocaleDateString('ru-RU', { month: 'long' });
      
      nextDays.push({
        date: dateStr,
        dateLabel: `${dayNum} ${month}`,
        shifts: dayOfWeek,
        count: 0 
      });
    }
    return nextDays;
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Calendar Strip */}
      <div className="relative group">
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/80 backdrop-blur rounded-full shadow-md border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        >
          <ChevronLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-hide snap-x px-1"
        >
          {days.map((day) => {
            const isSelected = selectedDate === day.date;
            return (
              <button
                key={day.date}
                onClick={() => onDateChange(day.date)}
                className={`
                  snap-start flex-shrink-0 flex flex-col items-center justify-center 
                  w-[4.5rem] h-[5rem] rounded-xl border transition-all duration-theme relative overflow-hidden
                  ${isSelected 
                    ? 'bg-[var(--color-text-primary)] text-[var(--color-surface)] border-[var(--color-text-primary)] shadow-lg scale-105 ring-2 ring-[var(--color-primary)] ring-offset-2' 
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }
                `}
              >
                <span className={`text-[10px] font-bold uppercase mb-1 opacity-80 tracking-wider`}>
                  {day.shifts} 
                </span>
                <span className={`text-xl font-bold leading-none`}>
                  {day.dateLabel.split(' ')[0]}
                </span>
                <span className="text-[9px] mt-1 opacity-60 truncate max-w-full px-1">
                  {day.dateLabel.split(' ').slice(1).join(' ')}
                </span>
              </button>
            )
          })}
        </div>

        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-white/80 backdrop-blur rounded-full shadow-md border border-[var(--color-border)] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)]" />
        </button>
      </div>

      {/* Slots Grid */}
      <div className="bg-[var(--color-surface)]/50 backdrop-blur-md rounded-2xl border border-[var(--color-border)] p-6 shadow-sm min-h-[200px] relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/50 backdrop-blur-sm rounded-2xl">
            <Loader2 className="w-8 h-8 text-[var(--color-primary)] animate-spin mb-2" />
            <span className="text-sm text-[var(--color-text-secondary)] font-medium">Загружаем время...</span>
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-[var(--color-surface)] rounded-full flex items-center justify-center mb-4 text-[var(--color-text-secondary)]">
              <Clock className="w-8 h-8 opacity-50" />
            </div>
            <span className="text-[var(--color-text-secondary)] font-medium text-sm">Нет свободного времени на этот день</span>
            <p className="text-xs text-[var(--color-text-secondary)] mt-2 max-w-[200px]">Попробуйте выбрать другую дату в календаре выше</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Доступное время
              </h3>
              <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface)] px-2 py-1 rounded border border-[var(--color-border)]">
                {slots.length} слотов
              </span>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {slots.map((slot) => (
                <button 
                  key={slot.time} 
                  onClick={() => onSelectSlot(slot)} 
                  disabled={!slot.isAvailable} 
                  className={`
                    relative py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200
                    flex flex-col items-center justify-center gap-1 group
                    ${slot.isAvailable 
                      ? 'bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:shadow-md hover:-translate-y-0.5 active:scale-95 hover:bg-[var(--color-primary)] hover:text-white' 
                      : 'bg-[var(--color-surface)] border-transparent text-[var(--color-text-secondary)]/30 cursor-not-allowed'
                    }
                  `}
                >
                  <span className="tracking-tight text-lg">{slot.time}</span>
                  {slot.isAvailable && (
                    <span className="text-[9px] font-normal opacity-0 group-hover:opacity-100 transition-opacity -mt-1">
                      Записаться
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
