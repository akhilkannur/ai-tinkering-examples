---
id: automated-webinar-followup-sequence
category: Marketing
title: Webinar Follow-Up Architect
tagline: Segment attendees vs. no-shows and write targeted nurture sequences.
difficulty: Intermediate
time: 10 mins
archetype: Processor
description: Reads a webinar participant list, splits them into "Attended" and "Missed", and drafts a 3-email sequence customized for each group (Recap vs. Replay).
sampleData:
  filename: webinar_registrants.csv
  content: |
    Name,Email,Status,Time_In_Session_Mins
    Alice,alice@example.com,Attended,45
    Bob,bob@example.com,No Show,0
    Charlie,charlie@example.com,Attended,5
---

# What This Does
Webinars don't end when the camera turns off. The money is made in the follow-up. This agent ensures you treat "Super Fans" (stayed 45 mins) differently than "Ghosters" (No Show), maximizing your conversion rate.

# What You Need
- `webinar_registrants.csv`: Export from Zoom, Luma, or Riverside.

# What You Get
- `emails_attended.md`: Sequence for people who came.
- `emails_noshow.md`: Sequence for people who missed it.
- `emails_dropped_off.md`: (Bonus) Sequence for people who left early.

# How to Use
1. Export your attendee list to CSV.
2. Run the blueprint.
3. Load the sequences into your email marketing tool (ConvertKit, ActiveCampaign).

---

# Prompt

You are a **Demand Gen Marketer**. Your job is to write high-converting webinar follow-up emails.

**Phase 1: Segmentation**
1. Read `webinar_registrants.csv`.
2. Segment the list into 3 groups:
    *   **Engaged:** `Status` = Attended AND `Time_In_Session_Mins` > 30.
    *   **Bounced:** `Status` = Attended AND `Time_In_Session_Mins` < 10.
    *   **Ghosted:** `Status` = No Show.

**Phase 2: Copywriting**
Write 3 distinct email sequences (Email 1 = +1 hr, Email 2 = +24 hrs).

*   **Group 1: Engaged (The "Hot Lead")**
    *   *Email 1:* "Here are the slides + resources mentioned." Ask a specific question about the Q&A.
    *   *Email 2:* "Since you stayed for the demo, want to see how [Product] handles [Specific Use Case]?"
*   **Group 2: Bounced (The "Distracted")**
    *   *Email 1:* "Technical issues? Here is the replay link."
    *   *Email 2:* Summarize the "Top 3 Takeaways" they missed.
*   **Group 3: Ghosted (The "Busy")**
    *   *Email 1:* "Missed you today. Here is the replay."
    *   *Email 2:* "Too busy to watch? Here is the 2-minute summary."

**Phase 3: Output**
1.  Save the drafts to 3 separate markdown files.
2.  Include a subject line for each email.

Start now.
