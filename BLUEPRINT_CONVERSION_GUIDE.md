# Blueprint Conversion Guide

Use this to convert old-format blueprints to the new user-friendly format.

## How to Use with Gemini CLI

Open Gemini CLI in the `ai-tinkering-examples` folder and paste:

```
Read BLUEPRINT_CONVERSION_GUIDE.md and convert the blueprint in content/recipes/[filename].md to the new format. Save in place.
```

Or batch convert:
```
Read BLUEPRINT_CONVERSION_GUIDE.md and convert all blueprints in content/recipes/ that still have the old format (contain "implement the logic in"). Convert 5 at a time.
```

---

## Old Format (Remove This)

```markdown
---
id: example
category: Sales Ops
title: The Example
tagline: Does something.
difficulty: Advanced
time: 15 mins
description: Long technical description...
sampleData:
  filename: input.csv
  content: |
    Col1,Col2
    Val1,Val2
---

## ⚡ Run this with AI (Fastest)
If you have **Claude Code** or **Gemini CLI** open in this folder, just copy and paste:

\`\`\`bash
implement the logic in public/blueprints/example/README.md
\`\`\`

**Option 2: The Manual Way**
If you prefer using the ChatGPT or Claude web browser, copy the strategy below.

---
# Agent Configuration: The Example

## Role
You are a **Technical Role Name**. You do technical things...

## Objective
Technical objective statement.

## Capabilities
*   **Capability 1:** Description.
*   **Capability 2:** Description.

## Workflow

### Phase 1: Something
1.  **Check:** Does file exist?
2.  **Action:** Do something.

### Phase 2: Loop
For each item:
1.  Process it.
2.  Save it.

### Phase 3: Output
1.  Create file.
2.  Report summary.
```

---

## New Format (Convert To This)

```markdown
---
id: example
category: Sales Ops
title: The Example
tagline: Does something useful.
difficulty: Beginner | Intermediate | Advanced
time: X mins
archetype: Processor | Researcher | Hybrid
description: One sentence, plain English, what it does.
sampleData:
  filename: input.csv
  content: |
    Col1,Col2
    Val1,Val2
---

# What This Does
One or two sentences in plain English. No jargon. What problem does it solve?

# What You Need
- A CSV file called `input.csv` with columns: Col1, Col2
- (Or any other input requirements)

# What You Get
- `output.csv` — description of output
- Any other files created
- Summary of results

# How to Use
1. Prepare your input file (or let it create sample data)
2. Open Claude Code, Gemini CLI, or Cursor in that folder
3. Copy and paste the prompt below
4. Get your results

---

# Prompt

You are a [simple role description]. Your job is to [simple objective].

**Phase 1: Setup**
- Read `input.csv`
- If it doesn't exist, create it with sample data:
  \`\`\`
  Col1,Col2
  Val1,Val2
  \`\`\`

**Phase 2: Process Each Row**
For each row in the CSV:
- Do step 1
- Do step 2
- Do step 3

**Phase 3: Save Results**
- Save to `output.csv`
- Tell me: "Processed X items. Results saved to output.csv."

Start now.
```

---

## Conversion Rules

### 1. Frontmatter Changes
- Keep: id, category, title, tagline, sampleData
- Simplify: description (one sentence, plain English)
- Add: `archetype` field
  - "Processor" = takes input, transforms it, outputs file
  - "Researcher" = searches/scrapes web, gathers info
  - "Hybrid" = both
- Adjust: difficulty (most should be Beginner or Intermediate)
- Adjust: time (realistic estimate: 5 mins, 10 mins, 15 mins, 20 mins)
- Remove: isPremium

### 2. Remove Entirely
- The "⚡ Run this with AI" section
- The `implement the logic in public/blueprints/...` code block
- The "Option 2: The Manual Way" line
- The "# Agent Configuration:" header
- The "## Role" section (merge into prompt)
- The "## Objective" section (merge into prompt)
- The "## Capabilities" section (delete, not useful)

### 3. Add New Sections
- `# What This Does` — plain English, one sentence
- `# What You Need` — input files/data required
- `# What You Get` — output files/results
- `# How to Use` — 4 simple steps
- `# Prompt` — the actual copy-paste prompt

### 4. Rewrite the Prompt
- Start with: "You are a [simple role]. Your job is to [simple task]."
- Use **Phase 1, Phase 2, Phase 3** structure
- Plain English, no jargon
- End with: "Start now."

### 5. Simplify Language
| Old (Technical) | New (Simple) |
|-----------------|--------------|
| "Execute `run_shell_command`" | "Run the command" |
| "Use `web_fetch` to teardown" | "Visit the website and find" |
| "Semantic clustering" | "Group related keywords" |
| "Batch processing" | "Process all rows" |
| "Artifact generation" | "Save the results" |

---

## Archetype Cheat Sheet

| If the blueprint... | Archetype |
|---------------------|-----------|
| Reads a CSV, transforms data, outputs file | Processor |
| Searches web, scrapes sites, gathers info | Researcher |
| Does both (reads file + web research) | Hybrid |

---

## Examples of Good Conversions

### Example 1: Lead List Cleaner (Processor)
- Input: CSV of leads
- Process: Check if websites are alive
- Output: Verified leads CSV + dead leads CSV

### Example 2: Competitor Spy (Researcher)
- Input: List of competitor names
- Process: Research pricing, reviews, weaknesses
- Output: Battle cards for each competitor

### Example 3: SEO Cluster Architect (Hybrid)
- Input: Keywords CSV (optional)
- Process: Research if no input, then plan content
- Output: Content cluster plan

---

## Checklist for Each Conversion

- [ ] Removed "implement the logic" block
- [ ] Removed "Agent Configuration" header
- [ ] Removed Role/Objective/Capabilities sections
- [ ] Added `archetype` to frontmatter
- [ ] Added "What This Does" section
- [ ] Added "What You Need" section
- [ ] Added "What You Get" section
- [ ] Added "How to Use" section
- [ ] Rewrote prompt in plain English
- [ ] Ends with "Start now."
- [ ] No tool-specific jargon (web_fetch, run_shell_command)
