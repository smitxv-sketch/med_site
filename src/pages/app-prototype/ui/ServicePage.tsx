import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCmsStore, ServiceEntry } from '@/shared/store/cmsStore';
import { PageRenderer } from '@/shared/ui/PageRenderer';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/widgets/footer/ui/Footer';
import { SEO } from '@/shared/ui/SEO';

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  
  const { services, globalServiceLayout, references } = useCmsStore();
  
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-900">Услуга не найдена</h1>
        <Link to="/" className="text-brand hover:underline flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" /> Вернуться на главную
        </Link>
      </div>
    );
  }

  // --- CORE ARCHITECTURE: Fallback Logic ---
  // If the service has a custom layout defined (e.g. specialized landing page), we use it.
  // Otherwise, we fallback to the global template for all services.
  const layoutToRender = (service.customLayout && service.customLayout.length > 0) 
    ? service.customLayout 
    : globalServiceLayout;

  // Generate JSON-LD Schema for SEO
  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.subtitle,
    "provider": {
      "@type": "MedicalClinic",
      "name": "Медицинская Клиника \"Здоровье\""
    },
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "RUB"
    }
  });

  return (
    <div className="w-full">
      <SEO 
        title={service.title} 
        description={service.subtitle}
        schema={schemaOrg}
      />
      {/* Dev Bar (just for demonstration context) */}
      <div className="bg-gray-900 text-white py-2 px-4 text-xs flex justify-between items-center sticky top-0 z-50">
        <div className="flex gap-4">
           <Link to="/" className="hover:text-brand transition-colors flex items-center gap-1 group">
             <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Назад
           </Link>
           <span className="text-gray-400">|</span>
           <span className="font-mono">Route: /service/{service.slug}</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="bg-white/20 px-2 py-0.5 rounded-full">
            {service.customLayout?.length ? '🛠️ Используется ЛОКАЛЬНЫЙ шаблон' : '🌍 Используется ГЛОБАЛЬНЫЙ шаблон'}
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
            Цена: {service.price} ₽
          </span>
        </div>
      </div>

      {/* Page Content */}
      <PageRenderer blocks={layoutToRender} contentContext={service} references={references} />
      
      <Footer />
    </div>
  );
}
