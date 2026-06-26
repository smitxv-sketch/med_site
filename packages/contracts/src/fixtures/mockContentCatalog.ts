import type {
  NewsDto,
  PromotionDto,
  PromotionKind,
  VacancyDto,
} from '@med-site/contracts';

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80';

export function getMockPromotions(
  locale: string,
  kind?: PromotionKind,
): PromotionDto[] {
  const all: PromotionDto[] = [
    {
      id: 'mock-promo-1',
      slug: 'check-up-zdorovoe-serdce',
      title: 'Чек-ап «Здоровое сердце»',
      kind: 'promotion',
      shortDescription: 'ЭКГ, УЗИ сердца и консультация кардиолога по специальной цене.',
      content: '<p>Подробности акции уточняйте у администратора.</p>',
      cover: { url: SAMPLE_IMAGE, alt: 'Акция' },
      startDate: new Date(Date.now() - 7 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 60 * 86400000).toISOString(),
      autoUnpublishOnEnd: true,
      locale,
    },
    {
      id: 'mock-special-1',
      slug: 'pervichnyj-priem-pediatra',
      title: 'Скидка на первичный приём педиатра',
      kind: 'special_offer',
      shortDescription: 'При первом посещении детской клиники — скидка 15%.',
      content: '<p>Спецпредложение для новых пациентов.</p>',
      cover: { url: SAMPLE_IMAGE, alt: 'Спецпредложение' },
      startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
      autoUnpublishOnEnd: false,
      locale,
    },
  ];

  return kind ? all.filter((p) => p.kind === kind) : all;
}

export function getMockNews(locale: string): NewsDto[] {
  return [
    {
      id: 'mock-news-1',
      slug: 'novaya-diagnostika',
      title: 'Новое диагностическое оборудование',
      kind: 'news',
      excerpt: 'В клинике установлен современный аппарат УЗИ экспертного класса.',
      content: '<p>Мы расширили возможности диагностики для наших пациентов.</p>',
      cover: { url: SAMPLE_IMAGE, alt: 'Новость' },
      publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      locale,
    },
  ];
}

export function getMockVacancies(locale: string): VacancyDto[] {
  return [
    {
      id: 'mock-vac-1',
      slug: 'vrach-pediatr',
      title: 'Врач-педиатр',
      department: 'Детская клиника',
      experience: 'от 3 лет',
      employmentType: 'Полная занятость',
      location: 'г. Челябинск',
      content:
        '<p>Приглашаем в команду опытного врача-педиатра. Амбулаторный приём, профилактика, вакцинация.</p>',
      locale,
    },
  ];
}
