import React, { useState, useEffect } from 'react';

interface VariantSwitcherProps<T extends string> {
  variants: readonly T[];
  labels?: Record<T, string>;
  currentVariant: T;
  onChange: (variant: T) => void;
  mode?: 'pill' | 'cycle';
  className?: string;
}

export function VariantSwitcher<T extends string>({
  variants,
  labels,
  currentVariant,
  onChange,
  mode = 'pill',
  className = ''
}: VariantSwitcherProps<T>) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('home_authorized');
    if (auth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  if (!isAuthorized) return null;

  if (mode === 'cycle') {
    const cycleVariant = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const currentIndex = variants.indexOf(currentVariant);
      const nextIndex = (currentIndex + 1) % variants.length;
      onChange(variants[nextIndex]);
    };

    return (
      <button
        onClick={cycleVariant}
        className={`flex items-center justify-center font-bold transition-colors ${className}`}
        title="Переключить вариант дизайна"
      >
        {labels ? labels[currentVariant] : currentVariant}
      </button>
    );
  }

  // mode === 'pill'
  return (
    <div className={`flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm z-50 ${className}`}>
      {variants.map((v) => {
        const isActive = currentVariant === v;
        return (
          <button
            key={v}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(v);
            }}
            className={`min-w-[24px] h-6 px-2 rounded-full flex items-center justify-center transition-colors text-[10px] font-medium ${
              isActive 
                ? 'bg-brand-green text-white shadow-sm' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {labels ? labels[v] : v}
          </button>
        );
      })}
    </div>
  );
}
