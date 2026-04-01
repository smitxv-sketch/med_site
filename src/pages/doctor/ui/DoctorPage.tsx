import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, MapPin, Award, Building2, GraduationCap, Briefcase, User, Clock, BookOpen, Users, FileText, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { getAllDoctors } from '../../../widget/services/api';
import { Doctor } from '../../../widget/types';
import { formatExperience } from '../../../widget/utils/formatters';
import { motion } from 'framer-motion';
import { useDoctorSlots } from '../../../widget/hooks/useDoctorSlots';
import { DoctorSchedule } from '../../../widget/components/DoctorSchedule';
import { getNextDays, getDaysFromDates } from '../../../widget/utils/dateUtils';

function ExpandableHtml({ html, maxHeight = 160 }: { html: string, maxHeight?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [needsExpansion, setNeedsExpansion] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setNeedsExpansion(contentRef.current.scrollHeight > maxHeight);
    }
  }, [html, maxHeight]);

  return (
    <div>
      <div 
        className="relative overflow-hidden transition-all duration-300"
        style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : (needsExpansion ? `${maxHeight}px` : 'auto') }}
      >
        <div ref={contentRef} className="prose prose-sm sm:prose-base max-w-none text-gray-600 marker:text-teal-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
        {!isExpanded && needsExpansion && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      {needsExpansion && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-teal-600 font-medium hover:text-teal-700 transition-colors flex items-center gap-1 text-sm"
        >
          {isExpanded ? 'Свернуть' : 'Развернуть'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

function ExpandableList({ items, initialCount = 4, renderItem, showTimeline = false }: { items: any[], initialCount?: number, renderItem: (item: any, index: number) => React.ReactNode, showTimeline?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const needsExpansion = items.length > initialCount;
  const visibleItems = isExpanded ? items : items.slice(0, initialCount);

  return (
    <div>
      <div className={`relative ${showTimeline ? 'before:absolute before:inset-0 before:ml-3 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent' : ''}`}>
        {visibleItems.map((item, index) => renderItem(item, index))}
      </div>
      {needsExpansion && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 text-teal-600 font-medium hover:text-teal-700 transition-colors flex items-center gap-1 text-sm"
        >
          {isExpanded ? 'Свернуть' : `Показать еще (${items.length - initialCount})`}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

export function DoctorPage() {
  const { id } = useParams<{ id: string }>();

  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: getAllDoctors
  });

  const doctor = useMemo(() => {
    if (!doctors || !id) return null;
    return doctors.find(d => d.id === id) || null;
  }, [doctors, id]);

  const qmsId = useMemo(() => {
    if (!doctor) return '';
    const offerings = doctor.offerings || [];
    const primaryOffering = offerings.find(o => o.is_primary) || offerings[0];
    return primaryOffering?.id || doctor.id || '';
  }, [doctor]);

  const { slots, availableDates, loading, selectedDate, setSelectedDate } = useDoctorSlots(
    qmsId,
    '',
    'chel',
    doctor?.specialty
  );

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

  const uniqueBranchNames = useMemo(() => {
    if (!doctor || !doctor.offerings) return [];
    return Array.from(new Set(doctor.offerings.map(o => o.branch.short || o.branch.name))).filter(Boolean);
  }, [doctor]);

  const availableTabs = useMemo(() => {
    if (!doctor) return [];
    return [
      ...(doctor.activities ? [{ id: 'activities', label: 'Направления' }] : []),
      ...(doctor.description && doctor.description.replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() !== (doctor.position || "").replace(/(<([^>]+)>)/gi, "").replace(/[^\p{L}\p{N}]/gu, "").toLowerCase() ? [{ id: 'about', label: 'О враче' }] : []),
      ...((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText ? [{ id: 'education', label: 'Образование и опыт работы' }] : []),
      ...(doctor.extraEducation ? [{ id: 'extraEducation', label: 'Повышение квалификации' }] : []),
      ...(doctor.conferences ? [{ id: 'conferences', label: 'Участие в конференциях' }] : []),
      ...(doctor.certificates ? [{ id: 'certificates', label: 'Сертификаты' }] : [])
    ];
  }, [doctor]);

  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (availableTabs.length > 0 && !activeTab) {
      setActiveTab(availableTabs[0].id);
    }
  }, [availableTabs, activeTab]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Врач не найден</h2>
        <Link to="/doctors" className="text-teal-600 font-medium hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Вернуться к списку врачей
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-12 px-0 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 px-4 sm:px-0">
        <Link to="/" className="hover:text-teal-600 transition-colors">Главная</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/doctors" className="hover:text-teal-600 transition-colors">Врачи</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{doctor.name}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white sm:rounded-[2rem] shadow-sm sm:border border-gray-100 overflow-hidden"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row border-b border-gray-100">
          
          {/* Mobile Title */}
          <div className="md:hidden px-4 pt-6 pb-4 bg-white">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight uppercase tracking-tight">{doctor.name}</h1>
          </div>

          {/* Photo Section */}
          <div className="w-full md:w-2/5 lg:w-1/3 bg-[#f4f5f7] relative border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
            <div className="aspect-[3/4] md:aspect-[3/4] w-full relative overflow-hidden">
              {doctor.image ? (
                <img 
                  src={doctor.image} 
                  className="absolute inset-0 w-full h-full object-cover object-top mix-blend-multiply" 
                  alt={doctor.name} 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <User className="w-24 h-24" />
                </div>
              )}
            </div>
          </div>
          
          {/* Info Section */}
          <div className="w-full md:w-3/5 lg:w-2/3 p-5 sm:p-8 lg:p-10 flex flex-col bg-white">
            {/* Desktop Title */}
            <h1 className="hidden md:block text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight uppercase tracking-tight">{doctor.name}</h1>
            
            {doctor.position && (
              <div className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed max-w-3xl" dangerouslySetInnerHTML={{ __html: doctor.position }} />
            )}
            
            {displayBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {displayBadges.map((badge, i) => {
                  const isDegree = badge.code === 'degree' || badge.code === 'kmn' || badge.code === 'zvanie';
                  const isPromo = badge.code === 'promo';
                  return (
                    <span key={i} className={`text-sm px-4 py-2 rounded-full flex items-center gap-2 font-medium border ${isPromo ? 'bg-brand-violet text-white border-brand-violet shadow-sm shadow-brand-violet/20' : isDegree ? 'bg-amber-50 text-amber-700 border-amber-100/50' : 'bg-teal-50 text-teal-700 border-teal-100/50'}`}>
                      {isPromo && <Star className="w-4 h-4 fill-current" />}
                      {isDegree && <Award className="w-4 h-4 text-amber-500" />}
                      {badge.label}
                    </span>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex flex-wrap gap-2">
                {uniqueBranchNames.length > 0 ? (
                  uniqueBranchNames.map((branch, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 font-medium">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {branch}
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-1.5 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 font-medium">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    Адрес уточняется
                  </div>
                )}
              </div>
              {doctor.experienceYears && (
                <div className="flex items-center gap-1.5 bg-teal-600 text-white px-5 py-2.5 rounded-xl shadow-sm font-medium">
                  <Briefcase className="w-4 h-4 text-white/80" />
                  Стаж {formatExperience(doctor.experienceYears)}
                </div>
              )}
              {doctor.duration && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100 font-medium">
                  <Clock className="w-4 h-4 text-gray-400" />
                  Прием {doctor.duration}
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="mt-auto pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Рейтинг врача</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { source: 'ПроДокторов', rating: 4.9, count: 128, color: 'bg-[#0083CA]', bg: 'bg-blue-50/50 hover:bg-blue-50', border: 'border-blue-100', letter: 'П' },
                  { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C516]/5 hover:bg-[#A4C516]/10', border: 'border-[#A4C516]/20', letter: '2' },
                  { source: 'Яндекс', rating: 4.8, count: 89, color: 'bg-[#FF0000]', bg: 'bg-red-50/50 hover:bg-red-50', border: 'border-red-100', letter: 'Я' }
                ].map((review, idx) => (
                  <a key={idx} href="#" className={`flex items-center justify-between p-3 rounded-2xl border transition-colors ${review.bg} ${review.border}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm ${review.color}`}>
                        {review.letter}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-gray-900 leading-tight">{review.source}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{review.count} отзывов</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-100">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-gray-900 text-sm">{review.rating}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-8 lg:p-10 flex flex-col gap-8 sm:gap-10">
          
          {/* Action Button & Schedule */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <h2 className="font-bold text-gray-900 text-xl flex items-center gap-3">
                <Building2 className="w-6 h-6 text-teal-600" />
                Записаться на прием
              </h2>
              <Link 
                to={`/booking?doctor=${doctor.id}`}
                className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-xl font-bold text-base hover:bg-teal-700 transition-colors shadow-sm w-full md:w-auto"
              >
                Открыть виджет записи
              </Link>
            </div>
            
            <DoctorSchedule 
              slots={slots}
              loading={loading}
              onSelectSlot={(slot) => {
                // We can navigate to booking with the slot selected
                window.location.href = `/booking?doctor=${doctor.id}&date=${selectedDate}&time=${slot.time}`;
              }}
              onDateChange={setSelectedDate}
              selectedDate={selectedDate}
              days={days}
              priceElement={
                doctor.price ? (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">₽</div>
                    <span className="text-gray-900 font-medium">от {doctor.price}\u00A0рублей</span>
                  </div>
                ) : undefined
              }
            />
          </div>

          {/* Tabs Section */}
          {availableTabs.length > 0 && (
            <div className="bg-white rounded-3xl p-5 sm:p-8 border border-gray-100 shadow-sm">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2 border-b border-gray-100">
                {availableTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="min-h-[200px]">
                {activeTab === 'activities' && doctor.activities && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-3">
                      <Award className="w-6 h-6 text-teal-500" />
                      Направления деятельности
                    </h2>
                    <ExpandableHtml html={doctor.activities} maxHeight={300} />
                  </div>
                )}

                {activeTab === 'about' && doctor.description && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-3">
                      <User className="w-6 h-6 text-teal-500" />
                      О враче
                    </h2>
                    <ExpandableHtml html={doctor.description} maxHeight={300} />
                  </div>
                )}

                {activeTab === 'education' && ((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText) && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="font-bold text-gray-900 mb-8 flex items-center gap-3 text-xl">
                      <GraduationCap className="w-6 h-6 text-teal-500"/> 
                      Образование и опыт работы
                    </h2>
                    
                    <div className="space-y-10">
                      {((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText) && (
                        <div>
                          {doctor.educationHistory && doctor.educationHistory.length > 0 ? (
                            <ExpandableList 
                              items={doctor.educationHistory} 
                              initialCount={4}
                              showTimeline={true}
                              renderItem={(edu, idx) => (
                                <div key={idx} className="relative flex items-start group is-active mb-8 last:mb-0">
                                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-[4px] border-white bg-gray-200 group-[.is-active]:bg-teal-500 shadow-sm group-[.is-active]:shadow-teal-200 z-10"></div>
                                  <div className="ml-10 w-full">
                                    <span className="inline-block px-3 py-1.5 bg-teal-50 text-teal-700 text-sm font-bold rounded-xl mb-2">{edu.year}</span>
                                    <div className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1">{edu.organization}</div>
                                    <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
                                      <span className="font-medium text-gray-700 bg-gray-50 px-2.5 py-1 rounded-lg">{edu.type}</span>
                                      {edu.specialty && <span className="text-gray-600">{edu.specialty}</span>}
                                    </div>
                                  </div>
                                </div>
                              )}
                            />
                          ) : (
                            <ExpandableHtml html={doctor.educationText || ''} maxHeight={300} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'extraEducation' && doctor.extraEducation && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                      <BookOpen className="w-6 h-6 text-teal-500"/> 
                      Повышение квалификации
                    </h2>
                    <div className="bg-gray-50/80 p-5 sm:p-6 rounded-2xl border border-gray-100">
                      <ExpandableHtml html={doctor.extraEducation} maxHeight={300} />
                    </div>
                  </div>
                )}

                {activeTab === 'conferences' && doctor.conferences && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                      <Users className="w-6 h-6 text-teal-500"/> 
                      Участие в конференциях
                    </h2>
                    <div className="bg-gray-50/80 p-5 sm:p-6 rounded-2xl border border-gray-100">
                      <ExpandableHtml html={doctor.conferences} maxHeight={300} />
                    </div>
                  </div>
                )}

                {activeTab === 'certificates' && doctor.certificates && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                      <FileText className="w-6 h-6 text-teal-500"/> 
                      Сертификаты
                    </h2>
                    <div className="bg-gray-50/80 p-5 sm:p-6 rounded-2xl border border-gray-100">
                      {Array.isArray(doctor.certificates) ? (
                        <ExpandableList 
                          items={doctor.certificates}
                          initialCount={4}
                          renderItem={(cert, i) => (
                            <div key={i} className="relative flex items-start group is-active mb-4 last:mb-0">
                              <div className="absolute left-2 top-2 w-2 h-2 rounded-full bg-teal-500 z-10"></div>
                              <div className="ml-8 w-full text-gray-600">{cert}</div>
                            </div>
                          )}
                        />
                      ) : (
                        <ExpandableHtml html={doctor.certificates} maxHeight={300} />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
