# Этап 4: Чистая Гидратация и Data Binding

## 1. Аудит
Текущий механизм гидратации в `PageRenderer`:
```typescript
let stringified = JSON.stringify(props);
// regex string replace {{key}}
```
Это антипаттерн (The "String Replace" Anti-Pattern). Если поле — массив объектов (например, врачи для DoctorsWidget), этот код этого не переживёт; он ждёт строку `{{key}}`, которую заменит на примитивное значение. 

## 2. Архитектурный План
Введение явного механизма "Data Bindings".
У PageBlock появится новое опциональное поле `bind`.

```typescript
export interface PageBlock {
  id: string;
  type: string;
  content?: Record<string, any>;
  design?: ...
  bind?: {
    // путь в объекте props : путь в контексте CMS (jsonpath)
    'content.title': 'service.title',
    'content.items': 'service.featuresArray'
  }
}
```

Модуль гидратации (Data Binder Utility) не будет переводить всё в строку. Он будет брать клонированный объект `box = cloneDeep(content)`, использовать `lodash.set` и `lodash.get` (или их нативные аналоги):
```typescript
Object.entries(block.bind).forEach(([targetPropPath, sourceCtxPath]) => {
  const valueForWidget = getByPath(contentContext, sourceCtxPath);
  setByPath(hydratedProps, targetPropPath, valueForWidget);
});
```

Это защищает от ломания JSON и позволяет передавать в виджеты целые массивы напрямую из CMS.

## 3. Шаги реализации:
1. Создание утилитарной функции глубокой гидратации (Deep Hydration Bindings).
2. Удаление регулярных выражений из `PageRenderer`.
3. Модификация моковых данных услуг (`MOCK_SERVICES` в cmsStore), чтобы они использовали чистый маппинг.

## 4. Авто-тесты и валидация
Проверим случай, когда виджет ожидает `Array`, а `contentContext` отдает `Array`.

---
Будет выполнено в качестве четвертого шага рефакторинга.
