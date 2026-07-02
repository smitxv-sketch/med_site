import { Router } from "express";
import { pool as spbPool, getPrefix as getSpbPrefix } from "../db.js";
import { dbChel } from "../dbChel.js";
import { parsePagination } from "../lib/pagination.js";
import { sendExploreList } from "../lib/exploreListResponse.js";

const router = Router();

// Helper for SPb queries
const getSpbData = async (templateIds: number[], limit: number, offset: number, extraWhere: string = "") => {
  const spbPrefix = getSpbPrefix();
  const templates = templateIds.join(',');
  
  // 1. Fetch main content
  const [rows] = await spbPool.query(`
    SELECT id, pagetitle, alias, parent, published, content, introtext
    FROM ${spbPrefix}site_content
    WHERE template IN (${templates}) ${extraWhere}
    LIMIT ? OFFSET ?
  `, [limit, offset]);

  const items = rows as any[];
  if (items.length === 0) return [];

  const ids = items.map(i => i.id);

  // 2. Fetch ALL TVs for these IDs (avoiding GROUP_CONCAT truncation limits)
  const [tvs] = await spbPool.query(`
    SELECT tvc.contentid, tv.name, tvc.value
    FROM ${spbPrefix}site_tmplvar_contentvalues tvc
    JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid IN (?)
  `, [ids]);

  // 3. Group TVs and attempt to parse JSON (MIGX)
  const tvMap: Record<number, Record<string, any>> = {};
  (tvs as any[]).forEach(tv => {
    if (!tvMap[tv.contentid]) tvMap[tv.contentid] = {};
    let val = tv.value;
    // Auto-parse MIGX JSON arrays
    if (val && typeof val === 'string' && val.startsWith('[') && val.endsWith(']')) {
      try { val = JSON.parse(val); } catch(e) {}
    }
    tvMap[tv.contentid][tv.name] = val;
  });

  return items.map(item => ({
    ...item,
    tvs: tvMap[item.id] || {}
  }));
};

// Helper for Chel queries
const getChelData = async (postType: string, limit: number, offset: number) => {
  // 1. Fetch main posts
  const [rows] = await dbChel.query(`
    SELECT ID, post_title, post_name, post_status, post_content
    FROM wp_posts
    WHERE post_type = ? AND post_status = 'publish'
    LIMIT ? OFFSET ?
  `, [postType, limit, offset]);

  const items = rows as any[];
  if (items.length === 0) return [];

  const ids = items.map(i => i.ID);

  // 2. Fetch ALL Meta fields (avoiding GROUP_CONCAT truncation)
  const [meta] = await dbChel.query(`
    SELECT post_id, meta_key, meta_value
    FROM wp_postmeta
    WHERE post_id IN (?)
  `, [ids]);

  const metaMap: Record<number, Record<string, any>> = {};
  (meta as any[]).forEach(m => {
    if (!metaMap[m.post_id]) metaMap[m.post_id] = {};
    metaMap[m.post_id][m.meta_key] = m.meta_value;
  });

  // 3. Fetch Taxonomies (Directions, Categories) via relationships
  const [terms] = await dbChel.query(`
    SELECT tr.object_id, t.term_id, t.name, t.slug, tt.taxonomy
    FROM wp_term_relationships tr
    JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
    JOIN wp_terms t ON tt.term_id = t.term_id
    WHERE tr.object_id IN (?)
  `, [ids]);

  const termsMap: Record<number, any[]> = {};
  (terms as any[]).forEach(t => {
    if (!termsMap[t.object_id]) termsMap[t.object_id] = [];
    termsMap[t.object_id].push({ id: t.term_id, name: t.name, slug: t.slug, taxonomy: t.taxonomy });
  });

  return items.map(item => ({
    ...item,
    meta: metaMap[item.ID] || {},
    taxonomies: termsMap[item.ID] || []
  }));
};

