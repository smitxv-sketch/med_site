import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function AppLaunchPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to actual app dashboard after 2.5 seconds
    const timer = setTimeout(() => {
      navigate('/app', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <img src="/logo-icon.png" alt="Источник" className="w-24 h-24 object-contain mb-8 shadow-[0_8px_30px_rgba(0,186,136,0.2)] rounded-3xl" />
        
        <h1 className="text-2xl font-black text-gray-900 tracking-tight text-center mb-2">
          ИСТОЧНИК ЗАБОТЫ
        </h1>
        <p className="text-gray-500 font-medium text-center">
          Загрузка приложения...
        </p>

        {/* Loading Bar */}
        <div className="w-64 h-1.5 bg-gray-100 rounded-full mt-8 overflow-hidden relative">
          <motion.div
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-brand rounded-full opacity-80"
          />
        </div>
      </motion.div>
    </div>
  );
}
