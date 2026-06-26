# Legacy Content Bridge (MODX + WordPress) — запуск и подключение

Этот сервис (`modx_wp-to-strapi-migration-api`) нужен как **первый шаг перед синхронизацией**: в реальном времени смотреть весь контент обоих сайтов, исследовать структуры MIGX/TV/ACF/таксономий и проверять гипотезы маппинга в Strapi.

## Где он должен работать

**Основной режим — на сервере Coolify** (рядом с `site-ci` и `strapi-istochnik`):

- Сервер уже в whitelist MySQL Beget (Челябинск)
- Доступ к БД MODX (СПб) тоже с сервера, не с вашего ПК
- URL с токеном: например `https://bridge.istochnik.smitx.ru`

Локальный запуск (`npm run dev:legacy-bridge`) — только для отладки разработчиком.

## Coolify (production)

Приложение: **`legacy-bridge`** в environment **istochnik**

- Репозиторий: `smitxv-sketch/med_site`, ветка `main`
- **Base directory:** `modx_wp-to-strapi-migration-api`
- **Dockerfile:** `Dockerfile`
- **Port:** `3010`

## Локальный запуск (опционально)

1) В корне репозитория:

```bash
npm run dev:legacy-bridge
```

2) Открыть интерфейс (потребуется Basic Auth из `.env`):
- `http://127.0.0.1:3010`

## Безопасность (обязательно)

Сервис **не должен быть открыт без авторизации**:

| Способ | Переменная | Кто использует |
|--------|------------|----------------|
| Bearer-токен | `BRIDGE_API_TOKEN` | ИИ, MCP, `curl`, sync-скрипты |
| Basic Auth | `SITE_USER` + `SITE_PASSWORD` | Браузер / UI исследователя |

Локально по умолчанию `HOST=127.0.0.1` — только ваша машина, не LAN.

Заголовок для API:
```http
Authorization: Bearer <BRIDGE_API_TOKEN>
```

## MCP для Cursor

1) Скопировать `.cursor/mcp.json.example` → `.cursor/mcp.json`
2) Убедиться, что bridge запущен (`npm run dev:legacy-bridge`)
3) Сервер `legacy-bridge` читает токен из `modx_wp-to-strapi-migration-api/.env`

Инструменты MCP:
- `bridge_guard` — лимиты и контракт пагинации (читать первым)
- `bridge_discover` — шаблоны MODX + post_types WordPress
- `bridge_openapi` — полная Swagger-спека
- `bridge_get` — одна страница GET `/api/...` (limit ≤ 25)
- `bridge_fetch_all` — все страницы с паузой (безопасно для Beget)
- `bridge_health` — проверка MODX-подключения

## Защита БД (пагинация и throttle)

Bridge **не отдаёт большие таблицы одним куском**. Контракт:

```http
GET /api/legacy/guard
GET /api/chel/news?limit=20&offset=0
```

Ответ:
```json
{
  "_meta": {
    "pagination": { "limit": 20, "offset": 0, "hasMore": true, "nextOffset": 20 },
    "guard": { "clientDelayMs": 700, "maxLimitPerRequest": 25 }
  },
  "data": [ ... ]
}
```

Пока `hasMore === true` — следующий запрос с `offset=nextOffset` и пауза `clientDelayMs` мс.

На сервере: очередь SQL (один запрос за раз + пауза ~450 мс), HTTP rate limit ~35 req/min.

Переменные Coolify (опционально): `LEGACY_DB_QUERY_DELAY_MS`, `LEGACY_DB_MAX_LIMIT`, `LEGACY_CLIENT_DELAY_MS`.

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
- `BRIDGE_API_TOKEN` — токен для ИИ/MCP (Bearer)
- `SITE_PASSWORD` — пароль Basic Auth для UI (в production нужен хотя бы один из двух)
- `SITE_USER` — логин (опционально, по умолчанию `admin`)
- `NODE_ENV=production`
- `HOST=127.0.0.1` локально или домен + TLS в Coolify

**Нужно добавить для СПб (MODX), если смотрите оба сайта:**
- `SPB_DB_HOST`, `SPB_DB_USER`, `SPB_DB_PASSWORD`, `SPB_DB_NAME`, `SPB_DB_PREFIX`

**Опционально:**
- `VITE_FIREBASE_*` — только если нужен Schema Builder с Firebase
- `GEMINI_API_KEY`, `OPENROUTER_API_KEY` — не для bridge, для основного legacy-сайта

**Локальный `.env`:** секретов в git нет; заполняй только локально или в Coolify.

## Swagger / OpenAPI

- `GET /api/explore/openapi.json`

Полезно передавать эту ссылку агентам миграции, чтобы они сами делали запросы и строили модель Strapi.

