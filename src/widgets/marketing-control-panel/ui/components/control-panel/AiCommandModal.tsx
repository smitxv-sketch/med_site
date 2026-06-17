import React from 'react';
import { Sparkles, X, Mic } from 'lucide-react';
import { useCmsStore } from '@/shared/store/cmsStore';
import { aiService } from '@/shared/lib/ai/aiService';

export function AiCommandModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { setPageSeo, setPageBlocks, pageBlocks, brandVoice } = useCmsStore();
  const [rawPrompt, setRawPrompt] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);

  if (!isOpen) return null;

  const handleGenerateLayout = async () => {
    if (!rawPrompt) return;
    setIsGenerating(true);
    
    try {
      const result = await aiService.generateLayout({
        prompt: rawPrompt,
        minLength: 300,
        maxLength: 1500,
        instruction: 'Сделай продающий лендинг. Текст должен быть профессиональным и убедительным.',
        systemPrompt: `Ты AI-архитектор лендингов. Верни JSON массив виджетов и SEO данные.\nКРИТИЧЕСКИ ВАЖНО соблюдать Tone of Voice бренда:\n"${brandVoice}"`
      });
      
      if (result && result.seo && result.blocks) {
        setPageSeo({ title: result.seo.title, description: result.seo.description });
        const newBlocks = [
           ...pageBlocks, 
           ...result.blocks.map((b: any) => ({
               id: `ai-${b.type}-${Math.random().toString(36).substr(2, 9)}`,
               type: b.type,
               content: b.content || {},
               props: b.props || {},
           }))
        ];
        setPageBlocks(newBlocks);
        onClose();
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

  return (
    <div className="fixed inset-0 z-[10000] bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/30">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-foreground">AI Архитектор</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors"><X className="w-4 h-4 text-muted-foreground" /></button>
        </div>
        
        <div className="p-6">
          <textarea
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            placeholder="Опишите, какую страницу вы хотите собрать... (Например: Лендинг для акции МРТ с ценой 4000р)"
            rows={4}
            className="w-full bg-muted/20 border border-border text-foreground p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all text-sm leading-relaxed min-h-[120px]"
            autoFocus
          />
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mic className="w-3.5 h-3.5" /> Голос бренда активен
            </div>
            
            <button 
              onClick={handleGenerateLayout}
              disabled={!rawPrompt || isGenerating}
              className="px-6 py-2.5 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-md"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Сгенерировать страницу
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
