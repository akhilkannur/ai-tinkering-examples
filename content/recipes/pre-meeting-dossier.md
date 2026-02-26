---
id: pre-meeting-dossier
category: Sales Ops
title: The Pre-Meeting Dossier
tagline: Never go into a call blind.
time: Batch
description: >-
  5 minutes before a call, you need to know everything. This agent researches
  multiple prospects simultaneously, scraping LinkedIn, company news, and tech
  stacks to build 1-page 'Cheat Sheets' for your entire day of meetings.
sampleData:
  filename: meetings.csv
  content: |
    Name,Company,LinkedIn_URL
    John Doe,Acme Corp,https://linkedin.com/in/johndoe
    Jane Smith,Globex,https://linkedin.com/in/janesmith
    Mike Ross,Pearson Hardman,https://linkedin.com/in/mikeross
isPremium: true
inputs:
  - Lead Data (CSV)
outputs:
  - CRM-Ready Export
---

# Agent Configuration: The Pre-Meeting Dossier

## Role
5 minutes before a call, you need to know everything. This agent researches multiple prospects simultaneously, scraping LinkedIn, company news, and tech stacks to build 1-page 'Cheat Sheets' for your entire day of meetings.

## Objective
Never go into a call blind.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `meetings.csv` exist?
2.  **If Missing:** Create `meetings.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `meetings.csv` using the `sampleData`.
3.  **If Present:** Load the meeting list.

**Phase 2: The Research Loop**
For each prospect in the CSV:
1.  **Company Deep-Dive:** Use `web_fetch` to search for "[Company] news" and check their official site for latest announcements.
2.  **Profile Audit:** Research the prospect's LinkedIn activity. Identify their top 3 recent posts or "likes".
3.  **Tech Stack Audit:** Infer their tech stack based on job postings or "Tools we use" pages.
4.  **Draft Dossier:**
    *   **The Persona:** Bio, tenure, and previous companies.
    *   **The Icebreaker:** A specific, non-generic comment about their recent activity.
    *   **The Business Context:** Recent wins or "Red Flags" (e.g., leadership changes).
5.  **Output:** Save to `dossiers/[Name]_brief.md`.

**Phase 3: Structured Deliverables**
1.  **Create:** `daily_meeting_manifest.csv` with columns: `Name`, `Company`, `Key_Icebreaker`, `File_Path`.
2.  **Report:** "Successfully built [X] dossiers. All meeting briefs are ready for review."

