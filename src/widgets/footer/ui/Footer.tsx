import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Phone, Mail, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAccessibilityStore } from '@/shared/store/accessibilityStore';
import { Card } from '@/shared/ui/Card';
import { MedicalDisclaimer } from '@/shared/ui/MedicalDisclaimer';
import { useSiteStore } from '@/shared/store/siteStore';
import { formatTelHref } from '@/shared/lib/formatTelHref';
import { useTenant } from '@/shared/tenant/TenantContext';
import { FooterSocialLinks } from './FooterSocialLinks';
import type { NavigationDto } from '@med-site/contracts';

const FALLBACK_FOOTER_COLUMNS: NavigationDto['footerColumns'] = [
  {
    title: 'О компании',
    links: [
      { label: 'О клинике', url: '/about' },
      { label: 'Наши врачи', url: '/doctors' },
      { label: 'Вакансии', url: '/vacancies' },
      { label: 'Отзывы', url: '/reviews' },
      { label: 'Контакты', url: '/contacts' },
    ],
  },
  {
    title: 'Пациентам',
    links: [
      { label: 'Услуги и цены', url: '/prices' },
      { label: 'Акции', url: '/promotions' },
      { label: 'Программы', url: '/programs' },
      { label: 'Подготовка к анализам', url: '/preparation' },
      { label: 'Вопрос-ответ', url: '/faq' },
    ],
  },
];

