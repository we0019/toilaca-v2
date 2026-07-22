# MODERNIZATION_PLAN.md

# Modernization Plan - "Tôi la cà"

## Principles

- Vietnamese only.
- Static only.
- Markdown first, friendly to Obsidian.
- No CMS.
- Keep Pagefind, RSS, sitemap, dynamic OG.
- Prefer boring Astro files over theme-level abstractions.
- Make the beginner path obvious: edit config, write Markdown, run build, deploy.

## Phase 0 - Baseline and safety

### Recommendation: Freeze a known-good baseline

- Reason: The repo has many working-tree changes and deleted theme files. A baseline avoids mixing cleanup with bug fixing.
- Impact: Easier rollback and easier learning.
- Risk level: Low.
- Estimated files affected: 0-2 files.

### Recommendation: Pick one package manager

- Reason: `pnpm-lock.yaml` and `package-lock.json` both exist.
- Impact: Cloudflare Pages and local development install the same dependency tree.
- Risk level: Medium.
- Estimated files affected: 2-3 files.

### Recommendation: Add a Cloudflare Pages note to README

- Reason: Beginners need exact build command, output folder, and Node version.
- Impact: Deployment becomes repeatable.
- Risk level: Low.
- Estimated files affected: 1 file.

## Phase 1 - Vietnamese-only static routing

### Recommendation: Remove Astro i18n config

- Reason: Locale routing is unnecessary for one language.
- Impact: URL generation becomes plain paths like `/posts/foo/`, `/search/`, `/rss.xml`.
- Risk level: Medium.
- Estimated files affected: 18-24 files.

### Recommendation: Replace `getRelativeLocaleUrl` with a small local URL helper

- Reason: The helper currently exists only because i18n exists.
- Impact: Simpler routing and fewer Astro-specific concepts for beginners.
- Risk level: Medium.
- Estimated files affected: 12-18 files.

### Recommendation: Remove `src/i18n`

- Reason: UI strings can live directly in components or a single `src/site.ts`.
- Impact: Fewer files and fewer indirections.
- Risk level: Medium.
- Estimated files affected: 8-12 files.

## Phase 2 - Markdown and Obsidian workflow

### Recommendation: Change content glob to Markdown only

- Reason: Obsidian writes `.md`, not `.mdx`.
- Impact: Fewer accidental compile errors from MDX syntax.
- Risk level: Medium.
- Estimated files affected: 2-4 files.

### Recommendation: Keep Obsidian callouts

- Reason: `rehype-callouts` plus `rehype-callouts/theme/obsidian` matches the desired writing workflow.
- Impact: Notes copied from Obsidian keep useful visual structure.
- Risk level: Low.
- Estimated files affected: 2-3 files.

### Recommendation: Define a minimal frontmatter schema

- Reason: Current schema has theme fields such as `canonicalURL`, `hideEditPost`, and flexible `ogImage`.
- Impact: New posts are easier to create and less error-prone.
- Risk level: Medium.
- Estimated files affected: 3-6 files.

Suggested beginner frontmatter:

```yaml
---
title: "Tên bài viết"
description: "Một câu tóm tắt ngắn"
pubDatetime: 2026-07-22T20:00:00+07:00
tags:
  - cuộc sống
draft: false
---
```

### Recommendation: Add an Obsidian image convention

- Reason: Images need a stable path that works in both Obsidian and Astro.
- Impact: Fewer broken images when publishing.
- Risk level: Medium.
- Estimated files affected: 2-5 files.

Recommended convention: `src/content/posts/assets/<post-slug>/image.jpg` or `public/images/posts/<post-slug>/image.jpg`. Pick one and document it.

## Phase 3 - Feature simplification

### Recommendation: Hard-code Pagefind as enabled

- Reason: Pagefind is part of the stated goals.
- Impact: Remove `features.search` branching and redirect-to-404 logic.
- Risk level: Low.
- Estimated files affected: 4-6 files.

### Recommendation: Hard-code dynamic OG as enabled

- Reason: Dynamic OG is part of the stated goals.
- Impact: Remove fallback branches and make OG generation easier to reason about.
- Risk level: Medium.
- Estimated files affected: 4-7 files.

### Recommendation: Remove edit-post feature

- Reason: It is not reader-facing and currently points to the upstream AstroPaper repo.
- Impact: Cleaner post pages and smaller schema.
- Risk level: Low.
- Estimated files affected: 4-6 files.

### Recommendation: Decide on archives page

- Reason: Archives are useful for long-running blogs but unnecessary at the beginning.
- Impact: Nav can become simpler if removed.
- Risk level: Low.
- Estimated files affected: 3-5 files.

## Phase 4 - Dynamic OG modernization

### Recommendation: Extract a shared OG card renderer

- Reason: Site OG and post OG duplicate layout, font loading, Satori, and Sharp logic.
- Impact: One place to adjust brand, typography, and Vietnamese copy.
- Risk level: Medium.
- Estimated files affected: 3-5 files.

### Recommendation: Test OG output in Cloudflare Pages build

- Reason: Satori, Sharp, and Astro font assets are more sensitive than normal static pages.
- Impact: Avoid deployment-only failures.
- Risk level: High.
- Estimated files affected: 1-3 files.

## Phase 5 - Root cleanup

### Recommendation: Remove theme docs after preserving useful notes

- Reason: `README.md`, `CHANGELOG.md`, and AstroPaper score image describe the theme, not the personal blog.
- Impact: Project becomes yours, not a clone with edits.
- Risk level: Low.
- Estimated files affected: 2-4 files.

### Recommendation: Remove Docker files

- Reason: Cloudflare Pages does not need Docker.
- Impact: Fewer deployment paths to learn.
- Risk level: Low.
- Estimated files affected: 3 files.

### Recommendation: Replace AstroPaper branding in metadata/assets

- Reason: `default-og.jpg` and `src/assets/images/astropaper-og.jpg` still look theme-derived.
- Impact: More coherent brand for "Tôi la cà".
- Risk level: Low.
- Estimated files affected: 2-5 files.

## Target Cloudflare Pages settings

- Framework preset: Astro.
- Build command: choose `npm run build` or `pnpm build`.
- Build output directory: `dist`.
- Environment variable: `NODE_VERSION=22.12.0` or newer.
- CMS: none.
- Runtime functions: none required for static output.

