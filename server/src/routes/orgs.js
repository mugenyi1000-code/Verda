import { newId } from "../lib/ids.js";
import { requireUser, requireOrg, requireRole } from "../lib/auth.js";
import { query, one, tx } from "../db.js";
import { audit, creditBalance, addCreditsIn } from "../lib/repo.js";
import { config } from "../config.js";

export default async function orgRoutes(app) {
  app.post("/api/orgs", { preHandler: requireUser }, async (req, reply) => {
    const { name, country } = req.body || {};
    if (!name) return reply.code(400).send({ error: "name is required" });
    const orgId = newId("org");
    await tx(async (t) => {
      await t.query(`insert into orgs (id, name, country) values ($1,$2,$3)`,
        [orgId, String(name).slice(0, 200), country || "ug"]);
      await t.query(`insert into memberships (id, org_id, user_id, role) values ($1,$2,$3,'owner')`,
        [newId("mem"), orgId, req.user.id]);
      await addCreditsIn(t, orgId, req.user.id, config.signupCredits, "new organisation");
    });
    await audit({ orgId, userId: req.user.id, action: "org.create", entity: "org", entityId: orgId, ip: req.ip });
    return reply.code(201).send({ id: orgId, name, country: country || "ug", role: "owner" });
  });

  app.get("/api/orgs/:orgId", { preHandler: requireOrg }, async (req) => {
    const org = await one("select id, name, country, created_at from orgs where id = $1", [req.orgId]);
    return { ...org, role: req.role, credits: await creditBalance(req.orgId) };
  });

  app.get("/api/orgs/:orgId/members", { preHandler: requireOrg }, async (req) => {
    return {
      members: await query(
        `select u.id, u.email, u.name, m.role, m.created_at from memberships m
         join users u on u.id = m.user_id
         where m.org_id = $1 and u.deleted_at is null order by m.created_at`, [req.orgId])
    };
  });

  /* Adding a member needs admin. The user must already exist — this is not an
     invitation flow, which needs email delivery the server does not yet have. */
  app.post("/api/orgs/:orgId/members", { preHandler: requireRole("admin") }, async (req, reply) => {
    const { email, role } = req.body || {};
    if (!["admin", "member", "viewer"].includes(role)) {
      return reply.code(400).send({ error: "role must be admin, member or viewer" });
    }
    const user = await one("select id from users where email = $1 and deleted_at is null", [email]);
    if (!user) return reply.code(404).send({ error: "no account with that email — they need to sign up first" });
    const existing = await one("select id from memberships where org_id = $1 and user_id = $2", [req.orgId, user.id]);
    if (existing) return reply.code(409).send({ error: "they are already a member" });
    await query(`insert into memberships (id, org_id, user_id, role) values ($1,$2,$3,$4)`,
      [newId("mem"), req.orgId, user.id, role]);
    await audit({ orgId: req.orgId, userId: req.user.id, action: "org.member_add",
      entity: "user", entityId: user.id, detail: { role }, ip: req.ip });
    return reply.code(201).send({ ok: true });
  });

  /* An organisation must keep at least one owner, or nobody can administer it. */
  app.delete("/api/orgs/:orgId/members/:userId", { preHandler: requireRole("admin") }, async (req, reply) => {
    const target = await one("select role from memberships where org_id = $1 and user_id = $2",
      [req.orgId, req.params.userId]);
    if (!target) return reply.code(404).send({ error: "not a member" });
    if (target.role === "owner") {
      const owners = await one("select count(*)::int as n from memberships where org_id = $1 and role = 'owner'", [req.orgId]);
      if (Number(owners.n) <= 1) return reply.code(409).send({ error: "an organisation must keep at least one owner" });
    }
    await query("delete from memberships where org_id = $1 and user_id = $2", [req.orgId, req.params.userId]);
    await audit({ orgId: req.orgId, userId: req.user.id, action: "org.member_remove",
      entity: "user", entityId: req.params.userId, ip: req.ip });
    return { ok: true };
  });

  app.get("/api/orgs/:orgId/audit", { preHandler: requireRole("admin") }, async (req) => {
    return {
      entries: await query(
        `select a.id, a.action, a.entity, a.entity_id, a.detail, a.created_at, u.email
         from audit_log a left join users u on u.id = a.user_id
         where a.org_id = $1 order by a.created_at desc limit 200`, [req.orgId])
    };
  });
}
