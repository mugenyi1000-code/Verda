/* Reports carry the cumulative figures a lender reads. A submitted period must
   stay readable exactly as it was submitted, so corrections supersede rather
   than overwrite. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { freshApp, clientFor, signUp } from "./helpers.js";

async function orgWithSite() {
  const { app } = await freshApp();
  const call = clientFor(app);
  const { orgId } = await signUp(call, { email: "m@example.com", orgName: "Monitor Ltd" });
  const site = await call("POST", `/api/orgs/${orgId}/sites`, { name: "Site A", country: "ug" });
  return { app, call, orgId, siteId: site.body.id };
}

test("a submitted report is superseded by a revision, never edited", async (t) => {
  const { app, call, orgId, siteId } = await orgWithSite();
  t.after(() => app.close());

  const r1 = await call("POST", `/api/orgs/${orgId}/reports`,
    { siteId, standard: "essr", period: "2026-09", content: { manhours: 186420 } });
  assert.equal(r1.status, 201);
  assert.equal(r1.body.revision, 1);
  assert.equal(r1.body.status, "draft");

  assert.equal((await call("POST", `/api/orgs/${orgId}/reports/${r1.body.id}/submit`)).status, 200);
  // Submitting twice is not a silent no-op.
  assert.equal((await call("POST", `/api/orgs/${orgId}/reports/${r1.body.id}/submit`)).status, 409);

  const r2 = await call("POST", `/api/orgs/${orgId}/reports`,
    { siteId, standard: "essr", period: "2026-09", content: { manhours: 186500 } });
  assert.equal(r2.body.revision, 2, "a correction is a new revision");

  const all = await call("GET", `/api/orgs/${orgId}/reports`);
  const byRev = Object.fromEntries(all.body.reports.map(r => [r.revision, r]));
  assert.equal(byRev[1].status, "superseded", "the submitted revision is kept, marked superseded");
  assert.equal(byRev[2].status, "draft");
  assert.equal(byRev[1].content.manhours, 186420, "the original figures are unchanged");
});

test("a report cannot be filed against another organisation's site", async (t) => {
  const { app, call, orgId } = await orgWithSite();
  t.after(() => app.close());
  const other = clientFor(app);
  const o = await signUp(other, { email: "o@example.com", orgName: "Other" });
  const theirSite = await other("POST", `/api/orgs/${o.orgId}/sites`, { name: "Theirs", country: "ke" });

  const res = await call("POST", `/api/orgs/${orgId}/reports`,
    { siteId: theirSite.body.id, standard: "essr", period: "2026-09" });
  assert.equal(res.status, 400);
});

test("the period has to be a period", async (t) => {
  const { app, call, orgId, siteId } = await orgWithSite();
  t.after(() => app.close());
  assert.equal((await call("POST", `/api/orgs/${orgId}/reports`,
    { siteId, standard: "essr", period: "September" })).status, 400);
  assert.equal((await call("POST", `/api/orgs/${orgId}/reports`,
    { siteId, standard: "essr" })).status, 400);
});

test("every write lands in the audit log", async (t) => {
  const { app, call, orgId, siteId } = await orgWithSite();
  t.after(() => app.close());
  const r = await call("POST", `/api/orgs/${orgId}/reports`,
    { siteId, standard: "essr", period: "2026-09" });
  await call("POST", `/api/orgs/${orgId}/reports/${r.body.id}/submit`);

  const log = await call("GET", `/api/orgs/${orgId}/audit`);
  assert.equal(log.status, 200);
  const actions = log.body.entries.map(e => e.action);
  for (const expected of ["auth.signup", "site.create", "report.create", "report.submit"]) {
    assert.ok(actions.includes(expected), `audit log is missing ${expected}`);
  }
  const submit = log.body.entries.find(e => e.action === "report.submit");
  assert.equal(submit.email, "m@example.com", "the log says who did it");
});

test("soft delete hides a site without destroying it", async (t) => {
  const { app, call, orgId, siteId } = await orgWithSite();
  t.after(() => app.close());
  assert.equal((await call("DELETE", `/api/orgs/${orgId}/sites/${siteId}`)).status, 200);
  const after = await call("GET", `/api/orgs/${orgId}/sites`);
  assert.equal(after.body.sites.length, 0);
  // Deleting again is a 404, not a second success.
  assert.equal((await call("DELETE", `/api/orgs/${orgId}/sites/${siteId}`)).status, 404);
});
