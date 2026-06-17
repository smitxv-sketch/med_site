import { LucideIcon } from 'lucide-react';

export interface ShowcaseFact {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface ShowcaseGalleryItem {
  url: string;
  caption?: string;
}

export interface ShowcaseScrollStep {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ShowcaseData {
  id: string;
  title: string;
  subtitle?: string;
  tags: string[]; 
  description?: string;
  featuresText?: string; 
  duration?: string;
  season?: string;
  gallery: ShowcaseGalleryItem[];
  location?: {
    address: string;
    lat?: number;
    lng?: number;
  };
  facts?: ShowcaseFact[];
  scrollStory?: ShowcaseScrollStep[];
}
