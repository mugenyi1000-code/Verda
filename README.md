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
- **`docs/exit-strategy.md`** — Verda built backwards from an acquisition: what a $5M and a $10M outcome actually require, who the realistic buyers are and what each pays for, and which value drivers are reachable before a backend exists.
- **`docs/service-scope-checklist.md`** — what a quarterly visit actually covers (effluent/air sampling, waste audit, permit tracking) so delivery stays consistent and billable.
- **`docs/compliance-care-plan-agreement-template.md`** — a short-form service agreement to get a signature fast (not a substitute for legal review).
- **`docs/outreach-emails/`** — personalized pitch emails for the five warm leads already scoped (Abubaker Technical, Cosmic Investments, Kaletex Ventures, Lusango Real Uganda, Crested Crane Timber).
- **`tools/build-single-file.js`** — bundles `app/` into `dist/verda-demo.html`, one self-contained file. It extracts the page shell from `app/index.html` rather than keeping its own copy, and fails the build if `init()` looks up an element the shell does not contain.
- **`tools/check-build.js`** — smoke-tests the *built* file in a headless browser: that it renders at all, every section, all five jurisdictions, and the reporting screen. Run it after every build — passing against `app/` is not evidence the bundle works.
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

It covers **21 sectors across five groups** — industrial and manufacturing;
**mining and minerals**; energy, resources and construction; services and
commerce; and public, health and agriculture — each with its own compliance
checklist, **423 checklist items in total**.

Mining is covered in depth rather than as a footnote: **large-scale mining**
(tailings governance and the Global Industry Standard on Tailings Management,
acid rock drainage, pit slope and underground ventilation, blast vibration,
occupational hygiene, closure liability and financial assurance),
**artisanal and small-scale mining** (formalisation, child-labour controls,
mercury and the Minamata Convention, OECD due diligence and chain-of-custody
for 3TG and cobalt), **mineral processing, smelting and refining**, and
**quarrying and aggregates**.

**Five jurisdictions: Uganda, Kenya, Tanzania, DR Congo and Zambia.** A
jurisdiction selector in the top bar drives a per-country regulatory register
— the regulators and what each one actually regulates, the principal
instruments with their citations, and the permits and approvals with their
issuing authority and when they are needed. DR Congo is carried in French
where submissions are made in French. Every entry carries a compiled date, a
review-due date and an explicit instruction to verify against current law; it
is a practitioner's starting register, not legal advice.

A **Where to apply** tab carries the actual e-permitting portals — NEMA's
ELMIS for Uganda, NEMA-on-eCitizen for Kenya, NEMC's Projects Management
System for Tanzania, CAMI for DR Congo, ZEMA via ZamPass for Zambia, plus the
water and mining cadastre portals for each — 27 links in all, each saying what
you do there, with a downloadable copy and the month it was checked. Where no
official site could be confirmed the entry says so rather than offering a
plausible guess: a wrong portal is how application fees get paid to the wrong
party.

See `docs/competitive-benchmark.md` for how Verda's module coverage compares
with established EHS platforms and what is still on the roadmap.

Organized into three groups (Monitor / Manage / Grow), each with its own
sub-sections in the sidebar:

**Monitor — what's happening on site**
- **Dashboard** — the six capability pillars Verda covers (Safety, Health &
  Wellbeing, Environment, People & Community, Biodiversity & ESG,
  Governance & Compliance), every sector as a one-click entry point, plus
  headline counts, upcoming visits and quick actions.
- **Analytics** — **automatic KPIs, nothing typed in.** LTIFR, TRIFR, AIFR,
  severity rate, near-miss reporting rate and the near-miss:injury ratio, each
  calculated from the incident classification and the hours register, per
  million hours worked (the ILO convention — stated on screen, because OSHA's
  200,000-hour base gives a number five times smaller for identical
  performance). **Every rate splits your own workforce from your
  sub-contractors**, because a site-wide figure hides the group most often
  getting hurt. With no hours recorded a rate shows a dash, never a zero that
  reads like good news. An expandable panel gives every formula and its source
  register. Plus incidents by classification and by employer, actions by
  status and the risk profile — inline SVG, working offline, with a data table
  under each chart.
