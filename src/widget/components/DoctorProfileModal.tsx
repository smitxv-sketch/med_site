import React, { useMemo } from 'react';
import { Doctor, Slot } from '../types';
import { X, MapPin, Award, Building2, GraduationCap, Briefcase, User, Clock, BookOpen, Users, FileText, Star } from 'lucide-react';
import { DoctorSchedule } from './DoctorSchedule';
import { useDoctorSlots } from '../hooks/useDoctorSlots';
import { getNextDays, getDaysFromDates } from '../utils/dateUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { formatExperience } from '../utils/formatters';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onSlotSelect: (slot: Slot, doc: Doctor, date: string) => void;
  city?: string;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ doctor, isOpen, onClose, onSlotSelect, city = 'chel' }) => {
  const offerings = doctor?.offerings || [];
  const primaryOffering = offerings.find(o => o.is_primary) || offerings[0];
  
  const uniqueBranchNames = Array.from(new Set(offerings.map(o => o.branch.short || o.branch.name))).filter(Boolean);
  
  // Use QMS ID if available
  const qmsId = primaryOffering?.id || doctor?.id || '';

  // We only fetch if doctor is present
  const { slots, availableDates, loading, selectedDate, setSelectedDate } = useDoctorSlots(
    qmsId, 
    '', 
    city,
    doctor?.specialty
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
    if (!doctor) return [];
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

  const hasEducationTab = doctor && ((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText || doctor.extraEducation || doctor.conferences || doctor.certificates);

  if (!isOpen || !doctor) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden safe-pb"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
          >
            {/* Drag Handle for Mobile */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 sm:p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">{doctor.name}</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-5 sm:p-6 overscroll-contain bg-gray-50/50">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <div className="shrink-0 self-center sm:self-start">
                  <div className="w-32 h-40 sm:w-40 sm:h-48 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                    {doctor.image ? (
                      <img src={doctor.image} className="w-full h-full object-cover" alt={doctor.name} referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left flex flex-col">
                  {/* Временно скрываем вывод специальности (синим шрифтом) по запросу */}
                  {/* <div className="text-blue-600 font-bold mb-2 text-sm sm:text-base">{formatSpecialty(doctor.specialty, config)}</div> */}
                  {doctor.position && (
                    <div className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: doctor.position }} />
                  )}
                  
                  {displayBadges.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-5">
                      {displayBadges.map((badge, i) => {
                        const isDegree = badge.code === 'degree' || badge.code === 'kmn' || badge.code === 'zvanie';
                        const isPromo = badge.code === 'promo';
                        return (
                          <span key={i} className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium border ${isPromo ? 'bg-brand-violet text-white border-brand-violet shadow-sm shadow-brand-violet/20' : isDegree ? 'bg-amber-50 text-amber-700 border-amber-100/50' : 'bg-blue-50 text-blue-700 border-blue-100/50'}`}>
                            {isPromo && <Star className="w-3.5 h-3.5 fill-current" />}
                            {isDegree && <Award className="w-3.5 h-3.5 text-amber-500" />}
                            {badge.label}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5 text-sm text-gray-600 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {uniqueBranchNames.length > 0 ? (
                        uniqueBranchNames.map((branch, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200/60 shadow-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {branch}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200/60 shadow-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          Адрес уточняется
                        </div>
                      )}
                    </div>
                    {doctor.experienceYears && (
                      <div className="flex items-center gap-1.5 bg-[var(--color-accent)] text-white px-3 py-1.5 rounded-lg shadow-sm font-medium">
                        <Briefcase className="w-4 h-4 text-white/80" />
                        Стаж {formatExperience(doctor.experienceYears)}
                      </div>
                    )}
                    {doctor.duration && (
                      <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200/60 shadow-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        Прием {doctor.duration}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-8">
                
                {/* 1. Направления деятельности */}
                {doctor.activities && (
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4 text-lg sm:text-xl flex items-center gap-2">
                      <Award className="w-6 h-6 text-blue-500" />
                      Направления деятельности
                    </h4>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 marker:text-blue-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.activities }} />
                  </div>
                )}

                {/* 2. Записаться на прием */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5">
                  <h3 className="font-bold text-gray-900 mb-5 text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Записаться на прием
                  </h3>
                  <DoctorSchedule 
                    slots={slots}
                    loading={loading}
                    onSelectSlot={(slot) => onSlotSelect(slot, doctor, selectedDate)}
                    onDateChange={setSelectedDate}
                    selectedDate={selectedDate}
                    days={days}
                  />
                </div>

                {/* 3. О враче */}
                {doctor.description && doctor.description.replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() !== (doctor.position || "").replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() && (
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <h4 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl flex items-center gap-2">
                      <User className="w-6 h-6 text-blue-500" />
                      О враче
                    </h4>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.description }} />
                  </div>
                )}

                {/* 4. Образование */}
                {hasEducationTab && (
                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
                      <GraduationCap className="w-5 h-5 text-blue-500"/> 
                      Образование
                    </h4>
                    
                    <div className="space-y-8">
                      {((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText) && (
                        <div className="relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                          {doctor.educationHistory && doctor.educationHistory.length > 0 ? (
                            doctor.educationHistory.map((edu, idx) => (
                              <div key={idx} className="relative flex items-start group is-active mb-6 last:mb-0">
                                <div className="absolute left-0 top-1 w-5 h-5 rounded-full border-[3px] border-white bg-gray-200 group-[.is-active]:bg-blue-500 shadow-sm group-[.is-active]:shadow-blue-200 z-10"></div>
                                <div className="ml-8 w-full">
                                  <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg mb-1.5">{edu.year}</span>
                                  <div className="text-sm font-bold text-gray-900 leading-snug">{edu.organization}</div>
                                  <div className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-1.5">
                                    <span className="font-medium text-gray-700 bg-gray-50 px-2 py-0.5 rounded-md">{edu.type}</span>
                                    {edu.specialty && <span className="text-gray-600">{edu.specialty}</span>}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="prose prose-sm max-w-none text-gray-600 pl-4" dangerouslySetInnerHTML={{ __html: doctor.educationText || '' }} />
                          )}
                        </div>
                      )}

                      {doctor.extraEducation && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2"><BookOpen className="w-4 h-4 text-gray-400"/> Повышение квалификации</h5>
                          <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50/50 p-4 rounded-2xl border border-gray-100" dangerouslySetInnerHTML={{ __html: doctor.extraEducation }} />
                        </div>
                      )}

                      {doctor.conferences && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2"><Users className="w-4 h-4 text-gray-400"/> Участие в конференциях</h5>
                          <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50/50 p-4 rounded-2xl border border-gray-100" dangerouslySetInnerHTML={{ __html: doctor.conferences }} />
                        </div>
                      )}

                      {doctor.certificates && (
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400"/> Сертификаты</h5>
                          <div className="prose prose-sm max-w-none text-gray-600 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                            {Array.isArray(doctor.certificates) ? (
                              <ul className="list-disc pl-4 space-y-1">
                                {doctor.certificates.map((cert, i) => <li key={i}>{cert}</li>)}
                              </ul>
                            ) : (
                              <div dangerouslySetInnerHTML={{ __html: doctor.certificates }} />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
