import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function checkPhotos() {
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
      SELECT ID, guid, post_type FROM ${prefix}posts WHERE ID IN (?, ?)
    `, photoIds);
    
    console.log('DB Results for photos:', rows);
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

checkPhotos();
