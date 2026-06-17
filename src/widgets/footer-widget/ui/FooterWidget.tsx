import React from 'react';
import { WidgetComponentProps } from '@/shared/ui/PageRenderer';
import { FooterData } from './FooterWidgetVariants';

export const FooterWidget: React.FC<FooterData & { variant?: string, onUpdate?: any }> = ({ 
  text,
  navigation,
  socials,
  variant = 'classic',
  onUpdate 
}) => {

  const footerText = text || '© 2026 Все права защищены.';
  const navItems = navigation || [];

  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm font-medium text-gray-500">{footerText}</p>
        
        <nav className="flex items-center gap-6">
          {navItems.map((nav, i) => (
            <a key={i} href={nav.link} className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">
              {nav.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
