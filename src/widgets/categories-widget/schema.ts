import { WidgetDefinition } from '@/shared/types/widget';

export const CategoriesWidgetSchema: WidgetDefinition = {
    type: 'CategoriesWidget',
    title: 'Частые действия',
    description: 'Плитки быстрого доступа к популярным разделам',
    props: [
      {
        name: 'intent', namespace: 'design',
        label: 'Смысловой акцент (Intent)',
        type: 'select',
        options: [
          { value: '', label: 'По умолчанию' },
          { value: 'educational', label: 'Информационный' },
          { value: 'direct-response', label: 'Конверсионный' },
        ]
      },
      {
        name: 'desktopVariant', namespace: 'design',
        label: 'Паттерн верстки (Десктоп)',
        type: 'select',
        options: [
          { value: 'cards', label: 'Плитки (Cards)' },
          { value: 'pills', label: 'Эллипсы (Pills)' },
          { value: 'bento', label: 'Bento Grid' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Горизонтальный скролл' },
          { value: 'grid', label: 'Квадратная сетка' },
        ]
      }
    ]
  };
