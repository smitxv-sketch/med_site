# Где мы сейчас (handoff для нового чата)

**Для агента:** если пользователь пишет «где мы» / «продолжим» / «статус» — **сначала этот файл**, потом по таблице маршрутизации ниже.

Обновлено: **2026-07-02** · прод-коммит: **`70194ec`** (`main`)

---

## Одной строкой

Новый сайт на **Strapi + Next (site-ci)**; контент и каталоги тянем через **legacy bridge**; виджет записи **не трогаем** (read-only). **Врачи ЧЛБ + СПб синкнуты.** **ServicePlacement** в Strapi + пилот синка услуг СПб (Гастро) — **сделано**. Следующий шаг — **полный каталог СПб** и BFF `/prices`.

---

## Прод (Coolify)

| Приложение | URL | Коммит (ориентир) | Статус |
|------------|-----|-------------------|--------|
| **site-ci** | https://istochnik.smitx.ru | `70194ec` | healthy |
| **strapi-istochnik** | https://cms.istochnik.smitx.ru | `70194ec` | healthy |
| **bridge-istochnik** | https://bridge.istochnik.smitx.ru | `70194ec` | healthy |
| **studio-istochnik** | https://studio.istochnik.smitx.ru | — | healthy |

Проверка: `npm run smoke:prod` → **8/8** (BFF internal skip на проде — норма).

Публичный IP bridge (Beget whitelist): **`37.79.254.120`**

---

## Синк врачей — DONE ✅

| Город | В Strapi / API | Источник | misId / запись |
|-------|----------------|----------|----------------|
| **Челябинск** | 68 | WP REST `get_doctors` | `qms_id` в REST → `misId` |
| **Санкт-Петербург** | 53 | MODX MySQL template 7 | `spb-doctor-qms-map.json`: **38/53** с QMS, `allowBooking: true` |

Проверка: `GET https://istochnik.smitx.ru/api/catalog/doctors?tenant=chel` (68), `?tenant=spb` (53).

Детали: [`docs/SYNC_DOCTORS_SPEC.md`](./SYNC_DOCTORS_SPEC.md).

### Уроки пилота «врачи» (важно для услуг/цен)

1. **Три фазы:** модель Strapi → маппинг (JSON, не legacy DB) → синк через bridge (`docs/SYNC_ONTOLOGY_PLAN.md`).
2. **MODX не трогать** — `qms_id` / артикулы только в `docs/mappings/*.json` при синке.
3. **Beget:** один SQL-поток, chunk ≤25, пауза ≥450 ms; врачи СПб — MySQL OK с bridge IP.
4. **QMS с ПК → 403**; прайс getPr — через proxy (Coolify IP или `cispb.com/.../proxy-spb.php?endpoint=getPr`).
5. **QMS запись (robot-dev)** — отдельный ключ и прокси `ci74.ru/booking/php/proxy-spb.php` (см. блокер ниже).
6. **СПб без misId в MODX** — всё равно синкать всех; booking включается после JSON-мапа.
7. **Strapi i18n** — locale `ru-chel` / `ru-spb`; при битых записях (null slug) — удалить и пересинкать.

---

## Блокеры (актуальные)

| # | Блокер | Влияние | Действие |
|---|--------|---------|----------|
| 1 | **15 врачей СПб без QMS** | `allowBooking: false` | Ручной мап / исключить |
| 2 | **17 врачей fuzzy match** | `needsReview` в map | Проверить в Studio |
| 3 | **ЧЛБ ЭКО org** | прайс merge частично падает | Не блокирует основной каталог |

Прокси ci74 (ЧЛБ + СПб booking/pricelist) — **работают** (2026-07-02).

---

## Услуги и прайс — В РАБОТЕ

**ServicePlacement** задеплоен. Пилот **Гастроэнтерология**: 20 services, 14 placements, 11 QMS merged.

| Артефакт | Путь |
|----------|------|
| **Главный план (ServicePlacement)** | [`docs/SYNC_SERVICES_PLACEMENT_PLAN.md`](./SYNC_SERVICES_PLACEMENT_PLAN.md) |
| Аудит дублей СПб | [`docs/mappings/spb-duplicate-analysis.json`](./mappings/spb-duplicate-analysis.json) |
| Спека услуг | [`docs/SYNC_SERVICES_SPEC.md`](./SYNC_SERVICES_SPEC.md) |
| Общий план онтологии | [`docs/SYNC_ONTOLOGY_PLAN.md`](./SYNC_ONTOLOGY_PLAN.md) |
| Bridge sync | `POST /api/sync/spb/services?category=…` |
| Strapi schema | `apps/cms/src/api/service-placement/` |

**Следующий шаг:** полный синк СПб (2249 QMS + все placements), парсер `json_data` → `includedItems` для программ.

---

## Что ещё в очереди (не услуги)

- News / anonces / articles / vacancies — схемы Strapi есть, **полный синк контента нет**
- Детальные `/news/[slug]`, виджеты главной на BFF
- News `kind`: news \| anonce \| article — **не в схеме**

---

## Маршрутизация для агента

| Тема | Читать |
|------|--------|
| Handoff / статус | `docs/WHERE_WE_ARE.md` (этот файл) |
| Онтология синка | `docs/SYNC_ONTOLOGY_PLAN.md` |
| Врачи (сделано) | `docs/SYNC_DOCTORS_SPEC.md` |
| **Услуги + placements** | `docs/SYNC_SERVICES_PLACEMENT_PLAN.md` |
| Услуги (спека) | `docs/SYNC_SERVICES_SPEC.md` |
| Прайс QMS разделы | `docs/mappings/qms-sections-inventory.md` |
| Bridge / Beget | `docs/DEV_LEGACY_BRIDGE.md` |
| Деплой | `.cursorrules`, `docs/DEPLOY_FAILURE_CLASSES.md` |
| Челябинск сущности | `modx_wp-to-strapi-migration-api/app/applet/CHEL_PLAN.md` |

---

## Куда смотреть в коде

| Задача | Путь |
|--------|------|
| Синк врачей | `modx_wp-to-strapi-migration-api/server/services/SyncOrchestrator.ts`, `DoctorHydrator.ts` |
| Синк услуг СПб | `modx_wp-to-strapi-migration-api/server/services/syncSpbServices.ts`, `spb/syncSpbPlacements.ts` |
| ServicePlacement | `apps/cms/src/api/service-placement/` |
| QMS прайс | `server/services/qms/syncQmsPrices.ts`, `server/routes/qms.ts` |
| Strapi Doctor | `apps/cms/src/api/doctor/` |
| Каталог на сайте | BFF `apps/bff/src/routes/catalog.ts` |
| PHP прокси QMS | `php_backend/php/proxy-spb.php`, `qms-proxy.inc.php` |

---

## Запреты

- **Не менять** `/src/widget/` и бэкенд онлайн-записи — только read-only.
- Секреты только Coolify / локальный `.env` (не в git).
- Перед push web/bff/cms: `npm run ci:platform`.
- Деплой Coolify **по одному** app (manifest).

---

## Фразы для нового чата

**Общий статус:**
> Прочитай `docs/WHERE_WE_ARE.md` и скажи, с чего продолжим.

**Услуги и прайс:**
> Прочитай `docs/HANDOFF_SERVICES_PRICES.md` и `docs/SYNC_ONTOLOGY_PLAN.md`. Исследуй данные, задай квиз, спроектируй модель и синк услуг/цен.
