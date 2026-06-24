# Статус миграции: Источник → Strapi + BFF + Next

> **Для смены чата:** начни с этого файла.  
> **Мастер-план:** [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

**Последнее обновление:** 2026-06-24  
**Ветка:** `main` — Wave 1B волна 3 в работе (локально)

---

## Wave 1A — ✅ закрыта

## Wave 1B — в работе

| # | Задача | Статус |
|---|--------|--------|
| 1 | contracts: EngineState + Zod | ✅ `3366f3c` |
| 2 | Strapi SiteTheme + DesignPreset | ✅ |
| 3 | BFF `/studio/draft`, `/presets` | ✅ |
| 4 | apps/studio scaffold | ✅ |
| 5 | UnifiedWorkspace + live preview | ✅ `a7f45b3` |
| 6 | Autosave + publish | ✅ |
| 7 | Studio API proxy + studio-bff | ✅ `cb3e086` |
| 8 | Деплой strapi + site-ci + studio | ⏳ в очереди Coolify |
| 9 | CI + deploy manifest | ✅ `ac85714` |
| 10 | **`apps/web` читает SiteTheme с BFF** | ✅ волна 3 (локально) |
| 11 | CC отключён на публичном web | ✅ EngineStateHydrator |
| 12 | Smoke prod + publish E2E | ⏳ после деплоя |

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

## Прод

| Сервис | URL |
|--------|-----|
| Сайт | https://istochnik.smitx.ru |
| CMS | https://cms.istochnik.smitx.ru |
| Studio | https://studio.istochnik.smitx.ru |

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
