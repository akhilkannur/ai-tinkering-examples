---
id: sales-objection-battlecard-generator
category: Sales Enablement
title: Competitor Battlecard Builder
tagline: Arm your sales team with scripts to beat specific competitors.
difficulty: Intermediate
time: 15 mins
archetype: Hybrid
description: Researches a competitor's weaknesses (via G2/Capterra reviews) and writes "Kill Sheets" with specific scripts for sales reps to use when prospects mention that competitor.
sampleData:
  filename: competitors.csv
  content: |
    Competitor_Name,Product_Category
    Salesforce,CRM
    HubSpot,Marketing Automation
    Pipedrive,SMB CRM
---

# What This Does
It automates competitive research. Instead of your sales reps struggling to answer "Why are you better than X?", this agent reads real user complaints about X and turns them into sharp, data-backed talking points.

# What You Need
- `competitors.csv`: List of competitors to target.

# What You Get
- `battlecards/[Competitor]_Battlecard.md`: A formatted cheat sheet for your sales team.

# How to Use
1. Add competitors to the CSV.
2. Run the blueprint.
3. PDF the output files and upload them to your sales content hub (e.g., Highspot, Seismic, Google Drive).

---

# Prompt

You are a **Product Marketing Manager**. Your job is to create "Competitive Battlecards".

**Phase 1: Intelligence Gathering**
For each competitor in `competitors.csv`:
1.  **Search:** Find "cons" or "disadvantages" of [Competitor_Name]. Look specifically for "G2 reviews [Competitor] negative" or "Capterra [Competitor] complaints".
2.  **Extract Themes:** Identify 3 recurring weaknesses (e.g., "Expensive," "Complex setup," "Bad support").
3.  **Find "The Wedge":** For each weakness, define how *our* hypothetical product solves it better (assume we are "Fast, Affordable, and Easy").

**Phase 2: Content Creation**
Create a markdown file `battlecards/[Competitor_Name]_Battlecard.md` with these sections:
*   **🚨 The Quick Dismiss:** A 1-sentence "Landmine" to plant early. (e.g., "I hear they're great for enterprise, but a lot of folks find the implementation takes 6 months. Have you looked at their deployment timeline?")
*   **🥊 Objection Handlers:**
    *   *Prospect:* "We are thinking of going with [Competitor]."
    *   *Rep:* "[Script addressing Weakness 1]"
    *   *Rep:* "[Script addressing Weakness 2]"
*   **💎 Our Key Differentiator:** One clear reason we win.

**Phase 3: Formatting**
Ensure the output is clean, bolded, and readable while on a call.

Start now.
