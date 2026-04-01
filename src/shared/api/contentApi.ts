import { SERVICES_DATA } from '../constants/servicesData';

export interface ServiceDirection {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  textColor: string;
  accentBg: string;
  isVip?: boolean;
  items?: string[];
  iconColor?: string;
  iconBgLight?: string;
  iconBgSolid?: string;
}

export interface Promotion {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  image: string;
  variant: 'horizontal' | 'circular';
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  badgeColor: string;
  bgLight: string;
}

// Helper to generate dates relative to today
const today = new Date();
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const fetchDirections = async (): Promise<ServiceDirection[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return SERVICES_DATA.map(service => ({
    ...service,
    path: `/services/${service.id}`
  }));
};

export const fetchPromotions = async (): Promise<Promotion[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      title: 'Скидка 20% на первичный прием педиатра',
      startDate: addDays(today, -10).toISOString(),
      endDate: addDays(today, 5).toISOString(),
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=600&h=400',
      variant: 'horizontal'
    },
    {
      id: 2,
      title: 'Комплексное УЗИ для женщин за 3 500 ₽',
      startDate: addDays(today, -5).toISOString(),
      endDate: addDays(today, 12).toISOString(),
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600&h=400',
      variant: 'circular'
    },
    {
      id: 3,
      title: 'Бесплатная консультация репродуктолога',
      startDate: addDays(today, -15).toISOString(),
      endDate: addDays(today, 2).toISOString(),
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600&h=400',
      variant: 'horizontal'
    }
  ];
};

export const fetchHeroSlides = async (): Promise<HeroSlide[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      title: 'Передовые технологии',
      subtitle: 'Ультрасовременный аппарат МРТ 3 Тесла',
      description: 'Высочайшая точность диагностики и комфорт для пациентов. Результаты экспертного уровня.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
      link: '/services',
      linkText: 'Узнать больше',
      badgeColor: 'bg-blue-100 text-blue-700',
      bgLight: 'bg-blue-50/50'
    },
    {
      id: 2,
      title: 'Комплексный чек-ап',
      subtitle: 'Полное обследование организма за 1 день',
      description: 'Предотвратите заболевания на ранней стадии. Индивидуальные программы для мужчин и женщин.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop',
      link: '/services',
      linkText: 'Выбрать программу',
      badgeColor: 'bg-green-100 text-green-700',
      bgLight: 'bg-green-50/50'
    },
    {
      id: 3,
      title: 'Забота о здоровье',
      subtitle: 'Индивидуальный подход к каждому пациенту',
      description: 'Команда высококвалифицированных специалистов, готовых помочь вам в любой ситуации.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop',
      link: '/doctors',
      linkText: 'Наши врачи',
      badgeColor: 'bg-violet-100 text-violet-700',
      bgLight: 'bg-violet-50/50'
    }
  ];
};
