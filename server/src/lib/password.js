/* Password hashing with scrypt from node's own crypto.
   scrypt is memory-hard and built in, so there is no native module to compile
   on the deploy host and no third-party hashing dependency to audit. The
   parameters below are OWASP's scrypt floor; raise N when the hosts can wear it.

   Format: scrypt$N$r$p$salt_b64$hash_b64 — self-describing, so parameters can
   be raised later and old hashes still verify. */
import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(_scrypt);
const PARAMS = { N: 2 ** 16, r: 8, p: 1, keylen: 64 };

export async function hashPassword(password) {
  if (typeof password !== "string" || password.length < 10) {
    throw new Error("password must be at least 10 characters");
  }
  if (password.length > 1024) throw new Error("password is too long");
  const salt = randomBytes(16);
  const { N, r, p, keylen } = PARAMS;
  // maxmem must be raised: node's default refuses N this large.
  const key = await scrypt(password, salt, keylen, { N, r, p, maxmem: 256 * 1024 * 1024 });
  return `scrypt$${N}$${r}$${p}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password, stored) {
  try {
    const [scheme, N, r, p, saltB64, hashB64] = String(stored).split("$");
    if (scheme !== "scrypt") return false;
    const salt = Buffer.from(saltB64, "base64");
    const expected = Buffer.from(hashB64, "base64");
    const key = await scrypt(password, salt, expected.length,
      { N: Number(N), r: Number(r), p: Number(p), maxmem: 256 * 1024 * 1024 });
    // Lengths are equal by construction, but timingSafeEqual throws if not.
    return key.length === expected.length && timingSafeEqual(key, expected);
  } catch {
    return false;
  }
}
