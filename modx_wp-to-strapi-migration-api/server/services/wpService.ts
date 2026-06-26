import { Doctor } from '../../src/types';
import { dbChel } from '../dbChel.js';

export async function getChelReviews(limit = 50, offset = 0) {
  try {
    const [posts]: any = await dbChel.query(
      `SELECT ID, post_title, post_name, post_date, post_content, post_modified
       FROM wp_posts
       WHERE post_type = 'otzivi' AND post_status = 'publish'
       ORDER BY post_date DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    if (posts.length === 0) return [];

    const postIds = posts.map((p: any) => p.ID);

    const [meta]: any = await dbChel.query(
      `SELECT post_id, meta_key, meta_value
       FROM wp_postmeta
       WHERE post_id IN (?)
         AND meta_key NOT LIKE '\\_%'
         AND meta_key NOT LIKE 'dextra%'`,
      [postIds]
    );

    return posts.map((post: any) => {
      const postMeta = meta.filter((m: any) => m.post_id === post.ID);
      const metaObj: any = {};
      postMeta.forEach((m: any) => {
        metaObj[m.meta_key] = m.meta_value;
      });

      return {
        id: post.ID,
        city: 'chel',
        title: post.post_title,
        alias: post.post_name,
        content: post.post_content,
        created: post.post_date,
        updated: post.post_modified,
        ...metaObj
      };
    });
  } catch (error) {
    console.error('Error fetching Chelyabinsk reviews:', error);
    return [];
  }
}

export async function getChelDirections(limit = 100, offset = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        t.term_id as id,
        t.name,
        t.slug,
        tt.taxonomy,
        tt.description,
        tt.parent
      FROM wp_terms t
      INNER JOIN wp_term_taxonomy tt ON t.term_id = tt.term_id
      WHERE tt.taxonomy IN ('directions', 'category')
      ORDER BY t.term_id ASC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    return rows.map((r: any) => ({ ...r, city: 'chel' }));
  } catch (error) {
    console.error("Error fetching Chel directions:", error);
    return [];
  }
}

export async function getChelNews(limit: number = 100, offset: number = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias,
        p.post_content as content,
        p.post_date as created,
        p.post_modified as edited
      FROM wp_posts p
      WHERE p.post_type = 'novosti' AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key NOT LIKE '\\_%' 
        AND meta_key NOT LIKE 'dextra\\_%'
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'news'
    }));
  } catch (error) {
    console.error("Error fetching Chel news:", error);
    throw error;
  }
}

export async function getChelVacancies(limit: number = 100, offset: number = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias,
        p.post_content as content,
        p.post_date as created,
        p.post_modified as edited
      FROM wp_posts p
      WHERE p.post_type = 'vakansii' AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key NOT LIKE '\\_%' 
        AND meta_key NOT LIKE 'dextra\\_%'
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'vacancy'
    }));
  } catch (error) {
    console.error("Error fetching Chel vacancies:", error);
    throw error;
  }
}

export async function getChelClinics(limit = 100, offset = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias,
        p.post_content as content,
        p.post_date as created,
        p.post_modified as edited
      FROM wp_posts p
      WHERE p.post_type = 'clinics' AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key NOT LIKE '\\_%' 
        AND meta_key NOT LIKE 'dextra\\_%'
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'location'
    }));
  } catch (error) {
    console.error("Error fetching Chel clinics:", error);
    throw error;
  }
}

export async function getChelArticles(limit = 100, offset = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias,
        p.post_content as content,
        p.post_date as created,
        p.post_modified as edited
      FROM wp_posts p
      WHERE p.post_type = 'articles' AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key NOT LIKE '\\_%' 
        AND meta_key NOT LIKE 'dextra\\_%'
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'article'
    }));
  } catch (error) {
    console.error("Error fetching Chel articles:", error);
    throw error;
  }
}

export async function getChelFaq(limit = 100, offset = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias,
        p.post_date as created
      FROM wp_posts p
      WHERE p.post_type = 'vopros_otvet' AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key IN ('name', 'question_text', 'question_date', 'answer_text', 'answer_date', 'doctor_id', 'directions', 'service_id', 'enabled')
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'faq'
    }));
  } catch (error) {
    console.error("Error fetching Chel FAQ:", error);
    throw error;
  }
}

export async function getChelAdvantages(limit = 100, offset = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias
      FROM wp_posts p
      WHERE p.post_type = 'advantages' AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key IN ('text', 'image', 'ord', 'enabled')
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'advantage'
    }));
  } catch (error) {
    console.error("Error fetching Chel advantages:", error);
    throw error;
  }
}

export async function getChelAnonces(limit = 100, offset = 0) {
  try {
    const [rows]: any = await dbChel.query(`
      SELECT 
        p.ID as id,
        p.post_title as title,
        p.post_name as alias,
        p.post_type as subtype
      FROM wp_posts p
      WHERE p.post_type IN ('anonces', 'home_anonces') AND p.post_status = 'publish'
      ORDER BY p.post_date DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    if (rows.length === 0) return [];

    const postIds = rows.map((r: any) => r.id);
    
    // Fetch meta
    const [metaRows]: any = await dbChel.query(`
      SELECT post_id, meta_key, meta_value
      FROM wp_postmeta
      WHERE post_id IN (?)
        AND meta_key IN ('header', 'anonce', 'anonce_link', 'anonce_image', 'image', 'ord', 'enabled', 'adv_token', 'anonce_video')
    `, [postIds]);

    const metaMap: Record<number, any> = {};
    metaRows.forEach((row: any) => {
      if (!metaMap[row.post_id]) metaMap[row.post_id] = {};
      metaMap[row.post_id][row.meta_key] = row.meta_value;
    });

    return rows.map((row: any) => ({
      ...row,
      ...metaMap[row.id],
      city: 'chel',
      type: 'anonce'
    }));
  } catch (error) {
    console.error("Error fetching Chel anonces:", error);
    throw error;
  }
}

export async function getChelServices(limit = 50, offset = 0) {
  try {
    // 1. Получаем базовые данные услуг (с лимитом!)
    const [posts]: any = await dbChel.query(
      `SELECT ID, post_title, post_name, post_date, post_modified
       FROM wp_posts
       WHERE post_type = 'services' AND post_status = 'publish'
       ORDER BY ID DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    if (posts.length === 0) return [];

    const postIds = posts.map((p: any) => p.ID);

    // 2. Получаем мета-поля, исключая системные и dextra
    const [meta]: any = await dbChel.query(
      `SELECT post_id, meta_key, meta_value
       FROM wp_postmeta
       WHERE post_id IN (?)
         AND meta_key NOT LIKE '\\_%'
         AND meta_key NOT LIKE 'dextra%'`,
      [postIds]
    );

    // 3. Получаем таксономии (категории/направления)
    const [taxonomies]: any = await dbChel.query(
      `SELECT tr.object_id, tt.taxonomy, t.name, t.slug
       FROM wp_term_relationships tr
       JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
       JOIN wp_terms t ON tt.term_id = t.term_id
       WHERE tr.object_id IN (?)`,
      [postIds]
    );

    // 4. Собираем всё вместе
    return posts.map((post: any) => {
      const postMeta = meta.filter((m: any) => m.post_id === post.ID);
      const postTax = taxonomies.filter((t: any) => t.object_id === post.ID);

      const metaObj: any = {};
      postMeta.forEach((m: any) => {
        metaObj[m.meta_key] = m.meta_value;
      });

      const taxObj: any = {};
      postTax.forEach((t: any) => {
        if (!taxObj[t.taxonomy]) taxObj[t.taxonomy] = [];
        taxObj[t.taxonomy].push({ name: t.name, slug: t.slug });
      });

      return {
        id: post.ID,
        city: 'chel',
        title: post.post_title,
        alias: post.post_name,
        created: post.post_date,
        updated: post.post_modified,
        ...metaObj,
        taxonomies: taxObj
      };
    });
  } catch (error) {
    console.error('Error fetching Chelyabinsk services:', error);
    return [];
  }
}

export async function getChelDoctors(): Promise<Doctor[]> {
  try {
    const baseEndpoint = process.env.WP_API_ENDPOINT || 'https://ci74.ru/api/rest.php';
    const url = baseEndpoint.includes('?')
      ? `${baseEndpoint}&action=get_doctors`
      : `${baseEndpoint}?action=get_doctors`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const doctors = await response.json();

    return doctors.map((doc: any) => {
      // Парсинг JSON-полей, если они есть
      let education_history = [];
      let badges = [];
      let raw_meta = {};

      try { if (doc.education_history) education_history = JSON.parse(doc.education_history); } catch (e) {}
      try { if (doc.badges) badges = JSON.parse(doc.badges); } catch (e) {}
      try { if (doc.raw_meta) raw_meta = JSON.parse(doc.raw_meta); } catch (e) {}

      // Склеиваем rank из доступных полей, как просили
      const rankParts = [doc.position, doc.zvanie, doc.degree, doc.category].filter(Boolean);
      const rank = rankParts.join(', ');

      return {
        id: doc.wp_user_id || doc.id,
        city: 'chel',
        qms_id: doc.qms_id,
        pagetitle: doc.display_name || 'Без имени',
        alias: `doctor-${doc.wp_user_id || doc.id}`, // В WP может не быть alias, генерируем
        photo: doc.photo_url || '',
        specialization: doc.specialty || '',
        rank: rank,
        experience: doc.experience_years || 0,
        education: doc.education_text || '',
        description: doc.description || '',
        anonce: doc.anonce || '',
        activities: doc.activities || '',
        education_history: education_history,
        badges: badges,
        price: doc.price || 0,
        duration: doc.duration || 0,
        is_child_doctor: doc.is_child_doctor === 1 || doc.is_child_doctor === '1' || doc.is_child_doctor === true,
        is_adult_doctor: doc.is_adult_doctor === 1 || doc.is_adult_doctor === '1' || doc.is_adult_doctor === true,
        raw_data: raw_meta
      };
    });
  } catch (error) {
    console.error('Error fetching Chelyabinsk doctors via API:', error);
    return [];
  }
}
