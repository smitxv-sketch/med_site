/** Поддерживаемые платформы соцсетей (SSOT для Strapi enum и UI) */
export type SocialPlatform =
  | 'vk'
  | 'ok'
  | 'max'
  | 'telegram'
  | 'youtube'
  | 'dzen';

export interface SocialLinkDto {
  platform: SocialPlatform;
  url: string;
  label?: string;
}
