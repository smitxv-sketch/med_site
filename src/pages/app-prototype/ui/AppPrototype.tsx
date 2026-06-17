import React, { useState } from 'react';
import { X, Search, Sparkles, Mic } from 'lucide-react';
import { TIERS } from '../model/constants';
import { LoyaltyCard } from './components/LoyaltyCard';
import { HeroWidget } from '../../../widgets/hero-widget/ui/HeroWidget';
import { BottomNavBar } from './components/BottomNavBar';
import { AppHeader } from './components/AppHeader';
import { QuickActions } from './components/QuickActions';
import { UpcomingAppointment } from './components/UpcomingAppointment';
import { HealthStories } from './components/HealthStories';
import { PromotionsList } from './components/PromotionsList';

import { ConceptAssistantModal } from './components/ConceptAssistantModal';
import { GiftCertificateModal } from './components/GiftCertificateModal';
import { ReferralModal } from './components/ReferralModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { DoctorsScreen } from './components/DoctorsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import BookingWidget from '../../../widget/BookingWidget';

import { 
  mockUserProfiles, 
  mockQuickActions, 
  mockAppointments, 
  mockHealthStories,
  mockPromotions,
  mockSpecialOffers
} from '../model/mock-data';
import { useUISettingsStore } from '../../../shared/store/uiSettingsStore';

/**
 * Основной компонент для прототипа мобильного приложения.
 */
