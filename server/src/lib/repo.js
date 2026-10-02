/* Tenant-scoped data access.
 *
 * This module exists so that "which organisation may see this row" is answered
 * in ONE place. Routes never write SQL against a tenant table; they call these
 * functions and pass the orgId the auth middleware resolved. test/tenancy.test.js
 * asserts that rule by scanning the route files, because the failure mode —
 * one client's incident register rendered for another — is the kind that ends
 * a compliance product rather than inconveniencing it.
 *
 * Every function here takes orgId FIRST and every statement filters on it.
 */
import { query, one } from "../db.js";
import { newId } from "./ids.js";

/* Every tenant table, and whether it carries deleted_at.
   `reports` deliberately does not: a submitted period is evidence a lender has
   already read, so it is superseded by a new revision rather than withdrawn.
   Encoding that here means the generic helpers cannot quietly assume a column
   that is missing — or offer a delete the table does not support. */
const TENANT_TABLES = {
  sites: { softDelete: true },
  records: { softDelete: true },
  attachments: { softDelete: true },
  monitors: { softDelete: true },
  reports: { softDelete: false },
  credit_ledger: { softDelete: false }
};

function assertTenantTable(table) {
  if (!TENANT_TABLES[table]) throw new Error(`repo: ${table} is not a tenant table`);
  return TENANT_TABLES[table];
}
function assertOrg(orgId) {
  if (typeof orgId !== "string" || !orgId) throw new Error("repo: orgId is required");
}

/* ---- generic scoped helpers ---- */

export async function listForOrg(table, orgId, { where = "", params = [], order = "created_at desc", limit = 200 } = {}) {
  const spec = assertTenantTable(table); assertOrg(orgId);
  const live = spec.softDelete ? " and deleted_at is null" : "";
  const extra = where ? ` and ${where}` : "";
  return query(
    `select * from ${table} where org_id = $1${live}${extra} order by ${order} limit ${Number(limit)}`,
    [orgId, ...params]
  );
}

export async function getForOrg(table, orgId, id) {
  const spec = assertTenantTable(table); assertOrg(orgId);
  const live = spec.softDelete ? " and deleted_at is null" : "";
  return one(`select * from ${table} where org_id = $1 and id = $2${live}`, [orgId, id]);
}

/* Soft delete only. Compliance data is evidence: it stops being current, it
   does not stop having existed. */
export async function softDelete(table, orgId, id) {
  const spec = assertTenantTable(table); assertOrg(orgId);
  if (!spec.softDelete) throw new Error(`repo: ${table} rows are not withdrawable`);
  const row = await one(
    `update ${table} set deleted_at = now() where org_id = $1 and id = $2 and deleted_at is null returning id`,
    [orgId, id]
  );
  return !!row;
}

/* ---- sites ---- */

export async function createSite(orgId, data) {
  assertOrg(orgId);
  return one(
    `insert into sites (id, org_id, name, industry, country, location, plan, next_visit, permit_expiry, status)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,coalesce($10,'Active')) returning *`,
    [newId("site"), orgId, data.name, data.industry || null, data.country,
     data.location || null, data.plan || null, data.nextVisit || null,
     data.permitExpiry || null, data.status || null]
  );
}

export async function updateSite(orgId, id, data) {
  assertOrg(orgId);
  return one(
    `update sites set name = coalesce($3, name), industry = coalesce($4, industry),
       location = coalesce($5, location), plan = coalesce($6, plan),
       next_visit = coalesce($7, next_visit), permit_expiry = coalesce($8, permit_expiry),
       status = coalesce($9, status), updated_at = now()
     where org_id = $1 and id = $2 and deleted_at is null returning *`,
    [orgId, id, data.name ?? null, data.industry ?? null, data.location ?? null,
     data.plan ?? null, data.nextVisit ?? null, data.permitExpiry ?? null, data.status ?? null]
  );
}

/* ---- records ---- */

/* The site must belong to the same org. Without this check a caller could file
   a record against another tenant's site by passing its id — the row would
   carry the right org_id and still be wrong. */
