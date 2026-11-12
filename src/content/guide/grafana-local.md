---
title: Design a local Grafana view
section: How to visualise
order: 405
description: Separate an export-based spending dashboard from an instrumented-client diagnostic view.
verified: "2026-11-12"
diagram: grafana-dashboard
checks:
  - question: A local agent trace records token usage. Is that the amount GitHub billed?
    answer: No. It is an observation from an instrumented client, not a billed charge or complete coverage of Copilot. Reconcile spending to GitHub billing.
  - question: Infinity reads a billing CSV, but numeric totals are not behaving as numbers. What should the analyst check?
    answer: CSV columns are returned as strings by default. Configure numeric and timestamp formats deliberately and reconcile the transformed result to the original export.
  - question: Should a dashboard example's captureContent setting be copied as true by default?
    answer: No. Content capture can include prompts, responses, code and tool arguments. Leave it off unless policy explicitly allows it and the environment is trusted.
sources:
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/csv/
  - https://code.visualstudio.com/docs/agents/guides/monitoring-agents
  - https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights
  - https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion
  - https://grafana.com/grafana/dashboards/25053-github-copilot/
---

## What you will learn

- Design a small billing dashboard without presenting mock values as evidence.
- Distinguish a generic export integration from a telemetry dashboard.
- Protect billing credentials, report identities and captured content.

## Read the wireframe

The figure is a **starter design, not a running dashboard**. Each panel names a source field and the question it answers. There are no invented trends, values or customer records. Its refresh timestamp is local extract metadata. A separate diagnostic view handles client telemetry.

## Job 1: spending and attribution from billing

**Guide advice, not an official GitHub integration:** schedule an authorized AI usage CSV or AI-credit REST export outside Grafana, preserve its period and account scope, then expose a restricted reporting extract through a generic data source.

Grafana's [Infinity plugin](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/) can query REST endpoints and formats including JSON and CSV. Its CSV documentation supports a URL or inline data; it does not establish a direct local-file source. A local export therefore needs a deliberately served HTTP endpoint or an appropriate inline import, not an assumed filesystem picker. Infinity requires Grafana 11.6 or later and is not designed for large datasets; inline snippets should be under 1 MB.

Start with headers, then configure field types. CSV columns are **strings by default**; select Number or Timestamp formats where appropriate. Protect the extract's endpoint as well as the dashboard.

| Starter panel | Source | Defined calculation and question |
| --- | --- | --- |
| Consumption by model | AI CSV `model`, `unit_type`, `quantity` | Guide calculation: sum `quantity` by model and unit; which models drive reported consumption? |
| Net charges by owner | CSV `cost_center_name`, `net_amount` | Guide calculation: sum `net_amount` by owner for one account/period; where are charges attributed? |
| Unassigned usage | Enterprise REST query `cost_center_id=none` | Inspect that filtered scope; what needs ownership review? Do not assume a `costCenter.name` response field |
| Export freshness | Local `fetched_at` metadata | Guide calculation: current time minus retrieval time; how old is this extract? This is not billing-data completeness |

## Worked example: an analyst's weekly view

**Hypothetical setup:** One analyst already has a reviewed weekly AI usage CSV. They keep the raw file restricted, publish an appropriately scoped extract to their local reporting endpoint and configure Infinity to read it. They set numeric types, choose the same period as the source, build the first two panels and compare both totals with the CSV.

If investigating unassigned usage, they obtain a separately scoped enterprise extract using `cost_center_id=none` and label that panel's scope. They do not add it again to a total that already includes it. They record retrieval time locally and show it without claiming the data is real-time.

The GitHub billing credential remains in the export process, **outside dashboards and repositories**. Billing exports contain usernames and costs. **Guide advice:** a local dashboard is a one-analyst starting point; a shared deployment needs access control, restricted data and retention decisions.

## Job 2: agent behavior from client telemetry

The [VS Code monitoring guide](https://code.visualstudio.com/docs/agents/guides/monitoring-agents) documents Copilot Chat exporting OpenTelemetry traces, metrics and events, including token usage. It describes local **Aspire Dashboard** and **Jaeger**, Application Insights and other OTLP backends. These are observations of instrumented clients, **not charges and not every Copilot surface**.

For example, `gen_ai.client.token.usage` reports tokens, `gen_ai.client.operation.duration` measures duration in seconds, and `copilot_chat.tool.call.count` reports tool calls. Use them to investigate behavior, not to manufacture a billing amount. Copilot CLI sessions launched in the terminal emit independent root traces under `github-copilot`; the documented CLI runtime supports `otlp-http`, not every exporter mode.

The [Microsoft Grafana guide](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights) describes **Collector → Azure Monitor exporter → Application Insights → Grafana**, with the Azure Monitor data source. The Collector and exporter are community-supported components; Azure service support is a different boundary. The [catalog dashboard 25053](https://grafana.com/grafana/dashboards/25053-github-copilot/) requires Grafana 11.6+ and Application Insights telemetry through Azure Monitor. It is not a turnkey local GitHub billing dashboard.

**Azure Monitor OTLP Collector ingestion — <span class="status caution">public preview - use with caution</span>:** Microsoft's Grafana guide labels the [related ingestion article](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion) "(Preview)", while that article itself shows no preview label in the reviewed text. Keep the caution and check the [source tension](/sources/#visualisation-source-tensions-reviewed-2026-11-12). Its native OTLP ingestion setup is not the same configuration as the exporter/connection-string route above.

## Keep content capture off unless approved

The VS Code guide says no prompts, responses or tool arguments are captured by default. `github.copilot.chat.otel.captureContent` defaults to `false`; enabling it can include sensitive content. Some published examples turn it on. **Guide advice:** do not copy that setting unless policy permits it and the environment is trusted.

The same guide marks the Local harness deprecated, with removal planned for February 2027. Follow current harness-specific instructions rather than assuming one configuration covers every session. Its telemetry feature's overall release phase is **Status unverified** in the reviewed page; documentation alone is not a GA claim.
