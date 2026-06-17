import React from 'react';
import { useAnalyticsStore } from '@/shared/lib/analytics/analyticsStore';
import { Target, Activity, ShieldCheck, Trash2, Rocket, Code, Clock } from 'lucide-react';

export const AnalyticsTab = () => {
  const { events, clearEvents } = useAnalyticsStore();

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 bg-gray-50">
      <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10 shrink-0">
         <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-3 text-gray-900 mb-2">
                <Target className="w-6 h-6 text-orange-500" />
                Маркетинговые События (Event Bus)
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                Централизованная шина аналитики. Перехватывает все клики и формы с атрибутами <code>data-goal</code> (напр. <code>data-goal="buy_click"</code>) и перенаправляет в Яндекс.Метрику / GA.
              </p>
            </div>
            {events.length > 0 && (
              <button 
                onClick={clearEvents}
                className="shrink-0 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Очистить лог
              </button>
            )}
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {events.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
             <Activity className="w-16 h-16 mb-4 opacity-20" />
             <p className="font-medium text-gray-600 mb-2">Событий пока нет</p>
             <p className="text-xs max-w-xs">Кликните по любой кнопке на сайте, у которой установлен <code>data-goal="..."</code>, либо попробуйте кнопки ниже.</p>
             
             <div className="mt-8 flex gap-3">
                <button 
                  data-goal="test_button_click" 
                  data-category="test"
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
                >
                  Тестовая кнопка
                </button>
                <button 
                  data-goal="test_order_click" 
                  data-category="conversion"
                  className="bg-brand text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
                >
                  Оформить заказ
                </button>
             </div>
          </div>
        ) : (
          <div className="space-y-3">
             {events.map((evt) => (
                <div key={evt.id} className="bg-white border p-4 rounded-xl shadow-sm flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
                   <div className={`p-2 rounded-lg shrink-0 ${evt.category === 'conversion' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      {evt.category === 'conversion' ? <Rocket className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                   </div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <span className="font-bold text-gray-900">
                           {evt.goalId}
                         </span>
                         <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1">
                           <Clock className="w-3 h-3" />
                           {new Date(evt.timestamp).toLocaleTimeString()}
                         </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                          category: {evt.category}
                        </span>
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Передано в аналитику
                        </span>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        )}

        <div className="bg-white p-6 rounded-2xl border border-gray-200 mt-8 shadow-sm">
          <h4 className="font-bold text-gray-900 mb-5 flex items-center gap-2 text-base">
            <span className="bg-indigo-100 p-1.5 rounded-lg">
               <Target className="w-4 h-4 text-indigo-600" />
            </span>
            Памятка администратору: Как настроить новую цель?
          </h4>
          
          <div className="space-y-5 text-sm text-gray-600">
            <div className="flex gap-4">
              <div className="w-6 h-6 shrink-0 bg-indigo-50 text-indigo-600 font-black flex items-center justify-center rounded-full text-xs border border-indigo-100">1</div>
              <div className="pt-0.5">
                <strong className="text-gray-900 block mb-1">Создайте цель в кабинете аналитики</strong>
                В Яндекс.Метрике выберите тип цели «JavaScript-событие» и задайте ей идентификатор. Например: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-xs font-bold">main_banner_click</code>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 shrink-0 bg-indigo-50 text-indigo-600 font-black flex items-center justify-center rounded-full text-xs border border-indigo-100">2</div>
              <div className="pt-0.5">
                <strong className="text-gray-900 block mb-1">Привяжите цель к интерфейсу</strong>
                <ul className="list-disc leading-relaxed mt-2 pl-4 space-y-1">
                   <li><strong className="text-gray-900">Если вы в CMS (Визуальный конструктор):</strong> Найдите у виджета поле <i>«Аналитика: ID Цели»</i> и впишите туда этот идентификатор.</li>
                   <li><strong className="text-gray-900">Если вы в коде (Разработчик):</strong> Просто добавьте атрибут <code className="bg-gray-100 px-1 py-0.5 rounded text-indigo-600 font-mono text-xs">data-goal="main_banner_click"</code> к кнопке <code>&lt;button&gt;</code> или форме <code>&lt;form&gt;</code>.</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 shrink-0 bg-indigo-50 text-emerald-600 font-black flex items-center justify-center rounded-full text-xs border border-emerald-100">3</div>
              <div className="pt-0.5">
                <strong className="text-gray-900 block mb-1">Готово. Остальное сделает система (Zero-Maintenance)</strong>
                Больше ничего делать не нужно. Глобальный детектор сам услышит клик по этому элементу, перехватит его и автоматически отправит <code>ym(..., 'reachGoal', 'main_banner_click')</code>. Никакого захламления кода и лишних скриптов.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-900 text-gray-300 text-xs border-t border-gray-800">
        <div className="flex gap-2">
          <Code className="w-4 h-4 shrink-0 text-brand mt-0.5" />
          <p className="leading-relaxed">
            Архитектура <strong className="text-white">Zero-Maintenance</strong>: Разработчику не нужно писать <code>onClick={`() => ym(..., 'buy')`}</code>. Достаточно добавить <code>data-goal="buy"</code> на кнопку или форму, и глобальный делегатор сам найдёт её и отправит аналитику.
          </p>
        </div>
      </div>
    </div>
  );
};
