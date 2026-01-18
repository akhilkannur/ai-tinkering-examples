---
id: competitor-ad-library-spy
category: Marketing
title: Ad Library Decoder
tagline: Reverse-engineer your competitor's ad strategy.
difficulty: Intermediate
time: 15 mins
archetype: Processor
description: Analyzes a list of ad copy text (scraped from Facebook/LinkedIn Ad Library), groups them by "Hook Type," and identifies their winning value propositions.
sampleData:
  filename: competitor_ads.txt
  content: |
    Ad 1: "Stop wasting time on spreadsheets. Automate your CRM today."
    Ad 2: "The #1 rated CRM for small business. Try it free."
    Ad 3: "Drowning in data? See why 5,000+ teams switched to Us."
---

# What This Does
It turns a random pile of competitor ads into a strategy document. It answers: "Are they pitching fear? Speed? Social proof?" so you can counter-position your own ads.

# What You Need
- `competitor_ads.txt`: Copy-paste the text from 5-10 ads you found in the Facebook Ad Library.

# What You Get
- `ad_strategy_analysis.md`: A breakdown of their angles.

# How to Use
1. Go to Facebook Ad Library. Search for a competitor.
2. Copy the text of their active ads into the text file.
3. Run the blueprint.

---

# Prompt

You are a **Performance Marketing Strategist**. Your job is to audit competitor ad creative.

**Phase 1: Analysis**
1. Read `competitor_ads.txt`.
2. For each ad, tag the **Hook Type**:
    *   *Pain/Agitation:* Focuses on a problem (e.g., "Stop wasting time").
    *   *Social Proof:* Focuses on numbers/users (e.g., "#1 rated", "5,000 teams").
    *   *Benefit/Outcome:* Focuses on the result (e.g., "Automate today").
    *   *Feature:* Focuses on a specific tool (e.g., "New Dark Mode").

**Phase 2: Pattern Recognition**
1.  Count which Hook Type is most common.
2.  Identify the **Primary Value Prop:** What is the ONE thing they are trying to sell? (Speed? Cost? Quality?)

**Phase 3: Counter-Strategy**
Create `ad_strategy_analysis.md`:
1.  **Their Playbook:** Summary of their hooks.
2.  **The Gap:** What are they NOT talking about? (e.g., "They focus on speed, but not security.")
3.  **Counter-Hooks:** Write 3 ad headlines for *us* that attack their weak spots.

Start now.
