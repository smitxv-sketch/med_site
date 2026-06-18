import React from 'react';
import { Lightbulb, Plus } from 'lucide-react';
import { useUISettingsStore, WidgetType } from '@/shared/store/uiSettingsStore';
import { useCmsStore } from '@/shared/store/cmsStore';
import { InsightCard } from '../components/SharedComponents';
import { WIDGETS_REGISTRY } from '@/shared/config/widgetsRegistry';

type Props = { presetTab?: any; setPresetTab?: any };

export const CmsTab = ({ presetTab, setPresetTab }: Props) => { 
  const { pageBlocks, setPageBlocks } = useCmsStore();

  const addBlock = (type: WidgetType) => {
    const newBlock = {
      id: `${type}-${Date.now()}`,
      type,
      props: {}
    };
    setPageBlocks([...pageBlocks, newBlock]);
  };

  return (
  <>

<div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 pb-12">
                  <InsightCard title="Управление контентом на лету" variant="purple">
                    <p className="mb-4 text-xs">Добавление, перемещение и настройка виджетов теперь происходит прямо на странице: просто включите режим разработчика и найдите кнопку <b>«Добавить блок»</b> внизу страницы.</p>
                  </InsightCard>

                  <InsightCard title="AI Помощник для текстов (Ярус 1-2)" variant="purple">
                    <p className="mb-4 text-xs">Внедряется прямо в текстовые поля CMS (WYSIWYG редактор). Автоматически корректирует тон, орфографию и генерирует СЕО мета-теги.</p>
                    <div className="bg-white border rounded-lg p-3 text-sm shadow-sm opacity-90">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">SEO: Мета Описание</span>
                        <button className="text-purple-600 bg-purple-50 px-2 py-1 flex gap-1 items-center rounded-md hover:bg-purple-100 text-xs font-bold transition-colors"><Lightbulb className="w-3 h-3" /> Сгенерировать AI</button>
                      </div>
                      <div className="p-2 border rounded bg-gray-50 text-gray-600 text-xs font-normal">
                        Профессиональное ведение беременности в Челябинске. Консультация специалиста.
                      </div>
                    </div>
                  </InsightCard>

                  <InsightCard title="Репутационный мониторинг" variant="purple">
                    <p className="mb-4 text-xs">Aggregator-модуль, который стягивает отзывы с НаПоправку, ПроДокторов, Яндекс. Карт и 2ГИС, и пропускает через AI-анализ тональности.</p>
                    <div className="flex flex-col gap-2">
                      <div className="bg-white border p-3 rounded-lg flex items-start gap-3 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">5.0</div>
                        <div>
                          <div className="text-xs font-semibold text-gray-800">ПроДокторов (Вчера)</div>
                          <div className="text-[11px] text-gray-500 font-normal line-clamp-2">Очень понравился подход врача на УЗИ. Быстро и по делу.</div>
                        </div>
                      </div>
                      <div className="bg-white border p-3 rounded-lg flex items-start gap-3 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0 font-bold">3.0</div>
                        <div>
                          <div className="text-xs font-semibold text-gray-800">Яндекс Карты (3 дня назад)</div>
                          <div className="text-[11px] text-gray-500 font-normal line-clamp-2">Долго ждал в приёмной, хотя по телефону обещали принять вовремя.</div>
                        </div>
                      </div>
                      <button className="text-xs text-brand font-semibold text-center mt-2 decoration-dashed underline">Перейти в Модуль Отзывов</button>
                    </div>
                  </InsightCard>

                  <InsightCard title="Планировщик Соцсетей (Social Media MVP)" variant="purple">
                    <p className="mb-4 text-xs">Календарь публикаций и генерация постов для ВК и Телеграм на основе добавленных акций и новостей в CMS.</p>
                    <div className="grid grid-cols-2 gap-2 font-normal">
                       <div className="bg-blue-50 border border-blue-100 p-2 rounded text-center">
                         <div className="text-[10px] text-blue-600 uppercase font-bold mb-1">Среда 14:00</div>
                         <div className="text-xs font-medium text-blue-900">Новость о новом МРТ</div>
                       </div>
                       <div className="bg-gray-50 border border-white p-2 rounded text-center opacity-50 border-dashed">
                         <div className="text-[10px] text-gray-400 font-bold mb-1">Пятница 10:00</div>
                         <button className="text-[10px] underline">AI План</button>
                       </div>
                    </div>
                  </InsightCard>

                  <InsightCard title="История Изменений и Эффект (Change Log & Attribution)" variant="purple">
                    <p className="mb-4 text-xs">Привязка изменений сайта к росту или падению конверсий и трафика в Яндекс.Метрике.</p>
                    <div className="border rounded-lg overflow-hidden bg-white font-normal">
                      <div className="bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase px-3 py-1 flex justify-between">
                        <span>Изменение</span>
                        <span>Эффект (7 дн)</span>
                      </div>
                      <div className="p-3 text-[11px] flex justify-between border-t items-center">
                        <div>
                          <span className="font-semibold block text-gray-800">Добавлен FAQ</span>
                          <span className="text-[10px] text-gray-500">Стоматология</span>
                        </div>
                        <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">+1.2% Конв.</span>
                      </div>
                    </div>
                  </InsightCard>
                </div>
              
  </>
); };
