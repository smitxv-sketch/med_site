import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Send } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

const VACANCIES = [
  {
    id: 1,
    title: 'Врач-педиатр',
    department: 'Детская клиника',
    experience: 'от 3 лет',
    type: 'Полная занятость',
    location: 'ул. Братьев Кашириных, 131Б',
    description: 'Приглашаем в команду опытного врача-педиатра. Ведение амбулаторного приёма, профилактические осмотры, вакцинация.'
  },
  {
    id: 2,
    title: 'Медицинская сестра процедурного кабинета',
    department: 'Взрослая клиника',
    experience: 'от 1 года',
    type: 'Сменный график 2/2',
    location: 'ул. Чичерина, 34А',
    description: 'Забор венозной и капиллярной крови, постановка инъекций и капельниц, соблюдение санэпидрежима.'
  },
  {
    id: 3,
    title: 'Администратор клиники',
    department: 'Ресепшн',
    experience: 'Без опыта (обучаем)',
    type: 'Сменный график 2/2',
    location: 'ул. Чичерина, 34А',
    description: 'Встреча пациентов, оформление медицинской документации, работа с кассой, консультирование по услугам.'
  }
];

export function VacanciesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-4 md:pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Вакансии</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Присоединяйтесь к команде профессионалов. Мы предлагаем комфортные условия труда, современное оборудование и возможности для развития.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {VACANCIES.map((vacancy, index) => (
            <motion.div
              key={vacancy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between hover:border-brand/30 transition-colors">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-brand/10 text-brand text-sm font-medium rounded-full mb-4">
                    {vacancy.department}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{vacancy.title}</h2>
                  
                  <p className="text-gray-600 mb-6 max-w-3xl">
                    {vacancy.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      Опыт: {vacancy.experience}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {vacancy.type}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {vacancy.location}
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-auto shrink-0">
                  <Button variant="outline" className="w-full md:w-auto gap-2">
                    <Send className="w-4 h-4" />
                    Откликнуться
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-brand/5 rounded-3xl text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Не нашли подходящую вакансию?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Мы всегда рады талантливым специалистам. Отправьте своё резюме, и мы свяжемся с вами, как только появится подходящая позиция.
          </p>
          <a href="mailto:hr@clinic.ru" className="inline-flex items-center justify-center px-6 py-3 bg-brand text-brand-fg font-bold rounded-xl hover:bg-brand/90 transition-colors">
            Отправить резюме на hr@clinic.ru
          </a>
        </motion.div>
      </div>
    </div>
  );
}
