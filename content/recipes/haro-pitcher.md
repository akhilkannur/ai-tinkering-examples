---
id: haro-pitcher
category: Content Ops
title: The Bulk HARO Pitcher
tagline: Scan 100 media queries and draft 5 winning pitches.
time: Daily
description: >-
  Journalists move fast. This agent scans a large text file of media queries
  (from HARO or Connectively), identifies the ones you are actually qualified
  for, and drafts 'Ready-to-Send' pitches including your bio and headshot link.
sampleData:
  filename: media_queries.txt
  content: |
    Query: Looking for expert on AI in Sales. Outlet: Forbes. Deadline: 2pm.
    Query: Tips for small business taxes. Outlet: WSJ. Deadline: Tomorrow.
isPremium: true
inputs:
  - Source Draft
outputs:
  - Repurposed Assets
---

# Agent Configuration: The Bulk HARO Pitcher

## Role
Journalists move fast. This agent scans a large text file of media queries (from HARO or Connectively), identifies the ones you are actually qualified for, and drafts 'Ready-to-Send' pitches including your bio and headshot link.

## Objective
Scan 100 media queries and draft 5 winning pitches.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `media_queries.txt` exist?
2.  **If Missing:** Create `media_queries.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **Bio Setup:** Ask the user for their "Pitch Credentials" (Title, 2-sentence bio, headshot link).

**Phase 2: The Filter Loop**
1.  **Scan:** Iterate through every block in `media_queries.txt`.
2.  **Match:** Identify queries containing target keywords (e.g., "SaaS", "AI").
3.  **Qualify:** Ensure the user meets the journalist's requirements (e.g., "Must be a founder").

**Phase 3: Pitch Production**
For every qualified query found:
1.  **Draft:** Write a subject line: "RE: [Outlet Name] - [Bio Snippet]".
2.  **Write:** Draft a 3-paragraph pitch:
    *   *P1:* Why the journalist should listen to you.
    *   *P2:* The "Value Nugget" (The expert answer).
    *   *P3:* Link to further assets.

**Phase 4: Output**
1.  **Save:** Create `daily_pr_pitches.md` with all drafted emails.
2.  **Report:** "Found [X] opportunities. Pitch drafts are ready."

