# Аудит полей услуг: ЧЛБ + СПб (2026-07-02)

**Задача:** выяснить **все** свойства, атрибуты и контент на legacy-услугах и сравнить с [`SYNC_SERVICES_SPEC.md`](./SYNC_SERVICES_SPEC.md).  
Принцип: **лучше забрать лишнее, чем пропустить**.

**Машиночитаемые отчёты:**

| Файл | Что внутри |
|------|------------|
| [`docs/mappings/chel-services-fields-audit.json`](./mappings/chel-services-fields-audit.json) | 1345 опубликованных постов `services` |
| [`docs/mappings/chel-directions-termmeta-audit.json`](./mappings/chel-directions-termmeta-audit.json) | 587 терминов рубрик `directions` |
| [`docs/mappings/spb-services-fields-audit.json`](./mappings/spb-services-fields-audit.json) | 110 MODX-страниц (templates 6, 32) + TV |
| [`docs/mappings/spb-pricelist-fields-audit.json`](./mappings/spb-pricelist-fields-audit.json) | 1858 строк `pricelist_items2` |

**Скрипты повторного запуска:**

```bash
cd modx_wp-to-strapi-migration-api
npx tsx scripts/analyze-chel-services-fields.mjs
npx tsx scripts/analyze-spb-services-fields.mjs
```

---

## Главные выводы

### Челябинск

1. **Контент услуги почти никогда не в `post_content`** — поле пустое у **100%** постов. Тексты живут в **meta поста** (редко) или в **termmeta рубрики** `directions` (часто).
2. **Прайс-строка** — это пост `services` с meta: `article`, `price`, `enabled`, `ord`. Это совпадает со spec.
3. **Рубрика** — главный носитель SEO и лендинга: у **540/587** терминов есть meta; у **206** — реальный `doctor_id`; у **141** — текст `text`.
4. **Пропущено в spec:** `dextra_id` / `dextra_category_id` (69% услуг), флаги `faqs_view` / `reviews_view` (≈48% услуг), блоки комплексов `text_list` / `text_welcome`, баннеры/преимущества на рубрике, `clinics`, `phone`, `message_type`.

### Санкт-Петербург

1. **Два слоя:** плоская таблица **`pricelist_items2`** (цены на витрине) + **MODX-страницы** (templates 6, 32) с богатыми TV.
2. **Прайс-таблица** — 16 колонок; ключевые: `doc_id` (артикул), `name`, `price`, `tab`, `category`, `published`, `resource_id`.
3. **MODX-страница услуги** — 50 разных TV: описания, FAQ (MIGX), вложенный прайс (`uslugiPrice`), состав комплекса (`json_data`), блоки текста, картинки.
4. **Пропущено в spec:** FAQ (`faq_services`), MIGX-прайс на странице (`uslugiPrice`, `json_data`), UI-флаги (`showPrice`, `showDoc`), вторичные блоки (`first_block_*`, `equipment_list`, `blogBlocks`), поля `name2`, `links`, `sorts` в прайсе.

---

## Челябинск — пост `services` (1345 publish)

### Поля самого поста (wp_posts)

| Поле | Заполнено | В spec? | Куда в Strapi |
|------|-----------|---------|---------------|
| `post_title` | 100% | ✅ | `Service.title` (fallback до QMS) |
| `post_name` | 100% | ✅ | `Service.slug` (если `item_view=1`) |
| `post_content` | **0%** | — | **Не использовать** |
| `post_excerpt` | **0%** | — | **Не использовать** |

### Meta поста (wp_postmeta) — контентные ключи

