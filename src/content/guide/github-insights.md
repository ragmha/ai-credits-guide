---
title: Use GitHub's built-in insights
section: How to visualise
order: 402
description: Find consumption and attribution in billing, then use adoption metrics without confusing activity with spend.
verified: "2026-11-12"
diagram: visualisation-map
checks:
  - question: An organization owner needs per-user AI-credit consumption but cannot filter the AI usage view by user. What should they do?
    answer: Download an AI usage report. Enterprise owners and billing managers can filter the view by user; organization owners cannot see user-level data directly in that view.
  - question: Can a 28-day rolling adoption total explain the charges on a monthly bill?
    answer: No. Adoption and billing measure different things and use different windows. Use billing evidence for charges and compare adoption only with matching metric definitions and periods.
  - question: A usage-report download link no longer works after a day. Does that mean its usage records were deleted?
    answer: No. The emailed link expires after 24 hours. Request another report rather than treating an expired link as missing consumption.
sources:
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
---

## What you will learn

- Choose the billing view or report that matches a consumption question.
- Recognize permission and report-window limits.
- Explain why adoption metrics do not reconcile to a financial total.

## Read the picture

The first two rows are different views of the enterprise. **Billing** explains credit consumption and charges. **Copilot usage metrics** describe adoption and activity. Their users, windows and definitions can differ. A chart that says "usage" is not automatically a spending chart.

## Start in Billing & Licensing

GitHub provides a **Metered usage** page and, when an account uses AI credits, an additional **AI usage** view. The [viewing guide](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use) identifies questions the AI view answers: total credit consumption, heavy consumers, models driving spend and adoption by organization.

Use the view's filters, grouping and time frame deliberately. Usage charts can be filtered by cost center. **Enterprise owners and billing managers can filter AI usage by user. Organization owners cannot view user-level data directly in this view; they must download a usage report for per-user consumption.** Do not interpret that UI restriction as a description of every REST endpoint's permissions.

To obtain a report, choose **Get usage report**, specify the report details and select **Email me the report**. The download link sent to the primary email address **expires after 24 hours**. Chart options also let you download the plotted data.

## Choose the report before the period

The [billing reports reference](https://docs.github.com/en/billing/reference/billing-reports) distinguishes these exports:

| Report | Maximum period | Use it for |
| --- | --- | --- |
| Summarized usage | One year | Product/SKU totals and cost-center reporting |
| Detailed usage | 31 days | Additional user and workflow detail across paid products; available through the web UI, not the REST `/usage` endpoint |
| AI usage | 31 days | Per-user AI credits grouped by date, model and username, with token breakdown |

Reports use fields such as `date`, `quantity`, `unit_type`, `gross_amount`, `discount_amount` and `net_amount`. The AI report includes `model`, `input`, `output`, `cache_read` and `cache_write`; its description groups consumption by `date`, `model` and `username`. `cost_center_name` identifies the associated cost center where applicable. These are documented field names, not a guarantee of CSV column order.

## Worked example: explain a model-driven increase

**Hypothetical investigation:** An organization owner is asked why AI-credit consumption rose during a pilot. First, they set the billing period and group the AI usage view by model. The chart identifies where to investigate; it does not establish that a particular developer caused the increase.

Because this owner cannot directly filter that view by user, they request an AI usage report for the same period, within its 31-day limit. They inspect `date`, `model` and `username`, retaining token breakdown where relevant. If the emailed link expires before review, they request a new report. A cost-center filter or `cost_center_name` helps connect the finding to the accountable owner.

The result is a consumption explanation for that reporting scope and period. Deciding whether the workload justified its consumption still requires context and an owner; high usage alone is not a performance judgment.

## Use adoption metrics for a different question

Copilot usage metrics became **generally available on February 27, 2026**, according to the [release announcement](https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/). The [reconciliation documentation](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) explains a **28-day rolling dashboard** versus **daily API records**. Detailed IDE activity depends on IDE telemetry; disabling it removes that activity from dashboards, API reports and exports, even when server-side activity still counts the user as active.

For the pilot, a rolling adoption chart can help answer whether people are engaging with Copilot. It cannot replace the billing report used above. Nor should organization-level adoption totals be added to create an enterprise total: the documentation says users may be attributed to every organization they belong to. Compare like definitions, account scopes and time windows, not similarly named numbers.

The [metrics REST reference](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) says the **Copilot usage metrics** policy must be set to **Enabled everywhere** for the enterprise to enable its endpoints. This is a metrics-access requirement, not spending permission. The reconciliation page itself has no GA or preview label; the dated changelog is the evidence for the GA statement above.
