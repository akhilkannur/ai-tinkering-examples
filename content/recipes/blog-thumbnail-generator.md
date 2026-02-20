---
title: "Blog Thumbnail Generator"
id: blog-thumbnail-generator
category: Content Ops
tagline: "Programmatically generate branded OG images and blog thumbnails."
difficulty: Intermediate
time: 2 mins
archetype: Processor
description: "The automation we use to create the very thumbnails you see on this site. Uses Python and Pillow to take a title and generate a high-contrast, brutalist-style image with custom gradients and typography."
isPremium: false
---

# The Visual Engine
Instead of manually designing covers in Canva, we use this script to maintain perfect brand consistency across 500+ pages.

### Workflow:
1. Input: Blog Title + Slug.
2. Background: Generate a Slate-to-Deep-Slate gradient.
3. Typography: Render title in Noto Serif (or Archivo Black).
4. Brand: Inject the Rose-500 accent bar.
5. Export: Save to `public/images/blog/` automatically.