| Поле | Заполнено | Тип данных | В spec? | Рекомендация Strapi |
|------|-----------|------------|---------|---------------------|
| `article` | **99%** | артикул QMS | ✅ | `Service.article` |
| `price` | **100%** | число/строка | ✅ | `Service.price` (до QMS) |
| `enabled` | **97%** | 0/1 | ✅ | `Service.published` |
| `ord` | **79%** | сортировка | ⚠️ частично | `Service.sortOrder` |
| `dextra_id` | **69%** | ID Dextra/QMS | ❌ | `Service.legacyDextraId` (отладка/маппинг) |
| `dextra_category_id` | **69%** | ID категории | ❌ | `Service.legacyDextraCategoryId` |
| `faqs_view` | **48%** | 0/1 | ❌ | `Service.showFaqs` |
| `reviews_view` | **47%** | 0/1 | ❌ | `Service.showReviews` |
| `text` | **5%** | HTML, до 4468 симв. | ⚠️ | `Service.description` (import-once) |
| `doctor_id` | **3%** | wp_user/post ID | ⚠️ только на category | `Service.featuredDoctor` (редко) |
| `item_view` | **3%** (~40 постов) | 0/1 | ✅ | `Service.hasDetailPage` |
| `text_list` | **2%** | HTML список | ❌ | компонент `includedServices` / rich list |
| `text_list_header` | **2%** | заголовок | ❌ | `Service.includedListTitle` |
| `text_welcome` | **2%** | intro | ❌ | `Service.intro` |
| `text_header` | **0%** | — | ❌ | опционально |
| `about_header` | **0%** | 3 поста | ❌ | только на тех 3 страницах |
| `about_text` | **0%** | 3 поста | ❌ | только на тех 3 страницах |
| `about_video` | **0%** | 3 поста | ❌ | `Service.aboutVideo` |
| `seo_title` | **0%** на посте | — | ⚠️ | SEO на рубрике, не на посте |
| `seo_description` | **0%** на посте | — | ⚠️ | то же |
| `telemedecine` | **1%** | флаг | ❌ | `Service.isTelemedicine` |
| `vcvSourceCssFileUrl` | **1%** | служебное | ❌ | не импортировать |

### Таксономии

| Taxonomy | Связей пост↔term | Уник. терминов | В spec? |
|----------|------------------|----------------|---------|
| `directions` | 2017 | 188 | ✅ `ServiceCategory` |

У одной услуги может быть **несколько** направлений — в spec: **`Service.categories` many-to-many** (все term `directions` поста).

---

## Челябинск — рубрика `directions` (587 терминов, wp_termmeta)

| Поле | Заполнено | В spec? | Рекомендация Strapi |
|------|-----------|---------|---------------------|
| `doctor_id` | **35%** (206) | ✅ | `ServiceCategory.featuredDoctor` |
| `text` | **24%** (141) | ✅ | `ServiceCategory.expertIntro` |
| `about_header` | **20%** | ✅ | `ServiceCategory.aboutHeader` |
| `about_text` | **20%** | ✅ | `ServiceCategory.aboutText` |
| `about_video` | **20%** | ✅ | `ServiceCategory.aboutVideo` |
| `seo_title` | **18%** | ✅ | `ServiceCategory.seoTitle` |
| `seo_description` | **17%** | ✅ | `ServiceCategory.seoDescription` |
| `enabled` | **28%** | ✅ | `ServiceCategory.enabled` |
| `enabled_menu` | **18%** | ❌ | `ServiceCategory.showInMenu` |
| `ord` | **28%** | ✅ | `ServiceCategory.sortOrder` |
| `reviews_view` | **35%** | ❌ | `ServiceCategory.showReviews` |
| `faqs_view` | **14%** | ❌ | `ServiceCategory.showFaqs` |
| `clinics` | **16%** | ❌ | relation → `Branch[]` |
| `banner_list` | **11%** | ❌ | компонент `BannerList` (MIGX-подобное) |
| `text_middle` | **9%** | ❌ | `ServiceCategory.bodyMiddle` (richtext) |
| `phone` | **5%** | ❌ | `ServiceCategory.phone` |
| `advantages` | **2%** | ❌ | компонент `Advantage[]` |
| `seo_text` | **2%** | ❌ | `ServiceCategory.seoText` |
| `anonce` / `anonces` | 1–2% | ❌ | краткий анонс рубрики |
| `articles` | **1%** | ❌ | relation → `News[]` (фаза 2) |
| `banner_header` | **1%** | ❌ | заголовок баннера |
| `interface_class` | **92%** | ❌ | CSS-класс темы → config mapping |
| `message_type` | **36%** | ❌ | тип формы (`callorder`) → config |
| `full_width` | **0%** | ❌ | layout flag |

