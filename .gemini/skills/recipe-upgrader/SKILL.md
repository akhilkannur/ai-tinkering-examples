---
name: recipe-upgrader
description: Automates the upgrade of blueprint recipes to the "Work-Ready" format. Use when converting old blueprints in content/recipes/ to the new format with archetypes (Processor, Researcher, Hybrid) and simplified prompts.
---

# Recipe Upgrader

## Overview
This skill transforms old, technical blueprints into user-friendly "Work-Ready" versions. It standardizes frontmatter, simplifies sections, and rewrites prompts into a structured three-phase execution logic.

## Workflow

### 1. Identify Archetype
Analyze the existing blueprint's logic to categorize it into one of the three archetypes:
- **Processor:** Use if it primarily transforms local files (CSV, PDF, etc.).
- **Researcher:** Use if it primarily scrapes or searches the web.
- **Hybrid:** Use if it does both or enriches local files with web data.
Refer to [archetypes.md](references/archetypes.md) for detailed logic patterns.

### 2. Standardize Frontmatter
- Update the frontmatter block.
- Add `archetype: Processor | Researcher | Hybrid`.
- Set `difficulty` and `time` to realistic human values.
- Ensure `sampleData` is correctly formatted to seed missing files.

### 3. Simplify Content
- Delete all technical sections (e.g., "Run this with AI", "Agent Configuration").
- Generate the following user sections in plain English:
  - `# What This Does`
  - `# What You Need`
  - `# What You Get`
  - `# How to Use`
Refer to [conversion-guide.md](references/conversion-guide.md) for structural rules.

### 4. Rewrite the Prompt
Rewrite the blueprint's strategy into a high-quality prompt for a modern agent:
- **Role & Objective:** Start with "You are a [Role]. Your job is to [Goal]."
- **Phase 1: Setup:** Handle file reading and sample data creation.
- **Phase 2: Execution:** Loop through items/rows.
- **Phase 3: Output:** Save results to a structured file (CSV or MD).
- **Ending:** Always end the prompt with "Start now."

## Quality Standards
- No tool-specific jargon (e.g., don't mention `web_fetch` or `run_shell_command`).
- Every recipe must support batch processing if it involves data.
- Output filenames must be clear (e.g., `results.csv`, `report.md`).

## Reference Material
- **Conversion Rules:** [conversion-guide.md](references/conversion-guide.md)
- **Archetype Patterns:** [archetypes.md](references/archetypes.md)