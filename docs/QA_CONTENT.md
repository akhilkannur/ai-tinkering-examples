# QA Checklist: Content & Recipes

## File Structure
- [ ] **Location:** All recipes must be in `content/recipes/`.
- [ ] **Extension:** Must be `.md` (Markdown).
- [ ] **Naming:** Kebab-case filenames (e.g., `abandoned-cart-sms.md`).

## Frontmatter Requirements (YAML)
Every file must start with a YAML block containing:

```yaml
---
title: "Title of the Recipe"
category: "Sales | Marketing | Operations" (Pick one dominant category)
time: "10" (Estimated minutes to complete)
tags:
  - "Tag 1"
  - "Tag 2"
summary: "A one-sentence hook describing the value."
---
```

### Validation Rules
- [ ] **Title:** Capitalize appropriately. No clickbait ("Wait until you see...").
- [ ] **Time:** Must be a number (string format "10" is okay).
- [ ] **Tags:** List of strings. Max 5 tags.
- [ ] **Summary:** Required for SEO meta descriptions.

## Content Body (Markdown)
- [ ] **Structure:**
    1. **Goal:** What are we building?
    2. **Tools Needed:** List of software/APIs.
    3. **Step-by-Step:** Numbered list with clear instructions.
    4. **Prompt:** Code block with the specific AI prompt to use.
- [ ] **Prompt Formatting:**
    - Use code fences (```) for prompts to make them easy to copy.
    - Prompts should be parameterized (e.g., `[Insert Product Name]`).

## Archetypes (for Automation)
- [ ] **Processor:** Input file -> Process -> Output.
- [ ] **Researcher:** Topic -> Web Search -> Summary.
- [ ] **Hybrid:** Optional file input + Research.
