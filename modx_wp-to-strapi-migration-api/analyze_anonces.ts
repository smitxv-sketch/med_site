import { dbChel } from './server/dbChel.js';

async function run() {
  try {
    const [meta]: any = await dbChel.query(`
      SELECT meta_key, COUNT(*) as count, MAX(meta_value) as sample_value
      FROM wp_postmeta
      WHERE post_id IN (SELECT ID FROM wp_posts WHERE post_type IN ('anonces', 'home_anonces'))
      GROUP BY meta_key
      ORDER BY count DESC
    `);
    console.log("Anonces Meta Keys:");
    console.table(meta);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
run();
