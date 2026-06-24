# Статус миграции: Источник → Strapi + BFF + Next

> **Для смены чата:** начни с этого файла. Обновляй после каждой сессии.  
> **Мастер-план Studio:** [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

**Последнее обновление:** 2026-06-24  
**Ветка:** `main` (локальные изменения Wave 1B — коммит после проверки)  
**Прод:** https://istochnik.smitx.ru · CMS: https://cms.istochnik.smitx.ru

---

## Wave 1A — ✅ закрыта

Strapi API 200, home засеян, site-ci работает. Детали в журнале ниже.

---

## Текущая волна: **Wave 1B — Studio (в работе)**

| # | Задача | Статус | Примечание |
|---|--------|--------|------------|
| 1 | `packages/contracts`: EngineState + Zod + Studio DTOs | ✅ | `types/engine.ts`, `schemas/*`, fixtures |
| 2 | Strapi: `SiteTheme`, `DesignPreset` | ✅ | Схемы + bootstrap seed |
| 3 | BFF: `/studio/draft`, `/studio/presets` + auth | ✅ | RAM overlay; Strapi read |
| 4 | `apps/studio` scaffold | ✅ | Next :3003, каркас страницы |
| 5 | Деплой CMS (site-theme, presets) | ⏳ | После коммита → strapi-istochnik |
| 6 | Coolify `studio-istochnik` | ⏳ | studio.istochnik.smitx.ru |
| 7 | UnifiedWorkspace в studio | ⏳ | Неделя 2 плана |
| 8 | `POST /studio/publish` + revalidate | ⏳ | Неделя 3 |
| 9 | Убрать CC с публичного web | ⏳ | После studio auth |

**Локально:**
```bash
npm run dev:bff          # :3001
npm run dev:studio       # :3003
# STUDIO_API_SECRET в apps/bff/.env и apps/studio/.env
```

---

## Прод-инфраструктура

| Сервис | URL | Coolify app | Статус |
|--------|-----|-------------|--------|
| Сайт | https://istochnik.smitx.ru | site-ci | ✅ |
| CMS | https://cms.istochnik.smitx.ru | strapi-istochnik | ✅ commit `d316860` |
| Studio | studio.istochnik.smitx.ru | — | каркас в репо, не задеплоен |

---

## Ключевые коммиты

| Коммит | Что |
|--------|-----|
| `d316860` | fix(cms): Strapi API 500 + bootstrap Wave 1A |
| `e3c7995` | docs: Wave 1A status |

*Следующий:* `feat(studio): Wave 1B contracts, Strapi theme/presets, BFF studio API, apps/studio`*

---

## Журнал сессий

### 2026-06-24 — Wave 1B старт
- Contracts: EngineState, StudioDraftDto, Zod schemas, system presets
- Strapi: `site-theme`, `design-preset` + bootstrap
- BFF: `GET/PATCH /studio/draft`, `GET /studio/presets`, `studioAuth`
- `apps/studio` — минимальный Next shell

### 2026-06-24 — Wave 1A закрыта
- Strapi deploy `ys9cwow9enhlrcwkewpuo3vm`, API 200

---

## Правила

- **Не трогать** `/src/widget/` и booking backend
- SSOT типов: `packages/contracts`
- Publish контента → Strapi + revalidate, не redeploy site-ci
