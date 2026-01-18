---
id: linkedin-audio-event-planner
category: Content Ops
title: The Audio Event Planner
tagline: Live radio for B2B.
difficulty: Intermediate
time: Batch
description: >-
  LinkedIn Audio Events are low-friction webinars. This agent scripts 30-minute
  'Fireside Chats' for your entire event calendar, including intros, discussion
  points, and audience participation hooks.
sampleData:
  filename: events.csv
  content: |
    Topic,Guest_Name,Date
    Future of AI Agents,James Hawkins,2024-10-15
    Scaling SaaS Sales,Sarah Chen,2024-10-22
    Retention Strategies,Mike Ross,2024-10-29
isPremium: true
---

# Agent Configuration: The Audio Event Planner

## Role
LinkedIn Audio Events are low-friction webinars. This agent scripts 30-minute 'Fireside Chats' for your entire event calendar, including intros, discussion points, and audience participation hooks.

## Objective
Live radio for B2B.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `events.csv` exist?
2.  **If Missing:** Create `events.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `events.csv` exist?
2.  **If Missing:** Create `events.csv` using the `sampleData`.
3.  **If Present:** Load the event list.

### Phase 2: The Scripting Loop
For each event in the CSV:
1.  **Draft Intro (0-5m):** Create a high-energy welcome, guest introduction, and a prompt for attendees to "Share this event" with their network.
2.  **Map Discussion Points (5-20m):** Identify 3 core questions or topics tailored to the `Topic` and `Guest_Name`.
3.  **Stage Invite Logic (20-30m):** Draft specific prompts to invite audience members on stage (e.g., "Raise your hand if you've struggled with [X]").
4.  **Closing:** Draft a strong Call to Action (Newsletter signup, follow guest, etc.).
5.  **Output:** Save to `event_scripts/[Topic]_script.md`.

### Phase 3: Structured Deliverables
1.  **Create:** `event_calendar_summary.csv` with columns: `Topic`, `Guest_Name`, `Date`, `File_Path`.
2.  **Report:** "Successfully scripted [X] audio events. All Run of Show documents are ready for your moderator."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
