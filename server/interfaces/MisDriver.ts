export interface MisSlot {
  id: string;
  time: string;
  date: string;
  isAvailable: boolean;
  price: number;
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

export interface MisDoctor {
  id: string;
  name: string;
  specialty: string;
  image?: string;
  experienceYears?: number;
  badges?: DoctorBadge[];
  offerings?: DoctorOffering[];
}

export interface MisService {
  id: string;
  name: string;
  price: number;
}

export interface MisAppointment {
  success: boolean;
  data?: any;
  error?: string;
  details?: any;
}

export interface MisDriver {
  getDoctors(cityCode: string, specialty?: string): Promise<MisDoctor[]>;
  getServices(cityCode: string): Promise<MisService[]>;
  getSlots(cityCode: string, doctorId: string, date?: string, specialty?: string): Promise<MisSlot[]>;
  createAppointment(cityCode: string, data: any): Promise<MisAppointment>;
}
