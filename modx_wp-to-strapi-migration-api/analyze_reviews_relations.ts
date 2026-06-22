import { dbChel } from './server/dbChel.js';

async function analyze() {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT p.ID, p.post_title, tr.term_taxonomy_id, tt.taxonomy, t.name
      FROM wp_posts p
      LEFT JOIN wp_term_relationships tr ON p.ID = tr.object_id
      LEFT JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
      LEFT JOIN wp_terms t ON tt.term_id = t.term_id
      WHERE p.post_type = 'otzivi' AND p.post_status = 'publish'
      LIMIT 20
    `);
    console.log("Review Taxonomy Relations:", rows);
    
    const [metaRows]: any = await dbChel.query(`
      SELECT meta_key, COUNT(*) as count
      FROM wp_postmeta
      WHERE post_id IN (SELECT ID FROM wp_posts WHERE post_type = 'otzivi')
      GROUP BY meta_key
      ORDER BY count DESC
      LIMIT 20
    `);
    console.log("Review Meta Keys:", metaRows);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
analyze();
