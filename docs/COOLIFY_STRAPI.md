# Strapi on Coolify (Infrastructure → istochnik)

## Текущая схема

| Ресурс | Coolify | Статус |
|--------|---------|--------|
| Postgres pgvector | `postgresql-strapi` (`cwdkhczc0mty75tz3nwrmmut`) | `running:healthy` |
| Strapi (целевой) | `strapi-istochnik` Application | ждёт `git push` Wave 0 |
| Strapi (шаблон Elestio) | `strapi-ci` Service | **не использовать** — Docker Hub pull падает в РФ |

## Postgres (`postgresql-strapi`)

- Image: `pgvector/pgvector:pg18`
- Internal host: `cwdkhczc0mty75tz3nwrmmut`
- Port: `5432`
- Database: `strapi` (создана)
- User: `postgres`
- Password: в Coolify → Database → postgresql-strapi → Connection

Проверка на сервере:

```bash
ssh -p 2222 smit@192.168.100.44
sudo docker exec cwdkhczc0mty75tz3nwrmmut psql -U postgres -d strapi -c 'SELECT 1'
```

## Strapi Application (`strapi-istochnik`)

- Project: **Infrastructure** → environment **istochnik**
- Domain: **https://cms.istochnik.smitx.ru**
- Repo: `smitxv-sketch/med_site` branch `main`
- Dockerfile: `apps/cms/Dockerfile` (build from monorepo root)
- Port: `1337`

### Env (уже заданы в Coolify)

```
DATABASE_CLIENT=postgres
DATABASE_HOST=cwdkhczc0mty75tz3nwrmmut
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=<из postgresql-strapi>
DATABASE_SSL=false
NODE_ENV=production
STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=ru-RU
APP_KEYS, JWT_SECRET, ADMIN_JWT_SECRET, ... (в Coolify secrets)
```

### Запуск

1. **Закоммитить и запушить Wave 0** в `main` (нужны `apps/cms/`, `packages/contracts/`, Dockerfile).
2. Coolify → `strapi-istochnik` → **Deploy**.
3. Открыть https://cms.istochnik.smitx.ru/admin → создать первого админа.

### Persistent storage

Добавить в Application → Storages:

```
Mount: /app/apps/cms/public/uploads
```

## Почему не `strapi-ci` (Elestio template)

Шаблон тянет `elestio/strapi-production` с Docker Hub → **TLS handshake timeout** на сервере в РФ.
Сборка из своего репо (`node:20-alpine` в Dockerfile) обходит эту проблему — базовый образ кэшируется при build на Coolify.

**Используйте Application `strapi-istochnik`**, не Service `strapi-ci` — два Strapi рядом только путают. `strapi-ci` можно остановить/удалить после успешного деплоя `strapi-istochnik`.

### Типичная ошибка деплоя (исправлено в Dockerfile)

```
npm error path /app/node_modules/better-sqlite3
gyp ERR! find Python You need to install the latest version of Python.
```

Причина: `node:20-alpine` без `python3`/`make`/`g++`. В `apps/cms/Dockerfile` добавлен `apk add` в stages `deps` и `build`.

### Coolify env: NODE_ENV

`NODE_ENV=production` должен быть **только Runtime**, не Buildtime — иначе Coolify предупреждает о пропуске devDependencies.

### Адреса

| Что | URL |
|-----|-----|
| Coolify UI | `http://192.168.100.44:8000` (порт **8000** — панель, не Strapi) |
| Strapi admin (целевой) | **https://cms.istochnik.smitx.ru/admin** |
| MCP (после деплоя) | `https://cms.istochnik.smitx.ru/mcp` |

## DNS

Добавить A-запись `cms.istochnik.smitx.ru` → `37.79.254.120` (или через Traefik/Coolify domains).

## pgvector

Расширение для будущего semantic search:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

Выполнить после первого старта Strapi (в БД `strapi`).
