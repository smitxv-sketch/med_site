import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const pool = mysql.createPool({
      host: process.env.SPB_DB_HOST || 'localhost',
      port: parseInt(process.env.SPB_DB_PORT || '3306', 10),
      user: process.env.SPB_DB_USER || 'root',
      password: process.env.SPB_DB_PASSWORD || '',
      database: process.env.SPB_DB_NAME || 'modx_database',
    });
    const [rows] = await pool.query('SHOW TABLES');
    console.log('Tables:', rows);
    process.exit(0);
  } catch (e) {
    console.error('Error:', e);
    process.exit(1);
  }
}
test();
