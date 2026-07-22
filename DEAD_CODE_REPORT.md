# DEAD_CODE_REPORT.md

# Dead Code Report

## Summary

The project still contains several categories of code that were useful for a reusable theme but are likely unnecessary for a Vietnamese-only personal blog. This report lists candidates, not deletion commands.

## Likely dead or unnecessary

### 1. Astro i18n layer

- Files/areas: `astro.config.ts`, `src/i18n/**`, `getRelativeLocaleUrl` imports, `Astro.currentLocale`, `stripLocale`.
- Reason: The site is Vietnamese only and should not expose locale routing.
- Impact: Removing this simplifies URL generation and makes route files easier for beginners.
- Risk level: Medium.
- Estimated files affected: 18-24 files.

### 2. English translation file

- Files/areas: `src/i18n/lang/en.ts`.
- Reason: Not needed when the site has no i18n and only Vietnamese UI.
- Impact: Removes unused language copy.
- Risk level: Low.
- Estimated files affected: 1 file.

### 3. MDX support

- Files/areas: `@astrojs/mdx`, `mdx()` in `astro.config.ts`, `**/*.{md,mdx}` globs, example `.mdx` content.
- Reason: Obsidian is Markdown-first; MDX encourages mixing components into posts.
- Impact: Smaller dependency graph and simpler authoring rules.
- Risk level: Medium.
- Estimated files affected: 4-8 files.

### 4. AstroPaper demo posts and release notes

- Files/areas: `src/content/posts/_releases/**`, `src/content/posts/_color-schemes/**`, original tutorial/example posts.
- Reason: They are theme documentation, not blog content for "Tôi la cà".
- Impact: Cleaner content folder and fewer accidental search/RSS entries.
- Risk level: Low.
- Estimated files affected: 15-25 files.

### 5. Unused AstroPaper images

- Files/areas: `src/assets/images/AstroPaper-v3.png`, `AstroPaper-v4.png`, `AstroPaper-v5.png`, `astropaper-og.jpg`, maybe `forrest-gump-quote.png`.
- Reason: These look like theme/demo assets. Keep only images referenced by current posts or design.
- Impact: Smaller repo and fewer distractions in Obsidian/media workflow.
- Risk level: Low.
- Estimated files affected: 3-5 files.

### 6. Extra social icons

- Files/areas: `src/assets/icons/socials/github.svg`, `linkedin.svg`, `pinterest.svg`, `telegram.svg`, `whatsapp.svg`, `x.svg`.
- Reason: Current config uses Facebook and email for socials. Share links use more providers, so remove only after deciding share UI.
- Impact: Slightly smaller assets folder.
- Risk level: Low.
- Estimated files affected: 2-8 files.

### 7. Edit-post feature

- Files/areas: `src/pages/posts/[...slug]/_components/EditPost.astro`, `IconEdit.svg`, `features.editPost`, `hideEditPost` schema.
- Reason: Public "Edit page" link is theme/developer-oriented and currently points at AstroPaper upstream.
- Impact: Removes confusing UI and one frontmatter field.
- Risk level: Low.
- Estimated files affected: 4-6 files.

### 8. Feature flags for fixed decisions

- Files/areas: `features.search`, `features.dynamicOgImage`, `features.showBackButton`, `features.showArchives`, `features.lightAndDarkMode`.
- Reason: A personal blog can hard-code chosen features instead of carrying a mini product config system.
- Impact: Easier code reading; fewer branches.
- Risk level: Medium.
- Estimated files affected: 10-16 files.

### 9. Docker deployment files

- Files/areas: `Dockerfile`, `compose.yaml`, `.dockerignore`.
- Reason: Cloudflare Pages static deploy does not use Docker.
- Impact: Cleaner root.
- Risk level: Low.
- Estimated files affected: 3 files.

### 10. Duplicate lockfiles

- Files/areas: `pnpm-lock.yaml`, `package-lock.json`, `pnpm-workspace.yaml`.
- Reason: Two package managers create confusing install behavior.
- Impact: Reproducible local and Cloudflare builds.
- Risk level: Medium.
- Estimated files affected: 2-3 files.

## Possibly keep

### 1. `dayjs`

- Reason: Date formatting with timezone is useful for Vietnamese posts.
- Impact: Stable display of publish/update dates.
- Risk level: Low.
- Estimated files affected: 1-2 files.

### 2. `slugify` and `lodash.kebabcase`

- Reason: Current tags include Vietnamese text; slug behavior should be deliberate.
- Impact: Avoid broken tag URLs and inconsistent slugs.
- Risk level: Medium.
- Estimated files affected: 3-5 files.

### 3. `rehype-callouts`

- Reason: Obsidian callouts are useful for Markdown-first writing.
- Impact: Keeps Obsidian notes visually meaningful when published.
- Risk level: Low.
- Estimated files affected: 2-3 files.

