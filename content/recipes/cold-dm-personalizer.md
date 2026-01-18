---
id: cold-dm-personalizer
category: Lead Gen
title: The Cold DM Personalizer
tagline: Personalized outreach for 100 prospects at once.
difficulty: Beginner
time: Continuous
archetype: Hybrid
description: >-
  Slide into DMs without looking like a bot. This agent takes a list of
  LinkedIn/X profiles, analyzes their recent posts for 'emotional hooks', and
  drafts custom opening lines for your entire list.
sampleData:
  filename: prospects.csv
  content: |
    Name,Profile_URL,Target_Topic
    Ryan Carson,https://x.com/ryancarson,AI Agents
    Sahil Lavingia,https://x.com/shl,Creator Economy
    Justin Welsh,https://x.com/JustinWelsh,Solopreneurship
---

# Agent Configuration: The Cold DM Personalizer

## Role
Slide into DMs without looking like a bot. This agent takes a list of LinkedIn/X profiles, analyzes their recent posts for 'emotional hooks', and drafts custom opening lines for your entire list.

## Objective
Personalized outreach for 100 prospects at once.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `prospects.csv` exist?
2.  **If Missing:** Create `prospects.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `prospects.csv` exist?
2.  **If Missing:** Create `prospects.csv` with the sample data and headers.
3.  **If Present:** Load the profiles.

### Phase 2: The Deep Dive Loop
For each prospect in the CSV:
1.  **Read:** Use `web_fetch` to see their latest 3 posts.
2.  **Analyze:** Find one *specific* sentence or idea they mentioned that relates to the `Target_Topic`.
3.  **Draft:** Create 2 opening lines:
    *   *The Observational:* "I loved your point about [X] in your recent post..."
    *   *The Value-Add:* "Since you're focused on [Y], have you seen this..."

### Phase 3: Deliverable
1.  **Create:** `personalized_outreach.csv` with columns: `Name`, `Profile_URL`, `Draft_1`, `Draft_2`.
2.  **Report:** "Successfully personalized outreach for [X] prospects. Ready for your review."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
