# Инфраструктура сервера (Coolify) — карта для ИИ

Документ описывает **как устроен продакшен-сервер**, чтобы в новых чатах быстро понять контекст без повторного исследования.

**Обновлено:** 2026-06-23  
**Панель:** Coolify на хосте `localhost` (self-hosted)  
**MCP:** доступен `user-coolify` для деплоев и диагностики

См. также: [STRAPI_DEPLOY_POSTMORTEM.md](./STRAPI_DEPLOY_POSTMORTEM.md), [COOLIFY_STRAPI.md](./COOLIFY_STRAPI.md), [DEPLOY_JOURNAL.md](./DEPLOY_JOURNAL.md).

---

## Физический / сетевой уровень

| Параметр | Значение |
|----------|----------|
| Публичный IP | `37.79.254.120` |
| Coolify UI (LAN) | `http://192.168.100.44:8000` |
| SSH | порт `2222` (пользователь `smit` или `root` — см. ваши ключи) |
| Reverse proxy | **Traefik v3.6** (`coolify-proxy`), Let's Encrypt |
| Docker network | `coolify` (все сервисы Coolify) |
| ОС хоста | Linux, Docker 29.x, BuildKit |

### DNS (клиника «Источник»)

| Домен | Назначение |
|-------|------------|
| `istochnik.smitx.ru` | Основной сайт (Application `site-ci`) |
| `cms.istochnik.smitx.ru` | Strapi CMS + admin |

Оба указывают на `37.79.254.120` (A-запись).

---

## Coolify: проекты и окружения

| Проект | UUID | Описание |
|--------|------|----------|
| **Infrastructure** | `l7i7h86pibca64e3ouqkt39z` | Strapi, Postgres для CMS, site-ci |
| **Servises** | `cvuva92bjemgj0xx2i59ungx` | Общие сервисы (AI, auth, monitoring) |

### Environment `istochnik` (Infrastructure)

UUID: `os4037dvaewugdcle599l4hu`

Сюда относятся ресурсы клиники «Источник»: Strapi, Postgres Strapi, сайт.

---

## Applications (Git → Docker / Nixpacks)

| Имя | UUID | Репо | Домен | Статус |
|-----|------|------|-------|--------|
| **strapi-istochnik** | `rxb04qg8k7ia718by5829zeh` | `smitxv-sketch/med_site` | https://cms.istochnik.smitx.ru | running:healthy |
| **site-ci** | `v218flpmvlr8bz62p11l4mk8` | `smitxv-sketch/med_site` | https://istochnik.smitx.ru | running |
| apl1 | `xdj2amzxht6htrp3pbqp3cud` | `smitxv-sketch/apl1` | apl1.ru | running |
| modx_wp_api | `f104fvbdleu52v2sheznij5t` | `smitxv-sketch/modx_wp_api` | sslip.io | exited |

### strapi-istochnik (детали)

- **Тип:** Application, `build_pack: dockerfile`
- **Dockerfile:** `/apps/cms/Dockerfile` (контекст = корень monorepo)
- **Порт:** `1337`
- **Healthcheck:** `GET /admin`, start_period 120s
- **Секреты:** в Coolify → Environment Variables (не в репозитории)

### site-ci (детали)

- Основной фронт + BFF из того же monorepo `med_site`
- Деплой через Nixpacks (см. `nixpacks.toml`, `DEPLOY_JOURNAL.md`)
- **Не путать** со Strapi — это отдельное Application в том же репо

---

## Databases

Все БД — внутри сети `coolify`, **не публичные** (`is_public: false`). Подключение по **internal hostname** (имя контейнера).

| Имя | UUID | Тип | Образ / заметки | Environment |
|-----|------|-----|-----------------|-------------|
| **postgresql-strapi** | `cwdkhczc0mty75tz3nwrmmut` | PostgreSQL | `pgvector/pgvector:pg18` | istochnik |
| postgres-infra | `a937fz65akjrn8mqpe8hnynl` | PostgreSQL | общая инфра | default |
| postgres-apl1 | `plieyg4ulfkjq6h0jdksxtlc` | PostgreSQL | для apl1.ru | default |
| postgresql-logto | `gp5cidr05by86zkec9gul7q9` | PostgreSQL | для Logto | default |
| redis-database | `hmafg7ogdfv4p8rdk4kqicgf` | Redis | кэш / очереди | default |

### postgresql-strapi (для Strapi и будущего AI)

| Параметр | Значение |
|----------|----------|
| Internal host | `cwdkhczc0mty75tz3nwrmmut` |
| Port | `5432` |
| User | `postgres` |
| Password | Coolify → Database → postgresql-strapi → **Connection** |
| БД Strapi | **`strapi`** (создана отдельно от default `postgres`) |
| Расширение | `pgvector` доступен (образ pgvector) |

**Рекомендация на перспективу:**
- Strapi → БД `strapi`
- Embeddings / semantic search → БД `ai` (создать в том же Postgres): `CREATE EXTENSION vector;`
- Не хранить вектора в таблицах Strapi

---

## Services (docker-compose в Coolify)

