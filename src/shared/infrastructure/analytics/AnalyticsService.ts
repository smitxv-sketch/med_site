import { createContext, useContext } from 'react';

// Common event types to ensure type safety across the app
export type AnalyticsEventType = 
  | 'page_view'
  | 'doctor_clicked'
  | 'promotion_clicked'
  | 'category_clicked'
  | 'special_offer_clicked'
  | 'appointment_started'
  | 'form_submitted';

export interface IAnalyticsService {
  trackEvent(event: AnalyticsEventType, data?: Record<string, any>): void;
  setUser(userId: string): void;
}

export class ConsoleAnalyticsService implements IAnalyticsService {
  trackEvent(event: AnalyticsEventType, data?: Record<string, any>) {
    console.log(`[Analytics] Event: ${event}`, data || {});
    // Here we could map to GTG, Segment, Roistat etc
    // if (window.dataLayer) {
    //   window.dataLayer.push({ event, ...data });
    // }
  }

  setUser(userId: string) {
    console.log(`[Analytics] User Set: ${userId}`);
  }
}

// Global instance for simple usage outside React
export const analyticsService = new ConsoleAnalyticsService();

const AnalyticsContext = createContext<IAnalyticsService>(analyticsService);

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
