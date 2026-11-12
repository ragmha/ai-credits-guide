---
title: Decide whether Azure cost tools fit
section: How to visualise
order: 404
description: Use Azure cost analysis only where the GitHub billing arrangement supports it, without inventing AI-credit detail.
verified: "2026-11-12"
diagram: visualisation-map
checks:
  - question: Does connecting agent telemetry to Application Insights prove that GitHub charges are billed through Azure?
    answer: No. Telemetry routing and billing routing are separate. Azure cost guidance applies when GitHub billing is connected to an Azure subscription.
  - question: Do the reviewed Azure billing pages prove per-user and per-model AI-credit visibility in Azure?
    answer: No. Azure-side AI-credit detail is Status unverified. Check your own Azure view and use GitHub's AI usage report for documented per-user and model detail.
  - question: Does the reviewed FinOps hubs page document a ready-made GitHub AI-credit connector?
    answer: No. It documents bring-your-own-data extensibility. A GitHub import is custom work and guide advice, with deployment and running costs to assess.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing
  - https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription
  - https://microsoft.github.io/finops-toolkit/hubs
  - https://docs.github.com/en/billing/reference/billing-reports
---

## What you will learn

- Answer "Azure FinOps?" conditionally instead of promising a connector or dashboard.
- Recognize Azure invoice aggregation and mapping boundaries.
- Keep GitHub's per-user/model evidence when Azure detail is unverified.

## Read the picture

Stay on the billing row when the question is financial. Azure belongs in that path **only if GitHub usage is billed through a connected Azure subscription**. The client-telemetry row is independent: sending observations to Application Insights does not connect the account's billing to Azure.

## Establish the billing connection first

GitHub documents connecting an Azure subscription so charges for GitHub products are billed through Azure instead of directly through GitHub. Usage is transmitted **daily**, and the month's charges appear on the **Azure invoice at the start of the next month**. This is not a promise of an immediately complete live view.

The reviewed [Azure billing page](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-billing) lists Copilot's transmitted usage metric as **"Number of active seats."** It does not describe per-user or per-model AI-credit consumption. **Azure-side AI-credit detail: Status unverified.** Inspect the enterprise's actual Azure view rather than assuming it matches GitHub's AI usage report.

GitHub's [subscription reference](https://docs.github.com/en/enterprise-cloud@latest/billing/reference/azure-subscription) describes invoice lines summarized by product family and usage separated by SKU and enterprise ID or cost-center ID. Azure shows internal IDs, which can be difficult to map. GitHub products on the Azure invoice are MACC-eligible, but that does not establish a more detailed consumption schema.

## Worked example: two subscriptions, one enterprise

**Hypothetical arrangement:** An enterprise connects its central Azure subscription, while one cost center connects a different subscription. GitHub supports connecting different cost centers to different Azure subscriptions. The analyst first identifies which subscription pays for the scope being investigated.

They then match the enterprise or cost-center internal ID and SKU in Azure to their maintained ownership map. They check the reporting period and allow for the documented daily transmission and next-month invoice timing. They do not expect an Azure line to identify a particular person's model use.

When finance asks which users or models drove AI-credit consumption, the analyst returns to GitHub's AI usage report. The Azure view answers the billing-route question; GitHub's report provides the documented per-user/model breakdown. These are complementary views, not interchangeable row sets.

## Where FinOps hubs might help

[FinOps hubs](https://microsoft.github.io/finops-toolkit/hubs) is Azure-hosted cost analytics using FOCUS, with Fabric, Data Explorer and Power BI reporting, multi-subscription/cloud aggregation and **"Bring your own data"** extensibility. It has deployment and ongoing running costs.

The reviewed page documents **no GitHub-specific AI-credit connector**. **Guide advice:** treat a GitHub import as custom integration work. Before building it, define the source, transformation, ownership mapping, refresh interval and reconciliation to GitHub billing. For one analyst with a small export, a controlled spreadsheet may answer the question without another platform.
