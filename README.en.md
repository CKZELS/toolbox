# Toolbox

English | [中文](README.md)

A tool collection website template maintained with Markdown. Drop fixed-format Markdown files into `content/tools/`, and the build automatically generates homepage category sections and tool detail pages.

![Toolbox Preview](https://raw.githubusercontent.com/CKZELS/toolbox/main/docs/preview.png)

## Architecture Overview

This project is a static website, suitable for deployment on Cloudflare Pages or GitHub Pages.

- The public site only serves `index.html` and `tool-detail.html`
- Maintenance docs live in `docs/writing-guide.md` and are not published
- Tool content is maintained solely in `content/tools/*.md`
- Homepage tool cards are written into `index.html` at build time — the tool list is visible even without JavaScript
- Search, category filtering, and detail page rendering are enhanced by `toolbox.js`
- `generated-content.js`, `public/generated-content.js`, and `public/toolbox.js` are generated or synced by scripts — do not edit them manually

## How to Add a Tool

1. Copy `content/tools/_template.md`
2. Rename it with a new English filename, e.g. `cursor.md`
3. Fill in the frontmatter fields and body content
4. Commit to the repository

The fixed format is:

```md
---
id: cursor
name: Cursor
category: Dev Tools
summary: One sentence describing what problem this tool solves.
icon: ✦
color: "#4B3FE3"
homepage: https://example.com/
order: 100
tags:
  - Tag One
  - Tag Two
---

# Cursor Notes

Body content starts here.
```

## Local Preview

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
```

The build first runs `npm run generate`, which:

1. Reads `content/tools/*.md`
2. Updates the static tool cards in the homepage
3. Generates `generated-content.js`
4. Generates `public/generated-content.js`
5. Syncs the root `toolbox.js` to `public/toolbox.js`
6. Outputs the public site to `dist/` via Vite

Build output is in `dist/`.

## Deployment

Recommended — Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: default

GitHub Pages also works. The project uses relative asset paths, making it suitable for repository subpath deployment.

## Project Structure

```text
content/tools/              Markdown content source
scripts/generate-content.js  Reads Markdown, generates static homepage and frontend data
generated-content.js        Root data file, for root-level publishing
public/generated-content.js Data file published to dist
toolbox.js                  Root interaction script, for root-level publishing
public/toolbox.js           Synced from toolbox.js by the generate script
src/css/                    Design system and page styles
index.html                  Homepage
tool-detail.html            Tool detail page
docs/writing-guide.md       Maintainer writing guide, not published
```

## Notes for Maintainers

- Adding tools: only add or modify `content/tools/*.md`
- Modifying interactions: only edit the root `toolbox.js`, then run `npm run generate`
- Do not manually edit `public/toolbox.js` — it will be overwritten
- Do not manually edit `generated-content.js` or `public/generated-content.js`
- Run `npm run build` at least once before every commit
