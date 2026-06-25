# Wave 4 — Билдер и inline-edit

> **Мастер-план:** [`STUDIO_WAVE_MASTER_PLAN.md`](./STUDIO_WAVE_MASTER_PLAN.md) неделя 4  
> **UAT:** [`UAT_MASTER_PLAN.md`](../UAT_MASTER_PLAN.md) часть 5

**Статус:** код ✅ · деплой ✅ · UAT 🔍 **готово к вашей проверке** ([`PLAN_CLOSURE.md`](./PLAN_CLOSURE.md))

---

## Цель

Студия должна позволять **редактировать блоки прямо в preview** и **сохранять кастомные пресеты** на BFF (не только в RAM браузера).

---

## Чеклист разработки

| # | Задача | Статус | Файлы |
|---|--------|--------|-------|
| 4.1 | `StudioPreview` → `onUpdateBlocks` + `forceDevMode` | ✅ | `apps/studio/app/components/StudioPreview.tsx` |
| 4.2 | Inline-edit через `PageRenderer` / `WidgetEditorWrapper` | ✅ | `src/shared/ui/PageRenderer.tsx` |
| 4.3 | Autosave блоков через draft bridge | ✅ | `useStudioDraftBridge.ts` (уже было) |
| 4.4 | `POST /studio/presets` → Strapi | ✅ | `presetStrapiService.ts`, `routes/studio.ts` |
| 4.5 | Studio API presets CRUD | ✅ | `apps/studio/app/api/studio/presets/` |
| 4.6 | `saveCustomPreset` → BFF/Strapi | ✅ | `uiSettingsStore.ts` |
| 4.7 | Hydrate кастомных пресетов при старте | ✅ | `useStudioDraftBridge.ts` + `presetMapper.ts` |
| 4.8 | `GET /studio/presets` system + custom | ✅ | `presetStrapiService.ts` |
| 4.9 | UAT часть 5 (чеклист) | ✅ | `UAT_MASTER_PLAN.md` |
| 4.10 | Деплой + ручной UAT | ✅ деплой · 🔍 UAT | push → Coolify |

---

## Не в этой волне (Wave 5+)

- ~~`PUT /studio/presets/:id`~~ — ✅ Wave 5 фаза 2  
- ~~Persist пресетов в Strapi~~ — ✅ Wave 5 фаза 2  
- iframe preview на прод с `draftToken` (сейчас встроенный `PageRenderer`) — фаза 9

---

## Env

Без новых переменных. Те же, что Wave 1B:

- `STUDIO_API_SECRET` (site-ci + studio)
- `STRAPI_API_TOKEN` (system presets из Strapi)

---

## Smoke / автопроверки

```bash
npm run smoke:prod
npm run uat:focus
```

Опционально Wave 2+:

```bash
npm run smoke:prod -- --wave2
```

---

## Риски

| Риск | Митигация |
|------|-----------|
| Кастомные пресеты при рестарте BFF | ✅ в Strapi с Wave 5 фаза 2 |
| Inline-edit ломает вёрстку | `PageRenderer` только opacity/transform; тест 5-UAT-2 |
| Дубли id пресетов | slug из timestamp, merge по slug |
