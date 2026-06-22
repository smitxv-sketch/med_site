import { pool as spbPool, getPrefix } from '../server/db.js';

async function search() {
  try {
    const prefix = getPrefix();
    
    const [content] = await spbPool.query(`
      SELECT c.id, c.pagetitle, c.template
      FROM ${prefix}site_content c
      WHERE c.pagetitle LIKE '%сертификат%' OR c.pagetitle LIKE '%Сертификат%'
    `);
    console.log(content);

  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

search();