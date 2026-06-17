import { create } from 'zustand';

export interface TrackingEvent {
  id: string;
  timestamp: number;
  goalId: string;
  category: string;
  payload?: any;
}

interface AnalyticsStore {
  events: TrackingEvent[];
  trackEvent: (goalId: string, category: string, payload?: any) => void;
  clearEvents: () => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  events: [],
  trackEvent: (goalId, category, payload) => {
    // В реальном проекте здесь будет вызов window.ym(...) или window.gtag(...)
    console.info(`[Analytics] Цель достигнута: ${goalId}`, { category, payload });
    
    set((state) => ({
      events: [
        {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
          goalId,
          category,
          payload,
        },
        ...state.events,
      ].slice(0, 100), // Храним последние 100 событий для отладки
    }));
  },
  clearEvents: () => set({ events: [] }),
}));
