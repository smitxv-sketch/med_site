import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const locations = [
  {
    id: 1,
    name: 'Клиника в ЖК Александровский',
    address: 'ул. 40-летия Победы, 11, Челябинск',
    phone: '+7 (351) 778-88-87',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 2,
    name: 'Клиника в ЖК Подсолнухи',
    address: 'ул. Чичерина, 34А, Челябинск',
    phone: '+7 (351) 778-88-87',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600&h=400'
  },
  {
    id: 3,
    name: 'Клиника в Лесном Острове',
    address: 'ул. Градостроителей, 1/3, Челябинск',
    phone: '+7 (351) 778-88-87',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600&h=400'
  }
];

export function LocationsSection() {
  const locationsRef = useRef<HTMLDivElement>(null);
  const [activeLocationDot, setActiveLocationDot] = useState(0);

  const handleLocationsScroll = () => {
    if (!locationsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = locationsRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const maxDots = Math.min(locations.length, 3);
    setActiveLocationDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Адреса клиник</h2>
          {locations.length > 1 && (
            <div className="flex gap-1.5 items-center mt-1">
              {Array.from({ length: Math.min(locations.length, 3) }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === activeLocationDot ? 'w-6 bg-teal-500' : 'w-1.5 bg-gray-200'}`} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div 
        ref={locationsRef}
        onScroll={handleLocationsScroll}
        className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 snap-x snap-mandatory scroll-px-4 sm:scroll-px-0 scrollbar-hide"
      >
        {locations.map((loc) => (
          <div key={loc.id} className="snap-start shrink-0 w-[320px] md:w-[400px] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-200 relative">
              <img src={loc.image} alt={loc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <Link to="/contacts" className="text-xl font-bold text-gray-900 mb-2 hover:text-teal-600 transition-colors inline-block">
                {loc.name}
              </Link>
              <p className="text-gray-600 mb-6 flex-1">{loc.address}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <a 
                  href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex-1 text-center bg-teal-50 text-teal-700 py-2.5 rounded-xl font-bold hover:bg-teal-100 transition-colors shadow-sm"
                >
                  {loc.phone}
                </a>
                <button className="flex-1 text-center bg-gray-100 text-gray-900 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                  Маршрут
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for right padding on mobile */}
        <div className="w-1 shrink-0 sm:hidden"></div>
      </div>
    </section>
  );
}