---

## Санкт-Петербург — `pricelist_items2` (1858 строк)

| Колонка | Заполнено | В spec? | Рекомендация |
|---------|-----------|---------|--------------|
| `doc_id` | **90%** | ✅ | `Service.article` |
| `name` | **100%** | ✅ | fallback `title` |
| `price` | **100%** | ✅ | `Service.price` |
| `tab` | **100%** | ✅ | `tabLegacy` / `tabQms` |
| `category` | **100%** | ✅ | `ServiceCategory` |
| `published` | **73%** | ✅ | `Service.published` |
| `resource_id` | **96%** | ⚠️ | связь с MODX-страницей |
| `id` | **96%** | ✅ | `legacyId` строки прайса |
| `sorts` | **56%** | ❌ | `Service.sortOrder` |
| `createdon` | **55%** | ❌ | метаданные синка |
| `links` | **3%** | ❌ | `Service.externalLink` (редко) |
| `name2` | **0%** | — | не используется |
| `deleted` | **5%** | ❌ | фильтр при импорте |
| `newid`, `university`, `mod_user` | служебные | ❌ | не импортировать |

**Важно:** в таблице **1858** строк, но только **~650** «живых» в старом аудите — разница из‑за `deleted`, дублей и неопубликованных. При синке фильтровать: `deleted=0` + логика `published`.

---

## Санкт-Петербург — MODX страницы услуг (templates 6, 32)

**110** ресурсов (106 published). Контент в TV, не в `content` (как у ЧЛБ).

### TV с высокой заполненностью

| TV (MODX) | Заполнено | Содержимое | В spec? | Рекомендация |
|-----------|-----------|------------|---------|--------------|
| `des` | **99%** | HTML описание | ⚠️ | `Service.description` / category intro |
| `title` | **99%** | SEO title | ⚠️ | `seoTitle` |
| `minText` | **92%** | краткий текст | ❌ | `Service.summary` |
| `json_data` | **81%** | JSON состав комплекса | ❌ | `includedServices[]` |
| `showPrice` | **73%** | флаг UI | ❌ | `Service.showPriceOnPage` |
| `showDoc` | **72%** | показ врача | ❌ | `Service.showDoctorBlock` |
| `uslugiPrice` | **72%** | MIGX: имя+цена | ❌ | дубль прайса на странице → `pagePriceItems[]` или ignore |
| `button_txt` | **59%** | текст кнопки | ❌ | config / `Service.ctaLabel` |
| `dropdown-text-before/after` | **55%** | UI тексты | ❌ | import-once в description blocks |
| `uslugPre` | **53%** | префикс | ❌ | editorial |
| `faq_services` | **51%** | MIGX FAQ | ❌ | компонент `FaqItem[]` |
| `first_block_title/text` | **45%** | блоки | ❌ | `Service.contentBlocks[]` |
| `second_block_title/text` | **45%** | блоки | ❌ | то же |
| `img` | **44%** | изображение | ❌ | `Service.coverImage` |
| `blogBlocks` | **42%** | контент-блоки | ❌ | фаза 2 / Page blocks |
| `equipment_list` | **26%** | оборудование | ❌ | компонент `EquipmentItem[]` |
| `docImg`, `docName`, `docIntrotext`, `docText` | **25%** | блок врача на странице | ⚠️ | `featuredDoctor` + overrides |
| `price` | **13%** | цена в TV | ⚠️ | не SSOT — getPr важнее |
| `spoiler_services` | **5%** | спойлер список | ❌ | UI block |
| `rev` | **1%** | отзывы на странице | ❌ | фаза 2 |

### Программы (template 12)

В текущем срезе БД: **0** ресурсов с `deleted=0`. В старом аудите было **33** — вероятно `deleted=1` или другой фильтр. **Нужен отдельный probe** с `deleted IN (0,1)` перед синком программ.

