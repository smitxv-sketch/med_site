export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  familyProfileMode: boolean;
}

export interface QuickActionItem {
  id: string;
  icon: string;
  label: string;
  action: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  bgUrl: string;
  actionUrl: string;
}

export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
}

export interface Appointment {
  id: string;
  date: Date;
  address: string;
  doctor: DoctorInfo;
  room?: string;
}

export interface HealthStory {
  id: string;
  title: string;
  imgUrl: string;
  actionUrl?: string;
}
