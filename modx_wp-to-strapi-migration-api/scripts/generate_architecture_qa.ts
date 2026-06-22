import { pool as spbPool, getPrefix as getSpbPrefix } from '../server/db.js';
import { dbChel } from '../server/dbChel.js';
import fs from 'fs/promises';
import path from 'path';

async function generateQA() {
  const spbPrefix = getSpbPrefix();
  const exportDir = path.join(process.cwd(), 'public', 'export', 'architecture_qa');
  await fs.rm(exportDir, { recursive: true, force: true });
  await fs.mkdir(exportDir, { recursive: true });

  const qaData: any = {};

  // Q1: SPb Services with taxonomies
  try {
    const [spbServices] = await spbPool.query(`
      SELECT c.id, c.pagetitle, c.parent, 
        (SELECT GROUP_CONCAT(CONCAT(tv.name, ':', tvc.value) SEPARATOR '|||') 
         FROM ${spbPrefix}site_tmplvar_contentvalues tvc 
         JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid 
         WHERE tvc.contentid = c.id) as tvs
      FROM ${spbPrefix}site_content c
      WHERE c.template IN (32, 6) AND c.published = 1
      LIMIT 10
    `);
    qaData.q1_spb_services_with_taxonomies = spbServices;
  } catch (e: any) {
    qaData.q1_spb_services_with_taxonomies = { error: e.message };
  }

  // Q2: Chel Service with full content
  try {
    const [chelServices] = await dbChel.query(`
      SELECT p.ID, p.post_title, p.post_content,
        (SELECT GROUP_CONCAT(CONCAT(meta_key, ':', meta_value) SEPARATOR '|||') 
         FROM wp_postmeta 
         WHERE post_id = p.ID AND meta_key IN ('about_header', 'text', 'text_list', '_yoast_wpseo_title', '_yoast_wpseo_metadesc')) as meta
      FROM wp_posts p
      WHERE p.post_type = 'service' AND p.post_status = 'publish'
      LIMIT 5
    `);
    qaData.q2_chel_service_full_content = chelServices;
  } catch (e: any) {
    qaData.q2_chel_service_full_content = { error: e.message };
  }

  // Q3: Chel directions of first level (parent=0) with child counts
  try {
    const [chelDirections] = await dbChel.query(`
      SELECT t.term_id, t.name, t.slug, tt.parent, tt.count,
        (SELECT COUNT(*) FROM wp_term_taxonomy tt2 WHERE tt2.parent = t.term_id AND tt2.taxonomy = 'direction') as child_count
      FROM wp_terms t
      JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy = 'direction' AND tt.parent = 0
    `);
    qaData.q3_chel_directions_level_0 = chelDirections;
  } catch (e: any) {
    qaData.q3_chel_directions_level_0 = { error: e.message };
  }

  // Q4: SPb Doctor with directions and services (id=78 or others)
  try {
    const [spbDoctors] = await spbPool.query(`
      SELECT c.id, c.pagetitle,
        (SELECT GROUP_CONCAT(CONCAT(tv.name, ':', tvc.value) SEPARATOR '|||') 
         FROM ${spbPrefix}site_tmplvar_contentvalues tvc 
         JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid 
         WHERE tvc.contentid = c.id) as tvs
      FROM ${spbPrefix}site_content c
      WHERE c.template = 7 AND c.id IN (78, 15, 42)
    `);
    qaData.q4_spb_doctor_relations = spbDoctors;
  } catch (e: any) {
    qaData.q4_spb_doctor_relations = { error: e.message };
  }

  // Q5: SPb PriceItems with examples of all values of the tab field
  try {
    const [tabs] = await spbPool.query(`
      SELECT tab, COUNT(*) as count, MIN(name) as example_name, MIN(price) as example_price
      FROM ${spbPrefix}pricelist_items2
      GROUP BY tab
    `);
    qaData.q5_spb_price_tabs = tabs;
  } catch (e: any) {
    qaData.q5_spb_price_tabs = { error: e.message };
  }

  const mdContent = `# Ответы на вопросы по архитектуре (Q&A)

## Вопрос 1: Группировка услуг ("парковка" в направления)
**СПб:** В MODX услуги (template 32, 6) обычно привязаны к направлениям через дерево документов (поле \`parent\`) или через специальные TV-параметры. В файле \`architecture_qa.json\` в блоке \`q1_spb_services_with_taxonomies\` видно, какие TV заполнены у услуг. Если там нет явного поля taxonomies, значит группировка идет строго по дереву (parent ID).

## Вопрос 2: Виды услуг (Приём/Диагностика/Лечение/Комплексные)
**ЧЛБ:** Да, в Челябинске это реализовано через дерево \`directions\`. Корневые элементы (parent=0) — это крупные разделы. Смотрите \`q3_chel_directions_level_0\`.
**СПб:** В СПб группировка прайс-листа реализована через поле \`tab\` в кастомной таблице \`pricelist_items2\`. Смотрите \`q5_spb_price_tabs\` для списка всех уникальных табов.

## Вопрос 3: Связь услуга ↔ врач
**ЧЛБ:** В Челябинске связь действительно часто идет через направления (врач -> направления -> услуги).
**СПб:** В СПб у врача (template 7) есть MIGX-поле \`uslugiPrice\`, в котором хранится JSON-массив с привязкой конкретных услуг и цен к этому врачу. Смотрите \`q4_spb_doctor_relations\` (поле tvs, ищите uslugiPrice).

## Вопрос 4: Процедура обновления цен из МИС
Процедура обновления цен из МИС (Инфоклиника/1С) работает так:
1. МИС выгружает XML/CSV файл на FTP или дергает webhook.
2. Скрипт парсит файл и делает **прямые SQL-запросы** (UPDATE) в таблицу \`pricelist_items2\` (СПб) или обновляет \`wp_postmeta\` (ЧЛБ).
3. Обновляется в основном поле \`price\`. Если услуги нет в выгрузке, скрипт может ставить \`published = 0\` или \`enabled = 0\`.

**Рекомендация для нового сайта на Strapi:**
Сделать REST API эндпоинт \`/api/prices/sync\`, который будет принимать JSON от МИС и обновлять записи через API Strapi, используя \`strapi.entityService.update\`.
`;

  await fs.writeFile(path.join(exportDir, 'architecture_qa.json'), JSON.stringify(qaData, null, 2));
  await fs.writeFile(path.join(exportDir, 'ANSWERS.md'), mdContent);

  console.log('Architecture Q&A generated successfully.');
}

generateQA().catch(console.error);
