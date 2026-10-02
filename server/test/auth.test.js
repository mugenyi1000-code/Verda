import { test } from "node:test";
import assert from "node:assert/strict";
import { freshApp, clientFor, signUp } from "./helpers.js";
import { hashPassword, verifyPassword } from "../src/lib/password.js";

test("passwords hash and verify, and refuse weak input", async () => {
  const h = await hashPassword("correct horse battery");
  assert.match(h, /^scrypt\$\d+\$\d+\$\d+\$/);
  assert.equal(await verifyPassword("correct horse battery", h), true);
  assert.equal(await verifyPassword("Correct horse battery", h), false);
  assert.equal(await verifyPassword("", h), false);
  // Two hashes of the same password differ — the salt is doing its job.
  assert.notEqual(h, await hashPassword("correct horse battery"));
  // Garbage in the stored field is a false, not a throw.
  assert.equal(await verifyPassword("x", "not-a-hash"), false);
  await assert.rejects(() => hashPassword("short"), /at least 10/);
});

test("sign up, sign in, sign out", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const call = clientFor(app);

  const up = await signUp(call, { email: "a@example.com", name: "A Nakato", orgName: "EEIS" });
  assert.ok(up.orgId);

  const me = await call("GET", "/api/auth/me");
  assert.equal(me.status, 200);
  assert.equal(me.body.user.email, "a@example.com");
  assert.equal(me.body.orgs.length, 1);
  assert.equal(me.body.orgs[0].role, "owner");

  assert.equal((await call("POST", "/api/auth/logout")).status, 200);
  assert.equal((await call("GET", "/api/auth/me")).status, 401);

  const back = clientFor(app);
  assert.equal((await back("POST", "/api/auth/login",
    { email: "a@example.com", password: "correct horse battery" })).status, 200);
  assert.equal((await back("GET", "/api/auth/me")).status, 200);
});

test("a wrong password and an unknown account answer the same way", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const call = clientFor(app);
  await signUp(call, { email: "real@example.com" });

  const wrong = await clientFor(app)("POST", "/api/auth/login",
    { email: "real@example.com", password: "wrong wrong wrong" });
  const missing = await clientFor(app)("POST", "/api/auth/login",
    { email: "nobody@example.com", password: "wrong wrong wrong" });

  assert.equal(wrong.status, 401);
  assert.equal(missing.status, 401);
  // Identical message: the status and body must not say which account exists.
  assert.deepEqual(wrong.body, missing.body);
});

test("a duplicate email does not confirm the account exists", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  await signUp(clientFor(app), { email: "taken@example.com" });
  const res = await clientFor(app)("POST", "/api/auth/signup",
    { email: "taken@example.com", password: "another good one", name: "B", orgName: "B Ltd" });
  assert.equal(res.status, 409);
  assert.doesNotMatch(JSON.stringify(res.body), /already|exists|taken by/i);
});

test("signing out revokes the session for good", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const call = clientFor(app);
  await signUp(call, { email: "c@example.com" });

  // Capture the live cookie, sign out, then try to reuse it.
  assert.equal((await call("GET", "/api/auth/me")).status, 200);
  const cookieHeader = call.cookie();
  assert.ok(cookieHeader, "the harness must have captured a session cookie");
  await call("POST", "/api/auth/logout");

  const replay = await app.inject({
    method: "GET", url: "/api/auth/me",
    headers: { cookie: cookieHeader, origin: "http://localhost:8080" }
  });
  assert.equal(replay.statusCode, 401, "a revoked session must not be replayable");
});

test("signup rejects a short password and a bad address", async (t) => {
  const { app } = await freshApp();
  t.after(() => app.close());
  const call = clientFor(app);
  assert.equal((await call("POST", "/api/auth/signup",
    { email: "d@example.com", password: "short", name: "D" })).status, 400);
  assert.equal((await call("POST", "/api/auth/signup",
    { email: "not-an-email", password: "a good long one", name: "D" })).status, 400);
});
