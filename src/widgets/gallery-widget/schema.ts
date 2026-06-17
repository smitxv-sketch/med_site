import { WidgetDefinition } from '@/shared/types/widget';

export const GalleryWidgetSchema: WidgetDefinition = {
    type: 'GalleryWidget',
    title: 'Галерея (Медиа)',
    description: 'Блок с фотографиями (пространство, оборудование, портфолио)',
    props: [
      {
        name: 'title', namespace: 'content',
        label: 'Заголовок',
        type: 'string',
        placeholder: 'Наша инфраструктура'
      },
      {
        name: 'subtitle', namespace: 'content',
        label: 'Подзаголовок',
        type: 'string',
        placeholder: 'Современные технологии для вашего комфорта'
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
          { value: 'grid', label: 'Сетка' },
          { value: 'masonry', label: 'Плитка Masonry' },
          { value: 'bento', label: 'Бенто' },
          { value: 'carousel', label: 'Карусель' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Скролл карусель' },
          { value: 'stack', label: 'Стек фото' },
        ]
      }
    ]
  };
