import { useEffect, useState } from 'react';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const useRecaptcha = (siteKey: string) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey]);

  const execute = async () => {
    if (window.grecaptcha) {
      const t = await window.grecaptcha.execute(siteKey, { action: 'submit' });
      setToken(t);
      return t;
    }
    return null;
  };

  return { execute, token };
};
