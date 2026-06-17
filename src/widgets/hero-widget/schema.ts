import { WidgetDefinition } from '@/shared/types/widget';

export const HeroWidgetSchema: WidgetDefinition = {
    type: 'HeroWidget',
    title: 'Главный блок',
    variants: [],
    description: 'Основной рекламный баннер вверху страницы',
    props: [
      {
        name: 'intent', namespace: 'design',
        label: 'Смысловой акцент (Intent)',
        type: 'select',
        options: [
          { value: '', label: 'По умолчанию' },
          { value: 'educational', label: 'Обучающий / Инфо' },
          { value: 'immersive', label: 'Погружающий (Имидж)' },
          { value: 'direct-response', label: 'Конверсионный' },
          { value: 'trust-building', label: 'Доверие / Социальное доказательство' },
        ]
      }
    ]
  };
