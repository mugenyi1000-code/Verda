/* Migration runner.
   Plain .sql files applied in filename order and recorded, so the same files
   run in development, in CI and on the deploy host. No ORM, no generated
   migrations nobody has read: in a product whose value is its data, the schema
   is worth reading. */
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { query, tx, closePool } from "./db.js";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "migrations");

export async function migrate(log = console.log) {
  await query(`create table if not exists schema_migrations (
    name text primary key, applied_at timestamptz not null default now())`);
  const applied = new Set((await query("select name from schema_migrations")).map(r => r.name));
  const files = (await readdir(DIR)).filter(f => f.endsWith(".sql")).sort();
  let ran = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(join(DIR, file), "utf8");
    await tx(async (t) => {
      await t.query(sql);
      await t.query("insert into schema_migrations (name) values ($1)", [file]);
    });
    log(`migrated ${file}`);
    ran++;
  }
  if (!ran) log("schema is up to date");
  return ran;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  migrate().then(() => closePool()).catch(err => {
    console.error("migration failed:", err.message);
    process.exit(1);
  });
}
