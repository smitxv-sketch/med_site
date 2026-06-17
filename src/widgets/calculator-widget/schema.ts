import { WidgetDefinition } from '@/shared/types/widget';

export const CalculatorWidgetSchema: WidgetDefinition = {
    type: 'CalculatorWidget',
    title: 'Калькулятор / Форма-Квиз',
    description: 'Динамичный расчет стоимости или запись на услугу',
    props: [
      { name: 'title', namespace: 'content', label: 'Заголовок', type: 'string' },
      { name: 'intent', namespace: 'design', label: 'Смысловой акцент (Ось 1)', type: 'select', options: [{ value: 'direct-response', label: 'Агрессивный лидген' }, { value: 'educational', label: 'Информативный' }] },
      { name: 'desktopVariant', namespace: 'design', label: 'Паттерн верстки (Десктоп)', type: 'select', options: [{ value: 'split', label: 'Split (50/50)' }, { value: 'fluid', label: 'На всю ширину' }] },
      { name: 'mobileVariant', namespace: 'design', label: 'Паттерн верстки (Мобайл)', type: 'select', options: [{ value: 'stack', label: 'Стек (форма снизу)' }] },
      { name: 'customVariant', label: 'Кастомное переопределение (Advanced)', type: 'string', description: 'Строковый ID уникального дизайна, не входящего в матрицу. Затирает базовые оси.', placeholder: 'Например: v-promo-x' }
    ]
  };
