import React, { useState } from 'react';
import { TravelHomePrototype } from './TravelHomePrototype';
import { TravelDestinationPrototype } from './TravelDestinationPrototype';
import { TravelPlacePrototype } from './TravelPlacePrototype';
import { TravelTourPrototype } from './TravelTourPrototype';
import { ArrowLeft, Home, Map, MapPin, Compass } from 'lucide-react';

export const TravelApp = () => {
  const [activeScreen, setActiveScreen] = useState<'home' | 'destination' | 'place' | 'tour'>('home');

  return (
    <div className="w-full min-h-screen bg-surface flex flex-col">
      {/* Travel App Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b flex items-center p-4 gap-4 shadow-sm">
        <div className="flex-1 flex items-center justify-center sm:justify-start gap-4 mx-auto max-w-7xl w-full">
           <button onClick={() => setActiveScreen('home')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeScreen === 'home' ? 'text-brand bg-brand/5' : 'text-gray-500 hover:text-gray-900'}`}>
             <Home className="w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Главная</span>
           </button>
           <button onClick={() => setActiveScreen('destination')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeScreen === 'destination' ? 'text-brand bg-brand/5' : 'text-gray-500 hover:text-gray-900'}`}>
             <Map className="w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Направление</span>
           </button>
           <button onClick={() => setActiveScreen('place')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeScreen === 'place' ? 'text-brand bg-brand/5' : 'text-gray-500 hover:text-gray-900'}`}>
             <MapPin className="w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Место</span>
           </button>
           <button onClick={() => setActiveScreen('tour')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeScreen === 'tour' ? 'text-brand bg-brand/5' : 'text-gray-500 hover:text-gray-900'}`}>
             <Compass className="w-5 h-5" />
             <span className="text-[10px] font-bold uppercase tracking-wider">Тур</span>
           </button>
        </div>
      </div>

      <div className="flex-1 w-full bg-surface">
        {activeScreen === 'home' && <TravelHomePrototype />}
        {activeScreen === 'destination' && <TravelDestinationPrototype />}
        {activeScreen === 'place' && <TravelPlacePrototype />}
        {activeScreen === 'tour' && <TravelTourPrototype />}
      </div>
    </div>
  );
};
