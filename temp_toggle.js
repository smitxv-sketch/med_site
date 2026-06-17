import React, { useState, useEffect } from 'react';
import { EvolutionDashboard } from './EvolutionDashboard';
import { Settings2, X, AlertTriangle, Fingerprint, Flame, RotateCcw, Lightbulb, Network, AppWindow, Target, HelpCircle, Smartphone, BookOpen, Dna } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';

export const ParameterTooltip = ({ title, text, mobileOnly = false }: { title: string, text: React.ReactNode, mobileOnly?: boolean }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="text-gray-400 hover:text-brand transition-colors p-1 -m-1 inline-flex items-center justify-center shrink-0 ml-1.5 focus:outline-none">
          <HelpCircle className="w-4 h-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4 text-left z-[10001] shadow-2xl border-gray-100" align="center" side="top" sideOffset={8}>
         <div className="flex justify-between items-start mb-2 gap-2">
            <h5 className="font-bold text-gray-900 text-[13px] leading-tight">{title}</h5>
            {mobileOnly && <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1"><Smartphone className="w-2.5 h-2.5"/> Mobile</span>}
         </div>
         <div className="text-xs text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
           {text}
         </div>
      </PopoverContent>
    </Popover>
  )
}
import { useUISettingsStore, ColorTheme } from '../store/uiSettingsStore';

