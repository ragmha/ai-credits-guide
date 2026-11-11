---
title: Implement in three phases
section: Implementation
order: 5
description: Start with a visible baseline. Add accountable guardrails. Automate only once the operating model works.
verified: "2026-11-10"
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/copilot/tutorials/budgets/getting-started-with-budget-controls
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
---

## What you will learn

- You can follow the nine Well-Architected implementation steps.
- You can verify behavior at each control boundary.
- You can progress from baseline governance to automation without premature tooling.

## Before you begin

Confirm your billing entity, plan, and permissions. Enterprise owners and billing managers can set all budget controls; organization owners can set organization budgets. Have access to usage reporting and a reliable mapping of users to business units.

**Enterprise custom roles — <span class="status caution">public preview - use with caution</span>** can delegate AI administration, but the [AI manager role recipe](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) does not grant access to Copilot billing settings by default. AI administration is not billing authority.

Use [GitHub's current budget setup instructions](https://docs.github.com/en/billing/how-tos/set-up-budgets) for exact navigation and available fields. This guide deliberately does not freeze screenshots of an administration UI that may change.

## Start: establish the baseline

### 1. Design the layered structure

Use [your decision brief](/planning/) to identify universal, cost-center, individual, organization, and enterprise controls. Record whether cost-center usage counts toward the enterprise budget. Keep included-usage controls separate from metered budgets.

**Done when:** Each control has a purpose, scope, owner, enforcement decision, and source of approval.

### 2. Communicate accountability

Tell users how to monitor consumption, why a ULB can block them while team budget remains, and where to request exceptions. Tell finance which budgets are alerts rather than enforced ceilings. Publish the response owner before turning on enforcement.

**Done when:** Users and responders can explain the same blocked-user scenario correctly.

### 3. Create the enterprise metered budget

In the billing budget configuration, select **Bundled AI credits budget** and enterprise scope for an all-AI-credits limit, or the appropriate **SKU-level budget** for a narrower limit. Check [cross-product coverage and overlap](/controls/#choose-budget-type-as-well-as-scope) before setting an approved amount, configuring available threshold notifications, and assigning recipients. Decide whether cost-center usage is included.

Choose **Stop usage when budget limit is reached** deliberately. A strict-cap design enables it; a continuity-first design leaves it off and accepts the need to respond to alerts. See [the documented trade-off](/controls/#strict-cap-or-continuity). Review the separate **AI credits paid usage** policy.

**Done when:** The saved budget and paid-usage policy match the signed-off intent; recipients and escalation are documented.

### 6. Establish attribution early

This is step 6 in the source implementation sequence, but the Well-Architected strategy makes cost attribution a prerequisite for optimization. Start it alongside baseline controls rather than waiting until after enforcement.

Use the enterprise AI usage report to map consumption to users and business units. Begin with a report or spreadsheet you already use; no custom warehouse is required.

**Done when:** A reviewer can trace reported usage to a cost owner and identify unmapped records.

## Adopt: add accountable controls

### 4. Set up cost-center metered budgets

Map cost centers to approved spending authority and validate member assignments. Create each center's metered AI credits budget; choose hard stop or alert-only, set notifications, and name the owner.

If included-pool fairness requires team-level control, evaluate the **separate cost-center included-usage control**. GitHub calculates that cap from member licenses. Decide block versus paid overage; confirm the option's status and availability in your environment before relying on it.

**Done when:** Assignment, enterprise inclusion/exclusion, notifications, and enforcement have been checked for each cost center.

### 5. Configure user-level budgets

Create a universal baseline from observed data or a documented provisional choice. Apply cost-center per-person defaults for distinct profiles and individual overrides for justified exceptions.

Remember precedence: **individual > cost-center ULB > universal**. ULBs always enforce a hard stop, including against included credits. A zero ULB blocks credit-consuming features immediately.

**Done when:** You can identify the applicable ULB for representative users and explain how an exception expires or is reviewed.

### 7. Publish usage guidance

Explain model/task fit, context discipline, and how users check their usage. Encourage small, bounded experiments. Do not use low consumption as a standalone productivity score.

**CLI AI-credit session limits — <span class="status caution">public preview - use with caution</span>** offer a session-level control, but are soft limits: an in-progress response completes and can exceed the configured amount. They do not replace enterprise budgets or ULBs. Review the [session-limit documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit) and preview policy before adoption.

**Done when:** Users can see their consumption and know how to select an appropriate model and request more headroom.

### 8. Establish the operating model

Assign alert triage, a decision maker for increases, and the administrator who applies approved changes. Establish weekly review during rollout and monthly review when stable, as recommended by Well-Architected.

**Done when:** An alert has a named response path, including an unavailable-owner backup.

## Advance: review, then automate

### 9. Review monthly and adjust

Compare usage profiles, forecast versus actuals, blocks, exception requests, and attribution quality. Revisit headcount, licensing, model mix, and workload changes before changing amounts.

Once the manual process is reliable, use GitHub's documented REST APIs for repeated budget operations or mapping updates. Verify release status and API permissions; do not make automated increases a substitute for purchase authorization.

**Done when:** Changes have a reason, an approver, an audit trail, and a next review date.

## Validate before broad rollout

**Guide advice:** Use a small authorized pilot and existing usage records where possible. Do not deliberately generate paid usage without approval.

| Check | Expected outcome |
| --- | --- |
| An individual ULB overrides a broader default | The applicable individual value is used, not a sum of limits |
| A ULB is exhausted | Remaining shared credits or team budget do not unblock it |
| A metered hard stop is off | It is treated as monitoring, not a ceiling |
| A cost center is excluded from enterprise scope | Its usage remains visible and independently governed |
| A user has multiple licensing organizations | Allocation is checked rather than assumed stable |
| A control blocks credit consumption | Code completion and next edit suggestions remain available |

Record the saved settings and observed results. Roll out only when your actual configuration behaves like the operating brief.
