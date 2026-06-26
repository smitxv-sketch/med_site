import { Router } from "express";
import { pool, getPrefix, getExcludedIds } from "../db.js";
import {
  getBridgePool,
  getExportSchema,
  toggleExcludedResource,
  upsertExportField,
  upsertExportTemplate,
} from "../bridgeDb.js";
import {
  getChelDoctors,
  getChelServices,
  getChelReviews,
  getChelNews,
  getChelVacancies,
  getChelClinics,
  getChelArticles,
  getChelFaq,
  getChelAdvantages,
  getChelAnonces,
  getChelDirections,
} from "../services/wpService.js";
import { getSyncConfig, saveSyncConfig, getSyncLogs, getSyncRuns, runSync } from "../services/syncWorker.js";
import { StrapiClient } from "../services/strapiClient.js";
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs/promises';
import path from 'path';

import chelRoutes from "./chel.js";
import syncChelRoutes from "./syncChel.js";
import syncSpbRoutes from "./syncSpb.js";
import qaRoutes from "./qa.js";
import exploreRoutes from "./explore.js";
import legacyGuardRoutes from "./legacyGuard.js";
import legacyDiagnosticsRoutes from "./legacyDiagnostics.js";
import healthRoutes from "./health.js";
import { legacyApiGuardMiddleware } from "../middleware/legacyApiGuard.js";
import { fetchModxDoctorsWithTvs } from "../repositories/modx/doctorsRepository.js";
import { fetchModxServicesWithDetails } from "../repositories/modx/servicesRepository.js";

const execAsync = util.promisify(exec);

const router = Router();

router.use("/health", healthRoutes);

// Защита legacy MySQL + контракт «данные частями»
router.use(legacyApiGuardMiddleware);
router.use("/legacy", legacyGuardRoutes);
router.use("/legacy/diagnostics", legacyDiagnosticsRoutes);

// Mount Chelyabinsk routes
router.use("/chel", chelRoutes);
router.use("/sync/chel", syncChelRoutes);
router.use("/sync/spb", syncSpbRoutes);

// Mount QA routes
router.use("/qa", qaRoutes);

// Mount Explore (OpenAPI) routes
router.use("/explore", exploreRoutes);

router.post("/export/qa", async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync(`npx -y tsx scripts/generate_architecture_qa.ts`);
    
    const exportDir = path.join(process.cwd(), 'public/export/architecture_qa');
    let files: string[] = [];
    try {
      files = await fs.readdir(exportDir);
    } catch (e) {}

    res.json({
      success: true,
      message: "Architecture Q&A generated successfully",
      output: stdout,
      files: files.map(f => `/export/architecture_qa/${f}`)
    });
  } catch (error: any) {
    console.error("QA Export error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to generate QA export", 
      details: error.message
    });
  }
});

router.post("/export/claude", async (req, res) => {
  try {
    const { stdout, stderr } = await execAsync(`npx -y tsx scripts/generate_claude_context.ts`);
    res.json({
      success: true,
      message: "Claude context generated successfully",
      output: stdout,
      files: ['/export/claude_context.md']
    });
  } catch (error: any) {
    console.error("Claude Export error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to generate Claude export", 
      details: error.message
    });
  }
});

router.post("/export/run", async (req, res) => {
  try {
    const city = req.query.city as string;
    const limit = req.query.limit as string;
    const scriptName = city === 'chelyabinsk' ? 'generate_export_chel.ts' : 'generate_export.ts';
    const exportPath = city === 'chelyabinsk' ? 'public/export/chel' : 'public/export';

    const limitArg = limit ? ` --limit=${limit}` : '';
    const { stdout, stderr } = await execAsync(`npx -y tsx scripts/${scriptName}${limitArg}`);
    
    const exportDir = path.join(process.cwd(), exportPath);
    let files: string[] = [];
    try {
      files = await fs.readdir(exportDir);
    } catch (e) {
      // Directory might not exist if script failed completely
    }

    res.json({
      success: true,
      message: "Export generated successfully",
      output: stdout,
      files: files.filter(f => f.endsWith('.json') || f.endsWith('.md')).map(f => `/export/${city === 'chelyabinsk' ? 'chel/' : ''}${f}`)
    });
  } catch (error: any) {
    console.error("Export generation error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to generate export", 
      details: error.message,
      stderr: error.stderr
    });
  }
});

