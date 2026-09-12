# Making money from Verda

Two revenue lines. They have very different timelines, and conflating them
is the fastest way to be disappointed.

## Line 1 — Services (available now)

EEIS sells **compliance care plans** and delivers them using Verda. Revenue
is fees from clients; Verda's contribution is lower delivery cost per client.

- **Model it:** Revenue Planner → *Services* tab.
- **What decides it:** fee per tier, lab cost per visit, loaded day rate. A
  tier only works if its fee for the period clears the cost of that period's
  visit.
- **Where Verda pays off:** not new revenue — *capacity*. If report drafting,
  checklists, permit tracking and audit findings let one consultant carry 8
  clients instead of 5 on the same hours, that is +60% revenue on an
  unchanged cost base. That is the honest ROI claim, and it is provable.
- **Starting point:** the five already-scoped leads. That is a floor, not a
  salary — see the break-even figure in the planner.

## Line 2 — Platform (needs building first)

Verda is licensed to other organisations as a product: subscriptions plus
credit packs for AI drafting and ESIA processing.

- **Model it:** Revenue Planner → *Platform* tab. Packaging lives in
  **Plans & Pricing**.
- **Nothing here can be charged today.** The current build is a static,
  offline-capable front end. Subscriptions require infrastructure that does
  not exist yet.

### What must be true before the first invoice

In the order they pay off:

1. **Backend with real authentication, roles, and per-tenant data
   separation.** Today sign-in is a browser prototype and all data is in
   one `localStorage` bucket. Without tenancy there is no product to sell.
2. **Payment gateway** (card and mobile money) wired to plans and credit
   packs. Until then "Choose Team" is a button that does nothing.
3. **A Claude API proxy** so AI drafting is genuinely AI. It is currently a
   documented deterministic template engine — good enough to demo, not what
   a customer is paying for when the button says AI.
4. **Someone answering support.** Team-tier customers who hit a wall in
   week one churn straight back out, and the planner's churn field is
   unforgiving about what that costs.

### What makes it defensible

- **Coverage:** 18 sectors with real checklists, not one vertical.
- **Three reporting frameworks:** Verda's modular national (NEMA-style)
  segments, IFC PS1–PS8 (which matters to every lender-financed client), and
  the full 23-section monthly ESSR self-monitoring format that large
  donor- and lender-financed construction contracts are obliged to submit.
  The ESSR one matters commercially: producing that report by hand every
  month is weeks of a consultant's time on every major contract.
- **Offline on remote sites** — most cloud EHS tools simply stop working.
- **Five languages**, so it is not locked to one market.
- **Price point** well under enterprise EHS suites, aimed at the operators
  those suites ignore.

### The honest risk

The EHS software market is crowded and the incumbents are well funded. Verda
does not win on feature count. It wins, if it wins, on being usable at a
quarry with no signal, priced for an operator who was never going to buy
Enterprise-tier software, and reporting in the frameworks their regulator
and their lender actually ask for.

## Sequencing

Fund line 2 out of line 1. The services business pays for the backend build;
the backend build turns the tool into a product. Attempting the product first
means paying for infrastructure with no revenue underneath it.

## A note on the numbers

Every figure in the planner and in `pricing-tiers.md` is a placeholder.
They exist to show the shape of the model. Replace them with a real rate
card before quoting anyone.
