import React, { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useUISettingsStore } from '../../../shared/store/uiSettingsStore';
import { BottomNavVariants } from './BottomNavVariants';

export function BottomNav() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  
  // Реф для хранения последней позиции скролла, на которой произошло изменение
  const lastYRef = useRef(0);
  
  // Получаем настройку из глобального стора (в будущем - из Strapi)
  const hideOnScroll = useUISettingsStore(state => state.hideBottomNavOnScroll);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Если фича выключена в админке, меню всегда видно
    if (!hideOnScroll) {
      if (isHidden) setIsHidden(false);
      return;
    }

    const previous = lastYRef.current;
    const diff = latest - previous;
    
    // Если мы на самом верху страницы (до 150px), всегда показываем меню
    if (latest <= 150) {
      if (isHidden) setIsHidden(false);
      lastYRef.current = latest;
      return;
    }

    // Гистерезис: реагируем только если проскроллили больше 25px в одном направлении
    // Это убирает "дерганье" меню при микро-движениях пальцем
    if (diff > 25) {
      // Скролл вниз
      if (!isHidden) setIsHidden(true);
      lastYRef.current = latest;
    } else if (diff < -25) {
      // Скролл вверх
      if (isHidden) setIsHidden(false);
      lastYRef.current = latest;
    }
  });

  return <BottomNavVariants isHidden={isHidden} />;
}
