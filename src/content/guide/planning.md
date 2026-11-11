---
title: Plan before you set amounts
section: Plan your budgets
order: 4
description: Turn business intent into a signed-off control design, not an arbitrary number per developer.
verified: "2026-11-10"
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- You can separate financial authority from product enforcement.
- You can choose centralized or delegated accountability.
- You can size a provisional baseline without pretending to have usage history.

## Write the decision brief

**Guide advice:** Capture the following in your existing planning document before an administrator configures controls.

| Decision | Required answer | Accountable role |
| --- | --- | --- |
| Coverage | Billing entity, plan, users, and workloads in scope | Enterprise platform owner |
| Financial envelope | Approved license spend and additional metered spend, separately | Finance / procurement |
| Continuity | Which workloads may stop, and who accepts that impact? | Business workload owners |
| Accountability | Centralized budget, delegated cost centers, or a mix? | Finance and platform |
| Attribution | User-to-cost-center mapping and exception process | Identity and FinOps owners |
| Enforcement | Alert-only or hard stop at each applicable metered scope | Budget approver |
| Access fairness | Universal ULB, profiles, and individual exception route | Platform owner |
| Response | Alert recipients, backup owner, and escalation route | Operations lead |

## Choose your accountability model

**Centralized:** Keep financial authority with the enterprise owner and use showback to make consumption visible. This is simpler when adoption is early or business units are not ready to own metered spend.

**Delegated:** Align cost centers to spending authority, name local owners, and configure their metered budgets. Decide explicitly whether each center remains inside the enterprise cap. Add chargeback only when finance has agreed the allocation rules.

Neither model requires using GitHub organization structure as your financial hierarchy. Use the boundary that matches ownership; validate actual assignment and billing behavior.

## Use observations, not a universal allowance

Baseline historical consumption if available. The Well-Architected guide suggests a deliberately permissive provisional ULB when history is missing, collecting one or two billing cycles before tightening. "Permissive" is an operational choice, not infinite spending authorization: align it with paid-usage policy, metered enforcement, and your approved exposure.

Segment workloads by observed patterns: occasional chat, daily interactive development, and agent-heavy work may behave differently. Measure model and token/context consumption instead of inferring cost or productivity from job title.

For an illustrative forecast, estimate total consumption from comparable observed workload, adjust for planned adoption, and subtract the applicable included allowance to estimate overage. Treat this as a scenario, not an invoice calculation: model mix, policy changes, included-usage controls, and enforced caps can change actual charges.

## Leave headroom intentionally

Review the relationship between ULBs and available metered funding. Aggregate ULBs are **not reservations** against the shared pool. If authorized individual consumption exceeds included credits, the difference can become metered usage. If financial caps cannot support it, people can be blocked before reaching their ULBs.

Document expected variation for releases, onboarding, incidents, and time-bound experiments. Record an owner and review date for exceptions; individual ULBs support optional expiration according to the budget docs.

## Your handoff checklist

- The finance approver and workload owner agree on cap versus continuity.
- Every scoped budget has an owner and a backup.
- Identity and cost-center mapping have an accountable maintainer.
- Users know what a block means and how to request a change.
- A dated baseline and review cadence exist.
- Preview adoption follows the enterprise's policy; unknown status is checked before rollout.

Take this brief into [the implementation sequence](/implementation/). It is not complete until configuration matches the decisions.
