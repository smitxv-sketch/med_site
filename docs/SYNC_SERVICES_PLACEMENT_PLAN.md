# План: услуги, размещения (ServicePlacement), синк без дублей

**Обновлено:** 2026-07-02  
**Связано:** [SYNC_SERVICES_SPEC.md](./SYNC_SERVICES_SPEC.md), [SYNC_ONTOLOGY_PLAN.md](./SYNC_ONTOLOGY_PLAN.md), [spb-duplicate-analysis.json](./mappings/spb-duplicate-analysis.json)

---

## Одной строкой

**Одна услуга = один артикул QMS (`Service.article`).** Повторы в старом прайсе — это **размещения** в разных рубриках/вкладках, не отдельные услуги. Новая сущность **`ServicePlacement`** хранит «где показывать»; цена только на `Service`.

---

## Находки (аудит 2026-07-02)

### Санкт-Петербург — `pricelist_items2`

| Метрика | Значение |
|---------|----------|
| Опубликованных строк | 1184 |
| Уникальных артикулов (`doc_id`) | 607 |
| Артикулов в **2+ рубриках/вкладках** | **324** (~53%) |
| Строк в таблице (всего) | 1858 |

**Зачем дубли в legacy:** таблица — матрица навигации. Одна услуга показывается в контексте разных направлений и вкладок.

**Пример — гастроэнтерология:**

| Артикул | Название | Вкладка | Рубрики |
|---------|----------|---------|---------|
| `B01.004.03` | Приём гастроэнтеролога | Приём врачей | Гастроэнтерология |
| `B03.069.313` | Приём + ФГДС | Комплексные программы | Гастроэнтерология + ФГДС + Эндоскопия |
| `B03.36` | Check-Up гастро | Комплексные программы | Комплексные программы по гастроэнтерологии |

Источник: `docs/mappings/spb-duplicate-analysis.json`

### QMS getPr (СПб)

- **2249** позиций, **78** разделов `section.val`
- SSOT цены и артикула — только QMS (`Duv`, `Mr70`, `u`)
- Прокси ci74 + cispb — **работают** (2026-07-02)

### Челябинск

- **1345** постов услуг → **1073** уникальных артикула
- Контент на **рубриках** `directions` (540 с блоком врача+текст)
- QMS прайс через ci74 proxy — **работает**
- Пилот Анестезиология (569): 10 услуг, QMS merge 10/10

### Врачи СПб — маппинг MODX↔QMS

- Файл: `docs/mappings/spb-doctor-qms-map.json`
- **38/53** сопоставлены по ФИО, `allowBooking: true`
- **15** без QMS (админы / нет в записи)
- **17** на ручную проверку (fuzzy ФИО)

---

## Целевая модель данных (Strapi)

```
Tab (4 вида)           priem | diagnostika | programmy | lechenie
    └── ServiceCategory   рубрика с контентом (как directions в ЧЛБ)
            └── ServicePlacement   ← НОВОЕ: связь услуга + рубрика + вкладка + sortOrder
                    └── Service     1 артикул QMS, 1 цена
```

### `Service` (без изменения смысла)

- `article` = `Duv` — **уникален per locale**
- `price`, `title` — из QMS; `priceLocked` / `titleLocked` в Studio
- `isProgram` + `includedItems[]` — комплексы (цена пакета, состав без дочерних цен)
- `categories` M2M — **кэш** уникальных рубрик (для обратной совместимости); SSOT навигации — **placements**

### `ServicePlacement` (новое)

| Поле | Тип | Назначение |
|------|-----|------------|
| `legacyId` | string | `spb-place:{article}:{category}:{tabLegacy}` — идемпотентный синк |
| `service` | → Service | Какая услуга |
| `category` | → ServiceCategory | В какой рубрике показать |
| `tabQms` | enum 4 вида | Вкладка витрины |
| `tabLegacy` | string | Исходный tab из MODX |
| `sortOrder` | int | Порядок в списке |
| `enabled` | bool | Скрыть размещение без удаления услуги |

**Правило:** одна строка `pricelist_items2` (published, не deleted) → один `ServicePlacement`.

### Комплексы / программы

| Legacy | Strapi |
|--------|--------|
| Артикул программы в QMS (`B03.36`) | `Service` с `isProgram: true` |
| `json_data` MIGX (template 12) | `includedItems[]` → ссылки на другие `Service` |
| Повтор приёма внутри программы | **не** отдельная цена на витрине программы |

---

## Зачем так было в legacy (цель пользователя)

1. **SEO и входы с разных страниц** — ФГДС видна и в «Гастроэнтерологии», и в «Эндоскопии».
2. **Контекстный прайс** — на странице направления пациент видит всё релевантное, не листая общий каталог.
3. **Комплексные программы** — отдельная вкладка с пакетными ценами (маркетинг + удобство записи).
4. **Один артикул в МИС** — касса и QMS не дублируют позиции; дубли только в **отображении** на сайте.

---

## UI (новый сайт)

### Пациент — `/prices`

1. Переключатель **4 вкладок** (`tabQms`).
2. Список **рубрик** (`ServiceCategory`) с контентом.
3. Услуги — запрос **placements** фильтр `tab + category`, join `Service` (цена одна).
4. Страница **программы** — одна цена, блок «что входит».

