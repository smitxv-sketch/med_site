import { WidgetDefinition } from '@/shared/types/widget';

export const FaqWidgetSchema: WidgetDefinition = {
    type: 'FaqWidget',
    title: 'Частые вопросы (FAQ)',
    description: 'Ответы на популярные вопросы',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок',
        type: 'string',
        placeholder: 'Ответы на вопросы'
      },
      {
        name: 'subtitle', namespace: 'content',
        label: 'Подзаголовок',
        type: 'string',
        placeholder: 'Собрали самое важное для вас'
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
          { value: 'accordion', label: 'Аккордеон (Accordion)' },
          { value: 'split', label: 'Разделенный экран (Split)' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'accordion', label: 'Аккордеон (Accordion)' },
        ]
      }
    ]
  };
