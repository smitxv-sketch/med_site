import { WidgetDefinition } from '@/shared/types/widget';

export const DirectionsWidgetSchema: WidgetDefinition = {
    type: 'DirectionsWidget',
    title: 'Направления',
    variants: ['A', 'B', 'C'],
    description: 'Список медицинских направлений',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок секции',
        type: 'string',
        placeholder: 'Направления'
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
          { value: 'grid', label: 'Сетка 3 колонки (Compact)' },
          { value: 'bento', label: 'Бенто (Bento - Акцент на визуал)' },
          { value: 'list', label: 'Список с иконками' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
           { value: 'accordion', label: 'Аккордеон (Компактно)' },
           { value: 'bento', label: 'Стек карточек (Визуально)' },
           { value: 'list', label: 'Компактный список' },
        ]
      },
      {
        name: 'iconVariantOverride', namespace: 'design',
        label: 'Вариант иконок',
        type: 'select',
        options: [
          { value: '', label: 'По умолчанию (из темы)' },
          { value: 'A', label: 'Иконки залитые' },
          { value: 'B', label: 'Фотографии' },
          { value: 'C', label: 'Контурные иконки' },
        ]
      },
      {
        name: 'limit', namespace: 'content',
        label: 'Лимит элементов',
        type: 'number',
        placeholder: 'По умолчанию'
      }
    ]
  };
