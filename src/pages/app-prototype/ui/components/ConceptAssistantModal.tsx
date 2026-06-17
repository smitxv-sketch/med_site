import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, X } from 'lucide-react';

interface ConceptAssistantModalProps {
  onClose: () => void;
}

export function ConceptAssistantModal({ onClose }: ConceptAssistantModalProps) {
  return (
    <div className="absolute inset-0 z-[120] bg-white flex flex-col animate-in slide-in-from-bottom-full duration-theme">
      
      {/* Pitch Header for Stakeholders */}
      <div className="bg-purple-50 p-4 border-b border-purple-100 flex items-start justify-between shrink-0">
        <div>
          <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">Concept for Stakeholders</div>
          <h2 className="text-sm font-bold text-gray-900 leading-tight">ИИ-Ассистент маршрутизации</h2>
          <p className="text-xs text-gray-600 mt-1 max-w-[280px]">
            Умный навигатор по клинике, заменяющий долгий поиск в каталоге. 
            <span className="font-bold"> Не ставит диагнозы.</span>
          </p>
        </div>
        <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Interface Simulation */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 flex flex-col gap-4">
        
        <div className="text-center text-[10px] font-bold text-gray-400 mt-2 mb-2">Сегодня</div>

        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand" />
          </div>
          <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-sm text-gray-800">
            Доброе утро, Елена! Я умный помощник клиники "Источник". <br/><br/>Опишите, что вас беспокоит, или укажите услугу, и я помогу вам быстро найти нужного специалиста.
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-2">
          <div className="bg-brand text-brand-fg p-3.5 rounded-2xl rounded-tr-sm shadow-sm text-sm">
            У сына со вчерашнего дня болит живот и небольшая температура.
          </div>
        </div>

        <div className="flex gap-3 mt-2 animate-in fade-in slide-in-from-bottom-2 duration-500 delay-300 fill-mode-both">
          <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand" />
          </div>
          <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100 text-sm text-gray-800">
            Поняла вас. С такими симптомами лучше всего обратиться к педиатру или детскому гастроэнтерологу для очного осмотра.<br/><br/>
            Я нашла ближайшее окно сегодня к педиатру:
            
            <div className="mt-3 p-3 border border-gray-100 rounded-xl bg-gray-50 flex flex-col gap-2 cursor-pointer hover:bg-brand/5 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand">Сегодня в 14:00</span>
                <span className="text-[10px] font-bold text-gray-500">Пр. Ленина, 50</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=9" className="w-8 h-8 rounded-full" alt="Смирнова Анна" />
                <div>
                  <div className="text-sm font-bold text-gray-900">Смирнова Анна</div>
                  <div className="text-[10px] text-gray-500">Врач-педиатр</div>
                </div>
              </div>
              <button className="mt-2 w-full py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-1">
                Записаться <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Chat Input */}
      <div className="bg-white p-4 border-t border-gray-100 shrink-0 mb-4 sm:mb-0">
        <div className="bg-gray-100 rounded-full flex items-center px-4 py-3">
          <input 
            type="text" 
            placeholder="Опишите симптомы или врача..." 
            className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder:text-gray-400"
            disabled
          />
          <button className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 ml-2 shadow-md">
             <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