export function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { toggleActive } = useAccessibilityStore();
  const navigation = useSiteStore((s) => s.navigation);
  const globalSetting = useSiteStore((s) => s.globalSetting);
  const { tenant } = useTenant();

  const phoneLabel = globalSetting?.contactPhone ?? '+7 (351) 778-88-87';
  const phoneHref = formatTelHref(phoneLabel);
  const emailLabel = globalSetting?.contactEmail ?? 'info@ci74.ru';
  const emailHref = `mailto:${emailLabel}`;
  const addressLabel =
    globalSetting?.contactAddress ?? 'г. Челябинск, ул. 40-летия Победы, 11';
  const siteName = globalSetting?.siteName ?? `Сеть клиник «Источник»`;

  const footerColumns =
    navigation?.footerColumns?.length
      ? navigation.footerColumns
      : FALLBACK_FOOTER_COLUMNS;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-white text-gray-600 pt-12 pb-24 md:pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Social Media Block - Refined Style */}
        <div className="mb-14 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 pb-12">
          <div className="text-center md:text-left max-w-xl">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">Будьте ближе к нам</h3>
            <p className="text-gray-600 text-lg leading-relaxed">Полезные советы врачей, прямые эфиры и закрытые акции только для подписчиков.</p>
          </div>
          <FooterSocialLinks />
        </div>

        {/* Accordions for Mobile / Grid for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Section 1: Выбор города */}
          <div className="border-b border-gray-100 md:border-none pb-4 md:pb-0">
            <h3 className="text-gray-900 font-bold text-lg mb-4 hidden md:block">Ваш город</h3>
            <div className="relative">
              <button 
                onClick={() => toggleSection('city')}
                className="flex items-center justify-between w-full md:w-auto bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 px-4 py-3 md:py-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 md:w-4 md:h-4 text-brand" />
                  <span className="font-medium">{tenant.displayName}</span>
                </div>
                <ChevronDown className={`w-5 h-5 md:w-4 md:h-4 transition-transform ${openSection === 'city' ? 'rotate-180 text-brand' : 'text-gray-400'}`} />
              </button>
              
              <Card className={`mt-2 p-2 md:absolute md:top-full md:left-0 md:mt-2 md:w-64 z-50 ${openSection === 'city' ? 'block' : 'hidden'}`}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 py-2">Города и клиники</div>
                
                <div className="mb-2">
                  <button className="w-full text-left px-3 py-2 text-sm font-bold text-brand bg-brand/5 rounded-lg">Челябинск</button>
                  <div className="pl-4 pr-2 py-1 space-y-1">
                    <button className="w-full text-left px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors">ЖК Александровский</button>
                    <button className="w-full text-left px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors">ЖК Подсолнухи</button>
                    <button className="w-full text-left px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors">Лесной Остров</button>
                    <button className="w-full text-left px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors">Клиника ЭКО</button>
                  </div>
                </div>

                <div>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand hover:bg-gray-50 rounded-lg transition-colors">Санкт-Петербург</button>
                </div>
              </Card>
            </div>

            {/* Visually Impaired Button (Desktop) */}
            <button 
              onClick={toggleActive}
              className="hidden md:flex items-center gap-2 mt-8 text-gray-600 hover:text-brand transition-colors font-medium bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-xl w-full justify-center group"
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Версия для слабовидящих</span>
            </button>
          </div>

          {footerColumns.map((column, colIndex) => {
            const sectionKey = `col-${colIndex}`;
            return (
              <div
                key={sectionKey}
                className="border-b border-gray-100 md:border-none pb-4 md:pb-0"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(sectionKey)}
                  className="flex items-center justify-between w-full md:cursor-default"
                >
                  <h3 className="text-gray-900 font-bold text-lg">{column.title}</h3>
                  <div className="md:hidden">
                    {openSection === sectionKey ? (
                      <ChevronUp className="w-5 h-5 text-brand" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                <ul
                  className={`mt-4 space-y-3 ${openSection === sectionKey ? 'block' : 'hidden md:block'}`}
                >
                  {column.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        to={link.url}
                        className="text-gray-600 font-medium hover:text-brand transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Section 4: Контакты */}
          <div className="md:col-span-1 border-b border-gray-100 md:border-none pb-4 md:pb-0">
            <h3 className="text-gray-900 font-bold text-lg mb-4">Контакты</h3>
            <div className="space-y-4">
              <a href={phoneHref} className="flex items-center gap-3 hover:text-brand transition-colors group">
                <div className="w-10 h-10 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-gray-900 font-bold text-xl">{phoneLabel}</div>
                  <div className="text-sm text-gray-500 font-medium">Ежедневно с 8:00 до 20:00</div>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <span className="text-sm text-gray-600 font-medium">{addressLabel}</span>
              </div>
              <a href={emailHref} className="flex items-center gap-3 hover:text-brand transition-colors group">
                <div className="w-10 h-10 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <span className="text-sm text-gray-600 font-medium">{emailLabel}</span>
              </a>
            </div>
          </div>
          
          {/* Visually Impaired Button (Mobile) */}
          <div className="md:hidden pt-2">
            <button 
              onClick={toggleActive}
              className="flex items-center justify-center gap-2 text-gray-700 hover:text-brand transition-colors font-medium bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl w-full group"
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Версия для слабовидящих</span>
            </button>
          </div>
        </div>

        {/* App Links & Quality */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-gray-100 gap-6">
          <div className="flex gap-4 w-full md:w-auto">
            <Link to="/app-launch" className="flex-1 md:flex-none bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-left relative z-10">
                <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Загрузите в</div>
                <div className="text-sm font-bold text-gray-900 leading-tight group-hover:text-brand transition-colors">App Store</div>
              </div>
            </Link>
            <Link to="/app-launch" className="flex-1 md:flex-none bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-left relative z-10">
                <div className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Доступно в</div>
                <div className="text-sm font-bold text-gray-900 leading-tight group-hover:text-brand transition-colors">Google Play</div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center justify-center gap-3 bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl w-full md:w-auto">
            <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">
              ✓
            </div>
            <span className="text-sm font-bold text-gray-900">Независимая оценка качества</span>
          </div>
        </div>

        {/* Legal Info */}
        <div className="pt-8 border-t border-gray-100 text-xs text-gray-500 font-medium space-y-4">
          <p>
            © {new Date().getFullYear()} {siteName}. Все права защищены.
          </p>
          <p>
            Лицензия № ЛО-74-01-000000 от 01.01.2020 г. выдана Министерством здравоохранения Челябинской области.
            ИНН 7400000000, ОГРН 1207400000000.
          </p>
          <p className="max-w-4xl leading-relaxed">
            Имеются противопоказания. Необходима консультация специалиста. Информация на сайте не является публичной офертой и носит справочный характер.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/privacy" className="hover:text-brand transition-colors">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-brand transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
