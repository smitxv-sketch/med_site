import { WidgetDefinition } from '@/shared/types/widget';

export const DoctorsWidgetSchema: WidgetDefinition = {
    type: 'DoctorsWidget',
    title: 'Врачи',
    variants: ['A', 'B', 'C', 'D'],
    description: 'Список специалистов клиники',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок секции',
        type: 'string',
        placeholder: 'Врачи'
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
          { value: 'grid', label: 'Сетка карточек' },
          { value: 'carousel', label: 'Карусель (Скролл)' },
          { value: 'compact', label: 'Компактные карточки' },
          { value: 'tabs', label: 'Горизонтальные вкладки' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Скролл карусель' },
          { value: 'stack', label: 'Стек карточек' },
          { value: 'compact', label: 'Компактный список' },
        ]
      },
      {
        name: 'directionId', namespace: 'content',
        label: 'Фильтр по специализации',
        type: 'select',
        options: [
          { value: '', label: 'Все врачи' },
          { value: 'vrt', label: 'Репродуктологи' },
          { value: 'adult', label: 'Терапевты' },
          { value: 'kids', label: 'Педиатры' }
        ]
      },
      {
        name: 'limit', namespace: 'content',
        label: 'Лимит врачей',
        type: 'number',
        placeholder: 'Без лимита'
      }
    ]
  };
