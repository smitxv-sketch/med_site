# Handoff: услуги и прайс (новый чат)

**Дата:** 2026-07-02  
**Предусловие:** пилот «врачи» завершён (ЧЛБ 68, СПб 53 в Strapi).  
**Общий план:** [`docs/SYNC_ONTOLOGY_PLAN.md`](./SYNC_ONTOLOGY_PLAN.md) — обязательно прочитать перед проектированием.

---

## Промпт для нового чата (скопировать целиком)

```
Тема: услуги и цены — проектирование модели Strapi + маппинг + синк (ЧЛБ + СПб).

1. Прочитай:
   - docs/WHERE_WE_ARE.md (текущий статус)
   - docs/SYNC_ONTOLOGY_PLAN.md (общий план: модель → маппинг → синк)
   - docs/HANDOFF_SERVICES_PRICES.md (этот handoff)
   - docs/mappings/qms-sections-inventory.md (разделы getPr)
   - docs/SYNC_DOCTORS_SPEC.md (опыт пилота врачей — те же правила)

2. ОБЯЗАТЕЛЬНО сначала исследуй данные (не пиши код сразу):
   - QMS: scripts/qms-fetch-pricelist.mjs и/или GET bridge /api/qms/pricelist?city=chel|spb
   - ЧЛБ legacy: bridge GET /api/chel/services (throttle!), wp структура в docs/wp_database_structure.md
   - СПб legacy: MODX services (templates 6, 32), pricelist_items2 — modx_wp-to-strapi-migration-api
   - Strapi: есть ли уже content-type Service / Price — apps/cms

3. Задай мне вопросы в режиме КВИЗА (AskQuestion / варианты кнопками, не стена текста).
   Минимум 5–8 вопросов по блокам ниже. Не начинай схему Strapi, пока нет ответов на ключевые.

4. После квиза — предложи:
   - ER / поля Strapi (Service, PriceItem, Category — что нужно)
   - JSON-маппинги в docs/mappings/
   - порядок синка (справочники → услуги → цены → relations)
   - эндпоинты bridge POST /api/sync/...

5. Правила проекта:
   - НЕ трогать /src/widget и бэкенд записи
   - НЕ писать в MODX/WP — маппинг только JSON при синке
   - QMS getPr = SSOT цены (row.Duv, section.val); legacy = текст/SEO/картинки
   - Beget: chunk, delay, один SQL-поток
   - Деплой: npm run ci:platform перед push

Начни с исследования данных и первого квиза (блок «Источник истины»).
```

---

## Опыт пилота «врачи» — перенести на услуги

| Принцип | Как было у врачей | Как применить к услугам/ценам |
|---------|-------------------|-------------------------------|
| SSOT на сайте | Strapi Doctor | Strapi Service + PriceItem (или вложенный компонент) |
| Цена из МИС | — | **QMS getPr** (`Duv`, `section.val`, цена, название) |
| Текст/SEO из legacy | WP REST / MODX TV | WP post / MODX resource + TV |
| Связь МИС ↔ legacy | JSON `spb-doctor-qms-map` (ФИО) | JSON по `Duv` / slug / ручной review |
| Нет матча в МИС | `spb-legacy-{id}`, booking off | `legacy-only`, без цены или «по запросу» |
| Синк без legacy поля | Не ждать qms_id в MODX | Не ждать правок в админке MODX |
| Прокси QMS | getPr через site proxy | Тот же; ключ прайса ≠ ключ записи |
| Safe-update | SAFE_DOCTOR_FIELDS | Отдельный список для цены vs описания |
| Import-once | bio, education | Длинные описания услуг, показания, подготовка |

---

## Блоки вопросов для квиза (агент: задавать по одному блоку)

Агент должен **сам сформулировать варианты** после просмотра данных. Ниже — темы, не готовые ответы.

### Блок A — Источник истины

