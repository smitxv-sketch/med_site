# Wave 5 — Полный перенос Command Center

> Мастер-план: полный перенос CC (Wave 5)  
> UAT: [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md) часть 6

**Платформа Studio:** Next (client-heavy), Vite SPA не планируем.

---

## Фазы и статус

| Фаза | Задача | Статус |
|------|--------|--------|
| 0 | Деплой Wave 2–4, UAT 1B, AnalyticsTab | ⏳ частично (код) |
| 1 | Draft: pageSeo, brandVoice, pageTitle | ✅ код |
| 2 | Presets → Strapi CRUD | ☐ |
| 3 | Experiments + Lab → Strapi | ☐ |
| 4 | Единый AI через BFF | ☐ |
| 5 | Strapi Users auth + роли | ☐ |
| 6 | Deprecate legacy Vite CC | ☐ |
| 7 | GlobalLayout + MarketingRule | ☐ |
| 8 | React Query вместо Zustand SSOT | ☐ |
| 9 | iframe preview (опц.) | ☐ |

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

## DoD (общий)

- `npm run ci:platform` + `npm run smoke:prod`
- UAT часть 6 P0 зелёные
- Нет `/api/generate*` в Network Studio
- Login Studio обязателен (после фазы 5)

---

## Следующий шаг

**Фаза 2:** `POST/PUT/DELETE /studio/presets` → Strapi `DesignPreset`, убрать `presetOverlayService` RAM.
