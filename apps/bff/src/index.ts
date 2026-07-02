import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {
  getGlobalLayoutHandler,
  getGlobalSettingHandler,
  getMarketingContextHandler,
  getNavigationHandler,
  getPageHandler,
  getSiteThemeHandler,
} from './routes/content.js';
import {
  getContentListPageHandler,
  getNewsBySlugHandler,
  getNewsHandler,
  getPromotionBySlugHandler,
  getPromotionsHandler,
  getVacanciesHandler,
  getVacancyBySlugHandler,
} from './routes/contentCatalog.js';
import {
  aiLayoutHandler,
  createLabHandler,
  getDraftHandler,
  getPresetsHandler,
  createPresetHandler,
  updatePresetHandler,
  deletePresetHandler,
  listLabHandler,
  patchDraftHandler,
  publishDraftHandler,
} from './routes/studio.js';
import {
  getBranchesHandler,
  getConfigHandler,
  getServicesHandler,
  getSlotsHandler,
  getTextHandler,
  getThemeHandler,
  getWpDoctorsHandler,
  clearWpDoctorsCacheHandler,
  getBookingDoctorsHandler,
  postBookHandler,
} from './routes/booking.js';
import { getStrapiDoctorsHandler } from './routes/doctors.js';
import { getCatalogPricesHandler } from './routes/catalog.js';
import { getDiagnosticsHandler } from './routes/diagnostics.js';
import {
  applyWinnerHandler,
  createExperimentHandler,
  listExperimentsHandler,
  startExperimentHandler,
  suggestExperimentHandler,
  trackExperimentHandler,
} from './routes/experiments.js';
import { studioAuth } from './middleware/studioAuth.js';
import { getDataMode } from './config/env.js';

const app = express();
const port = Number(process.env.BFF_PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'bff',
    dataMode: getDataMode(),
    ready: true,
  });
});

app.get('/api/pages/:slug', getPageHandler);
app.get('/api/navigation', getNavigationHandler);
app.get('/api/global-layout', getGlobalLayoutHandler);
app.get('/api/global-setting', getGlobalSettingHandler);
app.get('/api/site-theme', getSiteThemeHandler);
app.get('/api/marketing-context', getMarketingContextHandler);

app.get('/api/promotions', getPromotionsHandler);
app.get('/api/promotions/:slug', getPromotionBySlugHandler);
app.get('/api/news', getNewsHandler);
app.get('/api/news/:slug', getNewsBySlugHandler);
app.get('/api/vacancies', getVacanciesHandler);
app.get('/api/vacancies/:slug', getVacancyBySlugHandler);
app.get('/api/content-pages/:slug', getContentListPageHandler);

// Booking widget (виджет /src/widget — read-only, API здесь)
app.get('/api/wp-doctors', getWpDoctorsHandler);
app.post('/api/wp-doctors/clear-cache', clearWpDoctorsCacheHandler);
app.get('/api/branches', getBranchesHandler);
app.get('/api/theme', getThemeHandler);
app.get('/api/text', getTextHandler);
app.get('/api/config', getConfigHandler);
app.get('/api/services', getServicesHandler);
app.get('/api/slots', getSlotsHandler);
app.post('/api/book', postBookHandler);

// Виджет записи: врачи по услуге/специальности (QMS + WP)
app.get('/api/doctors', getBookingDoctorsHandler);

// Каталог врачей для страницы /doctors (Strapi SSOT)
app.get('/api/catalog/doctors', getStrapiDoctorsHandler);

// Каталог прайса: только placement + enabled (не все 741 Service)
app.get('/api/catalog/prices', getCatalogPricesHandler);

// Диагностика (виджет записи вызывает GET /api/diagnostics при инициализации)
app.get('/api/diagnostics', getDiagnosticsHandler);

// Studio API (Command Center) — за Bearer STUDIO_API_SECRET
app.get('/studio/draft', studioAuth, getDraftHandler);
app.patch('/studio/draft', studioAuth, patchDraftHandler);
app.get('/studio/presets', studioAuth, getPresetsHandler);
app.post('/studio/presets', studioAuth, createPresetHandler);
app.put('/studio/presets/:slug', studioAuth, updatePresetHandler);
app.delete('/studio/presets/:slug', studioAuth, deletePresetHandler);
app.post('/studio/publish', studioAuth, publishDraftHandler);
app.post('/studio/ai/layout', studioAuth, aiLayoutHandler);
app.get('/studio/lab', studioAuth, listLabHandler);
app.post('/studio/lab', studioAuth, createLabHandler);

// Wave 3: эксперименты и эволюция
app.get('/studio/experiments', studioAuth, listExperimentsHandler);
app.post('/studio/experiments', studioAuth, createExperimentHandler);
app.post('/studio/experiments/:id/start', studioAuth, startExperimentHandler);
app.get('/studio/experiments/:id/suggest', studioAuth, suggestExperimentHandler);
app.post('/studio/experiments/:id/apply', studioAuth, applyWinnerHandler);
app.post('/api/experiments/:id/track', trackExperimentHandler);

app.listen(port, () => {
  console.log(`BFF_READY listening on http://localhost:${port}`);
});
