---
name: recipe-card-generator
description: Converts Markdown recipes into high-quality 1080x1080 social media cards (Instagram/Pinterest format). Use when the user wants to "visualize" a recipe for sharing.
---

# Recipe Card Generator

This skill uses the project's internal OG image engine to render and screenshot a professional social media card for any blueprint.

## Usage

```bash
node .gemini/tmp/recipe-card-generator/scripts/generate_card.js [recipe-id]
```

*   **Input**: The ID of a markdown file in `content/recipes/` (e.g., `automated-seo-guide`).
*   **Output**: A high-resolution 1080x1080 PNG saved to `public/images/recipes/`.

## Visual Style
*   **Format**: Instagram Square (1080x1080).
*   **Design**: Gradient background, bold headline, category badge, and tagline.
*   **Engine**: Powered by Next.js `@vercel/og` and Puppeteer.