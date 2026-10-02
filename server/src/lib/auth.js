/* Request authentication and authorisation.
 *
 * requireUser  — there is a signed-in user
 * requireOrg   — ...who is a member of the organisation in the URL, and the
 *                membership role is attached to the request
 * requireRole  — ...with at least the role named
 *
 * The org always comes from the PATH, never from a header or the body, and the
 * membership is looked up on every request. A client that can choose its own
 * org id is a client that can read another tenant's data.
 */
import { one } from "../db.js";
import { COOKIE, resolveSession } from "./session.js";

const RANK = { viewer: 0, member: 1, admin: 2, owner: 3 };

export async function attachUser(req) {
  const token = req.cookies?.[COOKIE];
  req.user = await resolveSession(token);
  return req.user;
}

export async function requireUser(req, reply) {
  if (!req.user) await attachUser(req);
  if (!req.user) return reply.code(401).send({ error: "sign in first" });
}

export async function requireOrg(req, reply) {
  if (!req.user) await attachUser(req);
  if (!req.user) return reply.code(401).send({ error: "sign in first" });
  const orgId = req.params?.orgId;
  if (!orgId) return reply.code(400).send({ error: "organisation missing from the path" });
  const m = await one(
    `select m.role from memberships m join orgs o on o.id = m.org_id
     where m.org_id = $1 and m.user_id = $2 and o.deleted_at is null`, [orgId, req.user.id]);
  // 404 rather than 403: a stranger should not be able to probe which
  // organisation ids exist by reading the status code.
  if (!m) return reply.code(404).send({ error: "not found" });
  req.orgId = orgId;
  req.role = m.role;
}

export function requireRole(minimum) {
  return async function (req, reply) {
    if (!req.orgId) { const r = await requireOrg(req, reply); if (r) return r; }
    if (RANK[req.role] === undefined || RANK[req.role] < RANK[minimum]) {
      return reply.code(403).send({ error: `this action needs the ${minimum} role` });
    }
  };
}
