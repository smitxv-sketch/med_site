export type WidgetIntent = 
  | 'direct-response' // Фокус на лидогенерацию, формы, яркие кнопки, минимизация текста (High Conversion)
  | 'educational'     // Фокус на чтение, рациональные доводы, таблицы, схемы (Informative)
  | 'immersive';      // Фокус на эмоции, большие фото, видео, сторителлинг (Brand/Trust)

export type WidgetLayout = 
  | 'split'     // 50/50 (Картинка с одной стороны, текст с другой)
  | 'grid'      // Сетка элементов (Карточки)
  | 'stack'     // Элементы друг под другом (Центрированные)
  | 'fluid';    // На всю ширину экрана с плавающим контентом

// Основа для любой пропсы виджета в новой парадигме
export interface BaseWidgetProps {
  intent?: WidgetIntent;
  layoutPattern?: WidgetLayout;
  // Для уникальных структур, которые не вписываются в матрицу
  customVariant?: string; 
}
