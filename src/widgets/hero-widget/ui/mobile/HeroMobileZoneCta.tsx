import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { MOBILE_HERO_CONFIG } from '../../config/mobileHeroConfig';

export function HeroMobileZoneCta() {
  const cfg = MOBILE_HERO_CONFIG.ctaZone;

  return (
    <div
      className="flex"
      style={{
        marginTop: cfg.marginTop,
        marginLeft: cfg.marginX,
        marginRight: cfg.marginX,
        gap: cfg.gap,
      }}
    >
      <Link
        to="/booking"
        className="flex-1 flex items-center justify-center gap-2 rounded-[30px] text-white font-semibold text-[13px] py-[13px]"
        style={{ backgroundColor: MOBILE_HERO_CONFIG.colors.brandGreen }}
      >
        <Calendar className="w-[17px] h-[17px]" strokeWidth={2} />
        Записаться
      </Link>
      <a
        href={cfg.phoneHref}
        className="flex-1 flex items-center justify-center gap-2 rounded-[30px] text-gray-900 font-medium text-[13px] py-[13px] border-[0.5px] bg-gray-100"
        style={{ borderColor: MOBILE_HERO_CONFIG.colors.borderTertiary }}
      >
        <Phone
          className="w-[17px] h-[17px]"
          style={{ color: MOBILE_HERO_CONFIG.colors.brandGreen }}
          strokeWidth={2}
        />
        Позвонить
      </a>
    </div>
  );
}
