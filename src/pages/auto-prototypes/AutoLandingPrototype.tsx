import React, { useState } from 'react';
import { PageRenderer } from '@/shared/ui/PageRenderer';
import { WidgetType } from '@/shared/store/uiSettingsStore';

export const AutoLandingPrototype = () => {
  const [blocks, setBlocks] = useState<any[]>([
    {
      id: 'header-1',
      type: 'header',
      props: {
        logo: { text: "АВТОЗАЩИТА" },
        navigation: [
          { label: 'Услуги', link: '#services' },
          { label: 'Преимущества', link: '#benefits' },
          { label: 'Цены', link: '#prices' },
          { label: 'Контакты', link: '#contacts' }
        ],
        contact: { phone: '+7 (999) 000-00-00', actionLabel: 'Записаться' }
      }
    },
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        title: "Антикоррозийная обработка авто за 1 день",
        subtitle: "Защитите кузов от ржавчины и реагентов с гарантией 5 лет. Используем шведские материалы Mercasol.",
        primaryCta: { label: 'Рассчитать стоимость', action: 'calculate' },
        secondaryCta: { label: 'Подробнее', action: 'scroll' },
        image: "https://images.unsplash.com/photo-1600705423858-5d2bc5e4cf19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
        overlay: true
      }
    },
    {
      id: 'features-1',
      type: 'features',
      props: {
        title: "Почему мы?",
        features: [
          { icon: 'shield', title: 'Гарантия 5 лет', description: 'Предоставляем официальную гарантию на покрытие.' },
          { icon: 'clock', title: 'Всего 1 день', description: 'Полный цикл работ занимает от 6 до 12 часов.' },
          { icon: 'award', title: 'Премиум материалы', description: 'Используем только сертифицированные шведские составы.' }
        ]
      }
    },
    {
       id: 'footer-1',
       type: 'footer',
       props: {
         text: "© 2026 АВТОЗАЩИТА. Все права защищены.",
         navigation: [
           { label: 'Политика конфиденциальности', link: '#' }
         ]
       }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PageRenderer blocks={blocks} onUpdateBlocks={setBlocks} />
    </div>
  );
};
