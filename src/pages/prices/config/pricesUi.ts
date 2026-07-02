/** Визуальные тона быстрых ярлыков прайса (не бизнес-данные) */
export const PRICE_QUICK_NAV_TONES: Record<
  string,
  { gradient: string; border: string; text: string; icon: string }
> = {
  blue: {
    gradient: 'from-indigo-50 to-blue-100',
    border: 'border-blue-100/50',
    text: 'text-blue-900',
    icon: 'text-blue-600',
  },
  fuchsia: {
    gradient: 'from-purple-50 to-fuchsia-100',
    border: 'border-fuchsia-100/50',
    text: 'text-fuchsia-900',
    icon: 'text-fuchsia-600',
  },
  emerald: {
    gradient: 'from-teal-50 to-emerald-100',
    border: 'border-emerald-100/50',
    text: 'text-emerald-900',
    icon: 'text-emerald-600',
  },
  orange: {
    gradient: 'from-amber-50 to-orange-100',
    border: 'border-orange-100/50',
    text: 'text-orange-900',
    icon: 'text-orange-600',
  },
  rose: {
    gradient: 'from-rose-50 to-pink-100',
    border: 'border-pink-100/50',
    text: 'text-pink-900',
    icon: 'text-pink-600',
  },
};

export const QUICK_NAV_TONE_ORDER = ['blue', 'fuchsia', 'emerald', 'orange', 'rose'] as const;
