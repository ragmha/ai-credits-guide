---
title: Follow usage to its cost owner
section: Day-two operations
order: 7
description: Walk a usage record through mapping and reconciliation before turning visibility into a financial allocation.
verified: "2026-11-10"
diagram: attribution-pipeline
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/rest/billing/usage
---

## What you will learn

- You can keep unknown ownership visible and reconcile a report.
- You can distinguish showback from approved chargeback.

## Worked scenario: the unmapped team transfer

**Hypothetical use case:** A developer moves teams but the reporting map is unchanged. The usage total reconciles, yet the wrong unit would receive the charge. Keep the record explicitly **unmapped** until the accountable maintainer resolves ownership and any historical correction. A neat dashboard cannot fix an incorrect mapping.

**Guide advice:** Start with the downloadable AI usage CSV and a controlled spreadsheet or existing reporting tool. [Well-Architected](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) identifies per-user, per-model, per-day usage as the foundation. Check current export fields; retain the period and source.

## Check each handoff

- **Map:** name the assignment maintainer and transfer process. Internal reporting cannot override GitHub's billing-allocation rules.
- **Reconcile:** compare the same period; investigate duplicates, missing users and unexpected totals.
- **Show back:** make usage and cost visible without transferring a charge.
- **Charge back only by agreement:** finance approves allocation, disputes and shared-team treatment.

Restrict identifiable usage to people who need it and follow retention/privacy policies. Do not equate consumption with individual performance.

If automating later, the organization/user **REST billing usage-summary endpoints — <span class="status caution">public preview - use with caution</span>** are explicitly labeled preview in the [REST reference](https://docs.github.com/en/rest/billing/usage). This label is specific to `GET /organizations/{org}/settings/billing/usage/summary` and `GET /users/{username}/settings/billing/usage/summary`, not every billing endpoint. Personal-user endpoints do not include usage billed through an organization or enterprise; select the paying account's reporting scope.
