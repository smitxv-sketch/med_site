import React from 'react';
import { Home, Stethoscope, FileText, Calendar, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUISettingsStore } from '../../../shared/store/uiSettingsStore';
import { VariantSwitcher } from '../../../shared/ui/VariantSwitcher';

interface BottomNavVariantsProps {
  isHidden: boolean;
}

export function BottomNavVariants({ isHidden }: BottomNavVariantsProps) {
  const location = useLocation();
  const variant = useUISettingsStore(state => state.bottomNavVariant);
  const setVariant = useUISettingsStore(state => state.setBottomNavVariant);

  const navItems = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: Stethoscope, label: 'Врачи', path: '/doctors' },
    { icon: Calendar, label: 'Запись', path: '/booking' },
    { icon: FileText, label: 'Услуги', path: '/services' },
    { icon: User, label: 'ЛК', path: '/profile' },
  ];

  // Вариант А: Классический (как было)
  const renderVariantA = () => (
    <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-teal-50' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  // Вариант B: Кнопка "Запись" выделена легким фоном
  const renderVariantB = () => (
    <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isBooking = item.path === '/booking';
        const Icon = item.icon;
        
        if (isBooking) {
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors ${
                isActive ? 'bg-brand-green text-white shadow-md shadow-brand-green/20' : 'bg-brand-green/10 text-brand-green hover:bg-brand-green/20'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </Link>
          );
        }

        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              isActive ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-teal-50' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  // Вариант C: Кнопка "Запись" с иконкой плюса/календаря в кружке с бордером
  const renderVariantC = () => (
    <div className="max-w-md mx-auto flex items-center justify-between px-6 py-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const isBooking = item.path === '/booking';
        const Icon = item.icon;
        
        if (isBooking) {
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className="flex flex-col items-center justify-center -mt-4 relative group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                isActive ? 'bg-brand-green text-white shadow-brand-green/30 scale-105' : 'bg-white text-brand-green border-2 border-brand-green/20 hover:border-brand-green/40'
              }`}>
                <Icon className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive ? 'text-brand-green' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors mt-1 ${
              isActive ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-teal-50' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  // Вариант D: Иконки ВСЕГДА в корпоративных цветах (эксперимент "Светофор")
  const renderVariantD = () => (
    <div className="max-w-md mx-auto flex items-center justify-between px-6 py-3">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        // Определяем базовый цвет иконки в зависимости от пункта меню
        let baseColorClass = 'text-gray-400';
        let activeBgClass = '';
        
        if (item.path === '/') {
          baseColorClass = 'text-emerald-500';
          activeBgClass = 'fill-emerald-50';
        } else if (item.path === '/doctors') {
          baseColorClass = 'text-blue-500';
          activeBgClass = 'fill-blue-50';
        } else if (item.path === '/booking') {
          baseColorClass = 'text-orange-500';
          activeBgClass = 'fill-orange-50';
        } else if (item.path === '/services') {
          baseColorClass = 'text-purple-500';
          activeBgClass = 'fill-purple-50';
        } else if (item.path === '/profile') {
          baseColorClass = 'text-cyan-500';
          activeBgClass = 'fill-cyan-50';
        }
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              isActive ? `${baseColorClass} opacity-100 scale-110` : `${baseColorClass} opacity-60 hover:opacity-80`
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? activeBgClass : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Gradient blur backdrop for smooth transition */}
      <motion.div 
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: "100%" }
        }}
        initial="visible"
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed bottom-0 left-0 right-0 h-24 z-30 pointer-events-none backdrop-blur-md [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] md:hidden" 
      />
      
      <motion.nav 
        variants={{
          visible: { y: 0 },
          hidden: { y: "150%" }
        }}
        initial="visible"
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed bottom-4 left-4 right-4 z-40 bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl md:hidden pb-safe ${
          variant === 'C' ? 'border-t-2 border-brand-green/10' : 'border border-white/20'
        }`}
      >
        {/* Переключатель вариантов для авторизованных пользователей */}
        <VariantSwitcher
          variants={['A', 'B', 'C', 'D'] as const}
          currentVariant={variant}
          onChange={setVariant}
          mode="pill"
          className="absolute -top-10 left-1/2 -translate-x-1/2"
        />

        {variant === 'A' && renderVariantA()}
        {variant === 'B' && renderVariantB()}
        {variant === 'C' && renderVariantC()}
        {variant === 'D' && renderVariantD()}
      </motion.nav>
    </>
  );
}
