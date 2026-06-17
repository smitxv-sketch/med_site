import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Users, User, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { EventRegistrationModal } from '@/widgets/events/ui/EventRegistrationModal';
import { cn } from '@/lib/utils';
import { CONFERENCE_DATA } from './eventData';

const EVENT_DATA = {
  'conference-7': CONFERENCE_DATA,
  'symposium-2026': {
    title: 'Ежегодный симпозиум: Инновации в медицине 2026',
    date: '28 мая 2026',
    time: '10:00 - 18:00',
    type: 'offline',
    location: 'г. Москва, ул. Космонавтов, 15, Конференц-зал А',
    category: 'Симпозиум',
    price: 'Бесплатно для врачей',
    description: 'Приглашаем коллег и специалистов обсудить передовые методы диагностики и лечения. В программе выступления ведущих экспертов отрасли и мастер-классы на новом оборудовании. Симпозиум ориентирован на терапевтов, хирургов и врачей общей практики.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2000&q=80',
    status: 'upcoming',
    program: [
      { time: '09:00 - 10:00', title: 'Регистрация участников, приветственный кофе', speakers: [] },
      { time: '10:00 - 12:00', title: 'Пленарное заседание: Векторы развития здравоохранения в ближайшие 5 лет', speakers: [] },
      { time: '12:00 - 13:00', title: 'Кофе-брейк', speakers: [] },
      { time: '13:00 - 15:30', title: 'Секция: Инновации в гастроэнтерологии', speakers: [] },
      { time: '15:30 - 16:00', title: 'Кофе-брейк', speakers: [] },
      { time: '16:00 - 18:00', title: 'Мастер-класс: УЗИ диагностика сложных патологий', speakers: [] }
    ],
    speakers: [
      { name: 'Иванов А.А.', title: 'Д.м.н., главный врач, профессор' },
      { name: 'Петрова М.С.', title: 'К.м.н., ведущий хирург' },
      { name: 'Сидоров В.И.', title: 'Заведующий диагностическим отделением' }
    ],
    benefits: [
      'Сертификат участника с баллами НМО (6 баллов)',
      'Доступ к материалам лекций',
      'Возможность лично задать вопросы экспертам'
    ]
  }
};

