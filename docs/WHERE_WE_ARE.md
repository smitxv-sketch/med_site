# Где мы сейчас (handoff для нового чата)

**Для агента:** если пользователь пишет «посмотри где мы» — **сначала прочитай этот файл**, затем при необходимости `.cursorrules` и `docs/DEV_LEGACY_BRIDGE.md`.

Обновлено: **2026-06-26** · прод-коммит: **`1e79a2d`** (`main`)

---

## Одной строкой

Строим новый сайт на **Strapi + Next (site-ci)**; старый контент тянем через **legacy bridge** на сервере; виджет записи **не трогаем**. Каталог контента (новости/акции/вакансии) в CMS уже есть, **синк из Челябинска в Strapi ещё не сделан**.

---

## Прод (Coolify) — что задеплоено

| Приложение | URL | Коммит (последний успешный деплой) | Статус |
|------------|-----|-----------------------------------|--------|
| **site-ci** | https://istochnik.smitx.ru | `937e1e5` | healthy |
| **strapi-istochnik** | https://cms.istochnik.smitx.ru | `1e79a2d` | healthy |
| **legacy-bridge-istochnik** | https://bridge.istochnik.smitx.ru | `937e1e5` | healthy |
| **studio-istochnik** | https://studio.istochnik.smitx.ru | без пересборки в этом цикле | healthy |

Проверка: `npm run smoke:prod` → **8/8** (BFF skip на проде — норма).

Публичный IP сервера (для Beget MySQL): **`37.79.254.120`**

---

## Последние коммиты на `main`

| SHA | Суть |
|-----|------|
| `1e79a2d` | fix: CJS `require` в `@med-site/contracts` — без этого Strapi не стартовал в Docker |
| `937e1e5` | Strapi news/promotion/vacancy, BFF `/api/news` и др., страницы `/news` `/promotions` `/vacancies`, **защита bridge** (throttle + пагинация) |
| `82d0c99` | Playwright smoke, link checker, фикс **500 на `/doctors` и `/booking`** (`tenantId` в props) |
| `db046c0` | Studio header inset, города/футер из Strapi |

---

## Что уже сделано

### Сайт (Next + BFF)

- Shell: header / footer / bottom-nav на проде.
- Страницы листингов: `/news`, `/promotions`, `/vacancies` (данные из BFF → Strapi).
- `/doctors`, `/booking` — **200** после фикса `tenantId`.
- Детальных страниц `/news/[slug]`, `/promotions/[slug]` **ещё нет**.
- Виджеты акций на главной **ещё на JSON**, не на BFF.

### Strapi CMS

- Content types: **Promotion** (`kind`: `promotion` \| `special_offer`), **News**, **Vacancy**.
- Bootstrap в `apps/cms/src/index.ts`: публичные permissions, seed list-страниц, ссылка на `/news` в футере.
- Поле **`kind` на News для анонсов/статей** — **запланировано, не внедрено** (см. ниже).

### Legacy bridge (`modx_wp-to-strapi-migration-api`)

- **Платформенная защита Beget:** очередь SQL, пауза ~450 ms, max 25 записей/запрос, HTTP rate limit, контракт `{ _meta, data }`.
- Документация: `docs/DEV_LEGACY_BRIDGE.md`, эндпоинт `GET /api/legacy/guard`.
- MCP: `bridge_guard`, `bridge_get`, `bridge_fetch_all`.
- Env на Coolify: `BRIDGE_API_TOKEN`, `LEGACY_*` (пользователь настроил).

### QA

- `e2e/smoke.spec.ts`, `scripts/check-links.mjs`, `npm run test:e2e:prod`, `test:links:prod`.

---

## Согласованная модель контента (ещё не весь код)

| Legacy (Челябинск WP) | Куда в Strapi | Статус |
|------------------------|---------------|--------|
| `novosti` (~222) | News `kind=news` | схема News есть, **синка нет** |
| `anonces` + `home_anonces` (~83) | News `kind=anonce` | **поле kind не добавлено** |
| `articles` (~11) | News `kind=article` (+ позже связь с услугами) | **не сделано** |
| `vakansii` | Vacancy | схема есть, синка нет |
| Акции СПб | Promotion (MODX template 19) | отдельно от ЧЛБ |

**SSOT для сайта** — Strapi. **Bridge** — только мост миграции, не второй CMS.

---

## Блокеры и инфраструктура

1. **Beget MySQL** — с IP `37.79.254.120` должен быть whitelist, иначе `/api/chel/news`, `articles`, `anonces` → 500 (`Access denied for user ...@37.79.254.120`). Врачи идут через REST `ci74.ru` — работают без MySQL.
2. **Strapi healthcheck** в Coolify всё ещё на `/admin` (рекомендация: `/_health` — см. `docs/STRAPI_DEPLOY_POSTMORTEM.md`).
3. **`runSync()` в bridge** — заглушка; таблица `sync_map` в Postgres bridge есть, мапперы WP→Strapi **не написаны**.

---

## Следующие шаги (приоритет)

1. Подтвердить whitelist Beget → прогнать bridge `bridge_fetch_all` для news/anonces/articles.
2. Добавить в Strapi News: `kind: news | anonce | article` (+ поля анонса: link, sortOrder, showOnHome).
3. Реализовать **синк на сервере** (bridge worker → Strapi), не с ноутбука.
4. Детальные страницы `/news/[slug]`, `/promotions/[slug]`.
5. Подключить виджеты главной к `GET /api/promotions?kind=...`.

---

## Куда смотреть в коде

| Задача | Путь |
|--------|------|
| Strapi схемы | `apps/cms/src/api/{news,promotion,vacancy}/` |
| BFF каталог | `apps/bff/src/routes/contentCatalog.ts`, `services/contentCatalogService.ts` |
| DTO / маппинг | `packages/contracts/src/types/contentCatalog.ts`, `strapi/mapContentCatalog.ts` |
| Страницы сайта | `apps/web/app/{news,promotions,vacancies}/` |
| Bridge throttle | `modx_wp-to-strapi-migration-api/server/config/legacyDbGuard.ts`, `lib/legacyDbQueue.ts` |
| Bridge Chel API | `modx_wp-to-strapi-migration-api/server/routes/chel.ts` |
| План по Челябинску | `modx_wp-to-strapi-migration-api/app/applet/CHEL_PLAN.md` |
| Деплой | `.cursorrules` (секция ДЕПЛОЙ), `infra/platform.manifest.json` |
| Coolify apps | `docs/INFRASTRUCTURE_SERVER.md` |

---

## Запреты (не забыть)

- **Не менять** `/src/widget/` и бэкенд QMS/записи — только read-only.
- Секреты только в Coolify / локальный `.env` (не в git).
- Перед push web/bff/cms: `npm run ci:platform` (на Windows иногда `--skip-install` после ручного `npm install`).
- Деплой приложений Coolify **по одному**, порядок: strapi → site-ci → studio.

---

## Фраза для нового чата

> Прочитай `docs/WHERE_WE_ARE.md` и скажи, с чего продолжим.
