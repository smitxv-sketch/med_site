import { dbChel } from './server/dbChel.js';

async function test() {
  try {
    const [rows] = await dbChel.query('SHOW TABLES');
    console.log('Connection successful! Tables:', rows);
    process.exit(0);
  } catch (e) {
    console.error('Connection failed:', e);
    process.exit(1);
  }
}
test();
