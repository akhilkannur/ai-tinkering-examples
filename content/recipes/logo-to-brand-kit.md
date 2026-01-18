---
id: logo-to-brand-kit
category: Content Ops
title: The Logo-to-Brand-Kit Generator
tagline: Instant design systems from your logos.
difficulty: Experimental
time: Batch
description: >-
  Launch landing pages fast for all your projects. This agent takes a list of
  logo files, extracts brand DNA (colors, font vibes), and generates CSS themes
  or Tailwind configs for every brand in your portfolio.
sampleData:
  filename: logos_to_process.csv
  content: |
    Brand_Name,Logo_File,Target_Framework
    NeoCloud,assets/logos/neocloud.png,Tailwind
    VelvetBloom,assets/logos/velvet.jpg,Plain CSS
    PixelPounce,assets/logos/pounce.svg,Tailwind
isPremium: true
---

# Agent Configuration: The Logo-to-Brand-Kit Generator

## Role
Launch landing pages fast for all your projects. This agent takes a list of logo files, extracts brand DNA (colors, font vibes), and generates CSS themes or Tailwind configs for every brand in your portfolio.

## Objective
Instant design systems from your logos.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `logos_to_process.csv` exist?
2.  **If Missing:** Create `logos_to_process.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `logos_to_process.csv` exist?
2.  **If Missing:** Create `logos_to_process.csv` using the `sampleData`. Ensure the `assets/logos/` directory exists.
3.  **If Present:** Load the logo list.

### Phase 2: The Extraction Loop
For each brand in the CSV:
1.  **Ingest:** Use image analysis to scan the `Logo_File`.
2.  **Color Audit:** Identify the `Primary`, `Secondary`, and `Accent` colors. Generate a 5-step monochromatic scale for each.
3.  **Typography Analysis:** Determine the font "vibe" (e.g., "Bold Sans-Serif", "Classic Serif"). Suggest 2 Google Font pairings (Heading and Body).
4.  **Draft Config:**
    *   **If [Tailwind]:** Generate a `tailwind.config.js` snippet with the custom colors and font families.
    *   **If [Plain CSS]:** Generate a `variables.css` file with CSS Custom Properties.

### Phase 3: Structured Deliverables
1.  **Create:** `brand_kits/` folder with `[Brand_Name]_theme.[ext]` for each entry.
2.  **Create:** `brand_dna_matrix.csv` with columns: `Brand_Name`, `Primary_Hex`, `Font_Heading`, `File_Path`.
3.  **Report:** "Successfully extracted brand DNA for [X] logos. Design systems ready for frontend implementation."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
