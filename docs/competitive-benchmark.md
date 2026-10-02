# Verda vs. the EHS software market — benchmark & gap analysis

## Why this document exists

Verda started as a delivery tool for one service line (compliance monitoring for
EEIS clients). To sell it as a platform across sectors, it has to be legible to
buyers who have already seen — or already pay for — an established EHS/QHSE
platform. This is the capability checklist those buyers work from, what Verda
had, and what was added to close the gap.

## The capability categories buyers compare on

Commercial EHS platforms (SafetyCulture, Cority, Intelex, VelocityEHS, EcoOnline,
Benchmark Gensuite, Enablon, Sphera and others) differ enormously in depth and
price, but they are shopped against a fairly stable list of modules. Treat the
list — not any single vendor's feature page — as the benchmark:

| # | Capability | What buyers expect it to do |
|---|---|---|
| 1 | **Incident & near-miss management** | Report an event, classify severity, investigate, record root cause, close out |
| 2 | **Corrective & preventive actions (CAPA)** | One tracker for every action raised anywhere, with owner, due date, overdue flagging |
| 3 | **Risk assessment / hazard register** | Hazards scored on a likelihood × severity matrix, controls recorded, residual risk tracked |
| 4 | **Audits & inspections** | Templated checklists, scoring, findings, evidence, scheduled repeats |
| 5 | **Training & competency** | Who is trained on what, when it expires, who is out of date |
| 6 | **Compliance / permit register** | Licences and permits with renewal dates and ownership |
| 7 | **Analytics & dashboards** | Leading/lagging indicators — incident trend, action closure, risk profile |
| 8 | **Document control** | Policies, procedures and templates in one controlled place |
| 9 | **Contractor management** | Pre-qualification and site-access control for third parties |
| 10 | **Chemical / SDS management** | Substance register with safety data sheets |
| 11 | **Environmental & sustainability reporting** | Effluent, air, waste, water, GHG data and periodic reports |
| 12 | **Mobile & offline field capture** | Works on a phone, at a site, without signal |
| 13 | **Multi-tenant / multi-site** | Many clients or many sites under one account |

## Where Verda stood before this pass

| Capability | Status | Notes |
|---|---|---|
| 4 · Audits & inspections | **Strong** | Auto EHS Audit + ESIA Audit with AI-assisted findings |
| 6 · Compliance / permit register | **Strong** | Permit checklist + expiry tracking per client |
| 8 · Document control | **Present** | Downloadable template library |
| 11 · Environmental reporting | **Strong** | Verda Reporting with modular segments incl. GHG; ToR/ESIA drafting |
| 12 · Mobile & offline | **Present** | Responsive layout + service-worker app-shell caching |
| 13 · Multi-tenant | **Partial** | Client list with care plans; no per-tenant data separation yet |
| 1 · Incidents | **Missing** | The single most-expected module in the category |
| 2 · CAPA | **Missing** | Actions were implied by audits but never tracked |
| 3 · Risk register | **Missing** | No hazard scoring anywhere |
| 5 · Training & competency | **Missing** | Skills Advisor suggested courses but recorded nothing |
| 7 · Analytics | **Missing** | Dashboard had counts, no trend or profile |
| 9 · Contractor management | **Missing** | Roadmap |
| 10 · Chemical / SDS register | **Missing** | Roadmap |

## What this pass added

The four missing modules that every comparable platform ships, plus the
analytics layer that makes them worth having:

- **Incidents** — report, classify by type and severity, investigate, close;
  raise a corrective action straight from the incident.
- **Risk Register** — 5×5 likelihood × severity matrix with automatic scoring
  and banding (Low / Medium / High / Critical), controls and owner per hazard,
  plus a live matrix heatmap showing where the risk sits.
- **Actions (CAPA)** — one tracker for actions from any source (incident, audit,
  inspection, risk, permit), with owner, due date, priority and overdue flagging.
- **Training & Competency** — course records per person with validity periods
  and automatic Valid / Expiring / Expired status.
- **Analytics** — incident trend, action status, and risk profile charts plus
  headline KPIs, so the modules above produce management information rather than
  just records.

## Sector coverage

The other gap was positioning. Verda's checklists covered six heavy-industry
sectors, which reads as a consultancy tool rather than a platform. Coverage now
spans **21 sectors across every part of the economy** — industrial, mining, infrastructure
and energy, services, and public and social — each with its own compliance
checklist, and grouped so a buyer in hospitality or healthcare sees themselves in
the product as clearly as a quarry operator does.

## Still on the roadmap

Honest about what is not there yet:

- **Contractor management** and **chemical/SDS register** — modules 9 and 10.
- **Real multi-tenancy, authentication and role-based permissions** — the current
  sign-in is a browser-only prototype.
- **A backend.** Live Claude API drafting, real payments for credits, shared data
  between users, and scheduled notifications all need a server; the current build
  is deliberately a static, offline-capable front end with those seams isolated.
