import React from 'react';
import { Dna, Target } from 'lucide-react';
import { InsightCard } from '../components/SharedComponents';

export const EvolutionTab = () => {
  return (
    <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100/50 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3 relative z-10">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <Dna className="w-5 h-5 text-pink-600" />
          </div>
          <h3 className="text-[15px] font-extrabold text-pink-900 tracking-tight">AI Эволюция стиля</h3>
        </div>
        <p className="text-sm text-pink-900/80 leading-relaxed font-medium mb-3 relative z-10">
          Алгоритм подбирает оптимальные комбинации дизайна на основе данных о конверсии.
        </p>
        
        <InsightCard title="Внимание" variant="purple">
          Этот раздел был архитектурно переосмыслен и переведен на новый компонент (Feature-Sliced Design).
        </InsightCard>
      </div>
    </div>
  );
};
