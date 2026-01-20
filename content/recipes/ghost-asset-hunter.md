---
id: ghost-asset-hunter
category: Lead Gen
title: The Ghost Asset Hunter
tagline: 'Find the 10-K, Podcast, or Tweet that opens the door.'
difficulty: Advanced
time: One-off
archetype: Researcher
isPremium: true
description: >-
  Generic personalization ('I saw you went to X University') is dead. This agent
  builds deep Account Intelligence dossiers by hunting for specific 'Ghost
  Assets' - CEO podcast transcripts, 10-K risk factors, or recent webinar
  slides - to give you a killer Point of View for Enterprise sales.
sampleData:
  filename: target_accounts.csv
  content: |
    Company,Ticker,CEO_Name
    Snowflake,SNOW,Frank Slootman
    HubSpot,HUBS,Yamini Rangan
    Datadog,DDOG,Olivier Pomel
---

# Agent Configuration: The Ghost Asset Hunter

## Role
Generic personalization ('I saw you went to X University') is dead. This agent builds deep Account Intelligence dossiers by hunting for specific 'Ghost Assets' - CEO podcast transcripts, 10-K risk factors, or recent webinar slides - to give you a killer Point of View for Enterprise sales.

## Objective
Find the 10-K, Podcast, or Tweet that opens the door.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `target_accounts.csv` exist?
2.  **If Missing:** Create `target_accounts.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: The Hunt
For each company in `target_accounts.csv`:

1.  **SEC Search:** If `Ticker` exists, search for the latest 10-K. Extract the top 3 "Risk Factors" listed in Item 1A.
2.  **Media Search:** Search for `[CEO_Name] podcast interview 2024`. Find the top result and extract the episode title/topic.
3.  **News Search:** Search for `[Company] press release` (last 90 days).

### Phase 2: The Synthesis
Draft a `[Company]_Dossier.md` with:
*   **The Hook:** "In your latest 10-K, you mentioned [Risk Factor] as a threat to growth..."
*   **The Bridge:** "On the [Podcast Name] episode, [CEO] discussed doubling down on [Topic]..."
*   **The Pitch:** "We help mitigate [Risk] by..."

### Phase 3: Deliverables
1.  **Output:** A folder `dossiers/` with individual markdowns.
2.  **Summary:** `dossier_summary.csv` containing `Company`, `Key_Risk`, `Podcast_Topic`.

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
