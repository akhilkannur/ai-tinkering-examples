# Blueprint Conversion Guide

Use this to convert old-format blueprints to the new user-friendly format.

## Frontmatter Changes
- Keep: id, category, title, tagline, sampleData
- Simplify: description (one sentence, plain English)
- Add: `archetype` field ("Processor", "Researcher", or "Hybrid")
- Adjust: difficulty (Beginner | Intermediate | Advanced)
- Adjust: time (e.g., 5 mins, 10 mins)
- Remove: isPremium

## Structural Changes
Remove the following technical sections:
- "⚡ Run this with AI"
- `implement the logic in...` blocks
- "Option 2: The Manual Way"
- "# Agent Configuration" header
- "## Role", "## Objective", "## Capabilities"

Add the following user-friendly sections:
- `# What This Does` (1-2 sentences)
- `# What You Need` (Input files/data)
- `# What You Get` (Output files/results)
- `# How to Use` (4 simple steps)
- `# Prompt` (The new simplified prompt)

## Prompt Rewriting Rules
- Use **Phase 1: Setup**, **Phase 2: Process Each Row/Item**, **Phase 3: Save Results**
- Plain English, no jargon.
- Use `sampleData` to seed templates if input files are missing.
- End with "Start now."

## Jargon Translation
| Old (Technical) | New (Simple) |
|-----------------|--------------|
| "Execute `run_shell_command`" | "Run the command" |
| "Use `web_fetch` to teardown" | "Visit the website and find" |
| "Semantic clustering" | "Group related keywords" |
| "Batch processing" | "Process all rows" |
| "Artifact generation" | "Save the results" |
