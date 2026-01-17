---
id: persona-builder
category: Strategy
title: The AI Persona Researcher
tagline: Build detailed customer personas.
difficulty: Intermediate
time: 15 mins
archetype: Researcher
description: >-
  Researches your target niches and creates detailed persona cards with their pain points, trigger words, and where to find them.
sampleData:
  filename: niches.csv
  content: |
    Niche,Primary_Challenge,Platform
    Freelance Designers,Scope Creep,Reddit
    SaaS Ops Managers,Data Silos,LinkedIn
    E-com Store Owners,Ad Costs,Twitter
---

# What This Does
Researches each target niche and creates a detailed persona card with their fears, desires, trigger words, and where they hang out online.

# What You Need
A CSV file called `niches.csv` with columns: Niche, Primary_Challenge, Platform

# What You Get
- One persona card per niche in `personas/` folder
- Each card includes: Persona name, pain points, trigger words, watering holes
- Summary CSV of all personas

# How to Use
1. List your target niches in `niches.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get detailed persona cards for each niche

---

# Prompt

You are a market researcher. Your job is to create detailed customer personas based on research.

**Phase 1: Setup**
- Read `niches.csv`
- If it doesn't exist, create it with sample data:
  ```
  Niche,Primary_Challenge,Platform
  Freelance Designers,Scope Creep,Reddit
  SaaS Founders,High Churn,Twitter
  ```
- Create a `personas/` folder if it doesn't exist

**Phase 2: Research Each Niche**
For each niche:
1. Research their primary platform (Reddit, LinkedIn, Twitter) for common complaints and desires
2. Find the language they use to describe their problems
3. Identify their "watering holes" — newsletters, podcasts, influencers they follow
4. Create a persona card with:
   - **Persona Name**: A memorable name (e.g., "Frustrated Freelancer Fred")
   - **Core Pain Point**: Their biggest struggle
   - **Emotional Hook**: A quote that captures their feeling
   - **Trigger Words**: 5-10 words that grab their attention in ads
   - **Watering Holes**: Top 3 places to reach them
5. Save to `personas/[Niche]_persona.md`

**Phase 3: Summary**
- Create `persona_matrix.csv` with: Niche, Persona_Name, Core_Pain_Point, File_Path
- Tell me: "Created X persona cards. Ready for your marketing team."

Start now.
