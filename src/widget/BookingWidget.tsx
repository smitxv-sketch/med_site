import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug } from 'lucide-react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { ServiceSelectionStep } from './components/ServiceSelectionStep';
import { DoctorSelectionStep } from './components/DoctorSelectionStep';
import { UserDetailsStep } from './components/UserDetailsStep';
import { SuccessStep } from './components/SuccessStep';
import { AuditStep } from './components/AuditStep';
import { DebugModal } from './components/DebugModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { Card } from '@/shared/ui/Card';
import { AgentBridge } from './engine/AgentBridge';

interface BookingWidgetProps {
  serviceId?: string;
  doctorId?: string;
}

function BookingWidgetInner() {
  const { 
    step, theme, showDebug, setShowDebug, 
    diagnostics, selectedDoctor, isDoctorModalOpen, setIsDoctorModalOpen, 
    handleSlotSelect 
  } = useBooking();

  const themeStyles = {
    '--color-primary': 'hsl(var(--brand-h) var(--brand-s) var(--brand-l))',
    '--color-primary-hover': 'hsl(var(--brand-h) var(--brand-s) calc(var(--brand-l) - 15%))',
    '--color-secondary': 'hsl(var(--brand-h) 20% 97%)',
    '--color-accent': 'hsl(var(--accent-h) var(--accent-s) var(--accent-l))',
    '--color-background': '#ffffff',
    '--color-surface': '#f8fafc',
    '--color-surface-hover': '#f1f5f9',
    '--color-text-primary': '#0f172a',
    '--color-text-secondary': '#64748b',
    '--color-border': 'var(--app-border-color, #e2e8f0)',
  } as React.CSSProperties;

  return (
    <div className="w-full max-w-5xl mx-auto relative font-sans text-[var(--color-text-primary)] min-h-screen flex flex-col safe-pt safe-pb bg-gray-50/30" style={themeStyles}>
      <AgentBridge />
      
      {/* Persistent Compact Header for Standalone View */}
      <div className="sticky top-0 z-40 w-full pt-4 pb-4 sm:pt-6 sm:pb-6 px-4 sm:px-6 bg-gradient-to-b from-white/95 via-white/80 to-transparent mb-2">
        <div className="flex items-center gap-3 relative z-10 w-full max-w-5xl mx-auto">
          <div className="w-10 h-10 flex items-center justify-center shrink-0 mix-blend-multiply overflow-hidden rounded">
             <img src="/logo-icon.png" alt="Источник" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center mt-1">
            <span className="font-black text-gray-900 text-xl leading-none tracking-tight">ИСТОЧНИК</span>
            <span className="font-bold text-gray-500 text-[9px] uppercase tracking-[0.2em] mt-[3px]">Клиника</span>
          </div>
        </div>
      </div>

      {/* Debug Icon - Fixed Position */}
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className={`fixed top-4 right-4 z-50 p-2 backdrop-blur rounded-full shadow-lg transition-all hover:scale-110 ${
          diagnostics?.tenants?.chel?.hasApiKey ? 'bg-green-100 text-green-700' : 'bg-white/80 text-gray-400 hover:text-gray-900'
        }`}
        title="Debug Info"
      >
        <Bug className="w-6 h-6" />
      </button>

      <DebugModal />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="pt-6 sm:pt-8 flex-1"
        >
          {step === 'service' && <ServiceSelectionStep />}
          {step === 'doctor' && <DoctorSelectionStep />}
          {step === 'details' && <UserDetailsStep />}
          {step === 'audit' && <AuditStep />}
          {step === 'success' && <SuccessStep />}
        </motion.div>
      </AnimatePresence>

      <DoctorProfileModal 
        doctor={selectedDoctor}
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
        onSlotSelect={handleSlotSelect}
      />

      <div className="mt-8 pb-4 text-center">
        <a href="/booking/test-doctors-links" className="text-gray-300 hover:text-gray-400 text-xs transition-colors">Врачи (отладка)</a>
      </div>
    </div>
  );
}

export default function BookingWidget(props: BookingWidgetProps) {
  return (
    <BookingProvider {...props}>
      <BookingWidgetInner />
    </BookingProvider>
  );
}
