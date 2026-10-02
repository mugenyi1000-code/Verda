/* The free screening tool's server side.
 *
 * This endpoint is PUBLIC and takes no session: the whole proposition is that
 * anyone with a plot of land can use it. That makes it the one route a stranger
 * can write to, so it is the one route with its own rate limit and the tightest
 * input validation in the server.
 *
 * It stores the submission because the aggregate is worth something — which
 * sectors ask, in which countries, how often the answer is a full study — and
 * because a monitor who later claims the lead needs the original answers.
 */
import { newId } from "../lib/ids.js";
import { query, one } from "../db.js";
import { requireRole } from "../lib/auth.js";

const TIERS = new Set(["none", "brief", "esia"]);
const COUNTRIES = new Set(["ug", "ke", "tz", "rw", "cd", "zm"]);

/* One submission per IP per 10 seconds, counted in memory.
   The state belongs to the app instance, not to the module: a module-level Map
   is a hidden singleton shared by every app in the process, which makes tests
   interfere with each other and would make two apps in one process share a
   limiter they never agreed to.

   Good enough to stop a script filling the table. A deployment behind more than
   one instance should move this to the database or the proxy, since each
   instance otherwise counts its own share. */
const WINDOW_MS = 10_000;

export default async function screeningRoutes(app, opts = {}) {
  const windowMs = opts.rateLimitMs ?? WINDOW_MS;
  const lastSeen = new Map();
  const rateLimited = (ip) => {
    const now = Date.now();
    for (const [k, t] of lastSeen) if (now - t > 60_000) lastSeen.delete(k);
    const prev = lastSeen.get(ip);
    lastSeen.set(ip, now);
    return prev !== undefined && now - prev < windowMs;
  };

  app.post("/api/screenings", async (req, reply) => {
    if (rateLimited(req.ip)) return reply.code(429).send({ error: "slow down a moment" });

    const b = req.body || {};
    if (!COUNTRIES.has(b.country)) return reply.code(400).send({ error: "unknown country" });
    if (typeof b.sector !== "string" || b.sector.length > 60) {
      return reply.code(400).send({ error: "sector is required" });
    }
    if (!TIERS.has(b.outcomeTier)) return reply.code(400).send({ error: "unknown outcome tier" });
    const scale = b.scale === "" || b.scale === null || b.scale === undefined ? null : Number(b.scale);
    if (scale !== null && (!Number.isFinite(scale) || scale < 0)) {
      return reply.code(400).send({ error: "scale must be a positive number" });
    }
    const triggers = Array.isArray(b.triggers) ? b.triggers.slice(0, 40).map(String) : [];
    const lat = Number.isFinite(Number(b.lat)) ? Number(b.lat) : null;
    const lng = Number.isFinite(Number(b.lng)) ? Number(b.lng) : null;
    if (lat !== null && (lat < -90 || lat > 90)) return reply.code(400).send({ error: "latitude out of range" });
    if (lng !== null && (lng < -180 || lng > 180)) return reply.code(400).send({ error: "longitude out of range" });

    const row = await one(
      `insert into screenings (id, country, sector, scale, triggers, outcome_tier, outcome,
                               project_name, contact_email, lat, lng)
       values ($1,$2,$3,$4,$5::jsonb,$6,$7::jsonb,$8,$9,$10,$11)
       returning id, created_at`,
      [newId("scr"), b.country, b.sector, scale, JSON.stringify(triggers), b.outcomeTier,
       JSON.stringify(b.outcome || {}), (b.projectName || "").slice(0, 200) || null,
       b.contactEmail || null, lat, lng]
    );
    return reply.code(201).send({ id: row.id, created_at: row.created_at });
  });

  /* Screenings that named a country an org works in, newest first. This is the
     lead list the monitor directory routes from. Admin-only: it carries the
     contact details people left. */
  app.get("/api/orgs/:orgId/screenings", { preHandler: requireRole("admin") }, async (req) => {
    const org = await one("select country from orgs where id = $1", [req.orgId]);
    return {
      screenings: await query(
        `select id, country, sector, outcome_tier, project_name, contact_email, created_at
         from screenings
         where (org_id = $1 or (org_id is null and country = $2))
         order by created_at desc limit 100`,
        [req.orgId, org?.country || ""])
    };
  });
}
