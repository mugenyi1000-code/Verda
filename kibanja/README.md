# Kibanja SmartCare — platform prototype

A working, click-through prototype of the Kibanja SmartCare platform: a
food-security card for Kampala households that pay UGX 1.5M a year. It is
separate from Verda and shares no code with it.

Open `kibanja-smartcare.html` in a browser. `target-investors.csv` holds the 50 target investors from the Investors screen, for a spreadsheet or CRM. It is one self-contained file
with no build step and no server. Everything runs on example households
dated 22 Oct 2026, and **Reset demo** puts them back.

## The eleven screens

| Screen | What it shows |
|---|---|
| Overview | The one card and what is on it (food credit line, emergency cover, wallet and points, Food Basket, Kibanja Loan), the household's year on the platform, and the one number to check first |
| How it works | The plain-language explainer: six steps for a family, where every shilling is held and what Kibanja earns from it, who does what, and common questions |
| Family app | The phone app for each example household: card, plan payments and plan switching, wallet top-ups, Kibanja points, a one-time pay code for when the card is at home, Kibanja Loan repayments, reporting an emergency, the monthly allowance, the credit ladder and repayments |
| Food and producers | The price-locked Kibanja Food Basket (UGX 169,000 a month for a family of five, 15% under shelf price), the Ugandan-made share of sales against the Buy Uganda Build Uganda shelf targets, the partner directory (Made in Uganda as a proposed partner; producers and manufacturers as clearly marked examples), what partners get, and the monthly volumes producers can plan on |
| Store till | Cashier view. Reads the card, applies offers and the member discount, and pays the whole basket without cash, by card or pay code: points (if the member chooses), emergency allowance (essentials), then wallet, then credit line, then a Mobile Money prompt on the member's phone for anything left |
| Packages | Prepaid shopping packages: pay weekly, monthly or yearly and the money plus a bonus (1%, 3% or 8%, more on bigger packages) lands on the card as a shopping balance that buys anything in the store. For individuals (free Kibanja Card, Solo UGX 100,000 a month, Solo Plus 200,000), families (Family Starter 300,000, Family 500,000, Family Max 1,000,000) and employers (Kibanja Staff 150,000 and Staff Plus 300,000 per employee, from 10 staff, with a volume bonus at 50+ and 200+). Each package shows what a month buys in bulk packs (25 kg flour and rice bags, 10 kg beans and sugar, 10 L oil) and what is left over. Corporate calculator, editable settings, who pays for the bonus, points and offers |
| Kibanja Loan | One loan book for the food system, grouped as "Grow, store and sell food" (farm inputs, poultry and livestock, storage and drying, food-trade stock) and "Move food" (motorcycles with a 20% deposit and weekly repayments, and fuel credit at partner stations). Money goes to suppliers, hubs, dealers or fuel stations, never as cash; farm loans can be repaid in produce and riders can repay from delivery pay. One loan at a time plus fuel credit, an explainable Kibanja score, a full-cost calculator, a 30%-of-income check, no lending during an emergency, and a loan book with approvals and late loans |
| Operations | Claims queue with automated checks and a human approve/decline, exposure KPIs, member register |
| Underwriting | The three-year table rebuilt from the plan's assumptions: 96% of households on a monthly credit line, 10M card spend a year, 6% supermarket rebate, 2.5% processing fee per cycle, 4% claiming an average 20M. Lands within 1% of the original (net 1.19B / 6.6B / 20.6B vs 1.2B / 6.65B / 20.75B; the gap is the fee charged only on credit users). Inputs for credit losses and cost of funds, a stress grid, and findings |
| Rollout | Phase 1 in detail, flagship store set-up costs, and the licences and partners to line up first |
| Investors | The pitch with live figures, the three advantages and what diligence will ask, 50 target investors with a status tracker (grants and accelerators, seed funds, growth funds, lenders for the credit and motorcycle books, development finance), name ideas for the platform, the comparison with Uganda's supermarket cards, the 10-year expansion, fundraising by stage and a data-room checklist |

The screens share state: a claim filed in the family app appears in
Operations; approving it unlocks the card; charging a basket at the till
reduces the household's allowance or credit.

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