export function EventDetailsPage() {
  const { id } = useParams();
  
  // В реальном проекте данные будут браться с сервера
  const event = id ? EVENT_DATA[id as keyof typeof EVENT_DATA] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Мероприятие не найдено</h2>
        <Link to="/events" className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-white shadow hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Ко всем мероприятиям
        </Link>
      </div>
    );
  }

  // Extract unique speakers for the sidebar from program if not defined at top level
  let displaySpeakers = event.speakers || [];
  if (displaySpeakers.length === 0 && event.program) {
    const speakerMap = new Map();
    event.program.forEach(item => {
      if (item.speakers) {
        item.speakers.forEach(speaker => {
          if (!speakerMap.has(speaker.name)) {
            speakerMap.set(speaker.name, speaker);
          }
        });
      }
    });
    displaySpeakers = Array.from(speakerMap.values());
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-4 sm:pt-6">
      {/* Hero section : Unified card design aesthetic */}
      <div className="relative min-h-[450px] sm:min-h-[60vh] flex flex-col justify-end bg-gray-900 rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-sm">
        <div className="absolute inset-0 z-0">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          {/* Defensive gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-950 to-transparent" />
        </div>
          
          {/* Top Breadcrumb */}
          <div className="absolute top-0 left-0 w-full z-20 pt-6 sm:pt-8 pb-6">
            <div className="px-6 sm:px-10 w-full">
              <nav className="flex text-sm text-white/70 font-medium" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center hover:text-white transition-colors">
                      Главная
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
                      <Link to="/events" className="hover:text-white transition-colors">
                        Анонсы
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
                      <span className="text-white line-clamp-1 max-w-[200px] sm:max-w-xs">{event.category}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="relative z-10 w-full pb-10 pt-32 sm:pb-16 sm:pt-40 px-6 sm:px-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="px-3 sm:px-4 py-1.5 bg-brand text-white text-xs sm:text-sm font-bold tracking-wide uppercase rounded-full">
                {event.category}
              </span>
              <span className="px-3 sm:px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium rounded-full border border-white/20">
                {event.type === 'online' ? 'Онлайн' : 'Очно'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-white max-w-4xl leading-[1.2] mb-8 sm:mb-10">
              {event.title}
            </h1>

            <div className="flex flex-col xl:flex-row flex-wrap gap-5 xl:gap-10 text-white/90 font-medium text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-light" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 font-normal">Дата</div>
                  {event.date}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-brand-light" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 font-normal">Время</div>
                  {event.time}
                </div>
              </div>
              <div className="flex items-center gap-3 max-w-full sm:max-w-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-brand-light" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 font-normal">Место проведения</div>
                  <div className="line-clamp-2 text-sm sm:text-base leading-snug">{event.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Content section */}
      <div className="relative z-20 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Main content */}
        <div className="lg:col-span-8 space-y-6 lg:space-y-8">
          <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-12 shadow-sm border border-gray-100/50">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 font-display">О мероприятии</h2>
              <div className="text-base sm:text-xl text-gray-700 leading-relaxed max-w-none font-medium mb-10">
                {event.description}
              </div>

              {event.benefits && event.benefits.length > 0 && (
                <div className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100/80">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
                    Что вы получите
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex flex-start gap-3 sm:gap-4 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-brand shrink-0 mt-2 sm:mt-2.5" />
                        <span className="leading-snug text-sm sm:text-base font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-12 shadow-sm border border-gray-100/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-display flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand/10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
                  </div>
                  Программа
                </h2>
                <div className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full inline-flex w-max self-start sm:self-auto">
                  {event.date}
                </div>
              </div>
              
              <div className="space-y-0 relative mt-4">
                {event.program.map((item, idx) => (
                  <div key={idx} className="relative pl-[30px] sm:pl-[40px] pb-10 group">
                    {/* Timeline line */}
                    {idx !== event.program.length - 1 && (
                      <div className="absolute top-6 left-[11px] sm:left-[15px] bottom-0 w-px bg-gray-200" />
                    )}
                    
                    {/* Dot */}
                    <div className="absolute top-2.5 left-[8px] sm:left-[12px] w-2.5 h-2.5 rounded-full bg-brand ring-4 ring-white" />

                    {/* Time */}
                    <div className="text-xl sm:text-2xl font-bold text-brand mb-1">
                      {item.time}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-4 pr-4">
                        {item.title}
                      </h4>

                      {/* Item Speakers */}
                      {item.speakers && item.speakers.length > 0 && (
                        <div className="flex flex-col gap-4">
                          {item.speakers.map((speaker, sIdx) => (
                            <div key={sIdx} className="flex gap-3 items-start">
                              <User className="w-5 h-5 text-brand shrink-0 mt-0.5" strokeWidth={2} />
                              <div className="flex-1">
                                <span className="font-semibold text-gray-900 leading-snug block">{speaker.name}</span>
                                <div className="text-gray-500 text-sm mt-0.5 leading-snug">{speaker.title}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 pb-8">
            
            {/* Registration Widget */}
            <div className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              {event.status === 'upcoming' ? (
                <>
                  <div className="mb-8">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Условия участия</div>
                    <div className="text-xl font-bold text-gray-900 leading-tight">
                      {event.price}
                    </div>
                  </div>
                  
                  <EventRegistrationModal>
                    <Button size="lg" className="w-full h-14 text-lg mb-4">
                      Зарегистрироваться
                    </Button>
                  </EventRegistrationModal>
                  
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 py-3 rounded-xl">
                    <Users className="w-4 h-4 text-brand" />
                    Количество мест ограничено
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Мероприятие завершено</h3>
                  <p className="text-gray-500">
                    Следите за новыми анонсами в нашем расписании.
                  </p>
                </div>
              )}
            </div>

            {/* Speakers Quick View */}
            {displaySpeakers.length > 0 && (
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100/50">
                <h3 className="text-lg font-bold text-gray-900 mb-6 font-display flex items-center justify-between">
                  <span>Спикеры ({displaySpeakers.length})</span>
                  <Users className="w-5 h-5 text-gray-400" />
                </h3>
                
                <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {displaySpeakers.map((speaker, idx) => (
                    <div key={idx} className="flex gap-4 items-center group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-xl transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand/10 to-brand/5 rounded-full flex items-center justify-center text-brand font-bold text-lg shrink-0 border border-brand/10 group-hover:bg-brand group-hover:text-white transition-colors">
                        {speaker.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm truncate">{speaker.name}</div>
                        <div className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-tight">{speaker.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
