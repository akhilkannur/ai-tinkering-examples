---
title: "Tool Directory Manager"
id: tool-directory-manager
category: Strategic Ops
tagline: "Automated database maintenance for high-volume niche directories."
difficulty: Intermediate
time: 5 mins
archetype: Processor
description: "The automation we use to keep our 'Tool Directory' fresh. It fetches live CSV data from our public Google Sheet, filters for 'Pure Salestech' using Gemini intelligence, and automatically updates the site with new submissions."
inputs:
  - "Google Sheet CSV Export URL"
  - "Custom 'Pure Sales' filter logic"
outputs:
  - "Updated lib/ai-tools-data.ts"
  - "Slack status notification"
isPremium: true
---

# The Maintenance Logic
Manual directory management is dead. This skill ensures your listings are always accurate and free of spam.

### Workflow:
1. Fetch live CSV from Google Sheet export URL.
2. Filter entries: Exclude agencies, consultants, and non-sales tools.
3. Use Gemini to classify tool 'Archetypes' (Researcher, Processor, Hybrid).
4. Update `lib/ai-tools-data.ts` or local JSON.
5. Notify Slack of new verified additions.
