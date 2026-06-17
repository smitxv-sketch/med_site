import { WidgetDefinition } from '@/shared/types/widget';

export const showcaseSchema: WidgetDefinition = {
    type: 'showcase',
    title: 'Презентация (Showcase)',
    description: 'Информационный виджет для места, объекта, квартиры, врача.',
    props: [
      {
        name: 'desktopVariant',
        namespace: 'design',
        label: 'Паттерн верстки (Десктоп)',
        type: 'select',
        options: [
          { value: 'classic', label: 'Классика (Standard)' },
          { value: 'bento', label: 'Bento Grid' },
          { value: 'immersive-scroll', label: 'Иммерсивная Скролл-история' },
        ]
      },
      {
        name: 'mobileVariant',
        namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'classic', label: 'Классика (Standard)' },
          { value: 'stack', label: 'Стек (Stack)' },
        ]
      }
    ]
  };
