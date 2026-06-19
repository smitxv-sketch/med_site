# SSOT-пакет для внешних агентов · med_site

Документ описывает, **какие файлы отдавать агенту** и **что из них является источником истины**.

---

## Что отдавать агенту (минимальный пакет)

| Приоритет | Файл | Роль |
|-----------|------|------|
| **1** | [`src/shared/config/designTokens.ts`](../src/shared/config/designTokens.ts) | **Главный SSOT код** — все HEX, направления, платформы, hero-токены |
| **2** | [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) | Правила и человекочитаемая карта токенов |
| **3** | [`src/index.css`](../src/index.css) | CSS-переменные runtime (`@theme`, `--brand-h`, platform colors) |
| **4** | [`tailwind.config.js`](../tailwind.config.js) | Tailwind-алиасы: `brand`, `brand-violet`, `platform-*` |
| **5** | [`docs/plan/design_delta_filled.md`](plan/design_delta_filled.md) | Пример формата «Дельта» для точечных замен |

**Опционально для контекста (не SSOT):**
- [`AGENTS.md`](../AGENTS.md) — UX/архитектурные правила
- [`.cursorrules`](../.cursorrules) — запреты (booking read-only, no god files)

**Не отдавать как SSOT цветов (см. [`docs/legacy/`](legacy/README.md)):**
- [`docs/legacy/04-ui-ux-design-system.md`](legacy/04-ui-ux-design-system.md) — устаревшая матрица направлений (UX-принципы ок)
- [`server/config/legacy/theme.json`](../server/config/legacy/theme.json) — legacy BFF/booking, не синхронизирован с сайтом
- [`docs/legacy/audits/design_audit.md`](legacy/audits/design_audit.md) — снимок аудита; перегенерировать: `node scripts/design-audit.mjs`

---

## Иерархия токенов

```
designTokens.ts (PRIMITIVE — единственные HEX)
    ↓
index.css (@theme CSS vars)
    ↓
tailwind.config.js (brand-*, platform-*, gray-*)
    ↓
Компоненты (.tsx) — только классы и CSS_VAR.*
```

**Запрещено в компонентах:** `#hex`, `text-[#…]`, `bg-[#…]`  
**Проверка:** `npm run lint:design`

---

## Ключевые экспорты `designTokens.ts`

| Экспорт | Когда использовать |
|---------|-------------------|
| `DIRECTION_UI` | Карточки направлений, mega-menu, hero badge/bg |
| `DIRECTION_TOKENS` | Inline style accent, badge background |
| `PLATFORM_COLORS` | VK, OK, ProDoctorov, 2GIS, Yandex, WhatsApp |
| `SEMANTIC` | Текст, surface, border (`text-gray-900`, `bg-gray-50`) |
| `CSS_VAR` | Inline `style={{ backgroundColor: CSS_VAR.brand }}` |
| `HERO_TOKENS` | Только hero-widget конфиги |
| `PRIMITIVE` | Только внутри designTokens / a11y — не импортировать в UI |

---

## Направления (DESIGN_SYSTEM)

| ID | Tailwind | Назначение |
|----|----------|------------|
| `vrt` | `brand-violet` | ВРТ / ЭКО |
| `clinic` | `brand` | Поликлиника (динамический HSL) |
| `kids` | `brand-orange` | Детская |
| `cosmo` | `brand-blue` | Косметология |
| `ambulance` | `red-500` | Скорая |
| `programs` | `brand-turquoise` | Комплексные программы |

---

## Брендбук

**Отдельного PDF/FIGMA брендбука в репозитории нет.**  
Визуальная «конституция» проекта = `designTokens.ts` + `DESIGN_SYSTEM.md`.

Если у вас есть внешний брендбук клиники — его нужно **сверить с `PRIMITIVE` в designTokens.ts** и оформить Дельту (REPLACE/KEEP), а не подменять SSOT напрямую в компонентах.

---

## Workflow для внешнего агента

1. Прочитать `DESIGN_SYSTEM.md` + `designTokens.ts`
2. Для правок цветов — получить **Дельта-таблицу** (REPLACE/KEEP/DEFER)
3. Менять только строки с REPLACE
4. Прогнать `npm run lint:design` и `npm run build`
5. **Не трогать** `src/widget/` (booking)

---

## Whitelist HEX (ожидаемо)

- `src/shared/config/designTokens.ts`
- `src/index.css`
- `src/app/styles/accessibility.css`
- `src/widget/**` (booking microservice)
