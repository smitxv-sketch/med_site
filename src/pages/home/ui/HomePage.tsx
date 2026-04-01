import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { HeroSection } from './sections/HeroSection';
import { HeroImmersive } from './sections/HeroImmersive';
import { PromotionsSection } from './sections/PromotionsSection';
import { SpecialOffersSection } from './sections/SpecialOffersSection';
import { DirectionsSection } from './sections/DirectionsSection';
import { DoctorsSection } from './sections/DoctorsSection';
import { LocationsSection } from './sections/LocationsSection';
import { useUISettingsStore } from '../../../shared/store/uiSettingsStore';
import { VariantSwitcher } from '../../../shared/ui/VariantSwitcher';

export function HomePage() {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);
  const { homePageConcept, setHomePageConcept } = useUISettingsStore();

  useEffect(() => {
    const auth = localStorage.getItem('home_authorized');
    if (auth === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2603') {
      setIsAuthorized(true);
      localStorage.setItem('home_authorized', 'true');
      setError(false);
    } else {
      setError(true);
      setPassword('');
      // Shake effect or feedback
    }
  };

  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f8f9fa]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl border border-gray-100 mx-4"
        >
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-brand-green" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Доступ ограничен</h1>
              <p className="text-gray-500">Введите пароль для просмотра главной страницы</p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Пароль"
                  className={`w-full px-6 py-4 bg-gray-50 border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all text-center text-2xl tracking-[0.5em] font-mono`}
                  autoFocus
                />
                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2"
                  >
                    Неверный пароль
                  </motion.p>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-brand-green text-white font-bold rounded-2xl hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20 active:scale-[0.98]"
              >
                Войти
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      {/* Concept Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <VariantSwitcher
          variants={['classic', 'immersive']}
          labels={{ classic: 'Классический', immersive: 'Иммерсивный' }}
          currentVariant={homePageConcept}
          onChange={(v) => setHomePageConcept(v as 'classic' | 'immersive')}
          mode="pill"
        />
      </div>

      <div className="flex flex-col gap-16">
        {homePageConcept === 'immersive' ? <HeroImmersive /> : <HeroSection />}
        
        <PromotionsSection />
        <SpecialOffersSection />
        <DirectionsSection />
        <DoctorsSection />
        <LocationsSection />
      </div>
    </motion.div>
  );
}

