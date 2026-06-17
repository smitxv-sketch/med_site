import React, { useEffect } from 'react';
import { useAccessibilityStore } from '../../shared/store/accessibilityStore';

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { isActive, fontSize, theme, images } = useAccessibilityStore();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Reset classes
    html.classList.remove('a11y-font-large', 'a11y-font-xlarge');
    body.classList.remove('a11y-theme-bw', 'a11y-theme-wb', 'a11y-theme-blue', 'a11y-images-grayscale', 'a11y-images-hidden');

    if (isActive) {
      if (fontSize === 'large') html.classList.add('a11y-font-large');
      if (fontSize === 'xlarge') html.classList.add('a11y-font-xlarge');

      if (theme === 'bw') body.classList.add('a11y-theme-bw');
      if (theme === 'wb') body.classList.add('a11y-theme-wb');
      if (theme === 'blue') body.classList.add('a11y-theme-blue');

      if (images === 'grayscale') body.classList.add('a11y-images-grayscale');
      if (images === 'hidden') body.classList.add('a11y-images-hidden');
    }
  }, [isActive, fontSize, theme, images]);

  return <>{children}</>;
}
