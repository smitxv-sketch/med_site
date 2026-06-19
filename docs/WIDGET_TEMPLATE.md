# Шаблон нового виджета (Wave 8)

Чеклист для добавления виджета в med_site без архитектурных сюрпризов.

## 1. Структура папки

```
src/widgets/{name}-widget/
  schema.ts              # WidgetDefinition (props, variants)
  config/{name}Theme.ts  # layout + ссылки на designTokens (без HEX)
  ui/{Name}Widget.tsx    # entry point
  ui/variants/           # DesktopVariantA.tsx, MobileVariantA.tsx (по необходимости)
  lib/                   # resolve{Name}Variants.ts, утилиты
```

Скелет: `src/widgets/_template/`

## 2. Регистрация

Одна запись в `src/shared/config/widgetManifest.ts`:

- `type` — каноническое имя (`PromotionsWidget`)
- `schema` — из `schema.ts`
- `component` — lazy или sync import
- `aliases` — только legacy (`hero` → `HeroWidget`)

## 3. Варианты desktop / mobile

- Секционные виджеты: `block.design.desktopVariant` / `mobileVariant`
- Resolver: `resolveWidgetVariant()` из `src/shared/lib/widgets/resolveWidgetVariant.ts`
- Global shell (Header, BottomNav): `uiSettingsStore` + registry

## 4. Контент vs UI

| Слой | Где |
|------|-----|
| Тексты, ссылки, изображения, порядок | `src/shared/content/*.json` |
| Гидратация (даты, DIRECTION_UI) | `src/shared/api/contentHydrator.ts` |
| Публичный API для UI | `*Repository.ts` |
| Размеры, интервалы, mapping токенов | `config/*Theme.ts` |
| HEX / rgba | **только** `src/shared/config/designTokens.ts` |

## 5. PageRenderer

Виджет получает props через pipeline:

`processBlockData` → `mergeWidgetProps` (content + design + legacy props)

Не добавляйте логику в `PageRenderer.tsx` — только в виджете или pipeline helpers.

## 6. Запрещено

- Правки `/src/widget/` (онлайн-запись) и `php_backend`
- God-files > 400 строк
- Хардкод текстов/цветов в `.tsx`
- Дублирование регистрации (только `widgetManifest.ts`)

## 7. Проверка перед PR

```bash
npm run build
npm run lint
```

Mobile + desktop smoke на главной.
