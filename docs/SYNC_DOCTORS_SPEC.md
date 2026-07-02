# Единая схема врачей: ЧЛБ + СПб → Strapi

SSOT для сайта: **Strapi `Doctor`** (`apps/cms/src/api/doctor`).  
Синк: **bridge** (`legacy-bridge-istochnik`) → Strapi.  
Booking и слоты: **site-ci BFF** → QMS + WP REST (виджет `/src/widget` не меняем).

Подробности по ЧЛБ-контенту: [SYNC_CHEL_SPEC.md](./SYNC_CHEL_SPEC.md).

**Аудит заполненности:** 2026-06-26. Скрипт: `modx_wp-to-strapi-migration-api/scripts/analyze-doctor-fields.mjs`.

**Статус синка (2026-07-02):** ЧЛБ **68** врачей в Strapi (`ru-chel`). СПб **53** врача (`ru-spb`), misId из JSON-мапа QMS — **ожидает** proxy-spb + booking key; сейчас `spb-legacy-{id}`. См. `docs/WHERE_WE_ARE.md`.

---

## Краткий вывод

| | Челябинск | Санкт-Петербург |
|---|-----------|-----------------|
| **Источник** | REST `get_doctors` (68 врачей) | MODX MySQL, template 7 |
| **Аудит** | Полный (прод API) | 53 врача в Strapi; QMS qqc-мап — в очереди |
| **misId** | 68/68 (100%) | В MODX TV пусто → JSON-мап при синке |
| **Образование** | `education_text` 68/68; JSON-история 64/68 | `education` + `educationDop` — в примерах 3/3 |
| **Опыт** | `experience_years` 67/68 | `specExperience` — текст («25 лет», «с 1982 года») |
| **Био на карточке** | `description` **0/68**; вместо него `anonce` 68/68 + `activities` 65/68 | `des` 3/3 + `specintro` 3/3 |

**Легенда колонки «Когда»**

| Когда | Значение |
|-------|----------|
| **safe-синк** | Уже в `syncChelDoctors` / `syncSpbDoctors`, обновляется при каждом синке |
| **импорт 1 раз** | Заполнить в Strapi при создании (`bio`, `education`), дальше `contentLocked` или protected |
| **позже** | Нужны новые поля Strapi, relations или доработка legacy |
| **только booking** | Не на страницу врача — только виджет / QMS |

---

## Strapi Doctor — целевая схема

| Поле Strapi | Safe-синк | Откуда берём |
|-------------|-----------|--------------|
| `fullName`, `slug`, `legacyId`, `legacySource`, `misId` | да | Идентификация |
| `specialty`, `photoUrl`, `experienceYears` | да | Карточка списка |
| `degree`, `category`, `position` | да | Частично пустые в legacy — дублируем из `anonce`/`rank` где можно |
| `bio` | импорт 1 раз | ЧЛБ: `anonce` + `activities`; СПб: `des` |
| `education` | импорт 1 раз | ЧЛБ: `education_text`; СПб: `education` (+ опц. `educationDop`) |
| `contentLocked` | — | Включить после ручной правки в CMS |

---

## Челябинск — аудит по полям (68 врачей)

Источник: `https://ci74.ru/api/rest.php?action=get_doctors` (2026-06-26).

### Идентификация и запись

| Поле legacy | Заполнено | Strapi | Когда | Комментарий |
|-------------|-----------|--------|-------|-------------|
| `wp_user_id` | 68/68 (100%) | `legacyId` | safe-синк | |
| `qms_id` | 68/68 (100%) | `misId` | safe-синк | Составных ID (через запятую) нет |
| `display_name` | 68/68 | `fullName` | safe-синк | |
| `specialty` | 68/68 | `specialty` | safe-синк | Длинная строка («Врач-невролог высшей кат.…») |
| `photo_url` | 68/68 | `photoUrl` | safe-синк | URL на ci74.ru |

### Опыт и звания

| Поле legacy | Заполнено | Strapi | Когда | Комментарий |
|-------------|-----------|--------|-------|-------------|
| `experience_years` | 67/68 (99%) | `experienceYears` | safe-синк | Пусто: **Володченко Алексей Михайлович** |
| `position` | 68/68 | `position` | safe-синк | Часто дублирует должность из specialty |
| `category` | 32/68 (47%) | `category` | safe-синк | У остальных категория может быть в `anonce` |
| `degree` | 16/68 (24%) | `degree` | safe-синк | Примеры: «Кандидат» |
| `zvanie` | 2/68 (3%) | → `degree` | safe-синк | Почти пусто; звание чаще в `anonce` |
| `anonce` | 68/68 | → `bio` (кратко) | импорт 1 раз | Короткая строка для карточки; у ~36 врачей содержит категорию/степень |
| `badges` (JSON) | 42/68 (62%) | — | позже | Структурированные бейджи (`degree`, `zvanie`, `category`) — ~1 бейдж на врача |

### Образование

