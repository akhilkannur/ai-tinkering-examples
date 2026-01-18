---
id: tiktok-pixel-helper
category: Ad Ops
title: The TikTok Event Validator
tagline: Fix your conversion tracking from a snippet or a goal.
difficulty: Intermediate
time: Weekly
description: >-
  TikTok pixels are finicky. This agent audits your existing event code (if
  provided) or researches your product type to generate a standardized event
  snippet including 'Value' and 'Content ID' parameters.
sampleData:
  filename: current_pixel.txt
  content: |
    ttq.track('CompletePayment', { value: 100, currency: 'USD' });
isPremium: true
---

# Agent Configuration: The TikTok Event Validator

## Role
TikTok pixels are finicky. This agent audits your existing event code (if provided) or researches your product type to generate a standardized event snippet including 'Value' and 'Content ID' parameters.

## Objective
Fix your conversion tracking from a snippet or a goal.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `current_pixel.txt` exist?
2.  **If Missing:** Create `current_pixel.txt` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Context Choice
1.  **Check:** Did the user provide `current_pixel.txt`?
2.  **Logic:**
    *   *If Yes:* Audit the syntax. Check for missing quotes, wrong currency codes, or case-sensitivity errors.
    *   *If No:* Ask for "Event Type" (e.g., Purchase) and "Product Type" (e.g., E-com).

### Phase 2: The Logic Check
*   *Purchase Event:* Must have `value` and `currency`.
*   *ViewContent Event:* Must have `content_id`.
*   *Search Event:* Must have `query`.

### Phase 3: The Fix
1.  **Create:** `tiktok_pixel_fix.md`.
2.  **Code:** Provide the corrected snippet.
3.  **Summary:** "Your original code was missing [X]. The new version is now compliant with TikTok V3 standards."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
