# AI Credits Learning Guide

A source-backed enterprise guide to GitHub AI credit budgeting for sellers,
finance stakeholders, and enterprise/platform administrators.

Visual-first lessons cover the billing model, layered controls, planning,
implementation, operations, attribution, discovery, and feature status.
Eight genuine editable Excalidraw diagrams have static light/dark SVG
exports and prose alternatives. Worked scenarios illustrate behavior,
not recommended budgets or real customer data.

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
and narrow-to-wide navigation. It captures all six conceptual lessons in
both themes at desktop and mobile widths.

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

The editable workflow is
`.github/workflows/ai-credits-freshness.md`; its compiled
`.lock.yml` is checked in. It can run weekly or manually, but is deliberately
inactive until its licensed Copilot credential is configured and
`FRESHNESS_ENABLED=true` is set.

Follow [the one-time freshness setup](docs/freshness-setup.md), including
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
an exported SVG by hand. Freshness automation audits every format read-only.

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

The requested learning-page reference informs the serif heading, chapter
sidebar, breadcrumb, restrained violet/zinc palette, and reading column.
Playfair Display, Inter, Schibsted Grotesk, and IBM Plex Mono are intentional
reference-matched font choices, bundled locally from Fontsource with system fallbacks.
Diagrams use readable native sans-serif text with Excalidraw strokes and
no network font dependency.
The dev-only `clsx` pin preserves Astro's named export when Excalidraw's
older transitive version would otherwise be hoisted to the project root.
Font redistribution licenses for the main site are in `public/licenses/`.
No reference branding or assets are copied.

Theme defaults to the system preference; a visible select persists an
override. The initial theme script runs before styles render. When browser
storage is unavailable, the current selection works but cannot persist.
Diagrams follow the chosen theme.

Assumptions: visual-first lessons with worked scenarios, not a full in-site
drawing editor; GitHub Enterprise Cloud is the main audience; budget amounts
must come from customer approvals and observed consumption; this is an
independent implementation guide, not commercial terms. No AI chat,
telemetry, purported customer data, or universal budget calculator is included.
