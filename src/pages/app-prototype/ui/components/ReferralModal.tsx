import React from 'react';
import { Share2, Users, X } from 'lucide-react';

interface ReferralModalProps {
  onClose: () => void;
}

export function ReferralModal({ onClose }: ReferralModalProps) {
  return (
    <div className="absolute inset-0 z-[120] bg-white flex flex-col animate-in slide-in-from-bottom-full duration-theme">
      
      <div className="bg-gradient-to-br from-brand to-emerald-400 p-4 pb-12 rounded-b-[40px] flex items-start justify-between shrink-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 text-white">
          <h2 className="text-xl font-bold leading-tight mb-1">Пригласите друга</h2>
          <p className="text-sm text-green-50">И получайте бонусы вместе</p>
        </div>
        <button onClick={onClose} className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 backdrop-blur-sm transition-colors relative z-10">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center -mt-8 relative z-10">
        
        <div className="w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-brand" />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">Как это работает?</h3>
          
          <div className="space-y-4 text-left w-full mt-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Поделитесь ссылкой</div>
                <div className="text-xs text-gray-500">Отправьте другу персональную ссылку на приложение клиники.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Друг получает подарок</div>
                <div className="text-xs text-gray-500">При регистрации друг получит приветственные 500 рублей на счет.</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-green-50 text-brand font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <div className="font-bold text-gray-900 text-sm">Вы получаете бонусы</div>
                <div className="text-xs text-gray-500">Когда друг оплатит первую услугу, вам начислится 500 бонусов!</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-auto flex flex-col gap-3">
          <button className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 active:scale-95 transition-transform">
            <Share2 className="w-5 h-5" />
            Отправить в WhatsApp
          </button>
          
          <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            Скопировать ссылку
          </button>
        </div>

      </div>
    </div>
  );
}
