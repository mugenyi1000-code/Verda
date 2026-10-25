# Kibanja SmartCare — platform prototype

A working, click-through prototype of the Kibanja platform: prepaid food
packages for Kampala households and employers, paid weekly, monthly or yearly
and spent with a card or phone code instead of cash. It is separate from Verda
and shares no code with it.

Open `kibanja-smartcare.html` in a browser. It is the platform as an app,
with one switch at the top for who is using it:

| Mode | What it is |
|---|---|
| Family | The family's phone app (Home, Packages, Loans, Me) beside a basic phone running the USSD menu (`*XXX#` until the UCC issues a code): balance, pay package, pay code, Shop Ahead, emergency. |
| Agent | Field staff: search families, enrol one (Ugandan phone check, national ID seen but not stored, consent), record a Mobile Money payment with its transaction ID, give a pay code, open the family's app. |
| Store | The till: scan a card or a single-use 6-digit pay code (5 minutes), bulk packs and staples, paid from Protection, then balance, then Shop Ahead if the family asks, then Mobile Money at the till. Ends with a receipt and the SMS text. |
| HQ | Scale band (1 dot = 1,000 households), the payment confirmation queue, claims and loan decisions, numbers with CSV exports, the launch checklist and the Mobile Money merchant codes. |

A switch beside the logo picks the records:

- **Practice** uses sample families for training. Nothing is saved; "Start
  over" resets it.
- **Live pilot** keeps real records in the page's shared database when it is
  opened in Claude, signed in. Everyone the page is shared with sees the same
  families, payments and decisions, so share it with staff only.

## How money moves

- Every balance is worked out from a ledger of entries, never stored as a
  number that can drift.
- A Mobile Money payment (from the app, USSD or an agent) is recorded as
  *awaiting* with its network and transaction ID. It becomes spendable only
  when HQ ticks it off against the MTN or Airtel statement. "Not received"
  rejects it.
- **Shop Ahead** (it replaces "food credit") lets a family take essentials
  before payday: up to half a month of their package, no interest and no fee,
  repaid with the next payment. It opens after two on-time payments, pauses
  while the package is overdue or Protection is paying, and is used only when
  the family asks at the till.
- Pay codes are single-use and expire after 5 minutes.

## What the pilot page does not do yet

It is a pilot back office, not the production system. Before launch at scale:

- Mobile Money collections API (MTN MoMo, Airtel Money) so payments confirm
  themselves instead of by hand.
- A USSD short code from the UCC and a USSD gateway, and an SMS gateway with a
  sender ID for receipts and pay codes.
- A trust account with a licensed payment partner for prepaid balances, a
  licensed lender for Shop Ahead and loans, and an insurer for Protection.
- A production backend: the page's database holds up to 25,000 records,
  enough for roughly the 100-family pilot.

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

The investor pack's Underwriting screen still models the original plan's
credit line; in the app it is Shop Ahead.

- **One card, not two models.** Every household gets the credit line
  (now Shop Ahead) and the emergency cover together, on one plan payment.
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
- **The credit line starts at UGX 4.5M**, not 50M, and climbs a rung
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
