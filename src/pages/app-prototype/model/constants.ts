import { LOYALTY_TIER_STYLES } from '@/shared/config/designTokens';

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
  { id: 'start', name: 'Старт', discount: '3%', ...LOYALTY_TIER_STYLES.start },
  { id: 'comfort', name: 'Комфорт', discount: '5%', ...LOYALTY_TIER_STYLES.comfort },
  { id: 'premium', name: 'Премиум', discount: '7%', ...LOYALTY_TIER_STYLES.premium },
  { id: 'vip', name: 'VIP', discount: '10%', ...LOYALTY_TIER_STYLES.vip },
];
