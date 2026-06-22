# Legacy Content Bridge API (MODX + WordPress)

Этот проект даёт единый API‑доступ к контенту **двух старых сайтов**:
- **СПб**: MODX (MySQL + TVs/MIGX + кастомные таблицы прайса)
- **Челябинск**: WordPress (MySQL: posts/meta + taxonomies)

Также содержит UI для экспорта/исследования и “sync engine” для последующей записи в Strapi.

## Быстрый старт

1) Установить зависимости:

```bash
npm install
```

2) Настроить `.env`:
- Скопировать `.env.example` → `.env`
- Заполнить DB доступы (MODX/WP)
- **Обязательно в Coolify:** `SITE_PASSWORD` (+ опционально `SITE_USER`, по умолчанию `admin`)

3) Запуск:

```bash
npm run dev
```

## Swagger / OpenAPI

OpenAPI спецификация отдается JSON‑ом:
- `GET /api/explore/openapi.json`

Эта спецификация описывает эндпоинты чтения сырых данных:
- `GET /api/explore/spb/*`
- `GET /api/explore/chel/*`

## Secrets / безопасность

- Никакие ключи не должны храниться в git. Все значения — через `.env` / Coolify env.
- **В production без `SITE_PASSWORD` сервис не стартует** — иначе откроются сырые данные двух сайтов.
- UI и все `/api/*` защищены Basic Auth (логин `SITE_USER`, пароль `SITE_PASSWORD`).
- Локально без пароля можно только при `LEGACY_BRIDGE_ALLOW_LOCAL_NO_AUTH=true` и `localhost`.
- `VITE_FIREBASE_*` — клиентская конфигурация (видна в браузере), нужна только для Schema Builder.
