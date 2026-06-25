# Wave 3 — трекер: Эксперименты и AI-эволюция

> **UAT:** [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md) часть 4  
> **Мастер-план:** [`STUDIO_WAVE_MASTER_PLAN.md`](./STUDIO_WAVE_MASTER_PLAN.md) §4.4, Wave 3

**Статус:** код ✅ · деплой ✅ · UAT 🔍 **готово к вашей проверке** ([`PLAN_CLOSURE.md`](./PLAN_CLOSURE.md))

---

## Фичи

| # | Фича | Код | UAT |
|---|------|-----|-----|
| 3-1 | **Experiment entity** | ✅ in-memory BFF store | 3-UAT-1 |
| 3-2 | **Запуск / метрики** | ✅ `POST …/start`, `POST /api/experiments/:id/track` | 3-UAT-2 |
| 3-3 | **Evolution worker (suggest)** | ✅ rule-based + OpenRouter insights | 3-UAT-3 |
| 3-4 | **Human-in-the-loop apply** | ✅ `POST …/apply` → draft only | 3-UAT-4 |
| 3-5 | **EvolutionTab UI** | ✅ Studio вкладка «Эволюция» | 3-UAT-5 |

---

## API

| Method | Path | Auth | Назначение |
|--------|------|------|------------|
| GET | `/studio/experiments` | Bearer | Список |
| POST | `/studio/experiments` | Bearer | Создать |
| POST | `/studio/experiments/:id/start` | Bearer | Статус → running |
| GET | `/studio/experiments/:id/suggest` | Bearer | AI + rule suggestion |
| POST | `/studio/experiments/:id/apply` | Bearer | Победитель → draft (не publish) |
| POST | `/api/experiments/:id/track` | нет | Показ / конверсия с сайта |

**Важно:** `apply` **не** публикует на прод — только PATCH draft. Publish вручную в Studio.

---

## Env

| Переменная | Где |
|------------|-----|
| `OPENROUTER_API_KEY` | site-ci (опционально, для AI insights) |
| `STUDIO_API_SECRET` | site-ci + studio |

---

## После деплоя

1. Smoke 8/8 ✅  
2. **UAT часть 4 (Wave 3)** — владелец  
3. Регрессия 1B-F + Wave 2 P0  
