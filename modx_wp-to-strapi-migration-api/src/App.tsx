import React, { useState, useEffect } from "react";
import { Users, Briefcase, Share2, MapPin, FileText, Image as ImageIcon, ArrowRightLeft, LayoutTemplate, Settings, Tag, Search, Database, Download, Stethoscope, RefreshCw } from "lucide-react";
import { Doctor, Service } from "./types";
import { Header } from "./components/Header";
import { EntityCard } from "./components/EntityCard";
import { JsonModal } from "./components/JsonModal";
import { DetailView } from "./components/DetailView";
import { GraphView } from "./components/GraphView";
import { ConfigView } from "./components/ConfigView";
import { SeoAnalytics } from "./components/SeoAnalytics";
import { EntityLists } from "./components/EntityLists";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DataExplorer } from "./components/DataExplorer";
import { DbDumper } from "./components/DbDumper";
import { SchemaBuilder } from "./components/SchemaBuilder";
import { ExportView } from "./components/ExportView";
import { SyncView } from "./components/SyncView";
import { useCityData } from "./hooks/useCityData";

export default function App() {
  const [city, setCity] = useState<"spb" | "chelyabinsk">("spb");
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [viewMode, setViewMode] = useState<"list" | "detail">("list");
  const [configFilter, setConfigFilter] = useState<number | "all">("all");
  const [selectedItem, setSelectedItem] = useState<{ type: string, data: any } | null>(null);
  const [currentDetail, setCurrentDetail] = useState<{ type: string, data: any } | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });

  const {
    doctors,
    services,
    reviews,
    news,
    vacancies,
    articles,
    faq,
    advantages,
    anonces,
    fullGraph,
    allResources,
    syncLogs,
    excludedIds,
    schemaAnalysis,
    loading,
    error,
    loadProgress,
    setExcludedIds
  } = useCityData(city);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setViewMode("list");
    setCurrentDetail(null);
  };

  useEffect(() => {
    if (fullGraph && fullGraph.entities) {
      const newNodes: any[] = [];
      const newLinks: any[] = [];
      const nodeIds = new Set<string>();

      const addNode = (id: string, name: string, group: number, val: number) => {
        if (!nodeIds.has(id)) {
          newNodes.push({ id, name, group, val });
          nodeIds.add(id);
        }
      };

      // Локации
      fullGraph.entities.locations?.forEach((l: any) => {
        addNode(`loc_${l.id}`, l.name || `Локация ${l.id}`, 3, 3);
      });

      // Врачи
      fullGraph.entities.doctors?.forEach((d: any) => {
        addNode(`doc_${d.id}`, d.pagetitle, 1, 2);
        
        if (d.tvs?.loc) {
           const locIds = Array.isArray(d.tvs.loc) ? d.tvs.loc : String(d.tvs.loc).split('||');
           locIds.forEach((locId: string) => {
              const lid = parseInt(locId);
              if (!isNaN(lid)) {
                 addNode(`loc_${lid}`, lid === 1 ? 'Финский пер., 4' : `Локация ${lid}`, 3, 3);
                 newLinks.push({ source: `doc_${d.id}`, target: `loc_${lid}` });
              }
           });
        }

        if (d.tvs?.uslugiPrice && Array.isArray(d.tvs.uslugiPrice)) {
           d.tvs.uslugiPrice.forEach((u: any) => {
              if (u.service) {
                 const sid = parseInt(u.service);
                 if (!isNaN(sid)) {
                    addNode(`srv_${sid}`, `Услуга ${sid}`, 2, 1.5);
                    newLinks.push({ source: `doc_${d.id}`, target: `srv_${sid}` });
                 }
              }
           });
        }
      });
      
      // Услуги
      fullGraph.entities.services?.forEach((s: any) => {
        addNode(`srv_${s.id}`, s.pagetitle || s.title, 2, 1.5);
        
        if (s.tvs?.loc) {
           const locIds = Array.isArray(s.tvs.loc) ? s.tvs.loc : String(s.tvs.loc).split('||');
           locIds.forEach((locId: string) => {
              const lid = parseInt(locId);
              if (!isNaN(lid)) {
                 addNode(`loc_${lid}`, lid === 1 ? 'Финский пер., 4' : `Локация ${lid}`, 3, 3);
                 newLinks.push({ source: `srv_${s.id}`, target: `loc_${lid}` });
              }
           });
        }
      });

      // Отзывы
      fullGraph.entities.reviews?.forEach((r: any) => {
        addNode(`rev_${r.id}`, r.pagetitle || r.title || `Отзыв ${r.id}`, 5, 1);
        
        if (r.doctor_id) {
          addNode(`doc_${r.doctor_id}`, `Врач ${r.doctor_id}`, 1, 2);
          newLinks.push({ source: `rev_${r.id}`, target: `doc_${r.doctor_id}` });
        }
        
        if (r.service_id) {
          addNode(`srv_${r.service_id}`, `Услуга ${r.service_id}`, 2, 1.5);
          newLinks.push({ source: `rev_${r.id}`, target: `srv_${r.service_id}` });
        }
      });

      // Акции (Promotions)
      fullGraph.entities.articles?.forEach((a: any) => {
        if (a.template === 19) {
          addNode(`promo_${a.id}`, a.pagetitle, 4, 2);
          if (a.tvs?.specListAction) {
            const docIds = Array.isArray(a.tvs.specListAction) ? a.tvs.specListAction : String(a.tvs.specListAction).split('||');
            docIds.forEach((docId: string) => {
              const did = parseInt(docId);
              if (!isNaN(did)) {
                 newLinks.push({ source: `promo_${a.id}`, target: `doc_${did}` });
              }
            });
          }
        }
      });

      setGraphData({ nodes: newNodes, links: newLinks });
    } else {
      setGraphData({ nodes: [], links: [] });
    }
  }, [fullGraph]);

  const toggleExclusion = async (resourceId: number, currentExcluded: boolean) => {
    try {
      const res = await fetch("/api/sync/settings/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource_id: resourceId, exclude: !currentExcluded })
      });
      if (res.ok) {
        setExcludedIds(prev => 
          !currentExcluded 
            ? [...prev, resourceId] 
            : prev.filter(id => id !== resourceId)
        );
      }
    } catch (e) {
      console.error("Ошибка переключения исключения", e);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <Header city={city} setCity={setCity} handleTabChange={handleTabChange} error={error} />

      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {error && (
          <div className="mb-8 p-6 border border-red-500/30 bg-red-50 text-red-700 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Ошибка подключения</h2>
            <p className="font-mono text-sm">{error}</p>
          </div>
        )}

        {loading && !error && (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#141414]"></div>
            {loadProgress && (
              <p className="text-sm text-slate-600 text-center max-w-md">
                {loadProgress}
                <span className="block text-xs text-slate-400 mt-1">
                  Данные загружаются частями — защита БД Beget
                </span>
              </p>
            )}
          </div>
        )}

        {!loading && !error && activeTab === "overview" && (
          <div className="space-y-8">
            {city === 'spb' ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <EntityCard title="Врачи" count={doctors?.length || 0} icon={<Users size={24} />} onClick={() => handleTabChange("doctors")} />
                <EntityCard title="Отзывы" count={fullGraph?.entities?.reviews?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("reviews")} />
                <EntityCard title="Услуги" count={services?.length || 0} icon={<Briefcase size={24} />} onClick={() => handleTabChange("services")} />
                <EntityCard title="Программы" count={fullGraph?.entities?.programs?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("programs")} />
                <EntityCard title="Прайс-лист" count={fullGraph?.entities?.price_items?.length || 0} icon={<Tag size={24} />} onClick={() => handleTabChange("prices")} />
                <EntityCard title="Локации" count={fullGraph?.entities?.locations?.length || 0} icon={<MapPin size={24} />} onClick={() => handleTabChange("locations")} />
                <EntityCard title="Филиалы" count={fullGraph?.entities?.branches?.length || 0} icon={<MapPin size={24} />} onClick={() => handleTabChange("branches")} />
                <EntityCard title="Оборудование" count={fullGraph?.entities?.equipment?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("equipment")} />
                <EntityCard title="Вакансии" count={fullGraph?.entities?.vacancies?.length || 0} icon={<Briefcase size={24} />} onClick={() => handleTabChange("vacancies")} />
                <EntityCard title="Новости" count={fullGraph?.entities?.news?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("news")} />
                <EntityCard title="Акции" count={fullGraph?.entities?.promotions?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("promotions")} />
                <EntityCard title="Статьи" count={fullGraph?.entities?.articles?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("articles")} />
                <EntityCard title="Медиафайлы" count={fullGraph?.entities?.media?.length || 0} icon={<ImageIcon size={24} />} onClick={() => handleTabChange("media")} />
                <EntityCard title="Редиректы" count={fullGraph?.entities?.redirects?.length || 0} icon={<ArrowRightLeft size={24} />} onClick={() => handleTabChange("redirects")} />
                <EntityCard title="Все страницы" count={fullGraph?.entities?.resources?.length || 0} icon={<LayoutTemplate size={24} />} onClick={() => handleTabChange("pages")} />
                <EntityCard title="Граф связей" count={graphData.nodes.length} icon={<Share2 size={24} />} onClick={() => handleTabChange("graph")} />
                <EntityCard title="SEO Аналитика" count={fullGraph?.entities?.resources?.length || 0} icon={<Search size={24} />} onClick={() => handleTabChange("seo")} />
                <EntityCard title="Сырые данные" count={Object.keys(fullGraph?.entities || {}).length} icon={<Database size={24} />} onClick={() => handleTabChange("explorer")} />
                <EntityCard title="Экспорт JSON" count={30} icon={<Download size={24} />} onClick={() => handleTabChange("export")} />
                <EntityCard title="Синхронизация" count={0} icon={<RefreshCw size={24} />} onClick={() => handleTabChange("sync")} />
                <EntityCard title="Схема (Strapi)" count={2} icon={<FileText size={24} />} onClick={() => handleTabChange("schema")} />
                <EntityCard title="Конфигурация" count={allResources.length} icon={<Settings size={24} />} onClick={() => handleTabChange("configuration")} />
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <EntityCard title="Врачи (REST API)" count={doctors?.length || 0} icon={<Users size={24} />} onClick={() => handleTabChange("doctors")} />
                <EntityCard title="Услуги (WP)" count={services?.length || 0} icon={<Stethoscope size={24} />} onClick={() => handleTabChange("services")} />
                <EntityCard title="Клиники (WP)" count={fullGraph?.entities?.locations?.length || 0} icon={<MapPin size={24} />} onClick={() => handleTabChange("locations")} />
                <EntityCard title="Отзывы (WP)" count={reviews?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("reviews")} />
                <EntityCard title="Новости (WP)" count={news?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("news")} />
                <EntityCard title="Вакансии (WP)" count={vacancies?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("vacancies")} />
                <EntityCard title="Статьи (WP)" count={articles?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("articles")} />
                <EntityCard title="Вопрос-ответ (WP)" count={faq?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("faq")} />
                <EntityCard title="Преимущества (WP)" count={advantages?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("advantages")} />
                <EntityCard title="Анонсы (WP)" count={anonces?.length || 0} icon={<FileText size={24} />} onClick={() => handleTabChange("anonces")} />
                <EntityCard title="Сырые данные (WP)" count={0} icon={<Database size={24} />} onClick={() => handleTabChange("explorer")} />
                <EntityCard title="Дамп БД (WP)" count={1} icon={<Database size={24} />} onClick={() => handleTabChange("dump")} />
                <EntityCard title="Экспорт JSON (WP)" count={2} icon={<Download size={24} />} onClick={() => handleTabChange("export")} />
                <EntityCard title="Синхронизация" count={0} icon={<RefreshCw size={24} />} onClick={() => handleTabChange("sync")} />
              </div>
            )}
          </div>
        )}

        {/* Списки сущностей */}
        {!loading && !error && viewMode === "list" && activeTab !== "overview" && activeTab !== "graph" && activeTab !== "configuration" && activeTab !== "seo" && activeTab !== "explorer" && activeTab !== "dump" && activeTab !== "schema" && activeTab !== "export" && activeTab !== "sync" && (
          <EntityLists 
            activeTab={activeTab} 
            doctors={doctors} 
            services={services} 
            fullGraph={fullGraph} 
            handleTabChange={handleTabChange} 
            setCurrentDetail={setCurrentDetail} 
            setViewMode={setViewMode} 
            schemaAnalysis={schemaAnalysis}
          />
        )}

        {!loading && !error && activeTab === "dump" && (
          <DbDumper />
        )}

        {!loading && !error && activeTab === "export" && (
          <ExportView handleTabChange={handleTabChange} city={city} />
        )}

        {!loading && !error && activeTab === "sync" && (
          <SyncView />
        )}

        {!loading && !error && activeTab === "schema" && (
          <SchemaBuilder doctors={doctors} services={services} fullGraph={fullGraph} />
        )}

        {/* Детальный просмотр */}
        {!loading && !error && viewMode === "detail" && currentDetail && (
          <ErrorBoundary>
            <DetailView 
              currentDetail={currentDetail} 
              setViewMode={setViewMode} 
              setCurrentDetail={setCurrentDetail} 
              setSelectedItem={setSelectedItem} 
              fullGraph={fullGraph}
              schemaAnalysis={schemaAnalysis}
            />
          </ErrorBoundary>
        )}

        {/* Граф связей */}
        {!loading && !error && activeTab === "graph" && (
          <GraphView 
            graphData={graphData} 
            fullGraph={fullGraph} 
            doctors={doctors} 
            services={services} 
            setSelectedItem={setSelectedItem} 
            setActiveTab={setActiveTab} 
            setCurrentDetail={setCurrentDetail} 
            setViewMode={setViewMode} 
          />
        )}

        {/* Конфигурация */}
        {!loading && !error && activeTab === "configuration" && (
          <ConfigView 
            allResources={allResources} 
            configFilter={configFilter} 
            setConfigFilter={setConfigFilter} 
            excludedIds={excludedIds} 
            toggleExclusion={toggleExclusion} 
            setSelectedItem={setSelectedItem} 
            handleTabChange={handleTabChange} 
          />
        )}

        {/* SEO Аналитика */}
        {!loading && !error && activeTab === "seo" && (
          <SeoAnalytics 
            fullGraph={fullGraph} 
            handleTabChange={handleTabChange} 
          />
        )}

        {/* Сырые данные (Data Explorer) */}
        {!loading && !error && activeTab === "explorer" && (
          <DataExplorer 
            fullGraph={fullGraph} 
            doctors={doctors}
            services={services}
            handleTabChange={handleTabChange} 
          />
        )}
      </main>

      {/* Модальное окно для JSON */}
      {selectedItem && (
        <JsonModal selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
