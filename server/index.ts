import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadConfig } from './services/configService.js';
import { qmsDriver } from './drivers/QmsDriver.js';
import { bookingSchema } from './schemas/booking.js';
import { z } from 'zod';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

// Load configs
// Note: topology is no longer used for doctors/services, but might be used for other settings
// const topology = loadConfig('topology'); 

import { getDiagnostics } from './services/diagnosticsService.js';
import { testExternalConnection } from './services/proxyService.js';

// API Routes
app.get('/api/news', async (_req, res) => {
  try {
    const response = await axios.get('http://109.205.212.64:1337/api/news?populate=*');
    res.json(response.data);
  } catch (error: any) {
    console.error('Failed to proxy news request:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.get('/api/media/*', async (req, res) => {
  try {
    const mediaPath = (req.params as any)[0];
    const response = await axios.get(`http://109.205.212.64:1337/${mediaPath}`, {
      responseType: 'stream'
    });
    response.data.pipe(res);
  } catch (error: any) {
    console.error('Failed to proxy media request:', error.message);
    res.status(404).send('Not found');
  }
});

app.get('/api/diagnostics', async (_req, res) => {
  res.json(await getDiagnostics());
});

app.get('/api/diagnostics/test-connection', async (req, res) => {
  const city = req.query.city as string || 'chel';
  const result = await testExternalConnection(city);
  res.json(result);
});

// Catalog Routes - Now using QMS Driver
import { getWpDoctors, checkWpConnection, getWpUserMeta, clearWpCache } from './services/wpService.js';
import axios from 'axios';

app.get('/api/diagnostics/wp-status', async (_req, res) => {
  const wpStatus = await checkWpConnection();
  res.json({
    wp: wpStatus
  });
});

app.post('/api/diagnostics/wp-meta', async (req, res) => {
  const { userIds } = req.body;
  if (!userIds || !Array.isArray(userIds)) {
    return res.status(400).json({ error: 'Invalid userIds' });
  }
  const meta = await getWpUserMeta(userIds);
  res.json(meta);
});

import { getLinkingSuggestions, linkDoctor } from './services/doctorLinkingService.js';

app.get('/api/diagnostics/doctor-matches', async (req, res) => {
  try {
    const city = req.query.city as string || 'chel';
    const data = await getLinkingSuggestions(city);
    res.json(data);
  } catch (error: any) {
    console.error('Failed to get linking suggestions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/diagnostics/link-doctor', async (req, res) => {
  try {
    const { wpUserId, qmsId } = req.body;
    if (!wpUserId || !qmsId) {
      return res.status(400).json({ error: 'Missing wpUserId or qmsId' });
    }
    const result = await linkDoctor(wpUserId, qmsId);
    res.json(result);
  } catch (error: any) {
    console.error('Failed to link doctor:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/diagnostics/env', (_req, res) => {
  res.json({
    address: process.env.QMS_CHEL_ADDRESS,
    key: process.env.QMS_CHEL_API_KEY
  });
});

app.get('/api/test-qms-all', async (_req, res) => {
  try {
    // Run the script using the main process's environment variables
    const { stdout, stderr } = await execPromise('npx tsx test-qms-all-slots.ts', {
      env: { ...process.env } // Pass the current environment variables
    });
    res.json({ stdout, stderr });
  } catch (error: any) {
    res.status(500).json({ error: error.message, stdout: error.stdout, stderr: error.stderr });
  }
});

app.post('/api/diagnostics/qms-proxy', async (req, res) => {
  const { endpoint, params, city } = req.body;
  
  // Use existing QMS driver logic to get URL and Key
  // But we need to expose the helpers or duplicate logic slightly
  // Let's just use the env vars directly for simplicity in this diagnostic endpoint
  
  const cityCode = city || 'chel';
  const tenants = loadConfig('tenants');
  const tenant = tenants[cityCode];
  
  if (!tenant) {
    return res.status(400).json({ error: 'Invalid city' });
  }
  
  const proxyUrl = process.env[tenant.addressEnv];
  const apiKey = process.env[tenant.apiEnv];
  
  if (!proxyUrl || !apiKey) {
    return res.status(500).json({ error: 'Configuration missing' });
  }
  
  let url = proxyUrl;
  if (!url.startsWith('http')) url = `https://${url}`;
  
  // Construct URL similar to QmsDriver
  const isProxy = url.includes('.php') || url.includes('?');
  if (isProxy) {
    let baseUrl = url;
    if (baseUrl.includes('?endpoint=')) baseUrl = baseUrl.replace('?endpoint=', '');
    else if (baseUrl.includes('&endpoint=')) baseUrl = baseUrl.replace('&endpoint=', '');
    
    const separator = baseUrl.includes('?') ? '&' : '?';
    url = `${baseUrl}${separator}endpoint=${endpoint}`;
  } else {
    url = `${url.replace(/\/$/, '')}/${endpoint}/`;
  }
  
  const finalParams = new URLSearchParams();
  finalParams.append('apikey', apiKey);
  
  if (params) {
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        finalParams.append(key, String(params[key]));
      }
    }
  }
  
  try {
    const response = await axios.post(url, finalParams.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': apiKey,
        'apikey': apiKey
      },
      timeout: 60000
    });
    
    res.json(response.data);
  } catch (error: any) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: error.message, details: error.response?.data });
  }
});

app.get('/api/wp-doctors', async (_req, res) => {
  try {
    const doctors = await getWpDoctors();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching WP doctors:', error);
    res.status(500).json({ error: 'Failed to fetch WP doctors' });
  }
});

app.post('/api/wp-doctors/clear-cache', async (_req, res) => {
  await clearWpCache();
  res.json({ success: true, message: 'Cache cleared' });
});

import { hydrateDoctors } from './services/hydratorService.js';

app.get('/api/doctors', async (req, res) => {
  const city = req.query.city as string || 'chel';
  const specialty = req.query.specialty as string;
  const rawDoctors = await qmsDriver.getDoctors(city, specialty);
  const doctors = await hydrateDoctors(rawDoctors);
  res.json(doctors);
});

app.get('/api/services', async (req, res) => {
  const city = req.query.city as string || 'chel';
  const services = await qmsDriver.getServices(city);
  res.json(services);
});

app.get('/api/theme', (_req, res) => {
  const theme = loadConfig('theme');
  res.json(theme);
});

app.get('/api/branches', (_req, res) => {
  const branches = loadConfig('branches');
  res.json(branches);
});

app.get('/api/config', (_req, res) => {
  const logic = loadConfig('logic');
  res.json(logic);
});

app.get('/api/text', (_req, res) => {
  const text = loadConfig('text');
  res.json(text);
});

app.get('/api/slots', async (req, res) => {
  const { doctor_id, date, specialty } = req.query;
  const city = req.query.city as string || 'chel'; // Support city param

  const slots = await qmsDriver.getSlots(
    city,
    doctor_id as string,
    date as string | undefined,
    specialty as string
  );
  
  const rawData = await qmsDriver.getRawSlots(
    city,
    doctor_id as string,
    date as string | undefined
  );

  res.json({ slots, rawData });
});

app.post('/api/book', async (req, res) => {
  try {
    const validatedData = bookingSchema.parse(req.body);
    const city = validatedData.databaseId ? validatedData.databaseId.split('_')[0] : 'chel';
    
    const result = await qmsDriver.createAppointment(city, validatedData);

    if (result.success) {
      res.json({ success: true, message: 'Booking confirmed', booking: result.data });
    } else {
      res.status(400).json({ error: result.error || 'Booking failed', details: (result as any).details });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

import { generateText, generateLayoutBlocks } from './services/aiService.js';

app.post('/api/generate', async (req, res) => {
  try {
    const text = await generateText(req.body);
    res.json({ text });
  } catch (error: any) {
    console.error('Text generation error:', error);
    res.status(500).json({ error: error.message || 'Generation failed' });
  }
});

app.post('/api/generate-layout', async (req, res) => {
  try {
    const result = await generateLayoutBlocks(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Layout generation error:', error);
    res.status(500).json({ error: error.message || 'Layout generation failed' });
  }
});

// Serve static files in production (skip on Vercel)
if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

// Vite integration for dev (skip on Vercel)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  import('vi' + 'te').then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware attached');
  });
}

if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
