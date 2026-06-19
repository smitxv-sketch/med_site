import React from 'react';
import { Type, Image as ImageIcon, Palette, X, EyeOff } from 'lucide-react';
import { useAccessibilityStore } from '@/shared/store/accessibilityStore';
import { PRIMITIVE } from '@/shared/config/designTokens';

export function AccessibilityPanel() {
  const { isActive, fontSize, theme, images, setFontSize, setTheme, setImages, toggleActive } = useAccessibilityStore();

  if (!isActive) return null;

  return (
    <div className="a11y-panel fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-md z-[10000] flex flex-col md:flex-row items-start md:items-center justify-between">
      
      {/* Scrollable controls container */}
      <div className="flex-1 w-full overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-6 px-4 py-3 min-w-max">
          
          {/* Font Size */}
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 a11y-icon text-gray-600" />
            <span className="text-sm font-medium mr-1 text-gray-700">Шрифт:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${fontSize === 'normal' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-3 py-1 rounded-md text-base font-medium transition-colors ${fontSize === 'large' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                A+
              </button>
              <button 
                onClick={() => setFontSize('xlarge')}
                className={`px-3 py-1 rounded-md text-lg font-medium transition-colors ${fontSize === 'xlarge' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                A++
              </button>
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 a11y-icon text-gray-600" />
            <span className="text-sm font-medium mr-1 text-gray-700">Цвет:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setTheme('standard')}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${theme === 'standard' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                style={{ background: PRIMITIVE.a11y.bgLight, color: PRIMITIVE.a11y.fgLight }}
                title="Стандартная"
              >
                Ц
              </button>
              <button 
                onClick={() => setTheme('bw')}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${theme === 'bw' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                style={{ background: PRIMITIVE.a11y.bgLight, color: PRIMITIVE.a11y.fgLight }}
                title="Черным по белому"
              >
                А
              </button>
              <button 
                onClick={() => setTheme('wb')}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${theme === 'wb' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                style={{ background: PRIMITIVE.a11y.bgDark, color: PRIMITIVE.a11y.fgDark }}
                title="Белым по черному"
              >
                А
              </button>
              <button 
                onClick={() => setTheme('blue')}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${theme === 'blue' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}`}
                style={{ background: PRIMITIVE.a11y.bgBlue, color: PRIMITIVE.a11y.fgBlue }}
                title="Темно-синим по голубому"
              >
                А
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 a11y-icon text-gray-600" />
            <span className="text-sm font-medium mr-1 text-gray-700">Фото:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button 
                onClick={() => setImages('normal')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${images === 'normal' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                Вкл
              </button>
              <button 
                onClick={() => setImages('grayscale')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${images === 'grayscale' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                Ч/Б
              </button>
              <button 
                onClick={() => setImages('hidden')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${images === 'hidden' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                <EyeOff className="w-3 h-3 a11y-icon" /> Выкл
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Close Button */}
      <div className="px-4 py-2 md:py-3 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-auto bg-gray-50 md:bg-transparent flex justify-center shrink-0">
        <button 
          onClick={toggleActive}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white md:bg-gray-100 border border-gray-200 md:border-transparent hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors w-full md:w-auto text-gray-800"
        >
          <X className="w-4 h-4 a11y-icon" />
          Обычная версия
        </button>
      </div>
    </div>
  );
}
