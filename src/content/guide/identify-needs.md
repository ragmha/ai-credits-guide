---
title: Identify what you need
section: Identify needs
order: 8
description: Assess your enterprise's operating model before choosing a budget amount, a control, or a rollout plan.
verified: "2026-11-10"
diagram: cap-or-continuity
checks:
  - question: Finance requires no paid overage while a workload owner requires uninterrupted credit-consuming work after the pool is exhausted. Can one alert threshold satisfy both?
    answer: No. Those expectations conflict. The financial approver and workload owner must resolve the enforcement and continuity choice before configuration.
  - question: A team asks for a budget to protect its share of included credits. Is a metered budget the right control?
    answer: Not by itself. A metered budget governs additional charges, not the team's draw on the included pool. Assess the separate included-usage control.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- You can distinguish a commercial question from an implementation question.
- You can map discovery answers to the right control.
- You can record practical decisions with finance and platform admins.

Use this assessment whether you administer an enterprise or help one plan its rollout. Agree on the operating model before choosing controls.

## Worked scenario: two incompatible expectations

**Hypothetical assessment:** Finance wants no paid overage. The platform owner wants credit-consuming work to continue after included credits run out. Resolve that trade-off with the financial approver before choosing a configuration; a threshold cannot satisfy both. Use the [cap-versus-continuity visual](/controls/#strict-cap-or-continuity) to frame the decision.

The picture shows two different commitments. A strict financial cap accepts that credit-consuming work can stop. Continuity-first monitoring accepts that charges can exceed a metered threshold while a responder acts. It does not show two ways to guarantee both zero overage and uninterrupted service.

In this assessment, first ask finance whether additional charges are authorized at all. If the answer remains no, record that paid usage must not be allowed and explain the consequence to the workload owner: credit-consuming work cannot continue indefinitely after included funding is gone. If finance instead authorizes exposure for a defined workload, record the scope, approver, enforcement choice and response owner. That is a changed business decision, not a clever threshold setting.

The same method applies when someone asks for a "team budget." Ask whether they mean one person's consumption, fair access to included credits or a ceiling on additional charges. These require different controls. The question table below is a way to uncover the requirement; the chapter's core task is to turn each answer into an owned decision.

## Assess before configuring

The following is **guide advice** derived from the Well-Architected decision framework.

| Question to resolve | What the answer identifies | Where to go next |
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
<summary>Check these assumptions</summary>

- "Every seat has a private balance." Included credits are pooled.
- "This enterprise budget includes your licenses." It limits metered charges, not seat fees.
- "A team budget will unblock that person." An exhausted ULB needs its own resolution.
- "Alerts prevent overage." Alert-only thresholds do not enforce a ceiling.
- "Your forecast is your approved purchase." Forecasts, controls, and procurement are separate.
- "It's documented, so it must be GA." Release status needs evidence.

Do not rely on future or unverified allowances. Link the current pricing/billing source, date the assumption, and confirm the enterprise's commercial terms through the proper process.

</details>

## Record a one-page implementation brief

Capture the billing entity and plan, included-versus-metered model, approved spending envelope, continuity choice, proposed scopes and owners, source-verified assumptions, unresolved release-status checks, and next review date.

The result should be an implementable decision record with named owners, not a suggested dollar figure with no ownership. Use [the planning checklist](/planning/#your-handoff-checklist) and [implementation checks](/implementation/#validate-before-broad-rollout) as the acceptance criteria.
