import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/header/ui/Header";
import { BottomNav } from "../../widgets/bottom-nav/ui/BottomNav";
import { MobileMenu } from "../../widgets/mobile-menu/ui/MobileMenu";
import { Footer } from "../../widgets/footer/ui/Footer";
import { CitySelectorModal } from "../../widgets/city-selector/ui/CitySelectorModal";
import { ErrorBoundary } from "../providers/ErrorBoundary";
import { useLayoutBottomInset } from "@/shared/hooks/useLayoutBottomInset";

function PageFallback() {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
    </div>
  );
}

export function MainLayout() {
  useLayoutBottomInset();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-teal-200 flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-[80px] sm:pt-[96px] pb-[var(--layout-bottom-inset,env(safe-area-inset-bottom))] w-full flex flex-col">
          <ErrorBoundary>
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
      </main>

      <Footer />
      <BottomNav />
      <MobileMenu />
      <CitySelectorModal />
    </div>
  );
}
