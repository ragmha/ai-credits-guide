---
title: Learn to budget GitHub AI credits
section: Start here
order: 1
description: Learn the concepts visually, work through enterprise scenarios, then configure the controls that match your decision.
verified: "2026-11-10"
sources:
  - https://learn.github.com/well-architected/
  - https://learn.github.com/well-architected/governance/recommendations/managing-ai-credits/
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms
---

## What you will learn

- You can distinguish included AI credits from additional metered spending.
- You can choose guardrails without accidentally interrupting important work.
- You can turn usage data into an owned, repeatable budgeting process.

<div class="callout"><strong>Start with one question</strong>Is the problem shared-credit fairness, a person's consumption, or additional spend? The answer changes which control you need.</div>

## Choose your reading path

Each conceptual lesson opens with an editable Excalidraw visual, followed by a worked scenario and the rules needed to apply it. Hypothetical examples teach behavior; they are not recommended budgets.

<div class="reader-paths">
<a class="reader-path" href="/ai-credits-guide/sellers/"><span>01</span><div><strong>I'm helping a customer plan</strong><small>Discover their operating model, frame the trade-offs, and leave with a clear implementation brief.</small></div><span class="path-arrow">↗</span></a>
<a class="reader-path" href="/ai-credits-guide/implementation/"><span>02</span><div><strong>I'm setting this up</strong><small>Design ownership, configure layered controls, and establish the reporting and response loop.</small></div><span class="path-arrow">↗</span></a>
</div>

## Four situations to practise

- [Credits remain, but a developer is blocked](/controls/): resolve the applicable ULB.
- [A strict cap versus uninterrupted work](/controls/#strict-cap-or-continuity): choose enforcement with the workload owner.
- [Two cost centers share included credits](/planning/): separate pool controls from paid-overage budgets.
- [Agent-heavy work has two meters](/understand/): account for AI credits and Actions.

This learning guide focuses on GitHub Enterprise Cloud with Copilot Business, Enterprise or Copilot access. Enterprise controls need an enterprise owner or billing manager; organization owners can configure organization budgets. There is no universal budget recommendation or pricing calculator.

## How to read feature status

**Public preview - use with caution** marks a feature explicitly identified as preview by an official source. Assess support, change risk, and your enterprise's preview policy before using it. **Status unverified** means the cited source documents the capability but does not establish a release phase; it is not a claim that the feature is GA.

GitHub's [release-stage definitions](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models#considering-different-release-stages) distinguish previews from generally available features recommended for production. The [Opt in to preview features policy](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies#opting-in-to-previews-or-feedback) controls previews on GitHub.com, not every Copilot surface. Review the applicable [pre-release license terms](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms), including their non-production evaluation and testing restrictions, before enabling a preview; a caution tag is not production-use approval.

The [source and release-status register](/sources/) records the evidence, including conflicting documentation. Guide advice is a suggested operating practice, not a statement of product enforcement or procurement authorization.
