---
title: Give teams room without losing control
section: Plan your budgets
order: 4
description: Compare a shared included pool with team-level controls, then turn the choice into an approved decision brief.
verified: "2026-11-10"
diagram: cost-center-controls
checks:
  - question: Two teams have metered budgets. Does each now own a reserved share of included credits?
    answer: No. Their included pool remains shared. Evaluate the separate cost-center included-usage control if their draw on that pool must be limited.
  - question: A pilot has no reliable consumption baseline. Does a permissive provisional ULB approve unlimited additional charges?
    answer: No. Keep paid-usage policy and metered enforcement aligned with approved exposure, observe real workloads, then review the baseline with its owners.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- You can choose the right control for shared credits versus paid overage.
- You can agree ownership before choosing amounts.

## Worked scenario: two cost centers, one shared pool

**Hypothetical use case:** A platform team runs long agent tasks; a support team uses occasional chat. Their Business or Enterprise licenses fund the same included pool. A metered budget for each team does **not** reserve included credits for it.

If fairness requires limiting each team's draw, evaluate the **separate cost-center included-usage control**. GitHub calculates the cap from licenses assigned to that center. Choose block or permitted paid overage when it is reached. For additional charges, use metered budgets. These are separate decisions, not transfers between team wallets.

Read the diagram as two distinct control surfaces. The shared-pool side concerns how much included usage a cost center may draw. The metered side concerns additional charges. A boundary drawn around a cost center does not turn its licenses into a private credit account.

Continue the hypothetical scenario. While included credits remain, the platform team's long tasks can consume from the shared pool without exhausting its metered budget. The support team's owner notices the pool shrinking and asks to lower the platform team's metered threshold. That change alone does not solve the stated fairness problem: it governs the later paid phase, not the current draw on included credits.

The owners instead make two decisions. They assess an included-usage cap and its block-or-permitted-overage behavior for the platform cost center. Separately, they approve what additional charges that center may incur and how its metered budget is enforced. A ULB can still stop a person sooner; neither team setting guarantees that every user can consume their full personal limit. This is why the implementation brief records purpose as well as amount.

See the [official budget rules](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) and [release evidence](/sources/) before rollout.

## Choose who owns the decision

**Centralized:** Finance and the platform owner retain financial authority; teams get showback. **Delegated:** cost centers align to named spending owners, with explicit enterprise-cap inclusion or exclusion. Organization structure need not be your financial hierarchy.

**Guide advice:** Capture this brief in an existing planning document.

| Decide | Record |
| --- | --- |
| Coverage | Billing entity, plan, people and workloads |
| Authority | Approved license spend and metered spend, separately |
| Continuity | Which work may stop, who accepts it, and each enforcement setting |
| Ownership | Cost-center mapping, approver, alert responder and backup |
| Exceptions | Applicable ULB, reason, review/expiry date and escalation |

<details>
<summary>When there is no reliable consumption baseline</summary>

[Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) suggests a permissive provisional ULB and one or two billing cycles of observation before tightening. Permissive is not unlimited spending authorization: align paid-usage policy and metered enforcement with approved exposure. Measure actual workloads, not assumed productivity by job title.

Aggregate ULBs do not reserve the pool. A user may be blocked by a financial cap before reaching their ULB. Temporary individual overrides support optional expiry; record the reason and owner.

</details>

## Your handoff checklist

Finance and workload owners agree on enforcement; every control has an owner and backup; mappings and exceptions are maintained; users know the escalation route. Check preview policy and unknown release status before adoption. Then follow [the implementation sequence](/implementation/).
