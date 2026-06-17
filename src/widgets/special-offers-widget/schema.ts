import { WidgetDefinition } from '@/shared/types/widget';

export const SpecialOffersWidgetSchema: WidgetDefinition = {
    type: 'SpecialOffersWidget',
    title: 'Спецпредложения',
    description: 'Особые медицинские программы и чекапы',
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
          { value: 'grid', label: 'Сетка 3 колонки' },
          { value: 'bento', label: 'Бенто сетка' },
          { value: 'carousel', label: 'Скролл лента' },
        ]
      },
      {
        name: 'mobileVariant', namespace: 'design',
        label: 'Паттерн верстки (Мобайл)',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Скролл карусель' },
          { value: 'stack', label: 'Стек карточек' },
        ]
      }
    ]
  };
