---
title: Follow usage to its cost owner
section: Day-two operations
order: 7
description: Walk a usage record through mapping and reconciliation before turning visibility into a financial allocation.
verified: "2026-11-10"
diagram: attribution-pipeline
checks:
  - question: A usage total reconciles, but a person moved teams and the ownership map is stale. Is the report ready for chargeback?
    answer: No. A correct total does not prove correct ownership. Keep unresolved attribution visible, resolve the transfer and obtain finance's allocation agreement.
  - question: Does correcting an internal reporting map change GitHub's billing-allocation rules?
    answer: No. Internal showback mapping cannot override product billing allocation. Use the paying account's reporting scope and retain a clear correction record.
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/rest/billing/usage
---

## What you will learn

- You can keep unknown ownership visible and reconcile a report.
- You can distinguish showback from approved chargeback.

## Read the attribution pipeline

The pipeline separates the source record from your interpretation of its owner. Mapping attaches accountability; reconciliation checks that records and totals agree; showback communicates usage. Chargeback adds a financial allocation that needs agreement. Skipping a stage can produce a polished report with the wrong conclusion.

The original source and period must remain traceable through those handoffs. An internal mapping is useful management information, not a way to change which account GitHub bills. That distinction lets you correct a team's report without claiming that the product's billing allocation has changed.

## Worked scenario: the unmapped team transfer

**Hypothetical use case:** A developer moves teams but the reporting map is unchanged. The usage total reconciles, yet the wrong unit would receive the charge. Keep the record explicitly **unmapped** until the accountable maintainer resolves ownership and any historical correction. A neat dashboard cannot fix an incorrect mapping.

**Guide advice:** Start with the downloadable AI usage CSV and a controlled spreadsheet or existing reporting tool. [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) identifies per-user, per-model, per-day usage as the foundation. Check current export fields; retain the period and source.

For a **hypothetical reconciliation exercise**, take 100 credits of source usage for one reporting period. Your working map assigns 60 to Team A and leaves 40 unresolved after a transfer. Report 60 mapped plus 40 unmapped, totaling 100. Do not silently discard the 40 or assign it to whichever team makes the dashboard look complete.

The assignment maintainer later confirms the agreed reporting treatment and maps the 40 to Team B. The total is still 100, but the ownership record is now corrected and traceable. That supports showback. Before using it for chargeback, finance must agree on transfer dates, disputes and allocation; arithmetic alone cannot provide that approval. These numbers illustrate a reporting method, not GitHub export field names or an automatic reallocation.

## Check each handoff

- **Map:** name the assignment maintainer and transfer process. Internal reporting cannot override GitHub's billing-allocation rules.
- **Reconcile:** compare the same period; investigate duplicates, missing users and unexpected totals.
- **Show back:** make usage and cost visible without transferring a charge.
- **Charge back only by agreement:** finance approves allocation, disputes and shared-team treatment.

Restrict identifiable usage to people who need it and follow retention/privacy policies. Do not equate consumption with individual performance.

If automating later, the organization/user **REST billing usage-summary endpoints — <span class="status caution">public preview - use with caution</span>** are explicitly labeled preview in the [REST reference](https://docs.github.com/en/rest/billing/usage). This label is specific to `GET /organizations/{org}/settings/billing/usage/summary` and `GET /users/{username}/settings/billing/usage/summary`, not every billing endpoint. Personal-user endpoints do not include usage billed through an organization or enterprise; select the paying account's reporting scope.
