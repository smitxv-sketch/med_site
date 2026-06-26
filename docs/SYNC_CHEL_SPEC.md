# Синхронизация контента Челябинска (SSOT)

Документ описывает **зачем**, **как** и **что** синхронизируем из legacy (ci74.ru) в Strapi на переходный период, пока старый и новый сайт работают параллельно.

## Зачем нужен синк

- Новый сайт (**Strapi + site-ci**) — единый источник правды для фронта.
- Старый сайт продолжает обновляться до переключения DNS.
- **Bridge** (`legacy-bridge-istochnik`) — временный мост: читает legacy, пишет в Strapi.
- Синк **не затирает** обогащённый в CMS контент — только добавляет новое и обновляет безопасные поля.

## Разделение доступов

| Компонент | Доступ к БД | Доступ к МИС / REST |
|-----------|-------------|---------------------|
| **site-ci (BFF)** | нет | `QMS_CHEL_*`, `CHEL_API_ENDPOINT` (врачи для booking) |
| **legacy-bridge** | `CHEL_DB_*` (MySQL Beget) | `CHEL_API_ENDPOINT` |
| **виджет `/src/widget`** | read-only, не меняем | через BFF `/api/*` |

## Политика обновлений

| Ситуация | Действие |
|----------|----------|
| `legacy_id` нет в Strapi | **Создать** запись |
| `legacy_id` есть, `contentLocked=true` | **Пропустить** |
| `legacy_id` есть, hash изменился | Обновить только **safe** поля |
| `legacy_id` есть, hash тот же | **Пропустить** |

### Safe vs protected

- **Safe (врачи):** `fullName`, `misId`, `specialty`, `photoUrl`, `experienceYears`, `degree`, `category`, `position`, `slug`
- **Protected:** `bio`, `education`, `content`, блоки, SEO — только вручную в Strapi; включите `contentLocked` чтобы синк не трогал запись.

- **Safe (новости/анонсы):** `title`, `excerpt`, `anonceLink`, `sortOrder`, `showOnHome`, `publishedAt`, `kind`
- **Protected:** `content` (richtext), если редактор правил в Strapi.

## Ключи идентификации

| Поле Strapi | Источник legacy | Назначение |
|-------------|-----------------|------------|
| `legacyId` | WP user/post ID | дедупликация синка |
| `legacySource` | `chel` / `spb` | город |
| `misId` | `qms_id` из REST | слоты МИС и booking |

## Маппинг: врачи (REST `get_doctors`)

Полная единая таблица ЧЛБ + СПб: **[SYNC_DOCTORS_SPEC.md](./SYNC_DOCTORS_SPEC.md)**.

Кратко (ЧЛБ):

| Legacy (ci74.ru REST) | Strapi Doctor | Safe |
|-----------------------|---------------|------|
| `wp_user_id` | `legacyId` | да |
| `qms_id` | `misId` | да |
| `display_name` | `fullName` | да |
| `specialty` | `specialty` | да |
| `photo_url` | `photoUrl` | да |
| `experience_years` | `experienceYears` | да |
| `degree`, `category`, `position` | `degree` / `category` / `position` | да |
| `description`, `education_text` | `bio`, `education` | protected |

## Маппинг: контент (MySQL через bridge)

| Legacy post_type | Strapi | kind / тип |
|------------------|--------|------------|
| `novosti` | News | `news` |
| `anonces`, `home_anonces` | News | `anonce` |
| `articles` | News | `article` |
| `vakansii` | Vacancy | — |

## Запуск синка

На сервере (bridge), с Bearer `BRIDGE_API_TOKEN`:

```http
POST /api/sync/chel/doctors
POST /api/sync/chel/content
```

Локально:

```bash
cd modx_wp-to-strapi-migration-api
npm run test:chel-db          # проверка MySQL Beget
curl -H "Authorization: Bearer $BRIDGE_API_TOKEN" -X POST http://127.0.0.1:3010/api/sync/chel/doctors
```

Env Strapi для bridge: `STRAPI_URL`, `STRAPI_API_TOKEN` (или `sync_config` в Postgres bridge).

Отчёт синка: `{ created, updated, skipped, errors[] }`.

## Доказательства для Beget (MySQL)

### С Windows (PowerShell)

```powershell
Test-NetConnection cisto.beget.tech -Port 3306
curl https://api.ipify.org
```

С домашнего ПК Beget увидит **ваш IP**, не сервер Coolify.

### С сервера / bridge

```http
GET /api/legacy/diagnostics/mysql
```

или `npm run test:chel-db` в каталоге bridge.

### Текст для техподдержки Beget

> Прошу разрешить **удалённый доступ к MySQL**  
> Пользователь: `cisto_ci74`  
> База: `cisto_ci74`  
> Хост: `cisto.beget.tech`  
> С IP: `37.79.254.120` (сервер Coolify)  
> Ошибка: `Access denied for user 'cisto_ci74'@'37.79.254.120'`

Приложите скрин JSON из `/api/legacy/diagnostics/mysql`.

## Booking на новом сайте

Виджет `/booking` вызывает `/api/wp-doctors`, `/api/slots`, `/api/book` — реализовано в **apps/bff**, проксируется Next → BFF. Виджет не меняем.

**Аудит полей врачей (заполненность по каждому полю):** [SYNC_DOCTORS_SPEC.md](./SYNC_DOCTORS_SPEC.md).

## Что не входит в этот синк

- Прайс / услуги / цены — отдельный проект.
- Санкт-Петербург (MODX) — отдельный маппинг, позже.
- Изменения в QMS / PHP backend записи.
