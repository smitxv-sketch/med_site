import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const getBranches = async () => {
  const response = await api.get('/branches');
  return response.data;
};

export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const getAllDoctors = async () => {
  const [doctorsResponse, branchesResponse] = await Promise.all([
    api.get('/wp-doctors'),
    api.get('/branches')
  ]);
  
  const branches = branchesResponse.data;
  const rawDoctors = doctorsResponse.data;
  const doctorsMap = new Map<string, any>();

  rawDoctors.forEach((d: any) => {
    const key = String(d.ID);
    if (!doctorsMap.has(key)) {
      doctorsMap.set(key, {
        id: key, // Use WP ID as main ID
        name: d.display_name,
        specialty: d.specialty,
        image: d.photo_url,
        experienceYears: d.experience_years ? parseInt(d.experience_years) : undefined,
        badges: d.badges || [], 
        offerings: [],
        // Rich Data
        price: d.price ? parseInt(d.price) : undefined,
        description: d.description,
        educationText: d.educationText,
        educationHistory: d.educationHistory,
        degree: d.degree,
        category: d.category,
        position: d.position,
        zvanie: d.zvanie,
        isChildDoctor: d.isChildDoctor,
        isAdultDoctor: d.isAdultDoctor,
        duration: d.duration,
        anonce: d.anonce,
        activities: d.activities,
        rawMeta: d.rawMeta,
        qmsIds: d.qms_id ? String(d.qms_id).split(',').map((id: string) => id.trim()).filter(Boolean) : []
      });
    }
    
    const doctor = doctorsMap.get(key);
    // Find branches
    const qmsIds = d.qms_id ? d.qms_id.split(',').map((id: string) => id.trim()).filter(Boolean) : [];
    const sortedCodes = Object.keys(branches).sort((a, b) => b.length - a.length);
    
    qmsIds.forEach((qmsId: string) => {
      let branchCode = '';
      for (const code of sortedCodes) {
        if (qmsId.startsWith(code)) {
          branchCode = code;
          break;
        }
      }
      
      if (branchCode) {
         const branch = branches[branchCode];
         // Check if offering already exists
         if (!doctor.offerings.find((o: any) => o.id === qmsId)) {
           doctor.offerings.push({
             id: qmsId,
             branch: {
               id: branchCode,
               name: branch.name,
               short: branch.short,
               address: branch.short || branch.address || ''
             },
             price: 0, 
             is_primary: false
           });
         }
      }
    });
  });

  return Array.from(doctorsMap.values());
};

export const getDoctors = async (specialty?: string) => {
  const response = await api.get('/doctors', {
    params: { specialty }
  });
  return response.data;
};

export const getTheme = async () => {
  const response = await api.get('/theme');
  return response.data;
};

export const getSlots = async (city: string, doctorId: string, date: string, specialty?: string) => {
  const response = await api.get('/slots', {
    params: { city, doctor_id: doctorId, date, specialty },
  });
  return response.data;
};

export const bookAppointment = async (data: any) => {
  const response = await api.post('/book', data);
  return response.data;
};

export const getConfig = async () => {
  const response = await api.get('/config');
  return response.data;
};

export const getText = async () => {
  const response = await api.get('/text');
  return response.data;
};

export const getDiagnostics = async () => {
  const response = await api.get('/diagnostics');
  return response.data;
};

export const testConnection = async (city: string) => {
  const response = await api.get('/diagnostics/test-connection', { params: { city } });
  return response.data;
};
