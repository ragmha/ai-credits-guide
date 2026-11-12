---
title: Sources, status & freshness
section: Reference
order: 9
description: Know which claims are sourced, which features need caution, and when this guide needs another review.
verified: "2026-11-10"
sources:
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents
  - https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/
  - https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/
  - https://docs.github.com/en/billing/how-tos/set-up-budgets
  - https://docs.github.com/en/billing/concepts/budgets-and-alerts
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
  - https://docs.github.com/en/rest/billing/usage
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
  - https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
  - https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/
  - https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/
  - https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/
  - https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/
  - https://learn.github.com/well-architected/
  - https://learn.github.com/well-architected/overview/release-notes
  - https://learn.github.com/well-architected/governance/recommendations/governing-agents
  - https://github.blog/changelog/label/copilot/feed/
  - https://docs.github.com/en/billing/how-tos/products/view-productlicense-use
  - https://docs.github.com/en/billing/reference/billing-reports
  - https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
  - https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage
  - https://docs.github.com/en/billing/tutorials/automate-usage-reporting
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription
  - https://microsoft.github.io/finops-toolkit/hubs
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/
  - https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/csv/
  - https://code.visualstudio.com/docs/agents/guides/monitoring-agents
  - https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights
  - https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion
  - https://grafana.com/grafana/dashboards/25053-github-copilot/
---

## What you will learn

- You can distinguish documented behavior from verified release status.
- You can find the authoritative source for a budget decision.
- You can recognize stale or conflicting evidence.

## Feature-status register

Release status is reviewed separately from behavior. An absent preview warning is not evidence of general availability.

