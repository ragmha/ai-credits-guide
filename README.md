# AI Credits Learning Guide

A source-backed enterprise course on GitHub AI credit budgeting for sellers,
finance stakeholders, and enterprise/platform administrators.

Four sequential parts cover concepts, planning and decisions, implementation
and operations, and how to visualise. Each part has an overview, numbered chapters and a summary.
Chapters teach through self-contained explanations, explicitly hypothetical
worked examples and two or three native answer-reveal questions. Sources remain
an appendix, not a detour required to learn the lesson.
Ten genuine editable Excalidraw diagrams have static light/dark SVG
exports and prose alternatives. Worked scenarios illustrate behavior,
not recommended budgets or real customer data.

The Controls lesson uses a shared cookie jar, personal snack limit and
buying extras to explain the pool, ULB and metered hard stops. `CreditJar.astro` uses native
SVG and keyboard-accessible situation choices, with reduced-motion and
no-JavaScript explanations. It is not a billing simulator. No Anatomy kit
code or new runtime dependency is included.

Part 4 separates GitHub billing evidence, Copilot adoption metrics and observed
client telemetry. It covers built-in insights, CSV/REST spreadsheet or BI views,
conditional Azure cost analysis and a local Grafana design. Its dashboard
wireframe names fields and questions without inventing values. Generic Infinity
imports are guide advice, not a GitHub integration; telemetry is not billing.
Sources include official Microsoft/VS Code and Grafana documentation, with
endpoint-specific cautions and source tensions recorded in the register.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+ (or a compatible newer Node release).

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://localhost:4321/ai-credits-guide/>. The `/ai-credits-guide/` base is
intentional: local previews exercise the same paths as GitHub Pages.

```sh
bun run check
bun run test
bun run build
bun run preview
```

The static output is `dist/`. No server, database, or runtime credential is
required to serve the guide.

## Browser checks and screenshots

The Playwright check exercises system/light/dark themes, persisted choice,
internal project-base links, all diagrams and editable downloads, narrow-screen containment,
and narrow-to-wide navigation. It also walks the complete previous/next chain
across part boundaries, verifies the full sidebar outline and opens every
self-check. It captures the course index, a part overview, a chapter with a
self-check and a summary in light/dark at desktop/mobile widths, alongside the
existing lesson and cookie-jar screenshots.
Part 4 additionally captures its overview figure, GitHub-insights chapter with
an expanded answer, and summary at both widths in both themes.

The index is `/ai-credits-guide/`; chapter URLs follow
`/ai-credits-guide/part-1/2-understand/`. All former chapter URLs, including
`/sellers/` and `/identify-needs/`, have native static redirects directly to
their canonical course pages. Internal links retain their anchors.

```sh
# Uses installed Google Chrome by default.
bun run build
bun run test:browser

# Alternatively install Playwright Chromium and choose it explicitly.
bunx playwright install chromium
BROWSER_CHANNEL=chromium bun run test:browser
```

Screenshots default to `test-results/screenshots/`; set `SCREENSHOT_DIR` to
choose an artifact directory. Generated screenshots are not committed.

## Publish to GitHub Pages

The configured project is `ragmha/ai-credits-guide`, served at
<https://ragmha.github.io/ai-credits-guide/>. `astro.config.mjs` sets both the
site origin and project base; the Markdown link transform, layout navigation,
and diagram embeds use that base. Update these together if the repository
name or hosting path changes.

In repository **Settings → Pages**, choose **GitHub Actions** as the source.
The `Build and deploy guide` workflow checks and builds pull requests. Pushes
to `main` build and deploy `dist/` using GitHub's Pages artifact/deploy actions.
No inference token is needed for deployment. Implementation PRs must be
reviewed before merge; this workflow does not merge them.

## Keep the guide current

