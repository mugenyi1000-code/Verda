# Kibanja SmartCare — platform prototype

A working, click-through prototype of the Kibanja SmartCare platform: a
food-security card for Kampala households that pay UGX 1.5M a year. It is
separate from Verda and shares no code with it.

Open `kibanja-smartcare.html` in a browser. It is the platform as an app,
with one switch at the top for who is using it:

| Mode | What it is |
|---|---|
| Shop | The family's phone app: Home (card, balance, top up, pay code), Packages (individual, family and employer packages paid weekly, monthly or yearly, with the bonus), Loans (score, food-system and boda/fuel loans) and Me (Protection, food credit, points). On a computer it sits in a phone frame beside a live panel. |
| Store | The till: scan a card or pay code, bulk packs and staples, the basket paid from Protection, balance, food credit and a Mobile Money prompt, points earned. |
| HQ | Scale from today's 7 demo families to a million households (1 dot = 1,000), live numbers, the inbox for claims and loan requests, and supply (Food Basket, Ugandan-made share, partners). |

Every action carries across modes: a pay code made in Shop works at the Store
till, a claim or loan request lands in the HQ inbox, and approving it changes
the family's app.

The investor material is a separate page, `kibanja-investor-pack.html`: the
pitch, 50 target investors, name ideas and the underwriting model. It is built
from `investor-pack-source.html`, the earlier long-form version of the platform
that keeps the full working (underwriting, rollout, detailed rules); run
`node kibanja/build-investor-pack.js` after editing it. `target-investors.csv`
holds the 50 investors for a spreadsheet or CRM.

## The investor pack

| Section | What it shows |
|---|---|
| Pitch | Year 3 figures from the model, the three advantages and what diligence will ask, the comparison with Uganda's supermarket cards, the 10-year expansion, fundraising by stage and a data-room checklist |
| Investors to approach | 50 target investors in five groups (grants and accelerators, seed funds, growth funds, lenders, development finance) with when to approach, what to ask for, why they fit and a status tracker |
| Name ideas | Eight local names (Luganda, Swahili and mixed) and 50 English names in five themes, with a star button to build a shortlist and what to check before choosing |
| Underwriting | The same live model as the platform |

## Design decisions that differ from the original plan

- **One card, not two models.** Every household gets the food credit line
  and the emergency cover together, on one plan payment.
- **Food first.** The credit line and the emergency allowance pay for
  essentials only; points and the wallet pay for anything, with a Mobile
  Money prompt for the rest, so shopping is still cashless.
- **Credit freezes during an emergency.** While the allowance runs, nothing
  new goes on credit and no repayments fall due, so a shock never turns
  into debt. No Kibanja Loans during an emergency either.
- **Ugandan-made goods earn double points**, and producers pay no shelf fees.
- **Packages are prepaid shopping, not insurance premiums.** What a household
  pays comes back as shopping value plus a bonus, so the value is obvious and
  the economics don't rest on claims. The bonus is funded from store margin,
  supplier volume rebates and interest on the prepaid float; the Packages
  screen shows what is left after it.
- **Package Protection replaces the large emergency allowance.** After a
  verified job loss or hospital admission the package continues free for
  three months, for essentials. The Underwriting screen still models the
  original UGX 1.5M / 50M plan.
- **Free Kibanja Card** so anyone can join the network and move to a package later.
- **Matooke removed** from the catalogue and the Food Basket; replaced with
  wheat flour, tea leaves, groundnuts and toilet paper.
- **Loans stay inside the food system** for now; school fees and other
  needs wait until the food book has a track record.

- **90-day waiting period** on emergency claims, so cover can't be bought the week a
  layoff is already known.
- **The food credit line starts at UGX 4.5M**, not 50M, and climbs a rung
  (4.5M → 9M → 18M → 30M → 50M) after three on-time repayments with the
  plan paid up.
- **Premiums don't fund the store.** Phase 2 originally used the premium
  float to open the flagship; that money is owed to claimants, so the store
  is funded from equity or debt.
- **Claims are decided by a person.** Automated checks gather the evidence.
- **Cover needs continuous payment.** A missed plan payment keeps cover for
  the plan's grace days (3 weekly, 7 monthly, 14 annual), then pauses the
  allowance, credit and member discount. The wallet keeps working. Paying
  after a lapse restarts the 90-day claim waiting period.
- **Suggested plan prices** make annual the cheapest over a year (weekly
  costs UGX 1,664,000, monthly 1,620,000), so paying upfront is the reward.

## What the model flags

- The original 4% claims line only balances if each claimant uses about
  UGX 20M of their 50M. At full use, Year 1 loses money.
- Break-even claim rate in Year 3 is about 10.9% (4.4% at full use).
- The credit line has to be funded: about UGX 12B of groceries are on credit
  at any moment in Year 3, which is more than the ~11.25B of premiums held on
  average. That turns the "negative working capital" pitch around, and the
  table counts neither credit losses nor cost of funds.
- A 2.5% fee every monthly cycle is about 30% a year; check it against
  UMRA's rules on money-lender interest and fees.
- Member discounts aren't in the original table: 5% on UGX 10M of card spend
  is UGX 500k per household a year if Kibanja pays it all.
- Wallet balances are customers' money and need a licensed e-money or
  payment partner holding them in trust.
- A drought trigger pays a whole district at once and needs a per-district
  cap and reinsurance.
- Missing costs: underwriter share or reinsurance, commissions, card
  issuing, 30% corporate income tax.

The licence list (IRA, UMRA, Bank of Uganda payments, Personal Data
Protection Office, URSB/URA/KCCA) is a starting point, not legal advice.
