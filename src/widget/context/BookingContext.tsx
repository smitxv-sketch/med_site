import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Doctor, Service, Slot, Branch } from '../types';
import { usePhoneMask } from '../hooks/usePhoneMask';
import { useRecaptcha } from '../hooks/useRecaptcha';
import { trackEvent } from '../services/analytics';
import { getGroupedServices, getFilteredDoctors } from '../utils/filterUtils';
import { formatSpecialty } from '../utils/formatters';
import { useWidgetRepository } from '../../shared/di/DIContext';

export type Step = 'service' | 'doctor' | 'details' | 'success' | 'audit';

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    [key: string]: string;
  };
}

interface BookingContextType {
  step: Step;
  setStep: (step: Step) => void;
  handleSetStep: (step: Step) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  services: Service[];
  doctors: Doctor[];
  setDoctors: (doctors: Doctor[]) => void;
  allDoctors: Doctor[];
  theme: Theme | null;
  text: any;
  showDebug: boolean;
  setShowDebug: (show: boolean) => void;
  config: any;
  diagnostics: any;
  connectionTest: any;
  setConnectionTest: (test: any) => void;
  testingConnection: boolean;
  setTestingConnection: (testing: boolean) => void;
  branches: Record<string, Branch>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBranchName: string | null;
  debugRawSlots: Record<string, any>;
  setDebugRawSlots: (slots: Record<string, any>) => void;
  bookingLogs: any[];
  setBookingLogs: React.Dispatch<React.SetStateAction<any[]>>;
  bookingError: string | null;
  setBookingError: (error: string | null) => void;
  selectedDoctor: Doctor | null;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  isDoctorModalOpen: boolean;
  setIsDoctorModalOpen: (isOpen: boolean) => void;
  formData: {
    service: Service | null;
    doctor: Doctor | null;
    slot: Slot | null;
    date: string;
    name: string;
    email: string;
    phone: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  phoneMask: any;
  groupedServices: Record<string, Service[]>;
  filteredDoctors: Doctor[];
  displayedDoctors: Doctor[];
  handleServiceSelect: (service: Service) => Promise<void>;
  handleDoctorSelect: (doctor: Doctor) => void;
  handleSlotSelect: (slot: Slot, doctor: Doctor, date: string) => void;
  handleSubmit: () => Promise<void>;
  prevStep: () => void;
  copyDebugInfo: () => void;
  formatDoctorName: (name: string) => string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children, serviceId: propServiceId, doctorId: propDoctorId }: { children: React.ReactNode, serviceId?: string, doctorId?: string }) {
  const widgetRepo = useWidgetRepository();
  const [step, setStep] = useState<Step>('service');
  
  const handleSetStep = (newStep: Step) => {
    setBookingError(null);
    setStep(newStep);
    window.scrollTo(0, 0);
  };
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [text, setText] = useState<any>(null);
  const [showDebug, setShowDebug] = useState(false);
  const [config, setConfig] = useState<any>(null);
  const [diagnostics, setDiagnostics] = useState<any>(null);
  const [connectionTest, setConnectionTest] = useState<any>(null);
  const [testingConnection, setTestingConnection] = useState(false);
  const [branches, setBranches] = useState<Record<string, Branch>>({});
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranchName] = useState<string | null>(null);
  const [debugRawSlots, setDebugRawSlots] = useState<Record<string, any>>({});
  const [bookingLogs, setBookingLogs] = useState<any[]>([]);
  const [bookingError, setBookingError] = useState<string | null>(null);
  
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    service: null as Service | null,
    doctor: null as Doctor | null,
    slot: null as Slot | null,
    date: '',
    name: '',
    email: '',
    phone: ''
  });

  const phoneMask = usePhoneMask(formData.phone);
  const recaptcha = useRecaptcha('6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI');

  useEffect(() => {
    trackEvent('view_step', { step });
  }, [step]);

  useEffect(() => {
    setFormData(prev => ({ ...prev, phone: phoneMask.value }));
  }, [phoneMask.value]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [servicesData, doctorsData, allDoctorsData, themeData, textData, configData, diagnosticsData, branchesData] = await Promise.all([
          widgetRepo.getServices(),
          widgetRepo.getDoctors(),
          widgetRepo.getAllDoctors(),
          widgetRepo.getTheme(),
          widgetRepo.getText(),
          widgetRepo.getConfig(),
          widgetRepo.getDiagnostics(),
          widgetRepo.getBranches()
        ]);
        
        let finalServices = servicesData;
        if ((!finalServices || finalServices.length === 0) && allDoctorsData && allDoctorsData.length > 0) {
          const specs = new Set<string>();
          allDoctorsData.forEach((d: any) => {
            if (d.specialty) specs.add(d.specialty);
          });
          finalServices = Array.from(specs).map(name => ({ id: name, name, price: 0 }));
        }
        
        setServices(finalServices);
        const hydratedDoctorsData = doctorsData.map((doc: Doctor) => {
          const wpDoc = allDoctorsData.find((ad: Doctor) => 
            ad.id === doc.id || 
            (ad.qmsIds && ad.qmsIds.includes(doc.id)) ||
            (ad.name || '').toLowerCase() === (doc.name || '').toLowerCase()
          );
          if (wpDoc) {
            return {
              ...doc,
              image: wpDoc.image || doc.image,
              description: wpDoc.description || doc.description,
              educationText: wpDoc.educationText || doc.educationText,
              educationHistory: wpDoc.educationHistory || doc.educationHistory,
              degree: wpDoc.degree || doc.degree,
              category: wpDoc.category || doc.category,
              position: wpDoc.position || doc.position,
              experienceYears: wpDoc.experienceYears || doc.experienceYears,
              badges: wpDoc.badges?.length ? wpDoc.badges : doc.badges,
              rawMeta: wpDoc.rawMeta || doc.rawMeta
            };
          }
          return doc;
        });
        
        setDoctors(hydratedDoctorsData);
        setAllDoctors(allDoctorsData);
        setTheme(themeData);
        setText(textData);
        setConfig(configData);
        setDiagnostics(diagnosticsData);
        setBranches(branchesData);
        
        const params = new URLSearchParams(window.location.search);
        const serviceId = propServiceId || params.get('service_id');
        const doctorId = propDoctorId || params.get('doctor_id');

        let nextStep: Step = 'service';
        let preSelectedService = null;
        let preSelectedDoctor = null;

        if (serviceId) {
          preSelectedService = servicesData.find((s: Service) => s.id === serviceId);
          if (preSelectedService) nextStep = 'doctor';
        }

        if (doctorId) {
          preSelectedDoctor = allDoctorsData.find((d: Doctor) => d.id === doctorId) || doctorsData.find((d: Doctor) => d.id === doctorId);
          if (preSelectedDoctor) {
            setSelectedDoctor(preSelectedDoctor);
            setIsDoctorModalOpen(true);
          }
        }

        if (preSelectedService) {
          const formattedName = formatSpecialty(preSelectedService.name, configData);
          const matchingServices = servicesData.filter((s: Service) => formatSpecialty(s.name, configData) === formattedName);
          
          const promises = matchingServices.map((s: Service) => widgetRepo.getDoctors(s.name));
          const results = await Promise.all(promises);
          const docsData = results.flat();
          
          const uniqueDoctors = Array.from(new Map(docsData.map((d: Doctor) => [d.id, d])).values());
          
          const hydratedDoctors = uniqueDoctors.map((doc: Doctor) => {
            const wpDoc = allDoctorsData.find((ad: Doctor) => 
              ad.id === doc.id || 
              (ad.qmsIds && ad.qmsIds.includes(doc.id)) ||
              (ad.name || '').toLowerCase() === (doc.name || '').toLowerCase()
            );
            if (wpDoc) {
              return {
                ...doc,
                image: wpDoc.image || doc.image,
                description: wpDoc.description || doc.description,
                educationText: wpDoc.educationText || doc.educationText,
                educationHistory: wpDoc.educationHistory || doc.educationHistory,
                degree: wpDoc.degree || doc.degree,
                category: wpDoc.category || doc.category,
                position: wpDoc.position || doc.position,
                experienceYears: wpDoc.experienceYears || doc.experienceYears,
                badges: wpDoc.badges?.length ? wpDoc.badges : doc.badges,
                rawMeta: wpDoc.rawMeta || doc.rawMeta
              };
            }
            return doc;
          });
          setDoctors(hydratedDoctors);
        }

        if (preSelectedService || preSelectedDoctor) {
          setFormData(prev => ({
            ...prev,
            service: preSelectedService || prev.service,
            doctor: preSelectedDoctor || prev.doctor
          }));
          handleSetStep(nextStep);
        }

      } catch (error) {
        console.error('Failed to initialize widget', error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [propDoctorId, propServiceId]);

  const groupedServices = useMemo(() => {
    return getGroupedServices(
      services,
      allDoctors,
      config,
      searchQuery,
      selectedBranchName,
      branches,
      true
    );
  }, [services, config, searchQuery, selectedBranchName, branches, allDoctors]);

  const filteredDoctors = useMemo(() => {
    return getFilteredDoctors(
      allDoctors,
      selectedBranchName,
      searchQuery,
      branches,
      true
    );
  }, [allDoctors, searchQuery, selectedBranchName, branches]);

  const displayedDoctors = useMemo(() => {
    if (!selectedBranchName) return doctors;
    return doctors.filter(d => d.offerings?.some(o => (o.branch.short || o.branch.name) === selectedBranchName));
  }, [doctors, selectedBranchName]);

  const handleServiceSelect = async (service: Service) => {
    trackEvent('select_service', { service: service.name });
    setFormData({ ...formData, service });
    
    setDoctors([]);
    setLoading(true);
    handleSetStep('doctor');
    
    try {
      const formattedName = formatSpecialty(service.name, config);
      const matchingServices = services.filter(s => formatSpecialty(s.name, config) === formattedName);
      
      const promises = matchingServices.map(s => widgetRepo.getDoctors(s.name));
      const results = await Promise.all(promises);
      const doctorsData = results.flat();
      
      const uniqueDoctors = Array.from(new Map(doctorsData.map(d => [d.id, d])).values());
      
      const hydratedDoctors = uniqueDoctors.map(doc => {
        const wpDoc = allDoctors.find(ad => 
          ad.id === doc.id || 
          (ad.qmsIds && ad.qmsIds.includes(doc.id)) ||
          (ad.name || '').toLowerCase() === (doc.name || '').toLowerCase()
        );
        if (wpDoc) {
          return {
            ...doc,
            image: wpDoc.image || doc.image,
            description: wpDoc.description || doc.description,
            educationText: wpDoc.educationText || doc.educationText,
            educationHistory: wpDoc.educationHistory || doc.educationHistory,
            degree: wpDoc.degree || doc.degree,
            category: wpDoc.category || doc.category,
            position: wpDoc.position || doc.position,
            experienceYears: wpDoc.experienceYears || doc.experienceYears,
            badges: wpDoc.badges?.length ? wpDoc.badges : doc.badges,
            rawMeta: wpDoc.rawMeta || doc.rawMeta
          };
        }
        return doc;
      });
      
      setDoctors(hydratedDoctors);
    } catch (error) {
      console.error('Failed to load doctors for service', error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    trackEvent('select_doctor', { doctor: doctor.name });
    setSelectedDoctor(doctor);
    setIsDoctorModalOpen(true);
  };

  const handleSlotSelect = (slot: Slot, doctor: Doctor, date: string) => {
    trackEvent('select_slot', { slot: slot.time });
    setFormData({ ...formData, doctor, slot, date });
    setIsDoctorModalOpen(false);
    handleSetStep('details');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setBookingError(null);
    setBookingLogs([]);
    const addLog = (tag: string, data?: any) => {
      setBookingLogs(prev => [...prev, { time: new Date().toISOString(), tag, ...data }]);
    };
    
    addLog('start_submit');
    try {
      let token = '';
      if (config?.recaptcha?.enabled) {
        addLog('start_recaptcha');
        const t = await recaptcha.execute();
        if (t) token = t;
        addLog('recaptcha_done', { token });
      } else {
        addLog('recaptcha_disabled');
      }
      
      const payload = {
        service_id: formData.service?.id,
        doctor_id: formData.doctor?.id,
        slot: formData.slot?.time,
        date: formData.date || new Date().toISOString().split('T')[0],
        patient: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        recaptcha_token: token
      };
      addLog('booking_request', { payload });
      
      const result = await widgetRepo.bookAppointment(payload);
      addLog('booking_success', { result });
      
      trackEvent('booking_success');
      handleSetStep('success');
    } catch (error: any) {
      addLog('booking_error', { error: error?.response?.data || error?.message || String(error) });
      console.error('Booking failed', error);
      trackEvent('booking_failed', { error });
      const errorMsg = error?.response?.data?.error || error?.response?.data?.details || error?.message || (typeof error === 'string' ? error : 'Неизвестная ошибка');
      const displayMsg = typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : String(errorMsg);
      setBookingError(displayMsg);
    } finally {
      addLog('booking_finished');
      setLoading(false);
    }
  };

  const prevStep = () => {
    if (step === 'doctor') handleSetStep('service');
    else if (step === 'details') handleSetStep('doctor');
  };

  const formatDoctorName = (name: string) => {
    if (!config?.formatting?.doctor_name) return name;
    let formatted = name;
    const { remove_prefixes, capitalize } = config.formatting.doctor_name;
    
    if (remove_prefixes && Array.isArray(remove_prefixes)) {
      remove_prefixes.forEach((prefix: string) => {
        if (formatted.startsWith(prefix)) {
          formatted = formatted.substring(prefix.length);
        }
      });
    }
    
    if (capitalize) {
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
    
    return formatted.trim();
  };

  const copyDebugInfo = () => {
    const debugInfo = {
      diagnostics,
      connectionTest,
      config,
      formData,
      services,
      doctors,
      debugRawSlots,
      text,
      branches
    };
    navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2));
    alert('Debug info copied to clipboard!');
  };

  return (
    <BookingContext.Provider value={{
      step, setStep, handleSetStep, loading, setLoading, services, doctors, setDoctors, allDoctors,
      theme, text, showDebug, setShowDebug, config, diagnostics, connectionTest, setConnectionTest, testingConnection, setTestingConnection,
      branches, searchQuery, setSearchQuery, selectedBranchName, debugRawSlots, setDebugRawSlots, bookingLogs, setBookingLogs,
      bookingError, setBookingError,
      selectedDoctor, setSelectedDoctor, isDoctorModalOpen, setIsDoctorModalOpen, formData, setFormData,
      phoneMask, groupedServices, filteredDoctors, displayedDoctors, handleServiceSelect, handleDoctorSelect,
      handleSlotSelect, handleSubmit, prevStep, copyDebugInfo, formatDoctorName
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
