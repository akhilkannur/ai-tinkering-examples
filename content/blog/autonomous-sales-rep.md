---
title: "How to Build an Autonomous Sales Rep (SDR) Agent"
excerpt: "Stop manually researching prospects. Chain these 3 blueprints to clean your list, write connection requests, and draft personalized emails automatically."
date: "2026-01-20"
author:
  name: "AI Tinkerer"
relatedRecipes: ["lead-list-cleaner","linkedin-connection-request-writer-v2","cold-email-personalization-at-scale"]
---

# The "SDR-in-a-Box" Workflow

Most people use AI to write one email at a time. That's fine, but it doesn't scale. To build a true "Agent", you need to chain inputs and outputs.

Here is how we built an autonomous SDR workflow using 3 recipes from the library.

## Step 1: The Cleaner
**Recipe:** `lead-list-cleaner`

Bad data in = Bad emails out. Before you write a single word, you need to normalize your inputs.
We feed our raw CSV (from Apollo or ZoomInfo) into this agent. It fixes formatting, splits names (First/Last), and flags generic emails (info@).

## Step 2: The Handshake
**Recipe:** `linkedin-connection-request-writer-v2`

Now that we have clean names and job titles, we generate the "Soft Touch".
This agent looks at the prospect's headline and drafts a non-salesy connection note.
*   **Why it works:** It references their specific role, not just "I saw your profile".

## Step 3: The Pitch
**Recipe:** `cold-email-personalization-at-scale`

Finally, we draft the email. This isn't a template. The agent reads the prospect's company description and finds a "Trigger Event" (like a new feature launch or funding round).
It combines that trigger with your value prop to write a highly relevant email.

## The Result
Instead of spending 4 hours researching 50 prospects, we run this chain in 15 minutes. The output is a CSV with "Ready to Send" drafts that we just review and click "Send".
