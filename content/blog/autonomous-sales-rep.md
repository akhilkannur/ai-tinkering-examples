---
title: "How to Build an Autonomous Sales Rep (SDR) Agent"
excerpt: "I used to spend Sunday nights manually researching 50 prospects. It killed my soul. Here is the exact stack I built to stop doing that."
date: "2026-01-20"
author:
  name: "AI Tinkerer"
relatedRecipes: ["lead-list-cleaner","linkedin-connection-request-writer-v2","cold-email-personalization-at-scale"]
---

# The Sunday Night Scramble

If you work in sales (or run a founder-led agency), you know the "Sunday Night Scramble." You realize you have zero meetings booked for next week, so you frantically open LinkedIn and start copy-pasting "Hey, saw your profile..." into 50 DMs.

It’s ineffective, it’s boring, and quite frankly, a robot could do it better.

So I built one that does.

This isn't some complex Python script. It’s just 3 text files (blueprints) chained together to act like a very diligent, very polite SDR who works while I sleep.

## Step 1: The Janitor
**Recipe:** `lead-list-cleaner`

Most people skip this and then wonder why their emails bounce.
I export my raw lead list from Apollo/ZoomInfo. It’s always messy. Names are in ALL CAPS, job titles are "Senior VP of Global Revenue Operations" (way too long), and half the emails are generic `info@`.

I feed this CSV to the **Janitor Agent**. It normalizes everything. "Senior VP..." becomes "VP Sales". "JOHN DOE" becomes "John". It’s a small step, but it’s the difference between looking like a spammer and a human.

## Step 2: The "Soft Touch"
**Recipe:** `linkedin-connection-request-writer-v2`

LinkedIn is strict now. You have limited invites. You can't waste them on generic "I'd like to add you to my network" notes.

This agent reads the prospect's headline and drafts a custom note.
*   **The Trick:** It *doesn't* pitch. It just references a specific keyword from their bio (e.g., "PLG" or "RevOps") and asks a curiosity question. My acceptance rate went from 15% to 42% just by switching to this logic.

## Step 3: The Sniper
**Recipe:** `cold-email-personalization-at-scale`

This is where the magic happens. I don't use templates anymore.
This agent Googles the prospect's company. It looks for a "Trigger Event" - a funding round, a new product launch, or a hiring surge.

It then writes an email that follows this structure:
1.  **Observation:** "Saw you just launched [New Feature]."
2.  **Problem:** "Usually that brings [Specific Pain]."
3.  **Solution:** "We fix that by [Value Prop]."

It’s simple, but because it references *their* news, it gets read.

## The Result
I run this chain on Monday mornings. By the time I finish my coffee, I have a CSV with 50 cleaned, researched, and drafted outreach sequences. I just check them for hallucinations and hit send.

Stop being a robot. Build one instead.