import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { BottomNavVariants } from './BottomNavVariants';

/** Логика скрытия при скролле — только в браузере (Framer useScroll ломает SSR). */
function BottomNavScrollBehavior() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);
  const behavior = useUISettingsStore((state) => state.bottomNavBehavior);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (behavior === 'always-visible') {
      if (isHidden) setIsHidden(false);
      return;
    }

    const previous = lastYRef.current;
    const diff = latest - previous;

    if (latest <= 150) {
      if (behavior === 'hidden-on-top') {
        if (!isHidden) setIsHidden(true);
      } else if (isHidden) {
        setIsHidden(false);
      }
      lastYRef.current = latest;
      return;
    }

    if (diff > 25) {
      if (!isHidden) setIsHidden(true);
      lastYRef.current = latest;
    } else if (diff < -25) {
      if (isHidden) setIsHidden(false);
      lastYRef.current = latest;
    }
  });

  return <BottomNavVariants isHidden={isHidden} />;
}

export function BottomNav() {
  const behavior = useUISettingsStore((state) => state.bottomNavBehavior);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // На сервере Framer Motion не может читать window — показываем статичный вариант
  if (!mounted) {
    const isHiddenOnServer = behavior === 'hidden-on-top';
    return <BottomNavVariants isHidden={isHiddenOnServer} />;
  }

  return <BottomNavScrollBehavior />;
}
