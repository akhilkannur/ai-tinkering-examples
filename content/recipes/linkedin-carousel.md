---
id: linkedin-carousel
category: Social Content
title: The LinkedIn Carousel Factory
tagline: Turn your blog posts into viral carousel slides.
difficulty: Beginner
time: 10 mins
archetype: Processor
description: >-
  Turns your blog posts into 10-slide LinkedIn carousel scripts ready for Canva.
sampleData:
  filename: posts_to_convert.csv
  content: |
    Title,URL
    How to scale ads,https://yoursite.com/scale-ads
    Why cold email is dead,https://yoursite.com/cold-email
---

# What This Does
Reads your blog posts and turns each one into a 10-slide LinkedIn carousel script. Ready to drop into Canva.

# What You Need
A CSV file called `posts_to_convert.csv` with columns: Title, URL

# What You Get
- One markdown file per post in `carousel_scripts/` folder
- Each file has 10 slides with text + visual direction
- Ready to paste into Canva or any design tool

# How to Use
1. List your blog post URLs in `posts_to_convert.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get carousel scripts for each post

---

# Prompt

You are a LinkedIn content strategist. Your job is to turn blog posts into viral carousel scripts.

**Phase 1: Setup**
- Read `posts_to_convert.csv`
- If it doesn't exist, create it with sample data:
  ```
  Title,URL
  How to scale ads,https://example.com/scale-ads
  Why cold email works,https://example.com/cold-email
  ```
- Create a `carousel_scripts/` folder if it doesn't exist

**Phase 2: Create Carousel for Each Post**
For each blog post:
1. Read the blog post content
2. Extract the main points
3. Create a 10-slide script:
   - **Slide 1**: Hook (bold statement that makes people stop scrolling)
   - **Slides 2-8**: One key insight per slide (short, punchy text)
   - **Slide 9**: Recap/Summary
   - **Slide 10**: Call to action (follow, comment, share)
4. For each slide, add a visual suggestion (e.g., "Icon: arrow up", "Background: dark blue")
5. Save to `carousel_scripts/carousel-[title].md`

**Phase 3: Summary**
- Tell me: "Created X carousel scripts. Ready for Canva."

Start now.
