import React, { useState } from 'react';
import { Gift, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { useDIAnalytics } from '../../../shared/di/DIContext';

// Моковые данные сертификатов
const certificates = [
  {
    id: 'cert_1',
    title: 'Подарочный сертификат «Универсальный»',
    description: 'Идеальный подарок, когда вы хотите подарить заботу о здоровье, но предоставляете близкому человеку самому выбрать нужные услуги клиники «Источник».',
    color: 'from-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    icon: '🎁',
    features: ['Действует на любые услуги клиники', 'Срок действия 1 год', 'Несколько номиналов на выбор']
  },
  {
    id: 'cert_2',
    title: 'Сертификат «Здоровое поколение»',
    description: 'Комплексные программы обследования для детей от 0 до 18 лет. Включает базовые анализы, консультации педиатра и узких специалистов.',
    color: 'from-amber-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    icon: '👶',
    features: ['Для детей любого возраста', 'Программы чекапов диспансеризации', 'Оформление справок']
  },
  {
    id: 'cert_3',
    title: 'Сертификат «Красота и молодость»',
    description: 'Доступ ко всем косметологическим услугам клиники: уходовые процедуры, инъекционная и аппаратная косметология.',
    color: 'from-emerald-400 to-teal-500',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80',
    icon: '✨',
    features: ['Все косметологические процедуры', 'Консультации дерматолога-косметолога', 'Подбор ухода']
  }
];

const PREDEFINED_AMOUNTS = [3000, 5000, 10000, 15000, 20000];

export function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const analytics = useDIAnalytics();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Шапка страницы */}
      <div className="bg-white border-b border-gray-100 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-8 h-8 text-brand" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Подарочные сертификаты</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Подарите своим близким самое важное — заботу о здоровье. Наши подарочные сертификаты подходят для любых услуг клиники.
          </p>
        </div>
      </div>

      {/* Список сертификатов */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map(cert => (
            <div 
              key={cert.id}
              onClick={() => {
                analytics.trackEvent('certificate_selected', { certId: cert.id });
                setSelectedCert(cert);
              }}
              className="bg-white rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-theme overflow-hidden group cursor-pointer border border-gray-100 flex flex-col h-full"
            >
              {/* Card Header relative for Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent`} />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="text-3xl">{cert.icon}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1 relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 pr-8 leading-tight group-hover:text-brand transition-colors">{cert.title}</h3>
                <p className="text-gray-600 text-sm mb-0 flex-1 line-clamp-3">{cert.description}</p>
                
                {/* Subtle Top-Right Arrow for Interaction */}
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-brand/5 text-brand flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand group-hover:text-white transition-all duration-theme">
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-theme" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Purchase Drawer */}
      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
}

function CertificateModal({ cert, onClose }: { cert: any, onClose: () => void }) {
  const [amount, setAmount] = useState<number>(5000);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const analytics = useDIAnalytics();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90svh]">
        {/* Modal Header */}
        <div className={`p-8 bg-gradient-to-br ${cert.color} relative overflow-hidden shrink-0`}>
          <div className="absolute top-0 right-0 p-4 z-20">
            <button onClick={onClose} className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 text-[120px] opacity-20 pointer-events-none rotate-12">{cert.icon}</div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4 backdrop-blur-sm shadow-sm">{cert.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">{cert.title}</h2>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-center flex-1">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-green-50 backdrop-blur-sm">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">Заявка принята!</h3>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed text-lg">
              Мы свяжемся с вами в течение 15 минут для подтверждения заказа и уточнения деталей.
            </p>
            <Button onClick={() => {
              analytics.trackEvent('certificate_success_closed', { certId: cert.id });
              onClose();
            }} variant="primary" className="w-full max-w-[240px] shadow-lg shadow-brand/20 h-14 text-lg">
              Отлично
            </Button>
          </div>
        ) : (
          <>
            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">{cert.description}</p>
              
              <div className="mb-6 space-y-2">
                {cert.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Выберите номинал</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {PREDEFINED_AMOUNTS.map(preset => (
                    <button
                      key={preset}
                      onClick={() => {
                        analytics.trackEvent('certificate_preset_selected', { amount: preset });
                        setAmount(preset);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                        amount === preset 
                          ? 'bg-brand text-brand-fg border-brand shadow-md shadow-brand/20' 
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {preset.toLocaleString('ru-RU')} ₽
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-white border border-gray-100 shadow-sm rounded-2xl mb-2">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">Количество:</span>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:text-brand hover:shadow-sm transition-all disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-gray-900">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-600 hover:text-brand hover:shadow-sm transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Итого к оплате</div>
                  <div className="text-3xl font-black text-gray-900">{(amount * quantity).toLocaleString('ru-RU')} <span className="text-2xl">₽</span></div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-white border-t border-gray-100 shrink-0">
              <Button 
                className="w-full text-lg h-14" 
                variant="primary"
                onClick={() => {
                  analytics.trackEvent('certificate_purchased', { certId: cert.id, amount, quantity });
                  setIsSubmitted(true);
                }}
              >
                Оформить за {(amount * quantity).toLocaleString('ru-RU')} ₽
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
