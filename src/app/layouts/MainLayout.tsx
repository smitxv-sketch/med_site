import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/header/ui/Header';
import { BottomNav } from '../../widgets/bottom-nav/ui/BottomNav';
import { MobileMenu } from '../../widgets/mobile-menu/ui/MobileMenu';
import { Footer } from '../../widgets/footer/ui/Footer';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-teal-200 flex flex-col overflow-x-hidden">
      <Header />
      
      {/* Main Content Area */}
      {/* pt-24 to account for fixed header with a smaller gap */}
      <main className="flex-1 pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Outlet />
      </main>

      <Footer />
      <BottomNav />
      <MobileMenu />
    </div>
  );
}
