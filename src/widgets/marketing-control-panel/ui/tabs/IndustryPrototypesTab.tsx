import React from 'react';
import { InsightCard } from '../components/SharedComponents';

export const IndustryPrototypesTab = () => { 
  return (
  <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 pb-12">
    <InsightCard title="Туризм и Путешествия" variant="green">
      <p className="mb-4 text-xs block text-gray-600">Готовое решение для Travel-агентств. Включает навигацию по направлениям, многодневные маршруты (Тур/Программа) и подробные места (Showcase).</p>
      <a href="/travel-prototype" className="block w-full text-center px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
        Открыть прототип
      </a>
    </InsightCard>

    <InsightCard title="Автоуслуги и Детейлинг" variant="blue">
      <p className="mb-4 text-xs block text-gray-600">Посадочная страница (Landing Page) для автосервисов (пример: Антикоррозийная обработка). Одностраничная компоновка с калькулятором, тарифами и отзывами.</p>
      <a href="/auto-prototype" className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
        Открыть прототип
      </a>
    </InsightCard>
  </div>
); 
};
