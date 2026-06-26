# Bridge: архитектура слоя данных (ревизия 2026-06-26)

## Контекст

Beget разблокировал IP `37.79.254.120` (Coolify). Нужно:
- стабильный bridge (не падать из‑за одной БД);
- SSOT для источников и синка;
- синхронизация врачей ЧЛБ + СПб → Strapi;
- защита от повторной блокировки (throttle, chunking).

**Границы:** site-ci/booking **не трогаем** (read-only виджет). Bridge — отдельный сервис.

---

## Текущее состояние (as-is)

| Компонент | Файлы | Проблема |
|-----------|-------|----------|
| MySQL ЧЛБ | `dbChel.ts`, `wpService.ts` | Дубли env; часть данных через REST `ci74.ru` |
| MySQL СПб | `db.ts`, MODX-запросы в `api.ts` | Таймауты 10s → unhealthy, Traefik 503 |
| Очередь | `legacyDbQueue.ts`, `throttledPool.ts` | ✅ хорошо, но один глобальный chain на оба города |
| Sync state | `bridgeDb.ts` (Postgres) | ✅ отдельная БД для `sync_map`, excluded |
| Sync workers | `syncChelDoctors.ts`, `syncSpbDoctors.ts`, `syncDoctors.ts` | Разрозненные мапперы |
| Health | `/api/health/live` vs `/api/health` | Live OK; full health дергает SPB SELECT 1 |
| Диагностика | `legacyDiagnostics/mysql` | Расширено на chel+spb |

**Симптом на проде:** `bridge.istochnik.smitx.ru` → 503, логи `[legacy-db:spb] slow query "SELECT 1" 10000ms`.

---

## Целевая архитектура (to-be)

```
┌─────────────────────────────────────────────────────────────┐
│  legacy-bridge (Express)                                     │
├─────────────────────────────────────────────────────────────┤
│  HTTP API                                                    │
│    /api/health/live     — liveness (без БД)               │
│    /api/health          — readiness (PG + optional legacy)   │
│    /api/legacy/diagnostics/mysql — Beget proof              │
│    /api/sync/{chel,spb}/doctors — explicit sync jobs        │
├─────────────────────────────────────────────────────────────┤
│  Application layer                                           │
│    SyncOrchestrator — chunk, report, idempotent upsert       │
│    DoctorHydrator   — единый DoctorDTO → Strapi              │
├─────────────────────────────────────────────────────────────┤
│  Data access (SSOT)                                          │
│    legacy/dataSources.ts  — реестр env + prefix             │
│    legacy/LegacyMysqlGateway.ts — единый API: query(), ping()│
│    legacy/legacyDbQueue.ts — per-source или global queue     │
├─────────────────────────────────────────────────────────────┤
│  Sources                                                     │
│    chel: MySQL (WP) + REST fallback для врачей               │
│    spb:  MySQL (MODX)                                        │
├─────────────────────────────────────────────────────────────┤
│  State DB (Postgres bridge)                                  │
│    sync_map, sync_runs, excluded_resources                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    Strapi CMS (Doctor content-type)
                              │
                              ▼
              site-ci /doctors, booking (QMS + REST)
```

### Принципы

1. **Liveness ≠ readiness** — Coolify/Traefik смотрят только `/api/health/live`.
2. **SSOT** — `dataSources.ts` + `docs/SYNC_DOCTORS_SPEC.md` для полей врача.
3. **Anti-DDoS Beget** — `LEGACY_DB_QUERY_DELAY_MS`, `limit/offset`, один connection per source.
4. **Idempotent sync** — `mis_id` + `legacy_id` + safe-update полей в Strapi.
5. **Black box** — site-ci читает Strapi и REST; bridge не вызывается с фронта.

---

## План реализации (фазы)

### Фаза 0 — Сегодня (разблокировка Beget)

| # | Задача | Критерий готовности |
|---|--------|---------------------|
| 0.1 | Redeploy bridge, health `/api/health/live` | `curl bridge/.../health/live` → 200, Coolify healthy |
| 0.2 | `GET /api/legacy/diagnostics/mysql` (chel+spb) | `mysql.ok: true` для обоих или явная ошибка auth |
| 0.3 | Проверить env в Coolify: `SPB_DB_*`, `CHEL_DB_*`, префиксы | diagnostics `configured: true` |
| 0.4 | `POST /api/sync/chel/doctors` (dry-run → full) | отчёт: N created/updated в Strapi |
| 0.5 | `POST /api/sync/spb/doctors` после ok SPB | то же |
| 0.6 | site-ci: `/doctors` из Strapi | карточки с фото и mis_id |

