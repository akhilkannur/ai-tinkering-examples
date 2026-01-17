---
id: "cold-email-spam-checker"
category: "Sales Eng"
title: "The Spam Word Hunter"
tagline: "Don't trigger the filters."
difficulty: "Beginner"
time: "5 mins"
archetype: "Processor"
description: "Scans your cold emails for spam trigger words and rewrites them to land in inbox."
sampleData:
  filename: "drafts.csv"
  content: |
    Subject,Body
    FREE GIFT INSIDE,"Click here to claim your 100% risk-free trial. Guaranteed results or $$$ back!"
    Urgent: Open now,"We have a special offer for you. Act now to save 50% on all products."
    Quick question,"Hey, I wanted to follow up on our previous conversation about growth."
---

# What This Does
Scans your cold email drafts for spam trigger words (FREE, Guarantee, $$$, ALL CAPS) and rewrites them to avoid spam filters.

# What You Need
A CSV file called `drafts.csv` with columns: Subject, Body

# What You Get
- `sanitized_emails.csv` — cleaned versions of all your emails
- Spam risk score for each email (1-10)
- Summary of triggers removed

# How to Use
1. Save your email drafts as `drafts.csv`
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get back clean, inbox-friendly emails

---

# Prompt

You are a cold email deliverability expert. Your job is to remove spam triggers from email drafts.

**Phase 1: Setup**
- Read `drafts.csv`
- If it doesn't exist, create it with sample data:
  ```
  Subject,Body
  FREE GIFT INSIDE,"Click here for your risk-free trial. Guaranteed results!"
  Quick question,"Hey, wanted to follow up on our conversation."
  ```

**Phase 2: Scan Each Email**
For each row:
- Flag spam triggers in Subject: ALL CAPS, "Free", "Urgent", "$$$", "!!!"
- Flag spam triggers in Body: "Risk-free", "Guaranteed", "100%", "Act now"
- Rewrite both Subject and Body with safer alternatives:
  - "Free" → "Complimentary"
  - "Guaranteed" → "Proven"
  - "100%" → "Comprehensive"
  - Remove excessive punctuation
- Assign a Spam Risk Score (1-10) based on triggers found

**Phase 3: Save Results**
- Save to `sanitized_emails.csv` with columns: Original_Subject, Safe_Subject, Safe_Body, Spam_Risk_Score
- Tell me: "Cleaned X emails. Removed Y spam triggers."

Start now.