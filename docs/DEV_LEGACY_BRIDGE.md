# Legacy Content Bridge (MODX + WordPress) — запуск и подключение

Этот сервис (`modx_wp-to-strapi-migration-api`) нужен как **первый шаг перед синхронизацией**: в реальном времени смотреть весь контент обоих сайтов, исследовать структуры MIGX/TV/ACF/таксономий и проверять гипотезы маппинга в Strapi.

## Локальный запуск

1) В корне репозитория:

```bash
npm run dev:legacy-bridge
```

2) Открыть интерфейс:
- `http://localhost:3010`

## ENV (обязательно)

Скопировать файл:
- `modx_wp-to-strapi-migration-api/.env.example` → `modx_wp-to-strapi-migration-api/.env`

Заполнить минимум:
- **SPB (MODX)**: `SPB_DB_HOST`, `SPB_DB_USER`, `SPB_DB_PASSWORD`, `SPB_DB_NAME`, `SPB_DB_PREFIX`
- **CHEL (WordPress)**: `CHEL_DB_HOST`, `CHEL_DB_USER`, `CHEL_DB_PASSWORD`, `CHEL_DB_NAME`

Если в Coolify у тебя уже заведены переменные вида `WP_DB_*`, сервис их тоже понимает:
- `WP_DB_HOST`, `WP_DB_PORT`, `WP_DB_USER`, `WP_DB_PASSWORD`, `WP_DB_NAME`

REST-эндпоинт для докторов (если нужно переопределить):
- `WP_API_ENDPOINT` (по умолчанию `https://ci74.ru/api/rest.php`)

Порт по умолчанию:
- `PORT=3010` (можно поменять)

## Coolify: что уже есть vs что добавить

**Уже есть (для Челябинска / WP):**
- `WP_DB_HOST`, `WP_DB_USER`, `WP_DB_PASSWORD`, `WP_DB_NAME`, `WP_DB_PREFIX`
- `WP_API_ENDPOINT`
- `QMS_CHEL_ADDRESS`, `QMS_CHEL_API_KEY` (для legacy-прототипа, bridge напрямую не обязателен)

**Нужно добавить для bridge (обязательно):**
- `SITE_PASSWORD` — пароль Basic Auth (без него в production сервис **не стартует**)
- `SITE_USER` — логин (опционально, по умолчанию `admin`)
- `NODE_ENV=production`

**Нужно добавить для СПб (MODX), если смотрите оба сайта:**
- `SPB_DB_HOST`, `SPB_DB_USER`, `SPB_DB_PASSWORD`, `SPB_DB_NAME`, `SPB_DB_PREFIX`

**Опционально:**
- `VITE_FIREBASE_*` — только если нужен Schema Builder с Firebase
- `GEMINI_API_KEY`, `OPENROUTER_API_KEY` — не для bridge, для основного legacy-сайта

**Локальный `.env`:** секретов в git нет; заполняй только локально или в Coolify.

## Swagger / OpenAPI

- `GET /api/explore/openapi.json`

Полезно передавать эту ссылку агентам миграции, чтобы они сами делали запросы и строили модель Strapi.

