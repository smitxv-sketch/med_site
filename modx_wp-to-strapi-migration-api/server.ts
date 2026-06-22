import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import apiRouter from "./server/routes/api.js";
import {
  assertProductionAuthConfigured,
  createBasicAuthMiddleware,
} from "./server/middleware/basicAuth.js";

dotenv.config();
assertProductionAuthConfigured();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3010');
  const HOST = process.env.HOST || "0.0.0.0";

  app.use(express.json());

  // Защита UI + API (обязательна в production через SITE_PASSWORD)
  app.use(createBasicAuthMiddleware());

  // API Routes
  app.use("/api", apiRouter);

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
