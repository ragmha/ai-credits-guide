---
title: Lead with the customer's operating model
section: For sellers
order: 8
description: Discover what the enterprise needs before prescribing a budget amount, a control, or a rollout plan.
verified: "2026-11-10"
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- You can distinguish a commercial question from an implementation question.
- You can map discovery answers to the right control.
- You can leave a practical handoff for finance and platform admins.

## Worked scenario: two incompatible expectations

**Hypothetical discovery:** Finance wants no paid overage. The platform owner wants credit-consuming work to continue after included credits run out. Resolve that trade-off with the financial approver before proposing a configuration; a threshold cannot satisfy both. Use the [cap-versus-continuity visual](/controls/#strict-cap-or-continuity) to frame the decision.

## Discover before prescribing

The following is **guide advice** derived from the Well-Architected decision framework.

| Ask the customer | What the answer identifies | Take them to |
| --- | --- | --- |
| Which plan and billing entity fund usage? | Included pool versus metered from first use | [Billing model](/understand/) |
| Is zero overage required, or can approved work continue? | Paid-usage policy and strict-cap versus continuity choice | [Control trade-offs](/controls/#strict-cap-or-continuity) |
| Who owns spending authority across business units? | Centralized versus delegated cost centers | [Planning](/planning/) |
| Is the concern one person's consumption or a team's charges? | ULB versus cost-center metered budget | [Controls](/controls/) |
| Must teams be limited in their draw on included credits? | Separate included-usage controls, not just metered budgets | [Controls](/controls/) |
| Can usage be mapped to accountable owners today? | Reporting prerequisite and showback readiness | [Attribution](/reporting/) |
| Who responds when an alert fires or work stops? | Operational ownership and escalation gap | [Operations](/operate/) |
| What does the pilot actually show? | Data-backed baseline versus provisional limits | [Implementation](/implementation/) |

No approver or continuity decision? Start with planning. Decisions agreed but attribution missing? Start with reporting. Both ready? Walk through the implementation pilot before automating.

<details>
<summary>Avoid these promises</summary>

- "Every seat has a private balance." Included credits are pooled.
- "This enterprise budget includes your licenses." It limits metered charges, not seat fees.
- "A team budget will unblock that person." An exhausted ULB needs its own resolution.
- "Alerts prevent overage." Alert-only thresholds do not enforce a ceiling.
- "Your forecast is your approved purchase." Forecasts, controls, and procurement are separate.
- "It's documented, so it must be GA." Release status needs evidence.

Do not quote future or unverified allowances. Link the current pricing/billing source, date the assumption, and confirm the customer's commercial terms through the proper process.

</details>

## Leave a one-page implementation brief

Capture the billing entity and plan, included-versus-metered model, approved spending envelope, continuity choice, proposed scopes and owners, source-verified assumptions, unresolved release-status checks, and next review date.

The administrator should receive an implementable decision record, not a suggested dollar figure with no ownership. Use [the planning checklist](/planning/#your-handoff-checklist) and [implementation checks](/implementation/#validate-before-broad-rollout) as the acceptance criteria.
