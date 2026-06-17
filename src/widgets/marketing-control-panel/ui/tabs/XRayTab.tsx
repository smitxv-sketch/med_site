import React from 'react';
import { Scan, Eye, Code, Boxes, Layers, Play } from 'lucide-react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useLocation } from 'react-router-dom';

export const XRayTab = () => {
  const { isXRayMode, setIsXRayMode } = useUISettingsStore();
  const location = useLocation();

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 bg-background rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30 sticky top-0 z-10 shrink-0">
         <div className="flex flex-col sm:flex-row items-start gap-4 justify-between">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3 text-foreground mb-2">
                <Scan className="w-6 h-6 text-pink-500" />
                Визуальный Инспектор (X-Ray Mode)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                Инструмент для администратора/QA. Позволяет увидеть "рентген" страницы — подсвечивает границы всех CMS-виджетов, их ID и типы непосредственно поверх верстки страницы.
              </p>
            </div>
            
            <button 
              onClick={() => setIsXRayMode(!isXRayMode)}
              className={`shrink-0 relative w-full sm:w-auto overflow-hidden flex flex-col items-center justify-center p-4 rounded-2xl transition-all shadow-sm border ${isXRayMode ? 'bg-pink-500/10 border-pink-500/30 text-pink-500' : 'bg-muted border-border text-muted-foreground hover:bg-muted/80'}`}
            >
              {isXRayMode ? (
                <>
                  <div className="absolute inset-0 bg-pink-100/50 animate-pulse" />
                  <Eye className="w-8 h-8 mb-2 relative z-10" />
                  <span className="text-xs font-bold uppercase relative z-10">Включено</span>
                </>
              ) : (
                <>
                  <Scan className="w-8 h-8 mb-2 opacity-50 relative z-10" />
                  <span className="text-xs font-bold uppercase relative z-10">Выключено</span>
                </>
              )}
            </button>
         </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-zinc-950 text-gray-300 p-6 rounded-2xl text-xs space-y-3 relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Boxes className="w-24 h-24" />
           </div>
           
           <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2 relative z-10">
             <Code className="w-4 h-4 text-pink-400" /> Зачем это нужно?
           </h4>
           
           <ul className="space-y-4 relative z-10">
             <li className="flex gap-3">
               <Layers className="w-4 h-4 shrink-0 text-pink-400 mt-0.5" />
               <p><strong className="text-white">Поиск границ блоков:</strong> Вы сразу видите, где заканчивается один виджет и начинается другой. Это решает проблему "не знаю, в каком блоке нужно править текст".</p>
             </li>
             <li className="flex gap-3">
               <Play className="w-4 h-4 shrink-0 text-pink-400 mt-0.5" />
               <p><strong className="text-white">Отладка (Автомат Калашникова):</strong> Механизм внедрен исключительно на уровне глобального CSS-класса <code className="bg-white/10 px-1 rounded text-pink-300">.x-ray-mode</code> и не нагружает React. Он не падает и работает мгновенно.</p>
             </li>
           </ul>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl text-xs leading-relaxed">
          <strong>Совет:</strong> Перейдите на любую страницу, управляемую CMS (например, <b>/</b>), включите рентген и прокрутите страницу вниз, чтобы увидеть разметку в действии.
        </div>
      </div>
    </div>
  );
};