| Capability | Status as reviewed | Evidence and action |
| --- | --- | --- |
| AI credits usage-based billing and included pooling | **Live; rollout confirmed June 1, 2026** | [Transition announcement](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) and [June 1 release](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/); use current [billing docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) for plan and paid-usage behavior |
| Universal and individual ULBs | **Generally available** | [June 1 announcement](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/) explicitly states ULBs are GA; it does not establish the phase of every later enhancement |
| Cost-center ULBs | **Available; status unverified for release phase** | [June 30 announcement](https://github.blog/changelog/2026-06-30-per-user-ai-credit-budgets-available-for-cost-centers/) establishes REST-first availability and precedence, not an explicit GA label; current setup docs describe UI configuration |
| Individual ULB expiration | **Status unverified** for release phase | [Budget docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) describe expiration but do not label its release phase |
| Enterprise, organization, cost-center metered budgets and exclusion | **Status unverified** for release phase | [Budget docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets); validate configuration in the billing entity |
| Cost-center included-usage controls | **Available; status unverified for release phase** | [July 2 announcement](https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/) establishes REST-first availability, not an explicit GA label; separate from metered budgets |
| Budget-increase requests | **Generally available; not available for enterprises with managed users** | [September 16 announcement](https://github.blog/changelog/2026-09-16-copilot-budget-increase-requests-are-generally-available/); Copilot Business and Enterprise under usage-based billing |
| Copilot access through GitHub Enterprise | **Available through account teams; self-serve staged** | [October 28 announcement](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/); GitHub Enterprise Cloud, no included monthly AI credits per seat |
| Copilot Chat, CLI, cloud agent, and Spaces | **Status unverified** by this guide for release phase | Listed as credit-consuming in [billing docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing); no blanket GA assertion |
| Third-party coding agents | <span class="status caution">public preview - use with caution</span> | [Current agent docs](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents) explicitly label preview; costs include Actions minutes and AI credits |
| CLI AI-credit session limits | <span class="status caution">public preview - use with caution</span> | [Session-limit docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit) label preview; soft limits allow an in-progress response to finish |
| REST billing usage-summary endpoints | <span class="status caution">public preview - use with caution</span> | [REST usage reference](https://docs.github.com/en/rest/billing/usage) labels organization and personal-user summary endpoints; do not extend the label to all enterprise or AI-credit report endpoints |
| Enterprise custom roles | <span class="status caution">public preview - use with caution</span> | [AI manager guidance](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) labels preview; its role recipe does not grant Copilot billing access by default |
| GitHub Agentic Workflows | **Generally available** | [October 28, 2026 announcement](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/); default Copilot CLI engine needs a Copilot license |
| Spark | **Retired; source conflict recorded** | Billing docs still list it, but the [official retirement announcement](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/) says retirement after August 31, 2026; not an onboarding recommendation |
| Copilot usage metrics | **Generally available** | Reviewed **2026-11-12**: [February 27 GA announcement](https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/); reconciliation docs have no phase label |
| Enterprise AI-credit REST and enterprise usage-summary endpoints | **Status unverified** for release phase | Reviewed **2026-11-12**: [enterprise reference](https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage) documents them without a preview notice; not a GA inference |
| Azure-side AI-credit detail | **Status unverified** | Reviewed **2026-11-12**: [Azure billing](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing) lists Copilot active seats, not per-user/model AI credits |
| FinOps hubs GitHub AI-credit connector | **Not established by reviewed sources** | Reviewed **2026-11-12**: [hubs](https://microsoft.github.io/finops-toolkit/hubs) documents bring-your-own-data extensibility, not this connector; custom import is guide advice |
| Infinity data source and catalog Copilot dashboard | **Status unverified** for release phase | Reviewed **2026-11-12**: [plugin documentation](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/) and [dashboard 25053](https://grafana.com/grafana/dashboards/25053-github-copilot/) document capabilities and prerequisites, not a GA claim |
| VS Code client OpenTelemetry | **Status unverified** for release phase | Reviewed **2026-11-12**: [monitoring guide](https://code.visualstudio.com/docs/agents/guides/monitoring-agents) has no preview/GA label; Local harness is deprecated, removal planned February 2027 |
| Azure Monitor OTLP Collector ingestion | <span class="status caution">public preview - use with caution</span> | Reviewed **2026-11-12**: [Grafana guide](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights) labels the [related ingestion article](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion) "(Preview)"; the linked article itself has no visible preview label; tension retained |

## Visualisation sources reviewed 2026-11-12

The dates below apply to these source checks, not a fresh review of every older claim in this register. Existing page and source dates remain unchanged. Documentation establishes the stated capability; an absent phase label does not establish GA.

| Source | Reviewed | Checked evidence |
| --- | --- | --- |
| [Built-in usage views](https://docs.github.com/en/billing/how-tos/products/view-productlicense-use) | 2026-11-12 | "Organization owners cannot view user-level data directly"; use a report. AI usage, chart download, user-filter roles and 24-hour emailed link |
| [Billing reports](https://docs.github.com/en/billing/reference/billing-reports) | 2026-11-12 | Summarized maximum one year; detailed and AI maximum 31 days; detailed web-only; documented snake_case columns and token breakdown |
| [Cost centers at scale](https://docs.github.com/en/enterprise-cloud@latest/billing/tutorials/control-costs-at-scale) | 2026-11-12 | Reports use `cost_center_name`; usage charts can be filtered by cost center |
| [Metrics reconciliation](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) | 2026-11-12 | "28-day rolling window" versus daily records; IDE telemetry gaps; organization totals must not be added into an enterprise total |
| [Metrics GA announcement](https://github.blog/changelog/2026-02-27-copilot-metrics-is-now-generally-available/) | 2026-11-12 | "GitHub Copilot usage metrics is now generally available" |
| [Metrics REST policy](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) | 2026-11-12 | Policy must be "Enabled everywhere" for the enterprise to enable the endpoints |
| [Enterprise billing REST](https://docs.github.com/en/enterprise-cloud@latest/rest/billing/usage) | 2026-11-12 | AI-credit route, filters, `usageItems`, 24-month access, role/token wording; response examples do not establish `costCenter` |
| [Organization/user billing REST](https://docs.github.com/en/rest/billing/usage) | 2026-11-12 | Organization AI-credit route/filter differences; organization and personal-user summary preview notices are endpoint-specific |
| [Automate usage reporting](https://docs.github.com/en/billing/tutorials/automate-usage-reporting) | 2026-11-12 | Classic-PAT instruction and statement that fine-grained PATs are unsupported; authentication tension below |
| [Azure billing](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing) | 2026-11-12 | Connected billing, daily transmission, next-month invoice; Copilot metric "Number of active seats" |
| [Azure subscription reference](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription) | 2026-11-12 | Product-family lines, SKU and internal enterprise/cost-center IDs, MACC eligibility and different subscriptions per center |
| [FinOps hubs](https://microsoft.github.io/finops-toolkit/hubs) | 2026-11-12 | "Bring your own data", FOCUS and Azure-hosted analytics; deployment/running costs; no documented GitHub AI-credit connector on the reviewed page |
| [Infinity overview](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/) | 2026-11-12 | Generic REST/JSON/CSV plugin; Grafana 11.6+; not for large data, inline snippets under 1 MB |
| [Infinity query sources](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/) | 2026-11-12 | URL fetches an HTTP endpoint; inline and other sources are distinct, not a documented local-file picker |
| [Infinity CSV](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/csv/) | 2026-11-12 | "By default, all columns are returned as strings"; explicitly configure numeric/timestamp fields |
| [VS Code monitoring](https://code.visualstudio.com/docs/agents/guides/monitoring-agents) | 2026-11-12 | Traces/metrics/events, token signals, local Aspire/Jaeger, CLI independent roots and HTTP exporter; content capture default false and sensitive when enabled |
| [Grafana with Application Insights](https://learn.microsoft.com/en-us/azure/managed-grafana/grafana-opentelemetry-app-insights) | 2026-11-12 | Collector → Azure Monitor exporter → Application Insights → Grafana; community-supported collector/exporter; related ingestion link labelled "(Preview)" |
| [Native OTLP ingestion](https://learn.microsoft.com/en-us/azure/azure-monitor/containers/opentelemetry-protocol-ingestion) | 2026-11-12 | DCR/DCE-based path differs from exporter/connection-string configuration; no visible phase label on the reviewed page itself |
| [Grafana Copilot dashboard 25053](https://grafana.com/grafana/dashboards/25053-github-copilot/) | 2026-11-12 | "Grafana 11.6+ with the Azure Monitor data source"; requires Application Insights telemetry, not a local billing import |

## Visualisation source tensions (reviewed 2026-11-12)

**Authentication:** The automation tutorial says to use a classic PAT and says billing usage endpoints do not support fine-grained PATs. The enterprise AI-credit REST reference also permits GitHub App installation access with enterprise billing read access and describes custom-role holders. Organization endpoint token listings differ again. These sources do not reconcile their coverage. Preserve the difference and verify the specific endpoint and account permissions before choosing a collector credential; this guide does not resolve it.

**Cost-center schema:** CSV documents `cost_center_name`. The reviewed enterprise AI-credit REST examples do not establish `costCenter {id, name}`, although an enterprise `cost_center_id` request filter is documented. Organization AI-credit filters do not list that filter. Do not invent response fields or copy filters between scopes.

**Preview wording:** Microsoft's Grafana article labels its related ingestion link "(Preview)", while the linked page itself has no visible preview notice in the reviewed text. Retain the caution for that path rather than silently promoting it to GA. Do not merge the native OTLP/DCR/DCE setup with the exporter/connection-string setup.

**Examples and privacy:** VS Code says content capture defaults off, yet some Aspire and Microsoft Grafana examples set it to true. The guide deliberately recommends leaving it off unless policy allows capture. The dashboard catalog's token-efficiency section does not establish a GitHub billing metric, even when its heading mentions cost.

## Source map

**Product behavior:** [Billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) and [budgets](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) are the sources for pools, reset timing, enforcement, and precedence. [Budget setup](https://docs.github.com/en/billing/how-tos/set-up-budgets) is the administrative procedure.

**Cross-product coverage:** [Budgets and alerts](https://docs.github.com/en/billing/concepts/budgets-and-alerts) and budget setup distinguish bundled AI-credit limits from SKU-level limits, including Code Security AI Credits. A shared hard budget can affect multiple products.

**Architecture and operating recommendations:** [GitHub Well-Architected](https://learn.github.com/well-architected/) and its [AI credits recommendation](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) underpin the maturity path, attribution-first design, usage guidance, and operating cadence. The [governing-agents cost checklist](https://learn.github.com/well-architected/governance/recommendations/governing-agents#5-cost-management) adds agent-cost alerting, model education, and usage tracking.

**Release phase and retirement:** Explicit GitHub documentation labels and dated changelog announcements establish status. Do not use old preview announcements to override later GA or retirement evidence.

**Preview adoption:** GitHub's [release-stage definitions](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models#considering-different-release-stages), [preview opt-in policy](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies#opting-in-to-previews-or-feedback), and [pre-release license terms](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms) back the caution tags. Check applicable terms and non-production restrictions; enabling a policy is not production-use approval.

**Change discovery:** Watch [Well-Architected release notes](https://learn.github.com/well-architected/overview/release-notes) and the official [Copilot changelog feed](https://github.blog/changelog/label/copilot/feed/). They identify articles to re-read, not proof that existing guide claims remain current.

## Known source tensions

**Hard stops:** Budget docs recommend enabling hard stops to enforce limits; Well-Architected recommends keeping the enterprise hard stop disabled for continuity. [This guide exposes the decision](/controls/#strict-cap-or-continuity) rather than silently choosing one for every customer.

**Metered routing and enterprise aggregation:** Read the documented routing order together with enterprise inclusion/exclusion and the independent-control headroom rule. A cost-center route is not an unconditional bypass of the enterprise cap.

**Spark:** A billing list is not proof of product availability. The retirement announcement takes precedence for onboarding; this conflict should remain visible until the official sources are reconciled.

## How freshness is maintained

Each page records a source-review date and links. **Current maintenance is manual:** repository maintainer **@ragmha** is assigned a weekly review on **Mondays at 07:37 UTC**, with the next planned review on **2026-11-16**. This assignment does not mean a review has already happened.

The reviewer reads complete sources and checks material claims, release labels, self-check answers and diagram text. Actual findings and evidence belong in a review PR and the repository's source observation ledger; inaccessible sources and unresolved conflicts belong in `[freshness]` issues. The ledger is not prepopulated without actual reviewed source observations. See the [manual-review process](https://github.com/ragmha/ai-credits-guide/blob/main/docs/freshness-setup.md#current-maintenance-manual-review).

Dates advance only after relevant claims and release labels have actually been rechecked, not just because a URL returns successfully. A failed check is not a clean bill of health. After 30 days, the next site build displays an overdue review notice; a static deployed site needs a rebuild for that build-time notice to change.

**Automation is a future option, not current freshness coverage.** No successful hosted freshness review has been recorded. The checked-in GitHub Agentic Workflow stays disabled until a maintainer configures its credential and explicitly activates it. A successful hosted review must then be demonstrated before claiming automatic freshness coverage. When enabled, it proposes changes for human review or raises an issue when sources conflict; it never auto-merges. Static-site deployment is separate and needs no model credential. See the [repository setup instructions](https://github.com/ragmha/ai-credits-guide#readme) and [GitHub Agentic Workflows documentation](https://github.github.com/gh-aw/).

## A few useful definitions

| Term | In this guide |
| --- | --- |
| Included pool | Shared monthly AI credits contributed by eligible assigned licenses |
| Metered usage | Usage that generates additional charges; starts immediately on a plan without an included pool |
| ULB | Per-user consumption hard cap, including included usage |
| Showback | Visibility of usage and costs without internal charging |
| Chargeback | An agreed financial allocation process |
| Forecast | An estimate, not enforcement or purchase authority |
| Exclusion | A configured separation from enterprise budget aggregation, not free usage |
