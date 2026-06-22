import { Router } from "express";
import { pool as spbPool, getPrefix as getSpbPrefix } from "../db.js";
import { dbChel } from "../dbChel.js";

const router = Router();

// Запрос 1 — СПб, услуги с taxonomies: GET /api/qa/spb/services?limit=10&has_taxonomies=true
router.get("/spb/services", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const spbPrefix = getSpbPrefix();
    const [services] = await spbPool.query(`
      SELECT c.id, c.pagetitle, c.parent, 
        (SELECT GROUP_CONCAT(CONCAT(tv.name, ':', tvc.value) SEPARATOR '|||') 
         FROM ${spbPrefix}site_tmplvar_contentvalues tvc 
         JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid 
         WHERE tvc.contentid = c.id) as tvs
      FROM ${spbPrefix}site_content c
      WHERE c.template IN (32, 6) AND c.published = 1
      LIMIT ?
    `, [limit]);
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Запрос 2 — ЧЛБ, услуга с полным контентом: GET /api/qa/chel/services/:id
router.get("/chel/services/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [services] = await dbChel.query(`
      SELECT p.ID, p.post_title, p.post_content,
        (SELECT GROUP_CONCAT(CONCAT(meta_key, ':', meta_value) SEPARATOR '|||') 
         FROM wp_postmeta 
         WHERE post_id = p.ID AND meta_key IN ('about_header', 'text', 'text_list', '_yoast_wpseo_title', '_yoast_wpseo_metadesc')) as meta
      FROM wp_posts p
      WHERE p.ID = ? AND p.post_type = 'service'
    `, [id]);
    res.json((services as any[])[0] || { error: "Service not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Запрос 3 — ЧЛБ, directions первого уровня (parent=0): GET /api/qa/chel/directions
router.get("/chel/directions", async (req, res) => {
  try {
    const [directions] = await dbChel.query(`
      SELECT t.term_id, t.name, t.slug, tt.parent, tt.count,
        (SELECT COUNT(*) FROM wp_term_taxonomy tt2 WHERE tt2.parent = t.term_id AND tt2.taxonomy = 'direction') as child_count
      FROM wp_terms t
      JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy = 'direction' AND tt.parent = 0
    `);
    res.json(directions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Запрос 4 — СПб, врач с directions и services: GET /api/qa/spb/doctors/:id
router.get("/spb/doctors/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const spbPrefix = getSpbPrefix();
    const [doctors] = await spbPool.query(`
      SELECT c.id, c.pagetitle,
        (SELECT GROUP_CONCAT(CONCAT(tv.name, ':', tvc.value) SEPARATOR '|||') 
         FROM ${spbPrefix}site_tmplvar_contentvalues tvc 
         JOIN ${spbPrefix}site_tmplvars tv ON tv.id = tvc.tmplvarid 
         WHERE tvc.contentid = c.id) as tvs
      FROM ${spbPrefix}site_content c
      WHERE c.template = 7 AND c.id = ?
    `, [id]);
    res.json((doctors as any[])[0] || { error: "Doctor not found" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Запрос 5 — СПБ, PriceItems с примерами всех значений поля tab: GET /api/qa/spb/price_items
router.get("/spb/price_items", async (req, res) => {
  try {
    const spbPrefix = getSpbPrefix();
    const [tabs] = await spbPool.query(`
      SELECT tab, COUNT(*) as count, MIN(name) as example_name, MIN(price) as example_price
      FROM ${spbPrefix}pricelist_items2
      GROUP BY tab
    `);
    res.json(tabs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
