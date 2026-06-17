import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BaseWidgetProps } from '@/shared/types/widget-matrix';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, CheckCircle2, ChevronDown } from 'lucide-react';

interface CalculatorWidgetProps extends BaseWidgetProps {
  title?: string;
  subtitle?: string;
  backgroundImageUrl?: string;
  carImageUrl?: string;
}

export function CalculatorWidget({
  intent = 'direct-response',
  desktopVariant = 'split',
  mobileVariant = 'stack',
  layoutPattern, // legacy
  title = 'Узнайте стоимость',
  subtitle = 'Антикоррозийной обработки вашего авто',
  backgroundImageUrl = 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80',
  carImageUrl = 'https://s3-alpha-sig.figma.com/img/cc80/b9b9/dummy-car-transparent.png', // Прозрачная машина-заглушка
}: CalculatorWidgetProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ mark: '', phone: '' });

  const finalDesktop = desktopVariant || layoutPattern || 'split';
  const finalMobile = mobileVariant || layoutPattern || 'stack';

  return (
    <section className="relative w-full min-h-[600px] flex items-center justify-center py-20 px-4 md:px-8 overflow-hidden bg-gray-100" data-desktop-variant={finalDesktop} data-mobile-variant={finalMobile}>
      {/* Background with protective gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-200/50 mix-blend-multiply z-10" />
        <img 
          src={backgroundImageUrl} 
          alt="Background" 
          className="w-full h-full object-cover blur-sm opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
        
        {/* Left Side: Visual & Hook */}
        <div className="relative p-8 md:p-12 h-full flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-200">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight uppercase leading-none">
              {title.split(' ')[0]} <br/> <span className="text-brand">{title.substring(title.indexOf(' ') + 1)}</span>
            </h2>
            <p className="text-xl font-bold text-gray-800 uppercase tracking-widest mt-2">{subtitle}</p>
          </div>
          
          <div className="relative w-full aspect-video md:aspect-[4/3] flex items-center justify-center">
            {/* Декоративный круг под машиной */}
            <div className="absolute w-[80%] aspect-square bg-gradient-to-tr from-brand/20 to-transparent rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80" 
              alt="Car Mockup" 
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl mix-blend-darken rounded-2xl"
            />
          </div>
        </div>

        {/* Right Side: Calculator Form */}
        <div className="p-8 md:p-12 flex flex-col gap-6">
          
          <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100">
            {step === 1 ? (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col gap-1">
                   <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Тип услуги</label>
                   <div className="relative">
                     <select className="w-full appearance-none bg-white border-b-2 border-gray-300 py-3 pl-0 pr-8 text-lg font-medium text-gray-900 focus:outline-none focus:border-brand transition-colors cursor-pointer">
                        <option>Комплексный антикор</option>
                        <option>Антикор арок и порогов</option>
                        <option>Скрытые полости</option>
                     </select>
                     <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
                   </div>
                </div>

                <div className="flex flex-col gap-1 mt-4">
                   <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Марка автомобиля *</label>
                   <div className="relative">
                     <select className="w-full appearance-none bg-white border-b-2 border-gray-300 py-3 pl-0 pr-8 text-lg font-medium text-gray-900 focus:outline-none focus:border-brand transition-colors cursor-pointer">
                        <option>Lada Vesta / Granta</option>
                        <option>Chery / Haval / Geely</option>
                        <option>Toyota / SUV</option>
                        <option>Европейские седаны</option>
                     </select>
                     <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-brand pointer-events-none" />
                   </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full mt-6 bg-brand hover:bg-brand/90 text-white rounded-full text-lg h-14 font-bold tracking-wide uppercase shadow-lg shadow-brand/30"
                  onClick={() => setStep(2)}
                >
                  Рассчитать стоимость
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-5 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col gap-1">
                   <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ваш телефон *</label>
                   <Input 
                      placeholder="+7 (999) 000-00-00" 
                      className="border-0 border-b-2 border-gray-300 rounded-none px-0 py-6 text-xl font-medium focus-visible:ring-0 focus-visible:border-brand bg-transparent"
                      autoFocus
                   />
                </div>
                <div className="flex items-start gap-3 mt-4">
                  <div className="w-5 h-5 rounded bg-brand/10 border-brand/50 border flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand" />
                  </div>
                  <p className="text-xs text-gray-500 leading-tight">
                    Нажимая на кнопку, я принимаю условия соглашения и даю согласие на обработку персональных данных.
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-14 px-4 rounded-full border-gray-300 text-gray-600 hover:bg-gray-100"
                    onClick={() => setStep(1)}
                  >
                    Назад
                  </Button>
                  <Button 
                    size="lg" 
                    className="flex-1 bg-brand hover:bg-brand/90 text-white rounded-full text-lg h-14 font-bold tracking-wide uppercase shadow-lg shadow-brand/30"
                  >
                    Отправить
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
