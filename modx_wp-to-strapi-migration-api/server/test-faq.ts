import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
async function run() {
  const pool = mysql.createPool({
    host: process.env.SPB_DB_HOST,
    user: process.env.SPB_DB_USER,
    password: process.env.SPB_DB_PASSWORD,
    database: process.env.SPB_DB_NAME,
  });
  const [rows] = await pool.query(`
    SELECT tvc.value 
    FROM modx_site_tmplvar_contentvalues tvc
    JOIN modx_site_tmplvars tv ON tv.id = tvc.tmplvarid
    WHERE tv.name = 'faq_services' AND tvc.value != ''
    LIMIT 1
  `);
  console.log((rows as any)[0].value);
  process.exit(0);
}
run();
