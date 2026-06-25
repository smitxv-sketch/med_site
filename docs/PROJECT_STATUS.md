# Статус миграции: Источник → Strapi + BFF + Next

> **Приёмка:** [`plan/PLAN_CLOSURE.md`](./plan/PLAN_CLOSURE.md) · **UAT:** [`UAT_MASTER_PLAN.md`](./UAT_MASTER_PLAN.md)  
> **Мастер-план:** [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

**Обновлено:** 2026-06-25  
**Ветка:** `main` — **разработка закрыта**, фаза **приёмки (UAT)**

---

## Сводка

| Волна | Код | Деплой | UAT |
|-------|-----|--------|-----|
| 1A | ✅ | ✅ | ✅ |
| 1B | ✅ | ✅ | 🔍 ваша проверка |
| 2 | ✅ | ✅ | 🔍 |
| 3 | ✅ | ✅ | 🔍 |
| 4 | ✅ | ✅ | 🔍 |
| 5 (фазы 0–2, 4) | ✅ | ✅ | 🔍 |
| 5 (фазы 3, 5–9) | ⏸ backlog | — | — |

**Smoke:** `npm run smoke:prod` → 8/8

---

## Wave 1A — ✅ закрыта

## Wave 1B — 🔍 UAT

См. [`UAT_MASTER_PLAN.md`](./UAT_MASTER_PLAN.md) часть 1. Smoke и инфра ✓, E2E Studio — **ваша проверка**.

## Wave 2 — код ✅, UAT 🔍

| # | Задача | Статус |
|---|--------|--------|
| 1 | UTM → `/api/site-theme` | ✅ |
| 2 | Лаборатория `lab-*` | ✅ |
| 3 | Analytics EventDelegator | ✅ |
| 4 | AI layout | ✅ |
| 5 | Block A/B | ✅ |
| 6 | Деплой + UAT | 🔍 деплой ✅ |

→ [`plan/WAVE_2_TRACKER.md`](./plan/WAVE_2_TRACKER.md)

## Wave 3 — код ✅, UAT 🔍

| # | Задача | Статус |
|---|--------|--------|
| 1 | Experiment entity (BFF) | ✅ |
| 2 | start / track metrics | ✅ |
| 3 | suggest (rules + AI) | ✅ |
| 4 | apply → draft only | ✅ |
| 5 | EvolutionTab UI | ✅ |
| 6 | Деплой + UAT | 🔍 деплой ✅ |

→ [`plan/WAVE_3_TRACKER.md`](./plan/WAVE_3_TRACKER.md)

## Wave 4 — код ✅, UAT 🔍

| # | Задача | Статус |
|---|--------|--------|
| 1 | Inline-edit в `StudioPreview` | ✅ |
| 2 | Presets Strapi CRUD | ✅ |
| 3 | `saveCustomPreset` → BFF | ✅ |
| 4 | UAT часть 5 (чеклист) | ✅ |
| 5 | Деплой + UAT | 🔍 деплой ✅ |

## Wave 5 — фазы 0–2, 4 ✅ · 3, 5–9 backlog

| # | Задача | Статус |
|---|--------|--------|
| 1 | Draft: pageSeo, brandVoice, pageTitle | ✅ |
| 2 | AnalyticsTab в меню CC | ✅ |
| 3 | Fix onPublish в Studio | ✅ |
| 4 | Presets Strapi CRUD | ✅ |
| 5 | AI через BFF в Studio | ✅ |
| 6 | Auth Strapi Users | ⏸ |

→ [`plan/WAVE_5_MASTER_TRACKER.md`](./plan/WAVE_5_MASTER_TRACKER.md)

---

## Прод

| Сервис | URL |
|--------|-----|
| Сайт | https://istochnik.smitx.ru |
| CMS | https://cms.istochnik.smitx.ru |
| Studio | https://studio.istochnik.smitx.ru |

---

## Правила

- Не трогать `/src/widget/` и booking backend  
- Publish → Strapi + revalidate, не redeploy site-ci ради контента  
- Wave 3: apply эксперимента **не** публикует — только draft  
- Деплой: [`DEPLOY_FAILURE_CLASSES.md`](./DEPLOY_FAILURE_CLASSES.md)
