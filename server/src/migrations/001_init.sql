-- Verda — initial schema.
--
-- Two rules run through all of it.
--
-- 1. EVERY tenant-owned row carries org_id, and every index that matters leads
--    with org_id. Tenancy that lives only in application code is one forgotten
--    WHERE clause away from showing one client's incident register to another.
--    The column is here so the mistake is catchable, and lib/repo.js is the
--    single place allowed to build those queries.
--
-- 2. Compliance data is evidence. Nothing a regulator might ask about is hard
--    deleted: rows carry deleted_at and the audit log records who did what.
--    "We deleted it" is not an answer to "show me the record as it stood".

create table orgs (
  id            text primary key,
  name          text not null,
  country       text not null,            -- ug | ke | tz | rw | cd | zm
  created_at    timestamptz not null default now(),
  deleted_at    timestamptz
);

create table users (
  id            text primary key,
  email         citext not null unique,
  name          text not null,
  password_hash text not null,            -- scrypt, see lib/password.js
  created_at    timestamptz not null default now(),
  last_login_at timestamptz,
  deleted_at    timestamptz
);

-- A user can belong to several orgs; a consultancy monitoring six clients is
-- the normal case, not the exception.
create table memberships (
  id            text primary key,
  org_id        text not null references orgs(id) on delete cascade,
  user_id       text not null references users(id) on delete cascade,
  role          text not null check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at    timestamptz not null default now(),
  unique (org_id, user_id)
);
create index memberships_user_idx on memberships (user_id);

-- Sessions are stored by HASH. A leaked database must not hand an attacker a
-- set of live sessions, so the token itself exists only in the user's cookie.
create table sessions (
  token_hash    text primary key,
  user_id       text not null references users(id) on delete cascade,
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null,
  revoked_at    timestamptz,
  user_agent    text,
  ip            text
);
create index sessions_user_idx on sessions (user_id);
create index sessions_expiry_idx on sessions (expires_at);

-- The sites a monitor is responsible for. "Client" in the UI.
create table sites (
  id            text primary key,
  org_id        text not null references orgs(id) on delete cascade,
  name          text not null,
  industry      text,
  country       text not null,
  location      text,
  plan          text,
  next_visit    date,
  permit_expiry date,
  status        text not null default 'Active',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index sites_org_idx on sites (org_id, deleted_at);

-- One table for the record types that share a shape (incidents, actions,
-- risks, training, inspections, workforce periods). The kind column keeps them
-- apart; the payload keeps each kind's own fields without a migration per kind.
-- The columns promoted out of the payload are the ones that get filtered on.
create table records (
  id            text primary key,
  org_id        text not null references orgs(id) on delete cascade,
  site_id       text references sites(id) on delete restrict,
  kind          text not null check (kind in
                  ('incident','action','risk','training','inspection','workforce','subcontractor','equipment')),
  occurred_on   date,
  status        text,
  severity      text,
  title         text,
  payload       jsonb not null default '{}'::jsonb,
  created_by    text references users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index records_org_kind_idx on records (org_id, kind, deleted_at);
create index records_site_idx on records (org_id, site_id);
create index records_occurred_idx on records (org_id, kind, occurred_on desc);

-- Monthly reports. The cumulative figures are the switching cost (see
-- docs/exit-strategy.md), so a submitted period is immutable: corrections are a
-- new revision, never an edit in place.
create table reports (
  id            text primary key,
  org_id        text not null references orgs(id) on delete cascade,
  site_id       text not null references sites(id) on delete restrict,
  standard      text not null,            -- verda | ifc | essr
  period        text not null,            -- '2026-09'
  revision      int  not null default 1,
  status        text not null default 'draft' check (status in ('draft','submitted','superseded')),
  content       jsonb not null default '{}'::jsonb,
  submitted_at  timestamptz,
  created_by    text references users(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (org_id, site_id, standard, period, revision)
);
create index reports_org_idx on reports (org_id, site_id, period desc);

-- Photographs and attachments. Bytes live in object storage; this table holds
-- the pointer, the caption and what the evidence belongs to.
create table attachments (
  id            text primary key,
  org_id        text not null references orgs(id) on delete cascade,
  site_id       text references sites(id) on delete restrict,
  record_id     text references records(id) on delete cascade,
  report_id     text references reports(id) on delete cascade,
  storage_key   text not null,
  content_type  text not null,
  byte_size     bigint not null check (byte_size > 0),
  caption       text,
  taken_at      timestamptz,
  lat           double precision,
  lng           double precision,
  created_by    text references users(id),
  created_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index attachments_org_idx on attachments (org_id, deleted_at);
create index attachments_record_idx on attachments (record_id);

-- Screening submissions from the free tool. These arrive WITHOUT an org: the
-- whole point is that anyone can run one. org_id is filled in only if the
-- person later signs up, or a monitor claims the lead.
create table screenings (
  id            text primary key,
  org_id        text references orgs(id) on delete set null,
  country       text not null,
  sector        text not null,
  scale         numeric,
  triggers      jsonb not null default '[]'::jsonb,
  outcome_tier  text not null check (outcome_tier in ('none','brief','esia')),
  outcome       jsonb not null default '{}'::jsonb,
  project_name  text,
  contact_email citext,
  lat           double precision,
  lng           double precision,
  created_at    timestamptz not null default now()
);
create index screenings_created_idx on screenings (created_at desc);
create index screenings_org_idx on screenings (org_id);

-- Practitioners and firms, and what each is registered for.
create table monitors (
  id            text primary key,
  org_id        text references orgs(id) on delete cascade,
  name          text not null,
  registration  text,
  grade         text,
  contact       text,
  countries     jsonb not null default '[]'::jsonb,
  services      jsonb not null default '[]'::jsonb,
  sectors       jsonb not null default '[]'::jsonb,
  verified_at   timestamptz,              -- a human checked the registration
  created_at    timestamptz not null default now(),
  deleted_at    timestamptz
);
create index monitors_org_idx on monitors (org_id);

-- Who did what. A compliance platform that cannot answer that is not one.
create table audit_log (
  id            text primary key,
  org_id        text,
  user_id       text,
  action        text not null,            -- 'report.submit', 'site.delete', ...
  entity        text,
  entity_id     text,
  detail        jsonb not null default '{}'::jsonb,
  ip            text,
  created_at    timestamptz not null default now()
);
create index audit_org_idx on audit_log (org_id, created_at desc);
create index audit_entity_idx on audit_log (entity, entity_id);

-- Credit accounting for the drafting proxy. A ledger, not a balance column:
-- a balance you cannot explain is a balance you will be arguing about.
create table credit_ledger (
  id            text primary key,
  org_id        text not null references orgs(id) on delete cascade,
  user_id       text references users(id),
  delta         int not null,
  reason        text not null,
  created_at    timestamptz not null default now()
);
create index credit_org_idx on credit_ledger (org_id, created_at desc);
