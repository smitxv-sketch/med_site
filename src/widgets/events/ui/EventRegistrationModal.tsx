import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EventRegistrationModalProps {
  children: React.ReactNode;
}

export function EventRegistrationModal({ children }: EventRegistrationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Имитация отправки данных (в реальном проекте здесь будет запрос API)
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 2000);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div onClick={() => setIsOpen(true)} className="inline-block w-full">
        {children}
      </div>
      
      <DialogContent className="sm:max-w-[500px] p-5 sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Регистрация на мероприятие</DialogTitle>
          <DialogDescription className="text-gray-500 mt-2 text-sm sm:text-base">
            Заполните данные ниже. Мы отправим билет и детали на вашу электронную почту.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 max-h-[70vh] overflow-y-auto px-1 -mx-1 custom-scrollbar">
          {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Вы успешно зарегистрированы!</h3>
            <p className="text-gray-500">До встречи на мероприятии.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Обязательные поля */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">ФИО <span className="text-red-500">*</span></Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Иванов Иван Иванович" 
                  required 
                  disabled={status === 'submitting'}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Мобильный номер <span className="text-red-500">*</span></Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    type="tel" 
                    placeholder="+7 (999) 000-00-00" 
                    required 
                    disabled={status === 'submitting'}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Электронная почта <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="mail@example.com" 
                    required 
                    disabled={status === 'submitting'}
                    className="h-11"
                  />
                </div>
              </div>

              {/* Разделитель */}
              <div className="pt-2 pb-1 flex items-center">
                <div className="flex-1 border-t border-gray-100"></div>
                <span className="px-3 text-xs font-medium text-gray-400 uppercase tracking-wider">По желанию</span>
                <div className="flex-1 border-t border-gray-100"></div>
              </div>

              {/* Опциональные поля */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="workplace" className="text-sm font-medium text-gray-500">Место работы</Label>
                  <Input 
                    id="workplace" 
                    name="workplace" 
                    placeholder="Название клиники/компании" 
                    disabled={status === 'submitting'}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="position" className="text-sm font-medium text-gray-500">Должность</Label>
                  <Input 
                    id="position" 
                    name="position" 
                    placeholder="Врач-терапевт" 
                    disabled={status === 'submitting'}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="specialty" className="text-sm font-medium text-gray-500">Специальность</Label>
                  <Input 
                    id="specialty" 
                    name="specialty" 
                    placeholder="Терапия" 
                    disabled={status === 'submitting'}
                    className="h-11"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-sm font-medium text-gray-500">Город</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    placeholder="Москва" 
                    disabled={status === 'submitting'}
                    className="h-11"
                  />
                </div>
              </div>
            </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Отправка...' : 'Завершить регистрацию'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
