---
name: blog-thumbnail-generator
description: Generates standardized blog post thumbnails (750x500) with a gradient background and centered text. Use when adding new blog posts or refreshing visual assets.
---

# Blog Thumbnail Generator

This skill generates high-quality, consistent thumbnails for the "Real AI Examples" blog. It uses a predefined Slate 800 -> Slate 950 gradient with Rose 500 accents to match the brand identity.

## Usage

### 1. Generate a Single Thumbnail (Recommended)

To generate a thumbnail for a specific new post, provide the "Title Text" and the desired "filename.png".

```bash
python .gemini/tmp/blog-thumbnail-generator/scripts/generate.py "My New Post Title" my-new-post.png
```

*   **Text**: Keep it under 25 characters if possible for best fit.
*   **Filename**: Standard kebab-case (e.g., `automated-seo-guide.png`).
*   **Output**: The file will be saved to `public/images/blog/`.

### 2. Regenerate All Thumbnails

To refresh all default thumbnails (e.g., if you changed the color scheme in the script), run without arguments:

```bash
python .gemini/tmp/blog-thumbnail-generator/scripts/generate.py
```

## Configuration

The visual style is hardcoded in `scripts/generate.py` to ensure consistency:
*   **Font**: Noto Serif
*   **Size**: 750x500
*   **Colors**: Slate Dark Theme + Rose Accent