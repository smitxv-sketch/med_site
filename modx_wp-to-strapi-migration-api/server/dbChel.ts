import mysql from 'mysql2/promise';

// Пул соединений для базы данных Челябинска (WordPress)
export const dbChel = mysql.createPool({
  // Prefer CHEL_DB_* (project-specific), but allow WP_DB_* (what you may already have in Coolify)
  host: process.env.CHEL_DB_HOST || process.env.WP_DB_HOST || 'localhost',
  port: parseInt(process.env.CHEL_DB_PORT || process.env.WP_DB_PORT || '3306'),
  user: process.env.CHEL_DB_USER || process.env.WP_DB_USER || 'root',
  password: process.env.CHEL_DB_PASSWORD || process.env.WP_DB_PASSWORD || '',
  database: process.env.CHEL_DB_NAME || process.env.WP_DB_NAME || 'wordpress',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
