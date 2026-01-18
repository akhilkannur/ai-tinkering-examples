---
id: sales-call-transcript-analyzer
category: Sales Ops
title: BANT Transcript Analyzer
tagline: Extract Budget, Authority, Need, and Timeline from call transcripts.
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: Reads a text transcript of a sales call, identifies the key BANT criteria, and generates a structured deal summary for your CRM.
sampleData:
  filename: transcript.txt
  content: |
    Sales Rep: So, what kind of budget are you working with for this project?
    Prospect: Well, the CFO has approved about $50k for Q3, but we need to move fast.
    Sales Rep: Who else needs to sign off?
    Prospect: Just me and the CTO. We want to be live by October.
---

# What This Does
It automates the "CRM Data Entry" drudgery. Instead of re-listening to calls or trusting your memory, this agent extracts the hard facts (Money, Decision Makers, Dates) directly from the text.

# What You Need
- `transcript.txt`: From Zoom, Gong, Otter, or Fireflies.

# What You Get
- `deal_memo.md`: A structured summary ready to paste into Salesforce/HubSpot.

# How to Use
1. Download the transcript from your recording tool.
2. Run the blueprint.
3. Paste the output into the "Notes" field of the deal.

---

# Prompt

You are a **Sales Manager**. Your job is to review call transcripts and extract qualification criteria.

**Phase 1: Read**
1. Read `transcript.txt`.

**Phase 2: Extract (BANT)**
Analyze the text and extract specific quotes or facts for:
*   **Budget:** Is there a number? A range? "Budget is approved" vs "We need to find budget."
*   **Authority:** Who is the speaker? Who else did they mention? (e.g., "I need to ask my boss").
*   **Need:** What is the pain point? Why are they buying?
*   **Timeline:** When do they need to go live? Any hard deadlines?

**Phase 3: Summarize**
Create `deal_memo.md` with this structure:
*   **Qualification Score:** (Low/Medium/High based on how many BANT items are clear).
*   **B.A.N.T. Summary:** Bullet points for each.
*   **Next Steps:** Infer the next action based on the end of the call (e.g., "Send proposal," "Schedule demo with CTO").

Start now.
