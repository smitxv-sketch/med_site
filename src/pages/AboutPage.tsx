import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Zap, Smartphone, Settings, BarChart3 } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Мгновенная интеграция",
      description: "Встраивается в любой сайт за 2 минуты. Работает автономно, не нагружая вашу инфраструктуру."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-500" />,
      title: "Mobile First",
      description: "Идеально работает на смартфонах. Удобный интерфейс повышает конверсию записи с мобильных устройств."
    },
    {
      icon: <Settings className="w-8 h-8 text-purple-500" />,
      title: "Гибкая конфигурация",
      description: "Цвета, тексты и логика шагов настраиваются через JSON-конфиги. Полный White Label под ваш бренд."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-500" />,
      title: "Безопасность данных",
      description: "Мы не храним персональные данные пациентов. Виджет работает как шлюз к вашей МИС."
    },
    {
      icon: <Calendar className="w-8 h-8 text-rose-500" />,
      title: "Умное расписание",
      description: "Автоматическая проверка слотов в реальном времени. Исключает овербукинг и накладки."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-indigo-500" />,
      title: "Аналитика",
      description: "Встроенные метрики конверсии на каждом шаге. Понимайте, где теряются пациенты."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/80 to-white" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            Будущее медицинской <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              онлайн-записи
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Элегантный, быстрый и безопасный виджет, который превращает посетителей сайта в пациентов.
            Без лишних кликов. Без сложных форм.
          </motion.p>
        </div>
      </section>

      {/* Visual Showcase */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-slate-900">
                Интерфейс, который <br />
                <span className="text-blue-600">понимает пациента</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Мы убрали всё лишнее. Интуитивный пошаговый процесс ведет пациента за руку: от выбора услуги до подтверждения записи. 
                Адаптивный дизайн гарантирует идеальное отображение на любом устройстве.
              </p>
              <div className="flex gap-4">
                <div className="h-2 w-20 bg-blue-600 rounded-full" />
                <div className="h-2 w-10 bg-slate-200 rounded-full" />
                <div className="h-2 w-10 bg-slate-200 rounded-full" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl blur-2xl opacity-70" />
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop" 
                alt="Medical Interface" 
                className="relative rounded-2xl shadow-2xl border border-slate-100 w-full object-cover aspect-[4/3]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Технологическое совершенство</h2>
            <p className="mt-4 text-slate-600">Создан для современных клиник с высокими требованиями</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className="mb-6 p-3 bg-slate-50 rounded-xl inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Closing */}
      <section className="py-32 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Готовы трансформировать <br /> опыт ваших пациентов?
          </h2>
          <p className="text-xl text-slate-600">
            Сервис, который работает на репутацию вашей клиники 24/7.
          </p>
        </div>
      </section>
    </div>
  );
}
