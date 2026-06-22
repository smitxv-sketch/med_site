import { dbChel } from './server/dbChel.js';

async function analyze() {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT * FROM wp_posts WHERE ID IN (99, 566, 1092, 877)
    `);
    console.log("Posts:", rows.map(r => ({ ID: r.ID, post_type: r.post_type, post_title: r.post_title })));
    
    const [terms]: any = await dbChel.query(`
      SELECT * FROM wp_terms WHERE term_id IN (99, 566, 1092, 877)
    `);
    console.log("Terms:", terms);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
analyze();
