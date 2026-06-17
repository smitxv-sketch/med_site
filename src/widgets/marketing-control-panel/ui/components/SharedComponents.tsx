
import React from 'react';
import { HelpCircle, Lightbulb } from 'lucide-react';

export const ParameterTooltip = ({ children, title, text, mobileOnly }: { children?: React.ReactNode, title?: React.ReactNode, text?: React.ReactNode, mobileOnly?: boolean }) => {
  return (
    <div className="group relative inline-flex items-center justify-center ml-1.5 cursor-help min-w-[20px] min-h-[20px]">
      <HelpCircle className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs p-2.5 rounded-lg shadow-xl pointer-events-none z-50 leading-relaxed">
        {title && <div className="font-bold mb-1">{title}</div>}
        {text && <div>{text}</div>}
        {children}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
      </div>
    </div>
  );
};

export const InsightCard = ({ title, children, variant = 'purple' }: { title: string, children: React.ReactNode, variant?: 'purple' | 'blue' | 'rose' | 'amber' | 'neutral' }) => {
  const variants = {
    purple: 'bg-purple-50/50 border-purple-100/50 text-purple-900',
    blue: 'bg-blue-50/50 border-blue-100/50 text-blue-900',
    rose: 'bg-rose-50/50 border-rose-100/50 text-rose-900',
    amber: 'bg-amber-50/50 border-amber-100/50 text-amber-900',
    neutral: 'bg-slate-50/50 border-slate-100/50 text-slate-900'
  };
  
  const iconColors = {
    purple: 'text-purple-500',
    blue: 'text-blue-500',
    rose: 'text-rose-500',
    amber: 'text-amber-500',
    neutral: 'text-slate-500'
  };

  return (
    <div className={`mt-4 p-4 rounded-xl border ${variants[variant] || variants.purple} flex gap-3 shadow-sm`}>
      <Lightbulb className={`w-5 h-5 ${iconColors[variant] || iconColors.purple} shrink-0 mt-0.5`} />
      <div>
        <div className="font-bold text-[13px] mb-1 opacity-90">{title}</div>
        <div className="text-[13px] leading-relaxed opacity-80">{children}</div>
      </div>
    </div>
  );
};
