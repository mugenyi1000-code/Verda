# Verda server

The backend Verda needs before it can be sold rather than demonstrated: real
accounts, real organisations, data that survives a cleared browser and can be
shared between colleagues, and a Claude key that never reaches a browser.

**Node 22 · Fastify · PostgreSQL · four runtime dependencies.**

## Why it looks like this

**Three runtime dependencies plus the Anthropic SDK.** `fastify`, `@fastify/cookie`,
`pg`, `@anthropic-ai/sdk`. Password hashing is node's own `scrypt`; sessions,
validation and migrations are a few dozen lines each. A compliance product gets
its dependency tree read during diligence, and every package in it is a supply
chain somebody else controls.

**Tenancy lives in one file.** Routes never write SQL against a tenant table.
They call `src/lib/repo.js` and pass the `orgId` the auth middleware resolved
from the URL path. `test/tenancy.test.js` enforces that by scanning the route
files, because one client's incident register appearing under another client's
login is the failure that ends a product like this.

**Nothing is hard deleted.** Compliance data is evidence: rows carry
`deleted_at`, and `audit_log` records who did what. A submitted report is
immutable — a correction is a new revision that supersedes it, so the series a
lender has already read stays readable.

**Sessions are stored hashed.** The token exists only in the user's cookie; the
database holds its SHA-256. A database dump is a list of hashes, not a set of
live logins.

## Running it

```bash
cd server
npm install
cp .env.example .env          # then fill in DATABASE_URL and SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"   # SESSION_SECRET
npm run migrate
npm start
```

Any Postgres works — Railway, Render, Neon, RDS, or one on a VPS. `npm start`
runs pending migrations first, so a deploy is `git push` plus a restart.

### Tests

```bash
npm test
```

19 tests, no database and no docker needed: they run against `pg-mem`, an
in-process Postgres. **That buys speed at the cost of fidelity** — pg-mem is an
emulator. Anything resting on real engine behaviour (concurrency, locking,
`citext` collation, planner choices) has to be proven against a real server, so
CI should also run the suite with `DATABASE_URL` pointed at one.

## Connecting the browser app

Serve `app/` and set the API base before the other scripts load:

```html
<script>window.VERDA_API = "https://api.your-domain.com";</script>
```

With it unset — which includes the single-file build — `VerdaApi.isEnabled()` is
false and the app runs entirely in the browser, exactly as it always has. A
monitor on a site with no signal must still be able to work.

`ALLOWED_ORIGINS` on the server must name the origin the app is served from.
There is no wildcard: credentials travel with these requests, and `*` would let
any site on the internet make authenticated calls with a signed-in user's cookie.

## The API

| Method | Path | Who |
|---|---|---|
| `POST` | `/api/auth/signup` · `/login` · `/logout` | anyone |
| `GET` | `/api/auth/me` | signed in |
| `POST` | `/api/orgs` | signed in |
| `GET` | `/api/orgs/:orgId` · `/members` | member |
| `POST`/`DELETE` | `/api/orgs/:orgId/members` | admin |
| `GET` | `/api/orgs/:orgId/audit` | admin |
| `GET`/`POST`/`PATCH`/`DELETE` | `/api/orgs/:orgId/sites` | member (delete: admin) |
| `GET`/`POST`/`DELETE` | `/api/orgs/:orgId/records` | member |
| `GET`/`POST` | `/api/orgs/:orgId/reports`, `/reports/:id/submit` | member |
| `POST` | `/api/screenings` | **anyone, no account** |
| `GET` | `/api/orgs/:orgId/screenings` | admin |
| `POST` | `/api/orgs/:orgId/ai/draft` | member |

Roles rank `viewer < member < admin < owner`. Asking for an organisation you are
not in returns **404, not 403** — a stranger should not be able to discover
which organisation ids exist by reading status codes.

## The drafting proxy

`POST /api/orgs/:orgId/ai/draft` calls Claude with the key held server-side. It
debits credits *before* the call and refunds on failure, holds one in-flight
draft per organisation so a double-clicked button is not two bills, and records
token usage in the audit log so "why is the bill what it is" is answerable.

The system prompt forbids inventing a measurement, date, permit number or limit,
and requires `[not supplied]` where something is missing. A refusal comes back as
HTTP 200 with `stop_reason: "refusal"`, so the route checks that before reading
content — otherwise an empty draft looks like a successful one.

Leave `ANTHROPIC_API_KEY` empty and the endpoint returns 503; the browser app
falls back to the local deterministic template engine in `app/ai.js`.

## What is deliberately not here yet

Honest list, because a half-built thing described as finished is worse than an
unbuilt one.

- **Payments.** No Stripe, no subscriptions. The credit ledger is in place and
  correct, but nothing tops it up except signup. Billing needs real keys, a
  webhook endpoint and a tax decision, and it is its own piece of work.
- **File storage.** The `attachments` table holds pointers; nothing writes the
  bytes yet. Photographs still live in the browser. S3 or R2 plus presigned
  uploads is the next piece, and it is what makes the evidence archive real.
- **Email.** No invitations, no password reset, no verification. `POST
  /members` therefore requires the person to have signed up already.
- **Rate limiting beyond the screening endpoint**, and it is per-instance
  in-memory — behind more than one instance each counts its own share.
- **Refresh-token rotation.** Sessions are opaque and revocable, which is the
  important half; rotation is the other half.
- **A real integration test against Postgres.** See the note under Tests.

## Deploying

Needs a Node 22 host and a Postgres. The shape is deliberately ordinary:

1. Provision Postgres, note the connection string.
2. Set the environment from `.env.example`. In production
   `COOKIE_SECURE=1` and every `ALLOWED_ORIGINS` entry must be `https://` —
   the server refuses to boot otherwise, rather than quietly sending session
   cookies in clear.
3. `npm ci && npm start`. Migrations run on boot.
4. Put it behind TLS. `trustProxy` is on, so `req.ip` reads the forwarded
   address — make sure your proxy sets it and strips client-supplied copies.
