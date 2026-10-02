/* The database handle.
   One `query(text, params)` and one `tx(fn)`, so the rest of the server has a
   single shape to talk to and the tests can swap in pg-mem without anything
   else knowing. */
import pg from "pg";
import { config } from "./config.js";

let pool = null;

export function setPool(p) { pool = p; }           // tests inject pg-mem here

export function getPool() {
  if (!pool) {
    pool = new pg.Pool({
      connectionString: config.databaseUrl,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000
    });
  }
  return pool;
}

export async function query(text, params = []) {
  const res = await getPool().query(text, params);
  return res.rows;
}

export async function one(text, params = []) {
  const rows = await query(text, params);
  return rows[0] || null;
}

/* Anything that writes more than one row writes inside this. A report that is
   submitted but whose audit entry failed is a report nobody can account for. */
export async function tx(fn) {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const scoped = {
      query: async (text, params = []) => (await client.query(text, params)).rows,
      one: async (text, params = []) => (await client.query(text, params)).rows[0] || null
    };
    const out = await fn(scoped);
    await client.query("COMMIT");
    return out;
  } catch (err) {
    try { await client.query("ROLLBACK"); } catch { /* the original error is the one that matters */ }
    throw err;
  } finally {
    client.release();
  }
}

export async function closePool() {
  if (pool && pool.end) await pool.end();
  pool = null;
}
