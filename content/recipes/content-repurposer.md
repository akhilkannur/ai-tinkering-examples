---
id: content-repurposer
category: Content Ops
title: The Viral Editor
tagline: Turn one blog post into 3 social posts.
difficulty: Beginner
time: 10 mins
archetype: Processor
description: >-
  Turns your blog posts into ready-to-post content for Twitter/X, LinkedIn, and your newsletter.
sampleData:
  filename: articles.csv
  content: |
    Title,URL,Core_Topic
    The Future of AI Agents,https://blog.com/ai-agents,Automation
    10 Tips for Remote Work,https://blog.com/remote-tips,Culture
    SaaS Pricing Strategies,https://blog.com/pricing,Finance
---

# What This Does
Takes your blog posts and creates ready-to-post content for Twitter/X (thread), LinkedIn (post), and newsletter (summary).

# What You Need
A CSV file called `articles.csv` with columns: Title, URL, Core_Topic

# What You Get
- One markdown file per article in `bundles/` folder
- Each file contains: Twitter thread + LinkedIn post + Newsletter summary
- Ready to copy and schedule

# How to Use
1. List your blog posts in `articles.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get social content bundles for each article

---

# Prompt

You are a content repurposing expert. Your job is to turn blog posts into social media content.

**Phase 1: Setup**
- Read `articles.csv`
- If it doesn't exist, create it with sample data:
  ```
  Title,URL,Core_Topic
  How to Use AI for Sales,https://example.com/ai-sales,Sales
  ```
- Create a `bundles/` folder if it doesn't exist

**Phase 2: Repurpose Each Article**
For each article:
1. Read the blog post content from the URL
2. Create a **Twitter/X Thread** (8 tweets):
   - Tweet 1: Strong hook (give 3 variations to choose from)
   - Tweets 2-7: Key insights from the article
   - Tweet 8: Call to action
3. Create a **LinkedIn Post**:
   - Hook line that makes people click "See more"
   - Short paragraphs with line breaks
   - End with a question to drive comments
4. Create a **Newsletter Summary**:
   - 150 words max
   - Key takeaways in bullet points
5. Save to `bundles/[Title]_social_bundle.md`

**Phase 3: Summary**
- Create `content_distribution_matrix.csv` with: Title, Core_Topic, File_Path
- Tell me: "Created social bundles for X articles. Ready for scheduling."

Start now.