// --- OPENAPI SPECIFICATION ---
router.get("/openapi.json", (req, res) => {
  const openapi = {
    openapi: "3.0.0",
    info: {
      title: "Legacy Clinic Data API for AI Migration Agents",
      version: "1.2.0",
      description: `Этот API предоставляет доступ к сырым данным старых сайтов (MODX для СПб, WordPress для Челябинска). Используйте этот API для исследования структуры данных перед проектированием архитектуры в Strapi.

# 📚 БАЗА ЗНАНИЙ ДЛЯ АГЕНТА-АРХИТЕКТОРА (ОБЯЗАТЕЛЬНО К ПРОЧТЕНИЮ)
Ваша главная задача — спроектировать **единую архитектуру в Strapi**, которая объединит две совершенно разные парадигмы хранения данных. Ниже приведены ключевые архитектурные различия и подсказки, которые мы выявили в ходе ревизии.

## 🏗️ 1. Разница в построении связей (Relations)
Это самое сложное место при миграции. Обратите на него особое внимание:
* **В Санкт-Петербурге (MODX):** Связи часто прямые и хранятся внутри сущности в виде сериализованных JSON-массивов (MIGX). Например, у Врача в поле \`tvs.uslugiPrice\` лежит массив услуг, которые он оказывает, и цены на них.
* **В Челябинске (WordPress):** Связи косвенные, через рубрикаторы. Врачи и Услуги не связаны напрямую. Вместо этого и Врач, и Услуга привязываются к общему медицинскому направлению (taxonomy: \`direction\`). 

**💡 Задача для Strapi:** Вам нужно придумать, как унифицировать эту логику. Будет ли это прямая связь Relation (Doctor <-> Service) или через промежуточную сущность Direction?

## 🌳 2. Иерархия и вложенность (Деревья)
* **СПб (MODX):** Иерархия строится через поле \`parent\` в таблице \`site_content\`. Если \`parent = 0\`, это корневой раздел. Если \`parent = 32\`, это подуслуга услуги с ID 32.
* **Челябинск (WordPress):** Иерархия строится внутри таксономий (поле \`parent\` в таблице \`wp_term_taxonomy\`). Сами посты (услуги) лежат "плоско", но привязаны к иерархичному дереву направлений.

## 💰 3. Аномалия Прайс-листов
* **СПб (MODX):** Цены вынесены в отдельную, полностью кастомную таблицу \`pricelist_items2\`. Они сгруппированы по текстовому полю \`tab\`.
* **Челябинск (WordPress):** Отдельной таблицы нет. Скорее всего, цены зашиты прямо внутрь ACF-полей (в объекте \`meta\`) у постов типа \`service\`.
**💡 Подсказка:** Обязательно запросите \`/chel/posts/service\`, чтобы найти, в каких именно meta-полях лежат цены в Челябинске, чтобы спроектировать единый компонент Price в Strapi.

## 🏙️ 4. Словарь сущностей Санкт-Петербурга (MODX)
Вся база в таблице \`site_content\`. Тип определяется полем \`template\`:
* \`7\` — Врачи (Специалисты).
* \`32\`, \`6\` — Услуги и Направления.
* \`19\` — Отзывы пациентов.
* \`15\` — Клиники (Филиалы).
* \`22\` — Страницы со сложной кастомной фронтенд-логикой (в т.ч. Подарочные сертификаты, ID 638).
*(Используйте \`/spb/templates\` для поиска остальных: акций, новостей и т.д.)*

## 🏭 5. Словарь сущностей Челябинска (WordPress)
Вся база в таблице \`wp_posts\`. Тип определяется полем \`post_type\`:
* \`doctor\` — Врачи.
* \`service\` — Услуги.
* \`review\` — Отзывы пациентов.
* \`novosti\` / \`articles\` — Новости и Статьи. Описание новостных постов.
* \`clinics\` — Клиники (Филиалы). В WordPress это посты, а в MODX (СПб) они лежат в template 15. Их следует свести к единому Content Type \`Clinic\` в Strapi.
* \`vopros_otvet\` — FAQ (Вопрос-ответ). Поля формы обратной связи, могут содержать \`doctor_id\` или \`service_id\`.
* \`direction\` (taxonomy) — Медицинские направления (категории).
*(Используйте \`/chel/post_types\` для поиска остальных: vacancies, advantages и т.д.)*`
    },
    servers: [{ url: "https://" + req.get('host') }],
    paths: {
      "/api/explore/spb/templates": {
        get: {
          summary: "Получить список всех шаблонов (СПб)",
          description: "Возвращает список всех используемых шаблонов (template) в MODX с количеством записей и примером названия. **Начните исследование отсюда**, чтобы найти любые сущности (новости, акции, филиалы и т.д.), которые не покрыты базовыми эндпоинтами.",
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/spb/content/{templateId}": {
        get: {
          summary: "Получить контент по ID шаблона (СПб)",
          description: "Возвращает записи MODX для указанного шаблона (например, 7 для врачей). Включает основное содержимое (\`content\`, \`introtext\`) и объект \`tvs\` со всеми кастомными полями.",
          parameters: [
            { name: "templateId", in: "path", required: true, schema: { type: "integer" } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/chel/post_types": {
        get: {
          summary: "Получить список всех типов постов (Челябинск)",
          description: "Возвращает список всех \`post_type\` в WordPress с количеством записей. **Начните исследование отсюда**, чтобы найти клиники, новости, FAQ, акции и т.д.",
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/chel/posts/{postType}": {
        get: {
          summary: "Получить посты по типу (Челябинск)",
          description: "Возвращает записи WordPress для указанного \`post_type\` (например, \`doctor\`). Включает ACF поля в объекте \`meta\` и связи с рубриками в массиве \`taxonomies\`.",
          parameters: [
            { name: "postType", in: "path", required: true, schema: { type: "string" } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/spb/doctors": {
        get: {
          summary: "Получить врачей (СПб)",
          description: "Ярлык для \`/spb/content/7\`. Возвращает список врачей из MODX. **Важно:** Поле \`tvs\` содержит структурированный JSON всех кастомных параметров. Обратите особое внимание на MIGX поля (например, \`uslugiPrice\`), которые содержат массивы связей с услугами.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/spb/services": {
        get: {
          summary: "Получить услуги (СПб)",
          description: "Ярлык для \`/spb/content/32\` и \`6\`. Возвращает список услуг из MODX. Включает основное содержимое (\`content\`) и все TV-параметры.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/spb/reviews": {
        get: {
          summary: "Получить отзывы (СПб)",
          description: "Ярлык для \`/spb/content/19\`. Возвращает отзывы пациентов. Полезно для понимания того, как в MODX реализована связь отзыва с конкретным врачом.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/spb/prices": {
        get: {
          summary: "Получить прайс-лист (СПб)",
          description: "Возвращает элементы прайс-листа из кастомной таблицы \`pricelist_items2\`. Обратите внимание на поле \`tab\`, по которому группируются цены.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/spb/certificates": {
        get: {
          summary: "Получить данные о подарочных сертификатах (СПб)",
          description: "Возвращает контент страницы подарочных сертификатов (ID 638). **Важно для Архитектора**: В базе данных НЕТ таблиц с прайс-листом для сертификатов. Интерактивная форма (выбор номиналов 2000, 4500, 10000 или произвольной суммы) и шаги оформления покупки полностью захардкожены на фронтенде старого сайта. В базе хранятся только общий текст (TV \`textContent\`), почта ответственного лица (TV \`email_economist\`) и макеты сертификатов (TV \`gift_images\` - формат MIGX). В Strapi эту страницу следует спроектировать как Single Type (например, \`GiftCertificate\`) с полями для контента, а логику выбора суммы полностью реализовать на новом фронтенде.",
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/chel/doctors": {
        get: {
          summary: "Получить врачей (Челябинск)",
          description: "Ярлык для \`/chel/posts/doctor\`. Возвращает список врачей из WordPress. **Важно:** Объект \`meta\` содержит ACF поля (стаж, специализация), а массив \`taxonomies\` содержит привязку к медицинским направлениям (\`direction\`).",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/chel/services": {
        get: {
          summary: "Получить услуги (Челябинск)",
          description: "Ярлык для \`/chel/posts/service\`. Возвращает список услуг из WordPress. Включает объект \`meta\` и массив \`taxonomies\`.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/chel/reviews": {
        get: {
          summary: "Получить отзывы (Челябинск)",
          description: "Ярлык для \`/chel/posts/review\`. Возвращает отзывы из WordPress. В объекте \`meta\` можно найти ID врача, к которому относится отзыв.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      },
      "/api/explore/chel/directions": {
        get: {
          summary: "Получить направления (Челябинск)",
          description: "Возвращает дерево медицинских направлений из WordPress (taxonomy = \`direction\`). Это рубрикатор, к которому привязываются врачи и услуги.",
          parameters: [
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
            { name: "offset", in: "query", schema: { type: "integer", default: 0 } }
          ],
          responses: { "200": { description: "Успешный ответ" } }
        }
      }
    }
  };
  res.json(openapi);
});

// --- SPB ENDPOINTS ---
router.get("/spb/doctors", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const data = await getSpbData([7], limit, offset, "AND parent != 209");
    sendExploreList(res, req, 'spb', 'doctors', data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/spb/services", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const data = await getSpbData([32, 6], limit, offset);
    sendExploreList(res, req, 'spb', 'services', data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/spb/reviews", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const data = await getSpbData([19], limit, offset);
    sendExploreList(res, req, 'spb', 'reviews', data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/spb/prices", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const spbPrefix = getSpbPrefix();
    const [data] = await spbPool.query(`SELECT * FROM ${spbPrefix}pricelist_items2 LIMIT ? OFFSET ?`, [limit, offset]);
    sendExploreList(res, req, 'spb', 'prices', data as unknown[]);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/spb/certificates", async (req, res) => {
  try {
    const spbPrefix = getSpbPrefix();
    
    const [rows] = await spbPool.query(`
      SELECT id, pagetitle, content, introtext 
      FROM ${spbPrefix}site_content 
      WHERE id = 638
    `);
    const content = rows as any[];
    if (content.length === 0) {
      return res.status(404).json({ error: "Certificate page not found." });
    }

    const [tvs] = await spbPool.query(`
      SELECT tv.name, tvc.value
      FROM ${spbPrefix}site_tmplvar_contentvalues tvc
      JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
      WHERE tvc.contentid = 638
    `);

    const tvMap: Record<string, any> = {};
    (tvs as any[]).forEach(tv => {
      let val = tv.value;
      if (val && typeof val === 'string' && val.startsWith('[') && val.endsWith(']')) {
        try { val = JSON.parse(val); } catch(e) {}
      }
      tvMap[tv.name] = val;
    });

    res.json({
      _meta: { 
        city: 'spb', 
        entity: 'certificates',
        architect_note: "Цены (2000, 4500, 10000) и логика продажи (шаги 1-2-3-4) захардкожены на фронтенде старого сайта. В БД лежат только тексты, контакты и дизайны макетов (MIGX)."
      },
      data: {
        ...content[0],
        tvs: tvMap
      }
    });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- SPB DISCOVERY ENDPOINTS ---
router.get("/spb/templates", async (req, res) => {
  try {
    const spbPrefix = getSpbPrefix();
    const [data] = await spbPool.query(`
      SELECT template, COUNT(*) as count, MIN(pagetitle) as example_title
      FROM ${spbPrefix}site_content
      WHERE published = 1
      GROUP BY template
      ORDER BY count DESC
    `);
    res.json({ _meta: { city: 'spb', entity: 'templates_discovery' }, data });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/spb/content/:templateId", async (req, res) => {
  try {
    const templateId = parseInt(req.params.templateId);
    const { limit, offset } = parsePagination(req);
    const data = await getSpbData([templateId], limit, offset);
    sendExploreList(res, req, 'spb', `template_${templateId}`, data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- CHELYABINSK ENDPOINTS ---
router.get("/chel/doctors", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const data = await getChelData('doctor', limit, offset);
    sendExploreList(res, req, 'chel', 'doctors', data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/chel/services", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const data = await getChelData('services', limit, offset);
    sendExploreList(res, req, 'chel', 'services', data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/chel/reviews", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const data = await getChelData('review', limit, offset);
    sendExploreList(res, req, 'chel', 'reviews', data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/chel/directions", async (req, res) => {
  try {
    const { limit, offset } = parsePagination(req);
    const [data] = await dbChel.query(`
      SELECT t.term_id, t.name, t.slug, tt.parent, tt.count
      FROM wp_terms t
      JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy = 'direction'
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    sendExploreList(res, req, 'chel', 'directions', data as unknown[]);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// --- CHEL DISCOVERY ENDPOINTS ---
router.get("/chel/post_types", async (req, res) => {
  try {
    const [data] = await dbChel.query(`
      SELECT post_type, COUNT(*) as count, MIN(post_title) as example_title
      FROM wp_posts
      WHERE post_status = 'publish'
      GROUP BY post_type
      ORDER BY count DESC
    `);
    res.json({ _meta: { city: 'chel', entity: 'post_types_discovery' }, data });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

router.get("/chel/posts/:postType", async (req, res) => {
  try {
    const postType = req.params.postType;
    const { limit, offset } = parsePagination(req);
    const data = await getChelData(postType, limit, offset);
    sendExploreList(res, req, 'chel', `post_type_${postType}`, data);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