export function AppPrototype() {
  const store = useUISettingsStore();
  const [currentTierIndex, setCurrentTierIndex] = useState(0);
  const [activeUserId, setActiveUserId] = useState(mockUserProfiles[0].id);
  const [activeScreen, setActiveScreen] = useState<'home' | 'doctors' | 'profile' | 'appointments'>('home');
  const [activeModal, setActiveModal] = useState<'none' | 'gift' | 'referral' | 'assistant' | 'city'>('none');
  const [city, setCity] = useState('Челябинск');

  const tier = TIERS[currentTierIndex];
  const activeUser = mockUserProfiles.find(u => u.id === activeUserId) || mockUserProfiles[0];
  const activeAppointment = mockAppointments[activeUserId];
  
  return (
    <div className="fixed inset-0 z-[100] bg-white sm:bg-black/90 flex items-start sm:items-center justify-center backdrop-blur-md overflow-hidden">
      
      {/* Desktop Close Button (Outside the phone) */}
      <button 
        onClick={() => window.location.href = '/'}
        className="hidden sm:flex absolute top-8 right-8 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors shadow-2xl border border-white/10"
        title="Закрыть прототип"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Mobile Close Button */}
      <button 
        onClick={() => window.location.href = '/'}
        className="sm:hidden absolute top-14 left-1/2 -translate-x-1/2 z-[200] bg-black/70 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-2xl border border-white/20 active:scale-95 transition-transform"
      >
        <X className="w-3.5 h-3.5" /> Закрыть демо
      </button>

      {/* Dev Tools / Presenter Switcher */}
      <div className="absolute top-8 left-8 hidden lg:flex flex-col gap-2 bg-white/10 backdrop-blur pb-4 pt-4 px-4 rounded-3xl border border-white/20 text-white shadow-2xl z-[110]">
        <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60">Тест Уровней</p>
        {TIERS.map((t, idx) => (
          <button 
            key={t.id}
            onClick={() => setCurrentTierIndex(idx)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              idx === currentTierIndex ? 'bg-white text-black shadow-lg scale-105' : 'hover:bg-white/10'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      {/* The "Phone" Container */}
      <div className="w-full sm:w-[390px] h-full sm:h-[min(844px,95svh)] bg-gray-50 flex flex-col relative sm:rounded-[var(--app-radius)] sm:border-[14px] sm:border-black overflow-hidden sm:shadow-[var(--app-shadow)] mx-auto flex-shrink-0 transition-all duration-theme">
        
        {/* Fake Hardware Dynamic Island (Mobile & Desktop) */}
        <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[100px] sm:w-[110px] h-[30px] sm:h-[32px] bg-black rounded-full z-[160] shadow-sm pointer-events-none" />

        {activeModal === 'gift' && <GiftCertificateModal onClose={() => setActiveModal('none')} />}
        {activeModal === 'referral' && <ReferralModal onClose={() => setActiveModal('none')} />}
        {activeModal === 'assistant' && <ConceptAssistantModal onClose={() => setActiveModal('none')} />}
        {activeModal === 'city' && (
          <CitySelectorModal 
            currentCity={city} 
            onSelect={(selected) => {
              setCity(selected);
              setActiveModal('none');
            }} 
            onClose={() => setActiveModal('none')} 
          />
        )}

        {/* App Header is only shown on Home Screen */}
        {activeScreen === 'home' && (
          <AppHeader 
            user={activeUser} 
            city={city}
            onChangeUser={(id) => setActiveUserId(id)} 
            onCityClick={() => setActiveModal('city')}
          />
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide bg-gray-50 relative z-10 p-0 transition-colors duration-theme">
          
          {activeScreen === 'home' && (
            <div className="w-full relative z-20">
               <HeroWidget />
            </div>
          )}
          
          {activeScreen === 'home' && (
            <div className={`p-[var(--spacing-base)] flex flex-col gap-[var(--spacing-section)] mt-2`}>
              
              {/* Show loyalty card only for the main account holder/adult context */}
              {activeUser.familyProfileMode && (
                <LoyaltyCard tier={tier} />
              )}

              <QuickActions 
                actions={mockQuickActions} 
                onActionClick={(actionId) => {
                  if (actionId === 'qa_docs') setActiveScreen('appointments');
                }}
              />

              {/* Gift & Referral Banners */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setActiveModal('gift')}
                  className="bg-gradient-to-br from-brand to-brand-light p-4 flex flex-col items-start text-left relative overflow-hidden shadow-sm active:scale-95 transition-all duration-theme"
                  style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                  <div className="text-2xl mb-1 mt-1 relative z-10">🎁</div>
                  <h4 className="text-white font-bold text-sm leading-tight relative z-10">Подарочные<br/>сертификаты</h4>
                </button>
                
                <button 
                  onClick={() => setActiveModal('referral')}
                  className="bg-gradient-to-br from-accent to-accent-light p-4 flex flex-col items-start text-left relative overflow-hidden shadow-sm active:scale-95 transition-all duration-theme"
                  style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                  <div className="text-2xl mb-1 mt-1 relative z-10">🤝</div>
                  <h4 className="text-white font-bold text-sm leading-tight relative z-10">Пригласить<br/>друга</h4>
                </button>
              </div>
              
              {activeAppointment ? (
                <UpcomingAppointment appointment={activeAppointment} />
              ) : (
               <div 
                 className="bg-white p-5 shadow-[var(--app-shadow)] flex flex-col items-center justify-center text-center py-8 hover:-translate-y-1 transition-all duration-theme cursor-pointer"
                 style={{ borderRadius: 'var(--app-radius)', border: 'var(--app-border)' }}
               >
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-2xl mb-3">📅</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">У вас нет активных записей</h3>
                  <p className="text-xs text-gray-500 font-medium mb-4">Выберите врача и запишитесь на удобное время</p>
                  <button 
                    onClick={() => setActiveScreen('doctors')}
                    className="bg-brand text-brand-fg px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-brand/20 transition-all duration-theme"
                  >
                    Выбрать специалиста
                  </button>
               </div>
              )}

              <PromotionsList promotions={mockPromotions} title="Акции" />
              
              <PromotionsList promotions={mockSpecialOffers} title="Спецпредложения" />
              
            </div>
          )}

          {activeScreen === 'appointments' && (
            <div className="h-full bg-white relative z-0 flex flex-col pt-10">
              <div className="p-4 flex flex-col justify-center sticky top-0 bg-white z-10 shrink-0">
                <h2 className="text-xl font-bold text-gray-900 pb-2">Запись на прием</h2>
              </div>
              <div className="flex-1 overflow-y-auto w-full px-2 pb-10">
                <div className="transform-gpu origin-top">
                  <BookingWidget />
                </div>
              </div>
            </div>
          )}

          {activeScreen === 'doctors' && (
            <DoctorsScreen />
          )}

          {activeScreen === 'profile' && (
            <ProfileScreen 
              user={activeUser} 
              city={city} 
              onOpenCitySelector={() => setActiveModal('city')}
              onOpenGiftModal={() => setActiveModal('gift')}
            />
          )}

        </div>

        <BottomNavBar 
          activeScreen={activeScreen}
          onScreenChange={(screen) => setActiveScreen(screen as any)}
          onAssistantClick={() => setActiveModal('assistant')}
        />
      </div>
    </div>
  );
}