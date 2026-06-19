export interface ServiceDirection {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  textColor: string;
  accentBg: string;
  isVip?: boolean;
  items?: string[];
  iconColor?: string;
  iconBgLight?: string;
  iconBgSolid?: string;
}

/** Запись в content JSON (без UI-токенов) */
export interface DirectionContentRecord {
  id: string;
  title: string;
  description: string;
  image: string;
  isVip?: boolean;
  items?: string[];
}
