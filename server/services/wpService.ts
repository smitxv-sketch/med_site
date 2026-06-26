import axios from 'axios';

// The URL to the PHP script you will upload to your WordPress root
const CHEL_API_ENDPOINT = process.env.CHEL_API_ENDPOINT || 'https://ci74.ru/api/rest.php';

export const clearWpCache = async () => {
  console.log('WP Doctors cache clear requested (caching disabled)');
};

export const getWpDoctors = async () => {
  try {
    console.log('Fetching doctors from WP API endpoint...');
    const response = await axios.get(`${CHEL_API_ENDPOINT}?action=get_doctors`, { timeout: 10000 });
    const cachedRows = response.data;

    if (!Array.isArray(cachedRows) || cachedRows.length === 0) {
      console.warn('WP API returned empty or invalid data.');
      return [];
    }

    const result = cachedRows.map(row => {
      // Helper to safely parse JSON
      const parseJson = (val: any) => {
        if (!val) return undefined;
        if (typeof val === 'string') {
          try { return JSON.parse(val); } catch { return undefined; }
        }
        return val;
      };

      return {
        ID: row.wp_user_id,
        display_name: row.display_name,
        qms_id: row.qms_id ? String(row.qms_id) : '',
        specialty: row.specialty,
        photo_url: row.photo_url,
        experience_years: row.experience_years,
        price: row.price,
        duration: row.duration,
        category: row.category,
        degree: row.degree,
        zvanie: row.zvanie,
        position: row.position,
        isChildDoctor: !!row.is_child_doctor,
        isAdultDoctor: !!row.is_adult_doctor,
        educationHistory: parseJson(row.education_history),
        educationText: row.education_text,
        description: row.description,
        anonce: row.anonce,
        activities: row.activities,
        badges: parseJson(row.badges),
        rawMeta: parseJson(row.raw_meta) || {}
      };
    });

    return result;

  } catch (error: any) {
    console.error('Failed to fetch doctors from WP API endpoint:', error.message);
    return [];
  }
};

export const checkWpConnection = async () => {
  try {
    const response = await axios.get(`${CHEL_API_ENDPOINT}?action=ping`, { timeout: 5000 });
    if (response.data && response.data.status === 'ok') {
      return { connected: true };
    }
    return { connected: false, error: 'Invalid response from WP API' };
  } catch (error: any) {
    console.error('WP Connection Check Failed:', error.message);
    return { connected: false, error: error.message, host: CHEL_API_ENDPOINT };
  }
};

export const getWpDoctorByQmsId = async (qmsId: string) => {
  const doctors = await getWpDoctors();
  return doctors.find(d => {
    if (!d.qms_id) return false;
    const ids = d.qms_id.split(',').map((id: string) => id.trim());
    return ids.includes(qmsId);
  });
};

export const getWpUserMeta = async (userIds: number[], keys?: string[], patterns?: string[]) => {
  if (userIds.length === 0) return {};

  try {
    const response = await axios.post(`${CHEL_API_ENDPOINT}?action=get_meta`, {
      user_ids: userIds,
      keys: keys || [],
      patterns: patterns || []
    }, { timeout: 10000 });

    return response.data || {};
  } catch (error: any) {
    console.error('Failed to fetch WP user meta via API:', error.message);
    return {};
  }
};
