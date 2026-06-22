import fs from 'fs/promises';
import path from 'path';
import { pool as spbPool, getPrefix as getSpbPrefix } from '../server/db.js';
import { dbChel } from '../server/dbChel.js';

async function generateClaudeContext() {
  console.log("Generating Claude Context...");
  const exportDir = path.join(process.cwd(), 'public', 'export');
  await fs.mkdir(exportDir, { recursive: true });

  let md = `# Контекст базы данных для проектирования архитектуры Strapi\n\n`;
  md += `Этот документ содержит полную сводку по структуре старых баз данных (MODX для СПб и WordPress для Челябинска). Используй эти данные для проектирования коллекций, связей и компонентов в Strapi.\n\n`;

  // 1. SPB Templates (Discovery)
  md += `## 1. Санкт-Петербург (MODX) - Существующие типы контента (Шаблоны)\n`;
  try {
    const spbPrefix = getSpbPrefix();
    const [templates] = await spbPool.query(`
      SELECT template, COUNT(*) as count, MIN(pagetitle) as example_title
      FROM ${spbPrefix}site_content
      WHERE published = 1
      GROUP BY template
      ORDER BY count DESC
    `);
    md += "В MODX контент разделен по ID шаблонов. Вот все активные шаблоны в базе:\n```json\n";
    md += JSON.stringify(templates, null, 2) + "\n```\n\n";
  } catch (e: any) { md += `Error: ${e.message}\n\n`; }

  // 2. Chel Post Types (Discovery)
  md += `## 2. Челябинск (WordPress) - Существующие типы контента (Post Types)\n`;
  try {
    const [postTypes] = await dbChel.query(`
      SELECT post_type, COUNT(*) as count, MIN(post_title) as example_title
      FROM wp_posts
      WHERE post_status = 'publish'
      GROUP BY post_type
      ORDER BY count DESC
    `);
    md += "В WordPress контент разделен по post_type. Вот все активные типы в базе:\n```json\n";
    md += JSON.stringify(postTypes, null, 2) + "\n```\n\n";
  } catch (e: any) { md += `Error: ${e.message}\n\n`; }

  // 3. Examples of complex relations
  md += `## 3. Примеры сложных связей и полей\n`;
  md += `Ниже приведены примеры того, как хранятся данные у самых сложных сущностей (Врачи и Услуги).\n\n`;

  try {
    // SPB Doctor Example
    const spbPrefix = getSpbPrefix();
    const [spbDoctor] = await spbPool.query(`
      SELECT c.id, c.pagetitle,
        (SELECT GROUP_CONCAT(CONCAT(tv.name, ':', tvc.value) SEPARATOR '|||') 
         FROM ${spbPrefix}site_tmplvar_contentvalues tvc 
         JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid 
         WHERE tvc.contentid = c.id) as tvs
      FROM ${spbPrefix}site_content c
      WHERE c.template = 7 LIMIT 1
    `);
    md += `### Пример: Врач (СПб, MODX)\nОбрати внимание на поле \`uslugiPrice\` в TV-параметрах — это JSON-массив (MIGX), который связывает врача с конкретными услугами и ценами.\n\`\`\`json\n`;
    md += JSON.stringify(spbDoctor, null, 2) + "\n\`\`\`\n\n";

    // Chel Doctor Example
    const [chelDoctor] = await dbChel.query(`
      SELECT p.ID, p.post_title,
        (SELECT GROUP_CONCAT(CONCAT(meta_key, ':', meta_value) SEPARATOR '|||') 
         FROM wp_postmeta 
         WHERE post_id = p.ID AND meta_key IN ('specialization', 'experience')) as meta
      FROM wp_posts p
      WHERE p.post_type = 'doctor' LIMIT 1
    `);
    md += `### Пример: Врач (Челябинск, WordPress)\nОбрати внимание на ACF-поля в meta.\n\`\`\`json\n`;
    md += JSON.stringify(chelDoctor, null, 2) + "\n\`\`\`\n\n";

    // SPB Price Tabs
    const [tabs] = await spbPool.query(`
      SELECT tab, COUNT(*) as count, MIN(name) as example_name
      FROM ${spbPrefix}pricelist_items2
      GROUP BY tab
    `);
    md += `### Пример: Группировка прайс-листа (СПб)\nПрайс-лист сгруппирован по полю \`tab\`:\n\`\`\`json\n`;
    md += JSON.stringify(tabs, null, 2) + "\n\`\`\`\n\n";

  } catch (e: any) { md += `Error fetching examples: ${e.message}\n\n`; }

  md += `## Задача для AI-Агента\n`;
  md += `Основываясь на этих данных, спроектируй оптимальную архитектуру коллекций (Content Types) и компонентов в Strapi, которая позволит объединить данные обоих городов в единую структуру. Учти, что связи (например, врач-услуга) в старых базах реализованы по-разному.\n`;

  await fs.writeFile(path.join(exportDir, 'claude_context.md'), md);
  console.log("Claude Context generated successfully.");
}

generateClaudeContext().catch(console.error);
