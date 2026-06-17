import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProcessedDoctor } from '../types';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { VariantSwitcher } from '@/shared/ui/VariantSwitcher';
import { Button } from '@/shared/ui/Button';
import { DoctorCardA } from '@/entities/doctor/ui/DoctorCardA';
import { DoctorCardB } from '@/entities/doctor/ui/DoctorCardB';
import { MessageSquare, MapPin } from 'lucide-react';

export interface DoctorsWidgetVariantProps {
  doctors: ProcessedDoctor[];
  isLoading: boolean;
  title?: string;
  subtitle?: string;
  hideVariantSwitcher?: boolean;
}

// ... existing code ...

function BaseDoctorsCarousel({ doctors, renderCard, title, subtitle, hideVariantSwitcher }: { doctors: ProcessedDoctor[], renderCard: (doc: ProcessedDoctor) => React.ReactNode, title?: string, subtitle?: string, hideVariantSwitcher?: boolean }) {
  const doctorsRef = useRef<HTMLDivElement>(null);
  const [activeDoctorDot, setActiveDoctorDot] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mousePosRef = useRef<{ x: number, isNearEdge: boolean }>({ x: 0, isNearEdge: false });

  const variant = useUISettingsStore(state => state.doctorsSectionVariant);
  const setVariant = useUISettingsStore(state => state.setDoctorsSectionVariant);

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, []);

  const visibleDoctors = doctors.slice(0, visibleCount);

  const handleDoctorsScroll = () => {
    if (!doctorsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = doctorsRef.current;
    
    if (scrollLeft + clientWidth >= scrollWidth - 200) {
      if (visibleCount < doctors.length) {
        setVisibleCount(prev => Math.min(prev + 5, doctors.length));
      }
    }

    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const maxDots = Math.min(visibleDoctors.length, 5);
    setActiveDoctorDot(Math.min(maxDots - 1, Math.round(progress * (maxDots - 1))));
  };

  const handleDotClick = (index: number) => {
    if (!doctorsRef.current) return;
    const container = doctorsRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const maxDots = Math.min(visibleDoctors.length, 5);
    const targetScroll = (index / (maxDots - 1)) * maxScroll;

    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    if (!doctorsRef.current) return;

    const container = doctorsRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    const isNearRight = x > rect.width - 150;
    const isNearLeft = x < 150;
    
    mousePosRef.current = { x, isNearEdge: isNearRight || isNearLeft };

    if ((isNearRight || isNearLeft) && !scrollIntervalRef.current) {
      const cardWidth = (container.firstElementChild as HTMLElement)?.offsetWidth || 300;
      const gap = 24; 
      const scrollAmount = isNearRight ? (cardWidth + gap) : -(cardWidth + gap);

      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      scrollIntervalRef.current = setInterval(() => {
        if (!doctorsRef.current || !mousePosRef.current.isNearEdge) {
          if (scrollIntervalRef.current) {
            clearInterval(scrollIntervalRef.current);
            scrollIntervalRef.current = null;
          }
          return;
        }
        
        const currentX = mousePosRef.current.x;
        const currentRect = doctorsRef.current.getBoundingClientRect();
        const nearRight = currentX > currentRect.width - 150;
        const nearLeft = currentX < 150;

        if (nearRight) {
          doctorsRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        } else if (nearLeft) {
          doctorsRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        }
      }, 2000);
    } else if (!isNearRight && !isNearLeft && scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    mousePosRef.current.isNearEdge = false;
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  return (
    <section className="bg-brand/5 py-12 sm:rounded-[3rem] relative overflow-hidden">
      <div className="px-4 sm:px-8 lg:px-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title || 'Врачи'}</h2>
              {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
            </div>
            {visibleDoctors.length > 1 && (
              <div className="flex gap-1.5 items-center mt-1 ml-2">
                {Array.from({ length: Math.min(visibleDoctors.length, 5) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleDotClick(i)}
                    aria-label={`Scroll to page ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-theme ${i === activeDoctorDot ? 'w-6 bg-brand' : 'w-1.5 bg-brand/20 hover:bg-brand/40'}`} 
                  />
                ))}
              </div>
            )}
          </div>
          <Button as={Link} to="/doctors" variant="secondary" size="sm" className="bg-white/80 hover:bg-white border-0 shrink-0">
            <span className="hidden sm:inline">Все врачи</span>
            <span className="inline sm:hidden">Все</span>
            <svg className="w-4 h-4 ml-1 sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </Button>
        </div>
        
        <div 
          ref={doctorsRef}
          onScroll={handleDoctorsScroll}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 gap-6 snap-x snap-mandatory md:snap-none scroll-px-4 sm:scroll-px-8 lg:scroll-px-12 scrollbar-hide items-start"
        >
          {visibleDoctors.map(renderCard)}
          {/* Spacer for right padding on mobile */}
          <div className="w-1 shrink-0 sm:hidden"></div>
        </div>
      </div>
    </section>
  );
}

export const DoctorsWidgetVariantA = ({ doctors, isLoading, title, subtitle, hideVariantSwitcher }: DoctorsWidgetVariantProps) => {
  if (isLoading) return <LoadingPlaceholder />;
  if (!doctors || doctors.length === 0) return null;

  return <BaseDoctorsCarousel doctors={doctors} renderCard={(doc) => <DoctorCardA key={doc.id} doctor={doc} />} title={title} subtitle={subtitle} hideVariantSwitcher={hideVariantSwitcher} />;
};

export const DoctorsWidgetVariantB = ({ doctors, isLoading, title, subtitle, hideVariantSwitcher }: DoctorsWidgetVariantProps) => {
  if (isLoading) return <LoadingPlaceholder />;
  if (!doctors || doctors.length === 0) return null;

  return <BaseDoctorsCarousel doctors={doctors} renderCard={(doc) => <DoctorCardB key={doc.id} doctor={doc} />} title={title} subtitle={subtitle} hideVariantSwitcher={hideVariantSwitcher} />;
};

export const DoctorsWidgetVariantC = ({ doctors, isLoading, title, subtitle, hideVariantSwitcher }: DoctorsWidgetVariantProps) => {
  const variant = useUISettingsStore(state => state.doctorsSectionVariant);
  const setVariant = useUISettingsStore(state => state.setDoctorsSectionVariant);
  
  if (isLoading) return <LoadingPlaceholder />;
  if (!doctors || doctors.length === 0) return null;

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title || 'Врачи'}</h2>
            {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {doctors.slice(0, 6).map(doc => (
          <div key={doc.id} className="w-full flex">
            <div className="w-full">
               <DoctorCardA doctor={doc} className="!w-full !min-w-0 p-2.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DoctorsWidgetVariantD = ({ doctors, isLoading, title, subtitle, hideVariantSwitcher }: DoctorsWidgetVariantProps) => {
  const [activeSpecialty, setActiveSpecialty] = useState<string>('Все специалисты');
  const variant = useUISettingsStore(state => state.doctorsSectionVariant);
  const setVariant = useUISettingsStore(state => state.setDoctorsSectionVariant);

  const specialties = useMemo(() => {
    const list = Array.from(new Set(doctors.map(d => d.displaySpecialty))).filter(Boolean);
    return list;
  }, [doctors]);

  // Helper for shortening long titles like "Заведующая педиатрическим отделением"
  const formatTabTitle = (title: string) => {
    if (title === 'Все специалисты') return 'Все врачи';
    const words = title.trim().split(/\s+/);
    if (words.length > 1) {
      return `${words[0]} ${words[1].substring(0, 3)}...`;
    }
    return title;
  };

  const filteredDoctors = useMemo(() => {
    if (activeSpecialty === 'Все специалисты' || activeSpecialty === 'Все врачи') return doctors;
    return doctors.filter(d => d.displaySpecialty === activeSpecialty);
  }, [activeSpecialty, doctors]);

  if (isLoading) return <LoadingPlaceholder />;
  if (!doctors || doctors.length === 0) return null;

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{title || 'Специалисты'}</h2>
          </div>
        </div>
      </div>
        
        {/* Horizontal tabs */}
        <div className="relative group mb-8">
          <div 
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing pb-2 -mb-2 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12"
            onMouseDown={(e) => {
              const el = e.currentTarget;
              let isDown = true;
              const startX = e.pageX - el.offsetLeft;
              const scrollLeft = el.scrollLeft;
              
              const move = (e: MouseEvent) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                el.scrollLeft = scrollLeft - (x - startX) * 2;
              };
              const up = () => {
                isDown = false;
                window.removeEventListener('mousemove', move);
                window.removeEventListener('mouseup', up);
              };
              window.addEventListener('mousemove', move);
              window.addEventListener('mouseup', up);
            }}
          >
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-1.5 flex gap-2 items-center shadow-sm border border-white/50 w-max min-w-full lg:min-w-0">
              <button
                onClick={() => setActiveSpecialty('Все специалисты')}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeSpecialty === 'Все специалисты' || activeSpecialty === 'Все врачи' ? 'bg-brand text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-brand'}`}
              >
                 Все врачи
              </button>
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() => setActiveSpecialty(spec)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeSpecialty === spec ? 'bg-brand text-white shadow-md' : 'text-gray-600 hover:bg-white hover:text-brand'}`}
                >
                  {formatTabTitle(spec)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CSS Grid for doctors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {filteredDoctors.slice(0, 6).map(doc => (
            <div key={doc.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-6 items-start hover:shadow-lg transition-all duration-300 border border-white group">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-gray-50">
                 {doc.image ? (
                   <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 ) : (
                   <div className="w-full h-full bg-brand/5 flex items-center justify-center text-brand/40">photo</div>
                 )}
              </div>
              <div className="flex flex-col flex-1">
                 <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight mb-2 hover:text-brand cursor-pointer">{doc.name}</h3>
                 <div className="flex items-center gap-3 mb-2 flex-wrap">
                   {doc.experienceYears && (
                     <span className="text-brand text-xs sm:text-sm font-semibold">Стаж {doc.experienceYears} лет</span>
                   )}
                   <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm bg-gray-50 px-2 py-0.5 rounded-full">
                     <MessageSquare className="w-3.5 h-3.5" />
                     {15 + doc.name.length}
                   </div>
                 </div>
                 <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-1">{doc.displaySpecialty}</p>
                 <p className="text-xs sm:text-sm text-gray-500 leading-relaxed flex items-start gap-1">
                    ул. Труда, 187Б, пр-т Ленина, 17
                 </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

function LoadingPlaceholder() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="w-8 h-8 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
      </div>
    </section>
  );
}

export const DoctorsVariantRegistry: Record<string, React.FC<DoctorsWidgetVariantProps>> = {
  A: DoctorsWidgetVariantA,
  B: DoctorsWidgetVariantB,
  C: DoctorsWidgetVariantC,
  D: DoctorsWidgetVariantD,
};
