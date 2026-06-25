# Мастер-план: Command Center → apps/studio (Вариант B)

> **Статус:** Wave 1A ✅ · Wave 1B UAT · Wave 2–3 код на `main`.  
> **UAT:** [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md)  
> **Горизонт:** 4–6 недель (1 разработчик + агент).

---

## 1. Зачем отдельное приложение Studio

| Критерий | Оверлей на проде (A) | **apps/studio (B)** |
|----------|----------------------|---------------------|
| Безопасность | Риск утечки CC на гостей | Прод чистый, studio за auth |
| Поддерживаемость | Смешение public + editor | Чёткие границы пакетов |
| Preview | Нативный live | iframe / split-view на тот же PageRenderer |
| Deploy контента | Revalidate | Revalidate (без пересборки образа) |
| Multi-tenant | Сложнее | tenant в URL + BFF scope |

**Принцип:** Command Center — это **UI-слой редактирования**, а не второй источник данных. SSOT после «Опубликовать» — **Strapi**.

---

## 2. Карта функционала Command Center → архитектура

Легенда: ✅ есть в прототипе | 🎯 Wave 1B | 🔜 Wave 2 | 🧪 Wave 3

| Модуль (UnifiedWorkspace) | Прототип (сейчас) | Целевой слой | Wave |
|---------------------------|-------------------|--------------|------|
| **Spotlight-поиск** | `UnifiedWorkspace` MODULES + keywords | `apps/studio` shell | 🎯 1B |
| **Брендинг** (цвет, шрифт, тени, radius, density) | `IntegratorTab` + `ThemeProvider` | Strapi `SiteTheme` + `packages/theme-engine` | 🎯 1B |
| **Tone of Voice** | `cmsStore.brandVoice` | Strapi `GlobalSettings.brandVoice` | 🎯 1B |
| **Несохранённые изменения** | `hasUnsavedChanges` (RAM, неполный) | `DraftSession` + debounce → BFF | 🎯 1B |
| **Пресеты** (готовые + custom) | `saveCustomPreset` в Zustand | Strapi `DesignPreset` collection | 🎯 1B |
| **Смарт-билдер** | `PageBuilder` | Strapi `Page.blocks` draft | 🎯 1B |
| **Inline-редактор виджетов** | `WidgetEditorWrapper` | Только studio preview mode | 🎯 1B |
| **Матрица виджетов** | `WidgetMatrixModal` | Переиспользовать как есть | 🎯 1B |
| **SEO и воронки** | `StrategyTab`, `MarketingTab` | `DesignPreset` + `MarketingRule` JSON | 🔜 2 |
| **UTM → пресет** | `MarketingEngine` | BFF middleware при GET page | 🔜 2 |
| **Лаборатория** | `/sandbox` + localStorage | Strapi `Page` slug `lab-{user}` | 🔜 2 |
| **AI сборка / контент** | `AiCommandModal`, `AiContentTab` | BFF `/studio/ai/*` (Vercel AI SDK) | 🔜 2 |
| **Готовые сайты** | `IndustryPrototypesTab` | Seed `DesignPreset` per industry | 🔜 2 |
| **Block A/B** | `applyAbTestVariant` | `PageBlock.variants` в Strapi | 🔜 2 |
| **Эволюция** | `EvolutionTab` (заглушка) | `Experiment` + worker + аналитика | 🧪 3 |
| **Рентген DOM** | `XRayTab` | Только studio, не на проде | 🎯 1B |
| **State Observer** | `StateObserverTab` | Только studio dev-tools | 🎯 1B |
| **Архитектура FSD** | `ArchitectureTab` | Документация / dev-tools | 🎯 1B |
| **Аналитика** | `AnalyticsTab` (не подключён) | Подключить в studio Wave 2 | 🔜 2 |
| **Секретный unlock** | 3 тапа + Cmd+M | Заменить на **auth** (JWT/Strapi Users) | 🎯 1B |
| **Publish → прод** | Нет | BFF `POST /studio/publish` + revalidate | 🎯 1B |

### Что НЕ переносим в прод

- `DevModeToggle` на `istochnik.smitx.ru` — **убираем** с публичного сайта.
- `uiSettingsStore` на проде — **только read-only** тема с сервера (SSR/inject CSS vars).
- `/src/widget/` и booking backend — **read-only**, без изменений (правило проекта).

---

## 3. Целевая структура monorepo

```
apps/
  web/          ← публичный Next (только render + revalidate)
  studio/       ← Command Center (Next client-heavy)
  bff/          ← API: public + /studio/*
  cms/          ← Strapi persistence

packages/
  contracts/    ← PageBlock, PageDto, EngineState, DesignPresetDto (Zod)
  theme-engine/ ← EngineState → CSS variables (вынести из ThemeProvider)
  page-engine/  ← BlockRenderer registry (Wave 2+)

src/            ← виджеты + marketing-control-panel (shared, не дублировать)
```

**Правило поддерживаемости:** Studio импортирует виджеты из `/src` через webpack alias (как `apps/web` сейчас). Новый код studio-специфичный — только в `apps/studio/`.

---

## 4. Strapi: новые сущности

### 4.1 `SiteTheme` (singleType, per locale/tenant)

```json
{
  "engineState": "json",      // EngineState из contracts
  "activePresetId": "string",
  "publishedAt": "datetime"
}
```

### 4.2 `DesignPreset` (collectionType)

```json
{
  "name": "string",
  "slug": "uid",
  "emoji": "string",
  "description": "text",
  "engineState": "json",
  "pageBlocks": "json",       // опционально: снимок главной
  "tenant": "enumeration",
  "isSystem": "boolean"       // apple, premium из marketingConfig
}
```

### 4.3 `Page` — уже есть

