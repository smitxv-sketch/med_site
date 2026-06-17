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
  directionId?: string; // Add directionId to map to a specific direction color
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
  return SERVICES_DATA.map(service => ({
    ...service,
    path: `/services/${service.id}`
  }));
};

export const fetchPromotions = async (): Promise<Promotion[]> => {
  return [
    {
      id: 1,
      title: 'Скидка 20% на первичный прием педиатра',
      startDate: addDays(today, -10).toISOString(),
      endDate: addDays(today, 5).toISOString(),
      image: 'https://www.medznat.ru/uploads/images/post/9519/17340816929519.jpg',
      variant: 'horizontal',
      directionId: 'kids'
    },
    {
      id: 2,
      title: 'Комплексное УЗИ для женщин за 3 500 ₽',
      startDate: addDays(today, -5).toISOString(),
      endDate: addDays(today, 12).toISOString(),
      image: 'https://www.aigerim.info/uploads/blog/1607493594KfkYLWkD.jpg',
      variant: 'circular',
      directionId: 'adult'
    },
    {
      id: 3,
      title: 'Бесплатная консультация репродуктолога',
      startDate: addDays(today, -15).toISOString(),
      endDate: addDays(today, 2).toISOString(),
      image: 'https://vmclinic.ru/upload/cssinliner_webp/iblock/778/xdhaqczfzjsyaqf1caozr7s2jmilyp5m.webp',
      variant: 'horizontal',
      directionId: 'vrt'
    }
  ];
};

export const fetchHeroSlides = async (): Promise<HeroSlide[]> => {
  return [
    {
      id: 1,
      title: 'Конференция',
      subtitle: 'Репродуктивная медицина: краеугольные вопросы',
      description: 'Конференция с международным участием для врачей акушеров-гинекологов, репродуктологов, андрологов-урологов и эмбриологов.',
      image: '/img/conference.jpg',
      link: '/events/conference-7',
      linkText: 'Подробнее о мероприятии',
      badgeColor: 'bg-white shadow-sm text-brand',
      bgLight: 'bg-brand/5'
    },
    {
      id: 2,
      title: 'Оборудование',
      subtitle: 'Новый аппарат МРТ экспертного класса',
      description: 'Мы обновили парк диагностического оборудования. Теперь пациентам доступна МРТ диагностика на аппарате 3 Тесла.',
      image: 'https://medsyst.ru/upload/resize_cache/iblock/093/03jlxbml57o28qnlmmisiys35xsxde65/1918_1079_1b1ef77ac61cd9f61e84e651589b06888/7e6abfc7a416e6c16ee90b41f65414bd.jpg',
      link: '/news',
      linkText: 'Подробнее',
      badgeColor: 'bg-white shadow-sm text-blue-600',
      bgLight: 'bg-blue-50/50'
    },
    {
      id: 3,
      title: 'Полезные статьи',
      subtitle: 'Как подготовиться к сдаче анализов',
      description: 'Памятка от наших специалистов лабораторной диагностики: что можно и нельзя делать перед сдачей крови.',
      image: 'https://static.tildacdn.com/tild6563-3065-4437-b165-393762613063/photo.jpg',
      link: '/news',
      linkText: 'Читать статью',
      badgeColor: 'bg-white shadow-sm text-violet-600',
      bgLight: 'bg-violet-50/50'
    }
  ];
};
