import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, MapPin } from 'lucide-react';
import { UserProfile } from '../../model/types';
import { useUserProfilesRepository } from '../../../../shared/di/DIContext';
import { useUISettingsStore } from '../../../../shared/store/uiSettingsStore';

interface AppHeaderProps {
  user: UserProfile;
  city: string;
  onChangeUser: (userId: string) => void;
  onCityClick: () => void;
}

export function AppHeader({ user, city, onChangeUser, onCityClick }: AppHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const { homePageConcept, heroMobileVariant } = useUISettingsStore();
  const profilesRepository = useUserProfilesRepository();

  useEffect(() => {
    let active = true;
    profilesRepository.getUserProfiles().then(data => {
      if (active) setProfiles(data);
    });
    return () => { active = false; };
  }, [profilesRepository]);

  const isImmersive = heroMobileVariant === 'E';

  if (isImmersive) {
    return (
      <div className="absolute top-0 left-0 right-0 px-5 pt-12 pb-4 bg-gradient-to-b from-black/50 to-transparent relative z-40 shrink-0 flex flex-col gap-2 transition-all duration-theme pointer-events-none">
        {/* City Selector Top Bar */}
        <div className="flex items-center justify-between pointer-events-auto">
          <button onClick={onCityClick} className="flex items-center gap-1.5 text-white/90 text-[11px] font-bold uppercase tracking-wide hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5" />
            {city}
            <ChevronDown className="w-3 h-3 opacity-70" />
          </button>
          <button className="relative p-1 text-white hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm">
             <Bell className="w-5 h-5" />
             <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-transparent" />
          </button>
        </div>

        <div className="relative mt-2 pointer-events-auto">
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-3 active:scale-95 transition-transform">
            <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20" />
            <div className="text-left flex flex-col justify-center max-w-[200px]">
              <div className="flex items-center gap-1">
                <span className="font-black text-lg text-white leading-tight truncate">{user.name}</span>
                <ChevronDown className="w-4 h-4 text-white/70 shrink-0" />
              </div>
              <span className="text-xs font-semibold text-white/80 leading-tight">
                {user.familyProfileMode ? 'Управление семьей' : 'Личный профиль'}
              </span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-12 pb-4 bg-white shadow-[var(--app-shadow)] relative z-40 shrink-0 flex flex-col gap-2 transition-all duration-theme" style={{ borderBottom: 'var(--app-border)' }}>
      
      {/* City Selector Top Bar */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onCityClick}
          className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <MapPin className="w-3 h-3 text-brand" />
          <span>{city}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
        <div className="flex items-center gap-2">
          <button className="relative p-1 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5 text-gray-800" />
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between relative z-10">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0 shadow-sm border border-gray-100">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-900 leading-tight flex items-center gap-1">
              {user.name} <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">
              {user.familyProfileMode ? 'Семейный профиль' : 'Профиль пациента'}
            </div>
          </div>
        </div>
      </div>

      {/* Family Switcher Dropdown */}
      {showDropdown && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setShowDropdown(false)}
          />
          <div 
            className="absolute top-[100px] left-4 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-2 w-[240px] z-50 animate-in fade-in slide-in-from-top-4"
            style={{ borderRadius: 'var(--app-radius)' }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 px-2 pt-2">
              Семья
            </div>
            {profiles.map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  onChangeUser(profile.id);
                  setShowDropdown(false);
                }}
                className={`w-full flex items-center gap-3 p-2 transition-colors ${
                  user.id === profile.id ? 'bg-brand/10' : 'hover:bg-gray-50'
                }`}
                style={{ borderRadius: 'calc(var(--app-radius) - 8px)' }}
              >
                <img src={profile.avatarUrl} alt={profile.name} className="w-8 h-8 rounded-full" />
                <span className={`text-sm font-semibold ${user.id === profile.id ? 'text-brand' : 'text-gray-900'}`}>
                  {profile.name}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
