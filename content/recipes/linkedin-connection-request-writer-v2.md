---
id: linkedin-connection-request-writer-v2
category: Sales Ops
title: Non-Cringe LinkedIn Connector
tagline: Writes connection requests that actually get accepted.
difficulty: Intermediate
time: 5 mins
archetype: Hybrid
description: Reads a prospect's LinkedIn profile (bio/posts), identifies a specific mutual interest or recent activity, and writes a warm, personalized connection note under 300 characters.
sampleData:
  filename: prospect_profile.txt
  content: |
    Name: Sarah Jenkins
    Headline: VP of Marketing at TechFlow
    About: Passionate about PLG and hiking. Just returned from a trip to Zion National Park.
    Recent Post: "Big news! TechFlow just raised our Series B."
---

# What This Does
Most connection requests are generic ("I'd like to add you to my network"). This agent proves you read their profile by referencing something specific (a hobby, a post, a shared skill), dramatically increasing acceptance rates.

# What You Need
- `prospect_profile.txt`: A copy-paste of their profile text.

# What You Get
- `connection_requests.md`: 3 variations of the message (Casual, Professional, Direct).

# How to Use
1. Copy the text from the prospect's LinkedIn profile.
2. Run the blueprint.
3. Send the request.

---

# Prompt

You are a **Social Selling Expert**. Your job is to write high-acceptance LinkedIn connection requests.

**Phase 1: Analysis**
1. Read `prospect_profile.txt`.
2. specific "Hooks":
    *   **Personal:** Hobbies, university, volunteer work.
    *   **Professional:** Recent promotion, funding news, specific skill.
    *   **Content:** A recent post they wrote or commented on.

**Phase 2: Drafting**
Write 3 options. **Constraint:** Must be under 300 characters.
*   **Option 1 (The Fan):** Mention a specific piece of content they wrote.
    *   *Example:* "Hi Sarah, saw your post about Series B—huge congrats! The point about PLG really resonated."
*   **Option 2 (The Common Ground):** Connect on a shared interest (infer from 'About').
    *   *Example:* "Hi Sarah, fellow hiking enthusiast here. Zion is on my bucket list! Would love to connect."
*   **Option 3 (The Peer):** Professional admiration.
    *   *Example:* "Hi Sarah, been following TechFlow's growth. Impressed by how you handled the rebrand."

**Phase 3: Review**
Ensure NO sales pitches. The goal is *only* to get the request accepted.

Start now.
