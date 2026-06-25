# Wave 2 — трекер разработки

> **UAT:** [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md) часть 3  
> **Мастер-план:** [`STUDIO_WAVE_MASTER_PLAN.md`](./STUDIO_WAVE_MASTER_PLAN.md) §7 недели 5–6

**Статус:** код ✅ · деплой ✅ · UAT 🔍 **готово к вашей проверке** ([`PLAN_CLOSURE.md`](./PLAN_CLOSURE.md))

---

## Очередь фич

| # | Фича | Код | Деплой | UAT |
|---|------|-----|--------|-----|
| 2-1 | **UTM rules в BFF** | ✅ `marketingRules.json` + `/api/site-theme?utm_*` | ✅ | 2-UAT-1 |
| 2-2 | **Лаборатория → draft** | ✅ `POST/GET /studio/lab`, slug `lab-*` | ✅ | 2-UAT-2 |
| 2-3 | **AnalyticsTab** | ✅ `EventDelegator` в StudioShell | ✅ | 2-UAT-3 |
| 2-4 | **AI layout** | ✅ `POST /studio/ai/layout` (OpenRouter или mock) | ✅ | 2-UAT-4 |
| 2-5 | **Block-level A/B** | ✅ `abVariants` + `applyBlockAbTests` на GET page | ✅ | 2-UAT-5 |

---

## API (BFF)

| Method | Path | Auth | Назначение |
|--------|------|------|------------|
| GET | `/api/marketing-context?utm_*` | нет | Отладка сработавшего правила |
| GET | `/api/site-theme?utm_*` | нет | Тема + UTM overrides |
| GET | `/api/pages/:slug?ab_seed=&ab=` | нет | Страница + A/B варианты |
| POST | `/studio/ai/layout` | Bearer | AI раскладка блоков |
| GET | `/studio/lab` | Bearer | Список lab-страниц |
| POST | `/studio/lab` | Bearer | Создать `lab-{id}` |

**Правила UTM:** `apps/bff/src/config/marketingRules.json` (SSOT, не хардкод в TS).

**Лаборатория:** публичный сайт отдаёт **404** для `lab-*`; publish для lab заблокирован (400).

**AI:** нужен `OPENROUTER_API_KEY` на **site-ci**; без ключа — mock-блоки.

---

## Env (прод)

| Переменная | Где | Зачем Wave 2 |
|------------|-----|----------------|
| `OPENROUTER_API_KEY` | site-ci | AI layout (опционально) |
| `OPENROUTER_MODEL` | site-ci | Модель OpenRouter |
| `NEXT_PUBLIC_APP_TARGET=studio` | studio-istochnik | Режим LaboratoryTab |

---

## После деплоя

1. ~~`npm run smoke:prod` — 8/8~~ ✅  
2. **Пройти UAT часть 3** по порядку 2-1 → 2-5 — **владелец**  
3. Регрессия 1B-F (booking) после каждого релиза  

---

## Не в Wave 2 (Wave 3)

- `Experiment` entity + evolution worker  
- AI suggestions по метрикам  
