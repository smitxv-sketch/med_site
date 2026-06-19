import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSliderOptions {
  pauseOnHover?: boolean;
  /** Отключить автоплей (например, когда слайдер не используется на текущем viewport) */
  enabled?: boolean;
}

export function useSlider(
  totalSlides: number,
  intervalMs: number = 9000,
  options: UseSliderOptions = {}
) {
  const { pauseOnHover = false, enabled = true } = options;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const pauseRef = useRef(false);

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

  const goToSlide = useCallback(
    (index: number) => {
      if (totalSlides <= 1 || index === currentSlide) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide, totalSlides]
  );

  const pause = useCallback(() => {
    pauseRef.current = true;
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    pauseRef.current = false;
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (totalSlides <= 1) return;
    if (pauseOnHover && isPaused) return;
    const timer = setInterval(nextSlide, intervalMs);
    return () => clearInterval(timer);
  }, [totalSlides, currentSlide, intervalMs, nextSlide, pauseOnHover, isPaused, enabled]);

  return {
    currentSlide,
    direction,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
    isPaused,
  };
}
