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
