import React, { useEffect } from 'react';
import { useUISettingsStore } from '../../shared/store/uiSettingsStore';
import { PRIMITIVE } from '../../shared/config/designTokens';

// Approximates perceived luminance to decide if text should be dark or light
function getLuminance(h: number, s: number, l: number) {
  const sNode = s / 100;
  const lNode = l / 100;
  const c = (1 - Math.abs(2 * lNode - 1)) * sNode;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = lNode - c / 2;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { 
    colorTheme, colorIntensity, appRadius, customHue, customSaturation, customLightness, fontFamily, shadowStyle, layoutDensity, animationTheme
  } = useUISettingsStore();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-density', layoutDensity);

    // Define Hues for our themes
    let hue = customHue; 
    if (colorTheme !== 'custom') {
      switch (colorTheme) {
        case 'green': hue = 109; break; // Match original site green hue
        case 'blue': hue = 210; break;
        case 'purple': hue = 265; break;
        case 'rose': hue = 345; break;
      }
    }

    // Set Base Saturation and Lightness based on Intensity
    let saturation = customSaturation;
    let lightness = customLightness;

    if (colorIntensity !== 'manual') {
      if (colorIntensity === 'pastel') {
        saturation = 60;
        lightness = 65; // Lighter, softer
      } else if (colorIntensity === 'standard') {
        if (colorTheme === 'green') {
          saturation = 54;
          lightness = 39;
        } else {
          saturation = 80; // slightly richer
          lightness = 42; // slightly deeper
        }
      } else if (colorIntensity === 'vibrant') {
        saturation = 95;
        lightness = 45; // Punchy, vivid
      }
    }

    // Secondary Accent Color (analogous or complementary)
    const accentHue = (hue + (colorTheme === 'purple' ? -40 : 35)) % 360;

    // Luminance calculation for a11y contrast
    const luminance = getLuminance(hue, saturation, lightness);
    const isLightBrandColor = luminance > 165; // threshold for perceived brightness (increased to allow white on standard green)
    root.style.setProperty('--brand-fg', isLightBrandColor ? PRIMITIVE.semantic.textPrimary : PRIMITIVE.semantic.white);

    // Apply main brand properties
    root.style.setProperty('--brand-h', `${hue}`);
    root.style.setProperty('--brand-s', `${saturation}%`);
    root.style.setProperty('--brand-l', `${lightness}%`);

    root.style.setProperty('--accent-h', `${accentHue}`);
    root.style.setProperty('--accent-s', `${saturation}%`);
    root.style.setProperty('--accent-l', `${colorIntensity === 'pastel' ? lightness + 10 : lightness}%`);

    // Apply corner radius configuration
    root.style.setProperty('--app-radius', `${appRadius}px`);

    // Apply Typography
    let fontPrimary = '"Inter", ui-sans-serif, system-ui';
    if (fontFamily === 'outfit') fontPrimary = '"Outfit", "Inter", system-ui';
    if (fontFamily === 'playfair') fontPrimary = '"Playfair Display", serif';
    if (fontFamily === 'nunito') fontPrimary = '"Nunito", "Inter", system-ui';
    root.style.setProperty('--font-primary', fontPrimary);

    // Apply Shadow Style
    let shadowBase = '0 10px 40px rgba(0,0,0,0.05)'; // soft
    let appBorder = '1px solid transparent';
    
    if (shadowStyle === 'none') {
      shadowBase = 'none';
    } else if (shadowStyle === 'hard') {
      shadowBase = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
    } else if (shadowStyle === 'neo') {
      shadowBase = '4px 4px 0px 0px rgba(0,0,0,0.9)'; // brutalism
      appBorder = '2px solid rgba(0,0,0,0.9)';
    } else if (shadowStyle === 'bordered') {
      shadowBase = 'none'; // elegant border without shadow
      appBorder = '1px solid rgba(0,0,0,0.15)';
    }

    root.style.setProperty('--app-shadow', shadowBase);
    root.style.setProperty('--app-border', appBorder);

    // Apply Layout Density
    const spacingBase = `${1 * layoutDensity}rem`; // 16px default
    const spacingSection = `${2.5 * layoutDensity}rem`; // 40px default
    const spacingGap = `${1 * layoutDensity}rem`; // For layout gaps
    
    root.style.setProperty('--spacing-base', spacingBase);
    root.style.setProperty('--spacing-section', spacingSection);
    root.style.setProperty('--spacing-gap', spacingGap);

    // Apply Animation Theme
    let duration = '0.3s';
    let timing = 'ease';
    
    if (animationTheme === 'spring') {
      duration = '0.5s';
      timing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Bouncy
    } else if (animationTheme === 'smooth') {
      duration = '0.6s';
      timing = 'ease-in-out'; // Luxury, slow
    } else if (animationTheme === 'instant') {
      duration = '0.01s';
      timing = 'linear'; // No animation
    } else {
      // default
      duration = '0.2s';
      timing = 'ease-out';
    }

    root.style.setProperty('--app-transition-duration', duration);
    root.style.setProperty('--app-transition-timing', timing);
    
  }, [colorTheme, colorIntensity, appRadius, customHue, customSaturation, customLightness, fontFamily, shadowStyle, layoutDensity, animationTheme]);

  return <>{children}</>;
}
