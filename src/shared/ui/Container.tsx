import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Единый источник правды для ширины контента (bounding box).
 * Обеспечивает центрирование и одинаковые отступы на всех экранах.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className)}>
      {children}
    </div>
  );
}
