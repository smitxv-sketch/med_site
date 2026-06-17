import { useEffect } from 'react';
import { useAnalyticsStore } from './analyticsStore';

/**
 * EventDelegator — это "Автомат Калашникова" для аналитики.
 * Глобальный слушатель, который перехватывает клики и сабмиты
 * у всех элементов с атрибутом data-goal.
 * 
 * Это позволяет не загрязнять React-компоненты логикой аналитики (Zero-Maintenance).
 */
export const EventDelegator = () => {
  const trackEvent = useAnalyticsStore((state) => state.trackEvent);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ищем ближайший родительский элемент (или сам элемент) с data-goal
      const target = (e.target as HTMLElement).closest('[data-goal]');
      if (target) {
        const goalId = target.getAttribute('data-goal');
        const category = target.getAttribute('data-category') || 'click';
        if (goalId) {
          trackEvent(goalId, category);
        }
      }
    };

    const handleSubmit = (e: SubmitEvent) => {
      const target = (e.target as HTMLElement).closest('[data-goal]');
      if (target) {
        const goalId = target.getAttribute('data-goal');
        const category = target.getAttribute('data-category') || 'form_submit';
        if (goalId) {
          trackEvent(goalId, category);
        }
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('submit', handleSubmit, { capture: true }); // capture to catch submits early

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('submit', handleSubmit, { capture: true });
    };
  }, [trackEvent]);

  return null;
};