export async function createRecord(orgId, userId, data) {
  assertOrg(orgId);
  if (data.siteId) {
    const site = await getForOrg("sites", orgId, data.siteId);
    if (!site) throw Object.assign(new Error("site not found in this organisation"), { statusCode: 400 });
  }
  return one(
    `insert into records (id, org_id, site_id, kind, occurred_on, status, severity, title, payload, created_by)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10) returning *`,
    [newId("rec"), orgId, data.siteId || null, data.kind, data.occurredOn || null,
     data.status || null, data.severity || null, data.title || null,
     JSON.stringify(data.payload || {}), userId]
  );
}

export async function listRecords(orgId, { kind, siteId, limit = 200 } = {}) {
  assertOrg(orgId);
  const clauses = [], params = [];
  if (kind) { params.push(kind); clauses.push(`kind = $${params.length + 1}`); }
  if (siteId) { params.push(siteId); clauses.push(`site_id = $${params.length + 1}`); }
  return listForOrg("records", orgId, {
    where: clauses.join(" and "), params,
    order: "coalesce(occurred_on, created_at::date) desc, created_at desc", limit
  });
}

/* ---- reports ---- */

/* A submitted period is immutable. A correction supersedes it as a new
   revision, so the series a lender has already read stays readable. */
export async function createReportRevision(orgId, userId, { siteId, standard, period, content }) {
  assertOrg(orgId);
  const site = await getForOrg("sites", orgId, siteId);
  if (!site) throw Object.assign(new Error("site not found in this organisation"), { statusCode: 400 });
  const latest = await one(
    `select revision, status from reports where org_id = $1 and site_id = $2 and standard = $3 and period = $4
     order by revision desc limit 1`, [orgId, siteId, standard, period]);
  const revision = latest ? latest.revision + 1 : 1;
  if (latest && latest.status === "submitted") {
    await query(`update reports set status = 'superseded', updated_at = now()
                 where org_id = $1 and site_id = $2 and standard = $3 and period = $4 and status = 'submitted'`,
      [orgId, siteId, standard, period]);
  }
  return one(
    `insert into reports (id, org_id, site_id, standard, period, revision, content, created_by)
     values ($1,$2,$3,$4,$5,$6,$7::jsonb,$8) returning *`,
    [newId("rep"), orgId, siteId, standard, period, revision, JSON.stringify(content || {}), userId]
  );
}

export async function submitReport(orgId, id) {
  assertOrg(orgId);
  return one(
    `update reports set status = 'submitted', submitted_at = now(), updated_at = now()
     where org_id = $1 and id = $2 and status = 'draft' returning *`,
    [orgId, id]
  );
}

/* ---- credits ---- */

export async function creditBalance(orgId) {
  assertOrg(orgId);
  const row = await one(`select coalesce(sum(delta), 0)::int as balance from credit_ledger where org_id = $1`, [orgId]);
  return row ? Number(row.balance) : 0;
}

export async function addCredits(orgId, userId, delta, reason) {
  assertOrg(orgId);
  return one(CREDIT_SQL, [newId("cl"), orgId, userId || null, delta, reason]);
}

/* The same write, inside a caller's transaction. Signing up creates an org, a
   membership and an opening credit balance; if any of those fail the rest must
   not survive, so they share one transaction — and they still go through here
   rather than through SQL written in a route. */
export async function addCreditsIn(t, orgId, userId, delta, reason) {
  assertOrg(orgId);
  return t.one(CREDIT_SQL, [newId("cl"), orgId, userId || null, delta, reason]);
}

const CREDIT_SQL =
  `insert into credit_ledger (id, org_id, user_id, delta, reason) values ($1,$2,$3,$4,$5) returning *`;

/* ---- audit ---- */

export async function audit({ orgId, userId, action, entity, entityId, detail, ip }) {
  return one(
    `insert into audit_log (id, org_id, user_id, action, entity, entity_id, detail, ip)
     values ($1,$2,$3,$4,$5,$6,$7::jsonb,$8) returning *`,
    [newId("aud"), orgId || null, userId || null, action, entity || null, entityId || null,
     JSON.stringify(detail || {}), ip || null]
  );
}
