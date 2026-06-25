import React from 'react';
import type { SocialLinkDto, SocialPlatform } from '@med-site/contracts';
import { DEFAULT_CHEL_SOCIAL_LINKS } from '@med-site/contracts';
import { PLATFORM_COLORS } from '@/shared/config/designTokens';
import { useSiteStore } from '@/shared/store/siteStore';
import { useTenant } from '@/shared/tenant/TenantContext';

const MAX_ICON_URL = 'https://maxicons.ru/icons/Max_logo_black.svg';

function platformHoverClass(platform: SocialPlatform): string {
  if (platform === 'vk') return PLATFORM_COLORS.vk.hoverClass;
  if (platform === 'ok') return PLATFORM_COLORS.ok.hoverClass;
  return 'hover:bg-gray-900';
}

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === 'vk') {
    return (
      <svg className="h-7 w-7 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 2.162-2.807 2.89-4.97 2.659-5.472-.28-.604-1.12-.402-1.12-.402l-3.667.018c-.519-.025-.919.246-1.161.64-1.736 2.823-2.859 4.846-4.288 4.038-.27-.153-.49-.412-.594-.74-.09-.283-.128-.608-.128-1.146 0-3.158.405-4.936-1.143-5.311-.428-.103-.928-.132-1.55-.132-1.725 0-3.061.12-3.928.531-.881.419-1.13 1.014-.623 1.063 1.231.118 1.929.608 2.095 2.146.189 1.752-.05 4.133-1.228 4.544-1.419.49-2.142-1.09-4.322-4.114-.701-1.046-1.274-2.249-1.646-2.962-.475-1.012-1.124-1.163-1.706-1.163l-3.499-.013c-.725-.018-.966.364-.966.736 0 .822 1.241 3.166 3.493 6.419 3.47 5.036 6.759 8.326 11.296 8.326z" />
      </svg>
    );
  }

  if (platform === 'ok') {
    return (
      <svg className="h-7 w-7 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 11.45c2.5 0 4.53-2.03 4.53-4.53S14.5 2.4 12 2.4 7.47 4.43 7.47 6.92 9.5 11.45 12 11.45zm0-6.65c1.17 0 2.12.95 2.12 2.12s-.95 2.12-2.12 2.12-2.12-.95-2.12-2.12.95-2.12 2.12-2.12zm2.93 8.51c-.89-.26-1.87-.4-2.93-.4s-2.04.14-2.93.4c-1.69.49-2.83 1.64-3.32 3.32-.14.48-.21.99-.21 1.53 0 .41.34.76.76.76s.76-.34.76-.76c0-.42.06-.83.16-1.22.39-1.32 1.29-2.22 2.62-2.62.99-.29 2.04-.29 3.04 0 1.32.39 2.22 1.29 2.62 2.62.1.39.16.8.16 1.22 0 .41.34.76.76.76s.76-.34.76-.76c0-.54-.07-1.05-.21-1.53-.49-1.68-1.63-2.83-3.32-3.32z" />
        <path d="M16.29 16.41c-.3-.3-.78-.3-1.07 0L12 19.63l-3.22-3.22c-.3-.3-.78-.3-1.07 0-.3.3-.3.78 0 1.07l3.76 3.76c.15.15.34.22.54.22s.39-.07.54-.22l3.76-3.76c.3-.29.3-.77 0-1.07z" />
      </svg>
    );
  }

  if (platform === 'max') {
    return (
      <img
        src={MAX_ICON_URL}
        alt=""
        className="h-7 w-7 transition-transform group-hover:scale-110"
      />
    );
  }

  return (
    <span className="text-sm font-bold uppercase tracking-wide" aria-hidden>
      {platform.slice(0, 2)}
    </span>
  );
}

function resolveSocialLinks(
  fromStore: SocialLinkDto[] | undefined,
  tenantId: string,
): SocialLinkDto[] {
  if (fromStore?.length) return fromStore;
  if (tenantId === 'chel') return DEFAULT_CHEL_SOCIAL_LINKS;
  return [];
}

/** Иконки соцсетей из global-setting (Strapi per locale) */
export function FooterSocialLinks() {
  const globalSetting = useSiteStore((s) => s.globalSetting);
  const { tenantId } = useTenant();
  const links = resolveSocialLinks(globalSetting?.socialLinks, tenantId);

  if (!links.length) return null;

  return (
    <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-end">
      {links.map((link) => (
        <a
          key={`${link.platform}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label ?? link.platform}
          className={`group flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-700 transition-all duration-theme hover:text-white ${platformHoverClass(link.platform)}`}
        >
          <SocialIcon platform={link.platform} />
        </a>
      ))}
    </div>
  );
}
