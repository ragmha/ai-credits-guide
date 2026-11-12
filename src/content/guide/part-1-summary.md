---
title: Summary
section: Concepts
order: 104
description: Bring the funding model and independent budget controls together before making a plan.
verified: "2026-11-10"
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
---

This part separated the source of credits from the controls on their use. Copilot Business and Enterprise licenses contribute to a shared included pool. After it is exhausted, additional usage is metered if policy permits it and applicable enforced limits have headroom. Copilot access has no included pool.

The cookie jar made a different constraint visible: a shared supply does not override a personal limit. The applicable user-level budget counts included and metered consumption and always hard-stops. An organization or enterprise metered budget cannot replenish an exhausted ULB.

We also separated a strict financial cap from continuity-first monitoring. A metered threshold with its hard stop disabled can send alerts while charges continue. Neither an alert nor a forecast is authorization to spend.

## Key Takeaways

- Included credits are shared; they are not reserved wallets per seat.
- A ULB caps one person's total credit consumption, including included usage.
- Metered budgets govern additional charges, not the included pool or license fees.
- An alert-only threshold is not a ceiling or spending approval.
- Agent workloads can consume Actions minutes as well as AI credits; an AI-credit cap does not cap both.

In Part 2, use this model to identify the enterprise's needs and record an owned decision before selecting budget amounts.
