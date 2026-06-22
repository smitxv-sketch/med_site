import { dbChel } from './server/dbChel.js';

async function analyze() {
  try {
    const [metaRows]: any = await dbChel.query(`
      SELECT meta_value
      FROM wp_postmeta
      WHERE meta_key = 'doctor_id' AND meta_value != ''
      LIMIT 10
    `);
    console.log("Review doctor_id values:", metaRows);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
analyze();
