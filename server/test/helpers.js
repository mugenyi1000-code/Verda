/* Test harness.
 *
 * Tests run against pg-mem, an in-process Postgres, so `npm test` needs no
 * database and no docker. That buys speed at the cost of fidelity: pg-mem is an
 * emulator, not Postgres. Anything that depends on real engine behaviour —
 * concurrency, locking, planner choices, citext collation — has to be proven
 * against a real server, which is what DATABASE_URL in CI is for.
 *
 * What these tests DO prove is the thing that matters most here: that a request
 * from one organisation cannot reach another organisation's rows.
 */
import { newDb, DataType } from "pg-mem";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { setPool } from "../src/db.js";
import { buildApp } from "../src/app.js";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

export async function freshApp() {
  const mem = newDb({ autoCreateForeignKeyIndices: true });
  // The server generates its own ids, but pg-mem still wants the function to
  // exist if a migration ever reaches for it.
  mem.public.registerFunction({
    name: "gen_random_uuid", returns: { name: "uuid", primary: "uuid" },
    implementation: () => crypto.randomUUID()
  });
  const adapter = mem.adapters.createPg();
  const pool = new adapter.Pool();
  setPool(pool);

  // pg-mem has no citext. Register it as plain text so the schema loads; the
  // case-insensitive comparison itself is therefore NOT under test here, which
  // is exactly the fidelity gap the header warns about — it is proven against a
  // real server via DATABASE_URL.
  mem.registerExtension("citext", (schema) => {
    schema.registerEquivalentType({
      name: "citext",
      equivalentTo: DataType.text,
      isValid: (v) => typeof v === "string"
    });
  });

  const sql = await readFile(join(SRC, "migrations", "001_init.sql"), "utf8");
  await pool.query(sql);

  const app = await buildApp({ logger: false });
  await app.ready();
  return { app, pool, mem };
}

/* A tiny client that keeps the session cookie, the way a browser would. */
export function clientFor(app) {
  let cookie = "";
  const call = async function (method, url, body) {
    const res = await app.inject({
      method, url,
      headers: {
        ...(body === undefined ? {} : { "content-type": "application/json" }),
        ...(cookie ? { cookie } : {}),
        origin: "http://localhost:8080"
      },
      payload: body === undefined ? undefined : JSON.stringify(body)
    });
    const setCookie = res.headers["set-cookie"];
    if (setCookie) {
      const raw = Array.isArray(setCookie) ? setCookie[0] : setCookie;
      cookie = raw.split(";")[0];
    }
    let json = null;
    try { json = res.json(); } catch { /* empty or non-JSON body */ }
    return { status: res.statusCode, body: json, raw: res };
  };
  // Exposed so a test can keep a cookie, sign out, and try to replay it.
  call.cookie = () => cookie;
  return call;
}

export async function signUp(call, { email, name = "Test User", orgName = "Test Org", country = "ug" }) {
  const res = await call("POST", "/api/auth/signup",
    { email, password: "correct horse battery", name, orgName, country });
  if (res.status !== 200) throw new Error(`signup failed: ${JSON.stringify(res.body)}`);
  return res.body;
}
