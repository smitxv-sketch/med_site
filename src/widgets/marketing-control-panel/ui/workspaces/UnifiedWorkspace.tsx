import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, AppWindow, Target, Palette, Scan, Bug, Map, Beaker, LayoutTemplate, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useCmsStore } from '@/shared/store/cmsStore';

import { PageBuilder } from '../components/PageBuilder';
import { AiCommandModal } from '../components/control-panel/AiCommandModal';
import { MarketingTab } from '../tabs/MarketingTab';
import { UtmTab } from '../tabs/UtmTab';
import { StrategyTab } from '../tabs/StrategyTab';
import { IntegratorTab } from '../tabs/IntegratorTab';
import { CmsTab } from '../tabs/CmsTab';
import { AiContentTab } from '../tabs/AiContentTab';
import { EvolutionTab } from '../tabs/EvolutionTab';
import { IndustryPrototypesTab } from '../tabs/IndustryPrototypesTab';
import { XRayTab } from '../tabs/XRayTab';
import { StateObserverTab } from '../tabs/StateObserverTab';
import { ArchitectureTab } from '../tabs/ArchitectureTab';
import { LaboratoryTab } from '../tabs/LaboratoryTab';

const MODULES = [
  { 
    id: 'content', icon: AppWindow, label: 'Смарт-Билдер', desc: 'Умный генератор страниц.', 
    keywords: ['дизайн', 'шаблон', 'ai', 'страница', 'архитектор', 'builder', 'page', 'генерация'],
    actions: [
      { id: 'action-ai-builder', label: 'Запустить AI Сборку', keywords: ['ai', 'генератор', 'создать'] }
    ]
  },
  { 
    id: 'brand', icon: Palette, label: 'Брендинг и Стиль', desc: 'Вид, цвета, шрифты и Tone of Voice.', 
    keywords: ['цвет', 'шрифт', 'отступ', 'голос бренда', 'стиль', 'бренд', 'css', 'дизайн', 'цвета', 'оформление', 'внешний вид'],
    actions: [
      { id: 'action-brand-voice', label: 'Настроить Tone of Voice (Tone)', keywords: ['голос', 'копирайтинг', 'текст', 'стиль общения'] },
      { id: 'action-design-tokens', label: 'Управление Палитрой', keywords: ['цвета', 'css', 'дизайн', 'primary'] }
    ]
  },
  { id: 'cms', icon: LayoutTemplate, label: 'Виджеты и CMS', desc: 'Управление блоками и контентом.', keywords: ['текст', 'фото', 'контент', 'блок', 'меню', 'шапка', 'подвал', 'галерея', 'cms'], actions: [] },
  { 
    id: 'funnels', icon: Target, label: 'SEO и Воронки', desc: 'Конверсионные пресеты и метки.', 
    keywords: ['seo', 'поиск', 'яндекс', 'google', 'мета', 'теги', 'title', 'utm', 'воронки', 'маркетинг', 'конверсия'],
    actions: [
      { id: 'action-seo-presets', label: 'Выбрать Конверсионный Пресет', keywords: ['шаблон', 'воронка', 'агрессивные'] },
      { id: 'action-utm', label: 'Настроить UTM метки', keywords: ['трафик', 'ссылки', 'analytics'] }
    ]
  },
  { id: 'prototypes', icon: Lightbulb, label: 'Готовые Сайты', desc: 'Индустриальные шаблоны.', keywords: ['прототип', 'медицина', 'клиника', 'авто', 'ремонт', 'заготовки', 'готовые сайты', 'индустрия'], actions: [] },
  { id: 'ai', icon: Sparkles, label: 'AI Нейросети', desc: 'Настройка ИИ и промптов.', keywords: ['api', 'chatgpt', 'gemini', 'gpt', 'нейросеть', 'ai', 'настройки ai', 'модели'], actions: [] },
  { id: 'evolution', icon: TrendingUp, label: 'Эволюция и Лог', desc: 'История изменений системы.', keywords: ['история', 'логи', 'изменения', 'эффект', 'рост', 'эволюция', 'версии'], actions: [] },
  
  // Developer
  { id: 'xray', icon: Scan, label: 'Рентген DOM', desc: 'Технический анализ структуры.', keywords: ['рентген', 'dom', 'дерево', 'теги', 'разметка', 'xray', 'разработчик', 'код'], actions: [] },
  { id: 'state', icon: Bug, label: 'Состояние (State)', desc: 'Общее состояние Zustand.', keywords: ['состояние', 'store', 'zustand', 'данные', 'state', 'debug', 'отладка'], actions: [] },
  { id: 'arch', icon: Map, label: 'Архитектура', desc: 'Граф зависимостей и FSD.', keywords: ['архитектура', 'граф', 'схема', 'исходники', 'связи', 'fsd'], actions: [] },
  { id: 'labs', icon: Beaker, label: 'Лаборатория', desc: 'Эксперименты и диагностика.', keywords: ['парсинг', 'тесты', 'лаборатория', 'ошибки'], actions: [] },
];

