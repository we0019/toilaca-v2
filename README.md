# Tôi la cà

Personal blog built with Astro.

## Goals

- Vietnamese only
- Static site
- Markdown-first writing
- Obsidian-friendly workflow
- Pagefind search
- Dynamic Open Graph images
- RSS feed
- No CMS

## Requirements

- Node.js `22.12.0` or newer
- npm `11.16.0` or newer

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format:check
```

## Content

Blog posts live in `src/content/posts`.

Use this frontmatter shape for new posts:

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

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `NODE_VERSION=22.12.0`
