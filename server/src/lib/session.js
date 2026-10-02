/* Sessions.
 *
 * An opaque random token goes to the browser in an httpOnly cookie. Only its
 * SHA-256 lands in the database, so a dump of the sessions table is a list of
 * hashes rather than a set of live logins.
 *
 * The token carries no claims. Everything about a session — whose it is, when
 * it expires, whether it was revoked — is read from the row, so signing a user
 * out takes effect immediately rather than when a JWT happens to expire.
 */
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { query, one } from "../db.js";
import { config } from "../config.js";

export const COOKIE = "verda_session";

const hash = (token) => createHash("sha256").update(token).digest("hex");

export async function createSession(userId, { userAgent, ip } = {}) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + config.sessionTtlDays * 86400_000);
  await query(
    `insert into sessions (token_hash, user_id, expires_at, user_agent, ip) values ($1,$2,$3,$4,$5)`,
    [hash(token), userId, expiresAt, (userAgent || "").slice(0, 300), ip || null]
  );
  return { token, expiresAt };
}

export async function resolveSession(token) {
  if (!token || typeof token !== "string") return null;
  const row = await one(
    `select s.user_id, s.expires_at, s.revoked_at, u.email, u.name, u.deleted_at
     from sessions s join users u on u.id = s.user_id
     where s.token_hash = $1`, [hash(token)]);
  if (!row) return null;
  if (row.revoked_at || row.deleted_at) return null;
  if (new Date(row.expires_at) < new Date()) return null;
  return { id: row.user_id, email: row.email, name: row.name };
}

export async function revokeSession(token) {
  if (!token) return;
  await query(`update sessions set revoked_at = now() where token_hash = $1 and revoked_at is null`, [hash(token)]);
}

export async function revokeAllForUser(userId) {
  await query(`update sessions set revoked_at = now() where user_id = $1 and revoked_at is null`, [userId]);
}

export function cookieOptions(expires) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: config.cookieSecure,
    path: "/",
    expires
  };
}

/* Constant-time compare for the CSRF double-submit check below. */
export function sameToken(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const ba = Buffer.from(a), bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}
