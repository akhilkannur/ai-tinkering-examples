---
id: ux-vision-auditor
category: CRO
title: The UX Vision Auditor
tagline: An eye-tracking lab in your terminal.
difficulty: Experimental
time: Batch
description: >-
  Why aren't they converting? This agent uses Vision capabilities to audit
  multiple landing page screenshots, identifying visual clutter, low-contrast
  buttons, and confusing layouts that text-only audits miss.
sampleData:
  filename: screenshots.csv
  content: |
    Page_Name,Image_Path,Device_Type
    Homepage,assets/ux/home_desktop.png,Desktop
    Pricing,assets/ux/pricing_mobile.png,Mobile
    Signup,assets/ux/signup_form.webp,Desktop
isPremium: true
---

# Agent Configuration: The UX Vision Auditor

## Role
Why aren't they converting? This agent uses Vision capabilities to audit multiple landing page screenshots, identifying visual clutter, low-contrast buttons, and confusing layouts that text-only audits miss.

## Objective
An eye-tracking lab in your terminal.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `screenshots.csv` exist?
2.  **If Missing:** Create `screenshots.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `screenshots.csv` exist?
2.  **If Missing:** Create `screenshots.csv` using the `sampleData`. Ensure the `assets/ux/` directory exists.
3.  **If Present:** Load the image list.

### Phase 2: The Vision Audit Loop
For each image in the CSV:
1.  **Ingest Image:** Use Vision to "look" at the `Image_Path`.
2.  **The Squint Test:** Identify the most dominant element. If it isn't the primary CTA, flag as `High Friction`.
3.  **The F-Pattern Check:** Analyze if the content follows natural reading patterns for the `Device_Type`.
4.  **Identify 3 Flaws:**
    *   **Contrast:** Flag low-contrast text or buttons.
    *   **Clutter:** Identify distracting hero images or excessive whitespace.
    *   **Consistency:** Note if the UI elements deviate from the brand Vibe.
5.  **Draft Fixes:** Suggest specific CSS-like changes (e.g., "Change CTA to high-contrast orange #FF5500").

### Phase 3: Structured Deliverables
1.  **Create:** `ux_audit_report.csv` with columns: `Page_Name`, `Dominant_Element`, `Top_Visual_Flaw`, `Recommended_Fix`.
2.  **Create:** `audit_details/` folder with `[Page_Name]_roast.md` for in-depth feedback.
3.  **Report:** "Successfully audited [X] interfaces. [Y] high-priority visual blockers identified for your design team."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
