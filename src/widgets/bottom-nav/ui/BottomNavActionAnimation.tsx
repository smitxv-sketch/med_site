import React from 'react';
import { motion } from 'framer-motion';
import type { BottomNavActionAnimation } from '@/shared/domain/bottom-nav/types';

interface BottomNavActionAnimationProps {
  type: BottomNavActionAnimation;
  shape: 'circle' | 'rect' | 'icon';
  className?: string;
}

export function BottomNavActionAnimation({
  type,
  shape,
  className = '',
}: BottomNavActionAnimationProps) {
  const roundedClass =
    shape === 'circle' || shape === 'icon' ? 'rounded-full' : 'rounded-xl';

  if (type === 'neon') {
    return (
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none z-0 ${className}`}
      >
        <div
          className={`absolute inset-0 blur-[6px] opacity-50 animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400 ${roundedClass}`}
        />
        <div
          className={`absolute inset-0 border border-white/20 mix-blend-overlay ${roundedClass}`}
        />
      </div>
    );
  }

  if (type === 'border-beam') {
    const containerClasses =
      shape === 'icon'
        ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 -z-10'
        : 'absolute -inset-[1.5px] -z-10';

    return (
      <div
        className={`${containerClasses} pointer-events-none overflow-hidden ${roundedClass} ${className} isolate`}
      >
        <div className="absolute inset-[-50%] w-[200%] h-[200%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_270deg,currentColor_360deg)] text-brand opacity-80 animate-[spin_3s_linear_infinite]" />
        </div>
        <div className={`absolute inset-[1.5px] bg-white ${roundedClass}`} />
      </div>
    );
  }

  if (type === 'shimmer') {
    const containerClasses =
      shape === 'icon'
        ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10'
        : 'absolute inset-0';
    return (
      <div
        className={`${containerClasses} pointer-events-none z-0 overflow-hidden ${roundedClass} ${className} isolate`}
      >
        <div className={`absolute inset-0 bg-brand/5 ${roundedClass}`} />
        <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-brand/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>
    );
  }

  const pulseContainer =
    shape === 'icon'
      ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10'
      : 'absolute inset-0';

  return (
    <div
      className={`${pulseContainer} pointer-events-none z-0 flex items-center justify-center ${className}`}
    >
      <motion.div
        className={`absolute w-full h-full ${roundedClass} bg-brand/30`}
        animate={{ scale: [1, 1.15], opacity: [0, 0.3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className={`absolute w-full h-full ${roundedClass} bg-brand/10`} />
    </div>
  );
}
