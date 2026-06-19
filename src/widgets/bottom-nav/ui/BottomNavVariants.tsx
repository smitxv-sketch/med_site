import React from 'react';
import { Home, Stethoscope, FileText, Calendar, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';
import { VariantSwitcher } from '@/shared/ui/VariantSwitcher';
import { BottomNavVariantE } from './BottomNavVariantE';

const ActionAnimation = ({ type, shape, className = '' }: { type: 'pulse' | 'border-beam' | 'shimmer' | 'neon', shape: 'circle' | 'rect' | 'icon', className?: string }) => {
  const roundedClass = shape === 'circle' || shape === 'icon' ? 'rounded-full' : 'rounded-xl';
  
  if (type === 'neon') {
     return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none z-0 ${className}`}>
           <div className={`absolute inset-0 blur-[6px] opacity-50 animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400 ${roundedClass}`}></div>
           <div className={`absolute inset-0 border border-white/20 mix-blend-overlay ${roundedClass}`}></div>
        </div>
     );
  }

  if (type === 'border-beam') {
    // For 'icon' shape we give it a fixed size border, for others it fills inset
    const containerClasses = shape === 'icon' 
      ? `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 -z-10`
      : `absolute -inset-[1.5px] -z-10`;

    return (
       <div className={`${containerClasses} pointer-events-none overflow-hidden ${roundedClass} ${className} isolate`}>
           <div className="absolute inset-[-50%] w-[200%] h-[200%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
             <div 
               className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_270deg,currentColor_360deg)] text-brand opacity-80 animate-[spin_3s_linear_infinite]"
             />
           </div>
           {/* Inner cutout matching Bottom Nav bg to make it look like a border. Replaced backdrop-blur with solid white for GPU performance over spinning content */}
           <div className={`absolute inset-[1.5px] bg-white ${roundedClass}`} />
       </div>
    );
  }

  if (type === 'shimmer') {
    const containerClasses = shape === 'icon' 
       ? `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10`
       : `absolute inset-0`;
    return (
       <div className={`${containerClasses} pointer-events-none z-0 overflow-hidden ${roundedClass} ${className} isolate`}>
           <div className={`absolute inset-0 bg-brand/5 ${roundedClass}`}></div>
           <div 
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-brand/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
           />
       </div>
    );
  }

  // pulse
  const pulseContainer = shape === 'icon' 
      ? `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10`
      : `absolute inset-0`;

  return (
    <div className={`${pulseContainer} pointer-events-none z-0 flex items-center justify-center ${className}`}>
        <motion.div 
          className={`absolute w-full h-full ${roundedClass} bg-brand/30`}
          animate={{ scale: [1, 1.15], opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className={`absolute w-full h-full ${roundedClass} bg-brand/10`}></div>
    </div>
  );
}

interface BottomNavVariantsProps {
  isHidden: boolean;
}

export function BottomNavVariants({ isHidden }: BottomNavVariantsProps) {
  const location = useLocation();
  const variant = useUISettingsStore(state => state.bottomNavVariant);
  const actionAnimation = useUISettingsStore(state => state.bottomNavActionAnimation) || 'pulse';
  const setVariant = useUISettingsStore(state => state.setBottomNavVariant);

  // Скрываем глобальное нижнее меню на детальных страницах, где будет Contextual Action Bar
  const isContextualPage = /^\/services\/[^/]+\/[^/]+$/.test(location.pathname) || /^\/doctors\/[^/]+$/.test(location.pathname);
  if (isContextualPage) {
    return null;
  }

  if (variant === 'E') {
    return <BottomNavVariantE isHidden={isHidden} />;
  }

  const navItems = [
    { icon: Home, label: 'Главная', path: '/' },
    { icon: Stethoscope, label: 'Врачи', path: '/doctors' },
    { icon: Calendar, label: 'Запись', path: '/booking' },
    { icon: FileText, label: 'Услуги', path: '/prices' },
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
            className={`flex flex-col items-center gap-1 transition-colors relative group ${
              isActive ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative">
              {item.path === '/booking' && !isActive && <ActionAnimation type={actionAnimation} shape="icon" />}
              <Icon className={`w-6 h-6 relative z-10 ${isActive ? 'fill-brand/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-medium tracking-tight relative z-10">{item.label}</span>
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
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl relative transition-colors z-10 ${
                isActive ? 'bg-brand text-brand-fg shadow-md shadow-brand/20' : 'bg-brand/5 text-brand hover:bg-brand/10'
              }`}
            >
              {!isActive && <ActionAnimation type={actionAnimation} shape="rect" />}
              <Icon className="w-6 h-6 relative z-10" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-tight relative z-10">{item.label}</span>
            </Link>
          );
        }

        return (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors px-2 ${
              isActive ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-brand/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
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
              className={`flex flex-col items-center justify-center -mt-4 relative group`}
            >
              <div className="relative">
                {!isActive && <ActionAnimation type={actionAnimation} shape="circle" className="scale-125 opacity-70" />}
                <div className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all z-10 ${
                  isActive ? 'bg-brand text-brand-fg shadow-brand/30 scale-105' : 'bg-white text-brand border-[1.5px] border-transparent bg-clip-padding'
                }`}>
                  <Icon className="w-6 h-6 relative z-10" strokeWidth={2.5} />
                </div>
              </div>
              <span className={`text-[10px] font-bold tracking-tight mt-1 ${isActive ? 'text-brand' : 'text-gray-500'}`}>
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
              isActive ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-brand/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
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
        className="fixed bottom-0 left-0 right-0 h-28 z-30 pointer-events-none backdrop-blur-md [mask-image:linear-gradient(to_top,black_60%,transparent_100%)] md:hidden bg-white/20" 
      />
      
      <div className="fixed bottom-4 left-0 right-0 z-40 pointer-events-none flex justify-center md:hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <motion.nav 
            data-marketing-block="true"
            data-variant={variant}
            variants={{
              visible: { y: 0 },
              hidden: { y: "150%" }
            }}
            initial="visible"
            animate={isHidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`pointer-events-auto bg-white/80 backdrop-blur-xl shadow-lg rounded-2xl pb-safe relative overflow-hidden transform-gpu ${
              variant === 'C' ? 'border-t-2 border-brand/10' : 'border border-white/20'
            }`}
          >

            {/* AnimatePresence for smooth variant switching */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={variant}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {variant === 'A' && renderVariantA()}
                  {variant === 'B' && renderVariantB()}
                  {variant === 'C' && renderVariantC()}
                  {variant === 'D' && renderVariantD()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.nav>
        </div>
      </div>
    </>
  );
}
