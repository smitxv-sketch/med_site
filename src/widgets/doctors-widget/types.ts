import { Doctor } from '@/widget/types';

export interface ProcessedDoctor extends Doctor {
  displaySpecialty?: string;
  isPromo?: boolean;
}
