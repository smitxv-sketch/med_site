# Статус миграции: Источник → Strapi + BFF + Next

> **Для смены чата:** начни с этого файла.  
> **Мастер-план:** [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

**Последнее обновление:** 2026-06-24  
**Ветка:** `main` (локально — Wave 1B волна 2, коммит перед деплоем)

---

## Wave 1A — ✅ закрыта

## Wave 1B — в работе (2 волны сделаны локально)

| # | Задача | Статус |
|---|--------|--------|
| 1 | contracts: EngineState + Zod | ✅ `3366f3c` |
| 2 | Strapi SiteTheme + DesignPreset | ✅ в репо |
| 3 | BFF `/studio/draft`, `/presets` | ✅ |
| 4 | apps/studio scaffold | ✅ |
| 5 | **UnifiedWorkspace + live preview** | ✅ split-view |
| 6 | **Autosave черновика (debounce)** | ✅ Zustand → PATCH |
| 7 | **POST `/studio/publish` + revalidate** | ✅ BFF |
| 8 | Studio API proxy (без секрета в браузере) | ✅ `/api/studio/*` |
| 9 | Деплой Strapi + site-ci + studio | ⏳ **следующий шаг** |
| 10 | Coolify `studio-istochnik` | ⏳ |
| 11 | `apps/web` читает SiteTheme с BFF | ⏳ |
| 12 | Убрать CC с публичного web | ⏳ |

### Локальный запуск Studio

```bash
# Терминал 1
npm run dev:bff
# apps/bff/.env → STUDIO_API_SECRET=dev-secret
# опционально STRAPI_API_TOKEN + REVALIDATE_SECRET для publish на Strapi

# Терминал 2
# apps/studio/.env → STUDIO_API_SECRET=dev-secret (тот же)
npm run dev:studio
# → http://localhost:3003 — Command Center + preview
```

### Env для прод-деплоя (site-ci)

| Переменная | Где |
|------------|-----|
| `STUDIO_API_SECRET` | site-ci (BFF) + studio app |
| `STRAPI_API_TOKEN` | site-ci (BFF) — write для publish |
| `REVALIDATE_SECRET` | site-ci BFF (= `REVALIDATE_TOKEN` на web) |

---

## Прод (до деплоя Wave 1B)

| Сервис | URL | Коммит на проде |
|--------|-----|-----------------|
| Сайт | https://istochnik.smitx.ru | `d316860` (CMS fix) |
| CMS | cms.istochnik.smitx.ru | `d316860` |
| Studio | — | не задеплоен |

---

## Журнал

### 2026-06-24 — Wave 1B волна 2
- Studio: UnifiedWorkspace, live PageRenderer preview, autosave, кнопка «Опубликовать»
- BFF: `POST /studio/publish` → Strapi + revalidate
- contracts: `mapPageBlocksToStrapi`

### 2026-06-24 — Wave 1B волна 1 (`3366f3c`)
- contracts, Strapi theme/presets, BFF draft API, studio scaffold

### 2026-06-24 — Wave 1A закрыта (`d316860`)

---

## Правила

- Не трогать `/src/widget/` и booking backend
- Publish → Strapi + revalidate, не redeploy site-ci ради контента
