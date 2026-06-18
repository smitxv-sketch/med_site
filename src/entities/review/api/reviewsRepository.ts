import { Review } from '../model/types';

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    authorName: 'Екатерина С.',
    date: '12 мая 2024',
    text: 'Огромное спасибо доктору Смирновой! Долго не могли забеременеть, но благодаря её профессионализму и поддержке у нас всё получилось. Внимательная, чуткая, всё объясняет.',
    rating: 5,
    platform: 'prodoctors',
    doctorId: 'd1',
    doctorName: 'Смирнова Анна Ивановна',
    doctorSpecialty: 'Акушер-гинеколог, репродуктолог',
    doctorAvatar: 'https://i.pravatar.cc/150?u=smirnova'
  },
  {
    id: 'r2',
    authorName: 'Алексей Д.',
    date: '05 апреля 2024',
    text: 'Клиника отличная: чисто, уютно, нет очередей. Анализы сдавать одно удовольствие – медсестры всё делают быстро и совершенно безболезненно. Рекомендую.',
    rating: 5,
    platform: 'yandex',
    clinicOnly: true
  },
  {
    id: 'r3',
    authorName: 'Мария Владимировна',
    date: '28 марта 2024',
    text: 'Были на приёме у педиатра Васильевой. Очень приятный врач, быстро нашла подход к ребенку. Назначения все по делу, никаких лишних лекарств.',
    rating: 5,
    platform: 'napopravku',
    doctorId: 'd4',
    doctorName: 'Васильева Елена Петровна',
    doctorSpecialty: 'Педиатр',
    doctorAvatar: 'https://i.pravatar.cc/150?u=vasilieva'
  },
  {
    id: 'r4',
    authorName: 'Олег Н.',
    date: '15 марта 2024',
    text: 'Приходил к урологу Морозову. Проблема деликатная, но доктор с первых минут расположил к себе. Лечение помогло с первых дней.',
    rating: 5,
    platform: '2gis',
    doctorId: 'd2',
    doctorName: 'Морозов Дмитрий Сергеевич',
    doctorSpecialty: 'Уролог, андролог',
    doctorAvatar: 'https://i.pravatar.cc/150?u=morozov'
  },
  {
    id: 'r5',
    authorName: 'Анонимно',
    date: '10 февраля 2024',
    text: 'Администраторы очень вежливые, всегда напомнят о приёме. Сама клиника светлая, удобное расположение. Была на УЗИ, врач всё подробно показал на экране.',
    rating: 4,
    platform: 'yandex',
    clinicOnly: true
  },
  {
    id: 'r6',
    authorName: 'Ирина',
    date: '02 января 2024',
    text: 'Хорошая клиника с современным оборудованием. Наблюдаюсь у гинеколога Коваленко. Очень дотошный и грамотный специалист.',
    rating: 5,
    platform: 'internal',
    doctorId: 'd3',
    doctorName: 'Коваленко Мария Игоревна',
    doctorSpecialty: 'Акушер-гинеколог',
    doctorAvatar: 'https://i.pravatar.cc/150?u=kovalenko'
  }
];

export const reviewsRepository = {
  getReviews(limit?: number): Promise<Review[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(limit ? MOCK_REVIEWS.slice(0, limit) : MOCK_REVIEWS);
      }, 500);
    });
  }
};
