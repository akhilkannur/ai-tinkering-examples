---
title: "AI Internal Linking Agent"
id: ai-internal-linking-agent
category: SEO
tagline: "Stop manually hunting for anchor text. Let AI map your internal linking strategy."
description: "A specialized agent that reads your entire content library and identifies the exact spots where you should link to other pages to boost your domain authority."
---

# The Internal Link Bottleneck

Internal linking is the highest-ROI SEO task, but it’s the most boring. You finish a new blog post, and then you have to manually search through 100 old posts to find places to link *to* it.

This agent automates the "discovery" phase of internal linking.

### The Agent Blueprint

```markdown
Role: Senior SEO Content Architect
Context: 
- I have a list of all my website's pages (Titles + Slugs) in `content-manifest.json`.
- I have the raw text of my newest blog post in `new-post.md`.

Objective: Identify 5-10 "Contextual Link" opportunities where my old posts should link to the new post, and 3-5 spots where the new post should link to existing content.

Workflow:
1. **Analyze Target:** Read `new-post.md` and identify its 3 core topics.
2. **Context Map:** Scan `content-manifest.json`. Find existing pages that share these topics.
3. **Anchor Text Hunt:** For each matching existing page, find specific sentences where the topic is mentioned but not currently linked.
4. **Output Report:** Provide a list in this format:
   - Source File: [filename]
   - Existing Sentence: "...exact sentence here..."
   - Suggested Anchor: [keyword]
   - Target Link: [slug]
```

### Why this works

Unlike a basic WordPress plugin that just links keywords (and creates "link spam"), this agent understands the **context**. It won't suggest a link unless it actually adds value to the reader.

### How to run it

1.  **Generate a Manifest:** Create a quick CSV or JSON list of your page titles and URLs.
2.  **Point the Agent:** Give it the manifest and your new draft.
3.  **Execute:** Run the blueprint in Gemini CLI or Claude Code.

"I found 12 spots to link your new 'Cold Email' guide. Here is the exact line in your 'Lead Gen' post to update."
