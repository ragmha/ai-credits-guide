# AI credits freshness workflow

## What is installed

`.github/workflows/ai-credits-freshness.md` is the editable GitHub Agentic
Workflow. `ai-credits-freshness.lock.yml` is its generated GitHub Actions
workflow; keep both in version control after reviewing them. This setup was
compiled with **gh-aw v0.72.1**. The online documentation can evolve faster than
that version: recompile and review generated permissions after any upgrade.

When enabled, the workflow is scheduled for **Mondays at 07:37 UTC** (`37 7 * * 1`) and can run through
**Actions → AI credits guide freshness → Run workflow**. Scheduled runs use the
default branch; GitHub may delay schedules. Manual runs require the generated
workflow to be present on the default branch.

**Inactive by default:** both scheduled and manual runs are gated by the
repository Actions variable `FRESHNESS_ENABLED` being exactly `true`. If the
variable is missing or has any other value, activation is skipped before
credential validation, so publishing a fresh repository does not start failing
Copilot runs. This gate does not disable site build, pull-request CI, or Pages
workflows.

GitHub Agentic Workflows is generally available, not public preview; see the
[October 28, 2026 release announcement](https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available/).
Availability of individual Copilot/credits features is a separate question.

## Current maintenance: manual review

Repository maintainer **@ragmha** is assigned a **weekly manual review on
Mondays at 07:37 UTC**, with the next planned review on **2026-11-16**.
This is a manual responsibility, not an enabled reminder or automated run.
No successful hosted freshness review has been recorded; do not advertise
automatic freshness.

Use the existing **Freshness and human review** process below:

1. Read each page's complete canonical sources and compare its material claims,
   release labels, self-check answers and diagram text with that evidence.
   Apply the existing reviewer checklist and record coverage, including pages
   not checked or blocked.
2. Record actual findings and full-source evidence in a review PR using the
   workflow's reporting format: requested/final URLs, UTC retrieval time,
   article-text SHA-256, extraction method, checked claims, affected files and
   supporting quotations. Update the bounded source observation ledger below
   only for successful source checks, through human review. A first observation
   is not evidence that a source changed.
3. Use a `[freshness]` issue for inaccessible sources, contradictions or other
   unresolved blockers, checking for duplicates first. Leave affected dates and
   last successful ledger entries unchanged. Run the normal site checks before
   accepting corrections.

The ledger remains empty until actual source observations are reviewed.
Assigning this cadence does not complete a review or advance any source date.

## Future automation: one-time credential setup

Publishing the site does not configure or activate the inference credential.
A maintainer must complete the following:

1. Review and publish the guide and both workflow files to the default branch
   of `ragmha/ai-credits-guide`. Do not publish a secret or token in any file.
2. Enable GitHub Actions and allow the pinned actions and runner/container
   dependencies used by the compiled workflow under your organization policies.
   Allow GitHub Actions to create pull requests in **Settings → Actions →
   General → Workflow permissions → Allow GitHub Actions to create and approve
   pull requests**. Despite that setting's wording, this workflow cannot approve
   PRs: it has no approval safe output.
3. Use a user with an active **GitHub Copilot license** and permission to use
   Copilot CLI under the relevant account/organization policies. The exact
   engine configured here is **`copilot` (Copilot CLI)**, not Claude, Codex,
   a placeholder agent, or a separately installed MCP fetch service.