- Что главнее для **цены на сайте**: только QMS getPr или legacy MODX/WP тоже может переопределять?
- Одна позиция прайса = одна страница услуги или группировка (программа / пакет)?
- ЧЛБ: две организации QMS (основная + ЭКО) — одна витрина или раздельные разделы?

### Блок B — Модель Strapi

- Отдельный content-type **PriceItem** или цена полями внутри **Service**?
- **Service Category** = `section.val` из QMS, legacy рубрика MODX, или гибрид (маппинг JSON)?
- Locale: `ru-chel` / `ru-spb` как у врачей?

### Блок C — Legacy контент

- СПб: синкать только template 6/32 или ещё программы (template из инвентаря)?
- ЧЛБ: услуги только из REST или ещё MySQL (риск Beget)?
- Что делать с услугами **только в прайсе** (нет страницы в MODX/WP)?

### Блок D — Связи

- Service ↔ Doctor (many) — нужно сразу или фаза 2?
- Service ↔ Branch — ЭКО/косметология как у врачей (алиасы филиала)?
- Service ↔ Specialty — из SSOT `specialty-ssot.json`?

### Блок E — Синк и UX

- Обновлять цены автоматически (cron) или только ручной POST sync?
- Показывать старую цену / скидку из QMS?
- Страница `/prices` — один каталог или `/chel/prices` + `/spb/prices`?

### Блок F — Блокеры инфраструктуры

- Подтвердить: прайс СПб через `QMS_SPB_SITE_PROXY_URL` (cispb) OK, booking — отдельно.
- Нужен ли офлайн dump прайса в git для diff (как `qms-sections-inventory`)?

---

## Уже есть в репозитории (не изобретать заново)

| Что | Где |
|-----|-----|
| Снимок разделов getPr | `docs/mappings/qms-sections-inventory.md` |
| Fetch прайса | `scripts/qms-fetch-pricelist.mjs` |
| Bridge pricelist | `GET /api/qms/pricelist?city=chel\|spb` |
| Bridge sync prices (черновик) | `POST /api/qms/sync/prices?city=` |
| Нормализация QMS | `server/services/qms/qmsPriceNormalizer.ts`, `compareQmsPrices.ts` |
| Черновик Strapi entities | `docs/strapi-architecture/03-content-model-entities.md` |
| СПб MODX services | `modx_wp-to-strapi-migration-api/server/repositories/modx/servicesRepository.ts` |
| ЧЛБ services REST | `modx_wp-to-strapi-migration-api/server/services/wpService.js` → `getChelServices` |

---

## Предлагаемый порядок работ (после квиза)

1. **Аудит** — таблица: legacy id, название, Duv, section.val, есть ли страница.
2. **Модель** — схемы Strapi + `packages/contracts`.
3. **Маппинг** — `docs/mappings/chel-service-qms-map.json`, `spb-service-qms-map.json`, `qms-section-to-category.json`.
4. **Hydrator + Orchestrator** — по образцу `DoctorHydrator.ts`.
5. **Пилот синк** — один раздел (например «КОНСУЛЬТАТИВНЫЙ ПРИЕМ») ЧЛБ + СПб.
6. **Страница /prices** — read Strapi через BFF (не дублировать QMS на фронте).

---

## Критерии готовности фазы

- [ ] Квиз пройден, решения зафиксированы в `docs/SYNC_SERVICES_SPEC.md` (создать после квиза)
- [ ] Strapi content-types задеплоены
- [ ] Синк ≥1 раздела на город без ручного вмешательства в legacy
- [ ] BFF отдаёт каталог услуг/цен для tenant chel/spb
- [ ] `npm run smoke:prod` зелёный

---

## Связанные handoff-файлы

| Файл | Когда |
|------|-------|
| `docs/WHERE_WE_ARE.md` | Любой «где мы» |
| `docs/SYNC_ONTOLOGY_PLAN.md` | Архитектура синка |
| `docs/SYNC_DOCTORS_SPEC.md` | Образец safe-update / import-once |
| `docs/DEV_LEGACY_BRIDGE.md` | Beget, throttle, MCP bridge |
