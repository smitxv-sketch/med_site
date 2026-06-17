import React from 'react';
import { cn } from '../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive' | 'warning' | 'promo';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({ 
  className, 
  variant = 'default', 
  size = 'md', 
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-transparent',
    primary: 'bg-brand/10 text-brand border-brand/20',
    secondary: 'bg-teal-50 text-teal-700 border-teal-100/50',
    outline: 'text-gray-600 border-gray-200',
    destructive: 'bg-red-50 text-red-700 border-red-100',
    warning: 'bg-orange-50 text-orange-700 border-orange-100',
    promo: 'bg-brand-violet text-white border-brand-violet shadow-sm shadow-brand-violet/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-app border font-bold uppercase tracking-wider transition-theme max-w-full truncate',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
