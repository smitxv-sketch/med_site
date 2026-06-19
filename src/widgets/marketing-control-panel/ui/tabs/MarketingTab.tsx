import React from 'react';
import { Filter, Sparkles, BoxSelect } from 'lucide-react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { useCmsStore } from '@/shared/store/cmsStore';
import { ParameterTooltip, InsightCard } from '../components/SharedComponents';
import { WIDGETS_REGISTRY } from '@/shared/config/widgetsRegistry';
import { PRIMITIVE } from '@/shared/config/designTokens';

type Props = { store: any; BLOCKS?: any; THEMES?: any; presetTab?: any; setPresetTab?: any; openMatrix?: () => void };

export const MarketingTab = ({ store, openMatrix }: Props) => { 
  const { pageBlocks, setPageBlocks } = useCmsStore();

  const updateBlockProps = (id: string, newProps: any) => {
    setPageBlocks(pageBlocks.map(b => b.id === id ? { ...b, props: { ...b.props, ...newProps } } : b));
  };

  return (
  <>

<div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2 pb-12">
                  
                  <InsightCard title="Pipeline & Funnels">
                    Управление глобальной конверсионной воронкой. Ниже представлены все активные блоки на странице. Настраивайте их <b>Смысловой Акцент (Intent)</b>, чтобы формировать прогрессию от прогрева к продаже.
                  </InsightCard>

                  {/* Pipeline Builder */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-sm font-black text-gray-900 mb-1 flex items-center gap-2">
                       <Filter className="w-4 h-4 text-orange-500" />
                       Матричная Архитектура (Active Pipeline)
                    </h4>
                    <div className="flex flex-col gap-3 mb-5">
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        Управляйте маркетинговым посылом (Intent) и подачей (Layout) каждого блока прямо отсюда. Изменения применяются мгновенно.
                      </p>
                      <button 
                        onClick={() => openMatrix?.()} 
                        className="self-start text-[11px] font-bold bg-orange-50 text-orange-600 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <BoxSelect className="w-3.5 h-3.5" />
                        Открыть Матрицу Виджетов
                      </button>
                    </div>

                    <div className="space-y-3 relative">
                      {/* Flow Line */}
                      <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-gradient-to-b from-orange-100 via-emerald-100 to-blue-100 -z-0 rounded-full" />
                      
                      {pageBlocks.map((block, index) => {
                        const schema = WIDGETS_REGISTRY[block.type];
                        if (!schema) return null;

                        const intentProp = schema.props.find(p => p.name === 'intent');
                        const layoutProp = schema.props.find(p => p.name === 'layoutPattern');

                        return (
                          <div key={block.id} className="relative z-10 flex gap-3 group">
                            {/* Node icon */}
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-400 group-hover:border-orange-300 group-hover:text-orange-500 transition-colors mt-1 z-10">
                              <span className="text-[10px] font-bold">{index + 1}</span>
                            </div>

                            {/* Block Content */}
                            <div className="flex-1 bg-white border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-xl p-3 pb-4 hover:border-gray-200 transition-colors">
                              <div className="flex justify-between items-center mb-3">
                                <div>
                                  <div className="text-[10px] uppercase font-bold tracking-wider text-orange-500 mb-0.5">Шаг {index + 1}</div>
                                  <h5 className="font-semibold text-gray-800 text-[13px]">{schema.title}</h5>
                                </div>
                                <div className="text-[10px] px-2 py-1 bg-gray-50 text-gray-400 rounded-md font-mono">{block.type}</div>
                              </div>
                              
                              <div className="space-y-3">
                                {intentProp && (
                                  <div>
                                    <label className="text-[10px] font-semibold text-gray-500 uppercase flex items-center gap-1 mb-1.5"><Sparkles className="w-3 h-3"/> Цель блока (Intent)</label>
                                    <select 
                                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 text-gray-700 outline-none focus:border-brand transition-colors"
                                      value={block.props?.intent || ''}
                                      onChange={(e) => updateBlockProps(block.id, { intent: e.target.value })}
                                    >
                                      {intentProp.options?.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                      ))}
                                    </select>
                                  </div>
                                )}
                                
                                {layoutProp && (
                                  <div>
                                    <label className="text-[10px] font-semibold text-gray-500 uppercase flex items-center gap-1 mb-1.5"><BoxSelect className="w-3 h-3"/> Формат подачи (Layout)</label>
                                    <div className="flex flex-wrap gap-1">
                                      {layoutProp.options?.map(opt => {
                                        const isSelected = (block.props?.layoutPattern || '') === opt.value;
                                        return (
                                          <button
                                            key={opt.value}
                                            onClick={() => updateBlockProps(block.id, { layoutPattern: opt.value })}
                                            className={`px-2 py-1 text-[10px] font-medium rounded-md border transition-all ${isSelected ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                          >
                                            {opt.label || 'Def'}
                                          </button>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>

                  {/* Social Proof */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-sm font-black text-gray-900 mb-1 flex items-center">Факторы доверия (Social Proof)<ParameterTooltip title="Social Proof (Социальные доказательства)" text="Влияет на количество 'звездочек', отзывов и виджетов доверия. 'Агрессивный' режим бомбардирует пользователя триггерами доверия." /></h4>
                    <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                      Управление плотностью социальных доказательств (рейтинги, медали, отзывы) на первом экране.
                    </p>
                    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
                      {[
                        { id: 'minimal', label: 'Скрыто', emoji: '🤫' },
                        { id: 'balanced', label: 'Баланс', emoji: '⭐' },
                        { id: 'aggressive', label: 'Агрессивно', emoji: '🏆' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => store.setKey('socialProofLevel', s.id as any)}
                          className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-md flex flex-col items-center gap-1 ${store.socialProofLevel === s.id ? 'bg-white shadow text-brand' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <span className="text-lg mb-0.5">{s.emoji}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Urgency */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-sm font-black text-gray-900 mb-1 flex items-center">Триггеры срочности (FOMO)<ParameterTooltip title="Fear OF Missing Out (Упущенная выгода)" text="Манипулятивные паттерны создания искусственного дефицита." /></h4>
                    <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                      Внедрение искусственного дефицита времени и мест для форсирования конверсии.
                    </p>
                    <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
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
                          className={`flex-1 py-2.5 text-xs font-bold transition-all rounded-md flex flex-col items-center gap-1 ${store.urgencyLevel === s.id ? 'bg-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
                          style={store.urgencyLevel === s.id ? { color: PRIMITIVE.marketing.rose } : undefined}
                        >
                          <span className="text-lg mb-0.5">{s.emoji}</span>
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              
  </>
); };

