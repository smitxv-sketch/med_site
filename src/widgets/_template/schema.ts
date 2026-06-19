import type { WidgetDefinition } from '@/shared/types/widget';

/** Скопируйте папку _template → {name}-widget и замените Example */
export const ExampleWidgetSchema: WidgetDefinition = {
  type: 'ExampleWidget',
  title: 'Пример виджета',
  variants: ['A', 'B'],
  description: 'Шаблон секционного виджета',
  props: [
    {
      name: 'title',
      namespace: 'content',
      label: 'Заголовок',
      type: 'string',
      placeholder: 'Заголовок секции',
    },
    {
      name: 'desktopVariant',
      namespace: 'design',
      label: 'Вариант (Десктоп)',
      type: 'select',
      options: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
      ],
    },
    {
      name: 'mobileVariant',
      namespace: 'design',
      label: 'Вариант (Мобайл)',
      type: 'select',
      options: [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
      ],
    },
  ],
};
