import { DaySchedule, Slot } from '../types';

export const getNextDays = (count: number = 14, allSlots: Slot[] = []): DaySchedule[] => {
  const nextDays: DaySchedule[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    
    const slotsForDay = allSlots.filter((s) => s.date === dateStr && s.isAvailable);
    const slotsCount = slotsForDay.length;

    nextDays.push({
      date: dateStr,
      dateLabel: `${dayNum} ${month}`,
      shifts: dayOfWeek,
      count: slotsCount
    });
  }
  return nextDays;
};

export const getDaysFromDates = (dates: string[], allSlots: Slot[] = []): DaySchedule[] => {
  return dates.map(dateStr => {
    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    const slotsForDay = allSlots.filter((s) => s.date === dateStr && s.isAvailable);
    const slotsCount = slotsForDay.length;
    
    return {
      date: dateStr,
      dateLabel: `${dayNum} ${month}`,
      shifts: dayOfWeek,
      count: slotsCount
    };
  });
};
