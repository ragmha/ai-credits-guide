---
title: Attribute before you optimize
section: Day-two operations
order: 7
description: Connect usage to a responsible owner before you restrict models, change limits, or introduce chargeback.
verified: "2026-11-10"
diagram: attribution-pipeline
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- You can build a minimal reporting pipeline using existing tools.
- You can separate showback from chargeback.
- You can identify mapping gaps before making budget decisions.

## Start with the usage report

Well-Architected identifies the downloadable AI usage CSV report, including per-user, per-model, per-day breakdowns, as the foundation for attribution. Check the actual export's current fields before building a transformation; this guide does not invent an API schema.

**Guide advice:** Start with a controlled spreadsheet or an existing reporting tool. Retain the reporting period and source export. Join users to the business unit or cost center responsible for the spend. Keep an explicit "unmapped" category instead of silently assigning missing records to a convenient team.

## Make the mapping accountable

Agree who maintains identity-to-cost-center assignments, how transfers are handled, and when historical reporting is restated. GitHub's assignment and allocation rules determine billing attribution; your internal reporting rules must not pretend to override them.

Reconcile totals to the source export before presenting unit-level numbers. Investigate duplicate assignments, missing users, and unexpected allocation. Do not compare two reports from different periods as if they were the same snapshot.

## Showback first, chargeback by agreement

**Showback** makes consumption and cost visible to the responsible business unit without transferring a charge. **Chargeback** uses an agreed financial process to allocate charges. The Well-Architected maturity path introduces showback in Start and chargeback, where appropriate, in Adopt.

Before chargeback, finance should approve which costs are allocated, the allocation basis, disputed-record handling, and the treatment of shared platform teams. A chart is not a financial ledger.

## Keep the reporting proportionate

Limit access to identifiable usage to people who need it. Follow your enterprise's retention, privacy, and employee-monitoring policies. Use aggregated team views for general distribution. Do not equate token consumption with individual performance.

## Read the attribution pipeline

The diagram below traces the smallest useful path: source usage, mapping, reconciliation, and an owned decision. Add a warehouse or scheduled API integration only when the existing process no longer meets a measured need.
