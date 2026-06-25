import type { SocialLinkDto } from './socialLink.js';

export type { SocialLinkDto, SocialPlatform } from './socialLink.js';

export interface GlobalSettingDto {
  locale: string;
  siteName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  /** Соцсети и мессенджеры — per locale (tenant) */
  socialLinks?: SocialLinkDto[];
  /** Tone of voice для AI / копирайтинга */
  brandVoice?: string;
}
