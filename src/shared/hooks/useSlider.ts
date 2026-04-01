import { useState, useEffect, useCallback } from 'react';

export function useSlider(totalSlides: number, intervalMs: number = 9000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (totalSlides <= 1 || index === currentSlide) return;
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide, totalSlides]);

  // Автоматическое перелистывание.
  // Зависимость от currentSlide гарантирует, что таймер сбрасывается 
  // при любом ручном переключении (свайп, клик по стрелке/точке).
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(nextSlide, intervalMs);
    return () => clearInterval(timer);
  }, [totalSlides, currentSlide, intervalMs, nextSlide]);

  return { currentSlide, direction, nextSlide, prevSlide, goToSlide };
}
