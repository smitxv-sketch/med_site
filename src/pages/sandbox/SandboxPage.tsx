import React, { useState, useEffect } from "react";
import { PageRenderer } from "@/shared/ui/PageRenderer";
import { PageBlock } from "@/shared/types/block";
import { Link } from "react-router-dom";
import { ArrowLeft, Beaker } from "lucide-react";
import { SectionErrorBoundary } from "@/shared/ui/SectionErrorBoundary";

export function SandboxPage() {
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  // Store usage was removed since setDevMode is not defined

  // Load from local storage or set default
  useEffect(() => {
    const loadBlocks = () => {
      try {
        const saved = localStorage.getItem("laboratory_blocks");
        if (saved) {
          try {
            setBlocks(JSON.parse(saved));
          } catch (e) {
            setBlocks([]);
          }
        }
      } catch (e) {
        console.error("localStorage access denied", e);
      }
    };

    loadBlocks();
    window.addEventListener("sandbox_updated", loadBlocks);
    window.addEventListener("storage", loadBlocks);
    return () => {
      window.removeEventListener("sandbox_updated", loadBlocks);
      window.removeEventListener("storage", loadBlocks);
    };
  }, []);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("laboratory_blocks", JSON.stringify(blocks));
    } catch (e) {
      console.error("localStorage access denied", e);
    }
  }, [blocks]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 w-full overflow-x-hidden">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Beaker className="w-5 h-5 text-blue-500" />
              <h1 className="font-bold text-gray-900 text-base sm:text-lg whitespace-nowrap">
                Песочница
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 hidden md:inline-block">
              Соберите свою страницу из готовых виджетов
            </span>
            <button
              onClick={() => {
                if (confirm("Очистить песочницу?")) setBlocks([]);
              }}
              className="text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              Очистить
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 sm:mt-8 px-4 md:px-8">
        {blocks.length === 0 && (
          <div className="text-center py-12 sm:py-20 bg-white border border-gray-200 border-dashed rounded-3xl mb-8">
            <Beaker className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Добро пожаловать в Лабораторию!
            </h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm sm:text-base">
              Здесь вы можете собирать интерфейсы из готовых блоков-виджетов,
              настраивать их контент и проверять работу всей архитектуры, не
              влияя на основной сайт.
            </p>
          </div>
        )}

        <SectionErrorBoundary fallbackMessage="Ошибка рендера виджетов песочницы.">
          <PageRenderer
            blocks={blocks}
            onUpdateBlocks={setBlocks}
            forceDevMode={true}
          />
        </SectionErrorBoundary>
      </div>
    </div>
  );
}
