import React, { useState } from 'react';
import { AlertTriangle, Fingerprint, HelpCircle, X, BookOpen, Edit2, Check } from 'lucide-react';
import { InsightCard } from '../components/SharedComponents';

type Props = { store: any; presetTab?: any; setPresetTab?: any };

export const StrategyTab = ({ store, presetTab, setPresetTab }: Props) => {
  const { activeRuleId, applyRule } = store;
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', desc: '', emoji: '' });

  const startEditing = (preset: any) => {
    setEditingPresetId(preset.id);
    setEditForm({ name: preset.name, desc: preset.desc, emoji: preset.emoji });
  };

  const saveEditing = () => {
    if (editingPresetId) {
      store.updateCustomPreset(editingPresetId, editForm);
      setEditingPresetId(null);
    }
  };

  return (
    <>

<div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2">
                  
                                    {/* Onboarding / Intro */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-100/50 shadow-sm mb-8 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-200/50 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-white p-1.5 rounded-lg shadow-sm">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="text-[15px] font-extrabold text-indigo-900 tracking-tight">Как работает Панель Управления</h3>
                      </div>
                      <p className="text-sm text-indigo-900/80 leading-relaxed font-medium mb-3">
                         Это единый центр управления конверсией. Вы можете переключать бизнес-стратегии и мгновенно наблюдать, как меняется архитектура, логика продаж и дизайн сайта на лету, не привлекая программистов.
                      </p>
                      <ul className="text-xs text-indigo-800/80 space-y-2 font-medium">
                        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-indigo-500"></span> Изучайте вкладки меню: стратегии, маркетинговые триггеры, брендинг.</li>
                        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-indigo-500"></span> Нажимайте на иконку <HelpCircle className="w-4 h-4 inline mx-0.5 text-indigo-600"/> для справки по каждому параметру.</li>
                        <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-indigo-500"></span> Сохраняйте уникальные комбинации как «Мои пресеты».</li>
                      </ul>
                    </div>
                  </div>

                  {/* Semantic Rules Section */}
                  <section>
                    <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4 flex items-center justify-between">
                      Бизнес-модели (Сценарии продаж)
                      <span className="bg-brand/10 text-brand px-2 py-0.5 rounded text-[10px]">A/B Ready</span>
                    </h4>
                    
                    <InsightCard title="Маркетинговые сценарии (A/B тесты)">
                      При активации сценария система автоматически перестраивает все компоненты сайта.
                      Это не просто смена цветов — меняются формы кнопок, плотность отступов и акценты блоков. Идеально для проверки гипотез на разный сегмент аудитории.
                    </InsightCard>

                    <div className="space-y-3 mt-4">
                      <button
                        onClick={() => applyRule(null)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-theme text-left group ${
                          activeRuleId === null 
                            ? 'border-brand bg-white shadow-lg ring-1 ring-brand/10' 
                            : 'border-transparent bg-white hover:border-gray-200 shadow-sm'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-2xl shadow-inner ${activeRuleId === null ? 'bg-brand/10' : 'bg-gray-50'}`}>
                          🏥
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-sm font-black leading-tight ${activeRuleId === null ? 'text-brand' : 'text-gray-900 group-hover:text-brand transition-colors'}`}>
                            Нормальный режим (Сброс) 
                          </h4>
                          <p className="text-[11px] text-gray-500 font-medium leading-snug mt-0.5">
                            Отключение глобальных переопределений. Конфигурация интерфейса формируется из ручных параметров.
                          </p>
                        </div>
                      </button>

                      {store.semanticRules.map(rule => {
                        const isActive = activeRuleId === rule.id;
                        return (
                          <button
                            key={rule.id}
                            onClick={() => applyRule(rule.id)}
                            className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all duration-theme text-left group relative overflow-hidden ${
                              isActive 
                                ? 'border-brand bg-white shadow-lg ring-1 ring-brand/10' 
                                : 'border-transparent bg-white hover:border-gray-200 shadow-sm hover:shadow-md'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-2xl shadow-inner transition-colors ${isActive ? 'bg-brand/10' : 'bg-gray-50'}`}>
                              {rule.emoji}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className={`text-sm font-black leading-tight ${isActive ? 'text-brand' : 'text-gray-900 group-hover:text-brand transition-colors'}`}>
                                  {rule.name}
                                </h4>
                                {rule.highManipulation && (
                                  <span title="Высокая конверсионная нагрузка" className="flex-shrink-0">
                                    <AlertTriangle className={`w-4 h-4 ${isActive ? 'text-orange-500' : 'text-orange-400/50 group-hover:text-orange-400'}`} />
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-gray-500 font-medium leading-snug mt-1 mb-2">
                                {rule.desc}
                              </p>
                              <div className="flex items-center gap-1.5 inline-flex bg-gray-100 px-2 py-0.5 rounded text-[11px] font-semibold text-gray-600">
                                <Fingerprint className="w-3.5 h-3.5 text-brand" />
                                {rule.metric}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Absolute Presets */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Визуальное позиционирование (Vibe)</h4>
                      <div className="flex bg-gray-100 p-0.5 rounded-lg">
                        <button 
                          onClick={() => setPresetTab('base')} 
                          className={"px-3 py-1 text-[10px] font-bold rounded-md transition-colors " + (presetTab === 'base' ? 'bg-white shadow text-gray-900' : 'text-gray-500')}
                        >Готовые</button>
                        <button 
                          onClick={() => setPresetTab('custom')} 
                          className={"px-3 py-1 text-[10px] font-bold rounded-md transition-colors " + (presetTab === 'custom' ? 'bg-white shadow text-gray-900' : 'text-gray-500')}
                        >Мои ({store.presets.filter(p => p.isCustom).length})</button>
                      </div>
                    </div>
                    
                    {presetTab === 'base' && (
                      <InsightCard title="Модульная кастомизация брендбука">
                        Эти пресеты позволяют мгновенно пересобрать интерфейс и подобрать визуальный стиль за 1 клик, не меняя бизнес-логику.
                      </InsightCard>
                    )}

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {store.presets.filter((p: any) => presetTab === 'base' ? !p.isCustom : p.isCustom).map((preset: any) => {
                        const isActive = store.activePresetId === preset.id;
                        
                        if (editingPresetId === preset.id) {
                          return (
                            <div key={preset.id} className="w-full flex-col p-3 rounded-xl border border-indigo-200 bg-white shadow-sm flex gap-2">
                              <input 
                                className="text-sm font-bold w-full bg-gray-50 border p-1 rounded" 
                                value={editForm.name} 
                                onChange={e => setEditForm({ ...editForm, name: e.target.value })} 
                                placeholder="Название"
                              />
                              <input 
                                className="text-xs w-full bg-gray-50 border p-1 rounded" 
                                value={editForm.desc} 
                                onChange={e => setEditForm({ ...editForm, desc: e.target.value })} 
                                placeholder="Описание"
                              />
                              <input 
                                className="text-xs w-full bg-gray-50 border p-1 rounded" 
                                value={editForm.emoji} 
                                onChange={e => setEditForm({ ...editForm, emoji: e.target.value })} 
                                placeholder="Эмодзи (1-2 символа)"
                                maxLength={2}
                              />
                              <div className="flex gap-2 mt-1">
                                <button onClick={saveEditing} className="flex-1 bg-indigo-500 text-white text-xs py-1.5 rounded font-bold hover:bg-indigo-600 flex items-center justify-center gap-1"><Check className="w-3 h-3"/> Сохранить</button>
                                <button onClick={() => setEditingPresetId(null)} className="px-3 bg-gray-100 text-gray-600 text-xs py-1.5 rounded font-bold hover:bg-gray-200">Отмена</button>
                              </div>
                            </div>
                          )
                        }

                        return (
                          <div key={preset.id} className="relative group">
                            <button
                              onClick={() => store.applyPreset(preset.id)}
                              className={"w-full flex-col items-center text-center p-4 rounded-xl border transition-all duration-theme flex " + (
                                isActive 
                                  ? 'border-brand bg-white shadow-lg ring-1 ring-brand/10 scale-[1.02]' 
                                  : 'border-transparent bg-white shadow-sm hover:border-gray-200 hover:shadow-md'
                              )}
                            >
                              <div className={"w-12 h-12 rounded-xl mb-3 flex items-center justify-center text-3xl shadow-inner transition-colors " + (isActive ? 'bg-brand/10' : 'bg-gray-50')}>
                                {preset.emoji}
                              </div>
                              <h4 className={"text-sm font-black mb-1 " + (isActive ? 'text-brand' : 'text-gray-900 group-hover:text-brand transition-colors')}>
                                {preset.name}
                              </h4>
                              <p className="text-[10px] text-gray-500 leading-tight">
                                {preset.desc}
                              </p>
                            </button>
                            {preset.isCustom && (
                               <>
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); startEditing(preset); }}
                                   className="absolute top-1 left-1 bg-white rounded-md p-1 shadow-sm border hover:bg-indigo-50 text-indigo-500 scale-0 group-hover:scale-100 transition-transform"
                                   title="Редактировать параметры"
                                 >
                                   <Edit2 className="w-3.5 h-3.5" />
                                 </button>
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); store.deleteCustomPreset(preset.id); }}
                                   className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border hover:bg-red-50 text-red-500 scale-0 group-hover:scale-100 transition-transform"
                                   title="Удалить пресет"
                                 >
                                   <X className="w-3 h-3" />
                                 </button>
                               </>
                            )}
                          </div>
                        );
                      })}
                      
                      {presetTab === 'custom' && store.presets.filter(p => p.isCustom).length === 0 && (
                        <div className="col-span-2 text-center py-6 text-gray-500 text-xs bg-gray-50 rounded-xl border border-dashed">
                          Нет сохраненных пользовательских пресетов. Сделайте изменения в других вкладках и сохраните их!
                        </div>
                      )}
                    </div>
                  </section>

                </div>
              
  </>
); };
