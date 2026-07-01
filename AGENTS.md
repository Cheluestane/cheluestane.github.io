# AGENTS.md

Lume 3 static site (Deno). Source files live at the project root; `_site/` is generated output — do not edit by hand.

## Commands

- `deno task serve` — dev server with live reload (Lume `-s`)
- `deno task build` — production build into `_site/`
- `deno task lume <args>` — raw Lume CLI passthrough

Lume runs remotely from `https://cdn.jsdelivr.net/gh/lumeland/lume@3.2.6/` (pinned, `lock: false`); there is no local Lume dependency to install. Lint plugin is loaded from the same CDN.

## Layout

- Entry point is `_config.ts`. `src` is `./` (root), so content, `_data.yml`, and `styles.css` sit at the project root — not under `_content/` (Lume's default).
- Pages live under `content/<section>/index.md`. The `slugify_urls` plugin rewrites URLs (lowercase, hyphenated) regardless of directory names, so directory names can be edited freely — URLs are derived. Current sections: `2d-animation`, `3d-animation`, `modeling-and-concept-art`, `illustration`, `about`, `contact`; nav links are defined in `_data.yml`.
- The homepage is `content/home-page/index.md`, which overrides its URL to `/` via frontmatter `url: /` — there is no root `index.md`.
- `_includes/layout.vto` is the single layout, applied to all pages via root `_data.yml` (`layout: layout.vto`). Nav links are also defined there in `nav:`.
- A page renders as a thumbnail index of its children only when its frontmatter sets `category` to a truthy value (e.g. `category: gallery`); otherwise it renders its own markdown body. Section `index.md` pages set this.
- In non-category pages, an optional `description` frontmatter field is rendered as markdown in a `.description` block below the body (see `_includes/layout.vto`).
- `_includes/layout.vto` renders each section's direct children as thumbnail panels via `search.pages("url^=" + url)`. Add a page by creating `content/<section>/<page>.md` (or a subdirectory with `index.md`). Child pages must define a `thumbnail` frontmatter field — just the filename (e.g. `thumbnail: thumbnail.jpg`); the layout emits `<child.url><thumbnail>`, so the media file must sit alongside the page and is resolved via the page's URL. Direct children only — nested subdirectories are excluded by the `!child.url.slice(...).includes("/")` check.
- `styles.css` is copied verbatim to `_site/` via `site.copy("styles.css")` and referenced as `/styles.css`. Media files (`.jpg/.jpeg/.png/.webp/.gif/.mp4/.webm/.mov`) are also copied verbatim — place them alongside the page that uses them (e.g. `content/<section>/`) and reference with relative paths.

## Conventions

- Layouts are Vento (`.vto`). JSX is configured (`jsxImportSource: lume`, runtime `ssx`) for components if added later.
- Unstable Deno flags required: `temporal`, `fmt-component` — already declared in `deno.json`; do not remove.
- Lume permissions are scoped in `deno.json` under `permissions.lume`. If a plugin or remote import needs a new host, add it there rather than running with `--allow-all`.

## Verification

There are no tests or typecheck tasks. After changes, run `deno task build` (or `deno task serve` and visually check) to confirm the site still generates.
