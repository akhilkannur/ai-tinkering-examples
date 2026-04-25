# Real AI Examples

A curated "Swipe File" of how people actually use AI at work. We prioritize visual proof (screenshots) and technical tool data over theoretical prompts.

## Core Assets
- **AI Examples:** A visual database of real-world AI usage discovered on social media.
- **Tool Directory:** 400+ curated AI tools for operators, categorized by skill level and use case.
- **Blog:** Editorial focus on "AI-Native Operations" and building with Lego blocks (APIs/MCPs).

## Core Architecture
- **Framework:** Next.js (TypeScript)
- **Data Layer:** 100% Local Static Data (no external database dependencies)
- **Styling:** Custom Vanilla CSS + Tailwind
- **Automation:** Built-in Screenshot Engine for capturing social proof.

## Project Structure
- `lib/social-examples-data.ts`: The curated list of visual AI examples seen on the homepage.
- `lib/ai-tools-data.ts`: The database of 400+ curated AI tools.
- `content/blog/`: Markdown files for editorial articles.
- `scripts/`: Automation engine for capturing examples, generating sitemaps, and social posting.
- `docs/`: Monetization plans and QA checklists.

## Metadata Refresh
- `npx tsx scripts/generate-llms-txt.js`: Generates files for AI crawlers (Tools + Examples).
- `node scripts/generate-sitemap.js`: Updates the production sitemap.
- `node scripts/generate-rss.js`: Refreshes the blog feed.

