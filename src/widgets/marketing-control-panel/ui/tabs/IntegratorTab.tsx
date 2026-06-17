import React from 'react';
import { Settings2 } from 'lucide-react';
import { ParameterTooltip, InsightCard } from '../components/SharedComponents';

const THEMES = [
  { id: 'green', name: 'Источник (Классика)', hex: '#4CAF50' },
  { id: 'blue', name: 'Медицина (Доверие)', hex: '#03A9F4' },
  { id: 'purple', name: 'Премиум (Уверенность)', hex: '#673AB7' },
  { id: 'rose', name: 'Забота (Теплота)', hex: '#E91E63' },
];

type Props = { store: any };

export const IntegratorTab = ({ store }: Props) => { return (
  <>

<div className="space-y-8 w-full animate-in fade-in slide-in-from-bottom-2">
                  
                  <InsightCard title="Расширенные параметры бренда" variant="blue">
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

                  {/* Navigation Behavior */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-[11px] font-black uppercase text-gray-400 mb-3 flex items-center">Поведение нижнего меню<ParameterTooltip title="Bottom Nav Behavior" text="Как ведет себя панель навигации на мобильных устройствах во время скролла." /></h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                       {[
                        { id: 'always-visible', label: 'Всегда видно', emoji: '📌' },
                        { id: 'hide-on-scroll-down', label: 'Скрывать при скролле', emoji: '↕️' },
                        { id: 'hidden-on-top', label: 'Скрыто на верху', emoji: '〽️' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => store.setBottomNavBehavior(s.id as any)}
                          className={`flex justify-center items-center gap-2 p-2.5 transition-all text-[11px] font-bold rounded-xl border ${store.bottomNavBehavior === s.id ? 'bg-brand/5 border-brand text-brand shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'}`}
                        >
                          <span className="text-base">{s.emoji}</span>
                          <span className="truncate">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Navigation Action Animation */}
                  <section className="bg-white p-5 transition-theme border-app" style={{ borderRadius: 'var(--app-radius)', boxShadow: 'var(--app-shadow)' }}>
                    <h4 className="text-[11px] font-black uppercase text-gray-400 mb-3 flex items-center">Анимация кнопки целевого действия<ParameterTooltip title="Bottom Nav Action Animation" text="Эффект привлечения внимания на главной кнопке нижнего меню (Запись)." /></h4>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {[
                        { id: 'pulse', label: 'Пульсация', emoji: '⭕' },
                        { id: 'border-beam', label: 'По контуру', emoji: '✨' },
                        { id: 'shimmer', label: 'Блик', emoji: '🌊' },
                        { id: 'neon', label: 'Неон', emoji: '🔮' }
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => store.setBottomNavActionAnimation(s.id as any)}
                          className={`flex justify-center items-center gap-2 p-2.5 transition-all text-[11px] font-bold rounded-xl border ${store.bottomNavActionAnimation === s.id ? 'bg-brand/5 border-brand text-brand shadow-sm' : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'}`}
                        >
                          <span className="text-base">{s.emoji}</span>
                          <span className="truncate">{s.label}</span>
                        </button>
                      ))}
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
              
  </>
); };
