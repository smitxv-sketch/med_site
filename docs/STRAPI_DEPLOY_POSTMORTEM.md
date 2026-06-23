# Strapi на Coolify: опыт деплоя (post-mortem)

Документ для будущих сессий ИИ и команды. Описывает **реальные проблемы**, **ложные следы** и **итоговое решение** при развёртывании Strapi 5 из monorepo `med_site` на Coolify.

**Статус на 2026-06-23:** Strapi admin работает, форма «Welcome to Strapi!» открывается.

См. также: [INFRASTRUCTURE_SERVER.md](./INFRASTRUCTURE_SERVER.md), [COOLIFY_STRAPI.md](./COOLIFY_STRAPI.md).

---

## Контекст

| Параметр | Значение |
|----------|----------|
| Репозиторий | `smitxv-sketch/med_site`, ветка `main` |
| Strapi | `@strapi/strapi@5.48.1` в `apps/cms` |
| Coolify Application | **`strapi-istochnik`** (UUID `rxb04qg8k7ia718by5829zeh`) |
| URL | https://cms.istochnik.smitx.ru/admin |
| Dockerfile | `apps/cms/Dockerfile` (сборка из **корня** monorepo) |
| Postgres | `postgresql-strapi` (образ `pgvector/pgvector:pg18`), БД `strapi` |
| Проект Coolify | Infrastructure → environment **istochnik** |

### ⚠️ Не путать с `strapi-ci`

| Ресурс | Тип | Использовать? |
|--------|-----|---------------|
| `strapi-istochnik` | Application | **ДА** — клонирует GitHub, собирает Dockerfile |
| `strapi-ci` | Service (docker-compose) | **НЕТ** — нет папки `apps/` из репо, падает на `lstat .../apps` |

---

## Хронология проблем и фиксов

### 1. `tsc: not found` при сборке

**Симптом:** Docker build падает на `npm run build -w @med-site/contracts`.

**Причина:** Coolify прокидывал `NODE_ENV=production` на **buildtime** → npm не ставил devDependencies (`typescript`).

**Решение:** в Dockerfile на этапе `build` явно задать окружение для сборки (см. текущий Dockerfile). Для `contracts` — `"build": "npx tsc"` в `packages/contracts/package.json`.

---

### 2. `date-fns` — Missing `./format/index.js`

**Симптом:** `strapi build` падает на Vite: `Missing "./format/index.js" specifier in "date-fns"`.

**Причина:** в корне monorepo был `date-fns@4`, Strapi admin ожидает API v2.

**Попытки:**
- пин в Dockerfile (`rm` + `npm install date-fns@2.30.0`) — работало нестабильно;
- порядок шагов важен: установка `react-router-dom` **после** пина date-fns могла снова подтянуть v4.

**Итоговое решение:** `overrides` в корневом `package.json`:

```json
"overrides": {
  "date-fns": "^2.30.0"
}
```

И выровнять прямую зависимость `"date-fns": "^2.30.0"` (иначе npm выдаёт `EOVERRIDE`).

---

### 3. Пустая admin + `Duplicate middleware references`

**Симптом:** HTML `/admin` отдаётся (`200 OK`), `<div id="strapi">` есть, но экран белый. В консоли:

```
Uncaught (in promise) Error: Duplicate middleware references found when creating the store.
```

**Ложные следы (не причина):**
- `timezoneChange.js` + CSP — **расширение Chrome**, на Strapi не влияет;
- DNS / Traefik — сервер отвечал 200, проблема в JS-бандле.

**Первая гипотеза (частично верная):** корневой `react-router-dom@7` vs Strapi v6.

**Что пробовали:**
| Подход | Результат |
|--------|-----------|
| Пин `react-router-dom@6.30.4` в Dockerfile | Сборка OK, ошибка в браузере осталась |
| `vite.config.ts` с aliases на `apps/cms/node_modules` | ENOENT — hoisting, пакеты в корневом `node_modules` |
| Aliases на корень monorepo | Не довели до стабильного результата |
| `overrides` для react-router v6 | Бандл сменил хеш, но ошибка осталась на dev-сборке |

**Реальная причина (найдена разбором бандла):**

1. Strapi admin собирался с **`NODE_ENV=development`** на этапе Docker `build`.
2. В dev-сборке Redux Toolkit включает `duplicateMiddlewareCheck: true`.
3. Плагин **i18n** регистрирует `() => api.middleware`, а базовый store Strapi уже добавляет тот же `tu.middleware` — **одна и та же ссылка дважды** → RTK бросает ошибку только в dev-режиме.

