import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/components/ui/button';
import { EventRegistrationModal } from '@/widgets/events/ui/EventRegistrationModal';

const NEXT_EVENT = {
  title: 'VII научно-практическая конференция с международным участием',
  date: '21 мая',
  time: '09:30 - 18:00',
  description: 'Репродуктивная медицина: краеугольные вопросы. Конференция для врачей акушеров-гинекологов, репродуктологов, андрологов-урологов и эмбриологов.',
  image: '/img/conference.jpg'
};

const NEWS = [
  {
    id: 1,
    title: 'Открытие нового отделения косметологии',
    excerpt: 'Рады сообщить об открытии современного отделения эстетической медицины и косметологии в нашем главном корпусе.',
    date: '15 апреля 2026',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    category: 'Новости клиники'
  },
  {
    id: 2,
    title: 'Новый аппарат МРТ экспертного класса',
    excerpt: 'Мы обновили парк диагностического оборудования. Теперь пациентам доступна МРТ диагностика на аппарате 3 Тесла.',
    date: '10 апреля 2026',
    image: 'https://medsyst.ru/upload/resize_cache/iblock/093/03jlxbml57o28qnlmmisiys35xsxde65/1918_1079_1b1ef77ac61cd9f61e84e651589b06888/7e6abfc7a416e6c16ee90b41f65414bd.jpg',
    category: 'Оборудование'
  },
  {
    id: 3,
    title: 'Как подготовиться к сдаче анализов',
    excerpt: 'Памятка от наших специалистов лабораторной диагностики: что можно и нельзя делать перед сдачей крови.',
    date: '5 апреля 2026',
    image: 'https://static.tildacdn.com/tild6563-3065-4437-b165-393762613063/photo.jpg',
    category: 'Полезные статьи'
  },
  {
    id: 4,
    title: 'График работы в майские праздники',
    excerpt: 'Уважаемые пациенты, обращаем ваше внимание на изменения в графике работы клиники в период праздничных дней.',
    date: '1 апреля 2026',
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=800&q=80',
    category: 'Важно'
  }
];

export function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-4 md:pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Новости и статьи</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Следите за событиями клиники, узнавайте о новых технологиях и читайте полезные статьи от наших врачей.
          </p>
        </div>

        {/* Анонс ближайшего мероприятия */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gray-900">
            <div className="absolute inset-0">
              <img 
                src={NEXT_EVENT.image}
                alt="Event cover"
                className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
            </div>
            
            <div className="relative p-6 sm:p-12 text-white flex flex-col md:flex-row md:items-end justify-between gap-8 mt-12 md:mt-24">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/90 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6">
                  <Bell className="w-4 h-4" />
                  Анонс мероприятия
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                  {NEXT_EVENT.title}
                </h2>
                <p className="text-lg text-gray-300 md:text-xl line-clamp-3 md:line-clamp-none max-w-2xl mb-6">
                  {NEXT_EVENT.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm md:text-base text-gray-300 font-medium pb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    {NEXT_EVENT.date}
                  </div>
                  <span className="hidden sm:inline text-gray-500">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Время проведения:</span>
                    {NEXT_EVENT.time}
                  </div>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center mb-1">
                <EventRegistrationModal>
                  <Button size="lg" className="w-full md:w-auto h-14 px-8 text-lg font-semibold shadow-xl">
                    Зарегистрироваться
                  </Button>
                </EventRegistrationModal>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {NEWS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col sm:flex-row overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-theme">
                <div className="sm:w-2/5 relative h-48 sm:h-auto overflow-hidden shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand sm:hidden">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="hidden sm:block px-3 py-1 bg-brand/10 text-brand text-xs font-medium rounded-full">
                      {item.category}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-brand font-medium mt-auto group-hover:translate-x-1 transition-transform">
                    Читать далее
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
