import { DaySchedule } from '../types';

export const getNextDays = (count: number = 14): DaySchedule[] => {
  const nextDays: DaySchedule[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
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
};

export const getDaysFromDates = (dates: string[]): DaySchedule[] => {
  return dates.map(dateStr => {
    const date = new Date(dateStr);
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'short' });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('ru-RU', { month: 'long' });
    
    return {
      date: dateStr,
      dateLabel: `${dayNum} ${month}`,
      shifts: dayOfWeek,
      count: 0 
    };
  });
};
