import { useEffect, useRef } from 'react';

/**
 * Хук для динамической установки SEO-тегов (Title, Description).
 * Вызывается на уровне PageRenderer или конкретной страницы.
 */
export const useSEO = (title?: string, description?: string) => {
  // SSR (Next.js): document недоступен на сервере
  const defaultTitle = useRef(
    typeof document !== 'undefined' ? document.title : '',
  );
  
  useEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = defaultTitle.current;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
    
    // Clean up is not strictly necessary for SPA unless we unmount the whole app, 
    // but good practice to reset if we navigate away from a customized page
  }, [title, description]);
};
