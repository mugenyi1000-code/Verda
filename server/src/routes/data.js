/* Sites, records and reports — the tenant-owned data.
   Every handler passes req.orgId, resolved by requireOrg from the path, into
   lib/repo.js. No SQL against a tenant table is written here. */
import { requireOrg, requireRole } from "../lib/auth.js";
import * as repo from "../lib/repo.js";

const KINDS = ["incident", "action", "risk", "training", "inspection", "workforce", "subcontractor", "equipment"];

export default async function dataRoutes(app) {
  /* ---- sites ---- */
  app.get("/api/orgs/:orgId/sites", { preHandler: requireOrg }, async (req) =>
    ({ sites: await repo.listForOrg("sites", req.orgId, { order: "name" }) }));

  app.post("/api/orgs/:orgId/sites", { preHandler: requireRole("member") }, async (req, reply) => {
    const { name, country } = req.body || {};
    if (!name) return reply.code(400).send({ error: "name is required" });
    if (!country) return reply.code(400).send({ error: "country is required — the register depends on it" });
    const site = await repo.createSite(req.orgId, req.body);
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "site.create",
      entity: "site", entityId: site.id, ip: req.ip });
    return reply.code(201).send(site);
  });

  app.patch("/api/orgs/:orgId/sites/:id", { preHandler: requireRole("member") }, async (req, reply) => {
    const site = await repo.updateSite(req.orgId, req.params.id, req.body || {});
    if (!site) return reply.code(404).send({ error: "not found" });
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "site.update",
      entity: "site", entityId: site.id, ip: req.ip });
    return site;
  });

  app.delete("/api/orgs/:orgId/sites/:id", { preHandler: requireRole("admin") }, async (req, reply) => {
    const ok = await repo.softDelete("sites", req.orgId, req.params.id);
    if (!ok) return reply.code(404).send({ error: "not found" });
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "site.delete",
      entity: "site", entityId: req.params.id, ip: req.ip });
    return { ok: true };
  });

  /* ---- records ---- */
  app.get("/api/orgs/:orgId/records", { preHandler: requireOrg }, async (req) =>
    ({ records: await repo.listRecords(req.orgId, { kind: req.query.kind, siteId: req.query.siteId }) }));

  app.post("/api/orgs/:orgId/records", { preHandler: requireRole("member") }, async (req, reply) => {
    const { kind } = req.body || {};
    if (!KINDS.includes(kind)) return reply.code(400).send({ error: `kind must be one of: ${KINDS.join(", ")}` });
    const rec = await repo.createRecord(req.orgId, req.user.id, req.body);
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: `record.create`,
      entity: "record", entityId: rec.id, detail: { kind }, ip: req.ip });
    return reply.code(201).send(rec);
  });

  app.delete("/api/orgs/:orgId/records/:id", { preHandler: requireRole("member") }, async (req, reply) => {
    const ok = await repo.softDelete("records", req.orgId, req.params.id);
    if (!ok) return reply.code(404).send({ error: "not found" });
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "record.delete",
      entity: "record", entityId: req.params.id, ip: req.ip });
    return { ok: true };
  });

  /* ---- reports ---- */
  app.get("/api/orgs/:orgId/reports", { preHandler: requireOrg }, async (req) =>
    ({ reports: await repo.listForOrg("reports", req.orgId, { order: "period desc, revision desc" }) }));

  app.post("/api/orgs/:orgId/reports", { preHandler: requireRole("member") }, async (req, reply) => {
    const { siteId, standard, period } = req.body || {};
    if (!siteId || !standard || !period) {
      return reply.code(400).send({ error: "siteId, standard and period are required" });
    }
    if (!/^\d{4}-\d{2}$/.test(period)) return reply.code(400).send({ error: "period must look like 2026-09" });
    const rep = await repo.createReportRevision(req.orgId, req.user.id, req.body);
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "report.create",
      entity: "report", entityId: rep.id, detail: { period, revision: rep.revision }, ip: req.ip });
    return reply.code(201).send(rep);
  });

  app.post("/api/orgs/:orgId/reports/:id/submit", { preHandler: requireRole("member") }, async (req, reply) => {
    const rep = await repo.submitReport(req.orgId, req.params.id);
    if (!rep) return reply.code(409).send({ error: "only a draft can be submitted" });
    await repo.audit({ orgId: req.orgId, userId: req.user.id, action: "report.submit",
      entity: "report", entityId: rep.id, detail: { period: rep.period, revision: rep.revision }, ip: req.ip });
    return rep;
  });
}
