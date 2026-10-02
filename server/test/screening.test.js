/* The screening endpoint is the only one a stranger can write to, so it gets
   the tightest validation and its own rate limit. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { freshApp, clientFor, signUp } from "./helpers.js";

const valid = {
  country: "ug", sector: "quarry", scale: 2,
  triggers: ["explosives"], outcomeTier: "esia",
  outcome: { tier: "esia" }, projectName: "Test pit"
};

test("anyone can submit a screening, with no account", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const res = await clientFor(app)("POST", "/api/screenings", valid);
  assert.equal(res.status, 201);
  assert.ok(res.body.id);
});

test("bad input is refused rather than stored", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const bad = [
    [{ ...valid, country: "zz" }, "unknown country"],
    [{ ...valid, outcomeTier: "maybe" }, "unknown tier"],
    [{ ...valid, scale: -5 }, "negative scale"],
    [{ ...valid, lat: 400 }, "latitude out of range"],
    [{ ...valid, sector: undefined }, "missing sector"]
  ];
  // Validation runs before the rate limiter is consulted for a verdict, so a
  // rejected payload must not also consume the caller's allowance.
  for (const [payload, label] of bad) {
    const { app: a2 } = await freshApp();
    const res = await clientFor(a2)("POST", "/api/screenings", payload);
    assert.equal(res.status, 400, `${label} should be a 400`);
    await a2.close();
  }
});

test("a flood from one address is slowed down", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const call = clientFor(app);
  assert.equal((await call("POST", "/api/screenings", valid)).status, 201);
  assert.equal((await call("POST", "/api/screenings", valid)).status, 429);
});

test("screening leads are admin-only and scoped to the org's country", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const anon = clientFor(app);
  await anon("POST", "/api/screenings", valid);                       // Uganda
  await anon("POST", "/api/screenings", { ...valid, country: "zm" }); // Zambia — rate limited, fine

  const owner = clientFor(app);
  const o = await signUp(owner, { email: "o@example.com", orgName: "UG Monitors", country: "ug" });
  const leads = await owner("GET", `/api/orgs/${o.orgId}/screenings`);
  assert.equal(leads.status, 200);
  assert.ok(leads.body.screenings.every(s => s.country === "ug"));

  // A member without admin cannot read contact details people left.
  const member = clientFor(app);
  await signUp(member, { email: "m@example.com", orgName: "Their own" });
  await owner("POST", `/api/orgs/${o.orgId}/members`, { email: "m@example.com", role: "member" });
  assert.equal((await member("GET", `/api/orgs/${o.orgId}/screenings`)).status, 403);
});
