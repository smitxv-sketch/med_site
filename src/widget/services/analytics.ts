export const trackEvent = (eventName: string, data?: any) => {
  console.log(`[Analytics] ${eventName}`, data);
  // In a real app, send to GA or Mixpanel
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data);
  }
};