---

## Матрица: spec vs реальность

| Область | В spec | Пропущено (добавить) |
|---------|--------|----------------------|
| ЧЛБ прайс-строка | article, price, enabled | ord, dextra_*, faqs/reviews flags |
| ЧЛБ страница услуги | item_view, description | text_list*, text_welcome, telemedecine |
| ЧЛБ рубрика | doctor, text, about, seo | banner_*, advantages, clinics, phone, text_middle, seo_text, faqs/reviews, enabled_menu |
| СПб прайс | doc_id, name, price, tab, category | sorts, links, resource_id, deleted filter |
| СПб страница | des (частично) | json_data, uslugiPrice, faq_services, blocks, img, doc* TV, show* flags |
| Общее | ~~1 category~~ | ✅ **many-to-many** `categories[]` (ЧЛБ + СПб) |

---

## Рекомендации по доработке spec (приоритет)

### P0 — забрать при первом синке

- `ord` / `sorts` — сортировка в списках
- `faqs_view`, `reviews_view` — флаги блоков на услуге и рубрике
- `dextra_id`, `dextra_category_id` — для отладки маппинга QMS
- `resource_id` (СПб) — связь прайс ↔ MODX-страница
- `json_data`, `text_list` — состав комплексных программ → `includedServices[]`

### P1 — контент рубрики ЧЛБ

- `banner_list`, `advantages`, `text_middle`, `seo_text`, `clinics`, `phone`
- `enabled_menu`, `message_type`, `interface_class` (последние два — в config, не в Strapi)

### P1 — контент страницы СПб

- `faq_services` → компонент FAQ
- `minText`, `first_block_*`, `second_block_*`, `equipment_list`
- `docImg` / `docName` / … → через `featuredDoctor` или override на category

### P2 — не тащить в Strapi

- `vcvSourceCssFileUrl`, `mod_user`, `university`, ACF-ключи с `_`
- `uslugiPrice` на MODX — если есть `doc_id` в `pricelist_items2` (дедупликация)

---

## Баги bridge (найдены при аудите)

| Проблема | Где |
|----------|-----|
| `explore /chel/services` использует post_type **`service`** (единственное) | `explore.ts` — реальный тип **`services`** |
| `getChelServices` отбрасывает meta с `_` | теряются ACF field keys при отладке — для синка ОК, для аудита использовать полный meta |

---

## Следующие шаги

1. Обновить [`SYNC_SERVICES_SPEC.md`](./SYNC_SERVICES_SPEC.md) полями из матрицы P0–P1.
2. Probe sample: 5 услуг с `item_view=1` (ЧЛБ) и 5 MODX-страниц с `json_data` (СПб) — сохранить в `docs/mappings/*-samples.json`.
3. Отдельный probe template **12** (программы СПб) без фильтра `deleted`.
4. ~~Решить many directions~~ — **решено:** many-to-many `Service.categories`.

---

## Покрытие исследования (чеклист)

| Область | Статус | Артефакт |
|---------|--------|----------|
| ЧЛБ meta поста `services` (1345) | ✅ 100% ключей | `chel-services-fields-audit.json` |
| ЧЛБ termmeta `directions` (587) | ✅ | `chel-directions-termmeta-audit.json` |
| ЧЛБ связи directions/post | ✅ | `chel-services-relations-audit.json` |
| ЧЛБ FAQ `vopros_otvet` (3850) | ⚠️ частично | `chel-faq-reviews-probe.json` — нужен полный meta-аудит |
| ЧЛБ отзывы `otzivi` (1556) | ⚠️ | привязка в основном к `doctor_id`, не к услуге |
| СПб `pricelist_items2` | ✅ | `spb-pricelist-fields-audit.json` |
| СПб MODX 6+32 TV | ✅ 50 TV | `spb-services-fields-audit.json` |
| СПб связи doc_id↔category↔resource | ✅ | `spb-services-relations-audit.json` |
| СПб программы + MIGX deep | ✅ | `spb-services-deep-audit.json` |
| СПб программы template **12** | ✅ | 33 ресурса; TV `priceProgramm`, `descriptionProgramm`, `spoiler*` |
| ACF JSON в репо | ⚠️ | `acf-export` — только группа **врачей**, не `services` / `directions` |
| Врач ↔ услуга (ACF `services` на doctor) | 📋 фаза 2 | есть в ACF export, не в scope прайса |