**Current mode: manual review.** Repository maintainer **@ragmha** is assigned
a weekly review on **Mondays at 07:37 UTC**, with the next planned review on
**2026-11-16**. Follow the [manual-review process](docs/freshness-setup.md#current-maintenance-manual-review):
read complete sources, check claims, release labels, self-checks and diagrams,
record actual evidence in a review PR and the source observation ledger, and
raise unresolved blockers as `[freshness]` issues. Dates advance only after
successful checks and human review. No completed review is implied by this
assignment.

The editable workflow is
`.github/workflows/ai-credits-freshness.md`; its compiled
`.lock.yml` is checked in as a **future automation option**, not an automatic
freshness service. No successful hosted review run has been recorded. It can
run weekly or manually, but is deliberately
inactive until its licensed Copilot credential is configured and
`FRESHNESS_ENABLED=true` is set.

Before relying on automation, follow [the one-time freshness setup](docs/freshness-setup.md#future-automation-one-time-credential-setup), including
`COPILOT_GITHUB_TOKEN`, the activation order, permissions, and the first
manual run. It proposes draft PRs or blocker issues; it never auto-merges.
Do not treat skipped runs as successful source verification.

To recompile after editing the agentic workflow:

```sh
gh aw compile
```

Compilation was performed with gh-aw v0.72.1. Compilation does not prove that
hosted authentication or source access works; activation requires the
documented manual hosted check.

## Editorial conventions

Content lives in `src/content/guide/*.md`. Each page has a title, section,
order, description, ISO `verified` date, and canonical `sources`. Conceptual
lessons declare a primary `diagram` shown before their supporting text;
`scenarioDiagram` adds a second worked-example figure where useful.
`Diagram.astro` displays static exports with a downloadable native source.
`src/course.ts` is the shared source for part order, numbering, routes and
legacy redirects. The index, overview lists, sidebar and reading sequence use
that same definition. Sources is outside the sequence. Lesson frontmatter
contains `checks` with two or three `question`/`answer` pairs; the layout renders
native `<details>` with no quiz framework, stored progress or tracking.
Each new source must also appear in the source register with its own review
date. Do not refresh older review dates merely because another part was added.

## Editing the diagrams

Open `public/diagrams/<name>.excalidraw` in Excalidraw to edit its native
boxes, text and connectors. Commit that source with both themed exports and
the standalone HTML wrapper. The existing diagram URLs remain available.

```sh
bun run diagrams:export
bun run test:diagrams
```

The export check uses Excalidraw's real import/export implementation; the
reader site ships static SVGs, not an Excalidraw editor or React runtime.
Keep the locked canvas element: its native `customData` carries the
accessible title and description through ordinary Excalidraw saves.
Keep source labels, exports, prose alternatives and scenario arithmetic
consistent. Regenerate after changing a native source rather than editing
an exported SVG by hand. When enabled, freshness automation audits every format
read-only; the current manual reviewer checks the same formats.

### Content rules

- Cite primary sources beside numerical and behavioral claims.
- Advance a page's review date only after checking every material claim and
  all its listed sources. More than 30 days is overdue.
- At every mention of a known preview feature use the exact visible tag
  **public preview - use with caution**. Use **status unverified** when the
  source does not establish a release phase.
- Keep included-usage controls separate from metered-spend budgets.
  Individual ULB > cost-center ULB > universal ULB is precedence; enterprise
  spending caps are independent controls.
- Label operating advice; do not confuse a forecast, consumption cap, or
  purchase authorization. Present strict caps versus continuity as a choice.

The source register records the Spark retirement/billing-list conflict and
the differing hard-stop recommendations. Third-party agent preview status
and Agentic Workflows GA status are sourced independently.

## Design and scope decisions

The requested governance-training reference informs the near-black canvas,
subtle square grid, system sans-serif typography, green section/numbering
accents, blue links and compact bordered panels. The light counterpart uses
cool gray and white surfaces with accessible green and blue accents.
The chapter rail, visual-first lessons and reading column remain intact.
No reference content, announcement strip or unrelated features are copied.
The header uses the Octicons `mark-github` artwork (MIT, see
`public/licenses/octicons-MIT.txt`) at the user's request.
GitHub's name and logo are GitHub, Inc. trademarks; this independent guide is
not affiliated with or endorsed by GitHub, and logo use should be confirmed
against the [brand guidelines](https://brand.github.com/foundations/logo)
before wider publication.
Diagrams use readable native sans-serif text with Excalidraw strokes and
no network font dependency.
The dev-only `clsx` pin preserves Astro's named export when Excalidraw's
older transitive version would otherwise be hoisted to the project root.

Theme defaults to the system preference; a visible select persists an
override. The initial theme script runs before styles render. When browser
storage is unavailable, the current selection works but cannot persist.
Diagrams follow the chosen theme.

Assumptions: visual-first lessons with worked scenarios, not a full in-site
drawing editor; GitHub Enterprise Cloud is the main audience; budget amounts
must come from customer approvals and observed consumption; this is an
independent implementation guide, not commercial terms. No AI chat,
telemetry, purported customer data, or universal budget calculator is included.
