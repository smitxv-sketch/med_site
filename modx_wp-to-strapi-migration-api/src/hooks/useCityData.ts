import { useState, useEffect } from 'react';

export function useCityData(city: string) {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [faq, setFaq] = useState<any[]>([]);
  const [advantages, setAdvantages] = useState<any[]>([]);
  const [anonces, setAnonces] = useState<any[]>([]);
  const [fullGraph, setFullGraph] = useState<any>(null);
  const [allResources, setAllResources] = useState<any[]>([]);
  const [syncLogs, setSyncLogs] = useState<any[]>([]);
  const [excludedIds, setExcludedIds] = useState<number[]>([]);
  const [schemaAnalysis, setSchemaAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const timestamp = new Date().getTime();
        
        // Fetch schema analysis
        fetch('/api/export/schema/analyze')
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setSchemaAnalysis(data.analysis);
            }
          })
          .catch(err => console.error("Failed to fetch analysis:", err));

        if (city === "chelyabinsk") {
          // Fetch Chelyabinsk data
          const [docsRes, servRes, revRes, newsRes, vacRes, clinRes, artRes, faqRes, advRes, anonRes] = await Promise.all([
            fetch(`/api/chel/doctors?t=${timestamp}`),
            fetch(`/api/chel/services?limit=100&t=${timestamp}`),
            fetch(`/api/chel/reviews?limit=100&t=${timestamp}`),
            fetch(`/api/chel/news?limit=100&t=${timestamp}`),
            fetch(`/api/chel/vacancies?limit=100&t=${timestamp}`),
            fetch(`/api/chel/clinics?t=${timestamp}`),
            fetch(`/api/chel/articles?t=${timestamp}`),
            fetch(`/api/chel/faq?limit=100&t=${timestamp}`),
            fetch(`/api/chel/advantages?t=${timestamp}`),
            fetch(`/api/chel/anonces?t=${timestamp}`)
          ]);
          
          if (!docsRes.ok) {
            const errData = await docsRes.json().catch(() => ({}));
            throw new Error(errData.error || "Ошибка получения данных из БД Челябинска.");
          }
          
          const chelDoctors = await docsRes.json();
          const chelServices = servRes.ok ? await servRes.json() : [];
          const chelReviews = revRes.ok ? await revRes.json() : [];
          const chelNews = newsRes.ok ? await newsRes.json() : [];
          const chelVacancies = vacRes.ok ? await vacRes.json() : [];
          const chelClinics = clinRes.ok ? await clinRes.json() : [];
          const chelArticles = artRes.ok ? await artRes.json() : [];
          const chelFaq = faqRes.ok ? await faqRes.json() : [];
          const chelAdvantages = advRes.ok ? await advRes.json() : [];
          const chelAnonces = anonRes.ok ? await anonRes.json() : [];
          
          setDoctors(chelDoctors);
          setServices(chelServices);
          setReviews(chelReviews);
          setNews(chelNews);
          setVacancies(chelVacancies);
          setArticles(chelArticles);
          setFaq(chelFaq);
          setAdvantages(chelAdvantages);
          setAnonces(chelAnonces);
          setFullGraph({ entities: { doctors: chelDoctors, services: chelServices, reviews: chelReviews, news: chelNews, vacancies: chelVacancies, locations: chelClinics, articles: chelArticles, faq: chelFaq, advantages: chelAdvantages, anonces: chelAnonces } });
          setAllResources([...chelDoctors, ...chelServices, ...chelReviews, ...chelNews, ...chelVacancies, ...chelClinics, ...chelArticles, ...chelFaq, ...chelAdvantages, ...chelAnonces]);
          setSyncLogs([]);
          setExcludedIds([]);
        } else {
          // Fetch SPB data
          const [docsRes, servRes, graphRes, logsRes, excludedRes, allGraphRes] = await Promise.all([
            fetch(`/api/doctors?t=${timestamp}`),
            fetch(`/api/services?t=${timestamp}`),
            fetch(`/api/sync/full-graph?t=${timestamp}`),
            fetch(`/api/sync/logs?t=${timestamp}`),
            fetch(`/api/sync/settings/excluded?t=${timestamp}`),
            fetch(`/api/sync/full-graph?include_excluded=true&t=${timestamp}`)
          ]);
          
          if (!servRes.ok) {
            const errData = await servRes.json().catch(() => ({}));
            throw new Error(errData.error || "Ошибка получения данных из БД.");
          }

          setDoctors(await docsRes.json());
          setServices(await servRes.json());
          
          const graphData = await graphRes.json();
          setFullGraph(graphData);
          setReviews(graphData.entities?.reviews || []);
          
          setSyncLogs(await logsRes.json());
          setExcludedIds(await excludedRes.json());
          
          const allGraph = await allGraphRes.json();
          setAllResources(allGraph.entities?.resources || []);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Произошла непредвиденная ошибка.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  return {
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
    setExcludedIds
  };
}
