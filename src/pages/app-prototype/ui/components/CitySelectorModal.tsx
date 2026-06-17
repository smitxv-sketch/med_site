import React from 'react';
import { Check, X } from 'lucide-react';

interface CitySelectorModalProps {
  currentCity: string;
  onSelect: (city: string) => void;
  onClose: () => void;
}

export function CitySelectorModal({ currentCity, onSelect, onClose }: CitySelectorModalProps) {
  const cities = ['Челябинск', 'Санкт-Петербург'];

  return (
    <>
      <div 
        className="absolute inset-0 z-[120] bg-black/40 backdrop-blur-sm animate-in fade-in" 
        onClick={onClose}
      />
      <div className="absolute left-0 right-0 bottom-0 z-[130] bg-white rounded-t-3xl pb-safe flex flex-col p-6 animate-in slide-in-from-bottom-full duration-theme">
        
        <div className="flex items-center justify-between xl:justify-center mb-6">
           <h2 className="text-xl font-black text-gray-900">Выберите город</h2>
           <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 xl:absolute xl:right-6 xl:top-6">
             <X className="w-5 h-5" />
           </button>
        </div>

        <p className="text-sm text-gray-500 mb-6">От выбранного города зависят доступные клиники, врачи и цены на услуги.</p>

        <div className="flex flex-col gap-3">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => onSelect(city)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                currentCity === city 
                  ? 'border-brand bg-brand/5' 
                  : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`text-base font-bold ${currentCity === city ? 'text-brand' : 'text-gray-800'}`}>
                {city}
              </span>
              {currentCity === city && (
                <div className="w-6 h-6 rounded-full bg-brand text-brand-fg flex items-center justify-center">
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
