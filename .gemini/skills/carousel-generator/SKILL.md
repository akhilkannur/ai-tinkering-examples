---
name: carousel-generator
description: Generates a 3-slide 'Swiss Style' Instagram carousel from a topic or blueprint using the 'Sam Parr' high-value framework.
---

# Carousel Generator

This skill autonomously designs and renders a high-converting Instagram carousel (1080x1080) based on a topic or an existing recipe.

## Usage

1.  **Prepare Content:** Create a JSON file with the slide content (or ask the agent to generate it).
2.  **Run Generator:** Execute the script to render the PNGs.

### Content Format (JSON)

```json
{
  "topic": "churn-risk",
  "accentColor": "#F04E30",
  "slides": [
    {
      "category": "Hard Truth",
      "title": "Your customers are leaving.",
      "tagline": "And you are missing the signs."
    },
    {
      "category": "The Signal",
      "title": "❌ 'Export Data'",
      "tagline": "✅ Call them immediately."
    },
    {
      "category": "The Fix",
      "title": "Don't email. Call.",
      "tagline": "Ask: 'Is there a report you're missing?'"
    }
  ]
}
```

## Posting

Once images are generated, post them directly to Instagram:

```bash
node .gemini/skills/carousel-generator/scripts/post_carousel.js carousel <path/to/caption.txt> <path/to/slide1.png> <path/to/slide2.png> <path/to/slide3.png>
```

**Note:** Requires `INSTAGRAM_BUSINESS_ACCOUNT_ID` and `INSTAGRAM_ACCESS_TOKEN` in `.env`.

### Command (Generation Only)

```bash
node .gemini/skills/carousel-generator/scripts/generate_carousel.js <path_to_content.json>
```

## Strategy: The "Sam Parr" Framework

Every carousel MUST follow this 3-slide structure for maximum engagement:

1.  **The Hook (Slide 1):** A contrarian statement, a hard truth, or a shocking stat. (e.g., "50% leave in 5 seconds").
2.  **The Value (Slide 2):** A concrete "Before vs After" or "Mistake vs Fix". (e.g., ❌ Bad Headline vs ✅ Good Headline).
3.  **The Tool (Slide 3):** A formula, script, or framework the user can steal. (e.g., "[Verb] [Noun] without [Pain]").

## Visual Style: "Swiss Premium"

*   **Background:** Off-White (#F5F5F0)
*   **Typography:** Massive, condensed, black sans-serif.
*   **Accent:** International Orange (#F04E30) top bar.
*   **Vibe:** High-end magazine, not "tech startup".