| Имя | UUID | Назначение (кратко) |
|-----|------|---------------------|
| logto | `u2r3djvm8sbh71xkymgnkl4o` | Auth (Logto) |
| mini | `n7vkgzbrzo4balqu2es3ni34` | MinIO (S3-совместимое хранилище) |
| Uptime Kuma | `hp8s0m3epujkuvcgf8h1fte2` | Мониторинг uptime |
| lite_lli | `ebxzgid3tn26wma6a4rnf51i` | LiteLLM (прокси LLM) |
| webui | `sjkwsyravyqzkfgg1bfq3yuv` | Open WebUI |
| langfuse | `pqwbt8vairr47mz0pcmdgrd0` | LLM observability |
| glitchtip | `wem2oljm10uwjtcbcaf00c7i` | Sentry-альтернатива |
| Speaches | `usfbrr0u93d9d0fsx007rlzw` | STT/TTS |
| kokoro | `z5j0zw3uo8lt21xpoboyg7kz` | TTS Kokoro |
| chatterbox | `kfphb4hw3fhim7aed77veyyl` | (exited) |

**Не использовать:** старый Service `strapi-ci` (Elestio template) — см. post-mortem.

---

## Связка «сайт ↔ CMS ↔ AI» (целевая архитектура)

```
┌─────────────────┐     REST/GraphQL      ┌──────────────────┐
│  istochnik.smitx │ ◄────────────────────► │ cms.istochnik    │
│  (site-ci)       │                        │ (strapi-istochnik)│
│  med_site /src   │                        │ apps/cms         │
└────────┬────────┘                        └────────┬─────────┘
         │                                            │
         │              ┌─────────────────────────────┘
         │              │  Postgres: БД strapi
         ▼              ▼
┌─────────────────────────────────────────────────────────────┐
│  postgresql-strapi (pgvector/pgvector:pg18)                 │
│  • strapi — контент CMS                                     │
│  • ai (план) — embeddings для поиска                        │
└─────────────────────────────────────────────────────────────┘
         ▲
         │  будущий pipeline: контент → embeddings → pgvector
┌────────┴────────┐
│ lite_lli / webui │  LLM-сервисы (отдельные контейнеры)
└─────────────────┘
```

---

## Monorepo `med_site` — что где живёт

| Путь | Роль на сервере |
|------|-----------------|
| `apps/cms/` | Strapi → **strapi-istochnik** |
| `packages/contracts/` | Shared types, собирается в Docker перед Strapi |
| `src/`, `server/` | Основной сайт → **site-ci** |
| `src/widget/` | Виджет записи — **изолирован**, не трогать при работе над CMS |
| `modx_wp-to-strapi-migration-api/` | Legacy bridge / миграция (отдельный деплой при необходимости) |

### npm overrides (важно для Strapi в monorepo)

В корневом `package.json`:

```json
"overrides": {
  "react-router": "^6.30.4",
  "react-router-dom": "^6.30.4",
  "date-fns": "^2.30.0"
}
```

Без этого Strapi admin в monorepo ломается (см. post-mortem).

---

## Операции для ИИ

### Деплой Strapi

```text
Coolify MCP: deploy → tag_or_uuid: rxb04qg8k7ia718by5829zeh
```

Или push в `main` + webhook (если настроен).

### Проверка снаружи

```bash
curl -I https://cms.istochnik.smitx.ru/admin
curl -I https://istochnik.smitx.ru/
```

### Проверка Postgres (на сервере по SSH)

```bash
sudo docker exec cwdkhczc0mty75tz3nwrmmut psql -U postgres -d strapi -c 'SELECT 1'
sudo docker exec cwdkhczc0mty75tz3nwrmmut psql -U postgres -d strapi -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### Логи приложения

Coolify MCP: `application_logs` → uuid `rxb04qg8k7ia718by5829zeh`

---

## Безопасность и секреты

- **Пароли БД, JWT, APP_KEYS** — только в Coolify UI, не коммитить.
- В этом документе намеренно **нет** паролей и токенов.
- Traefik: TLS через Let's Encrypt, HTTP→HTTPS redirect.

---

## Известные ограничения сервера

| Параметр | Значение | Влияние |
|----------|----------|---------|
| `concurrent_builds` | 2 | Параллельные тяжёлые Docker build могут OOM |
| Docker cleanup | threshold 80% | Старые образы удаляются по расписанию |
| РФ / Docker Hub | иногда TLS timeout | Свой Dockerfile на `node:20-alpine`, не тянуть Elestio с Hub |

---

## Быстрые ссылки Coolify UI

| Ресурс | Путь в UI |
|--------|-----------|
| Strapi app | `/project/l7i7h86pibca64e3ouqkt39z/environment/os4037dvaewugdcle599l4hu/application/rxb04qg8k7ia718by5829zeh` |
| Postgres Strapi | Databases → `postgresql-strapi` |
| Site | Application `site-ci` |

---

## Что ещё не сделано (backlog инфраструктуры)

- [ ] Persistent volume для Strapi uploads: `/app/apps/cms/public/uploads`
- [ ] Отдельная БД `ai` + схема embeddings
- [ ] Остановить/удалить неиспользуемый `strapi-ci` Service
- [ ] Webhook GitHub → auto-deploy `strapi-istochnik` после push
