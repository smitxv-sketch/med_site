import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const EVENTS = [
  {
    id: 'conference-7',
    title: 'VII научно-практическая конференция: Репродуктивная медицина',
    date: '21 мая',
    time: '09:30 - 18:00',
    type: 'offline',
    location: 'Санкт-Петербург, Гранд Отель Европа',
    category: 'Конференция',
    description: 'Конференция с международным участием для врачей акушеров-гинекологов, репродуктологов, андрологов-урологов и эмбриологов.',
    image: '/img/conference.jpg',
    status: 'upcoming'
  },
  {
    id: 'webinar-cardio',
    title: 'Вебинар: Современные аспекты кардиологии',
    date: '15 июня 2026',
    time: '14:00 - 16:00',
    type: 'online',
    location: 'Онлайн (Zoom)',
    category: 'Вебинар',
    description: 'Обзор новых клинических рекомендаций и подходов к лечению сердечно-сосудистых заболеваний. Практические разборы клинических случаев.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    status: 'upcoming'
  },
  {
    id: 'conference-neuro',
    title: 'Конференция: Неврология нового времени',
    date: '10 апреля 2026',
    time: '09:00 - 17:00',
    type: 'hybrid',
    location: 'г. Санкт-Петербург + Онлайн',
    category: 'Конференция',
    description: 'Междисциплинарный подход в лечении неврологических патологий. Встреча с ведущими неврологами и нейрохирургами страны.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80',
    status: 'past'
  }
];

export function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white border-b border-gray-100 pt-4 pb-12 md:pt-8 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Мероприятия
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Присоединяйтесь к нашим образовательным программам, симпозиумам и профильным конференциям. Обучайтесь вместе с экспертами.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-6 w-2 bg-brand rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Ближайшие события</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {EVENTS.filter(e => e.status === 'upcoming').map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur text-sm font-medium text-gray-900 rounded-full">
                    {event.category}
                  </span>
                  {event.type === 'online' && (
                    <span className="px-3 py-1 bg-blue-500/90 backdrop-blur text-sm font-medium text-white rounded-full flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      Онлайн
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand" />
                    <span className="font-medium text-gray-700">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3 mt-1 group-hover:text-brand transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-500 line-clamp-3 mb-6 flex-1">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl">
                  <MapPin className="w-4 h-4 shrink-0 text-gray-400" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>

                <div className="mt-auto">
                  <Link 
                    to={`/events/${event.id}`}
                    className="inline-flex items-center gap-2 font-semibold text-brand group-hover:gap-3 transition-all"
                  >
                    Подробнее о мероприятии
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center space-x-2 mb-8 mt-24">
          <div className="h-6 w-2 bg-gray-300 rounded-full" />
          <h2 className="text-2xl font-bold text-gray-900">Прошедшие мероприятия</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.filter(e => e.status === 'past').map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group flex items-start gap-4 p-4"
            >
              <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gray-900/10" />
              </div>

              <div className="flex-1 py-1 pr-2">
                <div className="text-xs font-semibold text-gray-400 mb-1 tracking-wider uppercase">
                  {event.date}
                </div>
                <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-brand transition-colors leading-snug mb-1">
                  {event.title}
                </h3>
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-lg">
                  {event.category}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
