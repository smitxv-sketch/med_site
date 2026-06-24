import { z } from 'zod';

const variantLetter = <T extends string>(values: [T, ...T[]]) => z.enum(values);

export const engineStateSchema = z.object({
  homePageConcept: variantLetter(['classic', 'immersive']),
  heroDesktopVariant: variantLetter(['A', 'B', 'C', 'D']),
  heroMobileVariant: variantLetter(['A', 'B', 'C', 'D', 'E', 'F']),
  bottomNavVariant: variantLetter(['A', 'B', 'C', 'D', 'E']),
  bottomNavBehavior: variantLetter([
    'always-visible',
    'hide-on-scroll-down',
    'hidden-on-top',
  ]),
  bottomNavActionAnimation: variantLetter(['pulse', 'border-beam', 'shimmer', 'neon']),
  doctorsSectionVariant: variantLetter(['A', 'B']),
  promotionsSectionVariant: variantLetter(['A', 'B', 'C', 'D', 'E']),
  quickActionsVariant: variantLetter(['none', 'A', 'B', 'C']),
  directionsIconVariant: variantLetter(['A', 'B', 'C']),
  directionsSectionVariant: variantLetter(['A', 'B', 'C', 'D']),
  colorTheme: variantLetter(['green', 'blue', 'purple', 'rose', 'custom']),
  colorIntensity: variantLetter(['pastel', 'standard', 'vibrant', 'manual']),
  appRadius: z.number().min(0).max(48),
  customHue: z.number().min(0).max(360),
  customSaturation: z.number().min(0).max(100),
  customLightness: z.number().min(0).max(100),
  fontFamily: variantLetter(['inter', 'outfit', 'playfair', 'nunito']),
  shadowStyle: variantLetter(['none', 'soft', 'hard', 'neo', 'bordered']),
  animationTheme: variantLetter(['spring', 'smooth', 'instant', 'default']),
  marketingTriggers: z.boolean(),
  layoutDensity: z.number().min(0.5).max(2),
  socialProofLevel: variantLetter(['minimal', 'balanced', 'aggressive']),
  pricingStrategy: variantLetter(['open', 'from', 'hidden']),
  urgencyLevel: variantLetter(['none', 'soft', 'hard']),
});

export const engineStatePatchSchema = engineStateSchema.partial();
