import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryProvider } from './app/providers/QueryProvider';
import { AccessibilityProvider } from './app/providers/AccessibilityProvider';
import { MainLayout } from './app/layouts/MainLayout';
import { HomePage } from './pages/home/ui/HomePage';
import { CategoryPage } from './pages/category/ui/CategoryPage';
import { ServicePage } from './pages/service/ui/ServicePage';
import { SandboxPage } from './pages/sandbox/SandboxPage';
import { DemoPage } from './pages/demo/DemoPage';
import BookingWidget from './widget/BookingWidget';
import { TestDoctorsPage } from './widget/components/TestDoctorsPage';
import IntegrationPage from './admin/IntegrationPage';
import DiagnosticTools from './admin/DiagnosticTools';
import AboutPage from './pages/AboutPage';
import { AccessibilityPanel } from './widgets/accessibility/ui/AccessibilityPanel';
import { DevAuthGate } from './shared/ui/DevAuthGate';
import { DevModeToggle } from './shared/ui/DevModeToggle';
import { DevChangeHighlighter } from './shared/ui/DevChangeHighlighter';
import { EventDelegator } from './shared/lib/analytics/EventDelegator';

import { DoctorsPage } from './pages/doctors/ui/DoctorsPage';
import { DoctorPage } from './pages/doctor/ui/DoctorPage';

import { PromotionsPage } from './pages/promotions/ui/PromotionsPage';
import { SpecialOffersPage } from './pages/special-offers/ui/SpecialOffersPage';
import { ContactsPage } from './pages/contacts/ui/ContactsPage';
import { VacanciesPage } from './pages/vacancies/ui/VacanciesPage';
import { NewsPage } from './pages/news/ui/NewsPage';
import { EventsPage, EventDetailsPage } from './pages/events';
import { PricesPage } from './pages/prices';
import { AppLaunchPage } from './pages/app-prototype/ui/AppLaunchPage';
import { AppPrototype } from './pages/app-prototype/ui/AppPrototype';
import { CertificatesPage } from './pages/certificates/ui/CertificatesPage';
import { TravelApp } from './pages/travel-prototypes/TravelApp';

import { DIProvider } from './shared/di/DIContext';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { MarketingEngine } from './app/providers/MarketingEngine';
import { Toaster } from 'sonner';

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
      {/* Protected Routes (Main Site) */}
      <Route element={<DevAuthGate />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Dynamic FSD Categories and Services */}
          <Route path="/services" element={<CategoryPage />} />
          <Route path="/services/:categoryId" element={<CategoryPage />} />
          <Route path="/services/:categoryId/:serviceId" element={<ServicePage />} />
          <Route path="/service/:serviceId" element={<ServicePage />} />

          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/special-offers" element={<SpecialOffersPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/profile" element={<div className="p-8 text-center text-gray-500">Раздел в разработке</div>} />
        </Route>

        <Route path="/admin/integration" element={<IntegrationPage />} />
        <Route path="/admin/diagnostics" element={<DiagnosticTools />} />
      </Route>

      {/* App Prototype Routes */}
      <Route path="/app-launch" element={<AppLaunchPage />} />
      <Route path="/app/*" element={<AppPrototype />} />
      
      {/* Travel Architecture Prototypes */}
      <Route path="/travel-prototype/*" element={<TravelApp />} />

      {/* Sandbox Route for testing widgets */}
      <Route path="/sandbox" element={<SandboxPage />} />

      {/* Test route for links to doctors */}
      <Route path="/booking/test-doctors-links" element={<TestDoctorsPage />} />

      {/* Public Routes (Booking Widget) */}
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
    </Routes>
  );
}

function App() {
  return (
    <DIProvider>
      <ThemeProvider>
        <QueryProvider>
          <AccessibilityProvider>
            <BrowserRouter>
              <MarketingEngine />
              <EventDelegator />
              <ScrollToTop />
              <AccessibilityPanel />
              <AppRoutes />
              <DevModeToggle />
              <DevChangeHighlighter />
              <Toaster position="bottom-right" theme="light" />
            </BrowserRouter>
          </AccessibilityProvider>
        </QueryProvider>
      </ThemeProvider>
    </DIProvider>
  );
}

export default App;