- **Incidents** — report and classify incidents and near-misses by type and
  severity, track investigation status, and raise a corrective action
  straight from any record.
- **Risk Register** — pick from a **124-hazard library** across 18 energy and
  exposure categories (mechanical, electrical, gravity, chemical, confined
  space, geotechnical, psychosocial, community and more) and the controls
  normally expected come with it — then a 5×5 likelihood × severity matrix with automatic
  scoring and banding (Low/Medium/High/Critical), controls and owner per
  hazard, and a live matrix heatmap.
- **Audits** — Auto EHS Audit (per-sector checklist, AI-assisted findings
  summary) and ESIA Audit (against your own ESMP commitments).
- **Inspections & Calculations** — an **equipment and machine register** whose
  next-due date is calculated from the last inspection and the statutory
  interval, sorted by what lapses first, with overdue examinations flagged
  (a lapsed statutory examination usually means the item may not lawfully be
  used). Backed by **91 inspection requirements** across lifting equipment,
  pressure systems, electrical, fire safety, access and fall protection,
  vehicles and mobile plant, machinery, monitoring and detection, welfare and
  emergency, and mining and heavy industry — each with its interval, who must
  do it, and the basis for the requirement.

  Plus **15 live calculators**: quantity in, the figure a standard or permit
  asks for out, updating as you type. Fuel and electricity to CO₂e, emissions
  intensity, waste volume to mass and diversion rate, abstraction against a
  permitted daily limit, water per person per day, any monitoring result
  against its limit, daily noise exposure (LEX,8h with the 3 dB exchange
  rate), welfare provision and first-aider numbers from headcount, PPE stock
  from replacement rate, underground ventilation from diesel fleet power,
  stockpile volume to wet and dry tonnes, and injury frequency rates. Every
  factor is shown and editable, every calculator states its basis, and where
  a factor depends on your permit, your grid or your national regulation
  Verda asks for it rather than supplying a default that would look
  authoritative and be wrong.
- **Records** — PPE, Environment, Community and CSR records with a photo
  gallery.
- **Maps & Site Visits — sensitive-area screening.** Verda **does not ship
  wetland boundaries and will not**: national wetland layers are held by the
  agencies that survey them, are large, licensed and revised, and a
  plausible-looking polygon shipped in an app is worse than none — someone
  screens a site against it, reads "no wetland here", and clears works that
  needed a permit. Instead Verda names where the authoritative layer comes
  from for each country (plus Ramsar RSIS, Global Mangrove Watch, GLWD,
  WorldCover and the WDPA), lets you **load the layer you obtained** as
  GeoJSON, and **screens every coordinate the platform holds against it** —
  client sites, ToR study areas, ESIA sampling points, receptors and
  monitoring points — reporting inside / within-buffer / outside with a
  distance, and downloading as a screening record.
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

  **Every section of every format takes structured input — tables, figures,
  charts and photographs, not just prose.** 51 data tables across the three
  formats (267 columns) with add/remove rows and starter rows where the format
  expects fixed line items; numeric columns plot automatically as inline SVG
  bar charts with a legend, direct value labels and a data-table view under
  each; and each section has a drag-and-drop photo area (drop, click or paste;
  images are downscaled in the browser and never leave the device). Reports
  download two ways: `.txt` with the tables rendered as fixed-width text, or a
  standalone `.html` file carrying the tables, charts and photographs, styled
  to print cleanly.

  **Running totals carry forward.** Lender-facing formats ask for two figures
  on every line — this period and the total to date. Verda owns the series:
  the previous report for the same client and format supplies the opening
  balance, and the new total is computed rather than re-typed (locked, with
  the source period on hover). On a client's first report you set the opening
  balances yourself. See `docs/exit-strategy.md` for why this mechanism, and
  not the module count, is where the enterprise value sits.

  **Guided mode**, on by default, explains in plain English what each section
  is for, how to fill it, and shows example wording — enough that someone who
  has never written a compliance report can work through one. A four-step
  card explains the flow, a progress line tracks how many selected sections
  have content, and the example wording is guidance to read, never text the
  app inserts on your behalf.

  ESSR sections also take summary figures: each one asks for
  the figures its KPI table actually needs (man-hours, LTIs, toolbox talks,
  PPE issued, m³ of water abstracted, kWh and kg/day CO₂, waste by stream,
  grievances received and closed, permits acquired vs. pending — 119 fields
  in all) alongside three narrative boxes the format requires: monthly
  updates, cumulative KPI reporting, and a management comment. The draft
  prints the returns as an aligned block above each narrative, and follows
  the ESSR convention of reporting "no change" explicitly rather than
  leaving a section blank.
