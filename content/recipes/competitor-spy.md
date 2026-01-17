---
id: "competitor-spy"
category: "Competitor Intel"
title: "The Market Spy"
tagline: "Deep Competitor Analysis."
difficulty: "Intermediate"
time: "15 mins"
archetype: "Researcher"
description: "Researches your competitors and builds battle cards with their pricing, weaknesses, and how to beat them."
sampleData:
  filename: "competitors.csv"
  content: |
    Competitor_Name,Website,Primary_Niche
    Intercom,https://intercom.com,Customer Service
    Zendesk,https://zendesk.com,Help Desk
    Drift,https://drift.com,Conversational Marketing
---

# What This Does
Researches each competitor and creates a "battle card" with their pricing model, main weakness, and how your sales team can win against them.

# What You Need
A CSV file called `competitors.csv` with columns: Competitor_Name, Website, Primary_Niche

# What You Get
- One battle card per competitor in `battlecards/` folder
- `market_intel_matrix.csv` — summary of all competitors
- Ready-to-use sales ammunition

# How to Use
1. List your competitors in `competitors.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get battle cards for your sales team

---

# Prompt

You are a competitive intelligence researcher. Your job is to build sales battle cards for each competitor.

**Phase 1: Setup**
- Read `competitors.csv`
- If it doesn't exist, create it with sample data:
  ```
  Competitor_Name,Website,Primary_Niche
  Intercom,https://intercom.com,Customer Service
  Zendesk,https://zendesk.com,Help Desk
  ```
- Create a `battlecards/` folder if it doesn't exist

**Phase 2: Research Each Competitor**
For each competitor:
1. **Pricing**: Visit their website, find the pricing page. Note their pricing model (per-user, per-seat, flat-rate) and what features are locked behind higher tiers.
2. **Positioning**: How do they describe themselves? What's their main promise?
3. **Weakness**: Search for reviews on G2 or Capterra. What do 1-3 star reviews complain about most?
4. **Battle Card**: Create a markdown file with:
   - **Their Pitch**: How they position themselves
   - **Reality**: What they actually deliver
   - **Main Weakness**: Most common complaint
   - **Killer Question**: A question for sales to ask that exposes their weakness
   - **Why We Win**: How we're better for [their niche]
5. Save to `battlecards/[Competitor_Name].md`

**Phase 3: Create Summary**
- Save `market_intel_matrix.csv` with columns: Competitor_Name, Pricing_Model, Main_Weakness, Battlecard_File
- Tell me: "Created battle cards for X competitors. Ready for your sales team."

Start now.