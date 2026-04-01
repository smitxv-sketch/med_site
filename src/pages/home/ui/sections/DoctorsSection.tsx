import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, Star, Baby } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllDoctors } from '../../../../widget/services/api';
import { Doctor } from '../../../../widget/types';
import { formatSpecialty } from '../../../../widget/utils/formatters';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';
import { VariantSwitcher } from '../../../../shared/ui/VariantSwitcher';

function DoctorCardA({ doctor }: { doctor: Doctor & { displaySpecialty?: string, isPromo?: boolean } }) {
  return (
    <Link 
      to={`/doctors/${doctor.id}`} 
      className="snap-start shrink-0 w-[240px] sm:w-[280px] bg-white rounded-[1.5rem] sm:rounded-[2rem] p-3 sm:p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col gap-2.5 sm:gap-3 hover:shadow-xl hover:shadow-brand-green/5 hover:border-brand-green/30 transition-all duration-300 group"
    >
      {/* Photo */}
      <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 aspect-square sm:aspect-[4/5]">
        {doctor.image ? (
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-brand-green/30 bg-brand-green/5">
            <User className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
        )}
        {doctor.isPromo && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-brand-violet text-white text-[9px] sm:text-[10px] font-bold rounded-lg sm:rounded-xl shadow-sm shadow-brand-violet/20 uppercase tracking-wider">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
              Акция
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 px-1">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug transition-colors line-clamp-2">
          {doctor.name}
        </h3>
        <p className="text-brand-green text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 line-clamp-1">
          {doctor.displaySpecialty}
        </p>
        
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mt-2 sm:mt-3 mb-3 sm:mb-4">
          {doctor.experienceYears && (
            <span className="px-2 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg uppercase tracking-wider">
              Стаж {doctor.experienceYears} лет
            </span>
          )}
          {doctor.isChildDoctor && (
            <span className="flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-[9px] sm:text-[10px] font-bold rounded-md sm:rounded-lg uppercase tracking-wider">
              <Baby className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Детям
            </span>
          )}
        </div>

        <div className="flex-1"></div>

        {/* Bottom Action */}
        <div className="w-full py-2.5 sm:py-3 bg-brand-green/10 text-brand-green font-bold rounded-lg sm:rounded-xl transition-all duration-200 text-xs sm:text-sm text-center group-hover:bg-brand-green group-hover:text-white mt-1 sm:mt-2 ring-2 ring-white shadow-sm">
          Записаться
        </div>
      </div>
    </Link>
  );
}

function DoctorCardB({ doctor }: { doctor: Doctor & { displaySpecialty?: string, isPromo?: boolean } }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, [doctor]);

  return (
    <div className="snap-start shrink-0 w-[300px] md:w-[380px] bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-brand-green/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-brand-green/10 transition-all duration-500 group flex flex-col relative overflow-hidden">
      {/* Soft background blob for warmth */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50" />
      
      <Link to={`/doctors/${doctor.id}`} className="block relative z-10">
        <h3 className="font-extrabold text-xl text-gray-900 mb-5 transition-colors leading-tight pr-4">{doctor.name}</h3>
      </Link>
      
      <div className="flex gap-5 mb-5 relative z-10">
        <Link to={`/doctors/${doctor.id}`} className="w-24 h-32 sm:w-28 sm:h-36 shrink-0 rounded-[1.5rem] overflow-hidden bg-gradient-to-br from-brand-green/5 to-brand-green/10 relative block shadow-inner">
          {doctor.image ? (
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="absolute inset-0 w-full h-full object-cover object-top mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-brand-green/30">
              <User className="w-10 h-10" />
            </div>
          )}
        </Link>
        
        <div className="flex-1 relative flex flex-col">
          <div 
            ref={textRef}
            className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-300 ${isExpanded ? '' : 'h-32 sm:h-36'}`}
          >
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {doctor.isPromo && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-brand-violet text-white uppercase flex items-center gap-1 shadow-sm shadow-brand-violet/20">
                  <Star className="w-3 h-3 fill-current" />
                  По акции
                </span>
              )}
              {doctor.displaySpecialty && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-brand-green/10 text-brand-green uppercase">
                  {doctor.displaySpecialty}
                </span>
              )}
              {doctor.isChildDoctor && (
                <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 uppercase">
                  Детский врач
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              {doctor.position && (
                <div 
                  className="text-xs text-gray-500 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: doctor.position }} 
                />
              )}
              {doctor.anonce && doctor.anonce.replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() !== (doctor.position || "").replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() && (
                <div 
                  className="text-xs text-gray-600 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: doctor.anonce }} 
                />
              )}
            </div>
          </div>
          
          {!isExpanded && isOverflowing && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/90 to-transparent flex items-end justify-start pb-0">
              <button 
                onClick={(e) => { e.preventDefault(); setIsExpanded(true); }}
                className="text-brand-green text-[11px] font-bold bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-brand-green/10 hover:bg-brand-green/5 transition-colors"
              >
                Развернуть
              </button>
            </div>
          )}
          {isExpanded && (
            <div className="mt-3 text-left">
              <button 
                onClick={(e) => { e.preventDefault(); setIsExpanded(false); }}
                className="text-brand-green text-[11px] font-bold hover:bg-brand-green/5 px-3 py-1.5 rounded-full transition-colors"
              >
                Свернуть
              </button>
            </div>
          )}
        </div>
      </div>

      {(doctor.experienceYears || (doctor.offerings && doctor.offerings.length > 0)) && (
        <div className="flex items-center gap-2 mb-5 mt-auto relative z-10">
          {doctor.experienceYears && (
            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Стаж {doctor.experienceYears} лет
            </div>
          )}
          {doctor.offerings && doctor.offerings.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full truncate max-w-[150px]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <span className="truncate">{doctor.offerings[0].branch.short || doctor.offerings[0].branch.name}</span>
            </div>
          )}
        </div>
      )}

      <Link to={`/doctors/${doctor.id}`} className="pt-4 border-t border-gray-100/50 flex items-center justify-between mt-auto relative z-10">
        <span className="text-brand-green font-bold text-sm group-hover:translate-x-1 transition-transform">Записаться на прием</span>
        <div className="w-8 h-8 rounded-full bg-brand-green/5 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white text-brand-green transition-colors ring-2 ring-white shadow-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

export function DoctorsSection() {
  const doctorsRef = useRef<HTMLDivElement>(null);
  const [activeDoctorDot, setActiveDoctorDot] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mousePosRef = useRef<{ x: number, isNearEdge: boolean }>({ x: 0, isNearEdge: false });

  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, []);

  const variant = useUISettingsStore(state => state.doctorsSectionVariant);
  const setVariant = useUISettingsStore(state => state.setDoctorsSectionVariant);

  const { data: doctors, isLoading } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: getAllDoctors
  });

  const processedDoctors = useMemo(() => {
    if (!doctors) return [];
    return doctors.map(d => {
      const cleanedSpec = formatSpecialty(d.specialty || '');
      
      // Имитация акции
      const charCode = d.id.charCodeAt(0) || 0;
      const isPromo = charCode % 4 === 0;

      return {
        ...d,
        displaySpecialty: cleanedSpec || d.specialty || d.position || '',
        isPromo
      };
    });
  }, [doctors]);

  const visibleDoctors = useMemo(() => {
    return processedDoctors.slice(0, visibleCount);
  }, [processedDoctors, visibleCount]);

  const handleDoctorsScroll = () => {
    if (!doctorsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = doctorsRef.current;
    
    // Load more when scrolled near the end
    if (scrollLeft + clientWidth >= scrollWidth - 200) {
      if (visibleCount < processedDoctors.length) {
        setVisibleCount(prev => Math.min(prev + 5, processedDoctors.length));
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
    
    // Define edge zones (150px from left/right)
    const isNearRight = x > rect.width - 150;
    const isNearLeft = x < 150;
    
    mousePosRef.current = { x, isNearEdge: isNearRight || isNearLeft };

    if ((isNearRight || isNearLeft) && !scrollIntervalRef.current) {
      // Calculate exact card width + gap for a precise 1-card shift
      const cardWidth = (container.firstElementChild as HTMLElement)?.offsetWidth || 300;
      const gap = 24; // sm:gap-6 is 24px
      const scrollAmount = isNearRight ? (cardWidth + gap) : -(cardWidth + gap);

      // Initial smooth scroll
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      // Start interval for continuous scrolling if mouse stays on the edge
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

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  if (!processedDoctors || processedDoctors.length === 0) {
    return null;
  }

  return (
    <section className="bg-brand-green/5 py-12 sm:py-16 -mx-4 px-4 sm:mx-0 sm:px-6 lg:px-8 sm:rounded-[3rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Врачи</h2>
            <VariantSwitcher
              variants={['A', 'B'] as const}
              currentVariant={variant}
              onChange={setVariant}
              mode="cycle"
              className="md:hidden w-8 h-8 bg-white/50 text-gray-600 text-xs rounded-full hover:bg-white uppercase border border-brand-green/10"
            />
            <VariantSwitcher
              variants={['A', 'B'] as const}
              currentVariant={variant}
              onChange={setVariant}
              mode="tabs"
              className="hidden md:flex"
            />
            {visibleDoctors.length > 1 && (
              <div className="flex gap-1.5 items-center mt-1 ml-2">
                {Array.from({ length: Math.min(visibleDoctors.length, 5) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleDotClick(i)}
                    aria-label={`Scroll to page ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeDoctorDot ? 'w-6 bg-brand-green' : 'w-1.5 bg-brand-green/20 hover:bg-brand-green/40'}`} 
                  />
                ))}
              </div>
            )}
          </div>
          <Link to="/doctors" className="text-brand-green font-bold hover:text-brand-green/80 transition-colors flex items-center gap-1">
            Все врачи
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div 
          ref={doctorsRef}
          onScroll={handleDoctorsScroll}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 sm:gap-6 snap-x snap-mandatory md:snap-none scroll-px-4 sm:scroll-px-0 scrollbar-hide items-start"
        >
          {visibleDoctors.map((doctor) => (
            variant === 'A' ? (
              <DoctorCardA key={doctor.id} doctor={doctor} />
            ) : (
              <DoctorCardB key={doctor.id} doctor={doctor} />
            )
          ))}
          {/* Spacer for right padding on mobile */}
          <div className="w-1 shrink-0 sm:hidden"></div>
        </div>
      </div>
    </section>
  );
}
