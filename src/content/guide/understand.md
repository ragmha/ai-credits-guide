---
title: Follow the credits
section: The billing model
order: 2
description: See where included credits come from, when paid usage starts, and why an agent workload can have two meters.
verified: "2026-11-10"
diagram: credit-lifecycle
scenarioDiagram: agent-meters
checks:
  - question: Two Business license holders contribute 3,800 included credits. Can one person consume more than 1,900 of them?
    answer: Yes. The credits are shared, not reserved per user. That person's applicable ULB and any other applicable controls still matter.
  - question: The shared pool is empty. Is an unused organization budget enough to allow the next credit-consuming request?
    answer: No. Paid usage must be permitted and all applicable enforced controls must have headroom. A ULB can still block the user.
  - question: Does an AI-credit cap also cap the Actions minutes used by an agent workload?
    answer: No. They are separate meters and need separate review.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents
  - https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/
  - https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/
  - https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/
---

## What you will learn

- You can trace the shared pool into the metered phase.
- You can separate credit consumption from license fees and Actions usage.

## Read the picture

Business and Enterprise licenses contribute to a **shared monthly pool**, not private user wallets. After that pool runs out, credit-consuming work needs the **AI credits paid usage** policy and remaining headroom under applicable enforced limits.

**Copilot access skips the included-pool stage.** It has no included allowance; credit-consuming usage is metered from first use. The [October 28 announcement](https://github.blog/changelog/2026-10-28-github-enterprise-now-includes-access-to-github-copilot/) establishes account-team availability for GitHub Enterprise Cloud, with self-serve availability staged.

<details>
<summary>Check the allowance, reset and paid-usage rules</summary>

The [billing docs](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) state **1 AI credit = $0.01 USD**. Model input, output and cached tokens determine consumption. Budgets are configured in US dollars.

| Plan | Included credits per assigned license per month |
| --- | --- |
| Copilot Business | 1,900 |
| Copilot Enterprise | 3,900 |

Check [current allowances](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing#included-credits-for-copilot-business-and-copilot-enterprise) before quoting. Credits reset at **00:00 UTC on the first calendar day monthly**, with no rollover. Adding licenses increases the pool immediately; removals reduce it at the next billing cycle.

Additional usage is enabled by default for Business and Enterprise. Disable the paid-usage policy if overage is not authorized. Copilot Chat, CLI, cloud agent and Spaces consume credits; code completions and next edit suggestions do not, and remain available at a credit limit. See the [release register](/sources/) for status.

</details>

## Worked example: shared does not mean evenly divided

**Hypothetical arithmetic, not a budget recommendation:** Two Copilot Business license holders contribute 1,900 credits each, giving their enterprise a 3,800-credit included pool. Assume one licensing organization, no cost-center assignment and sufficient headroom under every applicable control.

One person consumes 2,800 credits and the other consumes 1,000. The first person has not borrowed a private balance from the second: both drew from the same pool. The total is now 3,800, so there are no included credits left. These numbers represent consumption, not a fixed number of prompts; token use and model choice determine how much a task consumes.

The next credit-consuming request needs paid usage to be permitted and applicable enforced limits to allow it. If paid usage is disabled, that work cannot continue merely because someone still has a license. If paid usage is allowed, its metered charges are a separate question from the fee for the two licenses. This is the transition shown in the lifecycle picture, not a purchase of another seat or a refill of a personal wallet.

## Worked scenario: an agent-heavy review day

**Hypothetical use case:** A team enables Copilot code review for a large migration. The [June 1 release](https://github.blog/changelog/2026-06-01-updates-to-github-copilot-billing-and-plans/) confirms two meters: AI credits for model use and Actions minutes for runner work. An AI-credit cap does not cap Actions. Review both before scaling; no example here is a recommended spend.

Read the two-meter picture below as two separate records of the same workload: model use consumes AI credits while runner work consumes Actions minutes. Reviewing only the AI-credit total leaves the runner side unexplained. In this example, the team needs to understand both before deciding whether a larger migration is financially approved; the diagram is not a statement that every feature uses both meters.

**Third-party coding agents — <span class="status caution">public preview - use with caution</span>** also consume both meters. Check the [official agent documentation](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents) before adoption.

**Keep separate:** a forecast estimates spend; a cap enforces a product limit; purchase authorization approves charges. None replaces the others, and metered budgets do not cap license fees. The [transition announcement](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) supplies billing context, not a customer's spending authority.
