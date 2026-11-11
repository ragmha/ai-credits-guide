---
title: Find the control that stops the request
section: Budgets & controls
order: 3
description: Work through a blocked-user example, then compare a strict financial cap with continuity-first monitoring.
verified: "2026-11-10"
diagram: layered-guardrails
scenarioDiagram: cap-or-continuity
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/billing/concepts/budgets-and-alerts
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
  - https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/
  - https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/
---

## What you will learn

- You can diagnose a block without raising the wrong budget.
- You can choose enforcement deliberately and identify cross-product effects.

## Worked scenario: credits remain, but the developer is blocked

**Hypothetical, not a recommended budget:** A developer's applicable ULB is equivalent to **100 credits**, all consumed. The shared pool still contains **20,000 credits**. Their next credit-consuming request is blocked. Increasing the team's metered budget cannot fix this; an authorized administrator must address the applicable ULB.

Code completions and next edit suggestions continue. A budget block is not removal of the license.

## What gets checked first

1. **Resolve one ULB:** individual > cost-center ULB > universal. This is precedence, **not the smallest of three amounts**. ULBs measure included plus metered consumption and always hard-stop. With none set, no ULB cap applies.
2. **Check the funding phase:** included pool, applicable included-usage control, then permitted paid usage. Copilot access starts metered.
3. **Check applicable metered controls:** GitHub routes assigned users through cost-center budgets, otherwise licensing-organization budgets, then enterprise budgets where neither applies. Cost-center usage normally also counts toward the enterprise cap.

Across independent applicable controls, the least remaining **enforced** headroom can block first. A route is not permission to bypass another applicable cap. [Source: budget evaluation](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets).

## Strict cap or continuity

**Hypothetical choice:** Finance forbids additional overage for one workload; another approved workload must continue while an owner responds. These require different enforcement settings, not the same default copied everywhere.

| Choose | Configure | Accept and mitigate |
| --- | --- | --- |
| Strict spending cap | Enable **Stop usage when budget limit is reached** | Credit-consuming work can stop |
| Continuity-first monitoring | Leave the selected metered hard stop off; assign alert responders | Charges can exceed the threshold |

The [budget docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) recommend hard stops for enforcement; [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) recommends leaving the enterprise hard stop off for continuity. **Guide advice:** record the choice with finance and workload owners. Alert-only is not purchase authorization. ULBs remain hard stops either way.

<details>
<summary>Check exclusions and billing boundaries</summary>

**Cost-center exclusion** separates selected centers from enterprise-cap aggregation, not from charges, ULBs or approval requirements. Monitor the total exposure across excluded and included centers.

For users licensed through multiple organizations, GitHub selects a billing organization each cycle. Prefer one licensing organization per user or direct cost-center assignment. GitHub App installation usage belongs to its owning organization; individual app/installation budgets are unavailable.

</details>

## Choose budget type as well as scope

A **Bundled AI credits budget** covers overage across AI-credit SKUs; a **SKU-level budget** targets one SKU. If another product exhausts the bundled hard budget, **AI Scan and agentic autofix can also stop**. A Code Security AI Credits SKU hard budget can independently block them. [Avoid overlapping limits that cause unexpected blocks](https://docs.github.com/en/billing/how-tos/set-up-budgets#plan-your-budget-type-and-scope).

User-scoped budgets currently cover **Copilot AI credits only**, even though the UI puts **Users** under the bundled budget type. A cost-center metered budget does not partition the included pool; use the [separate included-usage control](/planning/).

ULBs were [announced GA June 1](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/); later [cost-center ULB](https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/) and [included-usage](https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/) launches do not establish an explicit GA phase. Check the [register, current setup evidence and Spark retirement caveat](/sources/).
