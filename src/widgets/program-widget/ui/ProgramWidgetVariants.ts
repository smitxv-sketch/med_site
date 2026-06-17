export interface ProgramStep {
  stepNumber?: number | string;
  title: string;
  description: string;
  tags?: string[];
  // ВЛОЖЕННЫЕ БЛОКИ: Сердце композитного подхода. Подходит под Dynamic Zones в Strapi.
  nestedBlocks?: any[]; 
}

export interface ProgramData {
  id: string;
  title: string;
  subtitle?: string;
  pricing?: string;
  duration?: string;
  capacity?: string;
  language?: string;
  gallery: { url: string; caption?: string }[];
  description: string;
  highlights: string[];
  schedule: ProgramStep[];
  features: { text: string; isIncluded: boolean }[];
  author?: {
    name: string;
    photoUrl: string;
    description: string;
    role?: string;
  };
}