export function DevModeToggle() {
  const store = useUISettingsStore();
  const { isDevMode, setIsDevMode, activeRuleId, applyRule } = store;
  
  const [isOpen, setIsOpen] = useState(false);

  // SECRET UNLOCK FEATURE
  const [unlockCode, setUnlockCode] = useState('');
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setUnlockCode((prev) => {
        const newCode = (prev + e.key).slice(-5);
        if (newCode.toLowerCase() === 'pitch') {
          store.unlockCommandCenter();
        }
        return newCode;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [store]);

  // Mobile secret unlock (5 quick taps on an invisible corner element)
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);

  const handleSecretTap = () => {
    const now = Date.now();
    if (now - lastTap > 700) {
      setTapCount(1);
    } else {
      setTapCount(prev => prev + 1);
      if (tapCount + 1 >= 5) {
        store.unlockCommandCenter();
        setTapCount(0);
      }
    }
    setLastTap(now);
  };


  
  const [activeTab, setActiveTab] = useState<'director' | 'marketing' | 'integrator' | 'utm' | 'strapi' | 'evolution'>('director');
  const [generation, setGeneration] = useState(1);
  const [presetTab, setPresetTab] = useState<'base' | 'custom'>('base');
  const [isSavingPreset, setIsSavingPreset] = useState(false);
  const [newPresetData, setNewPresetData] = useState({ name: '', desc: '', emoji: '🚀' });

  if (!store.isCommandCenterUnlocked) {
    return (
      <div 
        onClick={handleSecretTap}
        className="fixed bottom-0 left-0 w-16 h-16 z-[9999] opacity-0"
        aria-hidden="true"
      />
    );
  }
  const THEMES: { id: ColorTheme; name: string; hex: string }[] = [
    { id: 'green', name: 'Источник (Классика)', hex: '#4CAF50' },
    { id: 'blue', name: 'Медицина (Доверие)', hex: '#03A9F4' },
    { id: 'purple', name: 'Премиум (Уверенность)', hex: '#673AB7' },
    { id: 'rose', name: 'Забота (Теплота)', hex: '#E91E63' },
  ];

  const BLOCKS: any[] = [
    { id: 'homePageConcept', label: 'Концепция главной', variants: ['classic', 'immersive'], format: (v: string) => v === 'classic' ? 'Классика' : 'Иммерсивный', tooltip: { title: 'Концепция главной страницы', text: 'Классика — стандартная структура 1 экраном (поиск, услуги). Иммерсивный — многослойные компоненты, акцент на фото и эстетику клиники.' } },
    { id: 'heroMobileVariant', label: '📱 Главный баннер / Герой', variants: ['A', 'B', 'C', 'D'], format: (v: string) => v === 'D' ? 'D (AI)' : v, tooltip: { title: 'Главный баннер (Hero Block)', text: 'A: Классический слайдер.\nB: Bento grid (мозаика).\nC: Широкий видео-блок без отступов.\nD: AI генерация или персональная подборка.' } },
    { id: 'quickActionsVariant', label: 'Быстрые ссылки', variants: ['none', 'A', 'B', 'C'], format: (v: string) => v === 'none' ? 'Выкл' : v, tooltip: { title: 'Иконки быстрых действий', text: 'A: Квадратные плитки.\nB: Плавающие (Apple Style).\nC: Bento-стиль.\nnone: Скрыть блок.' } },
    { id: 'doctorsSectionVariant', label: 'Карусель врачей', variants: ['A', 'B'], format: (v: string) => v, tooltip: { title: 'Блок врачей', text: 'Архитектура карточек врачей: вертикальные компактные (A) или широкие с крупным фото (B).' } },
    { id: 'directionsSectionVariant', label: 'Блок направлений', variants: ['A', 'B', 'C'], format: (v: string) => v, tooltip: { title: 'Блок направлений', text: 'Архитектура каталога услуг. Расположение иконок и распределение колонок (например, сетка или скролл).' } },
    { id: 'promotionsSectionVariant', label: 'Блок акций', variants: ['A', 'B', 'C'], format: (v: string) => v, tooltip: { title: 'Спецпредложения', text: 'Подача акций: мелкие стикеры или крупные баннеры.' } },
    { id: 'bottomNavVariant', label: 'Нижнее меню (App)', variants: ['A', 'B', 'C', 'D'], format: (v: string) => v, tooltip: { title: 'Bottom Navigation', text: 'Дизайн навигации, как в мобильном приложении: с выступом, заливкой или iOS blur.' }, mobileOnly: true }
  ];

  function InsightCard({ title, children, variant = 'amber' }: { title: string, children: React.ReactNode, variant?: 'amber' | 'neutral' | 'purple' }) {
    const bg = variant === 'amber' ? 'bg-amber-50 border-amber-100' : variant === 'purple' ? 'bg-purple-50 border-purple-100' : 'bg-gray-50 border-gray-200';
    const textTitle = variant === 'amber' ? 'text-amber-900' : variant === 'purple' ? 'text-purple-900' : 'text-gray-900';
    const textBody = variant === 'amber' ? 'text-amber-800/90' : variant === 'purple' ? 'text-purple-800/90' : 'text-gray-600';
    const TitleIcon = variant === 'purple' ? AppWindow : Lightbulb;
    const iconColor = variant === 'amber' ? 'text-amber-500' : variant === 'purple' ? 'text-purple-600' : 'text-gray-500';

    return (
      <div className={`${bg} rounded-xl p-4 border flex items-start gap-3 w-full mt-2`}>
        <TitleIcon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
        <div className="flex-1">
          <p className={`text-xs font-bold mb-1 ${textTitle}`}>{title}</p>
          <div className={`text-[11px] leading-relaxed font-medium ${textBody}`}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setIsDevMode(!isDevMode);
          if (!isDevMode) setIsOpen(true);
        }}
        className={`fixed bottom-4 left-4 z-[9999] w-12 h-12 items-center justify-center shadow-lg transition-all border ${
          isOpen ? 'hidden md:flex' : 'flex'
        } ${
          isDevMode 
            ? 'bg-brand text-brand-fg border-brand shadow-brand/30 ring-4 ring-brand/10' 
            : 'bg-white text-gray-400 border-gray-200 hover:text-brand hover:border-brand/30 hover:shadow-xl'
        }`}
        style={{ borderRadius: store.appRadius > 0 ? Math.max(store.appRadius, 16) + 'px' : '12px' }}
        title="Command Center"
      >
        <Settings2 className={`w-5 h-5 transition-transform duration-500 ${isDevMode ? 'rotate-90' : ''}`} />
      </button>

      {/* Docked Sidebar Command Center */}
      {isDevMode && isOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 z-[9997] backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />
          <div 
            className="fixed inset-y-0 right-0 z-[9998] w-full max-w-[480px] bg-white shadow-2xl flex flex-col transition-all duration-500 animate-in slide-in-from-right"
          >
            {/* Header */}
            <div className="flex flex-col p-6 border-b border-gray-100 bg-white shrink-0">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">Command Center</h3>
                  <p className="text-xs font-semibold text-brand uppercase tracking-wider mt-0.5">Marketing UI Engine v5</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => store.resetToDefaults()} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-brand-orange transition-colors"
                    title="Сбросить всё к заводским настройкам"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Role-Based Tabs (Macro Context) */}
              <div className="relative mt-2">
                
                <div 
                  className="flex overflow-x-auto overflow-y-visible hide-scrollbar snap-x snap-mandatory bg-gray-100/90 p-1.5 gap-1 shadow-inner transition-theme scroll-smooth relative items-center" 
                  style={{ borderRadius: 'var(--app-radius)' }}
                >
                <button
                  onClick={() => setActiveTab('director')}
                  className={`flex-none w-[105px] py-3 px-1 snap-center flex flex-col items-center gap-1.5 text-[12px] font-bold transition-all duration-300 relative ${activeTab === 'director' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5 text-brand scale-[1.02] z-10' : 'text-gray-500 hover:text-gray-800 hover:bg-white/60 active:scale-95'}`}
                  style={{ borderRadius: 'var(--radius-xl)' }}
                >
                  <Network className={`w-5 h-5 ${activeTab === 'director' ? 'text-brand' : 'opacity-70'}`} />
                  <span className="tracking-tight">Стратегия</span>
                </button>
                <button
                  onClick={() => setActiveTab('marketing')}
                  className={`flex-none w-[105px] py-3 px-1 snap-center flex flex-col items-center gap-1.5 text-[12px] font-bold transition-all duration-300 relative ${activeTab === 'marketing' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5 text-orange-500 scale-[1.02] z-10' : 'text-gray-500 hover:text-gray-800 hover:bg-white/60 active:scale-95'}`}
                  style={{ borderRadius: 'var(--radius-xl)' }}
                >
                  <Flame className={`w-5 h-5 ${activeTab === 'marketing' ? 'text-orange-500' : 'opacity-70'}`} />
                  <span className="tracking-tight">Продажи</span>
                </button>
                <button
                  onClick={() => setActiveTab('integrator')}
                  className={`flex-none w-[105px] py-3 px-1 snap-center flex flex-col items-center gap-1.5 text-[12px] font-bold transition-all duration-300 relative ${activeTab === 'integrator' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5 text-gray-900 scale-[1.02] z-10' : 'text-gray-500 hover:text-gray-800 hover:bg-white/60 active:scale-95'}`}
                  style={{ borderRadius: 'var(--radius-xl)' }}
                >
                  <Settings2 className={`w-5 h-5 ${activeTab === 'integrator' ? 'text-gray-900' : 'opacity-70'}`} />
                  <span className="tracking-tight">Брендинг</span>
                </button>
                <button
                  onClick={() => setActiveTab('strapi')}
                  className={`flex-none w-[105px] py-3 px-1 snap-center flex flex-col items-center gap-1.5 text-[12px] font-bold transition-all duration-300 relative ${activeTab === 'strapi' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5 text-purple-600 scale-[1.02] z-10' : 'text-gray-500 hover:text-gray-800 hover:bg-white/60 active:scale-95'}`}
                  title="Управление контентом"
                  style={{ borderRadius: 'var(--radius-xl)' }}
                >
                  <AppWindow className={`w-5 h-5 ${activeTab === 'strapi' ? 'text-purple-600' : 'opacity-70'}`} />
                  <span className="tracking-tight">CMS</span>
                </button>
                <button
                  onClick={() => setActiveTab('evolution')}
                  className={`flex-none w-[105px] py-3 px-1 snap-center flex flex-col items-center gap-1.5 text-[12px] font-bold transition-all duration-300 relative ${activeTab === 'evolution' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5 text-pink-600 scale-[1.02] z-10' : 'text-gray-500 hover:text-gray-800 hover:bg-white/60 active:scale-95'}`}
                  title="AI Эволюция стиля"
                  style={{ borderRadius: 'var(--radius-xl)' }}
                >
                  <Dna className={`w-5 h-5 ${activeTab === 'evolution' ? 'text-pink-600' : 'opacity-70'}`} />
                  <span className="tracking-tight">Эволюция</span>
                </button>
                <button
                  onClick={() => setActiveTab('utm')}
                  className={`flex-none w-[105px] py-3 px-1 snap-center flex flex-col items-center gap-1.5 text-[12px] font-bold transition-all duration-300 relative ${activeTab === 'utm' ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5 text-blue-600 scale-[1.02] z-10' : 'text-gray-500 hover:text-gray-800 hover:bg-white/60 active:scale-95'}`}
                  title="Персонализация (UTM)"
                  style={{ borderRadius: 'var(--radius-xl)' }}
                >
                  <Target className={`w-5 h-5 ${activeTab === 'utm' ? 'text-blue-600' : 'opacity-70'}`} />
                  <span className="tracking-tight">Context</span>
                </button>
                {/* Visual cue to indicate scrolling without completely masking content */}
                <div className="sticky right-0 flex-none w-4 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" aria-hidden="true" />
              </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto w-full custom-scrollbar p-6 bg-gray-50/30 pb-36">
              {store.hasUnsavedChanges && (
                <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col gap-3 animate-in slide-in-from-top-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-xs font-bold text-orange-900">У вас есть несохраненные изменения!</p>
                      <p className="text-[10px] text-orange-700/80">Сохраните их как пресет (тестовый деплой).</p>
                    </div>
                  </div>
                  {isSavingPreset ? (
                     <div className="flex flex-col gap-2 relative">
                        <button onClick={() => setIsSavingPreset(false)} className="absolute -top-6 right-0 text-orange-400"><X className="w-4 h-4"/></button>
                        <input className="text-xs border p-2 rounded-md" placeholder="Название (например: Черная Пятница)" value={newPresetData.name} onChange={e => setNewPresetData({...newPresetData, name: e.target.value})} maxLength={25} />
                        <input className="text-xs border p-2 rounded-md" placeholder="Комментарий / Описание" value={newPresetData.desc} onChange={e => setNewPresetData({...newPresetData, desc: e.target.value})} maxLength={80} />
                        <div className="flex gap-2">
                          <input className="text-xs w-12 border p-2 text-center rounded-md" placeholder="Эмодзи" value={newPresetData.emoji} onChange={e => setNewPresetData({...newPresetData, emoji: e.target.value})} maxLength={2} />
                          <button 
                            disabled={!newPresetData.name}
                            onClick={() => {
                              store.saveCustomPreset(newPresetData);
                              setIsSavingPreset(false);
                              setNewPresetData({ name: '', desc: '', emoji: '🚀' });
                              setPresetTab('custom');
                              setActiveTab('director');
                            }}
                            className="bg-orange-500 text-white flex-1 text-xs font-bold rounded-md flex items-center justify-center gap-1 disabled:opacity-50 disabled:bg-orange-500"
                          ><AppWindow className="w-4 h-4"/> Создать деплой-пресет</button>
                        </div>
                     </div>
                  ) : (
                    <button 
                       onClick={() => setIsSavingPreset(true)}
                       className="bg-orange-500 text-white rounded-lg py-2 text-xs font-bold shadow-sm hover:bg-orange-600 transition-colors"
                    >Собрать свой пресет и Сохранить</button>
                  )}
                </div>
              )}
              
              {/* === TAB: EVOLUTION (GENETIC PROTOTYPE) === */}
              {activeTab === 'evolution' && (
                <EvolutionDashboard />
              )}
              
              {/* === TAB: STRATEGY (DIRECTOR) === */}
              {activeTab === 'director' && (
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
                      {store.presets.filter(p => presetTab === 'base' ? !p.isCustom : p.isCustom).map(preset => {
                        const isActive = store.activePresetId === preset.id;
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
                               <button 
                                 onClick={(e) => { e.stopPropagation(); store.deleteCustomPreset(preset.id); }}
                                 className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border hover:bg-red-50 text-red-500 scale-0 group-hover:scale-100 transition-transform"
                               >
                                 <X className="w-3 h-3" />
                               </button>
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
              )}

              {/* === TAB: MARKETING (GROWTH) === */}
              {activeTab === 'marketing' && (
                <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2">
                  
                  <InsightCard title="Инструменты повышения конверсии">
                    Инструменты напрямую управляют психологией принятия решения (CVR). Управляйте ими осознанно. Разным сегментам трафика нужны разные триггеры.</InsightCard>

                  {/* Social Proof */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-sm font-black text-gray-900 mb-1 flex items-center">Факторы доверия (Social Proof)<ParameterTooltip title="Social Proof (Социальные доказательства)" text="Влияет на количество 'звездочек', отзывов и виджетов доверия (например, значок 'ПроДокторов'). 'Агрессивный' режим буквально бомбардирует пользователя триггерами доверия, что полезно для холодного трафика. 'Минимальный' убирает лишний шум для лояльных клиентов." /></h4>
                    <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                      Управление плотностью социальных доказательств (рейтинги, медали, отзывы) на первом экране.
                    </p>
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                      {[
                        { id: 'minimal', label: 'Скрыто', emoji: '🤫' },
                        { id: 'balanced', label: 'Баланс', emoji: '⭐' },
                        { id: 'aggressive', label: 'Агрессивно', emoji: '🏆' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => store.setKey('socialProofLevel', s.id as any)}
                          className={`flex-1 py-3 text-xs font-bold transition-all rounded-md flex flex-col items-center gap-1 ${store.socialProofLevel === s.id ? 'bg-white shadow text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <span className="text-xl mb-1">{s.emoji}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {store.socialProofLevel === 'aggressive' && (
                       <p className="mt-3 text-[10px] text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100">
                         🔥 Агрессивное внедрение Social Proof — мощный инструмент для холодного SEO или платного трафика.
                       </p>
                    )}
                  </section>

                  {/* Pricing Strategy */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-sm font-black text-gray-900 mb-1 flex items-center">Показ стоимости (Pricing)<ParameterTooltip title="Стратегия ценообразования (Pricing Strategy)" text="Определяет, как именно отображается прайс-лист.

'Прозрачный': показывает цены сразу (отсеивает нецелевых).
'Скрытый': Формат Value-first. Заставляет сначала перейти к форме-заявке. Фокус на продажу первой консультации." /></h4>
                    <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                      Смена модели демонстрации прайса. Прямой инструмент управления ожиданиями.
                    </p>
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                      {[
                        { id: 'open', label: 'Открыто', emoji: '🏷️' },
                        { id: 'from', label: 'Цены "От"', emoji: '📉' },
                        { id: 'hidden', label: 'Скрыто', emoji: '🤐' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => store.setKey('pricingStrategy', s.id as any)}
                          className={`flex-1 py-3 text-xs font-bold transition-all rounded-md flex flex-col items-center gap-1 ${store.pricingStrategy === s.id ? 'bg-white shadow text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <span className="text-xl mb-1">{s.emoji}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {store.pricingStrategy === 'hidden' && (
                       <p className="mt-3 text-[10px] text-amber-600 bg-amber-50 p-2 rounded border border-amber-100">
                         ⚠️ Фокус на продажу первой консультации (или бесплатный чек-ап). Работает в высококонкурентных сложных нишах.
                       </p>
                    )}
                  </section>

                  {/* Urgency */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-sm font-black text-gray-900 mb-1 flex items-center">Триггеры срочности (FOMO)<ParameterTooltip title="Fear OF Missing Out (Упущенная выгода)" text="Манипулятивные паттерны создания искусственного дефицита.

'Жестко': Включает таймеры обратного отсчета и красные индикаторы ('осталось 2 места'). Использовать с осторожностью, только в период проведения реальных промо-акций (например, 'черная пятница')." /></h4>
                    <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                      Внедрение искусственного дефицита времени и мест для форсирования конверсии.
                    </p>
                    <div className="flex bg-gray-50 p-1 rounded-lg">
                      {[
                        { id: 'none', label: 'Нет', emoji: '🧘' },
                        { id: 'soft', label: 'Намеки', emoji: '⏳' },
                        { id: 'hard', label: 'Жесткий', emoji: '🚨' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => {
                            store.setKey('urgencyLevel', s.id as any);
                            store.setKey('marketingTriggers', s.id !== 'none');
                          }}
                          className={`flex-1 py-3 text-xs font-bold transition-all rounded-md flex flex-col items-center gap-1 ${store.urgencyLevel === s.id ? 'bg-white shadow text-[#E91E63]' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <span className="text-xl mb-1">{s.emoji}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                    {store.urgencyLevel === 'hard' && (
                       <p className="mt-3 text-[10px] text-rose-600 bg-rose-50 p-2 rounded border border-rose-100">
                         🚨 Осторожно: Включает красные стикеры "Осталось 2 места" и таймеры. Запускать только на период коротких распродаж!
                       </p>
                    )}
                  </section>

                  {/* Layout Blocks Selector */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-[11px] font-black uppercase text-gray-400 mb-4">Архитектура воронок (Блоки)</h4>
                    <div className="space-y-5">
                      {BLOCKS.map(block => (
                        <div key={block.id}>
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center"><label className="text-xs font-bold text-gray-700">{block.label}</label>{block.tooltip && <ParameterTooltip title={block.tooltip.title} text={block.tooltip.text} mobileOnly={block.mobileOnly} />}</div>
                            <span className="text-[11px] font-semibold text-brand bg-brand/10 px-1.5 py-0.5 rounded uppercase">{store[block.id as keyof typeof store] as string}</span>
                          </div>
                          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                            {block.variants.map((v: string) => {
                              const isActive = store[block.id as keyof typeof store] === v;
                              return (
                                <button
                                  key={v}
                                  onClick={() => store.setKey(block.id, v)}
                                  className={`flex-1 py-1.5 text-xs font-semibold transition-all rounded-md ${isActive ? 'bg-white shadow relative text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                  {block.format(v)}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* === TAB: INTEGRATOR (FINE TUNING) === */}
              {activeTab === 'integrator' && (
                <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2">
                  
                  <InsightCard title="Расширенные параметры бренда" variant="neutral">
                    Прямой доступ к фундаментальным визуальным настройкам: типографика, плотность элементов и глубина интерфейса.
                  </InsightCard>

                  {/* Typography & Densities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <section className="bg-white p-4 transition-theme border-app flex flex-col" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                      <h4 className="text-[11px] font-black uppercase text-gray-400 mb-3 flex items-center">Шрифт (Typography)<ParameterTooltip title="Гарнитуры (Шрифты)" text="Сразу меняет настроение бренда:

Inter: Системный, техничный (для сложных платформ).
Outfit: Инновационный (Apple-style, стартапы).
Nunito: Округлый, очень дружелюбный (детская клиника).
Playfair: Строгий с засечками (премиум, косметология, журнальный стиль)." /></h4>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-2 flex-1">
                        {[
                          { id: 'inter', name: 'Системный (Inter)' },
                          { id: 'outfit', name: 'Современный (Outfit)' },
                          { id: 'nunito', name: 'Округлый (Nunito)' },
                          { id: 'playfair', name: 'С Засечками (Playfair)' }
                        ].map(f => (
                          <button
                            key={f.id}
                            onClick={() => store.setKey('fontFamily', f.id as any)}
                            className={`w-full text-left px-3 py-2 text-[13px] font-bold transition-all rounded-lg border ${store.fontFamily === f.id ? 'border-brand bg-brand/5 text-brand shadow-sm' : 'border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                            style={{ fontFamily: f.id === 'inter' ? '"Inter", sans-serif' : f.id === 'outfit' ? '"Outfit", sans-serif' : f.id === 'nunito' ? '"Nunito", sans-serif' : '"Playfair Display", serif' }}
                          >
                            {f.name}
                          </button>
                        ))}
                      </div>
                    </section>
                    
                    <div className="flex flex-col gap-4">
                      {/* Density */}
                      <section className="bg-white p-4 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                        <h4 className="text-[11px] font-black uppercase text-gray-400 mb-3 flex justify-between items-center">
                          <span className="flex items-center">Воздух (Density) <ParameterTooltip title="Информационная плотность" text="Общий коэффициент внутренних отступов (padding) и скруглений. 'Воздушный' стиль нужен для премиалочки (медленный скролл). 'Плотный' вмещает больше инфы на 1 экран (хорошо для агрегаторов-каталогов)." /></span> <span className="text-brand font-mono">{store.layoutDensity.toFixed(2)}x</span>
                        </h4>
                        
                        <div className="flex flex-col gap-4">
                          <input 
                            type="range" 
                            min="0.5" 
                            max="2.0" 
                            step="0.05"
                            value={store.layoutDensity}
                            onChange={(e) => store.setKey('layoutDensity', parseFloat(e.target.value))}
                            className="w-full accent-brand h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 0.75, name: 'Плотный', emoji: '📦' },
                              { id: 1.0, name: 'Стандарт', emoji: '📖' },
                              { id: 1.5, name: 'Свободный', emoji: '✨' }
                            ].map(s => (
                                <button
                                  key={s.id}
                                  onClick={() => store.setKey('layoutDensity', s.id)}
                                  className={`flex flex-col items-center justify-center p-2 text-[10px] font-semibold transition-all rounded-lg border ${store.layoutDensity === s.id ? 'bg-gray-900 border-gray-900 text-white shadow-sm' : 'bg-transparent border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                >
                                  <span className="mb-0.5">{s.emoji}</span>
                                  {s.name}
                                </button>
                            ))}
                          </div>
                        </div>
                      </section>

                      {/* Shadows */}
                      <section className="bg-white p-4 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                        <h4 className="text-[11px] font-black uppercase text-gray-400 mb-3 flex items-center">Глубина Узлов (Тени)<ParameterTooltip title="Тени и Бордюры" text="Влияет на эффект 3D-глубины.

Soft: мягкие парящие тени (премиум).
Neo: грубые черные бордеры и жесткие тени (брутализм, молодежные проекты).
None/Bordered: Плоский дизайн." /></h4>
                        <div className="flex flex-wrap gap-2 p-2">
                          {[
                            { id: 'none', shadow: 'none', border: '1px solid #e5e7eb' },
                            { id: 'soft', shadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid transparent' },
                            { id: 'hard', shadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid transparent' },
                            { id: 'bordered', shadow: 'none', border: '1px solid #d1d5db' },
                            { id: 'neo', shadow: '4px 4px 0px 0px rgba(0,0,0,0.9)', border: '2px solid #000' }
                          ].map(s => (
                            <button
                              key={s.id}
                              onClick={() => store.setKey('shadowStyle', s.id as any)}
                              className={`flex-1 min-w-[20%] md:min-w-[30%] h-9 transition-all rounded-md capitalize text-[10px] font-semibold flex items-center justify-center ${store.shadowStyle === s.id ? 'bg-brand/10 text-brand ring-2 ring-brand ring-offset-2' : 'text-gray-500 bg-white hover:bg-gray-50'}`}
                              style={{ boxShadow: s.shadow, border: s.border }}
                              title={s.id}
                            >
                              {s.id.substring(0,6)}
                            </button>
                          ))}
                        </div>
                      </section>
                      {/* Animation Tokens */}
                      <section className="bg-white p-4 transition-theme border-app mt-4" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                        <h4 className="text-[11px] font-black uppercase text-gray-400 mb-3 flex items-center">Стиль анимаций<ParameterTooltip title="Моушн-дизайн" text="Контролирует кривые Безье при анимации модалок и переходов.

Spring: упругая анимация с отскоком (игриво, доверительно).
Smooth: медленное гладкое появление (дорогие услуги).
Instant: отключение анимаций (для пожилой аудитории, где движение может дезориентировать)." /></h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: 'default', label: 'Обычный', desc: 'Универсально' },
                            { id: 'spring', label: 'Пружина', desc: 'Детский/Игривый' },
                            { id: 'smooth', label: 'Плавно', desc: 'Премиум' },
                            { id: 'instant', label: 'Мгновенно', desc: 'Скачком' }
                          ].map(s => (
                            <button
                              key={s.id}
                              onClick={() => store.setKey('animationTheme', s.id as any)}
                              className={`flex flex-col items-center justify-center p-2.5 transition-all rounded-xl border ${store.animationTheme === s.id ? 'bg-brand/5 border-brand text-brand shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                            >
                              <span className="text-[11px] font-bold mb-0.5">{s.label}</span>
                              <span className="text-[9px] opacity-70 text-center leading-tight">{s.desc}</span>
                            </button>
                          ))}
                        </div>
                      </section>
                    </div>
                  </div>

                  {/* Corner Radius */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <div className="flex justify-between items-end mb-3">
                      <h4 className="text-[11px] font-black uppercase text-gray-400 flex items-center">Скругления (Radius)<ParameterTooltip title="Apple-style Radius" text="От полного квадрата (строгая корпорация) до пилюль (максимально 'friendly' дизайн). Изменяется пропорционально во всех элементах (кнопки, карточки, чекбоксы)." /></h4>
                      <span className="text-xs font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-full">{store.appRadius}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="32" step="2"
                      value={store.appRadius}
                      onChange={(e) => store.setAppRadius(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand" 
                    />
                    <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                      <span>0px (Строго)</span>
                      <span>32px (Мягко)</span>
                    </div>
                  </section>

                  {/* Themes Editor */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-[11px] font-black uppercase text-gray-400 mb-4 flex items-center">Брендовый цвет (HSL)<ParameterTooltip title="Smart HSL Palettes" text="В основе лежит продвинутая HSL-математика. Выбирая один бренд-цвет, система автоматически генерирует гармоничные оттенки для бордеров, плашек (10% opacity) и фонов, сохраняя доступность контраста." /></h4>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-4">
                      {THEMES.map(t => (
                        <button
                          key={t.id}
                          onClick={() => store.setColorTheme(t.id)}
                          className={`flex flex-col items-center gap-2 p-2 border transition-all rounded-xl ${store.colorTheme === t.id ? 'border-brand bg-brand/5 shadow-sm' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`}
                        >
                          <div className="w-8 h-8 rounded-full shadow-inner ring-2 ring-white/50" style={{ backgroundColor: t.hex }} />
                          <span className={`text-[9px] font-bold text-center leading-tight ${store.colorTheme === t.id ? 'text-brand' : 'text-gray-500'}`}>{t.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div
                        onClick={() => store.setColorTheme('custom')}
                        className={`w-full flex items-center justify-between p-3 border transition-all rounded-xl cursor-pointer ${store.colorTheme === 'custom' ? 'border-brand bg-brand/5 text-brand shadow-sm' : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-7 h-7 rounded-md shadow-inner ring-1 ring-black/10 overflow-hidden flex-shrink-0" style={{ backgroundColor: `hsl(${store.customHue}, ${store.customSaturation}%, ${store.customLightness}%)` }}>
                            <input 
                              type="color"
                              className="absolute -top-2 -left-2 w-12 h-12 opacity-0 cursor-pointer"
                              onChange={(e) => {
                                const hex = e.target.value;
                                let r = 0, g = 0, b = 0;
                                if (hex.length === 7) {
                                  r = parseInt(hex.slice(1, 3), 16);
                                  g = parseInt(hex.slice(3, 5), 16);
                                  b = parseInt(hex.slice(5, 7), 16);
                                }
                                r /= 255; g /= 255; b /= 255;
                                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                                let h = 0, s = 0;
                                const l = (max + min) / 2;
                                if (max !== min) {
                                  const d = max - min;
                                  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                                  switch (max) {
                                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                                    case g: h = (b - r) / d + 2; break;
                                    case b: h = (r - g) / d + 4; break;
                                  }
                                  h /= 6;
                                }
                                store.setKey('customHue', Math.round(h * 360));
                                store.setKey('customSaturation', Math.round(s * 100));
                                store.setKey('customLightness', Math.round(l * 100));
                                store.setColorTheme('custom');
                              }}
                            />
                          </div>
                          <span className="text-[13px] font-bold">Конструктор цвета</span>
                        </div>
                        <Settings2 className="w-4 h-4 text-gray-400" />
                      </div>

                      {store.colorTheme === 'custom' && (
                        <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div>
                            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-2">
                              <span>Оттенок (Hue)</span>
                              <span className="text-brand">{store.customHue}°</span>
                            </div>
                            <input type="range" min="0" max="360" value={store.customHue} onChange={(e) => store.setKey('customHue', Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand" />
                          </div>
                          <div>
                            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-2">
                              <span>Насыщенность</span>
                              <span className="text-brand">{store.customSaturation}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={store.customSaturation} onChange={(e) => store.setKey('customSaturation', Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand" />
                          </div>
                          <div>
                            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-2">
                              <span>Яркость</span>
                              <span className="text-brand">{store.customLightness}%</span>
                            </div>
                            <input type="range" min="0" max="100" value={store.customLightness} onChange={(e) => store.setKey('customLightness', Number(e.target.value))} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand" />
                          </div>
                        </div>
                      )}
                    </div>
                  </section>


                </div>
              )}

              {/* === TAB: UTM / CONTEXT === */}
              {activeTab === 'utm' && (
                <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 pb-12">
                  <div className="bg-blue-50 text-blue-900 p-4 rounded-xl text-sm border border-blue-100 flex gap-3">
                    <Target className="w-5 h-5 flex-shrink-0 text-blue-600 mt-0.5" />
                    <div>
                      <strong className="block mb-1">Маршрутизация (UI/UX)</strong>
                      Система автоматически подстраивается под UTM-метки, время суток и другие контекстные переменные. Эмуляция работы Context Engine.
                    </div>
                  </div>

                  <InsightCard title="Прямые ссылки для тестов (UTM)" variant="neutral">
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

                  <InsightCard title="Time-based Recommendations" variant="neutral">
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

                  <InsightCard title="Exit Intent Strategy" variant="neutral">
                    <p className="mb-2 text-xs">Удержание уходящего пользователя (эмуляция "передумал покупать").</p>
                    <button className="w-full py-2 bg-gray-900 text-white text-xs font-bold rounded-lg shadow-md hover:bg-gray-800">
                      Симулировать попытку закрытия вкладки
                    </button>
                  </InsightCard>
                </div>
              )}

              {/* === TAB: STRAPI (QUICK WINS) === */}
              {activeTab === 'strapi' && (
                <div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 pb-12">
                  <div className="bg-purple-50 text-purple-900 p-4 rounded-xl text-sm border border-purple-100 flex gap-3">
                    <AppWindow className="w-5 h-5 flex-shrink-0 text-purple-600 mt-0.5" />
                    <div>
                      <strong className="block mb-1">Принт-скрины будущего CMS (CMS)</strong>
                      Вы просили сделать "Быстрые победы". Здесь показано, как эти инструменты будут выглядеть для маркетолога внутри панели администратора.
                    </div>
                  </div>

                  <InsightCard title="AI Writing Assistant (Ярус 1-2)" variant="purple">
                    <p className="mb-4 text-xs">Внедряется прямо в текстовые поля CMS (WYSIWYG редактор). Автоматически корректирует тон, орфографию и генерирует СЕО мета-теги.</p>
                    <div className="bg-white border rounded-lg p-3 text-sm shadow-sm opacity-90">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">SEO: Мета Описание</span>
                        <button className="text-purple-600 bg-purple-50 px-2 py-1 flex gap-1 items-center rounded-md hover:bg-purple-100 text-xs font-bold transition-colors"><Lightbulb className="w-3 h-3" /> Сгенерировать AI</button>
                      </div>
                      <div className="p-2 border rounded bg-gray-50 text-gray-600 text-xs font-normal">
                        Профессиональное лечение зубов в Челябинске. Консультация специалиста.
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
                          <div className="text-[11px] text-gray-500 font-normal line-clamp-2">Долго ждал в приемной, хотя по телефону обещали принять вовремя.</div>
                        </div>
                      </div>
                      <button className="text-xs text-brand font-semibold text-center mt-2 decoration-dashed underline">Перейти в Модуль Отзывов</button>
                    </div>
                  </InsightCard>

                  <InsightCard title="Social Media MVP" variant="purple">
                    <p className="mb-4 text-xs">Календарь публикаций и генерация постов для ВК и Телеграм на основе добавленных акций и новостей в CMS.</p>
                    <div className="grid grid-cols-2 gap-2 font-normal">
                       <div className="bg-blue-50 border border-blue-100 p-2 rounded text-center">
                         <div className="text-[10px] text-blue-600 uppercase font-bold mb-1">Среда 14:00</div>
                         <div className="text-xs font-medium text-blue-900">Новость о новом MRI</div>
                       </div>
                       <div className="bg-gray-50 border border-white p-2 rounded text-center opacity-50 border-dashed">
                         <div className="text-[10px] text-gray-400 font-bold mb-1">Пятница 10:00</div>
                         <button className="text-[10px] underline">AI План</button>
                       </div>
                    </div>
                  </InsightCard>

                  <InsightCard title="Change Log & Attribution" variant="purple">
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
                        <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">+1.2% Conv</span>
                      </div>
                    </div>
                  </InsightCard>
                </div>
              )}
            </div>

            {/* Simulated Publish Action */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
               <div className="flex flex-col gap-1.5">
                 <button
                   className="w-full font-bold text-sm bg-brand text-brand-fg py-3 rounded-xl shadow-md transition-all hover:bg-brand/90 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden group"
                   onClick={() => {
                     const btn = document.getElementById('publish-btn-text');
                     if (btn) btn.innerText = 'Сохранение в CMS...';
                     setTimeout(() => {
                       if (btn) btn.innerText = 'Отправка Webhook... (Build)';
                       setTimeout(() => {
                         if (btn) btn.innerText = 'Опубликовано! 🎉';
                         setTimeout(() => {
                           if (btn) btn.innerText = 'Опубликовать изменения';
                         }, 2500);
                       }, 1500);
                     }, 1500);
                   }}
                 >
                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                   <span id="publish-btn-text">Опубликовать изменения</span>
                 </button>
                 <a 
                   href="/" 
                   target="_blank" 
                   rel="noreferrer"
                   className="text-center text-[11px] text-gray-500 hover:text-brand underline decoration-gray-300 hover:decoration-brand underline-offset-2 transition-colors py-1 flex items-center justify-center gap-1.5"
                 >
                   <AppWindow className="w-3 h-3" />
                   Открыть проект по прямой ссылке
                 </a>
               </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
