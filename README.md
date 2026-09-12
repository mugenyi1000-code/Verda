# EEIS Compliance Care Plan — Launch Kit

A ready-to-sell package for converting existing ESIA/ESMP clients into
recurring **compliance care plan** customers. Built on the premise
that any factory, quarry, timber processor, or contractor holding (or
pursuing) a NEMA certificate needs ongoing monitoring to stay compliant
between audits — and EEIS already has the certified expertise and the
client relationship in-house.

## Why this works as fast cash

| | ESIA / ESMP (one-off) | Compliance Care Plan (recurring) |
|---|---|---|
| Sales cycle | Months, competitive tender | Days — pitched at existing contract close |
| Payment | Milestone-based, slow | Fixed monthly/quarterly invoice |
| Delivery | New scoping every time | Repeatable checklist, same team |
| Client acquisition cost | High (new lead) | ~Zero (already-served client) |

## What's in this repo

- **`docs/business-model.md`** — the compliance care plan offer, financial logic, and rollout plan.
- **`docs/pricing-tiers.md`** — three fixed-fee packages ready to quote.
- **`docs/service-scope-checklist.md`** — what a quarterly visit actually covers (effluent/air sampling, waste audit, permit tracking) so delivery stays consistent and billable.
- **`docs/compliance-care-plan-agreement-template.md`** — a short-form service agreement to get a signature fast (not a substitute for legal review).
- **`docs/outreach-emails/`** — personalized pitch emails for the five warm leads already scoped (Abubaker Technical, Cosmic Investments, Kaletex Ventures, Lusango Real Uganda, Crested Crane Timber).
- **`app/`** — **Verda**, a static (no-backend) web app that runs the whole compliance care plan offer day-to-day. Open `app/index.html` in a browser. See below for what it does.

## Fastest path to first invoice

1. Open `docs/pricing-tiers.md`, pick the tier that fits each client's risk category.
2. Send the matching email from `docs/outreach-emails/` at the next contract close or check-in call.
3. On verbal yes, send `docs/compliance-care-plan-agreement-template.md` for signature (same day).
4. Add the client in Verda (`app/index.html` → Clients & Compliance Care Plans) and set their first visit date.
5. Invoice on signature, not on delivery — the compliance care plan model is prepaid or billed at period start.

## Verda — the app

**Verda** ("VER-da") is the platform name: a 5-letter, easy-to-say brand for
the tool EEIS staff and clients actually use, distinct from the "Verda
Reporting" document it produces. It's a single static app — open
`app/index.html` in any browser, or serve the `app/` folder from any static
host. All data is stored locally in the browser (`localStorage`); there is
no server yet.

It covers **18 sectors across every part of the economy** — industrial,
energy/resources/construction, services and commerce, and public/health/
agriculture — each with its own compliance checklist. See
`docs/competitive-benchmark.md` for how Verda's module coverage compares
with established EHS platforms and what is still on the roadmap.

Organized into three groups (Monitor / Manage / Grow), each with its own
sub-sections in the sidebar:

**Monitor — what's happening on site**
- **Dashboard** — the six capability pillars Verda covers (Safety, Health &
  Wellbeing, Environment, People & Community, Biodiversity & ESG,
  Governance & Compliance), every sector as a one-click entry point, plus
  headline counts, upcoming visits and quick actions.
- **Analytics** — leading/lagging indicators: incidents by month, actions by
  status, risk profile, and KPI tiles for open/overdue actions, high risks
  and training currency. Charts are inline SVG (no chart library, so they
  work offline) with a data-table view under each one.
- **Incidents** — report and classify incidents and near-misses by type and
  severity, track investigation status, and raise a corrective action
  straight from any record.
- **Risk Register** — 5×5 likelihood × severity matrix with automatic
  scoring and banding (Low/Medium/High/Critical), controls and owner per
  hazard, and a live matrix heatmap.
- **Audits** — Auto EHS Audit (per-sector checklist, AI-assisted findings
  summary) and ESIA Audit (against your own ESMP commitments).
- **Records** — PPE, Environment, Community and CSR records with a photo
  gallery.
- **Maps & Site Visits** — client sites on a real ArcGIS/Esri basemap
  (via Leaflet), colour-matched to the active theme, plus a Matterport
  embed slot for virtual walkthroughs.

