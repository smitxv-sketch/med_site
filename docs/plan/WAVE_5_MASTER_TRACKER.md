# Wave 5 — Полный перенос Command Center

> Мастер-план: полный перенос CC (Wave 5)  
> UAT: [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md) часть 6  
> **Закрытие разработки:** [`PLAN_CLOSURE.md`](./PLAN_CLOSURE.md)

**Платформа Studio:** Next (client-heavy), Vite SPA не планируем.

---

## Фазы и статус

| Фаза | Задача | Статус |
|------|--------|--------|
| 0 | Деплой Wave 2–4, UAT 1B, AnalyticsTab | ✅ код+деплой · 🔍 UAT |
| 1 | Draft: pageSeo, brandVoice, pageTitle | ✅ |
| 2 | Presets → Strapi CRUD | ✅ |
| 3 | Experiments + Lab → Strapi | ⏸ backlog |
| 4 | Единый AI через BFF | ✅ Studio (`aiService` → `/api/studio/ai/layout`) |
| 5 | Strapi Users auth + роли | ⏸ backlog |
| 6 | Deprecate legacy Vite CC | ⏸ backlog |
| 7 | GlobalLayout + MarketingRule | ⏸ backlog |
| 8 | React Query вместо Zustand SSOT | ⏸ backlog |
| 9 | iframe preview (опц.) | ⏸ backlog |

---

## Фаза 1 — что сделано (2026-06-25)

- `StudioDraftDto`: `pageTitle`, `pageSeo`, `brandVoice` (`packages/contracts` v1.4.0)
- Strapi `GlobalSettings.brandVoice`
- BFF: read/write в draft overlay + publish в Strapi
- Studio: `draftPickers.ts`, bridge hydrate/autosave
- `cmsStore`: autosave при смене SEO / Tone of Voice
- Fix: `StudioWorkspace` → `onPublish` (кнопка «Опубликовать»)
- AnalyticsTab в меню CC

---

## Фаза 2 — что сделано (2026-06-25)

- `presetStrapiService.ts`: list/create/update/delete → Strapi `DesignPreset`
- BFF: `GET/POST/PUT/DELETE /studio/presets/:slug`
- Удалён `presetOverlayService` (RAM overlay)
- Studio API: `PUT/DELETE /api/studio/presets/[slug]`
- `uiSettingsStore`: save/update/delete → Strapi через BFF

---

## Фаза 4 — что сделано (2026-06-25)

- `aiService.generateLayout` в Studio → `/api/studio/ai/layout` (BFF)
- `AiContentTab`, `AiCommandModal`, `LaboratoryTab` — единый маршрут в Studio

---

## DoD (общий)

- `npm run ci:platform` + `npm run smoke:prod` ✅
- UAT часть 6 P0 — **владелец**
- Нет `/api/generate*` в Network Studio ✅
- Login Studio обязателен — после фазы 5 (backlog)

---

## Следующий шаг

1. **Владелец:** UAT по [`PLAN_CLOSURE.md`](./PLAN_CLOSURE.md)  
2. **После UAT:** фаза 3 (Experiments/Lab → Strapi) или фаза 5 (auth)
