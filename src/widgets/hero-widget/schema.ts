import { WidgetDefinition } from '@/shared/types/widget';

export const HeroWidgetSchema: WidgetDefinition = {
  type: 'HeroWidget',
  title: 'Главный блок',
  variants: ['A', 'B', 'C', 'D', 'E', 'F'],
  description: 'Основной рекламный баннер вверху страницы',
  props: [
    {
      name: 'intent',
      namespace: 'design',
      label: 'Смысловой акцент (Intent)',
      type: 'select',
      options: [
        { value: '', label: 'По умолчанию' },
        { value: 'educational', label: 'Обучающий / Инфо' },
        { value: 'immersive', label: 'Погружающий (Имидж)' },
        { value: 'direct-response', label: 'Конверсионный' },
        { value: 'trust-building', label: 'Доверие / Социальное доказательство' },
      ],
    },
    {
      name: 'desktopVariant',
      namespace: 'design',
      label: 'Вариант (Десктоп)',
      type: 'select',
      options: [
        { value: 'A', label: 'A — Классика' },
        { value: 'B', label: 'B — Сплит' },
        { value: 'C', label: 'C — Слайдер + плашки' },
        { value: 'D', label: 'D — Иммерсив' },
      ],
    },
    {
      name: 'mobileVariant',
      namespace: 'design',
      label: 'Вариант (Мобайл)',
      type: 'select',
      options: [
        { value: 'A', label: 'A — CTA + карусель' },
        { value: 'B', label: 'B — Компакт' },
        { value: 'C', label: 'C — Карточки' },
        { value: 'E', label: 'E — Fullscreen' },
        { value: 'F', label: 'F — Зональный (новый)' },
      ],
    },
  ],
};
