import { WidgetDefinition } from '@/shared/types/widget';

export const programSchema: WidgetDefinition = {
    type: 'program',
    title: 'Программа / Тур (Program Sequence)',
    description: 'Виджет с расписанием, маршрутом для туров, курсов, мероприятий. Поддерживает вложенные блоки (Strapi Dynamic Zones).',
    props: [
      { name: 'desktopVariant', namespace: 'design', label: 'Паттерн верстки (Десктоп)', type: 'select', options: [{ value: 'classic', label: 'Классика' }] },
      { name: 'mobileVariant', namespace: 'design', label: 'Паттерн верстки (Мобайл)', type: 'select', options: [{ value: 'classic', label: 'Классика' }] }
    ]
  };
