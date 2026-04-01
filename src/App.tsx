import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryProvider } from './app/providers/QueryProvider';
import { MainLayout } from './app/layouts/MainLayout';
import { HomePage } from './pages/home/ui/HomePage';
import { CategoryPage } from './pages/category/ui/CategoryPage';
import { ServicePage } from './pages/service/ui/ServicePage';
import BookingWidget from './widget/BookingWidget';
import IntegrationPage from './admin/IntegrationPage';
import DiagnosticTools from './admin/DiagnosticTools';
import AboutPage from './pages/AboutPage';

import { DoctorsPage } from './pages/doctors/ui/DoctorsPage';
import { DoctorPage } from './pages/doctor/ui/DoctorPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  const isWidgetOnly = location.search.includes('embedded=true');

  if (isWidgetOnly) {
    return <BookingWidget />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Dynamic FSD Categories and Services */}
        <Route path="/services/adult" element={<CategoryPage />} />
        <Route path="/services/adult/:serviceId" element={<ServicePage />} />
        
        {/* Placeholders for new FSD pages */}
        <Route path="/services" element={<div className="p-8 text-center text-gray-500">Раздел в разработке</div>} />
        <Route path="/services/*" element={<div className="p-8 text-center text-gray-500">Раздел в разработке</div>} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctors/:id" element={<DoctorPage />} />
        <Route path="/promotions" element={<div className="p-8 text-center text-gray-500">Раздел в разработке</div>} />
        <Route path="/profile" element={<div className="p-8 text-center text-gray-500">Раздел в разработке</div>} />
      </Route>

      {/* Legacy/Widget Routes (Outside of MainLayout to keep them clean) */}
      <Route path="/booking" element={
        <div className="min-h-screen bg-white sm:bg-gray-50/50 flex items-start justify-center sm:p-6 md:p-12 relative overflow-hidden">
          {/* Decorative background elements for premium feel */}
          <div className="hidden sm:block absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden sm:block absolute top-40 -left-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-full max-w-5xl bg-white sm:rounded-[32px] sm:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] sm:border border-gray-100/50 sm:overflow-hidden px-4 py-6 sm:p-10 relative z-10">
            <BookingWidget />
          </div>
        </div>
      } />
      <Route path="/cisto" element={
        <div className="min-h-screen bg-white sm:bg-gray-50/50 flex items-start justify-center sm:p-6 md:p-12 relative overflow-hidden">
          {/* Decorative background elements for premium feel */}
          <div className="hidden sm:block absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden sm:block absolute top-40 -left-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-full max-w-5xl bg-white sm:rounded-[32px] sm:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] sm:border border-gray-100/50 sm:overflow-hidden px-4 py-6 sm:p-10 relative z-10">
            <BookingWidget />
          </div>
        </div>
      } />
      <Route path="/admin/integration" element={<IntegrationPage />} />
      <Route path="/admin/diagnostics" element={<DiagnosticTools />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
