import React, { useMemo, useEffect, useRef } from 'react';
import { Doctor, Slot } from '../types';
import { MapPin, Award, Briefcase, Star } from 'lucide-react';
import { DoctorSchedule } from './DoctorSchedule';
import { useDoctorSlots } from '../hooks/useDoctorSlots';
import { getNextDays, getDaysFromDates } from '../utils/dateUtils';
import { formatExperience } from '../utils/formatters';

interface DoctorCardProps {
  doctor: Doctor;
  onSelect: (doc: Doctor) => void;
  onSlotSelect: (slot: Slot, doc: Doctor, date: string) => void;
  animationDelay?: number;
  city?: string;
  onRawSlotsLoaded?: (rawSlots: any) => void;
  selectedBranchName?: string | null;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onSelect, onSlotSelect, animationDelay = 0, city = 'chel', onRawSlotsLoaded, selectedBranchName }) => {
  // Aggregation Logic (View Model)
  const offerings = doctor.offerings || [];
  const offeringCount = offerings.length;
  
  // Find min price across all offerings or fallback
  const minPrice = doctor.price || (offeringCount > 0
    ? Math.min(...offerings.map(o => o.price))
    : 0);
    
  // Determine address to show
  let primaryOffering = offerings.find(o => o.is_primary) || offerings[0];
  if (selectedBranchName) {
    const branchOffering = offerings.find(o => o.branch.short === selectedBranchName || o.branch.name === selectedBranchName);
    if (branchOffering) {
      primaryOffering = branchOffering;
    }
  }
  
  const uniqueBranchNames = Array.from(new Set(offerings.map(o => o.branch.short || o.branch.name))).filter(Boolean);

  // Use QMS ID from offering if available, otherwise fallback to doctor.id
  const qmsId = primaryOffering?.id || doctor.id;

  const { slots, availableDates, rawSlots, loading, selectedDate, setSelectedDate } = useDoctorSlots(
    qmsId, 
    '', 
    city,
    doctor.specialty
  );

  // Schedule Logic
  const days = useMemo(() => {
    if (loading) return getNextDays(14);
    if (availableDates && availableDates.length > 0) {
      return getDaysFromDates(availableDates);
    }
    return [];
  }, [availableDates, loading]);

  const displayBadges = useMemo(() => {
    const badges = [...(doctor.badges || [])];
    
    // Имитация акции
    const charCode = doctor.id.charCodeAt(0) || 0;
    const isPromo = charCode % 4 === 0;
    if (isPromo && !badges.some(b => b.code === 'promo')) {
      badges.unshift({ type: 'award', code: 'promo', label: 'Участвует в акции' });
    }

    if (doctor.isChildDoctor && !badges.some(b => b.code === 'child')) {
      badges.push({ type: 'category', code: 'child', label: 'Детский врач' });
    }
    if (doctor.isAdultDoctor && !badges.some(b => b.code === 'adult')) {
      badges.push({ type: 'category', code: 'adult', label: 'Взрослый врач' });
    }
    if (doctor.zvanie && !badges.some(b => b.code === 'zvanie')) {
      badges.push({ type: 'degree', code: 'zvanie', label: doctor.zvanie });
    }
    if (doctor.degree && !badges.some(b => b.code === 'degree')) {
      badges.push({ type: 'degree', code: 'degree', label: doctor.degree });
    }
    if (doctor.category && !badges.some(b => b.code === 'category')) {
      badges.push({ type: 'category', code: 'category', label: doctor.category });
    }
    return badges;
  }, [doctor]);

  const onRawSlotsLoadedRef = useRef(onRawSlotsLoaded);
  useEffect(() => {
    onRawSlotsLoadedRef.current = onRawSlotsLoaded;
  }, [onRawSlotsLoaded]);

  useEffect(() => {
    if (onRawSlotsLoadedRef.current && rawSlots) {
      onRawSlotsLoadedRef.current(rawSlots);
    }
  }, [rawSlots]);

  return (
    <div 
      className="group cursor-pointer bg-white rounded-[24px] border border-gray-100/80 p-4 sm:p-5 h-full flex flex-col shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] hover:border-blue-100/50 transition-all duration-300 active:scale-[0.98]"
      style={{ animationDelay: `${animationDelay}ms` }}
      onClick={() => onSelect(doctor)}
    >
      {/* Top Row: Name */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">{doctor.name}</h3>
      </div>

      <div className="mb-4 flow-root">
        {/* Photo Actor Layer (Floated) */}
        <div className="float-left mr-4 mb-2 w-20 h-24 sm:w-24 sm:h-28 rounded-[18px] overflow-hidden bg-gray-50 ring-1 ring-black/5 shadow-inner">
          {doctor.image ? (
            <img 
              src={doctor.image} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              alt={doctor.name} 
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-500 font-bold text-xl sm:text-2xl bg-blue-50 group-hover:scale-105 transition-transform duration-500">
              {doctor.name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info Actor Layer */}
        <div className="text-sm">
          {/* Badges moved right under the name for immediate trust hook */}
          {displayBadges.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {displayBadges.slice(0, 3).map((badge, i) => {
                const isDegree = badge.code === 'degree' || badge.code === 'kmn' || badge.code === 'zvanie';
                const isPromo = badge.code === 'promo';
                return (
                  <span key={i} className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-md flex items-center gap-1 font-medium border ${isPromo ? 'bg-brand-violet text-white border-brand-violet shadow-sm shadow-brand-violet/20' : isDegree ? 'bg-amber-50 text-amber-700 border-amber-100/50' : 'bg-blue-50 text-blue-700 border-blue-100/50'}`}>
                    {isPromo && <Star className="w-3 h-3 fill-current" />}
                    {isDegree && <Award className="w-3 h-3 text-amber-500" />}
                    {badge.label}
                  </span>
                );
              })}
              {displayBadges.length > 3 && (
                 <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 border border-gray-100">+{displayBadges.length - 3}</span>
              )}
            </div>
          )}

          {doctor.position && (
            <div className="text-gray-500 text-xs sm:text-sm mb-2 leading-snug" dangerouslySetInnerHTML={{ __html: doctor.position }} />
          )}

          {doctor.anonce && doctor.anonce.replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() !== (doctor.position || "").replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() && (
            <div className="text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.anonce }} />
          )}
        </div>
      </div>
      
      {/* Offerings Aggregation Layer */}
      <div className="mt-auto flex flex-wrap items-center pt-2 gap-2 mb-4">
        {doctor.experienceYears && doctor.experienceYears > 0 && (
          <div className="text-xs text-white font-semibold flex items-center gap-1.5 bg-[var(--color-accent)] px-2.5 py-1 rounded-lg shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Стаж {formatExperience(doctor.experienceYears)}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {uniqueBranchNames.length > 0 ? (
            uniqueBranchNames.map((branch, idx) => (
              <div key={idx} className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 whitespace-nowrap">
                <MapPin className="w-3 h-3 shrink-0 opacity-70" />
                <span>{branch}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 whitespace-nowrap">
              <MapPin className="w-3 h-3 shrink-0 opacity-70" />
              <span>Адрес уточняется</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100/80" onClick={(e) => e.stopPropagation()}>
        <DoctorSchedule 
          slots={slots}
          loading={loading}
          onSelectSlot={(slot) => onSlotSelect(slot, doctor, selectedDate)}
          onDateChange={setSelectedDate}
          selectedDate={selectedDate}
          days={days}
          compact={true}
          onShowMore={() => onSelect(doctor)}
          priceElement={
            minPrice > 0 ? (
              <span className="font-bold text-gray-900 text-base sm:text-lg ml-auto">
                {offeringCount > 1 && <span className="text-gray-500 font-medium text-xs sm:text-sm mr-1">от</span>}
                {new Intl.NumberFormat('ru-RU').format(minPrice)} ₽
              </span>
            ) : undefined
          }
        />
      </div>
    </div>
  );
};
