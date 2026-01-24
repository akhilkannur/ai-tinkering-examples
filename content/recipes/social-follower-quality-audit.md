---
id: social-follower-quality-audit
category: Competitive Intel
title: The Social Authenticity Auditor
tagline: Spot fake followers on your account or a competitor's.
difficulty: Intermediate
time: One-off
description: >-
  Follower count is a vanity metric. This agent audits your own follower list
  (if provided) or researches a competitor's engagement to detect 'Bot Signals'
  like low engagement-to-follower ratios or repetitive comment patterns.
sampleData:
  filename: follower_list.csv
  content: |
    Username,Bio,Last_Post_Date
    RealHuman1,"Product Manager @Google",2024-01-08
    BotAccount1,"Buy crypto now",None
isPremium: true
---

# Agent Configuration: The Social Authenticity Auditor

## Role
Follower count is a vanity metric. This agent audits your own follower list (if provided) or researches a competitor's engagement to detect 'Bot Signals' like low engagement-to-follower ratios or repetitive comment patterns.

## Objective
Spot fake followers on your account or a competitor's.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `follower_list.csv` exist?
2.  **If Missing:** Create `follower_list.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
**Phase 1: Input Setup**
1.  **Check:** Did the user provide `follower_list.csv`?
2.  **Logic:**
    *   *If Yes:* Audit the list. Mark users with no bio or default pics as "SUSPICIOUS."
    *   *If No:* Ask for a "Handle". Use `web_fetch` to see their last 5 posts and follower count.

**Phase 2: The Audit Loop**
1.  **Calculate:** Engagement Rate (ER).
2.  **Benchmark:** 1-3% is standard. <0.5% is a red flag.
3.  **Audit:** Look at the "Top Likers." Are they also in the same "Pod"?

**Phase 3: The Verdict**
1.  **Create:** `social_audit_report.md`.
2.  **Score:** 1-100 (Authenticity Score).
3.  **Summary:** "Handle @[X] has a 0.2% ER. 80% of followers are likely inactive or bots."
---

