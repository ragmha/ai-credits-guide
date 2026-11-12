---
title: Summary
section: How to visualise
order: 406
description: Match every chart to its source, account scope, time window and question before sharing it.
verified: "2026-11-12"
sources:
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing
  - https://code.visualstudio.com/docs/agents/guides/monitoring-agents
---

This part started with the question rather than the dashboard product. GitHub's billing views and reports provide consumption and spending evidence. Copilot metrics describe adoption and activity. Client telemetry helps explain observed agent behavior. Similar labels such as "usage" do not make those datasets comparable.

Built-in insights are often enough for an investigation. When a repeated question needs another view, preserve the export's account, period, grain and retrieval metadata before transforming it in a spreadsheet, BI tool or local Grafana dashboard. A neat chart does not resolve an ownership error, an overlapping extract or a missing reporting period.

Azure cost tooling is conditional on the billing connection. Its reviewed documentation does not establish per-user/model AI-credit detail. Local telemetry and Application Insights are independent diagnostic paths, not alternative sources of billed charges.

## Key Takeaways

- Start with billing for spend, metrics for adoption and instrumented telemetry for behavior.
- Match definitions and time windows: adoption dashboards roll over 28 days; APIs provide daily metrics records.
- Keep export limits visible: 24 months for the AI-credit REST API, one year for summarized reports, 31 days for detailed and AI reports, and 24 hours for emailed links.
- Treat Azure AI-credit detail as unverified until checked in the enterprise's actual view.
- Label custom imports and derived chart calculations as guide advice, not product features.
- Keep credentials and sensitive content out of dashboards; approve access before sharing.

You can now select a view, explain what it measures and identify what it cannot prove. Use the Sources appendix to revisit endpoint status and documented differences before implementing an integration.
