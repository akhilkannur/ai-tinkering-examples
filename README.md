# Real AI Examples

A high-performance, static-first library of real-world AI workflows and automation blueprints. Curated for "AI Tinkers" and Operations professionals.

## Core Architecture
- **Framework:** Next.js (TypeScript)
- **Data Layer:** 100% Local Static Data (no external database dependencies)
- **Styling:** Tailwind CSS (Nerdy Idealist / Tinker aesthetic)
- **Deployment:** Vercel

## Project Structure
- `content/blog/`: Markdown files for editorial articles.
- `content/recipes/`: 700+ actionable AI automation blueprints.
- `lib/social-examples-data.ts`: The curated list of visual AI examples seen on the homepage.
- `scripts/`: Automation engine for capturing examples, generating sitemaps, and social posting.
- `internal/`: Archived research, legacy data, and internal development tools.

## Setup & Development
1. `npm install`
2. `npm run dev`

## Metadata Refresh
- `node scripts/generate-sitemap.js`: Updates the production sitemap.
- `node scripts/generate-llms-txt.js`: Generates niche-specific files for AI crawlers.
- `node scripts/generate-rss.js`: Refreshes the blog feed.