| Поле legacy | Заполнено | Strapi | Когда | Комментарий |
|-------------|-----------|--------|-------|-------------|
| `education_text` | 68/68 (100%) | `education` | **импорт 1 раз** | Основной текст: вузы, дипломы, годы. От 672 до ~14 000 символов |
| `education_history` (JSON) | 64/68 (94%) | — | позже | Пусто у 4 врачей: Репников, Фомина, Скоробогатова, Байер. Удобно для компонента «этапы обучения» |
| `extraeducation` (в `raw_meta`) | ~64/68 | — | позже | Доп. обучение в meta |

### Тексты и деятельность

| Поле legacy | Заполнено | Strapi | Когда | Комментарий |
|-------------|-----------|--------|-------|-------------|
| `description` | **0/68** | `bio` | — | **Не использовать** — поле в REST пустое |
| `activities` | 65/68 (96%) | часть `bio` | импорт 1 раз | HTML-список направлений работы. Пусто: Буянова, Володченко, Табашникова |
| `anonce` | 68/68 | часть `bio` | импорт 1 раз | См. выше |

**Рекомендация для страницы врача (ЧЛБ):** `bio` = `anonce` + (если есть) `activities`; `education` = `education_text`.

### Booking / цены (не в каталог Strapi)

| Поле legacy | Заполнено | Когда | Комментарий |
|-------------|-----------|-------|-------------|
| `price` | 67/68 | только booking | Дублирует QMS |
| `duration` | 63/68 | только booking | Минуты приёма |
| `is_adult_doctor` | 56/68 (82%) | позже | Фильтр «взрослый» |
| `is_child_doctor` | 20/68 (29%) | позже | Фильтр «детский» |

### Связи и справочники (в `raw_meta`, не в REST напрямую)

| Поле в `raw_meta` | Заполнено | Когда | Комментарий |
|-------------------|-----------|-------|-------------|
| `directions` | 67/68 | позже | Привязка к направлениям — relation после синка directions |
| `_dextra_service_ids` / `_services` | есть у большинства | позже | ID услуг в Dextra/QMS — связь врач ↔ услуга |
| `clinics` / `_clinics` | 68/68 | позже | Филиалы |
| `id_doctor_qms` | 68/68 | safe-синк | Дубль `qms_id` |
| `feed_*` поля | 63–68 | позже | Лента/SEO на старом сайте |

### Служебное

| Поле | Заполнено | Когда |
|------|-----------|-------|
| `raw_meta` (весь объект) | 68/68 | не импортировать целиком |
| `updated_at` | 68/68 | для отладки синка |

---

## Санкт-Петербург — схема и аудит

Источник: MODX `template = 7`, `parent != 209` (врачи; `parent = 209` — отзывы).

**Статус bridge:** если деплой падает с `Health check exceeded timeout (5s)` и в логах `[legacy-db:spb] slow query "SELECT 1" ~10000ms` — MySQL СПб не отвечает с сервера Coolify (firewall Beget) **или** healthcheck ждал БД слишком долго.  
**Исправление:** Coolify healthcheck URL → `GET /api/health/live` (не `/api/health`). Полная проверка БД: `GET /api/health` → `checks.modx: connected | timeout | failed`.

```bash
cd modx_wp-to-strapi-migration-api
node scripts/analyze-doctor-fields.mjs
```

Ниже: **схема MODX** (из `site_spb.md`) + **3 реальных примера** (id 78, 79, 80).

### Идентификация

| Поле MODX | В примерах 3/3 | Strapi | Когда | Комментарий |
|-----------|----------------|--------|-------|-------------|
| `id` | 3/3 | `legacyId` | safe-синк | |
| `pagetitle` | 3/3 | `fullName` | safe-синк | |
| `alias` | 3/3 | `slug` | safe-синк | |
| `qms_id` / `mis_id` / `qqc` (TV) | **0/3** | `misId` | **блокер** | В выгрузке-примере TV с MIS нет — искать в полной БД через `/api/export/schema/analyze` |

### Специальность, опыт, звание

| Поле MODX (TV) | В примерах | Strapi | Когда | Комментарий |
|----------------|------------|--------|-------|-------------|
| `specintro` | 3/3 | `specialty` | safe-синк | Краткая специальность |
| `specExperience` | 3/3 | `experienceYears` | safe-синк | **Текст**, не число: «25 лет», «с 1982 года» — нужен парсер |
| `rank` | 2/3 | `degree` / `position` | safe-синк | Звание одной строкой |
| `сategory` (опечатка в MODX) | 2/3 | `category` | safe-синк | Cyrillic «с» в имени TV |
| `beginning` | 2/3 | — | позже | Дата начала практики «01.01.2001» |

### Образование и тексты

