import { WidgetDefinition } from '@/shared/types/widget';

export const PromotionsWidgetSchema: WidgetDefinition = {
    type: 'PromotionsWidget',
    title: 'Акции',
    variants: ['A', 'B', 'C', 'D', 'E'],
    description: 'Слайдер или сетка текущих акций',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок секции',
        type: 'string',
        placeholder: 'Акции'
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
          { value: 'grid', label: 'Сетка (Grid)' },
          { value: 'carousel', label: 'Карусель (Carousel)' },
          { value: 'compact', label: 'Компактный' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Скролл карусель' },
          { value: 'compact', label: 'Компактный стек' },
          { value: 'classic', label: 'Классический стек' },
        ]
      },
      {
        name: 'directionId', namespace: 'content',
        label: 'Фильтр по направлению',
        type: 'select',
        options: [
          { value: '', label: 'Все направления' },
          { value: 'vrt', label: 'ВРТ (ЭКО)' },
          { value: 'adult', label: 'Взрослая поликлиника' },
          { value: 'kids', label: 'Детская поликлиника' }
        ]
      },
      {
        name: 'limit', namespace: 'content',
        label: 'Лимит элементов',
        type: 'number',
        placeholder: 'Без лимита'
      }
    ]
  };
