import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Award, Users, Clock, MapPin } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { PageHero } from '@/shared/ui/PageHero';

export default function AboutPage() {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-brand" />,
      title: "Высокая квалификация",
      description: "Наши врачи — кандидаты и доктора медицинских наук с многолетним опытом работы."
    },
    {
      icon: <Shield className="w-8 h-8 text-brand" />,
      title: "Доказательная медицина",
      description: "Мы используем только современные методы диагностики и лечения с доказанной эффективностью."
    },
    {
      icon: <Heart className="w-8 h-8 text-brand" />,
      title: "Забота о пациентах",
      description: "Индивидуальный подход, комфортная атмосфера и искреннее желание помочь каждому."
    },
    {
      icon: <Users className="w-8 h-8 text-brand" />,
      title: "Комплексный подход",
      description: "Взаимодействие врачей разных специальностей для точной постановки диагноза."
    },
    {
      icon: <Clock className="w-8 h-8 text-brand" />,
      title: "Экономия времени",
      description: "Прием точно по времени, отсутствие очередей и возможность сдать анализы в одном месте."
    },
    {
      icon: <MapPin className="w-8 h-8 text-brand" />,
      title: "Удобное расположение",
      description: "Клиника находится в центре города с удобной транспортной доступностью и парковкой."
    }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <PageHero 
        title={<>О клинике <span className="text-brand">ИСТОЧНИК</span></>}
        description="Мы создали современный медицинский центр, где передовые технологии сочетаются с искренней заботой о здоровье каждого пациента."
      />

      {/* Visual Showcase */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Медицина, которой <br />
                <span className="text-brand">доверяют</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Наша главная цель — не просто лечить симптомы, а находить причину заболевания и возвращать пациентам качество жизни. Мы собрали команду профессионалов, влюбленных в свое дело, и оснастили клинику оборудованием экспертного класса.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <div className="text-4xl font-bold text-brand mb-2">15+</div>
                  <div className="text-gray-600">Лет успешной работы</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-brand mb-2">50+</div>
                  <div className="text-gray-600">Врачей-экспертов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-brand mb-2">100k+</div>
                  <div className="text-gray-600">Довольных пациентов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-brand mb-2">40+</div>
                  <div className="text-gray-600">Медицинских направлений</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" 
                alt="Интерьер клиники" 
                className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
               
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Почему выбирают нас</h2>
            <p className="mt-4 text-gray-600 text-lg">Наши главные преимущества для вашего здоровья</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-lg transition-shadow border-none shadow-sm">
                  <div className="mb-6 p-4 bg-brand/10 rounded-2xl inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
