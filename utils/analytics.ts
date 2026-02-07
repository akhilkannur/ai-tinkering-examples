export const GA_TRACKING_ID = 'G-7V91K25TH0';

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const trackEvent = (action: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, params);
  }
};
