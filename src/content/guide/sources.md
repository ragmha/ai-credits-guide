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
