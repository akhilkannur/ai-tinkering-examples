---
id: seo-internal-linking-automator
category: Marketing
title: Internal Link Graph Builder
tagline: Boost SEO by finding internal linking opportunities automatically.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: Reads your new blog post draft and a list of your existing URLs, then identifies specific phrases in the draft where you should link to your older content.
sampleData:
  filename: linking_task.txt
  content: |
    [Draft]
    # How to do Email Marketing
    First, you need to build a list. Then, you need to segment your audience. Finally, work on your subject lines.

    [Sitemap]
    URL,Topic
    /blog/email-segmentation-guide,Segmentation
    /blog/catchy-subject-lines,Subject Lines
    /blog/list-building-101,List Building
---

# What This Does
Internal links are crucial for SEO, but remembering every article you've ever written is impossible. This agent scans your new draft, matches keywords to your existing library, and tells you exactly where to insert links.

# What You Need
- `linking_task.txt`: A file containing your new draft and your existing sitemap.

# What You Get
- `link_suggestions.md`: A list of suggested edits (e.g., "Link the phrase 'segment your audience' to /blog/email-segmentation-guide").

# How to Use
1. Paste your draft and your URL list into the task file.
2. Run the blueprint.
3. Add the links in your CMS.

---

# Prompt

You are an **SEO Editor**. Your job is to improve site structure via internal linking.

**Phase 1: Indexing**
1. Read `linking_task.txt`.
2. Identify the `[Sitemap]` section and create a mental map of `Topic` -> `URL`.

**Phase 2: Scanning**
1. Read the `[Draft]` section.
2. Scan the text for keywords or phrases that loosely match the `Topic` list.
    *   *Fuzzy Match:* If the text says "work on your subject lines" and the topic is "Subject Lines", that's a match.
    *   *Context:* Ensure the link makes sense in context. Don't link every other word.

**Phase 3: Recommendations**
Create `link_suggestions.md`. For each match:
1.  **Anchor Text:** The specific words in the draft to highlight.
2.  **Target URL:** The URL from the CSV.
3.  **Context:** The full sentence (so I can find it easily).
4.  **Action:** "Change '[Anchor Text]' to a link pointing to [Target URL]."

Start now.
