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
the tool EEIS staff and clients actually use, distinct from the "EEIS
Reporting" document it produces. It's a single static app — open
`app/index.html` in any browser, or serve the `app/` folder from any static
host. All data is stored locally in the browser (`localStorage`); there is
no server yet.

Organized into three groups (Monitor / Manage / Grow), each with its own
sub-sections in the sidebar:

**Monitor**
- **Dashboard** — redesigned home screen: active care plans, permits due
  soon, upcoming visits, quick actions.
- **EEIS Reporting** — the monthly/quarterly report, renamed from the old
  "ESSR" label. Segments (Safety, Security, Environment, GHG, Community,
  Permitting) can each be added or omitted per report. "Generate with AI
  Assist" drafts the narrative from your notes and the report downloads as
  a real file — this was the "report not loading" bug, now fixed and
  covered by an automated browser test (see below).
- **ToR & ESIA Reporting** — structured input following the standard
  ESIA/ToR outline (background, legal framework, baseline, impacts,
  alternatives, ESMP, engagement, monitoring plan, institutional
  arrangements, conclusion), with an AI-assisted draft and a "submit for
  EEIS processing" step that spends credits.
- **Audits** — Auto EHS Audit (per-industry checklist, AI-assisted findings
  summary) and ESIA Audit (against your own ESMP commitments).
- **Records** — PPE, Environment, Community and CSR records with a photo
  gallery.
- **Maps & Site Visits** — client sites on a real ArcGIS/Esri basemap
  (via Leaflet), colour-matched to the active theme, plus a Matterport
  embed slot for virtual walkthroughs.
- **Workflows** — HR, Environmental Management, and Safety Administration
  step-by-step workflow templates.

**Manage**
- **Clients & Compliance Care Plans**, **Documents Library** (downloadable
  templates), **Checklists** (per industry + an EHS permits checklist),
  **Credits & Billing**, **Skills Advisor** (keyword-based course/
  certification suggestions from what you type).

**Grow**
- **Resources Hub** (Demo, QHSE Library, Events & Webinars, Community),
  **Supplies & Hire** (PPE/tools organized by the standard categories
  used industry-wide by suppliers like Honeywell, DuPont, MSA Safety and
  SafeSourceDirect — no branded products reproduced), **Free IEC
  Materials** (Health/Safety/Social/Environment), **Solutions** (by
  business need, by industry, by role).

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
