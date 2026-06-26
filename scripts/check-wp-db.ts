import * as dotenv from 'dotenv';
dotenv.config();
import { getPool } from './server/services/wpService.js';

async function check() {
  const pool = getPool();
  if (!pool) {
    console.log('No pool');
    return;
  }
  const prefix = process.env.CHEL_DB_PREFIX || 'wp_';
  
  // Check users with role 'doctor'
  const [userMetaRows] = await pool.execute(`
    SELECT COUNT(*) as count 
    FROM ${prefix}usermeta 
    WHERE meta_key = '${prefix}capabilities' 
    AND meta_value LIKE '%doctor%'
  `);
  console.log('Users with role doctor:', (userMetaRows as any)[0].count);

  // Check posts with type 'doctor'
  const [postRows] = await pool.execute(`
    SELECT COUNT(*) as count 
    FROM ${prefix}posts 
    WHERE post_type = 'doctor' AND post_status = 'publish'
  `);
  console.log('Published posts of type doctor:', (postRows as any)[0].count);

  process.exit(0);
}
check();
