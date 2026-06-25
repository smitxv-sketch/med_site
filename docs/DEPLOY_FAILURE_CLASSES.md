# Классы сбоев деплоя и защита от повторения

> SSOT для типовых ошибок Coolify/monorepo. Обновлено: 2026-06-25.

## Зачем

Monorepo с **тремя Dockerfile** (site-ci, studio, strapi) и **одним** `.dockerignore` даёт сбои, которые локальный `npm run build` **не ловит**. Этот документ фиксирует классы проблем и автоматические проверки.

## Стандартный цикл перед продом

```bash
npm run ci:platform      # preflight + dedupe + сборка web/bff/studio
git push origin main     # Coolify по watch_paths (infra/platform.manifest.json)
npm run smoke:prod       # внешние health-checks
```

Ручной триггер (если webhook не сработал): `npm run deploy:platform` (нужны `COOLIFY_URL` + `COOLIFY_API_TOKEN`).

Отдельная проверка только Docker-контекста: `npm run preflight:deploy`.

---

## Класс A — `.dockerignore` блокирует чужой Dockerfile

| | |
|---|---|
| **Суть** | Один общий `.dockerignore` для всех образов. Исключение папки ради ускорения site-ci ломает `COPY` в studio/strapi. |
| **Симптом** | Coolify: `"/apps/studio": not found` при `COPY apps/studio` |
| **История** | Коммит `89f04dc` исключил `apps/studio`; fix `2442005` |
| **Правило** | Не исключать целые `apps/cms` / `apps/studio`. Только артефакты: `.next`, `build`, `dist`, `.cache`. |
| **Автозащита** | `scripts/deploy-preflight.mjs` — список `requiredPaths` на каждый Dockerfile vs правила `.dockerignore`. |

## Класс B — CI ≠ Docker build

| | |
|---|---|
| **Суть** | `ci:platform` гоняет `npm run build`, но не `docker build`. Класс A проявляется только на Coolify. |
| **Симптом** | GitHub Actions зелёный, деплой красный |
| **Правило** | Preflight встроен в `scripts/ci-platform.mjs` **до** сборки пакетов. |
| **Автозащита** | Шаг `deploy-preflight` в CI (локально и `.github/workflows/platform-ci.yml`). |

## Класс C — OOM из-за дублирования `apk add`

| | |
|---|---|
| **Суть** | `RUN apk add python3 make g++` в стадиях **deps** и **build** → параллельно ~300MB RAM на слабом хосте Coolify. |
| **Симптом** | exit code 255 на `npm install` / build stage |
| **История** | studio fix `02868ca`; cms — профилактика в этом коммите |
| **Правило** | Native deps (`g++`) только в `deps`. Стадия `build` копирует `node_modules` из deps. Эталон: `apps/platform/Dockerfile`. |
| **Автозащита** | Preflight: `forbidApkInBuildStage` для studio и strapi. |

## Класс D — ложный FAIL в smoke

| | |
|---|---|
| **Суть** | BFF на проде слушает `127.0.0.1:3001` внутри контейнера site-ci — с интернета недоступен. |
| **Симптом** | `npm run smoke:prod` → 6/8 (bff-health, bff-page) |
| **Правило** | `--prod` / `SMOKE_ENV=prod` → skip BFF checks. |
| **Автозащита** | `scripts/smoke-platform.mjs`: `skipBff` включает `isProd`. |

## Класс G — SSR/runtime на сервере Next (не ловится `next build`)

| | |
|---|---|
| **Суть** | Динамические страницы (`ƒ`) падают при первом SSR-запросе: `window is not defined`, Framer `useScroll` и т.п. |
| **Симптом** | Coolify healthy, но HTML с `__next_error__`; в логах `ReferenceError: window is not defined` |
| **Правило** | Client-only для browser API; `useEffect` + `mounted` или dynamic import `ssr: false`. |
| **Автозащита** | После деплоя: curl главной без `__next_error__`; опционально `preflight:docker:site` + run + curl (TODO). |

## Класс E — webhook Coolify (операционный)

| | |
|---|---|
| **Суть** | Push в `main` есть, деплой не стартовал (watch_paths, GitHub App, очередь). |
| **Симптом** | Прод на старом коммите при зелёном CI |
| **Правило** | Сверить коммит в Coolify UI; при расхождении — `npm run deploy:platform`. |
| **Автозащита** | Пока только ручной триггер + журнал в `DEPLOY_JOURNAL.md`. |

## Класс F — параллельный штурм деплоев (не OOM на 32 ГБ)

| | |
|---|---|
| **Суть** | Одновременный `force_rebuild` нескольких приложений → contention (git clone, Docker daemon, диск). Exit 255 **без** `Killed` в логе — не доказывает OOM. |
| **Симптом** | Все деплои падают в одну секунду; site-ci может упасть на `git clone`; прод остаётся на старом образе (`running:healthy`). |
| **История** | 2026-06-25: три параллельных API-deploy |
| **Правило** | Деплоить **по одному** из `deployOrder`; не триггерить все apps без нужды. |
| **Автозащита** | `deploy-platform.mjs` идёт последовательно. |

---

## Файлы

| Файл | Роль |
|------|------|
| `scripts/deploy-preflight.mjs` | Проверки классов A и C |
| `scripts/ci-platform.mjs` | Вызывает preflight перед build |
| `.dockerignore` | Granular excludes (не целые apps) |
| `apps/studio/Dockerfile` | apk только в deps |
| `apps/cms/Dockerfile` | apk только в deps |
| `infra/platform.manifest.json` | Порядок и watch_paths приложений |

## Добавление нового Docker-приложения

1. Добавить запись в `DOCKER_APPS` внутри `deploy-preflight.mjs` (`requiredPaths`, при необходимости `forbidApkInBuildStage`).
2. Убедиться, что `.dockerignore` не исключает эти пути целиком.
3. Добавить приложение в `infra/platform.manifest.json`.
4. Прогнать `npm run preflight:deploy` и полный `ci:platform`.
