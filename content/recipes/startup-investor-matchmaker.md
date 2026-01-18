---
id: startup-investor-matchmaker
category: Sales Ops
title: Investor Thesis Matcher
tagline: Find the right VCs for your startup based on their investment thesis.
difficulty: Advanced
time: 15 mins
archetype: Processor
description: Reads your startup's "Blurb" and a CSV of Investor Profiles (including their specific focus areas), then scores the fit to prevent you from pitching B2B investors with a B2C idea.
sampleData:
  filename: fundraising_data.txt
  content: |
    [Startup]
    We are a B2B SaaS platform for construction management. We sell to Enterprise GC's. Raising Seed round.

    [Investors]
    Firm,Focus,Stage
    Sequoia,Mobile & Consumer,Series A
    Brick & Mortar Ventures,Construction Tech,Seed
    SaaStr Fund,B2B SaaS,Seed
---

# What This Does
Fundraising is a sales funnel. This agent qualifies your leads. It filters out investors who are the wrong stage or sector, saving you from sending emails that will be instantly deleted.

# What You Need
- `fundraising_data.txt`: Your pitch and the investor list.

# What You Get
- `qualified_investors.csv`: The list of matches.
- `email_intros.md`: Specific reasons *why* you are a fit for each.

# How to Use
1. Paste your pitch and investor data.
2. Run the blueprint.
3. Pitch the top matches.

---

# Prompt

You are a **Venture Capital Analyst**. Your job is to screen deal flow.

**Phase 1: Analysis**
1. Read `fundraising_data.txt`.
2. Extract from `[Startup]`: **Sector** (e.g., Construction), **Business Model** (e.g., B2B SaaS), and **Stage** (e.g., Seed).
3. Parse the `[Investors]` list.

**Phase 2: Matching**
For each investor:
1.  **Check Stage:** Does their "Stage" match ours? (Allow slight overlap, e.g., Pre-Seed matches Seed).
2.  **Check Focus:** Does our Sector/Model fit their "Focus"?
    *   *High Fit:* Exact keyword match (e.g., "Construction Tech").
    *   *Medium Fit:* Broad match (e.g., "B2B SaaS").
    *   *No Fit:* Wrong sector (e.g., "Consumer").

**Phase 3: Output**
1.  Filter for High and Medium Fit only.
2.  Save to `qualified_investors.csv` (Columns: `Firm`, `Fit_Score`, `Reason`).
3.  Create `email_intros.md`:
    *   For the top 3 matches, write a 1-sentence "Why Us" line.
    *   *Example:* "I'm reaching out because of your specific focus on [Focus Area]..."

Start now.
