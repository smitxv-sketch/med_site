import React from 'react';
import { WidgetComponentProps } from '@/shared/ui/PageRenderer';
import { HeaderData } from './HeaderWidgetVariants';

export const HeaderWidget: React.FC<HeaderData & { variant?: string, onUpdate?: any }> = ({ 
  logo,
  navigation,
  contact,
  variant = 'classic',
  onUpdate 
}) => {

  const logoText = logo?.text || 'Логотип';
  const navItems = navigation || [];
  const phone = contact?.phone || '+7 (000) 000-00-00';
  const actionLabel = contact?.actionLabel || 'Перезвоните мне';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 border-b border-gray-200 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {logo?.url ? (
            <img src={logo.url} alt={logoText} className="h-8" />
          ) : (
            <span className="font-bold text-xl tracking-tight text-gray-900">{logoText}</span>
          )}
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((nav, i) => (
            <a key={i} href={nav.link} className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              {nav.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href={`tel:${phone.replace(/\D/g,'')}`} className="hidden md:block font-semibold text-sm text-gray-900">
            {phone}
          </a>
          <button className="px-4 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors">
            {actionLabel}
          </button>
        </div>
      </div>
    </header>
  );
};
