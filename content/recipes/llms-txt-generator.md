---
id: llms-txt-generator
category: SEO Ops
title: LLMS.txt Generator for AI Agents
tagline: Help AI bots understand your site by generating a /llms.txt file.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: Scans your documentation and key pages to create a structured text file optimized for LLM reading.
sampleData:
  filename: docs/README.md
  content: |
    # My Documentation
    This is the main documentation file.
---

# What This Does
Just like `robots.txt` tells crawlers what to do, `llms.txt` gives Large Language Models (like ChatGPT, Claude, Gemini) a clean, concentrated summary of your website's content so they can answer questions about you more accurately.

# What You Need
- Your documentation files (Markdown) or a list of key public pages
- Node.js environment

# What You Get
- A `public/llms.txt` file following the proposed standard
- Better visibility in AI-generated answers

# How to Use
1. Locate your documentation or key content
2. Open Claude Code, Gemini CLI, or Cursor
3. Copy and paste the prompt below
4. Run the script

---

# Prompt

You are an AI Optimization Specialist. Your job is to build a script that generates an `llms.txt` file for this project.

**Phase 1: Setup**
- Locate the documentation folder (e.g., `docs/` or `content/`).
- If no docs exist, create a dummy `docs/intro.md`.

**Phase 2: The Generator Script (`generate-llms.js`)**
Create a script that:
1. **Header:** Writes the standard header explaining the project name and summary.
2. **File Scanning:** Recursively reads all `.md` files in the documentation folder.
3. **Content Cleaning:**
   - Removes frontmatter (metadata between `---`).
   - Removes excessive newlines.
   - Adds a clear title for each section based on the filename or H1.
4. **Formatting:** Concatenates everything into a single, clean text file.
   - Use strict Markdown formatting.
   - Limit the total character count (optional, e.g., < 1MB) to fit in context windows.

**Phase 3: Output**
- Save the result to `public/llms.txt`.
- Print: "✅ Generated llms.txt context file for AI agents."

Start now.
