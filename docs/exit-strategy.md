# Building Verda backwards from the exit

The premise is right: "let's make a good EHS platform" is not a strategy, it is
a hobby with a roadmap. "What would make someone pay $10M for this, and what
has to be true by then?" is a strategy, because it forces every build decision
to answer to something.

This document works that backwards. It is deliberately blunt about the gap.

---

## 1. The arithmetic first, because it constrains everything else

Software companies are bought on a multiple of recurring revenue, adjusted for
growth, retention and strategic fit. The multiple is not something you argue
your way into — it is set by what comparable businesses sold for recently, and
it moves with interest rates and market appetite. **Check current comparables
before quoting any of this to anyone; do not take these ranges from a document
written in 2026 and assume they hold.**

Broadly, for vertical B2B SaaS at small scale:

| Situation | Typical range | What it means for Verda |
|---|---|---|
| Sub-$500k ARR, few customers | Often no clean multiple at all — priced as a team-and-technology deal | The product is not the asset yet |
| ~$1M ARR, modest growth, ordinary retention | ~3–5× ARR | $5M needs roughly **$1.0–1.7M ARR** |
| ~$1M ARR, strong growth + high retention + strategic fit | ~6–10× ARR | $5M needs roughly **$500k–850k ARR** |
| $2M+ ARR with the full value-driver set below | ~8–12× ARR | $10M needs roughly **$850k–1.25M ARR** |

Two conclusions fall straight out of that table, and they are the whole point
of doing the arithmetic first:

**(a) The difference between a $5M outcome and a $10M outcome is mostly the
multiple, not the revenue.** Doubling ARR is years of work. Moving from a 4×
business to an 8× business is a set of deliberate choices about retention,
concentration, contract structure and defensibility — choices you make while
building, or not at all. That is what "build backwards from the exit" actually
buys you.

**(b) There is no feature that substitutes for revenue.** Verda today has no
customers, no ARR, and no backend to bill through. Every hour spent adding a
module before the first paying customer is an hour spent lowering the eventual
multiple, because it builds surface area nobody has validated. This is the
trap the project is currently in, and naming it is more useful than another
feature.

---

## 2. Who would actually buy this, and what each one is paying for

Different acquirers buy different things. Building for "an acquirer" in the
abstract produces a product that appeals to none of them. There are four
realistic classes here, in rough order of likelihood.

### A. TIC firms and E&S consultancies — the most likely buyer

SGS, Bureau Veritas, Intertek, RINA, ERM, and the regional equivalents. RINA
is literally named as the IESC in the ESSR that shaped Verda's reporting
module — that is not a coincidence, it is a signal about where this product
sits.

**What they are buying:** delivery capability. Their economics are consultant
hours. A tool that lets one consultant carry eight monitoring clients instead
of five is a direct margin improvement across their existing book, plus it
locks in the monitoring contract because the client's history lives in the
tool.

**What they pay a premium for:** proprietary workflow their consultants adopt;
the client's cumulative data; regulatory content they would otherwise maintain
by hand; evidence of hours saved per report. **They pay nothing extra for**
module count, a slick dashboard, or an AI label.

**What this implies for the build:** instrument the time saved. If you cannot
say "an ESSR that took 22 hours takes 6," you have no pitch to this buyer.

### B. Mid-market EHS software vendors buying geography or vertical depth

Cority, Ideagen, EcoOnline, Evotix, VelocityEHS, SAI360 and similar. These
firms grow by acquisition and buy into markets and verticals they cannot reach
organically.

**What they are buying:** customers in a market they have written off, plus
compliance content for jurisdictions they do not cover. An East African
regulatory content library with real customers on it is genuinely hard for
them to build and cheap for them to buy.

**What they pay a premium for:** customer count and logo quality, multi-country
coverage, clean documented IP, and a codebase they can integrate without a
rewrite. **They discount heavily for** revenue concentrated in one or two
clients, and for anything that looks like a consultancy with software attached
rather than a software company.

### C. Lender- and donor-facing reporting infrastructure

Anyone whose business is making DFI-financed projects reportable. Smaller
class, but the ESSR niche sits directly inside it.

**What they are buying:** the reporting standard itself, and the network of
contractors already submitting through it.

### D. A regional conglomerate or PE roll-up

Buys cash flow, not vision. Multiple will be low. Worth knowing this exists as
a floor, not as a target.

**The decision this forces:** A and B want different things — A wants deep
workflow for a few expert users, B wants many self-serve customers across
countries. You cannot optimise for both. **Pick A first**, because it is
reachable from where EEIS actually stands today (existing client relationships,
certified expertise, sector credibility), and because A's requirements are a
subset of B's — a product consultancies adopt can later be sold direct, but a
thin self-serve product cannot be retrofitted into expert workflow.

---

## 3. The value drivers, each turned into a build decision

Your list is right. Here is what each one actually means in code and in
operations, and whether it is reachable today.

