# Закрытие плана разработки (передача на приёмку)

> **Дата:** 2026-06-25  
> **Ветка:** `main`  
> **Следующий шаг:** владелец проходит UAT по [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md)

Разработка по волнам **1B–5 (фазы 0–2)** завершена. Дальше — только **ручная проверка** и фиксы по багам UAT.

---

## Что закрыто (код + прод)

| Волна | Код | На проде | UAT |
|-------|-----|----------|-----|
| 1A | ✅ | ✅ | ✅ |
| 1B | ✅ | ✅ | 🔍 часть 1 — **ваша проверка** |
| 2 | ✅ | ✅ | 🔍 часть 3 |
| 3 | ✅ | ✅ | 🔍 часть 4 |
| 4 | ✅ | ✅ | 🔍 часть 5 |
| 5 фазы 0–2 | ✅ | ✅ | 🔍 часть 6 |
| 5 фазы 3–9 | ⏸ отложено | — | см. backlog ниже |

**Автопроверка сейчас:** `npm run smoke:prod` → **8/8** (BFF skip на проде — норма).

**Прод URL:**

| Сервис | URL |
|--------|-----|
| Сайт | https://istochnik.smitx.ru |
| CMS | https://cms.istochnik.smitx.ru/admin |
| Studio | https://studio.istochnik.smitx.ru |

---

## Как проверять (порядок)

1. `npm run smoke:prod` — должно быть 8/8  
2. **Часть 1** UAT (1B) — главный сценарий publish без redeploy  
3. **Часть 3** → **4** → **5** → **6** по порядку  
4. После каждой части — **1B-F** booking (регрессия)

Команда фокуса: `npm run uat:focus`

---

## Известные ограничения (не баги UAT)

| Тема | Поведение | Когда исправим |
|------|-----------|----------------|
| Draft / lab / experiments в RAM | Теряются при **рестарте** контейнера site-ci | Wave 5 фаза 3 |
| Auth Studio | Shared secret (`STUDIO_API_SECRET`), не логин | Wave 5 фаза 5 |
| UTM rules | JSON на BFF, не Strapi | Wave 5 фаза 7 |
| Zustand в Studio | Работает, не React Query | Wave 5 фаза 8 |
| iframe preview | Встроенный PageRenderer | Wave 5 фаза 9 (опц.) |

---

## Backlog (Wave 5 фазы 3–9) — после UAT

| Фаза | Задача |
|------|--------|
| 3 | Experiments + Lab → Strapi (убрать RAM) |
| 4 | ✅ AI layout через BFF в Studio (`aiService`); осталось убрать legacy `/api/generate*` |
| 5 | Strapi Users + роли integrator/director |
| 6 | Удалить legacy Vite CC с `src/App.tsx` |
| 7 | MarketingRule в Strapi + GlobalLayout на web |
| 8 | React Query вместо Zustand SSOT |
| 9 | iframe preview с `draftToken` |

---

## Деплой и инфра

- Guardrails: [`DEPLOY_FAILURE_CLASSES.md`](../DEPLOY_FAILURE_CLASSES.md), `npm run preflight:deploy`
- Цикл: `ci:platform` → `git push main` → Coolify → `smoke:prod`
- **Не** деплоить три приложения параллельно без нужды (класс F — contention на сборке)

---

## Критерий «план принят»

- [ ] UAT часть 1 P0 (1B-D14–D15 publish)  
- [ ] UAT части 3–6 P0 по волнам 2–5  
- [ ] Booking 1B-F после релиза  
- [ ] Нет блокеров P0 в трекерах волн  

После галочек — волны 1B–4 считаем **принятыми**, Wave 5 фазы 0–2 — **принятыми**.
