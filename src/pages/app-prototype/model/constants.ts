export interface LoyaltyTier {
  id: string;
  name: string;
  discount: string;
  bg: string;
  text: string;
  badge: string;
  vipBadge?: boolean;
}

export const TIERS: LoyaltyTier[] = [
  { id: 'start', name: 'Старт', discount: '3%', bg: 'bg-gradient-to-br from-[#00D09C] to-[#009E73]', text: 'text-white', badge: 'bg-white/20 text-white' },
  { id: 'comfort', name: 'Комфорт', discount: '5%', bg: 'bg-gradient-to-br from-[#E2E8F0] to-[#CBD5E1]', text: 'text-gray-900', badge: 'bg-gray-900/10 text-gray-900' },
  { id: 'premium', name: 'Премиум', discount: '7%', bg: 'bg-gradient-to-br from-[#FDE68A] to-[#D97706]', text: 'text-amber-900', badge: 'bg-amber-900/10 text-amber-900' },
  { id: 'vip', name: 'VIP', discount: '10%', bg: 'bg-gradient-to-br from-gray-900 to-black', text: 'text-white', badge: 'bg-[#D4AF37]/20 text-[#D4AF37]', vipBadge: true }
];
