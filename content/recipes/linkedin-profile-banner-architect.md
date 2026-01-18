---
id: linkedin-profile-banner-architect
category: Social
title: The LinkedIn Banner Architect
tagline: Build a high-converting profile banner.
difficulty: Beginner
time: Batch
description: >-
  Your banner is prime real estate. This agent researches your niche and target
  audience to design text-based visual briefs for banners that state your value
  prop and social proof clearly across multiple profiles.
sampleData:
  filename: profiles.csv
  content: |
    Name,Job_Title,Niche
    Alex Rivera,SaaS Sales Lead,B2B Outbound
    Sarah Chen,UX Researcher,Enterprise Design
    Mike Ross,SEO Consultant,E-commerce Growth
isPremium: true
---

# Agent Configuration: The LinkedIn Banner Architect

## Role
Your banner is prime real estate. This agent researches your niche and target audience to design text-based visual briefs for banners that state your value prop and social proof clearly across multiple profiles.

## Objective
Build a high-converting profile banner.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `profiles.csv` exist?
2.  **If Missing:** Create `profiles.csv` using the `sampleData` provided in this blueprint.
3.  **If Present:** Load the data for processing.

### Phase 2: The Loop
### Phase 1: Input Check
1.  **Check:** Does `profiles.csv` exist?
2.  **If Missing:** Create `profiles.csv` using the `sampleData`.
3.  **If Present:** Load the profile list.

### Phase 2: The Niche Research Loop
For each profile in the CSV:
1.  **Market Research:** Use `web_fetch` to find top influencers or leaders in the `Niche`. Identify their banner themes (e.g., "Minimalist", "Bold Typography", "Action-Oriented").
2.  **Draft the Hero Hook:** "I help [Target Audience] achieve [Result] using [Unique Mechanism]."
3.  **Plan the Layout:**
    *   **The Hook:** Positioned for desktop and mobile visibility (center-right).
    *   **The Social Proof:** Mention of `Trusted by [Logos]` or specific achievements.
    *   **The CTA:** Strategic pointer to the profile's primary link.
4.  **Visual Brief:** Specify recommended color palettes and font styles based on the `Niche` research.

### Phase 3: Structured Deliverables
1.  **Create:** `banner_briefs/` folder with `[Name]_banner_brief.md` for each entry.
2.  **Create:** `banner_inventory.csv` with columns: `Name`, `Job_Title`, `Primary_Hook`, `File_Path`.
3.  **Report:** "Successfully architected [X] banner briefs. Ready for Canva or a graphic designer."
---

### Phase 3: Output
1.  **Generate:** Create the final output artifact as specified.
2.  **Summary:** detailed report of findings and actions taken.
