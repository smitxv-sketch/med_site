import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.BFF_PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'bff',
    dataMode: process.env.DATA_MODE ?? 'mock',
  });
});

app.listen(port, () => {
  console.log(`[bff] listening on http://localhost:${port}`);
});
