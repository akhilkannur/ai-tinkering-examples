---
id: gdpr-cookie-banner-copy
category: Strategic Ops
title: The Converting Cookie Banner
tagline: Compliance that doesn't kill data.
difficulty: Beginner
time: Batch
description: >-
  Cookie banners annoy users and kill data collection. This agent writes 'Human'
  copy for your consent manager that explains *why* you track, increasing your
  'Accept' rate across all your properties.
sampleData:
  filename: brands.csv
  content: |
    Brand_Name,Business_Type,Vibe
    Pawsome,E-commerce for pets,Playful
    FinGuard,Cybersecurity,Professional & Trustworthy
    BrewBase,Coffee subscription,Casual & Direct
isPremium: true
---

# Agent Configuration: The Converting Cookie Banner

## Role
Cookie banners annoy users and kill data collection. This agent writes 'Human' copy for your consent manager that explains *why* you track, increasing your 'Accept' rate across all your properties.

## Objective
Compliance that doesn't kill data.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `brands.csv` exist?
2.  **If Missing:** Create `brands.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `brands.csv` exist?
2.  **If Missing:** Create `brands.csv` using the `sampleData`.
3.  **If Present:** Load the brand list.

### Phase 2: The Drafting Loop
For each brand in the CSV:
1.  **Map Benefits:** Identify the top 2 benefits of cookies for their `Business_Type` (e.g., "Auto-login", "Cart memory", "Personalized discounts").
2.  **Draft 3 Options:**
    *   **The Transparent:** Direct explanation of what is tracked.
    *   **The Vibe-Match:** Copy written in the brand's specific `Vibe`.
    *   **The Minimalist:** A 1-sentence "Fast Accept" version.
3.  **Compliance Check:** Ensure "Manage Preferences" and "Reject All" are included in the structure.

### Phase 3: Structured Deliverables
1.  **Create:** `cookie_banner_copy.csv` with columns: `Brand_Name`, `Option_1_Copy`, `Option_2_Copy`, `Button_Accept_Text`.
2.  **Report:** "Successfully generated [X] cookie banners. Optimized for high consent rates and brand alignment."

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
