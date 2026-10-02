/* Environment, parsed once and checked loudly.
   A server that boots with a missing secret and fails later, in production,
   under load, is worse than one that refuses to start. */
const required = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set — copy server/.env.example to .env and fill it in`);
  return v;
};

export const config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE_URL || "",
  sessionSecret: process.env.SESSION_SECRET || "",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:8080")
    .split(",").map(s => s.trim()).filter(Boolean),
  cookieSecure: process.env.COOKIE_SECURE === "1",
  anthropicKey: process.env.ANTHROPIC_API_KEY || "",
  sessionTtlDays: 30,
  // A signup with no org gets this many drafting credits.
  signupCredits: 100
};

/* Called at boot by index.js, not at import time, so tests can build an app
   without a full environment. */
export function assertProductionConfig() {
  required("DATABASE_URL");
  const secret = required("SESSION_SECRET");
  if (Buffer.from(secret, "base64").length < 32) {
    throw new Error("SESSION_SECRET must decode to at least 32 bytes of base64");
  }
  if (config.env === "production" && !config.cookieSecure) {
    throw new Error("COOKIE_SECURE=1 is required in production — session cookies must not travel in clear");
  }
  if (config.env === "production" && config.allowedOrigins.some(o => o.startsWith("http://"))) {
    throw new Error("ALLOWED_ORIGINS contains a plain-http origin — credentials would travel in clear");
  }
}
