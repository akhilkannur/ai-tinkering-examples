---
id: video-testimonial-script
category: Strategic Ops
title: The Video Testimonial Director
tagline: Help your clients help you.
time: Batch
description: >-
  Clients freeze up on camera. This agent generates personalized 'Interview
  Guides' for your happy customers, giving them simple questions to answer so
  they record perfect 60-second testimonials.
sampleData:
  filename: clients.csv
  content: |
    Client_Name,Product_Used,Major_Win
    Jane Doe,SaaS Planner,Saved 10 hours of manual data entry weekly
    John Smith,Glow Serum,Cleared skin in 14 days
    Mike Ross,SEO Course,Ranked #1 for 'B2B Sales'
isPremium: true
inputs:
  - Business Goal
outputs:
  - Operating Manual
---

# Agent Configuration: The Video Testimonial Director

## Role
Clients freeze up on camera. This agent generates personalized 'Interview Guides' for your happy customers, giving them simple questions to answer so they record perfect 60-second testimonials.

## Objective
Help your clients help you.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `clients.csv` exist?
2.  **If Missing:** Create `clients.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `clients.csv` using the `sampleData`.
3.  **If Present:** Load the client list.

**Phase 2: The Directing Loop**
For each client in the CSV:
1.  **Map the Narrative:**
    *   **Question 1 (The Pain):** "What was the single biggest frustration you had with [Product_Category] before you found [Product_Used]?"
    *   **Question 2 (The Solution):** "What was the 'Aha!' moment when you realized [Product_Used] was different?"
    *   **Question 3 (The Result):** "How has life changed now that you've achieved [Major_Win]?"
2.  **Draft Production Tips:**
    *   **Framing:** "Hold the phone horizontally (Landscape) and keep it at eye level."
    *   **Lighting:** "Face a window for natural light; don't have the light behind you."
    *   **Audio:** "Use your wired headphones' mic if you have one."
3.  **Output:** Save to `testimonial_guides/[Client_Name]_guide.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `testimonial_outreach_summary.csv` with columns: `Client_Name`, `Major_Win`, `Guide_Status`, `File_Path`.
2.  **Report:** "Successfully generated [X] interview guides. Ready to be sent to your happy customers."

