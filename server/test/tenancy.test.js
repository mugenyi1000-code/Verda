/* The test this server exists to pass.
 *
 * One client's incident register appearing under another client's login is the
 * failure that ends a compliance product. Everything here is an attempt to make
 * that happen through the HTTP surface. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { freshApp, clientFor, signUp } from "./helpers.js";

const ROUTES = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "routes");

test("one organisation cannot read, write or delete another's data", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());

  const alice = clientFor(app), bob = clientFor(app);
  const a = await signUp(alice, { email: "alice@example.com", orgName: "Alice Monitoring" });
  const b = await signUp(bob, { email: "bob@example.com", orgName: "Bob Compliance" });
  assert.notEqual(a.orgId, b.orgId);

  // Alice creates a site and files an incident against it.
  const site = await alice("POST", `/api/orgs/${a.orgId}/sites`,
    { name: "Kasese pit", country: "ug", industry: "Mining" });
  assert.equal(site.status, 201);
  const rec = await alice("POST", `/api/orgs/${a.orgId}/records`,
    { kind: "incident", siteId: site.body.id, title: "Guard removed", severity: "High" });
  assert.equal(rec.status, 201);

  // Bob knows the org id and asks for it directly. He must not even learn it exists.
  assert.equal((await bob("GET", `/api/orgs/${a.orgId}`)).status, 404);
  assert.equal((await bob("GET", `/api/orgs/${a.orgId}/sites`)).status, 404);
  assert.equal((await bob("GET", `/api/orgs/${a.orgId}/records`)).status, 404);
  assert.equal((await bob("DELETE", `/api/orgs/${a.orgId}/sites/${site.body.id}`)).status, 404);

  // Bob's own listing is empty — not "everything".
  const bobSites = await bob("GET", `/api/orgs/${b.orgId}/sites`);
  assert.equal(bobSites.status, 200);
  assert.equal(bobSites.body.sites.length, 0);

  // Bob cannot file a record against Alice's site by passing its id into his
  // own org. The row would carry Bob's org_id and still be wrong.
  const cross = await bob("POST", `/api/orgs/${b.orgId}/records`,
    { kind: "incident", siteId: site.body.id, title: "Should not exist" });
  assert.equal(cross.status, 400);

  // And Alice still sees exactly her one record.
  const aliceRecs = await alice("GET", `/api/orgs/${a.orgId}/records`);
  assert.equal(aliceRecs.body.records.length, 1);
  assert.equal(aliceRecs.body.records[0].title, "Guard removed");
});

test("a signed-out request reaches nothing", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const alice = clientFor(app);
  const a = await signUp(alice, { email: "a@example.com", orgName: "A" });

  const anon = clientFor(app);
  assert.equal((await anon("GET", `/api/orgs/${a.orgId}/sites`)).status, 401);
  assert.equal((await anon("GET", "/api/auth/me")).status, 401);
  assert.equal((await anon("POST", `/api/orgs/${a.orgId}/sites`, { name: "x", country: "ug" })).status, 401);
});

test("roles gate writes", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());

  const owner = clientFor(app), viewer = clientFor(app);
  const o = await signUp(owner, { email: "owner@example.com", orgName: "Org" });
  await signUp(viewer, { email: "viewer@example.com", orgName: "Viewer's own org" });

  const added = await owner("POST", `/api/orgs/${o.orgId}/members`,
    { email: "viewer@example.com", role: "viewer" });
  assert.equal(added.status, 201);

  // A viewer reads but does not write.
  assert.equal((await viewer("GET", `/api/orgs/${o.orgId}/sites`)).status, 200);
  assert.equal((await viewer("POST", `/api/orgs/${o.orgId}/sites`, { name: "x", country: "ug" })).status, 403);
  // Nor administers.
  assert.equal((await viewer("GET", `/api/orgs/${o.orgId}/audit`)).status, 403);
});

/* A structural check, not a behavioural one: route files must not write SQL
   against a tenant table at all. Tenancy is lib/repo.js's job, and a route that
   starts hand-rolling queries is how the WHERE clause eventually goes missing. */
test("no route file writes SQL against a tenant table", async () => {
  const TENANT_TABLES = ["sites", "records", "reports", "attachments", "monitors", "credit_ledger"];
  const files = (await readdir(ROUTES)).filter(f => f.endsWith(".js"));
  const offences = [];
  for (const file of files) {
    const src = await readFile(join(ROUTES, file), "utf8");
    // Strip block and line comments so prose about a table is not a finding.
    const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const table of TENANT_TABLES) {
      const re = new RegExp(`(from|into|update|join)\\s+${table}\\b`, "i");
      if (re.test(code)) offences.push(`${file} queries ${table} directly`);
    }
  }
  assert.deepEqual(offences, [],
    "routes must go through lib/repo.js so org scoping lives in one place");
});
