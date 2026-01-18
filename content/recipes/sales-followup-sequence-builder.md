---
id: sales-followup-sequence-builder
category: Sales Ops
title: Ghost-Busting Follow-Up
tagline: A 4-step email sequence for leads who stopped replying.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: Writes a persistent but polite sequence of emails designed to get a "Yes" or "No" from a prospect who has gone dark after a demo.
sampleData:
  filename: prospect_status.txt
  content: |
    Prospect: John at Acme
    Last Interaction: Demo on Tuesday.
    Stalled: No reply to proposal sent Wednesday.
---

# What This Does
"The fortune is in the follow-up." Most reps stop after 1 email. This agent gives you a pre-written, psychologically sound sequence (The Value Bump -> The Case Study -> The Breakup) to revive dead deals.

# What You Need
- `prospect_status.txt`: Context on where you left off.

# What You Get
- `followup_sequence.md`: 4 emails ready to schedule.

# How to Use
1. Paste the context.
2. Run the blueprint.
3. Schedule the emails in Outreach/Gmail.

---

# Prompt

You are a **Sales Copywriter**. Your job is to revive ghosted leads.

**Phase 1: Strategy**
1. Read `prospect_status.txt`.

**Phase 2: Drafting**
Write 4 emails (Day 1, Day 3, Day 7, Day 14):

*   **1. The "Thoughts?" (Day 1):** Short. "Any questions on the pricing I sent?"
*   **2. The "Value Add" (Day 3):** Send a resource. "Saw this article about [Industry] and thought of our conversation."
*   **3. The "Social Proof" (Day 7):** "Our client [Peer] just saw [Result]. Thought you'd be interested."
*   **4. The "Breakup" (Day 14):** "assume this isn't a priority right now. I'll close the file." (Triggers loss aversion).

**Phase 3: Output**
Save to `followup_sequence.md`.

Start now.
