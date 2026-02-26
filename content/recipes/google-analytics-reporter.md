---
title: GA4 Traffic Reporter
id: google-analytics-reporter
category: Marketing Ops
tagline: Automated traffic analytics and insight generation via the GA4 API.
time: 10 mins
archetype: Researcher
description: >-
  The automation we use to track performance on this site. It authenticates with
  Google Cloud via a Service Account, pulls top pages, user trends, and
  conversion data, and generates a plain-text briefing for the team.
inputs:
  - Google Service Account JSON
  - GA4 Property ID
outputs:
  - Plain-text traffic briefing
  - Growth velocity metrics
isPremium: true
---

# The Analytics Logic
This skill bridges the gap between raw Google Analytics data and actionable growth insights.

### Workflow:
1. Connect to GA4 Property ID `506136292`.
2. Fetch real-time traffic metrics for the last 30 days.
3. Identify top-performing blueprints and blog posts.
4. Calculate growth velocity.
5. Deliver a structured summary of 'What to Build Next'.
