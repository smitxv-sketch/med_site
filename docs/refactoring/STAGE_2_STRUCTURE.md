# Этап 2: Иерархия (Trees vs Flat Arrays)

## 1. Аудит
Текущая конфигурация в `cmsStore.ts`:
`export const DEFAULT_PAGE_BLOCKS: PageBlock[] = [...]`
Всё является массивом первого уровня. 

У нас есть `WidgetEditorWrapper`, который ожидает `blocks` и умеет менять их местами. Если мы введём детей (сложную вложенность), драг-н-дроп и рендеринг усложняются экспоненциально. Растут шансы получить сбой производительности.

## 2. Архитектурный План
Внедрение `children: PageBlock[]` в сам `PageBlock`.

```typescript
export interface PageBlock {
  id: string;
  type: string;
  content?: Record<string, any>;
  design?: BlockDesignParams;
  config?: BlockConfigParams;
  // Новое поле для вложенности:
  children?: PageBlock[]; 
}
```

Некоторые виджеты будут иметь метадату: `isContainer: true`.
Они смогут отрендерить внутри себя `PageRenderer` рекурсивно, передав ему свой `children` массив.

## 3. Шаги реализации:
1. Добавление поля `children?: PageBlock[]` в тип платформы.
2. Поддержка в `PageRenderer`: если виджет — это контейнер (مثلا "Bento Grid" или "Tabs"), он будет получать не только свои `content/design`, но и `children`.
3. Создать `ContainerWidget`, который принимает `children` и рендерит внутри себя вложенные компоненты с помощью `PageRenderer` (`isNested={true}`).

## 4. Авто-тесты и валидация
Написание мок-визуализации 2-уровневого дерева. Ожидаемый результат: родительский блок рендерит дочерние.

---
Будет выполнено в качестве второго шага рефакторинга.
