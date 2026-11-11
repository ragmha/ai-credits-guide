---
title: Understand AI credits
section: The billing model
order: 2
description: Separate the shared allowance, individual consumption, and additional charges before choosing a budget.
verified: "2026-11-10"
diagram: credit-lifecycle
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents
---

## What you will learn

- You can explain how an included pool becomes metered spending.
- You can identify what a user-level budget measures.
- You can avoid treating a spending limit as a cap on license fees.

## One billing unit, different kinds of cost

GitHub AI Credits are the billing unit for metered Copilot usage. Input, output, and cached tokens are priced by model and converted into credits. The current [billing documentation](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing#what-are-github-ai-credits) states **1 AI credit = $0.01 USD**. Budgets are configured in US dollars; consumption is displayed in AI credits.

Copilot Chat, Copilot CLI, Copilot cloud agent, and Copilot Spaces consume AI credits. See the [status register](/sources/) before adopting capabilities whose release phase is not established by that source. Inline code completions and next edit suggestions do not consume AI credits and remain available at an enforced credit limit.

**Third-party coding agents — <span class="status caution">public preview - use with caution</span>** consume AI credits and GitHub Actions minutes, which are separate meters. Include both in a workload estimate; an AI credits budget is not an Actions spending limit. See [official agent documentation](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents).

## Included first, metered second

For Copilot Business and Copilot Enterprise, assigned licenses contribute to a **shared pool at the billing entity level**, not a guaranteed private allocation per user. Usage draws from the pool first.

| Plan | Included credits per assigned license per month |
| --- | --- |
| Copilot Business | 1,900 |
| Copilot Enterprise | 3,900 |

These are source-verified amounts as of the page's review date, not contractual promises. [Check current allowances](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing#included-credits-for-copilot-business-and-copilot-enterprise) before forecasting or quoting.

When the pool is exhausted, additional usage is metered if the **AI credits paid usage** policy permits it and applicable enforced limits allow the request. Additional usage is enabled by default for these plans; explicitly disable the policy if no overage is authorized. Do not assume a newly assigned license means paid usage is disabled.

**Copilot access has no included allowance.** Its AI credit-consuming usage is metered from first use, and paid usage must be enabled for those features to work.

## The reset is not your invoice date

Included credits reset at **00:00:00 UTC on the first day of each calendar month** and do not roll over. Adding licenses increases the pool immediately; removing licenses reduces it at the next billing cycle. Do not treat unused credits as a balance to carry forward.

## Three numbers that must not be confused

| Number | Meaning | What it does not do |
| --- | --- | --- |
| Forecast | An estimate based on usage, workforce, and workload changes | It does not enforce anything |
| Consumption or spending cap | A configured product control, with enforcement semantics | It is not procurement approval |
| Purchase authorization | Your organization's approval to incur charges | It does not configure GitHub |

Enterprise metered budgets do **not** cap license fees. Include licenses, metered overage, and separate service meters in your financial view.

## Read the lifecycle diagram

The diagram below separates the included and metered phases. A user-level budget can stop a request in either phase. The picture is conceptual: use [the control evaluation detail](/controls/#what-gets-checked-first) for request-level rules, included-usage controls, and exclusions.
