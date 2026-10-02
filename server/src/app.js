/* The Fastify app, built without listening so tests can drive it in-process. */
import Fastify from "fastify";
import cookie from "@fastify/cookie";
import { config } from "./config.js";
import { attachUser } from "./lib/auth.js";
import authRoutes from "./routes/auth.js";
import orgRoutes from "./routes/orgs.js";
import dataRoutes from "./routes/data.js";
import screeningRoutes from "./routes/screening.js";
import aiRoutes from "./routes/ai.js";

const SAFE = new Set(["GET", "HEAD", "OPTIONS"]);

export async function buildApp({ logger = false } = {}) {
  const app = Fastify({
    logger,
    bodyLimit: 2 * 1024 * 1024,   // JSON only; photographs go to object storage
    trustProxy: true              // required for req.ip behind a load balancer
  });

  await app.register(cookie);

  /* CORS, by explicit allowlist. Credentials travel with these requests, so a
     wildcard origin is not an option — it would let any site on the internet
     make authenticated calls with a signed-in user's cookie. */
  app.addHook("onRequest", async (req, reply) => {
    const origin = req.headers.origin;
    if (origin && config.allowedOrigins.includes(origin)) {
      reply.header("Access-Control-Allow-Origin", origin);
      reply.header("Vary", "Origin");
      reply.header("Access-Control-Allow-Credentials", "true");
      reply.header("Access-Control-Allow-Headers", "content-type");
      reply.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
    }
    if (req.method === "OPTIONS") return reply.code(204).send();
  });

  /* CSRF. SameSite=Lax already blocks the cross-site form post, but a browser
     that does not honour it, or a future same-site subdomain, should not be the
     only thing standing between a user and an unwanted write. Every unsafe
     method must carry an Origin this server recognises. */
  app.addHook("onRequest", async (req, reply) => {
    if (SAFE.has(req.method)) return;
    const origin = req.headers.origin;
    if (origin && !config.allowedOrigins.includes(origin)) {
      return reply.code(403).send({ error: "origin not allowed" });
    }
  });

  app.addHook("preHandler", async (req) => { await attachUser(req); });

  /* Security headers. The API serves JSON, never markup, so the policy can be
     as tight as it goes. */
  app.addHook("onSend", async (req, reply, payload) => {
    reply.header("X-Content-Type-Options", "nosniff");
    reply.header("Referrer-Policy", "no-referrer");
    reply.header("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
    reply.header("Cache-Control", "no-store");
    return payload;
  });

  app.setErrorHandler((err, req, reply) => {
    const status = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;
    // A 500's detail goes to the log, not to the client: internal messages leak
    // table names, column names and query shapes.
    if (status >= 500) req.log?.error({ err }, "unhandled error");
    reply.code(status).send({ error: status >= 500 ? "something went wrong" : err.message });
  });

  app.get("/api/health", async () => ({ ok: true, env: config.env }));

  await app.register(authRoutes);
  await app.register(orgRoutes);
  await app.register(dataRoutes);
  await app.register(screeningRoutes);
  await app.register(aiRoutes);

  return app;
}
