---
id: abm-campaign-asset-builder
category: Marketing
title: ABM Campaign Asset Builder
tagline: Generate personalized landing page copy for target accounts.
difficulty: Advanced
time: 20 mins
archetype: Hybrid
description: Takes a high-value target account (e.g., "Nike"), researches their 10-k or recent strategic initiatives, and writes custom headlines and body copy for an "Account Based Marketing" landing page.
sampleData:
  filename: target_accounts.csv
  content: |
    Account_Name,Website,Target_Persona
    Nike,nike.com,VP of E-commerce
    Delta Airlines,delta.com,Chief Digital Officer
    Spotify,spotify.com,Head of Ad Sales
---

# What This Does
Account-Based Marketing (ABM) works best when the content feels bespoke. This agent researches what your target company is focused on *right now* (e.g., "Sustainability," "Digital Transformation") and aligns your messaging to that specific goal.

# What You Need
- `target_accounts.csv`: The whales you want to catch.

# What You Get
- `abm_pages/[Account]_copy.md`: Full copy for a personalized landing page (Headline, Subhead, Value Prop).

# How to Use
1. List your top 10 target accounts.
2. Run the blueprint.
3. Paste the copy into your CMS (Instapage, Unbounce, Webflow).

---

# Prompt

You are an **ABM Campaign Manager**. Your job is to create hyper-personalized landing page copy.

**Phase 1: Deep Dive**
For each account in `target_accounts.csv`:
1.  **Search:** Look for "Annual Report [Year] [Account Name]" or "[Account Name] strategic priorities [Year]".
2.  **Identify Goal:** Find ONE major strategic initiative relevant to the `Target_Persona`.
    *   *Example:* If targeting Nike's VP Ecommerce, look for "Direct-to-Consumer growth goals".
    *   *Example:* If targeting Delta's CDO, look for "In-flight Wi-Fi experience".
3.  **Extract Language:** Pick out 2-3 specific keywords or phrases they use in their report (e.g., "Consumer Direct Offense").

**Phase 2: Copywriting**
Create `abm_pages/[Account]_copy.md`. Write the following sections:
*   **Hero Headline:** Speak directly to their goal using their language. (e.g., "Accelerating Nike's Consumer Direct Offense with AI").
*   **Subheadline:** How we help the `Target_Persona` achieve that specific goal.
*   **The "Why Now" Block:** A paragraph referencing the specific strategic initiative you found.
*   **Social Proof:** A placeholder for a case study from a similar industry (e.g., "See how [Competitor/Peer] did it").

**Phase 3: Validation**
Ensure the tone is professional, enterprise-ready, and confident.

Start now.
