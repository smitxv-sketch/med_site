import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import apiRouter from "./server/routes/api.js";
import { initBridgeDb } from "./server/bridgeDb.js";
import {
  assertProductionAuthConfigured,
  createAuthMiddleware,
} from "./server/middleware/auth.js";

/** Локально — .env или infra/env; на Coolify переменные уже в process.env */
function loadLocalEnv() {
  if (process.env.NODE_ENV === "production") return;
  const candidates = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "../infra/env/legacy-bridge-istochnik.env"),
  ];
  for (const filePath of candidates) {
    if (fs.existsSync(filePath)) {
      dotenv.config({ path: filePath, override: true });
      break;
    }
  }
}

loadLocalEnv();
assertProductionAuthConfigured();

async function startServer() {
  await initBridgeDb();
  const app = express();
  const PORT = parseInt(process.env.PORT || '3010');
  const HOST = process.env.HOST || "0.0.0.0";

  app.use(express.json());

  // Защита UI + API (обязательна в production через SITE_PASSWORD)
  app.use(createAuthMiddleware());

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
