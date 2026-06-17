import React from 'react';
import { Target } from 'lucide-react';
import { InsightCard } from '../components/SharedComponents';

export const UtmTab = () => { return (
  <>

<div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 pb-12">
                  <div className="bg-blue-50 text-blue-900 p-4 rounded-xl text-sm border border-blue-100 flex gap-3">
                    <Target className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
                    <div>
                      <strong className="block mb-1">Маршрутизация (UI/UX)</strong>
                      Система автоматически подстраивается под UTM-метки, время суток и другие контекстные переменные. Эмуляция работы Context Engine.
                    </div>
                  </div>

                  <InsightCard title="Прямые ссылки для тестов (UTM)" variant="blue">
                    <p className="mb-4 text-xs">Ссылки откроются в новой вкладке. Это позволит вам тестировать систему вне панели управления, делясь прямыми временными ссылками на этот превью-билд.</p>
                    <div className="flex flex-col gap-2">
                       <a 
                          href="/?utm_campaign=senior_care"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-left bg-white border p-3 rounded-lg flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors"
                       >
                         <div>
                           <div className="text-xs font-semibold text-gray-800">utm_campaign=senior_care</div>
                           <div className="text-[11px] text-gray-500 font-normal">Фокус на заботу и доверие</div>
                         </div>
                         <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold whitespace-nowrap">Открыть ссылку</span>
                       </a>
                       <a 
                          href="/?utm_term=emergency_dental"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-left bg-white border p-3 rounded-lg flex items-center justify-between shadow-sm hover:border-red-300 transition-colors"
                       >
                         <div>
                           <div className="text-xs font-semibold text-gray-800">utm_term=emergency_dental</div>
                           <div className="text-[11px] text-gray-500 font-normal">Жесткий дефицит, быстрые действия</div>
                         </div>
                         <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold whitespace-nowrap">Открыть ссылку</span>
                       </a>
                       <a
                          href="/"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full mt-2 text-center text-[11px] text-gray-500 font-medium hover:text-gray-900 border border-gray-200 bg-gray-50 rounded-lg p-2"
                       >
                         Прямая ссылка (Без UTM)
                       </a>
                    </div>
                  </InsightCard>

                  <InsightCard title="Time-based Recommendations" variant="blue">
                    <p className="mb-4 text-xs">Разный блок кнопок или призыв к действию в зависимости от времени суток.</p>
                    <div className="grid grid-cols-2 gap-2 font-normal">
                       <div className="bg-gray-50 border p-2 rounded text-center">
                         <div className="text-[10px] text-gray-500 font-bold mb-1">День (09:00 - 18:00)</div>
                         <div className="text-[11px] font-medium text-gray-900 line-clamp-1">Запись на прием</div>
                       </div>
                       <div className="bg-blue-900 border-blue-800 text-white p-2 rounded text-center">
                         <div className="text-[10px] text-blue-300 font-bold mb-1">Ночь (18:00 - 09:00)</div>
                         <div className="text-[11px] font-medium line-clamp-1">Экстренная связь</div>
                       </div>
                    </div>
                  </InsightCard>

                  <InsightCard title="Exit Intent Strategy" variant="blue">
                    <p className="mb-2 text-xs">Удержание уходящего пользователя (эмуляция "передумал покупать").</p>
                    <button className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg shadow-md hover:bg-gray-800">
                      Симулировать попытку закрытия вкладки
                    </button>
                  </InsightCard>
                </div>
              
  </>
); };
