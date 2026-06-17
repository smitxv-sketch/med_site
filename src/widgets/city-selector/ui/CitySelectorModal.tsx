import React from 'react';
import { Check, X, MapPin } from 'lucide-react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';

export function CitySelectorModal() {
  const { cityRegion, setCityRegion, isCitySelectorOpen, setIsCitySelectorOpen } = useUISettingsStore();
  const cities = ['Челябинск', 'Санкт-Петербург', 'Екатеринбург', 'Тюмень', 'Москва', 'Сургут'];

  if (!isCitySelectorOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm animate-in fade-in transition-opacity" 
        onClick={() => setIsCitySelectorOpen(false)}
      />
      {/* Mobile drawer / Desktop modal */}
      <div className="fixed md:top-1/2 md:left-1/2 md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 bottom-0 left-0 right-0 z-[130] w-full bg-white md:rounded-3xl rounded-t-3xl pb-safe flex flex-col p-6 animate-in slide-in-from-bottom-full md:slide-in-from-bottom-5 md:zoom-in-95 duration-theme shadow-2xl">
        
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
             <MapPin className="w-5 h-5 text-brand" />
             Выберите город
           </h2>
           <button onClick={() => setIsCitySelectorOpen(false)} className="p-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full text-gray-500">
             <X className="w-5 h-5" />
           </button>
        </div>

        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          От выбранного города зависят доступные клиники, врачи, расписание и цены на услуги.
        </p>

        <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2 -mr-2">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => {
                setCityRegion(city);
                setIsCitySelectorOpen(false);
              }}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                cityRegion === city 
                  ? 'border-brand bg-brand/5' 
                  : 'border-gray-100 bg-white hover:border-brand/30 hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <span className={`text-[15px] font-bold ${cityRegion === city ? 'text-brand' : 'text-gray-800'}`}>
                {city}
              </span>
              {cityRegion === city && (
                <div className="w-6 h-6 rounded-full bg-brand text-brand-fg flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