**Итоговое решение:** на этапе `build` в Dockerfile:

```dockerfile
ENV NODE_ENV=production
```

Проверка: в production-бандле (`strapi-D92lE3r3.js`) **нет** строки `Duplicate middleware references found`.

**Дополнительно (для monorepo):** `overrides` в корневом `package.json`:

```json
"overrides": {
  "react-router": "^6.30.4",
  "react-router-dom": "^6.30.4",
  "date-fns": "^2.30.0"
}
```

Пины в Dockerfile после этого **убрали** — достаточно lock-файла с overrides.

---

### 4. Healthcheck `connection refused`

**Симптом:** деплой «успешен», но Coolify помечает unhealthy.

**Причины:**
- `start_period` был слишком мал (Strapi долго стартует);
- в runner-образе не было `wget`/`curl` для healthcheck.

**Решение:** `start_period: 120`, retries `15`, path `/admin`; в runner `apk add wget curl`.

---

### 5. OOM / обрыв сборки (exit 255)

**Симптом:** деплой обрывается на `npm install` без явной ошибки.

**Причина:** параллельные тяжёлые стадии Dockerfile (несколько `apk add python3 g++` одновременно) + `concurrent_builds: 2` на сервере.

**Что помогло:** упростить Dockerfile, кэш npm (`--mount=type=cache`), не запускать лишние параллельные сборки вручную.

---

### 6. DNS и доступ из браузера

**Симптом:** `ERR_TUNNEL_CONNECTION_FAILED`, `ERR_CONNECTION_CLOSED`.

**Решение:** A-запись `cms.istochnik.smitx.ru` → `37.79.254.120`. После DNS всё ок с сервера (`curl` → 200).

При странностях в Chrome иногда мешает HTTP/3 (Traefik) — пробовать другой браузер или отключить QUIC.

---

## Ключевые коммиты (main)

| Коммит | Суть |
|--------|------|
| `ea89646` | fix tsc / NODE_ENV на build |
| `2e9bf0d` | pin date-fns v2 в Dockerfile |
| `04ed935` | wget/curl для healthcheck |
| `4ca5e7b` | попытка react-router + vite.config (частично) |
| `b5cb516` | overrides react-router v6 + date-fns v2 |
| `1ffe618` | **NODE_ENV=production на build** — финальный фикс admin |

---

## Текущая схема сборки (кратко)

```
deps:  npm install workspaces + esbuild (overrides из package.json)
build: NODE_ENV=production → contracts tsc → strapi build
runner: strapi start на :1337
```

Файл: `apps/cms/Dockerfile`.

---

## Coolify: важные настройки

| Параметр | Значение |
|----------|----------|
| `NODE_ENV` | **только Runtime** = `production` (не на buildtime через Coolify env!) |
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_HOST` | internal hostname `cwdkhczc0mty75tz3nwrmmut` |
| `DATABASE_NAME` | **`strapi`** (не имя контейнера!) |
| Healthcheck | GET `http://localhost:1337/admin`, start_period 120s |

Секреты (`JWT_SECRET`, `APP_KEYS`, пароль БД) — **только в Coolify**, не в git.

---

## Чеклист после изменений в Strapi/CMS

1. Локально: `npm install --legacy-peer-deps` и `npm ls react-router-dom date-fns`
2. Push в `main` → Deploy **`strapi-istochnik`**
3. Дождаться `running:healthy`
4. Проверить **новый хеш** бандла: View Source → `strapi-XXXXXXXX.js`
5. Открыть admin в **инкогнито** / Ctrl+Shift+R
6. При падении сборки — смотреть полный лог Docker в Coolify (не обрезанный)

---

## Postgres и pgvector (перспектива)

Сейчас один сервис **`postgresql-strapi`** на образе `pgvector/pgvector:pg18`:
- Strapi использует БД **`strapi`**
- Расширение `vector` можно включить для semantic search / ИИ
- Рекомендация: для векторов завести **отдельную БД** (например `ai`) в том же Postgres, не смешивать с таблицами Strapi

---

## Уроки для ИИ (TL;DR)

1. **Application, не Service** — для monorepo с Dockerfile нужен `strapi-istochnik`.
2. **npm workspaces + Strapi** — используй `overrides` в корневом `package.json`, не полагайся на `hoistingLimits`.
3. **Admin blank page** — если бандл грузится, но React падает: смотри консоль; для Strapi 5 проверь **NODE_ENV при `strapi build`** (нужен production).
4. **Имя бандла не меняется** — значит не пересобрали или кэш браузера.
5. **Не коммитить пароли** — только ссылки на Coolify.
