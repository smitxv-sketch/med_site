import { dbChel } from './server/dbChel';

async function test() {
  try {
    const [rows] = await dbChel.query('SELECT 1 as val');
    console.log("Connection successful:", rows);
  } catch (e) {
    console.error("Connection failed:", e);
  }
  process.exit(0);
}
test();
