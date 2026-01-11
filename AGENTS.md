# AGENTS.md

## Project Overview
**Name:** AI Tinkering Examples
**Purpose:** A library of "Blueprints" (Markdown-based prompts) that instruct AI agents (Gemini CLI, Claude Code, Cursor) to perform specific professional tasks.
**Stack:** Next.js (TypeScript), Tailwind CSS, Lucide React.

## Directory Structure
*   `content/recipes/*.md`: **CRITICAL**. This is where all Blueprints live.
    *   **Format:** Markdown with Frontmatter.
    *   **Archetype:** Must be explicitly labeled "Processor", "Researcher", or "Hybrid".
*   `lib/recipes.ts`: Logic for parsing the Markdown files.
*   `pages/blueprints/[id].tsx`: The dynamic route that renders a blueprint.
*   `components/`: UI components (Navbar, ExampleCard, etc.).

## Contribution Guidelines for Agents

### 1. Creating a New Blueprint (Recipe)
When asked to create a new "recipe" or "blueprint", you MUST follow this strict format:

**File Path:** `content/recipes/your-recipe-slug.md`

**Content Template:**
```markdown
---
id: "your-recipe-slug"
category: "Category Name" (e.g., Sales Ops, SEO, Paid Media)
title: "The Title"
tagline: "Short punchy description."
difficulty: "Beginner" | "Intermediate" | "Advanced"
time: "Frequency" (e.g., Weekly, Daily, One-off)
archetype: "Processor" | "Researcher" | "Hybrid"
description: "2-3 sentences explaining the value."
sampleData:
  filename: "input_data.csv"
  content: |
    Col1,Col2
    Val1,Val2
---

# Agent Configuration: The [Persona Name]

## Role
You are a **[Role Name]**. [Description of persona].

## Objective
[Clear goal statement].

## Capabilities
*   **Skill 1:** Description.
*   **Skill 2:** Description.

## Workflow

### Phase 1: Initialization & Seeding
1.  **Check:** Does `input_data.csv` exist?
2.  **If Missing:** Create `input_data.csv` using the `sampleData` provided in this blueprint.

### Phase 2: The Loop
1.  **Read:** `input_data.csv`.
2.  Iterate through rows...
3.  Perform logic...

### Phase 3: Output
1.  **Save:** `output_file.csv`.
2.  **Summary:** "Report generated..."
```

### 2. "Work-Ready" Standards
*   **Seeding:** ALWAYS include logic to create the input CSV if it's missing. Agents must be self-sufficient.
*   **Looping:** Workflows should handle bulk data (CSV iteration), not single-shot prompts.
*   **Artifacts:** The final step must always be producing a tangible file (CSV, MD, JSON), not just chat text.

### 3. UI/Component Changes
*   When editing `[id].tsx` or `ExampleDetail.tsx`, ensure "Copy" and "Download" buttons are distinct for different tools (Gemini vs Claude).
*   Use `lucide-react` for icons.

## Common Commands
*   **Build:** `npm run build` (Run this to verify no TypeScript errors after changes).
*   **Dev:** `npm run dev`.

## Context Awareness
*   This project is **Tool Agnostic**. Blueprints should work in any high-level agentic environment.
*   We prioritize **Business Utility** (Sales, RevOps, Marketing) over generic "write a poem" tasks.
