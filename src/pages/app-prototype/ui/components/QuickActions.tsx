import React from 'react';
import { QuickActionItem } from '../../model/types';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';
import { ChevronRight } from 'lucide-react';

interface QuickActionsProps {
  actions: QuickActionItem[];
  onActionClick?: (actionId: string) => void;
}

export function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  const { quickActionsVariant } = useUISettingsStore();

  if (quickActionsVariant === 'none') return null;

  if (quickActionsVariant === 'B') {
    // Apple/Zen style floating pill chips
    return (
      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar snap-x">
        {actions.map((act) => (
          <button 
            key={act.id}
            onClick={() => onActionClick?.(act.id)}
            className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-3 shadow-[var(--app-shadow)] whitespace-nowrap active:scale-95 transition-all snap-start"
            style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
          >
            <span className="text-xl bg-white p-1 rounded-full shadow-sm">{act.icon}</span>
            <span className="text-sm font-semibold text-gray-800">{act.label}</span>
          </button>
        ))}
      </div>
    );
  }

  if (quickActionsVariant === 'C') {
    // Neo/Bento Box style
    return (
      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => (
          <button 
            key={act.id}
            onClick={() => onActionClick?.(act.id)}
            className="bg-white p-4 shadow-[var(--app-shadow)] flex flex-col items-start justify-between aspect-[5/3] active:translate-y-1 transition-all group"
            style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
          >
            <div className="flex justify-between w-full items-start mb-2">
              <span className="text-2xl">{act.icon}</span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-brand transition-colors" />
            </div>
            <span className="text-xs font-bold text-gray-900 text-left leading-tight">{act.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Variant A: Classic icons grid
  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map((act) => (
        <div key={act.id} className="flex flex-col items-center gap-2">
          <button 
            onClick={() => onActionClick?.(act.id)}
            className="w-full aspect-square max-w-[72px] bg-white shadow-[var(--app-shadow)] flex items-center justify-center text-3xl hover:-translate-y-1 transition-all active:scale-95 mx-auto"
            style={{ borderRadius: 'calc(var(--app-radius) - 4px)', border: 'var(--app-border)' }}
          >
            {act.icon}
          </button>
          <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight mx-auto max-w-full break-words">{act.label}</span>
        </div>
      ))}
    </div>
  );
}
