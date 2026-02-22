# Real AI Examples - Master Skills

**500+ AI Blueprints. 5 Department Skills. One-Time Payment.**

This private repository contains the consolidated Master Skills for Real AI Examples customers.

---

## What's Inside

| File | Department | Workflows |
|------|------------|-----------|
| `sales-ops.md` | Sales Operations | 254 |
| `marketing-ops.md` | Marketing Operations | 118 |
| `seo-content.md` | SEO & Content | 106 |
| `revops-strategy.md` | RevOps & Strategy | 157 |
| `automation-dev.md` | Automation & Dev | 96 |

**Total: 500+ blueprints across 5 consolidated skill files**

---

## One-Click Install

### For Claude Code Users

```bash
# Install all 5 skills at once
npx skills add realaiexamples/master-skills-private
```

This will automatically copy all files to `~/.claude/skills/`.

### Manual Install

```bash
# Clone this repo
git clone git@github.com:realaiexamples/master-skills-private.git

# Copy to Claude Code skills folder
cp master-skills-private/*.md ~/.claude/skills/

# Or to agents skills folder (for Gemini CLI, etc.)
cp master-skills-private/*.md ~/.agents/skills/
```

---

## Usage Examples

Once installed, your AI agent will automatically recognize these skills. Just prompt naturally:

### Sales Ops
```
"From a sales-ops standpoint, how should I structure this outbound campaign?"
"Review my pipeline and suggest improvements based on the sales-ops playbook."
```

### Marketing Ops
```
"From a marketing-ops perspective, audit this campaign setup."
"Help me set up attribution tracking using the marketing-ops framework."
```

### SEO & Content
```
"Using the seo-content skill, analyze this page for optimization opportunities."
"Create a content cluster strategy based on the seo-content playbook."
```

### RevOps & Strategy
```
"From a revops-strategy angle, review our GTM plan."
"Help me set up OKRs using the revops-strategy framework."
```

### Automation & Dev
```
"Using the automation-dev skill, design a workflow for this process."
"Help me set up an AI agent using the automation-dev playbook."
```

---

## Updates

This repository is updated regularly with new workflows and improvements. To get updates:

```bash
cd master-skills-private
git pull origin main
```

Then re-copy the files to your skills folder:

```bash
cp *.md ~/.claude/skills/
```

---

## Compatible Tools

These skills work with:
- **Claude Code** (`.claude/skills/`)
- **Gemini CLI** (`.agents/skills/`)
- **Cursor** (`.cursor/rules/` or `.agents/skills/`)
- **Any AI agent** that reads markdown context files

---

## Support

Questions? Reach out at akhil@realaiexamples.com

---

## License

These files are for **personal use only**. Do not redistribute or share publicly.

© 2024 Real AI Examples. All rights reserved.
