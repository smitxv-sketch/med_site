import React from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import { LoyaltyTier } from '../../model/constants';

interface LoyaltyCardProps {
  tier: LoyaltyTier;
}

export function LoyaltyCard({ tier }: LoyaltyCardProps) {
  return (
    <motion.div 
      layout
      className={`${tier.bg} p-5 shadow-[var(--app-shadow)] aspect-[8/5] sm:min-h-[170px] relative overflow-hidden transition-all duration-theme flex flex-col`}
      style={{ borderRadius: 'var(--app-radius)' }}
    >
      {/* Abstract decors matching tier */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-black/0 to-white/10 pointer-events-none" />
      
      {/* Top row */}
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h2 className={`text-2xl font-black ${tier.text} leading-tight`}>{tier.name}</h2>
          <p className={`${tier.text} opacity-80 text-sm font-medium mt-1`}>Кешбэк {tier.discount}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${tier.badge}`}>
          Источник Заботы
        </div>
      </div>

      {/* Bottom row: Balance + Target / QR */}
      <div className="relative z-10 mt-auto flex items-end justify-between gap-4">
        <div className="flex-1">
          <div className={`${tier.text} opacity-70 text-[10px] font-bold uppercase tracking-wider mb-0.5`}>Ваш баланс</div>
          <div className={`text-3xl sm:text-4xl font-black tracking-tight ${tier.text} mb-3`}>
            4 650 <span className="opacity-70 text-xl sm:text-2xl">₽</span>
          </div>
          
          {/* Progress Bar (if not VIP) */}
          {!tier.vipBadge && (
            <div className="w-full max-w-[200px]">
              <div className="flex justify-between text-[10px] font-medium opacity-80 mb-1.5">
                <span className={tier.text}>Потрачено 4 650 ₽</span>
                <span className={tier.text}>Цель 30 000 ₽</span>
              </div>
              <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white rounded-full opacity-90" 
                  initial={{ width: 0 }}
                  animate={{ width: '15%' }}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Right Action (QR or VIP button) */}
        <div className="shrink-0 flex items-end h-full">
          {tier.vipBadge ? (
            <button className="bg-yellow-600 text-black px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform">
              <span className="text-lg leading-none">👨‍⚕️</span>
              Врач
            </button>
          ) : (
            <button className={`w-12 h-12 rounded-2xl bg-white/20 flex flex-col items-center justify-center backdrop-blur-md border border-white/20 shadow-sm transition-transform active:scale-95 ${tier.text}`}>
              <QrCode className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
