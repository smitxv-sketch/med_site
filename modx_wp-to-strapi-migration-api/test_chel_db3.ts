import { dbChel } from './server/dbChel.js';

async function test() {
  try {
    const [rows] = await dbChel.query('SELECT post_type, COUNT(*) as count FROM wp_posts GROUP BY post_type ORDER BY count DESC');
    console.log('Post types:', rows);
    process.exit(0);
  } catch (e) {
    console.error('Connection failed:', e);
    process.exit(1);
  }
}
test();
