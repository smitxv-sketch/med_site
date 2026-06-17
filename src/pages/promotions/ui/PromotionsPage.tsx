import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/shared/ui/Card';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PROMOTIONS = [
  {
    id: 1,
    title: 'Комплексное обследование женского здоровья',
    description: 'Скидка 20% на полное гинекологическое обследование, включая УЗИ и анализы.',
    image: 'https://www.aigerim.info/uploads/blog/1607493594KfkYLWkD.jpg',
    date: 'До 31 мая',
    category: 'Гинекология'
  },
  {
    id: 2,
    title: 'Чек-ап "Здоровое сердце"',
    description: 'ЭКГ, УЗИ сердца и консультация кардиолога по специальной цене.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    date: 'До 15 июня',
    category: 'Кардиология'
  },
  {
    id: 3,
    title: 'Скидка на первичный прием педиатра',
    description: 'При первом посещении детской клиники дарим скидку 15% на консультацию.',
    image: 'https://www.medznat.ru/uploads/images/post/9519/17340816929519.jpg',
    date: 'Постоянная акция',
    category: 'Педиатрия'
  }
];

import { MedicalDisclaimer } from '../../../shared/ui/MedicalDisclaimer';

export function PromotionsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 pt-4 md:pt-6 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Акции и спецпредложения</h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-6">
            Воспользуйтесь нашими специальными предложениями для заботы о вашем здоровье и здоровье ваших близких.
          </p>
          <MedicalDisclaimer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROMOTIONS.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-theme">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-brand">
                    {promo.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{promo.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors">
                    {promo.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 flex-1">
                    {promo.description}
                  </p>
                  
                  <Link 
                    to="/booking"
                    className="inline-flex items-center gap-2 text-brand font-medium hover:text-brand/80 transition-colors mt-auto"
                  >
                    Записаться по акции
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
