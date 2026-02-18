---
name: social-media-publisher
description: Unified skill to publish AI recipes and blog posts to Instagram, X (Twitter), and Pinterest. Handles image generation, Cloudinary uploading, and API handshakes.
---

# Social Media Publisher

This skill automates cross-platform distribution of content from the `content/recipes` and `content/blog` folders.

## Commands

### 1. Publish a Specific Recipe
Give the recipe ID (e.g., `automated-seo-guide`).

```bash
# Post to all
node scripts/post-to-instagram.js "recipe-id" && node scripts/post-to-x.js "recipe-id" && node scripts/post-to-pinterest.js "recipe-id"
```

### 2. Post to Instagram
*   **Requirements**: Requires `INSTAGRAM_BUSINESS_ACCOUNT_ID` and `INSTAGRAM_ACCESS_TOKEN` in `.env.local`.
*   **Action**: Generates a 1080x1080 card, uploads to Cloudinary, and posts to Meta Graph API.
```bash
node scripts/post-to-instagram.js [recipe-id]
```

### 3. Post to X (Twitter)
*   **Requirements**: Requires X API credentials.
*   **Action**: Formats a 280-char tweet with a link.
```bash
node scripts/post-to-x.js [recipe-id]
```

### 4. Post to Pinterest
*   **Action**: Generates a card and pins it to the board.
```bash
node scripts/post-to-pinterest.js [recipe-id]
```

## Policy
*   **Preview First**: Always show the user the generated caption and the Cloudinary image URL (if available) before confirming the final API push.
*   **Batching**: If the user wants a "Batch Post," pick 3-5 random recipes and loop the commands.
*   **Human Style**: Avoid "AI slop" phrases (e.g., "highly effective", "goldmine", "game-changer"). Use a direct, conversational tone that sounds like a human sharing a tip. (e.g., "There are some interesting responses which won't blow your mind but are simple and effective.")