### Фаза 1 — Слой доступа к данным (2–3 дня)

| # | Задача | Файлы |
|---|--------|-------|
| 1.1 | `LegacyMysqlGateway` — ping/query с таймаутом | `server/legacy/LegacyMysqlGateway.ts` |
| 1.2 | Перевести `db.ts`, `dbChel.ts` на gateway | удалить дубли createPool |
| 1.3 | Очередь: label + метрики (slow query) | `legacyDbQueue.ts` |
| 1.4 | `/api/health` — legacy checks async, не блокируют liveness | `routes/api.ts` |
| 1.5 | Вынести MODX-запросы из `api.ts` в `repositories/modx/*.ts` | декомпозиция god-file |

### Фаза 2 — Sync SSOT (2–3 дня)

| # | Задача |
|---|--------|
| 2.1 | Единый `DoctorCanonical` тип в `src/types.ts` bridge |
| 2.2 | `DoctorHydrator` — маппинг WP/MODX → canonical |
| 2.3 | `SyncOrchestrator.run({ entity, city, mode })` |
| 2.4 | Таблица `sync_runs` в bridge PG (история, rollback metadata) |
| 2.5 | Документ `SYNC_DOCTORS_SPEC.md` — единственный маппинг полей |

### Фаза 3 — Контент и новости (после врачей)

| # | Задача |
|---|--------|
| 3.1 | news/anonces/vakansii sync по тому же Orchestrator |
| 3.2 | Cron в Coolify: sync раз в сутки, не чаще |

---

## Решения (приняты без согласований)

| Вопрос | Решение |
|--------|---------|
| ЧЛБ врачи: MySQL или REST? | **REST `ci74.ru` для booking**; MySQL для полного sync в Strapi |
| СПб: прямой MySQL? | **Да**, через throttled pool |
| Один health endpoint? | **Нет**: `live` для оркестратора, `health` для мониторинга |
| Где SSOT врача для сайта? | **Strapi Doctor**; booking — QMS + REST enrich |
| Параллельные sync? | **Запрещены** — одна job на город, sequential queue |
| Лимит chunk | **25** записей (`LEGACY_DB_MAX_LIMIT`) |

---

## Проверка готовности плана к реализации

| Критерий | Статус |
|----------|--------|
| Спека полей врача | ✅ `docs/SYNC_DOCTORS_SPEC.md` |
| Strapi content-type Doctor | ✅ `apps/cms/src/api/doctor` |
| Sync workers существуют | ✅ chel/spb routes |
| Throttle / guard | ✅ `legacyDbGuard.ts` |
| Postgres sync_map | ✅ `bridgeDb.ts` |
| Gateway abstraction | ✅ `LegacyMysqlGateway.ts` + `dataSources.ts` |
| SyncOrchestrator + DoctorHydrator | ✅ фаза 2 |
| sync_runs в Postgres | ✅ `bridgeDb.ts` |
| api.ts декомпозиция | 🟡 doctors/services → repositories |
| Bridge на проде healthy | ✅ `/api/health/live` |

**Правки к плану:** фазу 1.4 (health) и 0.1 объединяем в немедленный hotfix; декомпозицию `api.ts` не блокируем на фазе 0.

---

## Команды после поднятия bridge

```bash
# Диагностика (Basic auth или Bearer)
curl -u admin:*** https://bridge.istochnik.smitx.ru/api/legacy/diagnostics/mysql

# Синк врачей Челябинск
curl -X POST -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  https://bridge.istochnik.smitx.ru/api/sync/chel/doctors

# Синк СПб
curl -X POST -H "Authorization: Bearer $BRIDGE_API_TOKEN" \
  https://bridge.istochnik.smitx.ru/api/sync/spb/doctors
```

---

## Риски

1. **Неверный пароль SPB** после разблокировки → diagnostics покажет `ER_ACCESS_DENIED`, не timeout.
2. **Повторная блокировка** при массовом sync → только chunk + delay, один connection.
3. **503 при full health** — не использовать для Coolify; только `live`.

---

## Связанные документы

- `docs/SYNC_DOCTORS_SPEC.md` — поля и политика safe-update
- `docs/SYNC_CHEL_SPEC.md` — Челябинск
- `docs/DEV_LEGACY_BRIDGE.md` — локальный запуск
- `modx_wp-to-strapi-migration-api/app/applet/CHEL_PLAN.md` — throttle правила Beget
