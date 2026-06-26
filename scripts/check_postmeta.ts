import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkPostMeta() {
  const dbConfig = {
    host: process.env.CHEL_DB_HOST,
    user: process.env.CHEL_DB_USER,
    password: process.env.CHEL_DB_PASSWORD,
    database: process.env.CHEL_DB_NAME,
  };

  if (!dbConfig.host) {
    console.log('No DB config');
    return;
  }

  const pool = mysql.createPool(dbConfig);
  const prefix = process.env.CHEL_DB_PREFIX || 'wp_';

  const photoIds = [153277, 9082];
  
  try {
    const [rows] = await pool.execute(`
      SELECT post_id, meta_key, meta_value FROM ${prefix}postmeta WHERE post_id IN (?, ?) AND meta_key = '_wp_attached_file'
    `, photoIds);
    
    console.log('DB Results for postmeta:', rows);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

checkPostMeta();
