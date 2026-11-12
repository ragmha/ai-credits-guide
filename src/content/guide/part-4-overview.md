---
title: Overview
section: How to visualise
order: 401
description: Choose billing, adoption or client telemetry according to the question your view must answer.
verified: "2026-11-12"
diagram: visualisation-map
sources:
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://code.visualstudio.com/docs/agents/guides/monitoring-agents
---

A useful dashboard starts with a question, not a tool. To explain spending, use GitHub billing data. To understand adoption and activity, use Copilot usage metrics. To diagnose an agent interaction, use telemetry from the clients you instrumented. Putting all three on one screen does not make them interchangeable.

## What you will learn

- Use GitHub's built-in views before building another reporting pipeline.
- Turn CSV or REST billing data into a reconciled spreadsheet, BI report or local Grafana view.
- Decide whether Azure cost tools are relevant to your billing arrangement.
- Keep diagnostic telemetry separate from the financial figure.

## Read the picture

Follow one row from source to view to question. The billing row can feed GitHub, BI or local Grafana, but the tool does not change the meaning of the underlying records. The adoption row answers who is using Copilot. The client-telemetry row helps explain token use, latency and tool execution only where instrumentation observed them.

For example, "Which model drove this month's charges?" needs billing evidence. "Why was this particular agent slow?" needs traces or performance metrics. A token histogram cannot answer the first question, and an invoice cannot explain the second.

The chapters below start with built-in insights, then cover export-based reporting, conditional Azure cost analysis and a local Grafana design. No dashboard service is installed by this course.
