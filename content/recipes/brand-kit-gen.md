---
id: brand-kit-gen
category: Content Ops
title: The Instant Brand Architect
tagline: Logo + Pattern + Vibe.
difficulty: Intermediate
time: Batch
archetype: Processor
description: >-
  Instantly create cohesive visual identity starter kits for multiple projects.
  This agent generates logos, seamless background patterns, and defines color
  palettes for an entire portfolio of brands.
sampleData:
  filename: brands.csv
  content: |
    Brand_Name,Description,Core_Vibe
    NeoCloud,Cloud storage for AI researchers,Minimalist and Secure
    VelvetBloom,Luxury organic skincare,Elegant and Botanical
    PixelPounce,A speed-focused gaming mouse,Aggressive and Tech-forward
isPremium: false
---

# Agent Configuration: The Instant Brand Architect

## Role
Instantly create cohesive visual identity starter kits for multiple projects. This agent generates logos, seamless background patterns, and defines color palettes for an entire portfolio of brands.

## Objective
Logo + Pattern + Vibe.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `brands.csv` exist?
2.  **If Missing:** Create `brands.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
2.  **If Missing:** Create `brands.csv` using the `sampleData`.
3.  **If Present:** Load the brand list.

**Phase 2: The Design Loop**
For each brand in the CSV:
1.  **Define Palette:** Map the `Core_Vibe` to 3 hex codes (Primary, Secondary, Accent).
2.  **Logo Creation:** Use `generate_icon` to create a logo based on the `Brand_Name` and `Description`.
3.  **Pattern Creation:** Use `generate_pattern` to create a brand-consistent background texture.
4.  **Draft Guidelines:** Create `brand_kits/[Brand_Name]_guidelines.md` including:
    *   **The Palette:** Hex codes and usage rules.
    *   **Typography:** Recommended Google Fonts.
    *   **Assets:** Links to the generated logo and pattern.

**Phase 3: Structured Deliverables**
1.  **Create:** `brand_kits/` folder containing all assets and markdown files.
2.  **Create:** `design_manifest.csv` with columns: `Brand_Name`, `Primary_Color`, `Logo_File`, `Pattern_File`.
3.  **Report:** "Successfully architected [X] brand kits. Visual assets saved to the `brand_kits/` directory."

