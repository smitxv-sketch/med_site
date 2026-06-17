import { useState, useEffect } from 'react';
import { useUISettingsStore } from '@/shared/store/uiSettingsStore';

export function useSecretUnlocker() {
  const store = useUISettingsStore();
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  
  // Keyboard Remove old cmd sequence
  useEffect(() => {
    // Relying on Ctrl+m from DevModeToggle instead
  }, []);

  // Mobile secret unlock (3 quick taps)
  const handleSecretTap = () => {
    const now = Date.now();
    if (now - lastTap > 1000) {
      setTapCount(1);
    } else {
      setTapCount(prev => prev + 1);
      if (tapCount + 1 >= 3) {
        store.unlockCommandCenter();
        setTapCount(0);
      }
    }
    setLastTap(now);
  };

  return { handleSecretTap, isUnlocked: store.isCommandCenterUnlocked };
}
