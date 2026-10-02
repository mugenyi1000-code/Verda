import { newId } from "../lib/ids.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { COOKIE, createSession, revokeSession, cookieOptions } from "../lib/session.js";
import { requireUser } from "../lib/auth.js";
import { query, one, tx } from "../db.js";
import { audit, addCreditsIn } from "../lib/repo.js";
import { config } from "../config.js";

const emailOk = (e) => typeof e === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 320;

export default async function authRoutes(app) {
  app.post("/api/auth/signup", async (req, reply) => {
    const { email, password, name, orgName, country } = req.body || {};
    if (!emailOk(email)) return reply.code(400).send({ error: "enter a valid email address" });
    if (typeof password !== "string" || password.length < 10) {
      return reply.code(400).send({ error: "password must be at least 10 characters" });
    }
    if (!name || typeof name !== "string") return reply.code(400).send({ error: "name is required" });

    const existing = await one("select id from users where email = $1", [email]);
    // Not "that email is taken": that tells a stranger who has an account here.
    if (existing) return reply.code(409).send({ error: "that email cannot be registered" });

    const passwordHash = await hashPassword(password);
    const userId = newId("usr");

    const out = await tx(async (t) => {
      await t.query(`insert into users (id, email, name, password_hash) values ($1,$2,$3,$4)`,
        [userId, email, name.slice(0, 200), passwordHash]);
      if (orgName) {
        const orgId = newId("org");
        await t.query(`insert into orgs (id, name, country) values ($1,$2,$3)`,
          [orgId, String(orgName).slice(0, 200), country || "ug"]);
        await t.query(`insert into memberships (id, org_id, user_id, role) values ($1,$2,$3,'owner')`,
          [newId("mem"), orgId, userId]);
        await addCreditsIn(t, orgId, userId, config.signupCredits, "signup");
        return { orgId };
      }
      return {};
    });

    const { token, expiresAt } = await createSession(userId, { userAgent: req.headers["user-agent"], ip: req.ip });
    await audit({ orgId: out.orgId, userId, action: "auth.signup", entity: "user", entityId: userId, ip: req.ip });
    reply.setCookie(COOKIE, token, cookieOptions(expiresAt));
    return { user: { id: userId, email, name }, orgId: out.orgId || null };
  });

  app.post("/api/auth/login", async (req, reply) => {
    const { email, password } = req.body || {};
    const user = email && typeof email === "string"
      ? await one("select id, email, name, password_hash, deleted_at from users where email = $1", [email])
      : null;

    // Verify against a dummy hash when the user is unknown, so a missing
    // account and a wrong password take the same time to answer.
    const stored = user?.password_hash || "scrypt$65536$8$1$AAAAAAAAAAAAAAAAAAAAAA==$" + "A".repeat(88);
    const ok = await verifyPassword(typeof password === "string" ? password : "", stored);

    if (!user || user.deleted_at || !ok) {
      await audit({ userId: user?.id, action: "auth.login_failed", entity: "user", entityId: user?.id, ip: req.ip });
      return reply.code(401).send({ error: "those details did not match" });
    }

    const { token, expiresAt } = await createSession(user.id, { userAgent: req.headers["user-agent"], ip: req.ip });
    await query("update users set last_login_at = now() where id = $1", [user.id]);
    await audit({ userId: user.id, action: "auth.login", entity: "user", entityId: user.id, ip: req.ip });
    reply.setCookie(COOKIE, token, cookieOptions(expiresAt));
    return { user: { id: user.id, email: user.email, name: user.name } };
  });

  app.post("/api/auth/logout", async (req, reply) => {
    await revokeSession(req.cookies?.[COOKIE]);
    reply.clearCookie(COOKIE, { path: "/" });
    return { ok: true };
  });

  app.get("/api/auth/me", { preHandler: requireUser }, async (req) => {
    const orgs = await query(
      `select o.id, o.name, o.country, m.role from memberships m
       join orgs o on o.id = m.org_id
       where m.user_id = $1 and o.deleted_at is null order by o.name`, [req.user.id]);
    return { user: req.user, orgs };
  });
}
