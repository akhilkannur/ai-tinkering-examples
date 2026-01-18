---
id: investor-update-email-writer
category: Founders
title: Investor Update Writer
tagline: Write the monthly email that keeps your VCs happy (and helpful).
difficulty: Beginner
time: 5 mins
archetype: Processor
description: Takes your raw monthly metrics (Revenue, Cash, Headcount) and bullet points about "Wins" and "Asks" and formats them into the standard Sequoia/YCombinator update format.
sampleData:
  filename: monthly_stats.txt
  content: |
    MRR: $50k (+10%)
    Cash: $1.2M
    Burn: $80k
    Wins: Hired new CTO, Closed Acme Corp.
    Lows: Lost Beta Client, Server outage.
    Needs: Intro to Series A leads.
---

# What This Does
Investors fund lines, not dots. Consistency is key. This agent ensures you send a high-quality, standardized update every single month in 5 minutes, building trust for your next round.

# What You Need
- `monthly_stats.txt`: The raw numbers.

# What You Get
- `investor_update.md`: Ready to send.

# How to Use
1. Dump your brain into the text file.
2. Run the blueprint.
3. Send via BCC to your cap table.

---

# Prompt

You are a **Startup Founder**. Your job is to communicate with stakeholders.

**Phase 1: Structure**
1. Read `monthly_stats.txt`.
2. Follow the "Standard Update" format:
    *   **TL;DR:** 3 bullet points summary.
    *   **KPIs:** A clean table of the numbers.
    *   **Highlights:** The good stuff.
    *   **Lowlights:** Radical transparency (what went wrong).
    *   **The Ask:** How they can help.

**Phase 2: Drafting**
*   Write the email.
*   *Tone:* Professional, concise, optimistic but honest.
*   *Subject:* "Investor Update - [Month] - [Company Name]"

**Phase 3: Output**
Save to `investor_update.md`.

Start now.
