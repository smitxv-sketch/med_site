import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {
  getGlobalLayoutHandler,
  getNavigationHandler,
  getPageHandler,
  getSiteThemeHandler,
} from './routes/content.js';
import {
  getDraftHandler,
  getPresetsHandler,
  patchDraftHandler,
  publishDraftHandler,
} from './routes/studio.js';
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
app.get('/api/site-theme', getSiteThemeHandler);

// Studio API (Command Center) — за Bearer STUDIO_API_SECRET
app.get('/studio/draft', studioAuth, getDraftHandler);
app.patch('/studio/draft', studioAuth, patchDraftHandler);
app.get('/studio/presets', studioAuth, getPresetsHandler);
app.post('/studio/publish', studioAuth, publishDraftHandler);

app.listen(port, () => {
  console.log(`BFF_READY listening on http://localhost:${port}`);
});
