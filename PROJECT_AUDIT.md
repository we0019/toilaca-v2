# PROJECT_AUDIT.md

# Project Audit - "Tôi la cà"

## Executive summary

Dự án hiện là một bản fork của AstroPaper, đã được cá nhân hóa thành blog cá nhân tiếng Việt. Kiến trúc nền tốt: static Astro, Markdown content collections, RSS, sitemap, Pagefind, dynamic OG image, dark/light mode. Tuy nhiên codebase vẫn còn nhiều lớp tổng quát của theme gốc: i18n, MDX, feature flags, edit-post link, nhiều social/share provider, Docker files, theme demo assets, và hai lockfile.

Mục tiêu dài hạn nên là: giữ Astro + Markdown + Pagefind + RSS + dynamic OG, bỏ các nhánh tùy chọn không dùng, giảm config, biến repo thành một blog tiếng Việt dễ hiểu cho người mới.

## Current status

- Framework: Astro 7.
- Output model: static site.
- Content: `src/content/posts/*.md` và `src/content/pages/about.md`.
- Search: Pagefind, index sau build.
- RSS: `src/pages/rss.xml.ts`.
- Dynamic OG: `src/pages/og.png.ts` và `src/pages/posts/[...slug]/index.png.ts`.
- Styling: Tailwind CSS 4 qua Vite plugin, CSS tokens trong `src/styles`.
- Deployment target: phù hợp Cloudflare Pages nếu build command và Node version được cấu hình đúng.
- CMS: không có CMS, đúng mục tiêu.
- i18n: vẫn còn Astro i18n và helper `getRelativeLocaleUrl`, chưa đúng mục tiêu "No i18n".

## Findings and recommendations

### 1. Remove Astro i18n completely

- Reason: Site chỉ dùng tiếng Việt, không cần locale routing, `Astro.currentLocale`, `getRelativeLocaleUrl`, `stripLocale`, hay thư mục `src/i18n`.
- Impact: Code dễ hiểu hơn, routing đơn giản hơn, ít lỗi như `MissingLocaleError`.
- Risk level: Medium.
- Estimated files affected: 18-24 files.

### 2. Keep Markdown, remove MDX unless explicitly needed

- Reason: Obsidian workflow hợp với Markdown thuần. MDX cho phép component trong bài viết nhưng tăng độ phức tạp, dependency, lint/build surface.
- Impact: Người mới chỉ cần học frontmatter + Markdown, ít lỗi compile hơn khi viết bài từ Obsidian.
- Risk level: Medium.
- Estimated files affected: 4-8 files plus dependencies/lockfile.

### 3. Keep Pagefind, simplify search configuration

- Reason: Pagefind là lựa chọn đúng cho static blog không CMS. Nhưng hiện đang có feature flag `features.search` dù mục tiêu đã cố định là Pagefind.
- Impact: Ít điều kiện rẽ nhánh, trang search luôn tồn tại, build script rõ hơn.
- Risk level: Low.
- Estimated files affected: 4-6 files.

### 4. Keep dynamic OG but extract shared OG renderer

- Reason: `src/pages/og.png.ts` và `src/pages/posts/[...slug]/index.png.ts` đang lặp nhiều logic Satori/Sharp/font.
- Impact: Dễ chỉnh thiết kế OG một lần cho cả site và post.
- Risk level: Medium.
- Estimated files affected: 3-5 files.

### 5. Replace AstroPaper config layer with plain site config

- Reason: `astro-paper.config.ts`, `src/config.ts`, `src/types/config.ts` vẫn phản ánh theme reusable. Blog cá nhân không cần nhiều option runtime.
- Impact: File config ngắn hơn, tên trường sát nhu cầu hơn, người mới dễ biết sửa chỗ nào.
- Risk level: Medium.
- Estimated files affected: 12-18 files.

### 6. Remove edit-post feature from production UI

- Reason: `features.editPost` hiện trỏ về repo AstroPaper gốc, không phù hợp blog cá nhân và không cần cho độc giả.
- Impact: Bỏ `hideEditPost`, `EditPost.astro`, icon edit, logic condition trong post layout.
- Risk level: Low.
- Estimated files affected: 4-6 files.

### 7. Decide whether archives page is needed

- Reason: Với blog mới ít bài, `/archives` có thể là dư. Nếu vẫn thích nhật ký theo tháng/năm thì giữ.
- Impact: Bỏ archives giúp nav nhẹ hơn; giữ archives giúp đọc lại theo thời gian tốt hơn.
- Risk level: Low.
- Estimated files affected: 3-5 files.

### 8. Normalize package manager

- Reason: Repo có `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `package-lock.json`, và `node_modules`. Cloudflare Pages cần một lựa chọn rõ.
- Impact: Build reproducible hơn, ít lỗi khác version giữa local và Cloudflare.
- Risk level: Medium.
- Estimated files affected: 2-4 files.

### 9. Remove Docker files if deploying only to Cloudflare Pages

- Reason: `Dockerfile`, `compose.yaml`, `.dockerignore` không cần cho Cloudflare Pages static deploy.
- Impact: Root project gọn hơn, người mới ít bị phân tâm.
- Risk level: Low.
- Estimated files affected: 3 files.

### 10. Create Obsidian authoring contract

- Reason: Obsidian cần quy ước rõ: bài nằm đâu, ảnh lưu đâu, frontmatter bắt buộc gì, draft/schedule hoạt động thế nào.
- Impact: Viết bài không phá build, workflow rõ cho lâu dài.
- Risk level: Low.
- Estimated files affected: 2-5 files.

## Recommended target architecture

```text
src/
  content/
    posts/
      my-post.md
    pages/
      about.md
  assets/
    images/
  components/
    Header.astro
    Footer.astro
    Hero.astro
    Card.astro
    PostMeta.astro
  layouts/
    BaseLayout.astro
    PostLayout.astro
  pages/
    index.astro
    about.astro
    posts/[...page].astro
    posts/[...slug]/index.astro
    search.astro
    rss.xml.ts
    og.png.ts
    posts/[...slug]/index.png.ts
  styles/
    global.css
  utils/
    posts.ts
    urls.ts
    slugify.ts
```

## Cloudflare Pages fit

- Build command: `npm run build` or `pnpm build`, choose one.
- Output directory: `dist`.
- Node version: set `NODE_VERSION=22.12.0` or newer.
- Static output: already compatible.
- Pagefind: build-time generated assets should be copied into `public/pagefind` only if local dev search is important. For Cloudflare production, `dist/pagefind` is enough after `pagefind --site dist`.

