# Этап 1: Чистые Пропсы (Props Isolation & Typing)

## 1. Аудит
Текущий `PageBlock` выглядит так:
```typescript
export interface PageBlock {
  id: string;
  type: WidgetType;
  props?: Record<string, any>;
}
```

Проблемы:
- `props` является свалкой. Тут лежит `backgroundColor`, `hidden`, `title`, `limit`, `visibilityTarget`. 
- Рендерер не знает, как безопасно стилизовать обертку виджета, поэтому занимается грязными проверками.

## 2. Архитектурный План
Мы введем строгие namespaces внутри `PageBlock`:

```typescript
export interface BlockDesignParams {
  backgroundColor?: string;
  paddingTop?: 'none' | 'small' | 'default' | 'large';
  paddingBottom?: 'none' | 'small' | 'default' | 'large';
  layoutPattern?: string; // Перемещено из корневых props
  intent?: string; // Перемещено из корневых props
}

export interface BlockConfigParams {
  hidden?: boolean;
  visibilityTarget?: 'all' | 'mobile' | 'desktop';
  visibilityAuth?: 'all' | 'guest' | 'auth';
}

export interface PageBlock {
  id: string;
  type: string; // Заменим enum/union тип на string для гибкости
  content?: Record<string, any>;   // title, subtitle, items (Данные конкретного виджета)
  design?: BlockDesignParams;      // Визуальный слой (Ось 1, Ось 2, отступы, фон)
  config?: BlockConfigParams;      // Платформенные настройки (Скрытие, доступ, A/B)
}
```

## 3. Шаги реализации:
1. Заменить тип `PageBlock` везде (cmsStore, uiSettingsStore - объединить их в одно место, желательно `shared/types/block.ts`).
2. Обновить `WIDGETS_REGISTRY` или формы в редакторе, чтобы они писали изменения в правильный неймспейс (`onUpdateBlock({ design: { ... }})`).
3. Обновить `PageRenderer`, чтобы он брал свойства из нужного места.

## 4. Авто-тесты и валидация
Будем проверять загрузку `PageRenderer` с изолированными пропсами. Убедимся, что виджеты продолжают читать `content` и `design` корректно.

---
Будет выполнено в качестве первого шага рефакторинга.
