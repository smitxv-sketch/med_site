import React, { useState } from 'react';
import { Sparkles, Settings2, RefreshCcw, CheckCircle2, Blocks, Mic } from 'lucide-react';
import { useCmsStore } from '@/shared/store/cmsStore';
import { aiService } from '@/shared/lib/ai/aiService';

export function AiContentTab() {
  const [rawPrompt, setRawPrompt] = useState('');
  const [minLength, setMinLength] = useState(300);
  const [maxLength, setMaxLength] = useState(1500);
  const [instruction, setInstruction] = useState('Сделай продающий лендинг. Текст должен быть профессиональным и убедительным.');
  
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [generatedLayout, setGeneratedLayout] = useState<{ seo: any; blocks: any[] } | null>(null);
  const [generatedData, setGeneratedData] = useState<{ title?: string; description?: string; content?: string } | null>(null); // For legacy/SEO Fallback
  
  const [applied, setApplied] = useState<{ seo: boolean; layout: boolean }>({ seo: false, layout: false });

  const { setPageSeo, setPageBlocks, pageBlocks, brandVoice, setBrandVoice } = useCmsStore();

  const handleGenerateLayout = async () => {
    if (!rawPrompt) return;
    setIsGenerating(true);
    setApplied({ seo: false, layout: false });
    
    try {
      const result = await aiService.generateLayout({
        prompt: rawPrompt,
        minLength,
        maxLength,
        instruction,
        systemPrompt: `Ты AI-архитектор лендингов. Верни JSON массив виджетов и SEO данные.\nКРИТИЧЕСКИ ВАЖНО соблюдать Tone of Voice бренда:\n"${brandVoice}"`
      });
      
      if (result && result.seo && result.blocks) {
        setGeneratedLayout(result);
        setGeneratedData({ title: result.seo.title, description: result.seo.description });
      } else {
        alert('Не удалось разобрать ответ от AI.');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при обращении к AI сервису генерации структуры');
    } finally {
      setIsGenerating(false);
    }
  };

  const applySEO = () => {
    if (!generatedData) return;
    setPageSeo({ title: generatedData.title || '', description: generatedData.description || '' });
    setApplied(prev => ({ ...prev, seo: true }));
  };

  const applyLayout = () => {
    if (!generatedLayout?.blocks) return;
    
    // Add generated blocks to the CURRENT page blocks (append)
    const newBlocks = [
       ...pageBlocks, 
       ...generatedLayout.blocks.map((b: any) => ({
           id: `ai-${b.type}-${Math.random().toString(36).substr(2, 9)}`,
           type: b.type,
           content: b.content || {},
           props: b.props || {},
       }))
    ];
    setPageBlocks(newBlocks);
    setApplied(prev => ({ ...prev, layout: true }));
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10 shrink-0">
         <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 mb-2">
           <Sparkles className="w-6 h-6 text-brand" />
           AI Архитектор Лендингов
         </h3>
         <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
           Генерация полноценной структуры страницы из виджетов на основе ваших мыслей или черновиков.
         </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        
        {/* Контекст */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-3">
           <label className="font-bold text-gray-900 text-sm">Сырой контекст (Мысли, черновики)</label>
           <textarea
             value={rawPrompt}
             onChange={(e) => setRawPrompt(e.target.value)}
             placeholder="Например: открываем новую услугу МРТ-диагностики суставов, цена 4 000 руб., врачи работают на томографе 1,5 Тесла. Нужно написать продающе."
             className="bg-gray-50 border border-gray-200 text-gray-900 p-4 rounded-xl w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all text-sm leading-relaxed"
           />
        </div>

        {/* Бренд-голос */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-3">
           <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
             <Mic className="w-4 h-4 text-purple-500" /> Глобальный Бренд-Голос (Tone of Voice)
           </h4>
           <p className="text-xs text-gray-500">
             Этот параметр "невидимо" приклеивается ко всем запросам к AI, чтобы контент был в едином корпоративном стиле. (Единое поле для всего проекта)
           </p>
           <textarea
             value={brandVoice}
             onChange={(e) => setBrandVoice(e.target.value)}
             className="bg-purple-50/50 border border-purple-100 text-purple-900 p-4 rounded-xl w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-300/50 transition-all text-sm leading-relaxed"
           />
        </div>

        {/* Настройки */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4">
           <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
             <Settings2 className="w-4 h-4 text-gray-500" /> Настройки промпта
           </h4>
           
           <div className="flex items-center gap-4">
             <div className="flex-1">
               <label className="text-xs font-medium text-gray-500 mb-1 block">Мин. символов</label>
               <input type="number" value={minLength} onChange={e => setMinLength(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none" />
             </div>
             <div className="flex-1">
               <label className="text-xs font-medium text-gray-500 mb-1 block">Макс. символов</label>
               <input type="number" value={maxLength} onChange={e => setMaxLength(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none" />
             </div>
           </div>

           <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Системные пожелания</label>
              <textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-700 p-3 rounded-lg w-full h-20 resize-none focus:outline-none text-xs leading-relaxed"
              />
           </div>

           <button 
             onClick={handleGenerateLayout}
             disabled={!rawPrompt || isGenerating}
             className="w-full mt-2 bg-brand text-gray-900 font-bold py-3 rounded-xl shadow-sm hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
           >
             {isGenerating ? <div className="w-4 h-4 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" /> : <Blocks className="w-4 h-4" />}
             Создать Layout Страницы из Виджетов
           </button>
        </div>

        {/* Результаты */}
        {generatedLayout && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
             
             {/* SEO Block */}
             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden group">
               <div className="flex justify-between items-start mb-4">
                 <h4 className="font-bold text-gray-900 text-sm">SEO Мета-теги</h4>
               </div>
               
               <div className="space-y-3">
                 <div>
                   <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Заголовок (Title)</label>
                   <input 
                     value={generatedData?.title || generatedLayout.seo.title || ''} 
                     onChange={(e) => setGeneratedData(prev => ({...prev, title: e.target.value}))}
                     className="w-full font-medium text-blue-700 text-lg border-b border-gray-100 pb-1 focus:outline-none focus:border-blue-300 bg-transparent" 
                   />
                 </div>
                 <div>
                   <label className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Описание (Description)</label>
                   <textarea 
                     value={generatedData?.description || generatedLayout.seo.description || ''} 
                     onChange={(e) => setGeneratedData(prev => ({...prev, description: e.target.value}))}
                     className="w-full text-sm text-gray-600 border border-gray-100 rounded-lg p-3 focus:outline-none focus:border-brand/40 bg-transparent resize-none leading-relaxed h-20" 
                   />
                 </div>
               </div>

               <button 
                 onClick={applySEO} 
                 disabled={applied.seo}
                 className="mt-4 w-full bg-gray-900 text-white font-medium py-2.5 rounded-lg text-sm transition-all hover:bg-gray-800 disabled:bg-emerald-50 disabled:text-emerald-600 disabled:border disabled:border-emerald-200 flex items-center justify-center gap-2"
               >
                 {applied.seo ? <><CheckCircle2 className="w-4 h-4" /> SEO применено</> : 'Применить SEO к странице'}
               </button>
             </div>

             {/* Blocks List Preview */}
             <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                 <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                    <Blocks className="w-4 h-4 text-brand" /> Сгенерированные блоки ({generatedLayout.blocks.length})
                 </h4>
               </div>

               <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto custom-scrollbar p-1">
                 {generatedLayout.blocks.map((block: any, idx: number) => (
                    <div key={idx} className="p-3 border border-gray-100 bg-gray-50 rounded-lg flex flex-col gap-1 text-sm">
                       <span className="font-bold text-gray-900">{block.type}</span>
                       <span className="text-gray-500 text-xs truncate">{block.content?.title || block.content?.subtitle || 'Без заголовка'}</span>
                    </div>
                 ))}
               </div>

               <button 
                 onClick={applyLayout} 
                 disabled={applied.layout}
                 className="mt-2 w-full bg-brand text-gray-900 font-bold py-3 rounded-xl shadow-sm hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
               >
                 {applied.layout ? <><CheckCircle2 className="w-4 h-4" /> Виджеты добавлены на страницу</> : 'Добавить виджеты на страницу'}
               </button>
             </div>

          </div>
        )}

      </div>
    </div>
  );
}