| Поле MODX (TV) | В примерах | Strapi | Когда | Комментарий |
|----------------|------------|--------|-------|-------------|
| `education` | 3/3 | `education` | импорт 1 раз | HTML, основное образование |
| `educationDop` | 3/3 | часть `education` | импорт 1 раз | Повышение квалификации, сертификаты |
| `conferences` | 3/3 | — | позже | Отдельный блок «конференции и награды» |
| `des` | 3/3 | `bio` | импорт 1 раз | Описание для страницы врача |
| `directions` | 3/3 | — | позже | HTML-список направлений работы (не taxonomy) |
| `title` | 3/3 | — | позже | SEO title |

### Медиа и прочее

| Поле MODX | В примерах | Когда | Комментарий |
|-----------|------------|-------|-------------|
| `docImg` / `ms2.image` | 0/3 в плоской выгрузке | safe-синк | Фото может быть только в ms2_products — проверить на полной БД |
| `certificates` (MIGX) | 1/3 | позже | Сертификаты JSON |
| `rev` (MIGX отзывы на карточке) | 1/3 | позже | Отдельная сущность Review |
| `prodoctorov` | 1/3 | позже | Ссылка на ПроДокторов |
| `tel` | 1/3 | позже | Телефон на карточке |
| `prices` | 1/3 | только booking | Цена на карточке |
| `specSales` / `specMore` | 2–3/3 | позже | Флаги «акция» / «подробнее» |
| `specSalesFast` | 1/3 | позже | Ссылка Medflex booking |
| `related_specialist_block` | 1/3 | позже | ID связанных специалистов `84||94||…` |
| `video_link_type` | 2/3 | позже | Видео |

### Связи (критично для «позже»)

| Поле MODX | Когда | Комментарий |
|-----------|-------|-------------|
| `uslugiPrice` (MIGX) | позже | JSON: услуга + цена у конкретного врача (см. architecture QA) |
| `uslugi` / `directions` (TV) | позже | Привязки к справочникам |
| Отзывы template 7, parent 209 | позже | Отдельный content-type Review |

### Все TV врача в схеме MODX (из `site_spb.md`)

Поля, отмеченные в интерфейсе экспорта как «нужные»:  
`title`, `des`, `specintro`, `education`, `educationDop`, `conferences`, `directions`, `specSales`, `specMore`, `beginning`, `rank`, `сategory`, `specExperience`, `video_link_type`.

Дополнительно встречаются в данных: `certificates`, `prices`, `prodoctorov`, `tel`, `rev`, `related_specialist_block`, `specSalesFast`.

---

## Что делаем сейчас vs позже (сводка)

### Сейчас — safe-синк в Strapi

- ЧЛБ: ФИО, specialty, photo, experience, degree/category/position (как есть), misId, legacyId.
- СПб: то же после появления `misId` в TV и живого bridge.

### Сейчас — один раз при создании записи (protected)

| Контент | ЧЛБ | СПб |
|---------|-----|-----|
| Образование | `education_text` | `education` + `educationDop` |
| Био | `anonce` + `activities` | `des` |
| Звание на карточке | дополнить из `anonce`, если `degree`/`category` пусты | `rank` / `specintro` |

После импорта редактор может включить `contentLocked`.

### Позже — отдельные задачи

1. Relations: врач ↔ услуги (`_dextra_service_ids`, `uslugiPrice`), направления (`directions`).
2. Компоненты: `education_history`, `badges`, `conferences`, `certificates`.
3. Фильтры: `is_child_doctor`, `is_adult_doctor`, флаги акций.
4. Медиа: скачивание фото в Strapi Media Library.
5. СПб booking: `QMS_SPB_*`, TV с MIS ID.
6. Отзывы на врача (оба города).

---

## Запуск синка

```http
POST /api/sync/chel/doctors
POST /api/sync/spb/doctors
Authorization: Bearer {BRIDGE_API_TOKEN}
```

Повторный аудит полей:

```bash
cd modx_wp-to-strapi-migration-api
node scripts/analyze-doctor-fields.mjs
# с локальным кэшем ЧЛБ:
node scripts/analyze-doctor-fields.mjs --local-chel
```

---

## Booking и слоты (ЧЛБ)

| Endpoint | Назначение |
|----------|------------|
| `GET /api/wp-doctors` | Список из WP REST |
| `GET /api/services?city=chel` | Услуги QMS |
| `GET /api/doctors?specialty=…` | Врачи по услуге (QMS + WP) |
| `GET /api/slots?city=chel&doctor_id=…` | Слоты |
| `GET /api/catalog/doctors?tenant=chel` | Каталог `/doctors` из Strapi |

Прокси: `apps/web/middleware.ts` → BFF.

---

## Файлы

| Файл | Роль |
|------|------|
| `docs/SYNC_DOCTORS_SPEC.md` | Этот документ |
| `modx_.../scripts/analyze-doctor-fields.mjs` | Аудит заполненности |
| `modx_.../public/export/doctor_fields_audit.json` | JSON-отчёт (ЧЛБ) |
| `site_spb.md` | Схема + примеры СПб |
| `modx_.../syncChelDoctors.ts` | Синк ЧЛБ |
| `modx_.../syncSpbDoctors.ts` | Синк СПб |