- **Terms of Reference** and **ESIA Reporting** — **two separate documents,
  because that is what they are.** The ToR is the scoping document approved
  before fieldwork starts: 12 sections covering objectives, study area, scope
  of work, methodology and baseline studies required, stakeholder
  requirements, deliverables, team, programme and QA. The ESIA is the
  assessment itself: 11 sections from baseline through impacts, alternatives,
  the ESMP and the monitoring plan. Each has its own screen, its own saved
  documents and its own draft; a switch at the top moves between them.

  Both take the same structured input as Verda Reporting — **28 data tables**
  with add/remove rows, automatic charts, per-section drag-and-drop figures
  and photographs, guided mode, and .txt plus standalone .html downloads.
  ESIA impacts are scored before and after mitigation so the chart shows what
  each measure actually buys.

  **Coordinates are linked to the map.** Six tables take latitude and
  longitude — study area boundary, proposed and actual sampling points,
  sensitive receptors, consultation locations and monitoring points. Each row
  has a **Map** button offering four ways to capture a point: click the Esri
  basemap, take the device's GPS, use the client's saved site location, or
  type it in. Values are range-validated and flagged when wrong, and every
  coordinate table plots its points as an inline SVG that needs **no tiles and
  no network** — the basemap is better when it loads, but a plot that vanishes
  without a connection is useless at a quarry with no signal.
- **Training & Competency** — a **95-course catalogue** across induction,
  emergency, high-risk work, plant, chemical and health, mining, environment,
  management systems, social and sector-specific streams. Each carries its
  validity period, so choosing a course sets the refresher date itself;
  records track role and employer and show Valid / Expiring soon / Expired.
- **Clients, Sub-contractors & Workforce** — care plans, a **sub-contractor
  register** (scope, pre-qualification status against a 20-point checklist,
  insurance expiry with overdue flagging, EHS contact) and the **workforce &
  hours register** that every safety rate is calculated from, entered per
  employer so the direct/sub-contractor split is real rather than assumed.
- **Officer contacts** — the statutory posts that exist in each country
  (district/county environment officer, natural resources officer, physical
  planner, and the rest), what each is responsible for, and where the current
  holder sits. Verda ships **no names, numbers or email addresses**: these are
  individual public servants who transfer constantly, a stale contact in a
  submitted report is worse than a blank line, and publishing officials'
  personal details is not ours to do. What it gives you instead is a register
  for the people you actually deal with, recording how each was verified and
  flagging any contact not confirmed in 180 days.
- **Checklists & Regulatory Register** — sector checklists, per-country
  permits and regulators, plus the **reference libraries**: hazards, the
  training catalogue, injury classification, cause taxonomy (15 immediate,
  14 underlying), 12 permit-to-work types, 24 emergency scenarios, 34
  monitoring parameters with units, 28 waste streams with disposal routes,
  audit finding grades, 29 job roles, 30 document types, and every KPI
  definition. All downloadable.
- **Workflows**, **Documents Library**, **Credits & Billing**.

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
