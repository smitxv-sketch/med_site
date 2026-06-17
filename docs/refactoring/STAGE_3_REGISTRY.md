# Этап 3: Децентрализация Реестра (The FSD Way)

## 1. Аудит
Файл `src/shared/config/widgetsRegistry.ts` сейчас весит почти 600 строк. Любое добавление нового виджета ломает архитектурные границы слоя (Feature-Sliced Design) — заставляет лазить в Shared слой ради фичи (Widget).

## 2. Архитектурный План
Внедрение паттерна реестра плагинов (Plugin/Module Registry). 
Каждый виджет (например `src/widgets/hero-widget/`) будет экспортировать свой файл:
`hero.widget.ts` или `hero.schema.ts`.

Внутри этого файла:
```typescript
import { WidgetDefinition } from '@/shared/types/widget';

export const HeroWidgetDef: WidgetDefinition = {
  type: 'HeroWidget',
  title: 'Главный блок',
  description: 'Баннер',
  component: lazy(() => import('./ui/HeroWidget')),
  schema: { ... }
}
```

А в Shared слое будет просто загрузчик:
```typescript
import { HeroWidgetDef } from '@/widgets/hero-widget/hero.schema';
import { FaqWidgetDef } from '@/widgets/faq-widget/faq.schema';

export const WIDGET_REGISTRY = {
  [HeroWidgetDef.type]: HeroWidgetDef,
  [FaqWidgetDef.type]: FaqWidgetDef
};
```

Размер реестра станет минимальным, а вся логика конфигурации, описания полей (формы) и пропсов виджета останется ВНУТРИ папки самого виджета. Это изолирует код.

## 3. Шаги реализации:
1. Создать базовый интерфейс `WidgetDefinition`.
2. Вынести схемы из глобального файла в конкретные директории `/widgets/*/model/*`.
3. Объединить экспорт в единый файл реестра.

## 4. Авто-тесты и валидация
Будем проверять сборку (`build`). Если всё разбито на чанки правильно, ленивая загрузка будет работать быстрее.

---
Будет выполнено в качестве третьего шага рефакторинга.
