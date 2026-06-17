import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, MapPin, Award, Building2, GraduationCap, Briefcase, User, Clock, BookOpen, Users, FileText, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useDoctorsRepository } from '../../../shared/di/DIContext';
import { useAnalytics } from '../../../shared/infrastructure/analytics/AnalyticsService';
import { Doctor } from '../../../widget/types';
import { formatExperience } from '../../../widget/utils/formatters';
import { motion } from 'framer-motion';
import { useDoctorSlots } from '../../../widget/hooks/useDoctorSlots';
import { DoctorSchedule } from '../../../widget/components/DoctorSchedule';
import { getNextDays, getDaysFromDates } from '../../../widget/utils/dateUtils';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { SmartPrice } from '@/shared/ui/SmartPrice';
import { SocialProofRating, SocialProofFeaturedBadges } from '@/shared/ui/SocialProofBadge';

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
        className="relative overflow-hidden transition-all duration-theme"
        style={{ maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : (needsExpansion ? `${maxHeight}px` : 'auto') }}
      >
        <div ref={contentRef} className="prose prose-sm sm:prose-base max-w-none text-gray-600 marker:text-teal-500 leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: html }} />
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
  const doctorsRepository = useDoctorsRepository();
  const analytics = useAnalytics();

  const { data: doctors, isLoading, error } = useQuery<Doctor[]>({
    queryKey: ['doctors'],
    queryFn: () => doctorsRepository.getAllDoctors()
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

  const { slots, allSlots, availableDates, loading, selectedDate, setSelectedDate } = useDoctorSlots(
    qmsId,
    '',
    'chel',
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
    <div className="pb-28 sm:pb-12 px-0 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full min-w-0 overflow-hidden sm:overflow-visible">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 px-4 sm:px-0 overflow-hidden">
        <Link to="/" className="hover:text-teal-600 transition-colors shrink-0 whitespace-nowrap">Главная</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link to="/doctors" className="hover:text-teal-600 transition-colors shrink-0 whitespace-nowrap">Врачи</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-gray-900 font-medium truncate min-w-0">{doctor.name}</span>
      </nav>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0 w-full"
      >
        <Card className="sm:rounded-app p-0 border-0 sm:border overflow-hidden w-full min-w-0">
          
          {/* Mobile Title (Above Photo) */}
          <div className="md:hidden px-4 pt-5 pb-4 bg-white min-w-0 w-full text-left border-b border-gray-100">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight uppercase tracking-tight break-words hyphens-auto">{doctor.name.replace(/\u00A0/g, ' ')}</h1>
          </div>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row border-b border-gray-100 w-full min-w-0">
          
          {/* Photo Section */}
          <div className="w-full md:w-2/5 lg:w-1/3 bg-[#f4f5f7] relative border-b md:border-b-0 md:border-r border-gray-100 shrink-0 min-w-0 flex flex-col justify-end">
            <div className="absolute top-4 left-4 z-20 pointer-events-none hidden md:block">
               <SocialProofFeaturedBadges featuredBadge={doctor.name.length % 2 === 0 ? 'top10' : 'expert'} className="shadow-sm backdrop-blur-md bg-opacity-95" />
            </div>
            <div className="aspect-[4/5] sm:aspect-square md:aspect-[3/4] w-full relative overflow-hidden bg-[#f4f5f7]">
              {doctor.image ? (
                <img 
                  src={doctor.image} 
                  className="absolute inset-0 w-full h-full object-cover object-top mix-blend-multiply" 
                  alt={doctor.name} 
                  
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <User className="w-24 h-24 md:w-32 md:h-32" />
                </div>
              )}
            </div>
             <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20 pointer-events-none md:hidden px-2">
                 <SocialProofFeaturedBadges featuredBadge={doctor.name.length % 2 === 0 ? 'top10' : 'expert'} className="shadow-sm backdrop-blur-md bg-opacity-95" />
             </div>
          </div>
          
          {/* Info Section */}
          <div className="w-full md:w-3/5 lg:w-2/3 p-5 sm:p-6 lg:p-10 flex flex-col bg-white min-w-0 overflow-hidden text-left">

            {/* Desktop Title */}
            <h1 className="hidden md:block text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight uppercase tracking-tight break-words hyphens-auto">{doctor.name.replace(/\u00A0/g, ' ')}</h1>

            <div className="mb-5 md:mb-6">
                <SocialProofRating rating={4.9} reviewsCount={24 + doctor.name.length * 3} size="md" />
            </div>

            {doctor.position && (
              <div className="text-gray-600 text-[1rem] md:text-xl mb-5 leading-relaxed max-w-3xl break-words hyphens-auto" dangerouslySetInnerHTML={{ __html: doctor.position.replace(/\u00A0/g, ' ') }} />
            )}
            
            {displayBadges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-6 items-start min-w-0 w-full">
                {displayBadges.map((badge, i) => {
                  const isDegree = badge.code === 'degree' || badge.code === 'kmn' || badge.code === 'zvanie';
                  const isPromo = badge.code === 'promo';
                  
                  let variant: "default" | "secondary" | "outline" | "promo" = "default";
                  if (isPromo) variant = "promo";
                  else if (isDegree) variant = "outline";
                  else variant = "secondary";

                  return (
                    <Badge key={i} variant={variant} size="md" className="flex items-center gap-2 max-w-full">
                      {isPromo && <Star className="w-4 h-4 fill-current shrink-0" />}
                      {isDegree && <Award className="w-4 h-4 text-amber-500 shrink-0" />}
                      <span className="truncate min-w-0 font-bold">{badge.label}</span>
                    </Badge>
                  );
                })}
              </div>
            )}

            {/* Tags Container - Flat Structure for tighter packing */}
            <div className="flex flex-wrap items-center gap-2 mb-8 w-full min-w-0 text-sm">
              {uniqueBranchNames.length > 0 ? (
                uniqueBranchNames.map((branch, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border border-gray-100 font-medium text-gray-700 max-w-full shrink-0">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate min-w-0">{branch}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border border-gray-100 font-medium text-gray-700 max-w-full shrink-0">
                  <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate min-w-0">Адрес уточняется</span>
                </div>
              )}

              {doctor.experienceYears && (
                <div className="flex items-center gap-1.5 bg-teal-600 text-white px-3 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl shadow-sm font-medium shrink-0">
                  <Briefcase className="w-4 h-4 text-white/80 shrink-0" />
                  Стаж {formatExperience(doctor.experienceYears)}
                </div>
              )}

              {doctor.duration && (
                <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl border border-gray-100 font-medium text-gray-700 shrink-0">
                  <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="truncate">Прием {doctor.duration}</span>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="mt-auto pt-6 border-t border-gray-100 w-full min-w-0">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Рейтинг врача</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { source: 'ПроДокторов', rating: 4.9, count: 128, color: 'bg-[#0083CA]', bg: 'bg-blue-50/50 hover:bg-blue-50', border: 'border-blue-100', letter: 'П' },
                  { source: '2ГИС', rating: 5.0, count: 45, color: 'bg-[#A4C516]', bg: 'bg-[#A4C516]/5 hover:bg-[#A4C516]/10', border: 'border-[#A4C516]/20', letter: '2' },
                  { source: 'Яндекс', rating: 4.8, count: 89, color: 'bg-[#FF0000]', bg: 'bg-red-50/50 hover:bg-red-50', border: 'border-red-100', letter: 'Я' }
                ].map((review, idx) => (
                  <Card key={idx} as="a" href="#" hoverable className={`flex items-center justify-between p-3 ${review.bg} ${review.border}`}>
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
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-8 lg:p-10 flex flex-col gap-8 sm:gap-10 min-w-0 w-full">
          
          {/* Action Button & Schedule */}
          <Card className="p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 min-w-0 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <h2 className="font-bold text-gray-900 text-xl flex items-center gap-3 break-words min-w-0">
                <Building2 className="w-6 h-6 text-teal-600 shrink-0" />
                <span className="truncate">Записаться на прием</span>
              </h2>
              <Button 
                as={Link}
                to={`/booking?doctor=${doctor.id}`}
                variant="primary"
                size="md"
                className="w-full md:w-auto"
                onClick={() => analytics.trackEvent('appointment_started', { source: 'doctor_page_main_btn', doctorId: doctor.id })}
              >
                Открыть виджет записи
              </Button>
            </div>
            
            <DoctorSchedule 
              slots={slots}
              loading={loading}
              onSelectSlot={(slot) => {
                analytics.trackEvent('appointment_started', { 
                  source: 'doctor_page_schedule', 
                  doctorId: doctor.id, 
                  date: selectedDate, 
                  time: slot.time 
                });
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
                    <SmartPrice price={doctor.price} className="text-gray-900 font-medium" hidePrefix />
                  </div>
                ) : undefined
              }
            />
          </Card>

          {/* Tabs Section */}
          {availableTabs.length > 0 && (
            <Card className="p-5 sm:p-8 min-w-0 w-full overflow-hidden">
              <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2 border-b border-gray-100 w-full">
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

              <div className="relative min-w-0 w-full">
                {activeTab === 'activities' && doctor.activities && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-theme min-w-0">
                    <h2 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-3">
                      <Award className="w-6 h-6 text-teal-500" />
                      Направления деятельности
                    </h2>
                    <ExpandableHtml html={doctor.activities} maxHeight={300} />
                  </div>
                )}

                {activeTab === 'about' && doctor.description && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-theme min-w-0">
                    <h2 className="font-bold text-gray-900 mb-6 text-xl flex items-center gap-3">
                      <User className="w-6 h-6 text-teal-500" />
                      О враче
                    </h2>
                    <ExpandableHtml html={doctor.description} maxHeight={300} />
                  </div>
                )}

                {activeTab === 'education' && ((doctor.educationHistory && doctor.educationHistory.length > 0) || doctor.educationText) && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-theme min-w-0">
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
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-theme">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                      <BookOpen className="w-6 h-6 text-teal-500"/> 
                      Повышение квалификации
                    </h2>
                    <Card className="bg-gray-50/80 p-5 sm:p-6">
                      <ExpandableHtml html={doctor.extraEducation} maxHeight={300} />
                    </Card>
                  </div>
                )}

                {activeTab === 'conferences' && doctor.conferences && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-theme">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                      <Users className="w-6 h-6 text-teal-500"/> 
                      Участие в конференциях
                    </h2>
                    <Card className="bg-gray-50/80 p-5 sm:p-6">
                      <ExpandableHtml html={doctor.conferences} maxHeight={300} />
                    </Card>
                  </div>
                )}

                {activeTab === 'certificates' && doctor.certificates && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-theme">
                    <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-3 text-xl">
                      <FileText className="w-6 h-6 text-teal-500"/> 
                      Сертификаты
                    </h2>
                    <Card className="bg-gray-50/80 p-5 sm:p-6">
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
                    </Card>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
        </Card>
      </motion.div>

      {/* Contextual Action Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] z-50 md:hidden pb-safe flex items-center justify-between gap-4">
        <div className="flex flex-col pl-2">
          {doctor.price ? (
            <>
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Прием от</span>
              <span className="text-lg font-black text-gray-900 leading-none mt-1">
                <SmartPrice price={doctor.price} hidePrefix className="!font-black text-lg" />
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-900">Запись к врачу</span>
          )}
        </div>
        <Button 
          as={Link} 
          to={`/booking?doctor=${doctor.id}`} 
          variant="primary" 
          className="flex-1 shadow-lg shadow-teal-500/25 py-3"
          onClick={() => analytics.trackEvent('appointment_started', { source: 'doctor_page_bottom_bar', doctorId: doctor.id })}
        >
          Записаться
        </Button>
      </div>
    </div>
  );
}
