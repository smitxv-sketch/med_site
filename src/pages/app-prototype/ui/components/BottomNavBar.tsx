import React from 'react';
import { Home, Calendar, Stethoscope, User as UserIcon, Sparkles } from 'lucide-react';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';

interface BottomNavBarProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  onAssistantClick: () => void;
}

export function BottomNavBar({ activeScreen, onScreenChange, onAssistantClick }: BottomNavBarProps) {
  const { bottomNavVariant } = useUISettingsStore();

    if (bottomNavVariant === 'B') {
      return (
        <div className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl shadow-[var(--app-shadow)] flex items-center justify-around p-2 z-30" style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}>
          <NavItem icon={<Home />} label="Главная" active={activeScreen === 'home'} onClick={() => onScreenChange('home')} />
          <NavItem icon={<Calendar />} label="Запись" active={activeScreen === 'appointments'} onClick={() => onScreenChange('appointments')} />
          
          <button onClick={onAssistantClick} className="w-12 h-12 bg-brand rounded-full shadow-lg shadow-brand/40 flex items-center justify-center text-white active:scale-95 transition-transform mx-2">
            <Sparkles className="w-5 h-5" />
          </button>
  
          <NavItem icon={<Stethoscope />} label="Врачи" active={activeScreen === 'doctors'} onClick={() => onScreenChange('doctors')} badge={true} />
          <NavItem icon={<UserIcon />} label="Профиль" active={activeScreen === 'profile'} onClick={() => onScreenChange('profile')} />
        </div>
      );
    }
  
    if (bottomNavVariant === 'C') {
      return (
        <div className="absolute bottom-0 left-0 right-0 h-[88px] bg-white flex items-stretch justify-around px-2 z-30 pb-6 rounded-t-3xl pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t" style={{ borderTop: 'var(--app-border)' }}>
          <NavItemVariantC icon={<Home />} label="Главная" active={activeScreen === 'home'} onClick={() => onScreenChange('home')} />
          <NavItemVariantC icon={<Calendar />} label="Запись" active={activeScreen === 'appointments'} onClick={() => onScreenChange('appointments')} />
          
          <div className="relative -top-4 self-start">
            <button onClick={onAssistantClick} className="w-14 h-14 bg-brand shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform -rotate-6 hover:rotate-0" style={{ borderRadius: 'var(--app-radius)' }}>
              <Sparkles className="w-6 h-6" />
            </button>
          </div>
  
          <NavItemVariantC icon={<Stethoscope />} label="Врачи" active={activeScreen === 'doctors'} onClick={() => onScreenChange('doctors')} badge={true} />
          <NavItemVariantC icon={<UserIcon />} label="Профиль" active={activeScreen === 'profile'} onClick={() => onScreenChange('profile')} />
        </div>
      );
    }
    
    if (bottomNavVariant === 'D') {
      return (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white flex items-center justify-around px-2 z-30 pb-0 border-t" style={{ borderTop: 'var(--app-border)' }}>
           <NavItemVariantD icon={<Home />} active={activeScreen === 'home'} onClick={() => onScreenChange('home')} />
           <NavItemVariantD icon={<Calendar />} active={activeScreen === 'appointments'} onClick={() => onScreenChange('appointments')} />
           
           <button onClick={onAssistantClick} className="w-10 h-10 bg-brand/10 text-brand flex items-center justify-center active:scale-95 transition-transform" style={{ borderRadius: 'calc(var(--app-radius)/2)' }}>
             <Sparkles className="w-5 h-5" />
           </button>
   
           <NavItemVariantD icon={<Stethoscope />} active={activeScreen === 'doctors'} onClick={() => onScreenChange('doctors')} badge={true} />
           <NavItemVariantD icon={<UserIcon />} active={activeScreen === 'profile'} onClick={() => onScreenChange('profile')} />
        </div>
      );
    }
  
    // Variant A - Default
    return (
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white flex items-center justify-around px-2 z-30 pb-2 sm:pb-0 border-t" style={{ borderTop: 'var(--app-border)' }}>
        <NavItem 
          icon={<Home />} 
        label="Главная" 
        active={activeScreen === 'home'} 
        onClick={() => onScreenChange('home')} 
      />
      <NavItem 
        icon={<Calendar />} 
        label="Запись" 
        active={activeScreen === 'appointments'} 
        onClick={() => onScreenChange('appointments')} 
      />
      
      {/* Action FAB (Express Booking / AI) */}
      <div className="relative -top-6">
        <button 
          onClick={onAssistantClick}
          className="w-14 h-14 bg-gradient-to-tr from-brand to-emerald-400 rounded-full shadow-[0_0_20px_rgba(101,163,13,0.4)] flex items-center justify-center text-white transition-transform active:scale-95 group relative overflow-hidden"
        >
          {/* Animated Gradients / Siri-like effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 via-emerald-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
          <div className="absolute -inset-2 bg-gradient-to-bl from-white/30 to-transparent blur-md rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
          
          <Sparkles className="w-6 h-6 relative z-10 animate-pulse" />
        </button>
      </div>

      <NavItem 
        icon={<Stethoscope />} 
        label="Врачи" 
        active={activeScreen === 'doctors'} 
        onClick={() => onScreenChange('doctors')} 
        badge={true} 
      />
      <NavItem 
        icon={<UserIcon />} 
        label="Профиль" 
        active={activeScreen === 'profile'} 
        onClick={() => onScreenChange('profile')} 
      />
    </div>
  );
}

function NavItem({ icon, label, active = false, badge = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, badge?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 w-16 transition-colors ${active ? 'text-brand' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className="relative">
        {badge && !active && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none z-0">
            <div className="absolute inset-0 rounded-full blur-[6px] opacity-40 animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400"></div>
          </div>
        )}
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 relative z-10' })}
      </div>
      <span className="text-[10px] font-medium mt-0.5">{label}</span>
    </button>
  );
}

function NavItemVariantC({ icon, label, active = false, badge = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, badge?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-start pt-3 gap-1.5 w-16 transition-all ${active ? 'text-brand translate-y-1' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className="relative">
        <div className={`absolute -inset-2 bg-brand/10 rounded-xl transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} />
        {badge && !active && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none z-0">
            <div className="absolute inset-0 rounded-full blur-[6px] opacity-40 animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400"></div>
          </div>
        )}
        {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 relative z-10 transition-transform ${active ? 'scale-110' : ''}` })}
      </div>
      <span className={`text-[10px] font-bold transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}>{label}</span>
    </button>
  );
}

function NavItemVariantD({ icon, active = false, badge = false, onClick }: { icon: React.ReactNode, active?: boolean, badge?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${active ? 'text-brand bg-brand/5' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}>
      <div className="relative z-10 transition-transform">
        {badge && !active && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 pointer-events-none z-0">
            <div className="absolute inset-0 rounded-full blur-[6px] opacity-40 animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-blue-500 via-purple-500 to-emerald-400"></div>
          </div>
        )}
        {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 outline-none relative z-10' })}
      </div>
    </button>
  );
}
