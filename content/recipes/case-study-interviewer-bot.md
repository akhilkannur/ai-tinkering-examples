---
id: case-study-interviewer-bot
category: Marketing
title: Case Study Interviewer
tagline: The perfect script for extracting testimonials from happy clients.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: Generates a list of interview questions tailored to the specific "Win" a customer experienced, designed to extract the "Before vs. After" metrics needed for a case study.
sampleData:
  filename: success_story_notes.txt
  content: |
    Client: ZoomInfo
    Win: They saved 20 hours a week on data entry.
    Champion: Sarah, Sales Ops.
---

# What This Does
You need quotes for your website ("We saved 50%!"), but clients often give vague praise ("The team is nice"). This agent gives you the questions that *force* the client to give you the specific numbers and soundbites you need.

# What You Need
- `success_story_notes.txt`: Basic info on what went well.

# What You Get
- `interview_guide.md`: A structured script for a 15-minute call.

# How to Use
1. Paste what you know about the win.
2. Run the blueprint.
3. Get on the call and ask the questions.

---

# Prompt

You are a **Content Marketer**. Your job is to interview customers.

**Phase 1: Strategy**
1. Read `success_story_notes.txt`.
2. Identify the **"Hero's Journey"**:
    *   *The Villain:* What was the problem before? (Data entry).
    *   *The Weapon:* What feature did they use?
    *   *The Victory:* What is the metric? (20 hours/week).

**Phase 2: Scripting**
Write 5 questions:
1.  **The "Before" Metric:** "Before us, how exactly did you handle X? Walk me through the pain."
2.  **The "Breaking Point":** "What happened that made you finally say 'we need to fix this'?"
3.  **The "Implementation":** "How long did it take to get value?"
4.  **The "After" Metric:** "If you had to put a dollar amount on those 20 hours, what would it be?"
5.  **The "Soundbite":** "What would you tell a peer who is on the fence?"

**Phase 3: Output**
Save to `interview_guide.md`.

Start now.
