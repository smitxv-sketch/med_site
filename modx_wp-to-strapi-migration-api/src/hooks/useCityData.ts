import { useState, useEffect } from 'react';
import {
  fetchBridgeAll,
  unwrapBridgePayload,
} from '../lib/bridgeClient.js';

/** Размер страницы при полной выгрузке Челябинска (не больше server max) */
const CHELL_PAGE_SIZE = 20;

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
  /** Прогресс пошаговой загрузки (защита Beget — не параллельный шквал) */
  const [loadProgress, setLoadProgress] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setLoadProgress(null);

      try {
        const timestamp = new Date().getTime();

        fetch('/api/export/schema/analyze')
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setSchemaAnalysis(data.analysis);
            }
          })
          .catch((err) => console.error('Failed to fetch analysis:', err));

        if (city === 'chelyabinsk') {
          // Последовательно, с пагинацией — см. GET /api/legacy/guard
          setLoadProgress('Врачи…');
          const docsRes = await fetch(`/api/chel/doctors?t=${timestamp}`);
          if (!docsRes.ok) {
            const errData = await docsRes.json().catch(() => ({}));
            throw new Error(errData.error || 'Ошибка получения данных из БД Челябинска.');
          }
          const chelDoctors = unwrapBridgePayload(await docsRes.json()).data;

          const loadChunked = async (label: string, path: string) => {
            setLoadProgress(`${label} (частями)…`);
            return fetchBridgeAll(`${path}?t=${timestamp}`, CHELL_PAGE_SIZE);
          };

          const chelServices = await loadChunked('Услуги', '/api/chel/services');
          const chelReviews = await loadChunked('Отзывы', '/api/chel/reviews');
          const chelNews = await loadChunked('Новости', '/api/chel/news');
          const chelVacancies = await loadChunked('Вакансии', '/api/chel/vacancies');
          const chelClinics = await loadChunked('Клиники', '/api/chel/clinics');
          const chelArticles = await loadChunked('Статьи', '/api/chel/articles');
          const chelFaq = await loadChunked('FAQ', '/api/chel/faq');
          const chelAdvantages = await loadChunked('Преимущества', '/api/chel/advantages');
          const chelAnonces = await loadChunked('Анонсы', '/api/chel/anonces');

          setDoctors(chelDoctors);
          setServices(chelServices);
          setReviews(chelReviews);
          setNews(chelNews);
          setVacancies(chelVacancies);
          setArticles(chelArticles);
          setFaq(chelFaq);
          setAdvantages(chelAdvantages);
          setAnonces(chelAnonces);
          setFullGraph({
            entities: {
              doctors: chelDoctors,
              services: chelServices,
              reviews: chelReviews,
              news: chelNews,
              vacancies: chelVacancies,
              locations: chelClinics,
              articles: chelArticles,
              faq: chelFaq,
              advantages: chelAdvantages,
              anonces: chelAnonces,
            },
          });
          setAllResources([
            ...chelDoctors,
            ...chelServices,
            ...chelReviews,
            ...chelNews,
            ...chelVacancies,
            ...chelClinics,
            ...chelArticles,
            ...chelFaq,
            ...chelAdvantages,
            ...chelAnonces,
          ]);
          setSyncLogs([]);
          setExcludedIds([]);
          setLoadProgress(null);
        } else {
          const [docsRes, servRes, graphRes, logsRes, excludedRes, allGraphRes] =
            await Promise.all([
              fetch(`/api/doctors?t=${timestamp}`),
              fetch(`/api/services?t=${timestamp}`),
              fetch(`/api/sync/full-graph?t=${timestamp}`),
              fetch(`/api/sync/logs?t=${timestamp}`),
              fetch(`/api/sync/settings/excluded?t=${timestamp}`),
              fetch(`/api/sync/full-graph?include_excluded=true&t=${timestamp}`),
            ]);

          if (!servRes.ok) {
            const errData = await servRes.json().catch(() => ({}));
            throw new Error(errData.error || 'Ошибка получения данных из БД.');
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
        setError(err.message || 'Произошла непредвиденная ошибка.');
        setLoadProgress(null);
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
    loadProgress,
    setExcludedIds,
  };
}
