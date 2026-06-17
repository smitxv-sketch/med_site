import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUISettingsStore } from '../../shared/store/uiSettingsStore';

export function MarketingEngine() {
  const [searchParams] = useSearchParams();
  const applyRule = useUISettingsStore(state => state.applyRule);
  const applyPreset = useUISettingsStore(state => state.applyPreset);
  
  // Keep track to only apply UTMs once per session/load
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    // В реальном мире тут был бы сложный парсер JSON-правил из Strapi.
    // Пока реализуем то, что зашито в нашей концепции:

    const utmCampaign = searchParams.get('utm_campaign')?.toLowerCase();
    const utmSource = searchParams.get('utm_source')?.toLowerCase();
    const utmTerm = searchParams.get('utm_term')?.toLowerCase();
    
    // Сценарий 1: Детский трафик (kids / tiktok) -> Пресет "Педиатрия"
    if (utmCampaign?.includes('kids') || utmSource === 'tiktok') {
      applyPreset('kids');
      console.log('MarketingEngine: Applied [kids] preset due to UTMs');
    } 
    // Сценарий 2: Люкс / Премиум трафик -> Пресет "Премиум"
    else if (utmTerm?.includes('дорого') || utmTerm?.includes('люкс') || utmSource === 'forbes') {
      applyPreset('premium');
      console.log('MarketingEngine: Applied [premium] preset due to UTMs');
    }
    // Сценарий 3: Ночная срочность (urgency) -> Правило "Срочность"
    else if (utmCampaign === 'emergency' || utmTerm?.includes('срочно') || utmTerm === 'emergency_dental') {
      applyRule('rule_urgency');
      console.log('MarketingEngine: Applied [rule_urgency] rule due to UTMs');
    }
    // Сценарий 4: Доверие и экспертиза (senior care)
    else if (utmCampaign === 'b2b' || utmCampaign === 'senior_care') {
      applyRule('rule_trust');
      console.log('MarketingEngine: Applied [rule_trust] rule due to UTMs');
    }
    // Новогоднее промо
    else if (utmCampaign === 'new_year' || utmCampaign === 'ny2024') {
       applyRule('rule_new_year');
       console.log('MarketingEngine: Applied [rule_new_year] rule due to UTMs');
    } else {
        // Automatically apply time logic if no specific UTMs dictates the rule
        const hour = new Date().getHours();
        if (hour < 9 || hour >= 18) {
            console.log('MarketingEngine: Simulated Night time context activated.');
            // Usually we might enable "emergency contact mode" structurally, via UI toggles
        }
    }

    setInitialized(true);
  }, [searchParams, applyRule, applyPreset, initialized]);

  return null;
}
