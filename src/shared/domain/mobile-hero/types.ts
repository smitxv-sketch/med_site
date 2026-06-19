export interface MobileHeroChipContent {
  label: string;
  path: string;
}

export interface MobileHeroTabContent {
  key: string;
  label: string;
  allDirectionsPath: string;
  totalCount: number;
  chips: MobileHeroChipContent[];
}

export interface MobileHeroCtaContent {
  phone: string;
  phoneHref: string;
}

export interface MobileHeroContentFile {
  cta: MobileHeroCtaContent;
  tabs: Record<string, MobileHeroTabContent>;
}
