import React from 'react';
import { ChevronRight, Shield, Users, Gift, MapPin, Bell, LogOut, FileText, CreditCard, Fingerprint } from 'lucide-react';
import { UserProfile } from '../../model/types';

interface ProfileScreenProps {
  user: UserProfile;
  city: string;
  onOpenCitySelector: () => void;
  onOpenGiftModal: () => void;
}

export function ProfileScreen({ user, city, onOpenCitySelector, onOpenGiftModal }: ProfileScreenProps) {
  return (
    <div className="h-full flex flex-col bg-[#F5F7F9]">
      <div className="bg-white sticky top-0 z-10 border-b border-gray-100 p-[var(--spacing-base)] pt-[calc(var(--spacing-base)+2rem)]">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Профиль</h2>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-brand rounded-full border-2 border-white flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{user.name}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-2">+7 (999) 123-45-67</p>
            <div className="bg-brand/10 text-brand text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider inline-block">
              {user.familyProfileMode ? 'Мастер-аккаунт' : 'Профиль пациента'}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full p-[var(--spacing-base)] flex flex-col gap-[var(--spacing-gap)] pb-24">
        
        {/* Бонусы и Карты */}
        {user.familyProfileMode && (
          <div className="flex gap-[var(--spacing-gap)]">
            <div className="flex-1 bg-white p-[var(--spacing-base)] rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="text-gray-500 text-xs font-bold uppercase mb-1">Бонусы</div>
              <div className="text-2xl font-black text-brand">1 450 <span className="text-base font-medium">₽</span></div>
            </div>
            <div className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="text-gray-500 text-xs font-bold uppercase mb-1">Скидка</div>
              <div className="text-2xl font-black text-gray-900">5%</div>
            </div>
          </div>
        )}

        {/* Настройки списком */}
        <div className="space-y-4">
          
          <MenuGroup title="Семья и сервисы">
            {user.familyProfileMode && (
              <MenuItem icon={<Users className="w-5 h-5 text-blue-500" />} title="Моя семья" subtitle="Управление профилями" />
            )}
            <MenuItem icon={<FileText className="w-5 h-5 text-purple-500" />} title="Медицинская карта" subtitle="Анализы, заключения, рецепты" isSecure />
            <MenuItem icon={<CreditCard className="w-5 h-5 text-emerald-500" />} title="Мои карты и оплата" />
          </MenuGroup>

          <MenuGroup title="Лояльность">
            <MenuItem 
              icon={<Gift className="w-5 h-5 text-amber-500" />} 
              title="Подари здоровье" 
              subtitle="1000 бонусов за друга"
              onClick={onOpenGiftModal}
            />
          </MenuGroup>

          <MenuGroup title="Настройки">
            <MenuItem 
              icon={<MapPin className="w-5 h-5 text-gray-500" />} 
              title="Город" 
              value={city}
              onClick={onOpenCitySelector}
            />
            <MenuItem icon={<Bell className="w-5 h-5 text-gray-500" />} title="Уведомления" value="Включены" />
            <MenuItem icon={<Fingerprint className="w-5 h-5 text-gray-500" />} title="Вход по Face ID" hasToggle />
          </MenuGroup>

          <button className="w-full bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center gap-2 text-red-500 font-bold active:scale-95 transition-transform mt-6">
            <LogOut className="w-5 h-5" />
            Выйти из аккаунта
          </button>

          <div className="text-center pt-4 pb-8">
            <p className="text-xs text-gray-400">Версия приложения 1.0.0 (build 42)</p>
            <p className="text-xs text-gray-400 mt-1">ИМК "Источник" © 2026</p>
          </div>

        </div>
      </div>
    </div>
  );
}

// Вспомогательные компоненты для UI профиля
function MenuGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4">{title}</h4>
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col px-4">
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < React.Children.count(children) - 1 && <div className="h-px bg-gray-100 ml-10" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value?: string;
  isSecure?: boolean;
  hasToggle?: boolean;
  onClick?: () => void;
}

function MenuItem({ icon, title, subtitle, value, isSecure, hasToggle, onClick }: MenuItemProps) {
  const [toggled, setToggled] = React.useState(true);

  return (
    <div 
      onClick={hasToggle ? () => setToggled(!toggled) : onClick}
      className={`flex items-center gap-4 py-4 cursor-pointer active:opacity-70 transition-opacity ${hasToggle ? '' : 'group'}`}
    >
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-bold text-gray-900 truncate">{title}</h5>
          {isSecure && <Shield className="w-3 h-3 text-brand" />}
        </div>
        {subtitle && <p className="text-xs text-gray-500 truncate mt-0.5">{subtitle}</p>}
      </div>
      
      {value && <span className="text-xs font-semibold text-gray-400">{value}</span>}
      
      {hasToggle ? (
        <div className={`w-11 h-6 rounded-full transition-colors relative ${toggled ? 'bg-brand' : 'bg-gray-200'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${toggled ? 'left-6' : 'left-1'}`} />
        </div>
      ) : (
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
      )}
    </div>
  );
}
