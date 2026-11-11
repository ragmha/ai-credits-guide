---
title: Implement in three phases
section: Implementation
order: 5
description: Use the Start, Adopt and Advance roadmap to turn a budget decision into a working operating model.
verified: "2026-11-10"
diagram: rollout-roadmap
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/copilot/tutorials/budgets/getting-started-with-budget-controls
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
---

## What you will learn

- You can implement the nine Well-Architected steps in three phases.
- You can verify a pilot before scaling or automating it.

## Before you begin

Confirm the billing entity, plan and permissions. Enterprise owners and billing managers configure enterprise controls; organization owners configure organization budgets. Bring a [decision brief](/planning/) and user-to-cost-center mapping.

**Enterprise custom roles — <span class="status caution">public preview - use with caution</span>** can delegate AI administration, but the [AI manager role recipe](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) does not grant access to Copilot billing settings by default. AI administration is not billing authority.

Use [GitHub's current setup instructions](https://docs.github.com/en/billing/how-tos/set-up-budgets) for exact UI fields. Select **Bundled AI credits budget** for all-AI-credit coverage or a **SKU-level budget** for a narrower limit. Check [overlap and cross-product blocks](/controls/#choose-budget-type-as-well-as-scope).

## Start: establish the baseline

| Source step | Do | Done when |
| --- | --- | --- |
| 1. Design layers | Name each scope, owner, enforcement choice and approval | Included-usage controls and metered budgets stay separate |
| 2. Communicate | Explain blocks, usage visibility and escalation | Users and responders explain the same ULB scenario |
| 3. Enterprise budget | Save approved metered amount, alerts and hard-stop choice; review paid-usage policy | Settings match signed-off cap/continuity intent |
| 6. Attribution | Map source usage to owners using an existing report or spreadsheet | Totals reconcile and unmapped usage is visible |

Step 6 moves earlier because [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) makes attribution a prerequisite for optimization, not a reward for reaching automation.

## Adopt: add accountable controls

| Source step | Do | Done when |
| --- | --- | --- |
| 4. Cost centers | Check assignments, metered budgets, enterprise inclusion/exclusion and notifications | Each center has an owner and tested enforcement; any included-pool cap is configured separately |
| 5. ULBs | Set a baseline, cost-center defaults and justified individual overrides | You can resolve **individual > cost-center ULB > universal** and review/expire exceptions |
| 7. Usage guidance | Teach model/task fit, context discipline and consumption visibility | Users can check usage and find approved headroom |
| 8. Operating model | Assign alert triage, approver, administrator and backup | A block has a named recovery path |

ULBs always hard-stop across included and metered consumption; a zero ULB blocks credit-consuming features immediately. Do not use low consumption as a productivity score.

**CLI AI-credit session limits — <span class="status caution">public preview - use with caution</span>** offer a session-level control, but are soft limits: an in-progress response completes and can exceed the configured amount. They do not replace enterprise budgets or ULBs. Review the [session-limit documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit) and preview policy before adoption.

## Advance: review, then automate

**9. Review monthly and adjust.** Compare actual consumption, forecast, blocks, exceptions and mapping quality. Automate repeated operations only after the manual process works; verify API status and permissions. Every change needs a reason, approver, audit trail and review date, not just an automated increase.

## Validate before broad rollout

**Worked pilot scenario (hypothetical):** A new team joins an existing cost center. Check its mapping and per-user default before inviting everyone else. Use existing records where possible; do not generate paid usage without authorization.

| Check | Expected outcome |
| --- | --- |
| An individual ULB overrides a broader default | The applicable individual value is used, not a sum of limits |
| A ULB is exhausted | Remaining shared credits or team budget do not unblock it |
| A metered hard stop is off | It is treated as monitoring, not a ceiling |
| A cost center is excluded from enterprise scope | Its usage remains visible and independently governed |
| A user has multiple licensing organizations | Allocation is checked rather than assumed stable |
| A control blocks credit consumption | Code completion and next edit suggestions remain available |

Record settings and observed results. Review weekly during rollout, monthly once stable. The pilot succeeds when behavior matches the approved brief.
