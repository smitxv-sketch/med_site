export interface EducationItem {
  year: string;
  organization: string;
  specialty: string;
  type: string;
}

export interface Branch {
  name: string;
  short: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  experienceYears?: number;
  rating?: number;
  badges?: DoctorBadge[];
  offerings?: DoctorOffering[];
  // Legacy fields for compatibility
  qmsId?: string;
  qmsIds?: string[];
  databaseId?: string;
  
  // Rich Data
  price?: number;
  category?: string; // e.g. "Высшая"
  degree?: string; // e.g. "Кандидат медицинских наук"
  position?: string; // Full position text
  isChildDoctor?: boolean;
  isAdultDoctor?: boolean;
  zvanie?: string;
  duration?: string;
  anonce?: string;
  activities?: string;
  extraEducation?: string;
  conferences?: string;
  certificates?: string | string[];
  educationHistory?: EducationItem[];
  educationText?: string; // Fallback HTML
  description?: string;
  rawMeta?: any;
}

export interface DoctorBadge {
  type: 'degree' | 'category' | 'experience' | 'rating' | 'award';
  label: string;
  code: string;
}

export interface DoctorOffering {
  id: string;
  branch: {
    id: string;
    name: string;
    short?: string;
    address: string;
  };
  price: number;
  is_primary: boolean;
}

export interface Service {
  id: string;
  name: string;
  duration_minutes: number;
  price: number;
}

export interface Slot {
  time: string;
  isAvailable: boolean;
  date?: string;
}

export interface DaySchedule {
  date: string;
  dateLabel: string;
  count: number;
  shifts: string;
}
