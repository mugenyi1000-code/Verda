# Kibanja SmartCare — platform prototype

A working, click-through prototype of the Kibanja SmartCare platform: a
food-security card for Kampala households that pay UGX 1.5M a year. It is
separate from Verda and shares no code with it.

Open `kibanja-smartcare.html` in a browser. It is one self-contained file
with no build step and no server. Everything runs on example households
dated 22 Oct 2026, and **Reset demo** puts them back.

## The seven screens

| Screen | What it shows |
|---|---|
| Overview | Model A (emergency card) and Model B (essentials credit line) side by side, the household's year on the platform, and the one number to check first |
| Family app | The phone app for each example household: card, cover status, reporting an emergency, the monthly allowance, the credit ladder and repayments |
| Store till | Cashier view. Reads the card, puts essentials on SmartCare and pushes extras (beer, airtime, soda) to cash. Refuses locked or overdue cards |
| Operations | Claims queue with automated checks and a human approve/decline, exposure KPIs, member register |
| Underwriting | The three-year table rebuilt from the plan's assumptions: 96% of households on a monthly credit line, 10M card spend a year, 6% supermarket rebate, 2.5% processing fee per cycle, 4% claiming an average 20M. Lands within 1% of the original (net 1.19B / 6.6B / 20.6B vs 1.2B / 6.65B / 20.75B; the gap is the fee charged only on credit users). Inputs for credit losses and cost of funds, a stress grid, and findings |
| Rollout | Phase 1 in detail, flagship store set-up costs, and the licences and partners to line up first |
| Investors | The pitch, the three advantages (float, data, zero-waste integration) each with live figures and the questions diligence will ask, the 10-year expansion (Kampala → Ugandan regional → East Africa) with gates between phases, fundraising by stage, and a data-room checklist |

The screens share state: a claim filed in the family app appears in
Operations; approving it unlocks the card; charging a basket at the till
reduces the household's allowance or credit.

## Design decisions that differ from the original plan

- **90-day waiting period** on Model A, so cover can't be bought the week a
  layoff is already known.
- **Model B starts at 3× the deposit (UGX 4.5M)**, not 50M, and climbs a
  rung (4.5M → 9M → 18M → 30M → 50M) after three on-time repayments with at
  least 90% of spend on essentials.
- **Premiums don't fund the store.** Phase 2 originally used the premium
  float to open the flagship; that money is owed to claimants, so the store
  is funded from equity or debt.
- **Claims are decided by a person.** Automated checks gather the evidence.

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
- A drought trigger pays a whole district at once and needs a per-district
  cap and reinsurance.
- Missing costs: underwriter share or reinsurance, commissions, card
  issuing, 30% corporate income tax.

The licence list (IRA, UMRA, Bank of Uganda payments, Personal Data
Protection Office, URSB/URA/KCCA) is a starting point, not legal advice.
