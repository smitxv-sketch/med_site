import { Calendar, FileText, Home, Stethoscope, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface BottomNavClassicItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

/** Пункты меню для вариантов A–D */
export const BOTTOM_NAV_ITEMS_CLASSIC: BottomNavClassicItem[] = [
  { icon: Home, label: 'Главная', path: '/' },
  { icon: Stethoscope, label: 'Врачи', path: '/doctors' },
  { icon: Calendar, label: 'Запись', path: '/booking' },
  { icon: FileText, label: 'Услуги', path: '/prices' },
  { icon: User, label: 'ЛК', path: '/profile' },
];
