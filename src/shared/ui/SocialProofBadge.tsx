import React from 'react';
import { Star, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { useUISettingsStore } from '../store/uiSettingsStore';

interface SocialProofBadgeProps {
  rating?: number;
  reviewsCount?: number;
  featuredBadge?: 'none' | 'top10' | 'patientsChoice' | 'expert';
  className?: string;
  size?: 'sm' | 'md';
}

export function SocialProofRating({ rating = 4.9, reviewsCount = 124, className = '', size = 'sm' }: SocialProofBadgeProps) {
  const { socialProofLevel } = useUISettingsStore();

  const isMinimal = socialProofLevel === 'minimal';
  const isAggressive = socialProofLevel === 'aggressive';
  
  return (
    <div className={`flex items-center gap-1.5 ${isMinimal ? 'invisible' : ''} ${className}`}>
      <div className="flex items-center gap-0.5 shrink-0">
        <Star className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-400 fill-amber-400`} />
        {isAggressive && <Star className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-400 fill-amber-400`} />}
        {isAggressive && <Star className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-400 fill-amber-400`} />}
        {isAggressive && <Star className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-400 fill-amber-400`} />}
        {isAggressive && <Star className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-amber-400 fill-amber-400`} />}
      </div>
      <span className={`font-bold text-gray-900 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{rating}</span>
      <span className={`text-gray-500 font-medium ${size === 'sm' ? 'text-[11px]' : 'text-xs'}`}>({reviewsCount})</span>
    </div>
  );
}

export function SocialProofFeaturedBadges({ featuredBadge = 'patientsChoice', className = '' }: SocialProofBadgeProps) {
   const { socialProofLevel } = useUISettingsStore();
   
   if (socialProofLevel !== 'aggressive' || featuredBadge === 'none') return null;
   
   const badges = {
     top10: { icon: Trophy, text: 'Топ-10 врачей', color: 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm' },
     patientsChoice: { icon: ShieldCheck, text: 'Выбор пациентов', color: 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' },
     expert: { icon: Sparkles, text: 'Эксперт', color: 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm' }
   };
   
   const badge = badges[featuredBadge];
   const Icon = badge.icon;
   
   return (
     <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] sm:text-xs font-bold leading-tight uppercase tracking-wider ${badge.color} ${className}`}>
        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        {badge.text}
     </div>
   );
}
