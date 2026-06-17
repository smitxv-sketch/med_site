import { WidgetDefinition } from '@/shared/types/widget';

export const FeaturesWidgetSchema: WidgetDefinition = {
    type: 'FeaturesWidget',
    title: 'Преимущества',
    description: 'Блок с ключевыми особенностями и плюсами',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок',
        type: 'string',
        placeholder: 'Наши преимущества'
      },
      {
        name: 'subtitle', namespace: 'content',
        label: 'Подзаголовок',
        type: 'string',
        placeholder: 'Почему выбирают нас'
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
          { value: 'grid', label: 'Сетка (Grid)' },
          { value: 'list', label: 'Список (List)' },
          { value: 'bento', label: 'Бенто (Bento)' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Скролл карусель' },
          { value: 'stack', label: 'Стек карточек' },
        ]
      }
    ]
  };
