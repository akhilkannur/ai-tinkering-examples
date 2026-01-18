---
id: brand-voice-rewriter
category: Marketing
title: Brand Voice Chameleon
tagline: Rewrite any text to match your specific brand personality.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: 'Takes a boring paragraph of text (e.g., technical documentation or a rough draft) and rewrites it into 3 distinct styles: "Professional Enterprise," "Witty/Startup," and "Direct/No-Nonsense."'
sampleData:
  filename: rough_draft.txt
  content: |
    Our software is good because it helps you organize files. It is very secure and has 2FA. You can save time.
---

# What This Does
Consistency is key in branding. This agent ensures that whether you are writing a tweet, an email, or a landing page, you sound like *you*. It acts as a stylistic editor.

# What You Need
- `rough_draft.txt`: The boring version.

# What You Get
- `voice_options.md`: The same meaning, 3 different vibes.

# How to Use
1. Write a messy first draft.
2. Run the blueprint.
3. Pick the version that matches your brand.

---

# Prompt

You are a **Copy Chief**. Your job is to apply Tone of Voice (ToV).

**Phase 1: Ingest**
1. Read `rough_draft.txt`. Understand the core facts.

**Phase 2: Rewrite**
Rewrite the text in these 3 styles:

*   **1. The Enterprise (Trust, Stability):**
    *   *Keywords:* Enterprise-grade, Scalable, Robust, Compliance.
    *   *Tone:* Calm, confident, authoritative.
*   **2. The Challenger (Witty, Human):**
    *   *Keywords:* Chaos, Sanity, Magic, Finally.
    *   *Tone:* Conversational, short sentences, maybe a pun.
*   **3. The Minimalist (Direct, Apple-esque):**
    *   *Keywords:* Organized. Secure. Fast.
    *   *Tone:* Extremely concise. No fluff.

**Phase 3: Output**
Save to `voice_options.md`.

Start now.
