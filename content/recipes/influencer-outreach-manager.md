---
id: influencer-outreach-manager
category: Marketing
title: Influencer Relationship Tracker
tagline: Manage your influencer pipeline without a fancy CRM.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a CSV of influencers and organizes them by "Status" (Contacted, Negotiating, Live), generating a daily to-do list for follow-ups.
sampleData:
  filename: influencers.csv
  content: |
    Handle,Status,Last_Contact_Date,Rate
    @tech_guru,Contacted,2023-10-01,
    @marketing_maven,Negotiating,2023-10-05,$500
    @startup_steve,Posted,2023-09-20,Free
---

# What This Does
Influencer marketing is messy. You forget who you DM'd. This agent acts as your CRM, telling you exactly who needs a nudge and who needs a contract, ensuring you don't drop the ball on a collaboration.

# What You Need
- `influencers.csv`: Your messy list.

# What You Get
- `daily_tasks.md`: Who to DM today.
- `pipeline_summary.md`: How much potential reach is "Negotiating".

# How to Use
1. Update your CSV.
2. Run the blueprint.
3. Execute the tasks.

---

# Prompt

You are an **Influencer Marketing Manager**. Your job is to move deals forward.

**Phase 1: Audit**
1. Read `influencers.csv`.
2. Check `Last_Contact_Date`.
    *   *Stale:* If Status is "Contacted" and it's been > 3 days, flag for Follow-Up.
    *   *Closing:* If Status is "Negotiating", flag for Contract.

**Phase 2: Task Generation**
Create `daily_tasks.md`:
*   **Follow Ups:** "Send 'Just bumping this' DM to [Handle]."
*   **Negotiations:** "Send contract to [Handle] at [Rate]."
*   **Tracking:** "Check for post from [Handle] (Status: Posted)."

**Phase 3: Summary**
Create `pipeline_summary.md`:
*   Total Influencers in Pipeline.
*   Estimated Budget (Sum of `Rate` for Negotiating).

Start now.
