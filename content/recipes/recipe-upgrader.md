---
title: "Project Recipe Upgrader"
id: recipe-upgrader
category: Content Ops
tagline: "Batch-update your recipe library with AI-optimized formatting and sample data."
difficulty: Advanced
time: 5 mins
archetype: Processor
description: "The exact script we use to maintain this website. It reads existing recipe files, categorizes them, and automatically adds batch processing loops, sample data templates, and structured output artifacts."
isPremium: true
---

# The Upgrader Logic
This is a 'Folder Agent' skill. It lives in the root of the `ai-tinkering-examples` project and ensures every recipe follows the 'Work-Ready' standard.

### Workflow:
1. Scan `content/recipes/*.md`.
2. Analyze existing frontmatter.
3. Inject missing `sampleData` templates.
4. Normalize descriptions to avoid 'AI Slop'.
5. Export results to structured CSV.
