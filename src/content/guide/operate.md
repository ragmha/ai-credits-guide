---
title: Practise the alert-to-decision loop
section: Day-two operations
order: 6
description: Rehearse a blocked-user response, identify the real limit, and recover through an accountable decision.
verified: "2026-11-10"
diagram: operating-loop
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/
  - https://learn.github.com/well-architected/governance/recommendations/governing-agents
---

## What you will learn

- You can identify the control behind a block or alert.
- You can route recovery to the right owner without bypassing approval.

## Worked scenario: raising the wrong budget does nothing

**Hypothetical use case:** A developer reports a block. The responder sees spare enterprise budget and raises the team's metered limit. Nothing changes: the applicable individual ULB is exhausted. Stop changing unrelated controls; confirm consumption, ask the budget owner for a decision, then have an authorized administrator apply and verify it.

**Guide advice:** Rehearse the visual loop in your existing operations system. Identify the billing entity, user, period and actual limiting control first. An alert-only threshold may mean spending continues, not that anyone is blocked.

An approved increase, workload adjustment, attribution correction or no change are all possible outcomes. Record the approver, rationale and review/expiry date. A threshold itself authorizes none of them.

## Cadence that fits maturity

| When | Review | Output |
| --- | --- | --- |
| At an alert or block | Limiting layer and impact | Owned decision, verified recovery |
| Weekly during rollout | Adoption, mapping gaps, blocks and exceptions | Corrected settings or guidance |
| Monthly once stable | Consumption, metered cost and forecast separately | Approved adjustments and next review |

These cadences follow Well-Architected. Response times and alert thresholds are local choices. Low spending can mean efficiency, low adoption or blocked work; use outcomes and feedback before judging it.

For agent workloads, the [Well-Architected cost checklist](https://learn.github.com/well-architected/governance/recommendations/governing-agents#5-cost-management) pairs organization or cost-center spending limits with responsible alert recipients, model-cost education, and usage tracking. It calls for **Stop usage** when implementing hard caps; keep the [cap-versus-continuity decision](/controls/#strict-cap-or-continuity) explicit.

## When somebody is blocked

Budget restrictions do not remove a seat. Recovery can come through the next billing cycle or an authorized change to the relevant budget. The built-in budget-increase request flow is [GA for Business and Enterprise under usage-based billing, but unavailable for enterprises with managed users](https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/). Managed-user enterprises need their own escalation route.

Inline code completions and next edit suggestions continue because they do not consume AI credits. Communicate this clearly so users do not mistake a budget event for total loss of Copilot.
