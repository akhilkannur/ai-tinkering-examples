---
id: sales-battlecard-builder
category: Sales Enablement
title: The Sales Battlecard Builder
tagline: Win against competitors.
difficulty: Intermediate
time: 15 mins
archetype: Researcher
description: >-
  Creates 1-page battlecards for each competitor with their weaknesses, trap questions, and rebuttals for your sales team.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Website,Primary_Product
    Vanta,https://vanta.com,Compliance Automation
    Drata,https://drata.com,Security Compliance
    Sprinto,https://sprinto.com,Compliance Software
---

# What This Does
Researches each competitor and creates a 1-page battlecard with their weaknesses, trap questions to ask prospects, and rebuttals for common objections.

# What You Need
A CSV file called `competitors.csv` with columns: Competitor_Name, Website, Primary_Product

# What You Get
- One battlecard per competitor in `battlecards/` folder
- Each card has: Kill points, trap questions, objection rebuttals
- Summary CSV for quick reference

# How to Use
1. List your competitors in `competitors.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get battlecards for your sales team

---

# Prompt

You are a competitive intelligence researcher. Your job is to create sales battlecards that help reps win against competitors.

**Phase 1: Setup**
- Read `competitors.csv`
- If it doesn't exist, create it with sample data:
  ```
  Competitor_Name,Website,Primary_Product
  Competitor A,https://competitor-a.com,Their Product
  ```
- Create a `battlecards/` folder if it doesn't exist

**Phase 2: Research Each Competitor**
For each competitor:
1. Visit their website and find their pricing, features, and positioning
2. Search for negative reviews on G2, Capterra, or Reddit
3. Create a battlecard with:
   - **Kill Points**: 3 areas where we're objectively better
   - **Their Weakness**: Their biggest limitation or complaint from reviews
   - **Trap Questions**: 2 questions for reps to ask that expose their weakness (e.g., "Ask them how they handle X")
   - **Objection Rebuttals**: "If they say X, you say Y" scripts
4. Save to `battlecards/[Competitor_Name].md`

**Phase 3: Summary**
- Create `competitive_matrix.csv` with: Competitor_Name, Primary_Weakness, Best_Trap_Question, File_Path
- Tell me: "Created X battlecards. Your sales team is armed."

Start now.
