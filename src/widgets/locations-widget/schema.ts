import { WidgetDefinition } from '@/shared/types/widget';

export const LocationsWidgetSchema: WidgetDefinition = {
    type: 'LocationsWidget',
    title: 'Клиники',
    description: 'Карта и адреса клиник',
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
      },
      {
        name: 'desktopVariant', namespace: 'design',
        label: 'Паттерн верстки (Десктоп)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Карусель с карточками' },
          { value: 'grid', label: 'Сетка' },
          { value: 'compact', label: 'Компактный список' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Скролл карусель' },
          { value: 'compact', label: 'Компактный стек' },
        ]
      }
    ]
  };