**Manage — the programmes and deliverables**
- **Actions (CAPA)** — one tracker for every corrective/preventive action
  whatever raised it, with owner, due date, priority and overdue flagging.
- **Verda Reporting** — the monthly/quarterly report, renamed from the old
  "ESSR" label. Choose the reporting standard: **Verda modular segments**
  (Safety, Security, Environment, GHG, Community, Permitting); the
  **IFC Performance Standards** (PS1–PS8), the framework lenders and
  international clients most often require alongside national reporting;
  or the full **ESSR** (Environmental & Social Self-Monitoring Report), the
  23-section monthly format a contractor submits to its lender, the
  independent E&S consultant, the Employer and the Engineer — labour
  statistics, H&S statistics, site clinic, security, accommodation,
  traffic, water and energy, community health & safety, waste, wastewater,
  biodiversity, restoration, community development, cultural heritage,
  stakeholder engagement, influx, demobilisation and the statutory permit
  register. Whichever is chosen, each section can be added or omitted per
  report; "Generate with AI Assist" drafts the narrative and the report
  downloads as a real file.

  ESSR sections take **structured input, not just prose**: each one asks for
  the figures its KPI table actually needs (man-hours, LTIs, toolbox talks,
  PPE issued, m³ of water abstracted, kWh and kg/day CO₂, waste by stream,
  grievances received and closed, permits acquired vs. pending — 119 fields
  in all) alongside three narrative boxes the format requires: monthly
  updates, cumulative KPI reporting, and a management comment. The draft
  prints the returns as an aligned block above each narrative, and follows
  the ESSR convention of reporting "no change" explicitly rather than
  leaving a section blank.
- **ToR & ESIA Reporting** — structured input following the standard
  ESIA/ToR outline, with an AI-assisted draft and a credits-based "submit
  for EEIS processing" step.
- **Training & Competency** — course records per person with validity
  periods and automatic Valid / Expiring soon / Expired status.
- **Workflows**, **Clients & Compliance Care Plans**, **Checklists** (per
  sector + an EHS permits checklist), **Documents Library**, **Credits &
  Billing**.

**Grow — enablement, marketplace and community**
- **Plans & Pricing** — how Verda is packaged and sold as a product
  (Starter/Team/Business/Enterprise plus credit packs). Packaging proposal,
  not a live checkout; see `docs/monetisation.md`.
- **Solutions** (by business need, by industry, by role — frontline to
  executive, each linking into the sections that solve it), **Resources
  Hub** (Demo, QHSE Library, Events & Webinars, Community), **Supplies &
  Hire** (PPE/tools organized by the standard categories used industry-wide
  by suppliers like Honeywell, DuPont, MSA Safety and SafeSourceDirect — no
  branded products reproduced), **Free IEC Materials**, **Skills Advisor**.

## How it makes money

`docs/monetisation.md` sets out both revenue lines and, importantly, which
one is available today:

1. **Services — now.** EEIS sells compliance care plans and delivers them
   with Verda. Model it in **Revenue Planner → Services**. Verda's
   contribution is capacity, not new revenue: more clients per consultant on
   the same hours.
2. **Platform — after a backend exists.** Verda licensed to other
   organisations. Model it in **Revenue Planner → Platform**. Subscriptions
   need real auth, multi-tenancy and a payment gateway first; the planner
   is a plan, not a forecast.

Other platform features: free sign-up with starter credits then buy more
(demo billing), a colour theme switcher (Forest/Ocean/Amber/Slate — also
drives the map basemap), a language switcher (English/Kiswahili/Français/
Português for the navigation and key labels), and offline app-shell caching
via a service worker for low-connectivity sites.

**What's real vs. simulated, honestly:** the report/audit/ESIA drafting,
checklists, maps (Esri tiles), Matterport embedding, offline caching, and
all CRUD screens are fully functional. AI drafting, the skills advisor, and
credit billing run on deterministic in-browser logic rather than a live
Claude API or payment gateway — both need a backend to hold API keys and
process real payments safely, which doesn't exist yet. The code is
structured so swapping in a real Claude API call or a payment processor is
a small, contained change (see the top of `app/ai.js`) rather than a
rewrite. Login/sign-up is likewise a browser-only prototype, not
production-grade auth.
