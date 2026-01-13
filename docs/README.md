# Project Documentation & QA Agents

This folder contains the "Brain" of the project. Each file acts as a specialized agent or checklist to ensure quality across different domains.

## Available Agents (Checklists)

### 1. `QA_SEO.md` (The SEO Specialist)
**Use when:** Launching new pages, fixing meta tags, or debugging social sharing.
- **Covers:** Meta titles/descriptions, Open Graph images, Canonical URLs, Sitemap, Robots.txt.
- **Command:** "Audit the site using `docs/QA_SEO.md`."

### 2. `QA_UI.md` (The Design System Lead)
**Use when:** Creating new components, styling pages, or checking mobile responsiveness.
- **Covers:** "Digital Workshop" theme, Color palette (Slate/Acid Green), Typography (Inter/Space Mono), Tailwind utility usage.
- **Command:** "Style this component following `docs/QA_UI.md`."

### 3. `QA_CONTENT.md` (The Editor in Chief)
**Use when:** Writing new recipes, editing markdown files, or fixing build errors related to frontmatter.
- **Covers:** YAML Frontmatter schema, file naming, tag limits, prompt formatting.
- **Command:** "Validate all recipe files against `docs/QA_CONTENT.md`."

## How to Maintain
- If you change a global rule (e.g., switch primary color), **update the corresponding MD file immediately**.
- These files are the "Source of Truth" for AI agents working on this repo.
