# Дизайн-система и Архитектура проекта

Этот документ описывает фундаментальные принципы дизайна, структуру компонентов и дорожную карту развития фронтенда для интеграции с CMS (Strapi). Это наша «конституция» фронтенда.

**SSOT код:** [`src/shared/config/designTokens.ts`](src/shared/config/designTokens.ts)  
**CSS-маппинг:** [`src/index.css`](src/index.css) (`@theme`)  
**Tailwind:** [`tailwind.config.js`](tailwind.config.js)  
**Lint:** `node scripts/design-lint.mjs`

## 🗺 Дорожная карта (Roadmap)

### Этап 1: Стабилизация фундамента (Design Tokens) [ВЫПОЛНЕНО]
- [x] Сбор корпоративных цветов, шрифтов и отступов.
- [x] Фиксация токенов в `designTokens.ts`, `index.css`, `tailwind.config.js`.
- [x] Создание `DESIGN_SYSTEM.md` с правилами использования.
- [x] CI-guard: `scripts/design-lint.mjs`.

### Этап 2: Атомарный рефакторинг (UI Kit) [ПЛАНИРУЕТСЯ]
- [ ] Аудит текущих страниц (Главная, Врачи, Услуги).
- [ ] Выделение изолированных, переиспользуемых компонентов в `src/components/ui/`.
- [ ] Перевод arbitrary размеров (`text-[Npx]`) на типографические токены.

### Этап 3: Создание системы Блоков (Widgets / Blocks) [ПЛАНИРУЕТСЯ]
- [ ] Разработка компонентов уровня блоков для маппинга на Strapi.

### Этап 4: Интеграция CMS (Strapi) [ПЛАНИРУЕТСЯ]
- [ ] Подключение API и `<BlockRenderer>`.

---

## 🎨 Дизайн-токены (Уровень 1)

### Семантические UI-токены

| Токен | Tailwind / CSS | Назначение |
|-------|----------------|------------|
| `SEMANTIC.textPrimary` | `text-gray-900` | Заголовки, основной текст |
| `SEMANTIC.textSecondary` | `text-gray-500` | Вторичный текст |
| `SEMANTIC.surface` | `bg-white` | Карточки |
| `SEMANTIC.surfaceMuted` | `bg-gray-50` | Фон страницы |
| `CSS_VAR.brand` | `hsl(var(--brand-h)…)` | Динамический бренд (ThemeProvider) |
| `brand-violet` | `--color-accent` | ВРТ / акцент |
| `brand-orange` | `--color-brand-orange` | Детская клиника |
| `brand-blue` | `--color-brand-blue` | Косметология |
| `brand-turquoise` | `--color-brand-turquoise` | Программы |

### Цветовое кодирование направлений (`DIRECTION_TOKENS`)

| Направление | Tailwind accent | CSS inline |
|-------------|-----------------|------------|
| ВРТ | `brand-violet` | `DIRECTION_TOKENS.vrt` |
| Поликлиника | `brand` | `DIRECTION_TOKENS.clinic` |
| Детская | `brand-orange` | `DIRECTION_TOKENS.kids` |
| Косметология | `brand-blue` | `DIRECTION_TOKENS.cosmo` |
| Скорая | `red-500` | `DIRECTION_TOKENS.ambulance` |
| Программы | `brand-turquoise` | `DIRECTION_TOKENS.programs` |

### Платформенные цвета (`PLATFORM_COLORS`)

VK, OK, ProDoctorov, 2GIS, Yandex, WhatsApp — только через `platform-*` классы или `PLATFORM_COLORS.*`.

### Типографика (Typography)
*Inter через `--font-primary`. Arbitrary `text-[Npx]` — отдельный sprint.*

### Формы и тени (Radii & Shadows)
*`--app-radius` (24px), `--app-shadow`. Hero-кнопки pill 30px — осознанное исключение.*

---

## 🏗 Правила разработки (Уровень 2)

1. **Никаких хардкод-цветов в компонентах:** HEX только в `designTokens.ts`. Компоненты — Tailwind semantic (`text-gray-900`, `bg-brand`) или `CSS_VAR.*`.
2. **Изоляция UI:** `src/components/ui/` — без бизнес-логики.
3. **Блочная структура:** страницы из независимых виджетов/CMS-блоков.
4. **Booking widget (`src/widget/`):** read-only при работе над сайтом.
