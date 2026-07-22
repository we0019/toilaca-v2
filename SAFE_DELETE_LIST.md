# SAFE_DELETE_LIST.md

# Safe Delete List

This list is conservative. Delete in small commits and run `npm run build`, `npm run lint`, and `npm run format:check` after each group.

## Group A - Theme sample content

### Recommendation: Delete original AstroPaper example posts

- Files/areas:
  - `src/content/posts/adding-new-post.mdx`
  - `src/content/posts/customizing-astropaper-theme-color-schemes.mdx`
  - `src/content/posts/dynamic-og-images.md`
  - `src/content/posts/examples/**`
  - `src/content/posts/how-to-add-latex-equations-in-blog-posts.md`
  - `src/content/posts/how-to-configure-astropaper-theme.mdx`
  - `src/content/posts/how-to-integrate-giscus-comments.md`
  - `src/content/posts/how-to-update-dependencies.md`
  - `src/content/posts/setting-dates-via-git-hooks.md`
- Reason: These are theme documentation, not "Tôi la cà" content.
- Impact: Removes noise from content folder, RSS, search, and future maintenance.
- Risk level: Low.
- Estimated files affected: 10-15 files.

## Group B - Theme release/color-scheme folders

### Recommendation: Delete inaccessible or removed theme folders

- Files/areas:
  - `src/content/posts/_releases/**`
  - `src/content/posts/_color-schemes/**`
- Reason: They are ignored by content collection due underscore naming and currently cause scan/access warnings.
- Impact: Cleaner tooling runs.
- Risk level: Low to Medium because filesystem permissions are already odd.
- Estimated files affected: 10-15 files.

## Group C - Docker files

### Recommendation: Delete Docker deployment files

- Files/areas:
  - `Dockerfile`
  - `compose.yaml`
  - `.dockerignore`
- Reason: Cloudflare Pages static deploy does not use them.
- Impact: Reduces deployment confusion.
- Risk level: Low.
- Estimated files affected: 3 files.

## Group D - AstroPaper marketing artifacts

### Recommendation: Delete theme marketing files after replacing README

- Files/areas:
  - `CHANGELOG.md`
  - `AstroPaper-lighthouse-score.svg`
  - possibly large AstroPaper images in `src/assets/images`
- Reason: These describe the upstream theme, not the personal blog.
- Impact: Root project becomes easier to scan.
- Risk level: Low.
- Estimated files affected: 2-6 files.

## Group E - Extra social icons after finalizing social/share links

### Recommendation: Delete unused social icons

- Files/areas:
  - Icons not referenced by `socials` or `shareLinks`.
- Reason: Current config only needs Facebook and mail for socials; share links should be intentionally chosen.
- Impact: Small asset cleanup.
- Risk level: Low.
- Estimated files affected: 2-8 files.

## Group F - Edit-post UI after removing feature

### Recommendation: Delete edit-post files

- Files/areas:
  - `src/pages/posts/[...slug]/_components/EditPost.astro`
  - `src/assets/icons/IconEdit.svg`
- Reason: Public edit links are not part of the stated blog goals.
- Impact: Removes one confusing feature from post pages.
- Risk level: Low.
- Estimated files affected: 2-5 files.

## Group G - MDX support after confirming no `.mdx` posts remain

### Recommendation: Delete MDX integration and dependencies

- Files/areas:
  - `@astrojs/mdx` from `package.json`
  - `mdx()` from `astro.config.ts`
  - `.mdx` globs in `src/content.config.ts`
  - `*.mdx` special ignores if no longer relevant
- Reason: Markdown-only Obsidian workflow.
- Impact: Smaller dependency graph and clearer authoring model.
- Risk level: Medium.
- Estimated files affected: 4-8 files.

## Group H - i18n after replacing URL helpers

### Recommendation: Delete i18n files

- Files/areas:
  - `src/i18n/**`
  - `stripLocale` in `src/utils/withBase.ts`
  - `i18n` block in `astro.config.ts`
- Reason: No i18n is a project goal.
- Impact: Fewer abstractions and simpler route code.
- Risk level: Medium.
- Estimated files affected: 18-24 files.

