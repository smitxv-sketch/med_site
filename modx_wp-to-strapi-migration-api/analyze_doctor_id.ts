import { dbChel } from './server/dbChel.js';

async function analyze() {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT * FROM wp_posts WHERE ID IN (513, 527, 539, 572)
    `);
    console.log("Posts:", rows.map(r => ({ ID: r.ID, post_type: r.post_type, post_title: r.post_title })));
    
    const [users]: any = await dbChel.query(`
      SELECT * FROM wp_users WHERE ID IN (513, 527, 539, 572)
    `);
    console.log("Users:", users.map(u => ({ ID: u.ID, display_name: u.display_name })));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
analyze();
