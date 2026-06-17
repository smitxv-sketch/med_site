import React, { useState, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { BottomNavVariants } from './BottomNavVariants';

export function BottomNav() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  
  // Реф для хранения последней позиции скролла, на которой произошло изменение
  const lastYRef = useRef(0);
  
  // Получаем настройку из глобального стора 
  const behavior = useUISettingsStore(state => state.bottomNavBehavior);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Если "всегда видно", сбрасываем скрытие
    if (behavior === 'always-visible') {
      if (isHidden) setIsHidden(false);
      return;
    }

    const previous = lastYRef.current;
    const diff = latest - previous;
    
    // Если мы на самом верху страницы (до 150px)
    if (latest <= 150) {
      if (behavior === 'hidden-on-top') {
         // На самом верху меню скрыто
         if (!isHidden) setIsHidden(true);
      } else {
         // 'hide-on-scroll-down' (всегда показываем на самом верху)
         if (isHidden) setIsHidden(false);
      }
      lastYRef.current = latest;
      return;
    }

    // Гистерезис: реагируем только если проскроллили больше 25px в одном направлении
    // Это убирает "дерганье" меню при микро-движениях пальцем
    if (diff > 25) {
      // Скролл вниз
      if (behavior === 'hidden-on-top') {
         // При скролле вниз после начального экрана оно может появляться или исчезать
         // Сделаем так, что меню появляется при скролле (любом) или только при скролле вверх
         // Допустим, скрываем при скролле вниз, как и везде
         if (!isHidden) setIsHidden(true);
      } else {
         if (!isHidden) setIsHidden(true);
      }
      lastYRef.current = latest;
    } else if (diff < -25) {
      // Скролл вверх - показываем меню в любом из режимов скролла
      if (isHidden) setIsHidden(false);
      lastYRef.current = latest;
    }
  });

  return <BottomNavVariants isHidden={isHidden} />;
}
