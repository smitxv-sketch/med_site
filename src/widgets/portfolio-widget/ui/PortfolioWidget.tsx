import React, { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type WidgetIntent = 'educational' | 'direct-response' | 'immersive';
export type WidgetLayoutPattern = 'split' | 'grid' | 'stack' | 'fluid';

interface PortfolioWidgetProps {
  intent?: WidgetIntent;
  desktopVariant?: string;
  mobileVariant?: string;
  layoutPattern?: WidgetLayoutPattern; // legacy
  title?: string;
  items?: PortfolioItem[];
}

interface PortfolioItem {
  id: string;
  carName: string;
  description: string;
  price: number | string;
  duration: string;
  beforeImg: string;
  afterImg: string;
}

const MOCK_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    carName: 'LADA VESTA SPORT',
    description: 'Выполнена тщательная мойка днища, зачистка поверхностей и нанесение антикоррозийного покрытия. Работы завершены в короткий срок. Обеспечена надежная защита.',
    price: '18 000 ₽',
    duration: '1 день',
    beforeImg: 'https://images.unsplash.com/photo-1544626053-8985dc34ae63?auto=format&fit=crop&q=80&w=1200', // Имитация ржавого/грязного днища (любое авто-фото)
    afterImg: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200',  // Имитация чистого авто
  },
  {
    id: '2',
    carName: 'MAZDA 6',
    description: 'Разборка съемных элементов, мойка днища, арок и порогов. Нанесение состава Dinitrol. Продлен срок службы кузова.',
    price: '25 000 ₽',
    duration: '1.5 дня',
    beforeImg: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=1200',
    afterImg: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200',
  }
];

export function PortfolioWidget({
  intent = 'immersive',
  desktopVariant = 'stack',
  mobileVariant = 'stack',
  layoutPattern,
  title = 'Примеры наших работ',
  items = MOCK_ITEMS
}: PortfolioWidgetProps) {

  const finalDesktop = desktopVariant || layoutPattern || 'stack';
  const finalMobile = mobileVariant || layoutPattern || 'stack';

  return (
    <section className="w-full py-24 bg-gray-50 flex justify-center px-4 md:px-8" data-desktop-variant={finalDesktop} data-mobile-variant={finalMobile}>
      <div className="w-full max-w-6xl flex flex-col gap-12">
        
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
             Примеры <br/><span className="text-gray-900">Наших работ</span>
          </h2>
        </div>

        {/* Portfolio List */}
        <div className="flex flex-col gap-20">
          {items.map((item, idx) => (
             <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Subcomponent: The Card with Before/After Slider
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  // Обработка движения мыши/тача (Нативный 'Native-First' подход к слайдеру)
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Before / After Native Slider */}
      <div 
        ref={containerRef}
        className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-gray-200 rounded-3xl overflow-hidden group select-none touch-pan-y"
        onMouseMove={(e) => {
          if (e.buttons === 1) handleMove(e.clientX); // Только если зажата мышь
        }}
        onTouchMove={(e) => {
          handleMove(e.touches[0].clientX);
        }}
        onClick={(e) => handleMove(e.clientX)}
      >
        {/* AFTER Image (Background) */}
        <img 
          src={item.afterImg} 
          alt="После" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-0">
          После
        </div>

        {/* BEFORE Image (Clipped overlay) */}
        <img 
          src={item.beforeImg} 
          alt="До" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none will-change-transform"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        />
        <div 
          className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider z-20"
          style={{ opacity: sliderPos > 15 ? 1 : 0, transition: 'opacity 0.2s' }}
        >
          До
        </div>

        {/* The Slider Thumb */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)] transform -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl text-gray-600 transition-transform group-hover:scale-110">
             <GripVertical className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-4">
        
        <div className="md:col-span-4 flex flex-col gap-1">
          <h3 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">{item.carName}</h3>
          
          <div className="flex flex-wrap gap-4 mt-4">
             <div className="flex flex-col">
               <span className="text-sm text-gray-500 font-medium">Стоимость</span>
               <span className="text-xl font-bold text-gray-900">{item.price}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-sm text-gray-500 font-medium">Срок</span>
               <span className="text-xl font-bold text-gray-900">{item.duration}</span>
             </div>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col items-start gap-6">
           <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
             {item.description}
           </p>
           
           <Button className="h-12 px-8 rounded-full bg-brand text-white font-bold tracking-wide uppercase hover:bg-brand/90 mt-2">
             Записаться на осмотр
           </Button>
        </div>

      </div>
      
    </div>
  )
}
