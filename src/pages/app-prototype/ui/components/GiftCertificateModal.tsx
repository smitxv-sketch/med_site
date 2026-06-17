import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Minus, Plus } from 'lucide-react';

interface GiftCertificateModalProps {
  onClose: () => void;
}

const NOMINALS = [2000, 3000, 5000, 10000];

export function GiftCertificateModal({ onClose }: GiftCertificateModalProps) {
  const [nominalIndex, setNominalIndex] = useState(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const selectedNominal = customAmount ? parseInt(customAmount) || 0 : NOMINALS[nominalIndex];
  const totalSum = selectedNominal * quantity;

  const handlePrevNominal = () => {
    setCustomAmount('');
    setNominalIndex((prev) => (prev === 0 ? NOMINALS.length - 1 : prev - 1));
  };

  const handleNextNominal = () => {
    setCustomAmount('');
    setNominalIndex((prev) => (prev === NOMINALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="absolute inset-0 z-[120] bg-white flex flex-col animate-in slide-in-from-bottom-full duration-theme">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-bold text-gray-900">Подарочные сертификаты</h2>
        <button onClick={onClose} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-black hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-5 flex flex-col pb-24 relative z-0">
        
        {/* Certificate Card */}
        <div className="w-full aspect-[1.6] bg-gradient-to-tr from-[#38b2ac] to-[#81e6d9] rounded-3xl shadow-lg relative overflow-hidden mb-6">
          {/* Abstract ribbon graphics imitation */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>
          
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-lg flex gap-1">
                <div className="w-2 h-2 bg-[#ff5252] rounded-full"></div>
                <div className="w-2 h-2 bg-[#4caf50] rounded-full"></div>
                <div className="w-2 h-2 bg-[#9c27b0] rounded-full"></div>
                <div className="w-2 h-2 bg-[#ff9800] rounded-full"></div>
              </div>
              <span className="text-white font-bold text-xs tracking-widest uppercase">Источник</span>
            </div>
            
            <div className="text-center">
              <h3 className="text-white text-lg font-black tracking-[0.2em] uppercase leading-tight drop-shadow-md">
                Подарок <br/> Для Здоровья
              </h3>
            </div>
          </div>
        </div>

        {/* Amount Selector */}
        <div className="mb-6">
          <h4 className="text-gray-900 font-bold mb-4 text-base">Выберите номинал:</h4>
          <div className="flex items-center justify-between mb-4 px-2">
            <button onClick={handlePrevNominal} className="p-2 text-gray-400 hover:text-brand transition-colors">
              <ChevronLeft className="w-8 h-8" />
            </button>
            <div className="text-3xl font-black text-brand">
              {customAmount ? customAmount : NOMINALS[nominalIndex].toLocaleString('ru-RU')} ₽
            </div>
            <button onClick={handleNextNominal} className="p-2 text-gray-400 hover:text-brand transition-colors">
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
          
          <input 
            type="number"
            placeholder="Или введите свою сумму"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Quantity */}
        <div className="mb-8">
          <h4 className="text-gray-900 font-bold mb-4 text-base">Количество</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="w-12 text-center text-lg font-bold text-gray-900">
                {quantity}
              </div>
              <button 
                 onClick={() => setQuantity(quantity + 1)}
                 className="px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-black transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="text-2xl font-black text-brand">
              {totalSum.toLocaleString('ru-RU')} ₽
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer Action */}
      <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
         <button className="w-full bg-brand text-brand-fg font-bold py-4 rounded-xl shadow-lg shadow-brand/30 active:scale-95 transition-transform flex items-center justify-center gap-2">
            ПРОДОЛЖИТЬ
         </button>
      </div>

    </div>
  );
}
