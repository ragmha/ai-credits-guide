---
title: Operate the budget, not just the settings
section: Day-two operations
order: 6
description: Make every alert actionable, every exception accountable, and every review grounded in observed consumption.
verified: "2026-11-10"
diagram: operating-loop
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/
  - https://learn.github.com/well-architected/governance/recommendations/governing-agents
---

## What you will learn

- You can triage an alert without reflexively raising a limit.
- You can distinguish consumption, attribution, and continuity problems.
- You can establish a repeatable weekly and monthly cadence.

## Respond to the actual control

**Guide advice:** Use this runbook in your existing operations system.

1. Identify the affected billing entity, user or group, workload, and applicable control. Is this a ULB block, paid-usage policy, included-usage cap, or enforced metered limit?
2. Check the reporting period, assignment, and actual consumption. A notification alone is not proof of the root cause.
3. Assess impact: is work blocked, or is an alert-only threshold crossed while spending continues?
4. Route the decision to the budget owner. Choose an approved increase, a workload/model adjustment, an attribution correction, or no change.
5. Have the authorized administrator apply the change and confirm the effect. Record the approver, rationale, and review or expiry date.

Do not raise a team budget to fix an exhausted ULB. Do not disable all enforcement because one workload needs a temporary exception.

## Cadence that fits maturity

| When | Review | Output |
| --- | --- | --- |
| At an alert or block | Affected layer, remaining headroom, cause, and continuity impact | Owned decision and user communication |
| Weekly during rollout | Adoption, unusual consumption, mapping gaps, blocks, and exceptions | Corrected configuration or guidance |
| Monthly once stable | Actuals versus forecast, model mix, workforce changes, budget utilization | Approved next-cycle amounts and updated forecast |

These cadences follow Well-Architected guidance; your response-time targets and alert thresholds should be agreed locally.

## What belongs in the review

Review total consumption and metered cost separately. Show usage by cost center and user profile, identify unmapped usage, and explain large changes using workload context. Distinguish shared-pool consumption from paid overage.

For agent workloads, the [Well-Architected cost checklist](https://learn.github.com/well-architected/governance/recommendations/governing-agents#5-cost-management) pairs organization or cost-center spending limits with responsible alert recipients, model-cost education, and usage tracking. It calls for **Stop usage** when implementing hard caps; keep the [cap-versus-continuity decision](/controls/#strict-cap-or-continuity) explicit.

Track blocks and exception requests as user-experience signals. An unusually low spend might mean efficient work, low adoption, or people being blocked. A high spend might be valuable work or waste. Use outcomes and user feedback before judging either.

## When somebody is blocked

Confirm the control that actually stopped the request. Budget restrictions do not remove a seat. The docs describe recovery through the next billing cycle or an administrator increasing the relevant budget. The built-in budget-increase request flow is [GA for Copilot Business and Enterprise under usage-based billing, but not available for enterprises with managed users](https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/). Managed-user enterprises need their own escalation route to an authorized administrator.

Inline code completions and next edit suggestions continue because they do not consume AI credits. Communicate this clearly so users do not mistake a budget event for total loss of Copilot.

## Reading the operating loop

The diagram below is a recommended human operating model, not an automated product behavior. A threshold starts a decision; it does not itself approve additional spending.
