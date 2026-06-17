import { WidgetDefinition } from '@/shared/types/widget';

export const TimelineWidgetSchema: WidgetDefinition = {
    type: 'TimelineWidget',
    title: 'Этапы (Сценарий)',
    description: 'Шаги, этапы работы или путь пациента',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок',
        type: 'string',
        placeholder: 'Как мы работаем'
      },
      {
        name: 'subtitle', namespace: 'content',
        label: 'Подзаголовок',
        type: 'string',
        placeholder: 'Простые шаги к вашей цели'
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
          { value: 'vertical', label: 'Вертикальный' },
          { value: 'grid', label: 'Сетка' },
          { value: 'carousel', label: 'Горизонтальный скролл' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'vertical', label: 'Вертикальный' },
          { value: 'carousel', label: 'Горизонтальный скролл' },
        ]
      }
    ]
  };
