import { dbChel } from './server/dbChel.js';

async function run() {
  try {
    const [posts]: any = await dbChel.query(`
      SELECT post_type, COUNT(*) as count
      FROM wp_posts
      WHERE post_type LIKE '%banner%'
      GROUP BY post_type
    `);
    console.log("Banner Post Types:");
    console.table(posts);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
run();
