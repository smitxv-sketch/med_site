import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Bug } from 'lucide-react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { ServiceSelectionStep } from './components/ServiceSelectionStep';
import { DoctorSelectionStep } from './components/DoctorSelectionStep';
import { UserDetailsStep } from './components/UserDetailsStep';
import { SuccessStep } from './components/SuccessStep';
import { AuditStep } from './components/AuditStep';
import { DebugModal } from './components/DebugModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';

interface BookingWidgetProps {
  serviceId?: string;
  doctorId?: string;
}

function BookingWidgetInner() {
  const { 
    loading, step, services, theme, text, showDebug, setShowDebug, 
    diagnostics, selectedDoctor, isDoctorModalOpen, setIsDoctorModalOpen, 
    handleSlotSelect 
  } = useBooking();

  if (loading && step === 'service' && services.length === 0) {
    return <div className="flex justify-center p-8"><Loader2 className="animate-spin w-8 h-8 text-blue-600" /></div>;
  }

  const themeStyles = {
    '--color-primary': theme?.colors?.primary || '#65a30d',
    '--color-primary-hover': theme?.colors?.['primary-hover'] || '#4d7c0f',
    '--color-secondary': theme?.colors?.secondary || '#64748b',
    '--color-accent': theme?.colors?.accent || '#ea8025',
    '--color-background': theme?.colors?.background || '#ffffff',
    '--color-surface': theme?.colors?.surface || '#f8fafc',
    '--color-surface-hover': theme?.colors?.['surface-hover'] || '#f1f5f9',
    '--color-text-primary': theme?.colors?.['text-primary'] || '#0f172a',
    '--color-text-secondary': theme?.colors?.['text-secondary'] || '#64748b',
    '--color-border': theme?.colors?.border || '#e2e8f0',
  } as React.CSSProperties;

  if (!text) return null;

  return (
    <div className="w-full max-w-5xl mx-auto relative font-sans text-[var(--color-text-primary)] min-h-screen flex flex-col safe-pt safe-pb" style={themeStyles}>
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
