import { SERVICES_DATA } from '../constants/servicesData';
import { IMAGES } from '../config/images';
import { DIRECTION_UI } from '../config/designTokens';

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

export type { HeroSlide } from '../domain/hero/types';
import type { HeroSlide } from '../domain/hero/types';

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
      title: 'Скидка 20% на первичный приём педиатра',
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
      id: 3,
      title: 'КОНФЕРЕНЦИЯ',
      subtitle: 'Репродуктивная медицина: краеугольные вопросы',
      description:
        'Узнайте о последних достижениях в лечении бесплодия и программах ЭКО',
      image: IMAGES.conference,
      link: '/events/conference-7',
      linkText: 'Подробнее о мероприятии',
      badgeColor: DIRECTION_UI.vrt.badgeColor,
      bgLight: DIRECTION_UI.vrt.bgLight,
      direction: 'vrt',
      fullBleedBackground: true,
      promoId: 3,
    },
    {
      id: 1,
      title: 'ЦЕНТР ЭКО',
      subtitle: 'Лечение бесплодия и программы ЭКО',
      description:
        'Экспертное ведение беременности, генетические исследования',
      image:
        'https://vmclinic.ru/upload/cssinliner_webp/iblock/778/xdhaqczfzjsyaqf1caozr7s2jmilyp5m.webp',
      link: '/booking',
      linkText: 'Бесплатная консультация',
      ctaSecondaryText: 'Все программы ЭКО →',
      ctaSecondaryUrl: '/services/vrt',
      badgeColor: DIRECTION_UI.vrt.badgeColor,
      bgLight: DIRECTION_UI.vrt.bgLight,
      direction: 'vrt',
      navTarget: 'vrt',
      fullBleedBackground: true,
      promoId: 3,
    },
    {
      id: 2,
      title: 'ОБОРУДОВАНИЕ',
      subtitle: 'Новый аппарат МРТ экспертного класса',
      description: 'МРТ-диагностика на аппарате 3 Тесла',
      image:
        'https://medsyst.ru/upload/resize_cache/iblock/093/03jlxbml57o28qnlmmisiys35xsxde65/1918_1079_1b1ef77ac61cd9f61e84e651589b06888/7e6abfc7a416e6c16ee90b41f65414bd.jpg',
      link: '/booking',
      linkText: 'Записаться на МРТ',
      badgeColor: DIRECTION_UI.clinic.badgeColor,
      bgLight: DIRECTION_UI.clinic.bgLight,
      direction: 'clinic',
      navTarget: 'clinic',
      fullBleedBackground: true,
    },
  ];
};
