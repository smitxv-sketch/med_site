import { WidgetDefinition } from '@/shared/types/widget';

export const ReviewsWidgetSchema: WidgetDefinition = {
    type: 'ReviewsWidget',
    title: 'Отзывы',
    variants: ['A', 'B', 'C', 'D'],
    description: 'Отзывы о врачах и клинике с различных площадок',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок секции',
        type: 'string',
        placeholder: 'Отзывы пациентов'
      },
      {
        name: 'subtitle', namespace: 'content',
        label: 'Подзаголовок',
        type: 'string',
        placeholder: 'Вставьте подзаголовок'
      },
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
      },
      {
        name: 'desktopVariant', namespace: 'design',
        label: 'Паттерн верстки (Десктоп)',
        type: 'select',
        options: [
          { value: 'grid', label: 'Классическая сетка (Grid)' },
          { value: 'carousel', label: 'Горизонтальный скролл (Carousel)' },
          { value: 'masonry', label: 'Плитка (Masonry)' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Горизонтальный скролл' },
          { value: 'stack', label: 'Стек карточек' },
        ]
      },
      {
        name: 'limit', namespace: 'content',
        label: 'Лимит отзывов',
        type: 'number',
        placeholder: 'По умолчанию'
      }
    ]
  };
