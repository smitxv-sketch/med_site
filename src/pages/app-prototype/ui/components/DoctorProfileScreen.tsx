import React, { useMemo } from 'react';
import { Doctor, Slot } from '../../../../widget/types';
import { ChevronLeft, MapPin, Award, Building2, GraduationCap, Briefcase, User, Star, Share2 } from 'lucide-react';
import { DoctorSchedule } from '../../../../widget/components/DoctorSchedule';
import { useDoctorSlots } from '../../../../widget/hooks/useDoctorSlots';
import { getNextDays, getDaysFromDates } from '../../../../widget/utils/dateUtils';
import { formatExperience } from '../../../../widget/utils/formatters';
import { Card } from '@/shared/ui/Card';

interface DoctorProfileScreenProps {
  doctor: Doctor;
  onBack: () => void;
  onSlotSelect: (slot: Slot, doc: Doctor, date: string) => void;
  city?: string;
}

export function DoctorProfileScreen({ doctor, onBack, onSlotSelect, city = 'chel' }: DoctorProfileScreenProps) {
  const offerings = doctor?.offerings || [];
  const primaryOffering = offerings.find(o => o.is_primary) || offerings[0];
  
  const uniqueBranchNames = Array.from(new Set(offerings.map(o => o.branch.short || o.branch.name))).filter(Boolean);
  const qmsId = primaryOffering?.id || doctor?.id || '';

  const { slots, allSlots, availableDates, loading, selectedDate, setSelectedDate } = useDoctorSlots(
    qmsId, 
    '', 
    city,
    doctor?.specialty
  );

  const days = useMemo(() => {
    if (loading) return getNextDays(14, allSlots);
    if (availableDates && availableDates.length > 0) {
      return getDaysFromDates(availableDates, allSlots);
    }
    return [];
  }, [availableDates, loading, allSlots]);

  const displayBadges = useMemo(() => {
    if (!doctor) return [];
    const badges = [...(doctor.badges || [])];
    
    // Имитация акции
    const charCode = doctor.id.charCodeAt(0) || 0;
    const isPromo = charCode % 4 === 0;
    if (isPromo && !badges.some(b => b.code === 'promo')) {
      badges.unshift({ type: 'award', code: 'promo', label: 'Участвует в акции' });
    }

    if (charCode % 3 === 0 && !badges.some(b => b.code === 'prodoctors')) {
      badges.push({ type: 'award', code: 'prodoctors', label: 'ПроДокторов 4.9 ★' });
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

  const hasEducationTab = doctor && ((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText || doctor.extraEducation || doctor.conferences || doctor.certificates);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Запись к врачу: ${doctor.name}`,
          text: `Рекомендую отличного врача: ${doctor.name}. ${doctor.position ? doctor.position.replace(/(<([^>]+)>)/gi, "") : ''}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // fallback
      alert('Поделиться ссылкой: ' + window.location.href);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F5F7F9] absolute inset-0 z-20">
      {/* Header */}
      <div className="bg-white sticky top-0 pt-10 z-10 border-b border-gray-100 flex items-center justify-between px-2 pb-2">
        <div className="flex items-center min-w-0">
          <button 
            onClick={onBack}
            className="p-2 mr-2 active:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h2 className="text-lg font-bold text-gray-900 truncate pr-4">{doctor.name}</h2>
        </div>
        <button 
          onClick={handleShare}
          className="p-2 active:bg-gray-100 rounded-full transition-colors shrink-0 mr-1"
          title="Поделиться профилем врача"
        >
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 p-4 pb-24 overscroll-contain">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="shrink-0 self-center">
            <div className="w-32 h-40 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
              {doctor.image ? (
                <img src={doctor.image} className="w-full h-full object-cover" alt={doctor.name} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center flex flex-col">
            {doctor.position && (
              <div className="text-gray-600 text-sm mb-4 leading-relaxed max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: doctor.position }} />
            )}
            
            {displayBadges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {displayBadges.map((badge, i) => {
                  const isDegree = badge.code === 'degree' || badge.code === 'kmn' || badge.code === 'zvanie';
                  const isPromo = badge.code === 'promo';
                  const isProdoctors = badge.code === 'prodoctors';
                  return (
                    <span key={i} className={`text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 font-medium border ${isPromo ? 'bg-brand-violet text-white border-brand-violet shadow-sm shadow-brand-violet/20' : isProdoctors ? 'bg-[#00BFA5]/10 text-[#00BFA5] border-[#00BFA5]/20 shadow-sm' : isDegree ? 'bg-amber-50 text-amber-700 border-amber-100/50' : 'bg-blue-50 text-blue-700 border-blue-100/50'}`}>
                      {isPromo && <Star className="w-3 h-3 fill-current" />}
                      {isDegree && <Award className="w-3 h-3 text-amber-500" />}
                      {badge.label}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 mt-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {uniqueBranchNames.length > 0 ? (
                  uniqueBranchNames.map((branch, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200/60 shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {branch}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200/60 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    Адрес уточняется
                  </div>
                )}
              </div>
              {doctor.experienceYears && (
                <div className="flex items-center gap-1 bg-[var(--color-accent)] text-white px-2.5 py-1.5 rounded-lg shadow-sm font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-white/80" />
                  Стаж {formatExperience(doctor.experienceYears)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-4">
          
          {/* 1. Записаться на приём */}
          <Card className="p-4 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 text-[15px] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-brand" />
              Записаться на приём
            </h3>
            <div className="-mx-2">
            <DoctorSchedule 
              slots={slots}
              loading={loading}
              onSelectSlot={(slot) => onSlotSelect(slot, doctor, selectedDate)}
              onDateChange={setSelectedDate}
              selectedDate={selectedDate}
              days={days}
            />
            </div>
          </Card>

          {/* 2. Направления деятельности */}
          {doctor.activities && (
            <Card className="p-4 shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-3 text-[15px] flex items-center gap-2">
                <Award className="w-4 h-4 text-brand" />
                Направления деятельности
              </h4>
              <div className="prose prose-sm max-w-none text-gray-600 marker:text-brand leading-relaxed text-[13px]" dangerouslySetInnerHTML={{ __html: doctor.activities }} />
            </Card>
          )}

          {/* 3. О враче */}
          {doctor.description && doctor.description.replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() !== (doctor.position || "").replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() && (
            <Card className="p-4 shadow-sm border border-gray-100 space-y-4">
              <h4 className="font-bold text-gray-900 mb-2 text-[15px] flex items-center gap-2">
                <User className="w-4 h-4 text-brand" />
                О враче
              </h4>
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed text-[13px]" dangerouslySetInnerHTML={{ __html: doctor.description }} />
            </Card>
          )}

          {/* 4. Образование */}
          {hasEducationTab && (
            <Card className="p-4 shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-[15px]">
                <GraduationCap className="w-4 h-4 text-brand"/> 
                Образование
              </h4>
              
              <div className="space-y-6">
                {((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText) && (
                  <div className="relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {doctor.educationHistory && doctor.educationHistory.length > 0 ? (
                      doctor.educationHistory.map((edu, idx) => (
                        <div key={idx} className="relative flex items-start group is-active mb-5 last:mb-0">
                          <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-[3px] border-white bg-gray-200 group-[.is-active]:bg-brand shadow-sm group-[.is-active]:shadow-brand/20 z-10"></div>
                          <div className="ml-8 w-full">
                            <span className="inline-block px-2 py-0.5 bg-green-50 text-brand text-[10px] font-bold rounded-md mb-1">{edu.year}</span>
                            <div className="text-[13px] font-bold text-gray-900 leading-snug">{edu.organization}</div>
                            <div className="text-[11px] text-gray-500 mt-1 flex flex-wrap items-center gap-1">
                              <span className="font-medium text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded">{edu.type}</span>
                              {edu.specialty && <span className="text-gray-600">{edu.specialty}</span>}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="prose prose-sm max-w-none text-gray-600 pl-4 text-[13px]" dangerouslySetInnerHTML={{ __html: doctor.educationText || '' }} />
                    )}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
