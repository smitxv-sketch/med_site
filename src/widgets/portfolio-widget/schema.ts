import { WidgetDefinition } from '@/shared/types/widget';

export const PortfolioWidgetSchema: WidgetDefinition = {
    type: 'PortfolioWidget',
    title: 'Портфолио / До и После',
    description: 'Крупные примеры работ со слайдером "До/После"',
    props: [
      { name: 'title', namespace: 'content', label: 'Заголовок', type: 'string' },
       { name: 'intent', namespace: 'design', label: 'Смысловой акцент (Ось 1)', type: 'select', options: [{ value: 'immersive', label: 'Эмоциональный/Имиджевый' }, { value: 'direct-response', label: 'Продающий' }] },
      { name: 'desktopVariant', namespace: 'design', label: 'Паттерн верстки (Десктоп)', type: 'select', options: [{ value: 'stack', label: 'Стек (Крупный)' }, { value: 'grid', label: 'Сетка' }] },
      { name: 'mobileVariant', namespace: 'design', label: 'Паттерн верстки (Мобайл)', type: 'select', options: [{ value: 'stack', label: 'Стек карточек' }, { value: 'carousel', label: 'Скролл карусель' }] },
      { name: 'customVariant', label: 'Кастомное переопределение (Advanced)', type: 'string', description: 'Строковый ID уникального дизайна. Используйте с осторожностью.', placeholder: 'Например: v-gallery-grid-2x' }
    ]
  };
