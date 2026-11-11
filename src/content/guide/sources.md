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
---

## What you will learn

- You can distinguish documented behavior from verified release status.
- You can find the authoritative source for a budget decision.
- You can recognize stale or conflicting evidence.

## Feature-status register

Release status is reviewed separately from behavior. An absent preview warning is not evidence of general availability.

| Capability | Status as reviewed | Evidence and action |
| --- | --- | --- |
| AI credits billing, included pooling, paid-usage policy | **Status unverified** for release phase | [Billing docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) establish behavior; confirm availability for the customer's plan |
| Universal, cost-center, and individual ULBs; individual expiration | **Status unverified** for release phase | [Budget docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) describe controls but do not label a release phase |
| Enterprise, organization, cost-center metered budgets and exclusion | **Status unverified** for release phase | [Budget docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets); validate configuration in the billing entity |
| Cost-center included-usage controls | **Status unverified** for release phase | Same [budget source](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets#included-usage-controls-for-cost-centers); separate from metered budgets |
| Copilot Chat, CLI, cloud agent, and Spaces | **Status unverified** by this guide for release phase | Listed as credit-consuming in [billing docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing); no blanket GA assertion |
| Third-party coding agents | <span class="status caution">public preview - use with caution</span> | [Current agent docs](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents) explicitly label preview; costs include Actions minutes and AI credits |
| GitHub Agentic Workflows | **Generally available** | [October 28, 2026 announcement](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/); default Copilot CLI engine needs a Copilot license |
| Spark | **Retired; source conflict recorded** | Billing docs still list it, but the [official retirement announcement](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/) says retirement after August 31, 2026; not an onboarding recommendation |

## Source map

**Product behavior:** [Billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) and [budgets](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) are the sources for pools, reset timing, enforcement, and precedence. [Budget setup](https://docs.github.com/en/billing/how-tos/set-up-budgets) is the administrative procedure.

**Architecture and operating recommendations:** [GitHub Well-Architected](https://learn.github.com/well-architected/) and its [AI credits recommendation](https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/) underpin the maturity path, attribution-first design, usage guidance, and operating cadence.

**Release phase and retirement:** Explicit GitHub documentation labels and dated changelog announcements establish status. Do not use old preview announcements to override later GA or retirement evidence.

## Known source tensions

**Hard stops:** Budget docs recommend enabling hard stops to enforce limits; Well-Architected recommends keeping the enterprise hard stop disabled for continuity. [This guide exposes the decision](/controls/#strict-cap-or-continuity) rather than silently choosing one for every customer.

**Metered routing and enterprise aggregation:** Read the documented routing order together with enterprise inclusion/exclusion and the independent-control headroom rule. A cost-center route is not an unconditional bypass of the enterprise cap.

**Spark:** A billing list is not proof of product availability. The retirement announcement takes precedence for onboarding; this conflict should remain visible until the official sources are reconciled.

## How freshness is maintained

Each page records a source-review date and links. The repository includes a weekly, manually dispatchable GitHub Agentic Workflow that proposes changes for human review or raises an issue when sources conflict. It never auto-merges.

Dates advance only after relevant claims and release labels have actually been rechecked, not just because a URL returns successfully. A failed check is not a clean bill of health. After 30 days, the next site build displays an overdue review notice; a static deployed site needs a rebuild for that build-time notice to change.

Freshness automation stays disabled until a maintainer configures its credential and explicitly activates it. Static-site deployment is separate and needs no model credential. See the [repository setup instructions](https://github.com/ragmha/ai-credits-guide#readme) and [GitHub Agentic Workflows documentation](https://github.github.com/gh-aw/).

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
