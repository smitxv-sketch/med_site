import { WidgetDefinition } from '@/shared/types/widget';

export const GridContainerWidgetSchema: WidgetDefinition = {
    type: 'GridContainerWidget',
    title: 'Сетка (Контейнер)',
    description: 'Контейнер для вложенных блоков с поддержкой колонок',
    props: [
      {
        name: 'columns', namespace: 'design',
        label: 'Количество колонок',
        type: 'select',
        options: [
          { value: '1', label: '1 колонка (Список)' },
          { value: '2', label: '2 колонки' },
          { value: '3', label: '3 колонки' },
          { value: '4', label: '4 колонки' },
        ]
      },
      {
        name: 'gap', namespace: 'design',
        label: 'Расстояние между блоками',
        type: 'select',
        options: [
          { value: 'none', label: 'Без отступов' },
          { value: 'small', label: 'Маленькое' },
          { value: 'default', label: 'Среднее' },
          { value: 'large', label: 'Большое' },
        ]
      }
    ]
  };