| Value driver | What it concretely means for Verda | Buildable now? |
|---|---|---|
| **Recurring revenue** | Annual contracts billed up front, not per-report credits. Credits are a demo mechanic and a bad basis for valuation — they are usage revenue, which is discounted against subscription revenue | **Blocked** — needs a backend and a payment gateway |
| **Low churn** | The cumulative figures (§4). Also: annual terms, and the report archive becoming the client's system of record | **Partly now** — carry-forward is buildable today |
| **100s of enterprise customers** | Self-serve onboarding, multi-tenancy, per-tenant data isolation | **Blocked** — needs a backend |
| **Multi-country compliance** | Every checklist, permit list and limit tagged with a jurisdiction, a legal source and a review date | **Done** — Uganda, Kenya, Tanzania, Rwanda, DR Congo and Zambia, each with regulators, instruments and permits, under a dated review cycle |
| **Strong customer data** | The accumulated columns, the photo evidence archive, the permit expiry register. This is the asset, not the UI | **Partly now** |
| **Integrations** | Read from what clients already run: accounting for fuel and energy, HR for headcount, lab portals for results. Each integration is a switching cost | **Blocked** — needs a backend |
| **AI-assisted compliance** | Right now this is a documented deterministic template engine, and the README says so. An acquirer's technical diligence *will* open `app/ai.js`. Overclaiming here is the fastest way to lose a deal | **Blocked** — needs an API proxy |
| **Proprietary workflows** | The ESSR structure, the three-block section pattern, the cumulative carry-forward. Already the most defensible thing in the repo | **Now** |
| **High switching costs** | See §4 — this is the single highest-leverage item and it is available today |  **Now** |
| **Strong brand** | Being *the* name for lender-mandated E&S monitoring reporting in the region beats being a generic EHS suite nobody has heard of | **Now** — it is a positioning choice |
| **Clear regulatory knowledge** | The content library, with sources and review dates, maintained on a schedule | **Done for six countries** — kept current is now an operating commitment, not a build task |
| **Documented IP** | Clean licence, clear ownership, no copied content, dependency provenance, and a written record of what was authored when | **Now** |

Note the pattern: **seven of the twelve are reachable without a backend**, and
they are mostly the ones that move the *multiple* rather than the revenue. That
is the answer to "what do we build now."

---

## 4. The one that matters most: the cumulative column is the moat

Every ESSR section asks for two figures — this month, and accumulated to date.
Man-hours, inductions, PPE issued, m³ abstracted, waste by stream, grievances,
area restored. Lenders read the running total.

That running total is a liability for the client and an asset for whoever
holds it. A contractor 26 months into a 40-month contract has a series that is
expensive to reconstruct and career-threatening to get wrong. **If Verda
carries those figures forward automatically, leaving Verda means rebuilding the
series by hand from 26 monthly PDFs.**

That is not a feature. It is the switching cost, the customer-data asset and
the churn story in one mechanism, and it is available today in a static app
with no backend. Nothing else on the list has that ratio of value to effort.

Second order, same mechanism: the **photographic evidence archive** (site
photos, dated, captioned, tied to a section and a period) and the **permit
register with expiry tracking**. Both accumulate. Both hurt to leave behind.

**Design rule that follows:** any figure that accumulates must be owned by
Verda and carried forward — never re-typed. Any evidence must be retained and
retrievable by period. If a feature does not accumulate, it does not build
enterprise value, however good it looks.

---

## 5. What to stop doing

Stated plainly, because it is the expensive part:

- **Stop adding modules.** The platform has 23 sections and zero users. The
  next module adds maintenance cost and subtracts focus. It does not add value.
- **Stop treating the credits mechanic as the business model.** Usage credits
  value at a discount to subscriptions and encourage customers to use the
  product less. Annual subscription, billed up front.
- **Stop describing the deterministic drafting engine as AI in any material a
  buyer will read.** The code is honest about it; keep every other document
  equally honest. Diligence finds this, and what it costs you is not the
  feature — it is your credibility on every other claim.
- **Stop building for an imaginary self-serve customer.** Build for the
  consultant delivering monthly ESSRs on a lender-financed contract, because
  that person exists, has a budget, and is reachable this quarter.

---

## 6. The sequence

**Phase 0 — now, no backend needed.** Cumulative carry-forward. Jurisdiction
tagging on all content. Content library with sources and review dates. Licence
and IP hygiene. Time-saved instrumentation. Positioning around lender-mandated
E&S monitoring rather than general EHS.

**Phase 1 — first revenue.** Deliver monitoring for paying clients using Verda.
Not a software sale: a service sale that Verda makes profitable. This funds
everything else and produces the reference logos that Phase 2 needs. Target:
a handful of contracts, and a measured, defensible figure for hours saved per
report.

**Phase 2 — the backend.** Auth, tenancy, payments, a Claude API proxy. Only
now does the product become sellable as software. Without Phase 1's revenue
this phase is funded by nothing.

**Phase 3 — the multiple.** Annual contracts, retention measured and published,
multi-country content, two or three integrations that create switching cost,
documented IP, clean financials. This is where a 4× business becomes an 8× one.

---

## 7. The honest risk

The gap between here and $5M is mostly commercial, not technical. Verda is a
capable application with no customers, no revenue and no backend. An acquirer
buys a business; right now there is a product and a plan.

That is not a reason to stop — it is a reason to be precise about which work
actually compounds. The seven value drivers reachable without a backend are
exactly that work, and the cumulative carry-forward in §4 is where to start.
