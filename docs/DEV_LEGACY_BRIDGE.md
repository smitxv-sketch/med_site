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

2) Открыть интерфейс (потребуется Basic Auth из `env/bridge.auth.env`):
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
3) Сервер `legacy-bridge` читает токен из `infra/env/legacy-bridge-istochnik.env`

## ENV: 1 файл = 1 приложение Coolify

Секреты в `infra/env/`. Имена файлов и переменных **1:1 с Coolify UI**.

| Файл | Приложение Coolify |
|------|---------------------|
| `legacy-bridge-istochnik.env` | legacy-bridge-istochnik |
| `site-ci.env` | site-ci |
| `studio-istochnik.env` | studio-istochnik |
| `strapi-istochnik.env.example` | strapi-istochnik (только справка, локально Strapi не запускаем) |

Шаблоны: `infra/env/*.env.example` → скопировать в `*.env` и заполнить.  
Загрузчик bridge: `infra/loadAppEnv.mjs` → `loadAppEnv('legacy-bridge-istochnik')` в `server.ts`.

Проверка БД Челябинска: `npm run test:chel-db` (в каталоге bridge).

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

Скопировать шаблоны `env/*.env.example` → `env/*.env` и заполнить (см. таблицу выше).

Минимум для Челябинска:
- **SPB (MODX)**: `SPB_DB_HOST`, `SPB_DB_USER`, `SPB_DB_PASSWORD`, `SPB_DB_NAME`, `SPB_DB_PREFIX`
- **CHEL (WordPress)**: `CHEL_DB_HOST`, `CHEL_DB_USER`, `CHEL_DB_PASSWORD`, `CHEL_DB_NAME`, `CHEL_DB_PREFIX`

REST-эндпоинт для докторов (если нужно переопределить):
- `CHEL_API_ENDPOINT` (по умолчанию `https://ci74.ru/api/rest.php`)

Порт по умолчанию:
- `PORT=3010` (можно поменять)

## Coolify: что добавить в legacy-bridge-istochnik

Скопировать **все ключи** из `infra/env/legacy-bridge-istochnik.env.example` в Coolify (плоский список, 1:1).

**Обязательно:**
- `BRIDGE_API_TOKEN` — токен для ИИ/MCP (Bearer)
- `SITE_PASSWORD` — пароль Basic Auth для UI (в production нужен хотя бы один из двух)
- `SITE_USER` — логин (опционально, по умолчанию `admin`)
- `NODE_ENV=production`, `PORT=3010`, `HOST=0.0.0.0` (в Coolify)

**Нужно добавить для СПб (MODX), если смотрите оба сайта:**
- `SPB_DB_HOST`, `SPB_DB_USER`, `SPB_DB_PASSWORD`, `SPB_DB_NAME`, `SPB_DB_PREFIX`

**Опционально:**
- `VITE_FIREBASE_*` — только если нужен Schema Builder с Firebase
- `GEMINI_API_KEY`, `OPENROUTER_API_KEY` — не для bridge, для основного legacy-сайта

**Локально:** `env/*.env` (в git не коммитятся). **Coolify:** те же ключи плоским списком.

## Swagger / OpenAPI

- `GET /api/explore/openapi.json`

Полезно передавать эту ссылку агентам миграции, чтобы они сами делали запросы и строили модель Strapi.