// --- NEW SYNC ENGINE ENDPOINTS ---

router.get("/sync-engine/config", async (req, res) => {
  try {
    const config = await getSyncConfig();
    res.json(config);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sync-engine/config", async (req, res) => {
  try {
    await saveSyncConfig(req.body);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/sync-engine/logs", async (req, res) => {
  try {
    const logs = await getSyncLogs();
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sync-engine/test", async (req, res) => {
  try {
    const { url, token } = req.body;
    if (!url || !token) {
      return res.status(400).json({ success: false, message: 'URL and Token are required' });
    }
    const client = new StrapiClient(url, token);
    const result = await client.checkConnection();
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/sync-engine/run", async (req, res) => {
  try {
    const { city } = req.body;
    if (city !== 'spb' && city !== 'chelyabinsk') {
      return res.status(400).json({ success: false, message: 'Invalid city' });
    }
    const result = await runSync(city);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API Endpoints
router.get("/sync/settings/excluded", async (req, res) => {
  try {
    res.json(await getExcludedIds());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch excluded resources" });
  }
});

router.post("/sync/settings/toggle", async (req, res) => {
  try {
    const { resource_id, exclude } = req.body;
    if (!resource_id) return res.status(400).json({ error: 'resource_id is required' });

    await toggleExcludedResource(Number(resource_id), Boolean(exclude));
    res.json({ success: true, resource_id, excluded: exclude });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle resource exclusion" });
  }
});

// GET export schema
router.get("/export/schema", async (req, res) => {
  try {
    res.json(await getExportSchema());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch export schema" });
  }
});

// POST update template schema
router.post("/export/schema/template", async (req, res) => {
  try {
    const { template_id, is_exportable, alias } = req.body;
    if (template_id === undefined) return res.status(400).json({ error: 'template_id is required' });

    await upsertExportTemplate(
      Number(template_id),
      Boolean(is_exportable),
      alias || null,
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update template schema" });
  }
});

// POST update field schema
router.post("/export/schema/field", async (req, res) => {
  try {
    const { template_id, field_name, is_exportable, alias, cast_type } = req.body;
    if (template_id === undefined || !field_name) return res.status(400).json({ error: 'template_id and field_name are required' });

    await upsertExportField(
      Number(template_id),
      field_name,
      Boolean(is_exportable),
      alias || null,
      cast_type || 'string',
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update field schema" });
  }
});

router.get("/sync/logs", async (_req, res) => {
  const logs = await getSyncLogs(50);
  res.json(logs);
});

router.get("/sync/runs", async (_req, res) => {
  const runs = await getSyncRuns(30);
  res.json(runs);
});

router.get("/doctors", async (_req, res) => {
  try {
    const doctorsWithDetails = await fetchModxDoctorsWithTvs();
    res.json(doctorsWithDetails);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch doctors from database", details: String(error) });
  }
});

router.get("/services", async (_req, res) => {
  try {
    const servicesWithDetails = await fetchModxServicesWithDetails();
    res.json(servicesWithDetails);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch services from database", details: String(error) });
  }
});

router.get("/sync/full-graph", async (req, res) => {
  try {
    const prefix = getPrefix();
    const includeExcluded = req.query.include_excluded === 'true';
    const excludedIds = await getExcludedIds();
    const excludeCondition = (!includeExcluded && excludedIds.length > 0) ? `AND c.id NOT IN (${excludedIds.join(',')})` : '';
    
    // 1. Fetch Resources (All non-deleted)
    const [resources] = await pool.query(`
      SELECT c.id, c.pagetitle, c.longtitle, c.description, c.introtext, c.content, c.alias, c.parent, c.template, c.menuindex, c.isfolder, c.published, c.deleted, c.createdon, c.editedon, c.publishedon, p.image as ms2_image, p.thumb as ms2_thumb
      FROM ${prefix}site_content c
      LEFT JOIN ${prefix}ms2_products p ON p.id = c.id
      WHERE c.deleted = 0 ${excludeCondition}
    `);

    // 2. Fetch TV Values for these resources
    const [tvValues] = await pool.query(`
      SELECT tvc.contentid as resource_id, tv.name as tv_name, tvc.value 
      FROM ${prefix}site_tmplvar_contentvalues tvc
      JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    `);

    // Group TV values by resource_id
    const tvMap: Record<number, Record<string, any>> = {};
    (tvValues as any[]).forEach(row => {
      if (!tvMap[row.resource_id]) {
        tvMap[row.resource_id] = {};
      }
      
      let value = row.value;
      if (typeof value === 'string' && value.trim() !== '') {
        const trimmed = value.trim();
        if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
          try {
            value = JSON.parse(trimmed);
          } catch (e) {
            // Keep as string if it's not valid JSON
          }
        } else if (trimmed.includes('||')) {
          value = trimmed.split('||');
        }
      }
      
      tvMap[row.resource_id][row.tv_name] = value;
    });

    // Merge TVs into resources and determine main image
    const processedResources = (resources as any[]).map(res => {
      const tvs = tvMap[res.id] || {};
      
      let mainImage = tvs.image || tvs.img || '';
      if (res.template === 7) mainImage = res.ms2_image || tvs.docImg || mainImage; // Doctor
      if (res.template === 4) mainImage = tvs.newsImg || mainImage; // News
      if (res.template === 19) mainImage = tvs.newsImg || mainImage; // Promo
      if (res.template === 25) mainImage = tvs.blogImage || mainImage; // Blog

      let tags: string[] = [];
      if (tvs.tags) {
        tags = String(tvs.tags).split(',').map(t => t.trim()).filter(Boolean);
      }

      return {
        ...res,
        tvs,
        mainImage,
        tags
      };
    });

    // 3. Fetch all Price Items
    let priceItems = [];
    try {
      const [prices] = await pool.query(`
        SELECT * FROM ${prefix}pricelist_items2
      `);
      priceItems = prices as any[];
    } catch (e) {
      console.warn("Table pricelist_items2 might not exist yet:", e);
    }

    // 4. Fetch Redirects
    let redirects = [];
    try {
      const [redirs] = await pool.query(`
        SELECT id, pattern as old_url, target as new_slug
        FROM ${prefix}redirects
        WHERE active = 1
      `);
      redirects = redirs as any[];
    } catch (e) {
      console.warn("Table redirects might not exist:", e);
    }

    // 5. Fetch Media (ms2_product_files)
    let media = [];
    try {
      const [files] = await pool.query(`
        SELECT id, product_id, name, file as original_path, type, url, properties
        FROM ${prefix}ms2_product_files
        WHERE active = 1
      `);
      media = files as any[];
    } catch (e) {
      console.warn("Table ms2_product_files might not exist:", e);
    }
    
    const uniqueLocations = new Map<number, any>();
    processedResources.forEach(r => {
      if (r.tvs?.loc) {
        const locIds = Array.isArray(r.tvs.loc) ? r.tvs.loc : String(r.tvs.loc).split('||');
        locIds.forEach((id: string) => {
          const locId = parseInt(id);
          if (!isNaN(locId) && !uniqueLocations.has(locId)) {
            uniqueLocations.set(locId, {
              id: locId,
              name: locId === 1 ? 'Финский пер., 4' : `Location ${locId}`
            });
          }
        });
      }
    });

    res.json({
      timestamp: new Date().toISOString(),
      source_tables: [
        `${prefix}site_content`,
        `${prefix}site_tmplvar_contentvalues`,
        `${prefix}pricelist_items2`,
        `${prefix}redirects`,
        `${prefix}ms2_product_files`
      ],
      entities: {
        resources: processedResources,
        price_items: priceItems,
        locations: Array.from(uniqueLocations.values()),
        doctors: processedResources.filter(r => r.template === 7 && r.parent !== 209),
        reviews: processedResources.filter(r => r.template === 7 && r.parent === 209),
        services: processedResources.filter(r => r.template === 32 || r.template === 6),
        news: processedResources.filter(r => r.template === 4),
        promotions: processedResources.filter(r => r.template === 19),
        articles: processedResources.filter(r => r.template === 25),
        pages: processedResources.filter(r => r.template === 2),
        programs: processedResources.filter(r => r.template === 12),
        branches: processedResources.filter(r => r.template === 17),
        equipment: processedResources.filter(r => [8, 20, 29].includes(r.template)),
        vacancies: processedResources.filter(r => r.template === 3),
        media: media,
        redirects: redirects
      },
      mappings: {
        resource_hierarchy: `${prefix}site_content (id -> parent)`,
        service_data: `${prefix}site_tmplvar_contentvalues (contentid -> resource.id)`,
        price_mapping: `${prefix}pricelist_items2 (resource_id -> resource.id, json_data TV)`
      }
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch full graph from database", details: String(error) });
  }
});

router.get("/export/schema/analyze", async (req, res) => {
  try {
    const prefix = getPrefix();
    const [tvs] = await pool.query(`
      SELECT DISTINCT tv.id, tv.name, tv.caption, tv.description, tv.type, tv.elements, tvt.templateid
      FROM ${prefix}site_tmplvars tv
      JOIN ${prefix}site_tmplvar_templates tvt ON tv.id = tvt.tmplvarid
      WHERE tvt.templateid IN (7, 6, 32, 4, 19, 25, 2, 12, 17, 8, 20, 29, 3)
    `);

    const [rows7] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 7 AND parent != 209 AND published = 1`);
    const [rowsReviews] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 7 AND parent = 209 AND published = 1`);
    const [rows6] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 6 AND published = 1`);
    const [rows32] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 32 AND published = 1`);
    const [rows4] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 4 AND published = 1`);
    const [rows19] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 19 AND published = 1`);
    const [rows25] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 25 AND published = 1`);
    const [rows2] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 2 AND published = 1`);
    const [rows12] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 12 AND published = 1`);
    const [rows3] = await pool.query(`SELECT COUNT(id) as c FROM ${prefix}site_content WHERE template = 3 AND published = 1`);
    
    const docCount7 = (rows7 as any[])[0];
    const docCountReviews = (rowsReviews as any[])[0];
    const docCount6 = (rows6 as any[])[0];
    const docCount32 = (rows32 as any[])[0];
    const docCount4 = (rows4 as any[])[0];
    const docCount19 = (rows19 as any[])[0];
    const docCount25 = (rows25 as any[])[0];
    const docCount2 = (rows2 as any[])[0];
    const docCount12 = (rows12 as any[])[0];
    const docCount3 = (rows3 as any[])[0];
    
    const totals = {
      7: docCount7.c + docCountReviews.c, // Reviews and Doctors share template 7
      6: docCount6.c,
      32: docCount32.c,
      4: docCount4.c,
      19: docCount19.c,
      25: docCount25.c,
      2: docCount2.c,
      12: docCount12.c,
      3: docCount3.c
    };

    const analysis = [];

    for (const tv of (tvs as any[])) {
      const templateId = tv.templateid;
      const totalDocs = totals[templateId as keyof typeof totals] || 1;
      
      const [filledRows] = await pool.query(`
        SELECT COUNT(tvc.id) as c
        FROM ${prefix}site_tmplvar_contentvalues tvc
        JOIN ${prefix}site_content sc ON sc.id = tvc.contentid
        WHERE tvc.tmplvarid = ? AND sc.template = ? AND sc.published = 1 AND tvc.value != '' AND tvc.value IS NOT NULL
      `, [tv.id, templateId]);

      const filledCount = (filledRows as any[])[0];
      const filled = filledCount.c;
      const fillRate = Math.round((filled / totalDocs) * 100);

      analysis.push({
        templateId,
        name: tv.name,
        caption: tv.caption,
        description: tv.description,
        type: tv.type,
        elements: tv.elements,
        fillRate
      });
    }

    res.json({ success: true, analysis });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

router.post("/export/developer-dump", async (req, res) => {
  try {
    const city = req.query.city as string;
    const { schemaFields, exampleCount = 2 } = req.body;
    const limit = parseInt(exampleCount) || 2;
    
    if (city === 'chelyabinsk') {
      // Fetch Chelyabinsk data
      const doctors = await getChelDoctors();
      const services = await getChelServices(limit);
      const reviews = await getChelReviews(limit);
      const news = await getChelNews(limit);
      const vacancies = await getChelVacancies(limit);
      const clinics = await getChelClinics();
      const articles = await getChelArticles();
      const faq = await getChelFaq(limit);
      const advantages = await getChelAdvantages();
      const anonces = await getChelAnonces();
      const directions = await getChelDirections();

      const limitedDoctors = doctors.slice(0, limit);
      const limitedClinics = clinics.slice(0, limit);
      const limitedArticles = articles.slice(0, limit);
      const limitedAdvantages = advantages.slice(0, limit);
      const limitedAnonces = anonces.slice(0, limit);

      // Generate relationships
      const relationships: any[] = [];
      reviews.forEach((r: any) => {
        if (r.doctor_id) relationships.push({ source_id: r.id, source_type: 'review', target_id: r.doctor_id, target_type: 'doctor', type: 'review_to_doctor' });
        if (r.service_id) relationships.push({ source_id: r.id, source_type: 'review', target_id: r.service_id, target_type: 'service', type: 'review_to_service' });
        if (r.directions) {
          const dirs = Array.isArray(r.directions) ? r.directions : String(r.directions).split(',');
          dirs.forEach((d: string) => {
            if (d.trim()) relationships.push({ source_id: r.id, source_type: 'review', target_id: d.trim(), target_type: 'direction', type: 'review_to_direction' });
          });
        }
      });
      services.forEach((s: any) => {
        if (s.taxonomies?.directions) {
          s.taxonomies.directions.forEach((d: any) => {
            relationships.push({ source_id: s.id, source_type: 'service', target_id: d.term_id, target_type: 'direction', type: 'service_to_direction' });
          });
        }
      });

      const dump = {
        _meta: {
          description: "Дамп структуры данных для переноса на Strapi (Челябинск)",
          generated_at: new Date().toISOString(),
          note: "В этом дампе собраны примеры данных и связи для Челябинска."
        },
        schema: {
          doctors: { collectionName: "doctors", info: { singularName: "doctor", pluralName: "doctors", displayName: "Врачи" }, attributes: Object.keys(limitedDoctors[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          services: { collectionName: "services", info: { singularName: "service", pluralName: "services", displayName: "Услуги" }, attributes: Object.keys(services[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          reviews: { collectionName: "reviews", info: { singularName: "review", pluralName: "reviews", displayName: "Отзывы" }, attributes: Object.keys(reviews[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          news: { collectionName: "news", info: { singularName: "news", pluralName: "news", displayName: "Новости" }, attributes: Object.keys(news[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          vacancies: { collectionName: "vacancies", info: { singularName: "vacancy", pluralName: "vacancies", displayName: "Вакансии" }, attributes: Object.keys(vacancies[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          clinics: { collectionName: "clinics", info: { singularName: "clinic", pluralName: "clinics", displayName: "Клиники" }, attributes: Object.keys(limitedClinics[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          articles: { collectionName: "articles", info: { singularName: "article", pluralName: "articles", displayName: "Статьи" }, attributes: Object.keys(limitedArticles[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          faq: { collectionName: "faq", info: { singularName: "faq", pluralName: "faq", displayName: "Вопрос-ответ" }, attributes: Object.keys(faq[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          advantages: { collectionName: "advantages", info: { singularName: "advantage", pluralName: "advantages", displayName: "Преимущества" }, attributes: Object.keys(limitedAdvantages[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          anonces: { collectionName: "anonces", info: { singularName: "anonce", pluralName: "anonces", displayName: "Анонсы" }, attributes: Object.keys(limitedAnonces[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) },
          directions: { collectionName: "directions", info: { singularName: "direction", pluralName: "directions", displayName: "Направления" }, attributes: Object.keys(directions[0] || {}).reduce((acc, f) => ({ ...acc, [f]: { type: "String" } }), {}) }
        },
        relationships,
        data_examples: {
          doctors: limitedDoctors,
          services: services,
          reviews: reviews,
          news: news,
          vacancies: vacancies,
          clinics: limitedClinics,
          articles: limitedArticles,
          faq: faq,
          advantages: limitedAdvantages,
          anonces: limitedAnonces,
          directions: directions
        }
      };

      return res.json({ success: true, dump });
    }

    // Группируем поля по шаблонам (MODX logic)
    const fieldsByTemplate: Record<string, string[]> = {
      '7': [], '6': [], '4': [], '19': [], '25': [], '2': [], '12': [], '17': [], '8': [], '20': [], '29': [], '3': [], 'price': []
    };

    if (schemaFields) {
      Object.entries(schemaFields).forEach(([key, isExportable]) => {
        if (isExportable) {
          const [templateIdStr, ...fieldNameParts] = key.split('-');
          const fieldName = fieldNameParts.join('-');
          if (fieldsByTemplate[templateIdStr]) {
            fieldsByTemplate[templateIdStr].push(fieldName);
          }
        }
      });
    }

    // Получаем данные из БД Питера (MODX)
    const prefix = getPrefix();
    const [doctors] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 7 AND parent != 209 AND published = 1 LIMIT ?`, [limit]);
    const [reviews] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 7 AND parent = 209 AND published = 1 LIMIT ?`, [limit]);
    const [services] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template IN (6, 32) AND published = 1 LIMIT ?`, [limit]);
    const [news] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 4 AND published = 1 LIMIT ?`, [limit]);
    const [promotions] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 19 AND published = 1 LIMIT ?`, [limit]);
    const [blog] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 25 AND published = 1 LIMIT ?`, [limit]);
    const [pages] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 2 AND published = 1 LIMIT ?`, [limit]);
    const [programs] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 12 AND published = 1 LIMIT ?`, [limit]);
    const [branches] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 17 AND published = 1 LIMIT ?`, [limit]);
    const [equipment] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template IN (8, 20, 29) AND published = 1 LIMIT ?`, [limit]);
    const [vacancies] = await pool.query(`SELECT id, pagetitle, alias FROM ${prefix}site_content WHERE template = 3 AND published = 1 LIMIT ?`, [limit]);
    
    let prices: any[] = [];
    try {
      const [pricesResult] = await pool.query(`SELECT * FROM ${prefix}pricelist_items2 LIMIT ?`, [limit]);
      prices = pricesResult as any[];
    } catch (e) {
      console.warn("pricelist_items2 not found", e);
    }

    // Вспомогательная функция для получения TV
    const getTvs = async (id: number) => {
      const [tvs] = await pool.query(`
        SELECT tv.name, tvc.value 
        FROM ${prefix}site_tmplvar_contentvalues tvc
        JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
        WHERE tvc.contentid = ?
      `, [id]);
      const tvMap: Record<string, any> = {};
      (tvs as any[]).forEach(tv => tvMap[tv.name] = tv.value);
      return tvMap;
    };

    // Функция для определения метаданных поля (для Strapi)
    const getFieldMeta = (field: string) => {
      if (['id', 'parent', 'template'].includes(field)) return { type: 'Integer', description: 'Системный идентификатор' };
      if (field === 'pagetitle') return { type: 'String', description: 'Заголовок / Название' };
      if (field === 'alias') return { type: 'UID', description: 'URL slug' };
      if (field === 'loc') return { type: 'Relation', target: 'Location', relationType: 'manyToMany', description: 'Связь с клиниками (локациями)' };
      if (field === 'specListAction') return { type: 'Relation', target: 'Promotion', relationType: 'manyToMany', description: 'Связь с акциями' };
      if (field.includes('price') || field === 'price_items') return { type: 'Relation', target: 'PriceItem', relationType: 'oneToMany', description: 'Связь с прайс-листом' };
      if (field.includes('image') || field.includes('photo')) return { type: 'Media', description: 'Изображение' };
      if (field.includes('date')) return { type: 'Date', description: 'Дата' };
      return { type: 'Text/RichText', description: 'Текстовый контент' };
    };

    // Вспомогательная функция для формирования примеров
    const buildExamples = async (items: any[], fields: string[]) => {
      return await Promise.all(items.map(async (item) => {
        const tvs = await getTvs(item.id);
        const fullItem = { ...item, ...tvs };
        const filteredItem: Record<string, any> = {};
        
        const fieldsToUse = (fields.length === 0 && (!schemaFields || Object.keys(schemaFields).length === 0)) 
          ? Object.keys(fullItem) 
          : fields;
        
        fieldsToUse.forEach(field => {
          if (fullItem[field] !== undefined) filteredItem[field] = fullItem[field];
        });
        return filteredItem;
      }));
    };

    const doctorExamples = await buildExamples(doctors as any[], fieldsByTemplate['7']);
    const reviewExamples = await buildExamples(reviews as any[], fieldsByTemplate['7']);
    const serviceExamples = await buildExamples(services as any[], fieldsByTemplate['6']);
    const newsExamples = await buildExamples(news as any[], fieldsByTemplate['4']);
    const promoExamples = await buildExamples(promotions as any[], fieldsByTemplate['19']);
    const blogExamples = await buildExamples(blog as any[], fieldsByTemplate['25']);
    const pageExamples = await buildExamples(pages as any[], fieldsByTemplate['2']);
    const programExamples = await buildExamples(programs as any[], fieldsByTemplate['12']);
    const branchExamples = await buildExamples(branches as any[], fieldsByTemplate['17']);
    const equipmentExamples = await buildExamples(equipment as any[], fieldsByTemplate['8']);
    const vacancyExamples = await buildExamples(vacancies as any[], fieldsByTemplate['3']);
    
    // Для прайсов нет TV, просто фильтруем колонки
    const priceExamples = prices.map(price => {
      const filteredPrice: Record<string, any> = {};
      const fieldsToUse = (fieldsByTemplate['price'].length === 0 && (!schemaFields || Object.keys(schemaFields).length === 0)) 
        ? Object.keys(price) 
        : fieldsByTemplate['price'];
      
      fieldsToUse.forEach(field => {
        if (price[field] !== undefined) filteredPrice[field] = price[field];
      });
      return filteredPrice;
    });

    // Функция для генерации схемы
    const generateSchema = (name: string, plural: string, displayName: string, fields: string[], examples: any[]) => {
      return {
        collectionName: plural,
        info: { singularName: name.toLowerCase(), pluralName: plural, displayName },
        attributes: (fields.length > 0 ? fields : Object.keys(examples[0] || {})).reduce((acc, field) => {
          acc[field] = getFieldMeta(field);
          return acc;
        }, {} as Record<string, any>)
      };
    };

    const dump = {
      _meta: {
        description: "Дамп структуры данных для переноса на Strapi",
        generated_at: new Date().toISOString(),
        note: "В этом дампе оставлены только те поля, которые были отмечены как 'Нужные' в интерфейсе."
      },
      schema_definition: {
        Doctor: generateSchema('Doctor', 'doctors', 'Врач', fieldsByTemplate['7'], doctorExamples),
        Review: generateSchema('Review', 'reviews', 'Отзыв', fieldsByTemplate['7'], reviewExamples),
        Service: generateSchema('Service', 'services', 'Услуга', fieldsByTemplate['6'], serviceExamples),
        News: generateSchema('News', 'news', 'Новость', fieldsByTemplate['4'], newsExamples),
        Promotion: generateSchema('Promotion', 'promotions', 'Акция', fieldsByTemplate['19'], promoExamples),
        Article: generateSchema('Article', 'articles', 'Статья', fieldsByTemplate['25'], blogExamples),
        Page: generateSchema('Page', 'pages', 'Страница', fieldsByTemplate['2'], pageExamples),
        Program: generateSchema('Program', 'programs', 'Программа', fieldsByTemplate['12'], programExamples),
        Branch: generateSchema('Branch', 'branches', 'Филиал', fieldsByTemplate['17'], branchExamples),
        Equipment: generateSchema('Equipment', 'equipment', 'Оборудование', fieldsByTemplate['8'], equipmentExamples),
        Vacancy: generateSchema('Vacancy', 'vacancies', 'Вакансия', fieldsByTemplate['3'], vacancyExamples),
        PriceItem: generateSchema('PriceItem', 'price_items', 'Элемент прайса', fieldsByTemplate['price'], priceExamples),
      },
      data: {
        doctors: doctorExamples,
        reviews: reviewExamples,
        services: serviceExamples,
        news: newsExamples,
        promotions: promoExamples,
        articles: blogExamples,
        pages: pageExamples,
        programs: programExamples,
        branches: branchExamples,
        equipment: equipmentExamples,
        vacancies: vacancyExamples,
        price_items: priceExamples
      }
    };

    res.json({ success: true, dump });
  } catch (error) {
    console.error("Developer dump error:", error);
    res.status(500).json({ success: false, error: String(error) });
  }
});

export default router;
