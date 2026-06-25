# Статус миграции: Источник → Strapi + BFF + Next

> **UAT:** [`UAT_MASTER_PLAN.md`](./UAT_MASTER_PLAN.md)  
> **Мастер-план:** [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

**Обновлено:** 2026-06-25  
**Ветка:** `main` — Wave 1B UAT · Wave 2/3/4 код готов, ждёт деплой

---

## Wave 1A — ✅ закрыта

## Wave 1B — UAT (копим)

См. [`UAT_MASTER_PLAN.md`](./UAT_MASTER_PLAN.md) часть 1. Smoke и инфра ✓, E2E Studio — в процессе.

## Wave 2 — код ✅, UAT ⏳

| # | Задача | Статус |
|---|--------|--------|
| 1 | UTM → `/api/site-theme` | ✅ |
| 2 | Лаборатория `lab-*` | ✅ |
| 3 | Analytics EventDelegator | ✅ |
| 4 | AI layout | ✅ |
| 5 | Block A/B | ✅ |
| 6 | Деплой + UAT | ⏳ |

→ [`plan/WAVE_2_TRACKER.md`](./plan/WAVE_2_TRACKER.md)

## Wave 3 — код ✅, UAT ⏳

| # | Задача | Статус |
|---|--------|--------|
| 1 | Experiment entity (BFF) | ✅ |
| 2 | start / track metrics | ✅ |
| 3 | suggest (rules + AI) | ✅ |
| 4 | apply → draft only | ✅ |
| 5 | EvolutionTab UI | ✅ |
| 6 | Деплой + UAT | ⏳ |

→ [`plan/WAVE_3_TRACKER.md`](./plan/WAVE_3_TRACKER.md)

## Wave 4 — код ✅, UAT ⏳

| # | Задача | Статус |
|---|--------|--------|
| 1 | Inline-edit в `StudioPreview` | ✅ |
| 2 | `POST /studio/presets` + hydrate | ✅ |
| 3 | `saveCustomPreset` → BFF | ✅ |
| 4 | UAT часть 5 | ✅ |
| 5 | Деплой + UAT | ⏳ |

## Wave 5 — фаза 1 ✅ код, UAT ⏳

| # | Задача | Статус |
|---|--------|--------|
| 1 | Draft: pageSeo, brandVoice, pageTitle | ✅ |
| 2 | AnalyticsTab в меню CC | ✅ |
| 3 | Fix onPublish в Studio | ✅ |
| 4 | Presets Strapi CRUD | ✅ |
| 5 | Auth Strapi Users | ☐ |

→ [`plan/WAVE_5_MASTER_TRACKER.md`](./plan/WAVE_5_MASTER_TRACKER.md)

---

## Прод

| Сервис | URL |
|--------|-----|
| Сайт | https://istochnik.smitx.ru |
| CMS | https://cms.istochnik.smitx.ru |
| Studio | https://studio.istochnik.smitx.ru |

---

## Журнал

### 2026-06-25 — Wave 4 (код)
- StudioPreview inline-edit, POST presets, hydrate custom presets

### 2026-06-25 — Wave 3 (код)
- BFF experiments API, EvolutionTab в Studio, human-in-the-loop apply

### 2026-06-25 — Wave 2 (код)
- UTM, lab, AI layout, Analytics, block A/B

### 2026-06-25 — Инфра Wave 1B
- Dockerfile, DNS, SSL, env runtime-only, UAT plan

---

## Правила

- Не трогать `/src/widget/` и booking backend  
- Publish → Strapi + revalidate, не redeploy site-ci ради контента  
- Wave 3: apply эксперимента **не** публикует — только draft  
