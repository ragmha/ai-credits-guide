---
title: Build a spreadsheet or BI view from exports
section: How to visualise
order: 403
description: Preserve report grain, account scope and provenance before calculating or publishing a chart.
verified: "2026-11-12"
diagram: attribution-pipeline
checks:
  - question: Can you fetch a detailed usage report through the generic REST usage endpoint?
    answer: No. The detailed report is web-UI only and has a 31-day maximum. The AI-credit REST endpoint is a separate interface with its own fields and a 24-month history window.
  - question: An enterprise AI-credit extract is filtered by cost_center_id. Can a dashboard assume every response contains a costCenter.name field?
    answer: No. The reviewed REST response examples do not establish that field. Preserve the query scope as extract metadata and verify the actual response; CSV reports document cost_center_name.
  - question: Can a spreadsheet add the same enterprise and organization usage extracts together to create a larger total?
    answer: Not safely. Choose a defined account scope and period and avoid counting overlapping records twice. Reconcile one authoritative reporting scope before publishing.
sources:
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://docs.github.com/en/rest/billing/usage
  - https://docs.github.com/en/billing/tutorials/automate-usage-reporting
  - https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale
---

## What you will learn

- Build a useful view with an existing spreadsheet or BI tool before adding infrastructure.
- Keep CSV columns distinct from REST response fields.
- Define calculations and preserve enough evidence to reproduce them.

## Read the pipeline

The figure's mapping and reconciliation stages happen before a chart is published. A report can have a correct grand total and still assign it to the wrong cost owner. An export-based view therefore needs the original period, paying account, source and ownership treatment, not just a visualization.

## Start with one CSV

The AI usage report gives a per-user breakdown grouped by `date`, `model` and `username`. Reports document `quantity`, `unit_type`, `gross_amount`, `discount_amount`, `net_amount` and, where applicable, `cost_center_name`. Token columns use `input`, `output`, `cache_read` and `cache_write`.

**Guide advice:** retain the source file unchanged and build a separate working table. Parse dates consistently, convert numeric columns deliberately and keep unresolved ownership visible. Choose a report type and a supported window: summarized reports cover at most one year; detailed and AI usage reports cover at most 31 days. The detailed report is not obtainable through the generic REST `/usage` endpoint.

## Move to REST when repeated exports justify it

The enterprise AI-credit route is `GET /enterprises/{enterprise}/settings/billing/ai_credit/usage`. Its documented filters include `year`, `month`, `day`, `organization`, `user`, `model`, `product` and `cost_center_id`. For the last filter, **`none` targets usage without a cost center**. Only the **past 24 months** are accessible.

The organization equivalent is `GET /organizations/{org}/settings/billing/ai_credit/usage`. Its reference lists `year`, `month`, `day`, `user`, `model` and `product`; do not copy enterprise-only filters into an organization request.

The REST examples return `usageItems` containing `product`, `sku`, `model`, `unitType`, `pricePerUnit`, `grossQuantity`, `grossAmount`, `discountQuantity`, `discountAmount`, `netQuantity` and `netAmount`. CSV uses snake_case names such as `net_amount`; REST uses camelCase names such as `netAmount`. An adapter must map them explicitly.

Alongside `usageItems`, the enterprise AI-credit example response has top-level `timePeriod` (showing only `year` in the example) and `enterprise`.

The reviewed response examples do **not** establish a `costCenter` object with `id` and `name`. Preserve a selected cost-center ID and request date filters as **local extract metadata**, rather than assuming they are response columns. A CSV's documented `cost_center_name` is a different field.

The organization **REST billing usage-summary endpoints — <span class="status caution">public preview - use with caution</span>** are separate from the AI-credit route above. The enterprise summary reference has no equivalent preview notice; its release phase is **Status unverified**, not inferred GA. The tutorial and endpoint reference also differ on supported authentication; see the [recorded source tension](/sources/#visualisation-source-tensions-reviewed-2026-11-12) before implementing a collector.

## Worked example: a reproducible weekly model view

**Hypothetical reporting exercise:** An analyst needs a weekly view of consumption by model and charges by cost owner. They select one paying account and the same seven UTC dates in an AI usage CSV. They preserve that file, its retrieval time and the chosen scope, then create a pivot grouped by model and a separate cost-owner view.

Define the charts before presenting them. **Guide calculations:** consumption by model is `sum(quantity)` grouped by `model` **and `unit_type`**; net charges by owner is `sum(net_amount)` grouped by `cost_center_name` for the same scope and dates. The report defines `net_amount = gross_amount - discount_amount`. Do not sum unlike units or mix quantity with money.

The analyst reconciles the totals back to the source before sharing. They do not add an overlapping enterprise extract and organization extract as if those were separate charges. If they later switch to daily REST extracts, they retain the request dates as local metadata rather than inventing a response `date` column.

**Guide advice:** keep the billing credential outside spreadsheets, dashboard definitions and repositories. Billing exports contain usernames and costs; restrict access and retention. A refresh timestamp is local reporting metadata, not a product guarantee of real-time completeness.
