import React, { useState } from 'react';
import { Beaker, EyeOff, LayoutTemplate, ShieldCheck, ArrowRight, BookOpen, Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { aiService } from '@/shared/lib/ai/aiService';
import { useCmsStore } from '@/shared/store/cmsStore';

export const LaboratoryTab = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // При открытии вкладки сразу переходим в песочницу
    if (window.location.pathname !== '/sandbox') {
      navigate('/sandbox');
    }
  }, [navigate]);

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai', text: string | React.ReactNode }>>([
    {
      role: 'ai',
      text: 'Привет! Я AI-Архитектор. Опишите, какую страницу вы хотите собрать, и я сгенерирую набор виджетов, напишу тексты и подготовлю структуру. Результат будет сразу отрисован в Песочнице.'
    }
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt;
    setPrompt('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsGenerating(true);

    try {
      // Имитация вызова к AI или реальный API
      const result = await aiService.generateLayout({
        prompt: userMessage,
        instruction: 'Создай структуру виджетов для песочницы.',
      });

      if (result && result.blocks) {
        // Сохраняем в localStorage для песочницы
        localStorage.setItem("laboratory_blocks", JSON.stringify(result.blocks));
        window.dispatchEvent(new Event("sandbox_updated"));

        setMessages(prev => [...prev, {
          role: 'ai',
          text: (
            <div className="flex flex-col gap-3">
              <p>Готово! Страница собрана и уже доступна в Песочнице слева. Я добавил базовые виджеты и подготовил тексты.</p>
              <p className="text-amber-700 bg-amber-50 p-3 rounded-xl text-sm border border-amber-100">
                 💡 <strong>Рекомендация:</strong> Уточните детали о ваших врачах, ценах или услугах, чтобы я мог наполнить контентом соответствующие блоки. Если чего-то не хватает, напишите мне об этом.
              </p>
            </div>
          )
        }]);
      } else {
        throw new Error("No blocks returned");
      }
    } catch (e) {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: 'К сожалению, произошла ошибка при генерации. Попробуйте еще раз или уточните запрос.'
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="p-6 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-30 shrink-0 shadow-sm rounded-t-2xl flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 mb-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            AI Архитектор (Лаборатория)
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            Генерация страниц и виджетов с помощью промптов для безопасного тестирования в песочнице.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col bg-slate-50 min-h-[400px]">
        <div className="flex-1 overflow-y-auto space-y-4 px-2 pb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-purple-600" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-gray-900 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm text-sm leading-relaxed'}`}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
          {isGenerating && (
            <div className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                 <Bot className="w-5 h-5 text-purple-600" />
               </div>
               <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3 text-sm text-gray-500 shadow-sm">
                 <Loader2 className="w-4 h-4 animate-spin text-purple-500" />
                 Собираю структуру и генерирую тексты...
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200 shrink-0">
        <div className="relative flex items-center">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
            placeholder="Что вы хотите собрать? (Например: создай страницу для детской стоматологии...)"
            className="w-full bg-gray-50 border border-gray-300 rounded-2xl py-3 pl-4 pr-14 resize-none h-[52px] min-h-[52px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="absolute right-2 top-1.5 bottom-1.5 aspect-square bg-purple-600 text-white rounded-xl flex items-center justify-center hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-2">
            <span className="text-[10px] text-gray-400">Shift + Enter для переноса строки</span>
        </div>
      </div>
    </div>
  );
};

