import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function check() {
  const db = await createConnection({
    host: process.env.SPB_DB_HOST,
    port: Number(process.env.SPB_DB_PORT),
    user: process.env.SPB_DB_USER,
    password: process.env.SPB_DB_PASSWORD,
    database: process.env.SPB_DB_NAME,
  });
  const prefix = process.env.SPB_DB_PREFIX || 'modx_';

  const [tvs]: any = await db.query(`
    SELECT tv.name, tvc.value
    FROM ${prefix}site_tmplvar_contentvalues tvc
    JOIN ${prefix}site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tvc.contentid = 78 AND tv.name IN ('docImg', 'image', 'img')
  `);
  console.log(tvs);
  await db.end();
}
check().catch(console.error);