export function UnifiedWorkspace({ store, openMatrix }: { store: ReturnType<typeof useUISettingsStore>, openMatrix: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [scrollToId, setScrollToId] = useState<string | null>(null);
  
  // Legacy states for StrategyTab etc
  const [presetTab, setPresetTab] = useState<'base' | 'custom'>('base');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSavingPreset, setIsSavingPreset] = useState(false);
  const [newPresetData, setNewPresetData] = useState({ name: '', desc: '', emoji: '🚀' });
  const { brandVoice, setBrandVoice } = useCmsStore();

  React.useEffect(() => {
    if (scrollToId && activeModule) {
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-2', 'transition-all');
          setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-2'), 2500);
        }
      }, 150);
      setScrollToId(null);
    }
  }, [scrollToId, activeModule]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { modules: MODULES, actions: [] };
    const q = searchQuery.toLowerCase();
    
    const matchedModules = MODULES.filter(m => 
      m.label.toLowerCase().includes(q) || 
      m.desc.toLowerCase().includes(q) || 
      m.keywords.some(k => k.toLowerCase().includes(q))
    );

    const matchedActions = MODULES.flatMap(m => 
      (m.actions || [])
        .filter(a => a.label.toLowerCase().includes(q) || a.keywords.some(k => k.toLowerCase().includes(q)))
        .map(a => ({ ...a, moduleLabel: m.label, moduleId: m.id, moduleIcon: m.icon }))
    );

    return { modules: matchedModules, actions: matchedActions };
  }, [searchQuery]);

  const activeTab = searchQuery ? null : activeModule;

  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Search Input Filter & Sticky Header */}
      <div className="px-6 pt-2 pb-4 border-b border-border shrink-0 bg-background sticky top-0 z-20 shadow-sm block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); if (e.target.value) setActiveModule(null); }}
            placeholder="Что хотите изменить? (например цвет, SEO)"
            className="w-full bg-muted/30 border border-border pl-9 pr-4 py-2.5 rounded-lg text-sm transition-all focus:outline-none focus:ring-1 focus:ring-ring focus:bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        {/* Unsaved Changes Banner - Always Visible if needed */}
        {store.hasUnsavedChanges && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <p className="text-xs font-semibold text-amber-800">У вас есть несохраненные стили</p>
              </div>
              {!isSavingPreset && (
                <div className="flex items-center gap-2">
                  {store.activePresetId && store.presets.find(p => p.id === store.activePresetId)?.isCustom && (
                    <button 
                       onClick={() => {
                         store.updateCustomPreset(store.activePresetId!);
                       }}
                       className="px-3 py-1.5 bg-white border border-amber-300 text-amber-800 rounded-md text-xs font-bold hover:bg-amber-100 transition-colors shadow-sm"
                    >
                      Обновить текущий
                    </button>
                  )}
                  <button 
                     onClick={() => setIsSavingPreset(true)}
                     className="px-3 py-1.5 bg-amber-500 text-white rounded-md text-xs font-bold hover:bg-amber-600 transition-colors shadow-sm"
                  >
                    Новый Пресет
                  </button>
                </div>
              )}
            </div>
          
            {isSavingPreset && (
               <div className="flex flex-col gap-2 mt-2 pt-3 border-t border-amber-200/50">
                  <input className="text-xs bg-white border border-amber-200 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-amber-500 transition-all w-full text-amber-900 placeholder:text-amber-700/50" placeholder="Название версии (например Зимнее промо)" value={newPresetData.name} onChange={e => setNewPresetData({...newPresetData, name: e.target.value})} maxLength={25} />
                  <input className="text-xs bg-white border border-amber-200 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-amber-500 transition-all w-full text-amber-900 placeholder:text-amber-700/50" placeholder="Примечание к релизу" value={newPresetData.desc} onChange={e => setNewPresetData({...newPresetData, desc: e.target.value})} maxLength={80} />
                  
                  <div className="flex gap-2 mt-1">
                    <button 
                      disabled={!newPresetData.name}
                      onClick={() => {
                        store.saveCustomPreset({ ...newPresetData, emoji: newPresetData.emoji || '🚀' });
                        setIsSavingPreset(false);
                        setNewPresetData({ name: '', desc: '', emoji: '🚀' });
                        setPresetTab('custom');
                        setActiveModule('funnels');
                      }}
                      className="bg-amber-500 text-white flex-1 text-xs font-bold py-2 rounded-md flex items-center justify-center gap-1 disabled:opacity-50 transition-all hover:bg-amber-600 active:scale-[0.98]"
                    >
                      Сохранить в Мои Пресеты
                    </button>
                    <button onClick={() => setIsSavingPreset(false)} className="px-3 text-xs font-medium text-amber-800 hover:text-amber-900 transition-colors">Отмена</button>
                  </div>
               </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 w-full p-6 pb-32 custom-scrollbar">

        {/* Modules List / Search Results */}
        {!activeTab && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-200">
            {/* When not searching, show Bento Grid */}
            {!searchQuery && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.modules.map(m => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => { setActiveModule(m.id); setSearchQuery(''); }}
                      className="flex flex-col items-start p-4 bg-background hover:bg-muted/30 rounded-2xl border border-border hover:border-indigo-200 transition-all group text-left shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <span className="font-semibold text-[13px] text-foreground mb-1">{m.label}</span>
                      <span className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{m.desc}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* When searching, show Lists for Modules & Actions */}
            {searchQuery && (searchResults.modules.length > 0 || searchResults.actions.length > 0) && (
              <div className="flex flex-col gap-4">
                {searchResults.modules.length > 0 && (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">Разделы ({searchResults.modules.length})</span>
                    {searchResults.modules.map(m => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => { setActiveModule(m.id); setSearchQuery(''); }}
                          className="flex items-center gap-4 p-3 w-full text-left bg-background hover:bg-muted/50 rounded-xl border border-transparent hover:border-border transition-all group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="font-semibold text-[13px] text-foreground">{m.label}</span>
                            <span className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-indigo-200 transition-colors shrink-0">
                            <ChevronLeft className="w-3 h-3 rotate-180" />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}

                {searchResults.actions.length > 0 && (
                   <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">Быстрые действия ({searchResults.actions.length})</span>
                     {searchResults.actions.map(a => {
                       const Icon = a.moduleIcon;
                       return (
                          <button
                            key={a.id}
                            onClick={() => { 
                              setActiveModule(a.moduleId); 
                              setSearchQuery(''); 
                              setScrollToId(a.id);
                            }}
                            className="flex items-center gap-3 p-2.5 px-3 w-full text-left bg-muted/20 hover:bg-muted/60 rounded-lg border border-transparent hover:border-border transition-all group"
                          >
                             <Icon className="w-4 h-4 text-muted-foreground group-hover:text-indigo-600 transition-colors" />
                             <div className="flex flex-col flex-1">
                               <span className="font-medium text-xs text-foreground">{a.label}</span>
                               <span className="text-[10px] text-muted-foreground">из {a.moduleLabel}</span>
                             </div>
                             <ChevronLeft className="w-3 h-3 rotate-180 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                          </button>
                       )
                     })}
                   </div>
                )}
              </div>
            )}

            {searchQuery && searchResults.modules.length === 0 && searchResults.actions.length === 0 && (
               <div className="text-center py-10 flex flex-col items-center">
                 <Search className="w-8 h-8 text-muted-foreground/30 mb-3" />
                 <p className="text-sm font-medium text-muted-foreground">По запросу &quot;{searchQuery}&quot; ничего не найдено.</p>
                 <button onClick={() => setSearchQuery('')} className="mt-4 text-xs font-medium text-indigo-600 hover:underline">Сбросить поиск</button>
               </div>
            )}
          </div>
        )}

        {/* Active Module Forms */}
        {activeTab && (
          <div className="animate-in slide-in-from-right-4 fade-in duration-300">
            <div className="flex items-center gap-3 mb-6 bg-muted/30 p-2 pl-1 rounded-xl border border-border">
              <button 
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-2 hover:bg-background rounded-lg transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Назад к меню
              </button>
              <div className="w-px h-4 bg-border" />
              <span className="text-[13px] font-bold text-foreground truncate">
                {MODULES.find(m => m.id === activeTab)?.label}
              </span>
            </div>

            {/* Individual Modules */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div id="action-ai-builder" className="scroll-mt-6 transition-all duration-500 rounded-xl">
                  <div className="flex justify-between items-center bg-purple-500/5 border border-purple-500/10 p-4 rounded-xl mb-6">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">AI Архитектор</h3>
                      <p className="text-xs text-muted-foreground mt-1">Панель управления умной сборкой страниц.</p>
                    </div>
                    <button 
                      onClick={() => setIsAiModalOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shrink-0"
                    >
                      <Sparkles className="w-4 h-4" /> Предложить
                    </button>
                  </div>
                  <PageBuilder />
                </div>
                <AiCommandModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
              </div>
            )}

            {activeTab === 'funnels' && (
              <div className="space-y-8 flex flex-col">
                <div id="action-seo-presets" className="scroll-mt-6 transition-all duration-500 rounded-xl">
                   <StrategyTab store={store} presetTab={presetTab} setPresetTab={setPresetTab} />
                </div>
                <MarketingTab store={store} openMatrix={openMatrix} />
                <div id="action-utm" className="scroll-mt-6 transition-all duration-500 rounded-xl">
                   <UtmTab />
                </div>
              </div>
            )}

            {activeTab === 'brand' && (
              <div className="space-y-8 flex flex-col">
                <div id="action-brand-voice" className="bg-background border border-border p-5 rounded-xl shadow-sm scroll-mt-6">
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-2 mb-2">Голос Бренда (Tone of Voice)</h3>
                    <p className="text-xs text-muted-foreground mb-4">Определите глобальный голос бренда. Тексты перепишутся сами.</p>
                    <textarea value={brandVoice} onChange={(e) => setBrandVoice(e.target.value)} className="bg-muted/30 border border-border text-foreground p-3 rounded-lg w-full h-24 resize-none focus:outline-none focus:ring-1 focus:ring-ring transition-all text-sm" />
                </div>
                <IntegratorTab store={store} />
              </div>
            )}

            {activeTab === 'cms' && <CmsTab />}
            {activeTab === 'prototypes' && <IndustryPrototypesTab />}
            {activeTab === 'ai' && <AiContentTab />}
            {activeTab === 'evolution' && <EvolutionTab />}
            {activeTab === 'xray' && <XRayTab />}
            {activeTab === 'state' && <StateObserverTab />}
            {activeTab === 'arch' && <ArchitectureTab />}
            {activeTab === 'labs' && <LaboratoryTab />}

          </div>
        )}
      </div>
    </div>
  );
}
