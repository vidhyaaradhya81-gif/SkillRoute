import express from "express";
import path from "path";
import dotenv from "dotenv";
import { loadDb, flushNow } from "./server/db";
import { registerApi } from "./server/api";

dotenv.config();
loadDb();
process.on("SIGINT", () => { flushNow(); process.exit(0); });
process.on("SIGTERM", () => { flushNow(); process.exit(0); });

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  app.set("trust proxy", 1); // needed behind Render / Railway / Nginx so HTTPS and client IPs are detected
  app.disable("x-powered-by");

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });
  app.use(express.json({ limit: "12mb" }));

  // API endpoints
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "SkillRoute Backend" });
  });

  registerApi(app);

  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\nSkillRoute is running. Open  http://localhost:${PORT}  in your browser (do not use 0.0.0.0)\n`);
  });
}

startServer();