---

## ЧЛБ — связи (новые данные)

### Сколько рубрик `directions` на одну услугу

| Рубрик на пост | Постов |
|----------------|--------|
| 0 | 20 |
| 1 | 1028 |
| 2 | 119 |
| 3 | 121 |
| 4–9 | 49 |
| 18–33 | 3 (выбросы) |

**Только taxonomy `directions`** — других таксономий на `services` нет.

### Структура поста

- `post_parent` = 0 у всех — иерархии постов нет
- `post_content` / `post_excerpt` пустые у всех

### FAQ и отзывы (отдельные сущности)

| post_type | Опубликовано | Связь с услугой |
|-----------|--------------|-----------------|
| `vopros_otvet` | **3850** | `service_id` в meta только у **5** постов; основная привязка — через рубрику / флаг `faqs_view` (уточнить) |
| `otzivi` | **1556** | `doctor_id` у большинства; `service_id` почти пусто |

**Вывод:** FAQ — отдельный content-type в Strapi (фаза 2), не поля `Service`. На рубрике/услуге — только флаг `showFaqs`.

---

## СПб — связи (новые данные)

### Артикул в нескольких рубриках (подтверждение M2M)

| Рубрик на `doc_id` | Артикулов |
|--------------------|-----------|
| 1 | 287 |
| 2 | 199 |
| 3 | 202 |
| 4+ | 53 |

Пример: `A11.31.065` — **6** category, **2** tab, **13** строк прайса.

### Прайс ↔ MODX-страница

- **1690** строк с `resource_id` / **81** без
- «Сиротских» `resource_id` нет — все ID валидны

### MIGX-схемы (для синка компонентов)

| TV | Ключи JSON |
|----|------------|
| `faq_services` | `MIGX_id`, `question`, `reply` |
| `json_data` | `id`, `name` (состав комплекса) |
| `uslugiPrice` | `MIGX_id`, `name`, `price` |
| `spoiler_services` (template 12) | `title_spoiler`, `description_spoiler` |

### Программы (template 12)

- **33** ресурса в TV-реестре, **30** с `deleted=1` но `published=1` (в корзине MODX, но «опубликованы»)
- Ключевые TV: `descriptionProgramm`, `priceProgramm`, `des`, `spoiler`, `spoiler_services`, `text-programm`
- **Отдельный тип в Strapi:** `Program` или флаг `Service.isProgram` + те же editorial-поля

### Дерево MODX (parent)

Страницы услуг 6/32 висят под разделами: «Частная поликлиника», «Комплексные программы», «Отделение ВРТ» и т.д. — это **не то же самое**, что `pricelist_items2.category` (параллельная иерархия).

---

## Что ещё НЕ изучено до конца

1. **Полный meta-аудит `vopros_otvet`** (3850) — как именно FAQ попадает на страницу рубрики при `faqs_view=1` (taxonomy? termmeta? custom query в теме).
2. **Экспорт ACF для `directions` taxonomy** — поля рубрики подтверждены через `wp_termmeta`, но нет JSON-схемы field group в репо.
3. **СПб `uslugiPrice` vs `pricelist_items2`** — правила дедупликации при синке (когда TV дублирует таблицу).
4. **ЧЛБ черновики `services`** (208 draft) — нужны ли в синке.
5. **Связь врач ↔ услуга** (`_services`, `dextra_service_ids` на враче) — фаза 2.

---

## Новые probe-скрипты

```bash
cd modx_wp-to-strapi-migration-api
npx tsx scripts/probe-chel-services-relations.mjs
npx tsx scripts/probe-spb-services-relations.mjs
npx tsx scripts/probe-chel-faq-reviews.mjs
```