4. Create a fine-grained PAT owned by that **user account**, not the
   organization, with **Account permissions → Copilot Requests → Read**.
   Store it as the repository Actions secret **`COPILOT_GITHUB_TOKEN`**.
   See the [Copilot authentication reference](https://github.github.com/gh-aw/reference/auth/#copilot_github_token).
   No repository write permission is needed on this inference credential.
   Do not substitute the ordinary `GITHUB_TOKEN` for a licensed Copilot token.
   Rotate it before expiry and follow your enterprise's credential policy.
   You can set it interactively without putting it in shell history:

   ```sh
   gh secret set COPILOT_GITHUB_TOKEN --repo ragmha/ai-credits-guide
   ```

5. Ensure Issues are enabled, check branch protection/rulesets, and do not
   configure any auto-merge bot for `[freshness]` PRs. Keep required human
   reviews. The safe-output jobs use the repository's normal Actions token,
   not the inference PAT; do not grant them a broad personal write token.
6. **Only after the secret is configured**, set the repository Actions variable
   `FRESHNESS_ENABLED` to exactly `true` in **Settings → Secrets and variables →
   Actions → Variables**, or run:

   ```sh
   gh variable set FRESHNESS_ENABLED --body true --repo ragmha/ai-credits-guide
   ```

   Setting the variable does not validate the token. Never enable it first.
   To pause freshness checks later, set the value to `false` or delete the
   variable; leave it inactive if no Copilot credential is available.
7. Run the workflow manually once. Inspect every job, its source coverage,
   firewall/tool errors, artifacts, and any draft PR/issue before relying on
   the weekly schedule. The first successful run creates source observations;
   there is intentionally no fabricated baseline below.

This configuration deliberately does **not** request `copilot-requests: write`
on the base token. Newer gh-aw versions can support organization-billed
authentication through that permission; that is not the PAT-based engine
setup documented or compiled here.

## Permissions and network boundaries

The agent's base repository token has only `contents: read`, `issues: read`,
and `pull-requests: read`. Its GitHub tools are read-only. Local workspace edits
are proposals, not repository writes.

Only **create-pull-request** and **create-issue** are configured as publishing
safe outputs. gh-aw compiles separate guarded jobs with the narrowly scoped
write permissions required to create a PR branch/PR or issue. Inspect the
generated lockfile for the exact job-level permissions and compiler-provided
support jobs. There is no merge, approval, comment, update-PR, or direct-push
safe output. Compiler-provided no-op/incomplete-reporting support may also
appear; no-op issue reporting is disabled to avoid "nothing changed" issues.
PRs are enforced as drafts and are limited to guide Markdown and
this document; workflow code cannot be changed through the proposal allowlist.
The source workflow asks for at most one PR and one consolidated blocker issue
per run. Existing open proposals are checked to reduce duplicates.

The source network allowlist is `learn.github.com`, `docs.github.com`,
`github.blog`, `code.visualstudio.com`, `learn.microsoft.com`,
`microsoft.github.io`, and `grafana.com`. The additional official vendor hosts
cover the visualisation lessons; no general ecosystem or `defaults` baseline is requested. The compiler
also adds the Copilot/GitHub endpoints needed for inference, tools, and safe
outputs; those are not additional research sources. Review the compiled
firewall configuration after compilation. There is no broad web-search tool,
third-party reader, or proxy. Retrieval uses the declared shell and standard
`curl`/Python tools; no speculative external fetch integration is required.
The prompt restricts HTTPS redirects and source fetching to those exact
hosts, even where firewall domain matching includes subdomains. Firewall
allowlisting is defense in depth, not a guarantee of article accuracy.

Fetched pages and issue/PR text are untrusted evidence. They must not be used
to change instructions, execute embedded commands, expand network access,
alter credentials, or upload repository data.

## Freshness and human review

Guide files live at `src/content/guide/*.md` and have YAML frontmatter:
`title`, `section`, `order`, `description`, `verified` (YYYY-MM-DD), and `sources`
(an array of URL strings). A missing/invalid/future verification date, a date
older than **30 days**, or a source contradiction is flagged for review.
Thirty days is a repository policy, not a product SLA.

The agent must read **every complete source article and check every material
claim for a page** before advancing that page's `verified` date. A hash, snippet,
HTTP success, or partial read is insufficient. The ledger records article-text
SHA-256, canonical redirects, checked claims, affected files, extraction method,
and last successful UTC check. It changes only through a reviewed PR. Hash
changes are review signals; initial observations are not evidence of a past
change. Failed or unresolved checks leave the last successful ledger entry and
guide verification date unchanged. Unmerged proposals do not establish a new
baseline. The agent may propose weekly verification-only refreshes after full
checks; these remain subject to review.

The watch list includes [Well-Architected release notes](https://learn.github.com/well-architected/overview/release-notes)
and the [Copilot changelog feed](https://github.blog/changelog/label/copilot/feed/).
These discover relevant changes; each linked article still needs full review.
The workflow also follows relevant billing and budget announcements without
requiring a Copilot label.

Reviewers should:

- Open the canonical sources, inspect the full-page evidence and changed
  claims, and compare the source ledger and guide diff.
- Require `public preview - use with caution` at every public-preview feature
  mention, or `status unverified` where status cannot be established. Do not
  infer GA from absence of a warning.
- Check every price/allowance claim against a cited, checked canonical source.
- Keep cost-center included-usage controls separate from metered cost-center
  budgets. Check user-level budget precedence: **individual > cost-center >
  universal**. Treat caps versus continuity as a conscious operational choice,
  not blanket hard-stop advice.
- Check third-party coding agents' availability separately and account for
  both Actions minutes and AI credits where the sources specify them.
- Reconcile older Spark billing listings with the
  [official retirement notice](https://github.blog/changelog/2026-08-04-upcoming-deprecation-of-github-spark-on-github-com/);
  do not infer an adoption recommendation from an obsolete billing listing.
- Review draft PRs manually and run the site's normal checks as needed.
  PRs made with `GITHUB_TOKEN` may not trigger subsequent workflows; inspect
  the checks rather than assuming they ran.

**This workflow never merges or enables auto-merge.** A maintainer decides
whether to accept each proposal. An unresolved factual conflict, unavailable
source, or policy decision produces an issue instead of a speculative
correction; other independently verified pages may still get a draft PR.
Missing guide files produce a setup-blocker issue, not invented content.
Diagram text is checked too: editable `.excalidraw` text, light/dark `.svg`
exports, standalone `.html` wrappers and hypothetical worked scenarios must
agree. A source change invalidating a diagram creates a blocker issue naming
the source and exports and holds affected page dates for human correction.
All diagram formats remain outside this workflow's edit allowlist.

## Failures and stale content

A successful Actions conclusion is not proof every page is current. An
activation skipped because `FRESHNESS_ENABLED` is unset/false performs no
verification and must not be interpreted as a fresh guide. Read the
coverage summary for blocked, stale, skipped, and already-covered findings.
Partial source access must not advance dates. If inference, credentials,
firewall, safe-output publishing, or Actions itself fails, an issue might never
be created. Check **Actions** and enable failure notifications; absence of an
issue or PR is not evidence of freshness. Review verification dates directly
when schedules are disabled, delayed, or inactive. GitHub can disable scheduled
workflows in inactive public repositories; re-enable and manually run if needed.

If an enabled credential expires or is removed, set `FRESHNESS_ENABLED` to
`false` before repairing or replacing it; re-enable only after the secret is
ready. For a failed run, inspect its logs/artifacts, fix the credential/policy/network
or source problem, and rerun manually. Do not "fix" a failure by advancing
verification dates or widening the allowlist without review. If a source moves
outside the allowlist, make a human-reviewed workflow change and recompile.
Duplicate suppression and factual checking are agent instructions, not
deterministic guarantees; maintainers must inspect their execution.

## Editing and recompiling

Change the workflow Markdown, not the generated YAML. With gh-aw v0.72.1
installed, run from the repository root:

```sh
gh aw compile
```

Review and save the regenerated `.lock.yml` alongside its
source. Compilation validates configuration; it does not prove that hosted
credentials, organizational policy, network access, source interpretation, or
PR creation will work. Those require the first hosted manual run.

References: [workflow creation](https://github.github.com/gh-aw/setup/creating-workflows/),
[network permissions](https://github.github.com/gh-aw/reference/network/),
[safe outputs](https://github.github.com/gh-aw/reference/safe-outputs/),
[Copilot engine](https://github.github.com/gh-aw/engines/copilot/).

## Source observation ledger

Only the JSON inside this bounded block may be automatically updated in this
document. An empty array means no successful, reviewed source observations have
been recorded yet; it is not a claim that the sources were checked.

<!-- freshness-source-ledger:start -->
```json
[]
```
<!-- freshness-source-ledger:end -->