### Редактор — Studio / Strapi Admin

1. **Service** — карточка услуги: цена, артикул, блок «Размещения» (relation).
2. **ServiceCategory** — текст, врач, SEO; список размещений в рубрике.
3. **Очередь QMS** — новые артикула без legacy → `published: false`, тиндер в Studio.
4. **Отчёт синка** — «артикул X: 3 размещения» (не 3 услуги).

### BFF (чтение)

```
GET /api/catalog/prices?tenant=spb&tab=priem&category=kardiologiya
→ placements + service (article, title, price, allowBooking…)
```

Не дублировать QMS на фронте — только Strapi.

---

## Ссылки для визуальной проверки (cispb.com)

| Страница | URL |
|----------|-----|
| Гастроэнтерология | https://cispb.com/gastroenterologiya |
| ФГДС под наркозом | https://cispb.com/fgds-pod-narkozom |
| Эндоскопия | https://cispb.com/endoskopicheskaya-diagnostika |
| Частная поликлиника | https://cispb.com/poliklinika |

---

## Фазы работ (порядок)

### Фаза 0 — инфраструктура ✅ (2026-07-02)

- [x] Прокси ci74 (ЧЛБ + СПб booking/pricelist)
- [x] QMS bridge: прайс СПб/ЧЛБ, врачи СПб + `spb-doctor-qms-map.json`
- [x] Пилоты: Кардиология СПб (26 услуг), Анестезиология ЧЛБ (10)

### Фаза 1 — ServicePlacement в Strapi ← **СЕЙЧАС**

- [x] Content-type `service-placement` в `apps/cms`
- [x] Relations на `Service` и `ServiceCategory`
- [x] Public read permissions
- [x] Bridge: `syncSpbPlacements.ts` + вызов из `syncSpbServices.ts`
- [ ] Деплой `strapi-istochnik`
- [ ] Деплой `bridge-istochnik`

### Фаза 2 — пилот синка «Гастроэнтерология»

- [ ] `POST /api/sync/spb/services?category=Гастроэнтерология`
- [ ] Проверка в Strapi: 1 Service на артикул, N placements на строки прайса
- [ ] Сверка с https://cispb.com/gastroenterologiya (визуально с заказчиком)

### Фаза 3 — полный каталог СПб

- [ ] Синк всех `Service` из QMS (2249) + placements из legacy
- [ ] Парсер `json_data` → `includedItems` для template 12 (программы)
- [ ] `spb-category-aliases.json` — нормализация имён рубрик

### Фаза 4 — Челябинск

- [ ] Placements из `directions` + posts `services`
- [ ] Обогащение рубрик (врач, тексты) как в `chel-direction-meta`
- [ ] Полный синк рубрик (587 terms → выборочно + дерево)

### Фаза 5 — фронт `/prices`

- [ ] BFF read placements + categories
- [ ] UI 3 уровня (tab → category → services)
- [ ] Страница программы (`isProgram`)

### Фаза 6 — Studio

- [ ] Тиндер новых QMS-позиций
- [ ] Редактор размещений / состава программы
- [ ] Отчёт дублей и legacy-only

---

## Правила синка (без дублей)

1. **Создать/обновить `Service`** — один раз на `doc_id` / `Duv` (aggregate).
2. **Создать/обновить `ServicePlacement`** — на каждую live-строку `pricelist_items2`.
3. **Цена** — только на `Service` из QMS; placement цены не имеет.
4. **`categories` M2M** — union категорий из placements (для старых запросов).
5. **Удаление** — placement с `enabled: false`, если строка исчезла из legacy; Service не удалять автоматически.

---

## JSON-маппинги

| Файл | Статус |
|------|--------|
| `qms-section-to-tab.json` | есть |
| `spb-doctor-qms-map.json` | есть |
| `spb-duplicate-analysis.json` | есть |
| `spb-category-aliases.json` | нужен |
| `chel-direction-aliases.json` | нужен |

---

## Команды проверки

```bash
# Анализ дублей СПб
npx --prefix modx_wp-to-strapi-migration-api tsx modx_wp-to-strapi-migration-api/scripts/analyze-spb-duplicates.mjs

# Пилот синка (после деплоя)
curl -X POST -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  "https://bridge.istochnik.smitx.ru/api/sync/spb/services?category=Гастроэнтерология"

# Strapi: placements
curl -H "Authorization: Bearer $STRAPI_API_TOKEN" \
  "https://cms.istochnik.smitx.ru/api/service-placements?locale=ru-spb&pagination[pageSize]=5&populate=service,category"
```

---

## Маршрутизация для агента

| Задача | Файл |
|--------|------|
| Этот план | `docs/SYNC_SERVICES_PLACEMENT_PLAN.md` |
| Спека услуг | `docs/SYNC_SERVICES_SPEC.md` |
| Схема Strapi Service | `apps/cms/src/api/service/` |
| Схема Placement | `apps/cms/src/api/service-placement/` |
| Синк СПб | `modx_wp-to-strapi-migration-api/server/services/syncSpbServices.ts` |
| Агрегация legacy | `modx_wp-to-strapi-migration-api/server/services/spb/spbPricelistSource.ts` |
