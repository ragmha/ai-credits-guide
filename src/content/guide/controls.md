---
title: Budgets are layered guardrails
section: Budgets & controls
order: 3
description: Pick a control for the outcome you need. A team spending limit and a person's consumption cap solve different problems.
verified: "2026-11-10"
diagram: layered-guardrails
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

- You can match each control to its scope and enforcement behavior.
- You can explain why unused team budget does not unblock a user.
- You can choose strict financial enforcement or continuity deliberately.

## Match the control to the question

The controls below are documented capabilities. Their release phase is **status unverified** unless the [status register](/sources/) supplies explicit release evidence.

| Control | What it governs | Enforcement |
| --- | --- | --- |
| User-level budget (ULB) | Each person's total credit consumption, including included credits | Always a hard stop |
| Cost-center ULB | A per-person default for members of a cost center | Always a hard stop; overrides universal ULB |
| Individual ULB | A specific person's consumption | Always a hard stop; overrides cost-center and universal ULB |
| Cost-center budget | A group's metered charges | Hard stop only when enabled |
| Organization budget | Metered charges for seats billed to that organization | Hard stop only when enabled |
| Enterprise budget | Enterprise metered charges, subject to exclusions | Hard stop only when enabled |
| Cost-center included-usage control | A cost center's draw on the included pool | Choose block or paid overage at the cap |

**A cost-center budget does not partition the included pool.** The separate included-usage control caps included usage at the amount funded by licenses assigned to that cost center; GitHub calculates the amount. This is not a manually entered team allocation.

User-level budgets were [announced as GA on June 1](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/). The later [cost-center ULB](https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/) and [included-usage cap](https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/) announcements establish availability but do not explicitly label a release phase; neither should inherit GA status automatically. Those posts described REST-first launches, so use current setup docs rather than assuming their historical UI limitations still apply.

## Choose budget type as well as scope

A **Bundled AI credits budget** covers overage across all AI-credit SKUs, not just Copilot. A **SKU-level budget** targets one SKU; for example, **Code Security AI Credits** controls AI Scan and agentic autofix spending. If a bundled hard budget is exhausted by another product, it can also stop those security features. If both bundled and SKU hard budgets apply, exhausting either can block usage. [GitHub's setup guidance](https://docs.github.com/en/billing/how-tos/set-up-budgets#plan-your-budget-type-and-scope) recommends avoiding overlapping budgets that unexpectedly block users.

User-scoped budgets are currently supported only for Copilot AI credits; the setup UI exposes **Users** scope under **Bundled AI credits budget**. Do not assume a Copilot ULB limits every AI-credit SKU. Older setup examples still list Spark; retain the [retirement caveat](/sources/#known-source-tensions), not an adoption recommendation.

## What gets checked first

1. **Resolve the applicable ULB.** Individual overrides cost-center ULB, which overrides universal. This is precedence, not the smallest of three ULB amounts. If the applicable ULB is exhausted, the request is blocked. If none is set, this check does not impose a ULB cap.
2. **Check included allowance and paid usage.** Business and Enterprise use the included pool while available, subject to applicable included-usage controls. After pool exhaustion, paid usage must be enabled. Copilot access starts at metered use.
3. **Check metered spending controls.** GitHub documents the cost-center route first for assigned users, the licensing-organization route for users without a cost center, and the enterprise route when neither applies. By default cost-center usage also counts toward the enterprise budget. Do not read the routing order as permission to bypass an applicable enterprise limit.

Across independent applicable controls, the least remaining enforced headroom can block the user first. Raising a team or enterprise budget does not override an exhausted ULB. Raising a ULB does not bypass an enforced metered limit.

> **Example:** A user has consumed their applicable ULB. The enterprise still has included credits and the team has metered budget left. The user remains blocked; an administrator must address the applicable ULB, not add unrelated team budget.

## Strict cap or continuity

The budget docs say to enable **Stop usage when budget limit is reached** to enforce a spending limit. They note it is off by default. The Well-Architected guidance instead recommends leaving the **enterprise** hard stop disabled to protect continuity, with alerts and an operational response.

These are different risk choices, not different product behaviors:

| Choose | Configure | Accept and mitigate |
| --- | --- | --- |
| Strict spending cap | Enable the hard stop on the applicable metered budget | Credit-consuming work can stop; publish escalation and recovery |
| Continuity-first monitoring | Leave the selected metered hard stop off; configure alerts and named responders | Charges can exceed the threshold; maintain spending authority and timely intervention |

**Guide advice:** Record the choice with finance and workload owners before rollout. Do not copy alert-only guidance where overage is prohibited. Do not claim an alert-only budget enforces a financial ceiling. ULBs remain hard stops in either design.

## Enterprise inclusion is a separate choice

By default, cost-center usage counts against the enterprise budget. **Cost-center exclusion** lets selected cost centers operate independently of that enterprise cap. Their charges still exist; exclusion is not free usage, extra authorization, or exemption from ULBs.

Use independent authority only when approved and documented. Monitor total enterprise financial exposure across excluded and non-excluded spending.

## Organization boundaries can surprise you

The budget docs warn that when a user receives Business or Enterprise licenses from multiple organizations, GitHub selects a billing organization each cycle. Spend can land under different organization budgets. Prefer one licensing organization per user, or direct cost-center assignment where appropriate.

GitHub App installation usage is billed to its owning organization. Individual app/installation budgets are not available; review app access and the organization's spending controls rather than promising per-app caps.

## Read the guardrail diagram

The visual below shows the distinct governance layers. It is not a wallet-transfer model: remaining budget at one scope cannot replenish another scope's exhausted enforced limit.
