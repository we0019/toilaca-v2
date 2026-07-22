# HIGH_RISK_CHANGES.md

# High Risk Changes

## 1. Removing Astro i18n in one large patch

- Reason: Many pages and components rely on `getRelativeLocaleUrl`, `Astro.currentLocale`, `useTranslations`, and active nav path stripping.
- Impact: If done well, URLs become simpler. If done poorly, internal links, RSS links, tag links, and back navigation can break.
- Risk level: High.
- Estimated files affected: 18-24 files.

Mitigation: Replace URL helpers first, verify every route, then delete i18n files in a separate commit.

## 2. Changing slug behavior for Vietnamese tags or posts

- Reason: Current slug logic preserves non-Latin characters in some cases. Changing it can alter URLs such as `/tags/chạy-bộ/`.
- Impact: Old links, RSS readers, and search index URLs may break.
- Risk level: High.
- Estimated files affected: 3-6 files.

Mitigation: Decide whether Vietnamese URLs are desired. If switching to ASCII slugs, add redirects or accept a one-time URL break before the site is public.

## 3. Removing MDX without checking all content

- Reason: Current content collection accepts `.md` and `.mdx`; some deleted theme examples were MDX.
- Impact: Build becomes simpler, but any future MDX post will fail.
- Risk level: Medium to High.
- Estimated files affected: 4-8 files.

Mitigation: Run a file search for `.mdx`, then change the schema/globs/dependencies together.

## 4. Refactoring dynamic OG image generation

- Reason: OG generation uses Satori, Sharp, Astro font data, and dynamic routes.
- Impact: Social previews are important and failures can appear only during build or deploy.
- Risk level: High.
- Estimated files affected: 3-5 files.

Mitigation: Preserve current behavior first, extract shared renderer second, test `/og.png` and at least one post `index.png`.

## 5. Moving content folders for Obsidian

- Reason: Obsidian-relative image links, Astro content collection globs, and post slug generation all depend on paths.
- Impact: Broken images or changed post URLs.
- Risk level: High.
- Estimated files affected: 5-10 files.

Mitigation: Choose an image convention before moving content. Test Markdown images in both Obsidian and Astro.

## 6. Removing `ClientRouter`

- Reason: The project uses Astro view transitions and client-side swap events in Header, search, post scripts, back button, and lightbox behavior.
- Impact: Removing it may simplify runtime JavaScript, but can break back navigation/session behavior and page transition hooks.
- Risk level: High.
- Estimated files affected: 6-10 files.

Mitigation: Decide whether page transitions matter. If removing, also remove all `astro:after-swap`, `astro:before-swap`, and `transition:persist` logic.

## 7. Simplifying post page inline scripts

- Reason: The post page includes scroll progress, heading anchors, copy buttons, image lightbox, focus trap, touch zoom, and swap cleanup.
- Impact: This is a lot of runtime JavaScript for a static blog; removing pieces can improve simplicity but may reduce UX.
- Risk level: Medium to High.
- Estimated files affected: 1-4 files.

Mitigation: Split into small decisions: keep heading anchors and copy buttons; consider removing advanced image lightbox if maintenance matters more.

## 8. Changing package manager before deployment

- Reason: `package-lock.json` and `pnpm-lock.yaml` currently disagree on exact transitive versions.
- Impact: Cloudflare Pages may install a different tree than local.
- Risk level: Medium to High.
- Estimated files affected: 2-4 files.

Mitigation: Choose npm or pnpm, regenerate one lockfile, delete the other, then run build locally and on Cloudflare.

## 9. Removing feature flags too aggressively

- Reason: Some flags guard pages and routes, especially search, archives, back button, and dynamic OG.
- Impact: If a flag is removed from config but still referenced, build errors or hidden UI bugs follow.
- Risk level: Medium.
- Estimated files affected: 10-16 files.

Mitigation: Remove one flag at a time, starting with `editPost`, then `search`, then `dynamicOgImage`.

## 10. Replacing theme styling wholesale

- Reason: Typography, theme tokens, Pagefind styles, callout styles, and prose styles are connected.
- Impact: A design rewrite can quickly break reading comfort on mobile.
- Risk level: Medium to High.
- Estimated files affected: 5-12 files.

Mitigation: Keep layout width, typography scale, and prose defaults stable while changing colors/branding gradually.

