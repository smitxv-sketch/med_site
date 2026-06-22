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

Порт по умолчанию:
- `PORT=3010` (можно поменять)

## Swagger / OpenAPI

- `GET /api/explore/openapi.json`

Полезно передавать эту ссылку агентам миграции, чтобы они сами делали запросы и строили модель Strapi.

