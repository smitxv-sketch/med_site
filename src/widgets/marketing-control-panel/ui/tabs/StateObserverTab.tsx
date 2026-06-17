import React from 'react';
import { useCmsStore } from '@/shared/store/cmsStore';
import { Database, Copy, Check, Trash2, Bug } from 'lucide-react';

export const StateObserverTab = () => {
  const { pageBlocks, setPageBlocks } = useCmsStore();
  const [copied, setCopied] = React.useState(false);

  const rawJson = JSON.stringify(pageBlocks, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Вы уверены, что хотите полностью очистить страницу?')) {
      setPageBlocks([]);
    }
  };

  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 bg-background rounded-xl border border-border overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/30 sticky top-0 z-10 shrink-0">
        <h3 className="text-xl font-black flex items-center gap-3 text-foreground mb-2">
          <Bug className="w-6 h-6 text-red-500" />
          Скелет Данных (State Observer)
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl font-medium">
          "Просто как автомат Калашникова": сырое отображение того, что в данный момент рендерится на странице. Идеально для отладки, тестирования и переноса конфигураций.
        </p>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={handleCopy}
            className="flex-1 bg-foreground text-background font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Скопировано!' : 'Копировать JSON'}
          </button>
          
          <button 
            onClick={handleClear}
            className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
          >
            <Trash2 className="w-4 h-4" />
            Очистить State
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-zinc-950 rounded-2xl shadow-inner border border-zinc-800 overflow-hidden flex flex-col max-h-[600px] min-h-[400px]">
          <div className="bg-black/40 px-4 py-2 border-b border-white/10 flex items-center justify-between shrink-0">
            <span className="text-xs font-mono font-bold text-gray-400 flex items-center gap-2">
              <Database className="w-3 h-3 text-brand" /> state.cmsStore.pageBlocks
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Read-Only</span>
          </div>
          
          <div className="p-4 overflow-y-auto custom-scrollbar flex-1">
            <pre className="text-[11px] sm:text-xs font-mono text-emerald-400 leading-relaxed selection:bg-brand selection:text-white">
              {rawJson}
            </pre>
            {pageBlocks.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-600 font-mono text-xs">
                // Массив блоков пуст. Страница чистая.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
