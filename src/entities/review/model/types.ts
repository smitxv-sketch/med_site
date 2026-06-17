export type PlatformType = 'yandex' | '2gis' | 'prodoctors' | 'napopravku' | 'internal';

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  date: string;
  text: string;
  rating: number;
  platform: PlatformType;
  platformUrl?: string;
  doctorId?: string; // If review is for a specific doctor
  doctorName?: string; // Optional embedded doctor name
  doctorSpecialty?: string;
  doctorAvatar?: string;
  clinicOnly?: boolean; // True if review is about the clinic, not a doctor
}
