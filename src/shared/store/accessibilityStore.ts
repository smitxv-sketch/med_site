import { create } from 'zustand';

interface AccessibilityState {
  isActive: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  theme: 'standard' | 'bw' | 'wb' | 'blue';
  images: 'normal' | 'grayscale' | 'hidden';

  toggleActive: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  setTheme: (theme: 'standard' | 'bw' | 'wb' | 'blue') => void;
  setImages: (images: 'normal' | 'grayscale' | 'hidden') => void;
  reset: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>((set) => ({
  isActive: false,
  fontSize: 'normal',
  theme: 'standard',
  images: 'normal',

  toggleActive: () => set((state) => {
    if (!state.isActive) {
      // When turning on, apply some default visible changes if they are still at standard
      return {
        isActive: true,
        fontSize: state.fontSize === 'normal' ? 'large' : state.fontSize,
        theme: state.theme === 'standard' ? 'bw' : state.theme,
      };
    }
    // When turning off, just hide the panel (keep settings so they persist if turned back on)
    return { isActive: false };
  }),
  setFontSize: (size) => set({ fontSize: size }),
  setTheme: (theme) => set({ theme }),
  setImages: (images) => set({ images }),
  reset: () => set({ isActive: false, fontSize: 'normal', theme: 'standard', images: 'normal' }),
}));
