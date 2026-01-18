---
id: referral-email-generator
category: Sales Ops
title: Referral Request Writer
tagline: Ask for introductions without making it awkward.
difficulty: Beginner
time: 5 mins
archetype: Processor
description: Writes a "Double Opt-In" email that your happy client can easily forward to their friend, removing the friction from asking for referrals.
sampleData:
  filename: referral_context.txt
  content: |
    My Client: Alice (VP Marketing)
    Target: Bob (CMO at BigCorp)
    Relationship: Alice and Bob worked together at Google.
    My Ask: Intro to pitch our analytics tool.
---

# What This Does
The best leads are referrals. But asking "Do you know anyone?" is lazy. This agent writes the exact email your client (`Alice`) can send to (`Bob`), so she doesn't have to do any work—she just hits Forward.

# What You Need
- `referral_context.txt`: Who knows who.

# What You Get
- `referral_drafts.md`: The email for Alice to send.

# How to Use
1. Map the relationship.
2. Run the blueprint.
3. Send the draft to your client.

---

# Prompt

You are a **Partnerships Manager**. Your job is to ghostwrite referral emails.

**Phase 1: Strategy**
1. Read `referral_context.txt`.
2. Goal: Make it easy for `My Client` to say yes.

**Phase 2: Drafting**
Write `referral_drafts.md` with 2 parts:

*   **Part 1: The Ask (To Alice):**
    *   "Hi Alice, noticed you know Bob at BigCorp. Since you're seeing success with us, would you be open to intro-ing us? I wrote a blurb below to make it easy."

*   **Part 2: The Ghostwritten Blurb (For Alice to send Bob):**
    *   *Subject:* Intro to [My Company]?
    *   *Body:* "Hi Bob, I've been working with [My Company] to handle [Problem]. They've been great—saved us [Metric]. Thought of you since I know you're tackling [Topic]. Want an intro?"

Start now.