- Используем **Draft & Publish** Strapi 5.
- Блоки = dynamic zone (уже в Wave 1A).

### 4.4 Wave 3: `Experiment`

```json
{
  "hypothesis": "text",
  "status": "draft|running|concluded",
  "variants": "json",
  "metrics": "json"
}
```

---

## 5. BFF: контракт Studio API

| Method | Path | Назначение |
|--------|------|------------|
| GET | `/studio/draft?tenant=&page=` | Черновик страницы + тема |
| PATCH | `/studio/draft` | Autosave (debounce с клиента) |
| GET | `/studio/presets` | Список DesignPreset |
| POST | `/studio/presets` | Сохранить как пресет |
| PUT | `/studio/presets/:id` | Обновить пресет |
| POST | `/studio/publish` | Strapi publish + revalidate tags |
| POST | `/studio/ai/layout` | AI генерация blocks (Wave 2) |

**Auth:** Bearer token (Strapi Users API или отдельный studio JWT). Роли: `integrator`, `director` (director — только пресеты, без токенов).

**Publish flow:**

```
Studio UI → PATCH draft (autosave)
         → POST /studio/publish
              → Strapi publish Page + SiteTheme
              → POST https://istochnik.smitx.ru/api/revalidate?secret=...
              → прод обновлён за секунды (без Coolify rebuild)
```

---

## 6. apps/studio: UX

- URL: `https://studio.istochnik.smitx.ru` (Coolify app **studio-ci**).
- Layout: **split view** — слева `UnifiedWorkspace`, справа iframe preview (`https://istochnik.smitx.ru?preview=1&draftToken=...`) или встроенный PageRenderer.
- Переиспользуем без переписывания:
  - `src/widgets/marketing-control-panel/**`
  - `src/shared/store/*` → постепенно заменить на React Query + BFF
  - `ThemeProvider`, `PageRenderer`, `PrototypeShell`

### Рефакторинг store (обязательно для поддерживаемости)

| Было | Станет |
|------|--------|
| `saveCustomPreset` → RAM | `POST /studio/presets` |
| `setPageBlocks` → RAM | `PATCH /studio/draft` |
| `hasUnsavedChanges` частичный | Единый `draftRevision` на любое изменение |
| `hydrateConfig` не вызывается | `GET /studio/draft` на старте studio |

---

## 7. План по неделям (4–6)

### Неделя 1 — Контракты и Strapi

- [ ] `packages/contracts`: `EngineState`, `DesignPresetDto`, Zod-схемы
- [ ] Strapi: `SiteTheme`, `DesignPreset` content types
- [ ] Seed: импорт `marketingConfig.json` presets в Strapi
- [ ] BFF: `GET/PATCH /studio/draft` (mock → live)

### Неделя 2 — apps/studio scaffold

- [ ] `apps/studio` Next 15, alias на `/src`, `react-router-dom` shim
- [ ] Монтировать `DevModeToggle` + `UnifiedWorkspace` (без секретного unlock)
- [ ] Auth middleware (минимум: shared secret / Strapi login)
- [ ] Coolify: `studio.istochnik.smitx.ru`

### Неделя 3 — Пресеты и publish

- [ ] BFF: presets CRUD + `POST /studio/publish`
- [ ] Баннер «несохранённые» → реальный autosave + «Опубликовать»
- [ ] `apps/web`: читать `SiteTheme` с BFF, inject CSS на SSR
- [ ] Убрать Command Center с публичного `apps/web`

### Неделя 4 — Билдер и inline-edit

- [ ] `PageBuilder` пишет в draft через BFF
- [ ] `WidgetEditorWrapper` в studio preview
- [ ] Фикс: все сеттеры вариантов → `hasUnsavedChanges`
- [ ] Smoke: studio → publish → прод главная обновилась

### Недели 5–6 (Wave 2, опционально)

- [ ] Лаборатория → draft pages в Strapi
- [ ] UTM rules в BFF
- [ ] AI layout endpoint
- [ ] `AnalyticsTab` подключить
- [ ] Block-level A/B в Strapi admin hints

### Wave 3 (после стабилизации)

- [ ] `Experiment` entity + evolution worker
- [ ] AI suggestions на основе метрик (human-in-the-loop publish)

---

## 8. Критерии готовности Wave 1B

1. Интегратор логинится в `studio.istochnik.smitx.ru`.
2. Меняет цвет / вариант Hero / порядок блоков — видит preview.
3. «Сохранить пресет» — пресет в Strapi, переживает F5.
4. «Опубликовать» — `istochnik.smitx.ru` обновился без деплоя образа.
5. Гость на проде **не видит** Command Center и не грузит editor JS.

---

## 9. Связанные документы

- [`docs/UI_ENGINE_ARCHITECTURE.md`](../UI_ENGINE_ARCHITECTURE.md) — видение Command Center
- [`docs/plan/ControlPanel_UX_Refactor_Plan.md`](./ControlPanel_UX_Refactor_Plan.md) — UX рефакторинг
- [`docs/plan/v2/strapi-nextjs-architecture.md`](./v2/strapi-nextjs-architecture.md) — общая CMS-архитектура
- [`docs/refactoring/MASTER_PLAN.md`](../refactoring/MASTER_PLAN.md) — рефакторинг виджетов V2 (параллельно, не блокер)

---

## 10. Риски и как их снимаем

| Риск | Митигация |
|------|-----------|
| Два Next-приложения = дублирование | Shared `/src` + `packages/*` |
| Store в RAM привыкли | Поэтапная замена на React Query |
| Strapi draft API сложный | BFF абстрагирует, studio не ходит в Strapi напрямую |
| Тяжёлый бандл studio | Code-split по модулям CC |
| Сломать booking widget | Black box rule — не трогать `/src/widget` |
