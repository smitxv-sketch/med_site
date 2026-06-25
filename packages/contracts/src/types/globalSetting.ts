export interface GlobalSettingDto {
  locale: string;
  siteName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  /** Tone of voice для AI / копирайтинга */
  brandVoice?: string;
}

