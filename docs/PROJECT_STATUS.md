# Статус миграции: Источник → Strapi + BFF + Next

> **Для смены чата:** начни с этого файла. Обновляй после каждой сессии.  
> **Мастер-план Studio:** [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

**Последнее обновление:** 2026-06-24  
**Ветка:** `main`  
**Прод:** https://istochnik.smitx.ru · CMS: https://cms.istochnik.smitx.ru

---

## Текущая волна: **Wave 1A — ✅ закрыта**

**Следующая:** Wave 1B — `apps/studio` (см. [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md))

| # | Задача | Статус | Примечание |
|---|--------|--------|------------|
| 1 | site-ci (Next + BFF) на Coolify | ✅ | `dataMode: hybrid`, виджеты через shim |
| 2 | Strapi на Coolify (healthcheck) | ✅ | APP_KEYS fix в `server.ts` |
| 3 | react-router-dom shim для виджетов | ✅ | `apps/web/lib/react-router-dom-shim.tsx` |
| 4 | **Strapi API 500** (pages/navigation) | ✅ | Деплой `d316860`, API 200 |
| 5 | Bootstrap: home + navigation + layout | ✅ | Seed на проде (home ru-chel) |
| 6 | Smoke: strapi-pages check | ✅ | 6/6 prod smoke |
| 7 | Деплой фикса CMS на прод | ✅ | `ys9cwow9enhlrcwkewpuo3vm` finished |
| 8 | Проверка: BFF читает Strapi (не mock) | ✅ | Strapi отдаёт home; hybrid fallback остаётся |

**Критерий закрытия Wave 1A:**  
`GET cms.../api/pages?slug=home&locale=ru-chel` → **200**, сайт отдаёт блоки из Strapi (можно оставить `DATA_MODE=hybrid` как fallback).

## Прод vs локально (важно)

| | Прод | Локально (только для разработки) |
|---|------|----------------------------------|
| URL | https://cms.istochnik.smitx.ru | http://localhost:1337 или :1338 |
| Когда нужен | Всегда для сайта | Только если агент/разработчик запускает `npm run start` в `apps/cms` |
| База | Postgres на сервере | sqlite в `apps/cms/.tmp/` |

Если внезапно открылся **localhost:1338/admin** — это временный локальный Strapi для отладки API 500, **не ваш прод**. Закрой вкладку; процесс можно остановить (агент останавливает после проверки).

---

| # | Задача | Статус |
|---|--------|--------|
| 1 | `packages/contracts`: EngineState + Zod | ⏳ |
| 2 | Strapi: `SiteTheme`, `DesignPreset` | ⏳ |
| 3 | BFF: `/studio/draft`, `/studio/publish` | ⏳ |
| 4 | `apps/studio` + auth + Coolify | ⏳ |
| 5 | Убрать CC с публичного web | ⏳ |

Детали: [`plan/STUDIO_WAVE_MASTER_PLAN.md`](./plan/STUDIO_WAVE_MASTER_PLAN.md)

---

## Прод-инфраструктура

| Сервис | URL | Coolify app | Статус |
|--------|-----|-------------|--------|
| Сайт | https://istochnik.smitx.ru | site-ci | ✅ 200 |
| CMS | https://cms.istochnik.smitx.ru/admin | strapi-istochnik | ✅ admin OK, API 500 до фикса |
| Studio | studio.istochnik.smitx.ru | — | не создан |

---

## Ключевые коммиты (хронология)

| Коммит | Что |
|--------|-----|
| `3c2c368` | fix(ci): full npm install для site-ci |
| `4c759c0` | fix(cms): APP_KEYS из env |
| `0ef1fc8` | fix(web): react-router-dom shim |
| `d316860` | fix(cms): Strapi API 500 + bootstrap seed |

---

## Деплои (2026-06-24)

| App | Deployment | Commit | Статус |
|-----|------------|--------|--------|
| strapi-istochnik | `ys9cwow9enhlrcwkewpuo3vm` | `d316860` | ✅ finished |

---

## Как проверить локально

```bash
# Smoke (прод)
WEB_URL=https://istochnik.smitx.ru SMOKE_SKIP_BFF=1 node scripts/smoke-platform.mjs

# CMS локально (sqlite)
cd apps/cms && npm run build && npm run start
# → http://localhost:1337/api/pages?locale=ru-chel
```

---

## Журнал сессий

### 2026-06-24
- Создан мастер-план Studio (Variant B): `docs/plan/STUDIO_WAVE_MASTER_PLAN.md`
- Создан этот файл статуса
- Найден root cause Strapi 500: `generic-widget` и `menu-item` с рекурсивными `component` children → infinite `getDeepPopulate`
### 2026-06-24 (деплой)
- Commit `d316860` pushed, strapi-istochnik redeployed
- Prod: `/api/pages?locale=ru-chel` → 200, home засеян
- Wave 1A закрыта

---

## Правила (не забывать)

- **Не трогать** `/src/widget/` и booking backend (read-only)
- Контент на прод → Strapi publish + revalidate, не redeploy site-ci
- SSOT типов: `packages/contracts`
