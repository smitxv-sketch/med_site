import React, { ButtonHTMLAttributes, ElementType } from 'react';
import { cn } from '../lib/utils';

export type ButtonVariant = 'primary' | 'brand' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: ElementType | string;
  to?: string;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  as: Component = 'button',
  children,
  ...props
}) => {
  // Базовые классы, которые есть у любой кнопки
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-[0.98] shrink-0 rounded-app';
  
  // Классы для разных вариантов (цветов)
  const variantClasses = {
    primary: 'bg-brand hover:brightness-95 text-white shadow-app hover:shadow-lg hover:-translate-y-0.5',
    brand: 'bg-brand text-brand-fg shadow-app hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-brand/5 text-brand shadow-sm border border-brand/10 hover:bg-brand/10 hover:border-brand/20',
    outline: 'border border-gray-200 text-gray-700 hover:border-brand hover:text-brand bg-white hover:bg-brand/5',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
  };

  // Классы для разных размеров
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Собираем все классы вместе
  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className
  );

  return (
    <Component className={combinedClasses} {...(props as any)}>
      {children}
    </Component>
  );
};
