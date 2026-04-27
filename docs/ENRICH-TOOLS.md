# Tool Enrichment Guide

## What Is Enrichment?

Each tool in `lib/ai-tools-data.ts` has an entry with basic submission data. "Enrichment" means visiting the tool's actual website and filling in real, verified details for these fields:

- `description` — A concise 1-2 sentence summary of what the tool actually does
- `features` — 3-5 specific, concrete capabilities
- `pricingDetails` — Actual pricing tiers/amounts from the website
- `integrations` — Real platforms/services the tool connects with
- `category` — Correct category based on what the tool does
- `tags.price` — One of: `"Free"`, `"Freemium"`, `"Paid"`

---

## How to Identify Tools That Need Enrichment

Tools with placeholder data have generic features like:

```
"Improves productivity", "Advanced AI features", "Time-saving tools"
"AI-powered automation", "Streamlined workflow", "Easy integration"
```

Run this to find them:

```bash
grep -n "Time-saving tools\|Streamlined workflow\|Easy integration\|AI-powered automation" lib/ai-tools-data.ts
```

~186 tools currently need enrichment.

---

## The Golden Rule: VISIT THE WEBSITE FIRST

**You MUST fetch/visit the tool's URL before writing any enrichment data.**

Use `web_fetch`, `read_web_page`, or whatever tool you have to read the actual website. If the site is down or inaccessible, **skip that tool** — do NOT guess or invent data.

### What Hallucination Looks Like (DO NOT DO THIS)

```typescript
// ❌ BAD - generic, made-up features with no relation to the actual product
features: ["AI-powered automation", "Streamlined workflow", "Easy integration"],

// ❌ BAD - vague description that could apply to anything
description: "An innovative AI platform that leverages cutting-edge technology to streamline workflows.",

// ❌ BAD - guessed integrations
integrations: ["Slack", "Zapier", "Google Sheets"],
```

### What Good Enrichment Looks Like

```typescript
// ✅ GOOD - specific features pulled from the actual website
features: [
  "Text-to-Video generation using Sora 2 and Veo 3.1 models",
  "Image-to-Video conversion with 98% motion consistency",
  "AI Avatar Generator with photorealistic lip-syncing",
  "Hollywood-grade cinematic effects and auto-soundtracks"
],

// ✅ GOOD - concise, factual description
description: "AI video generator that transforms text and images into professional videos using advanced models like Sora 2 and Veo 3.1.",

// ✅ GOOD - real integrations listed on the site
integrations: ["Sora 2", "Veo 3.1", "Kling 2.6", "Flux 2", "Discord"],

// ✅ GOOD - actual pricing from the website
pricingDetails: "Starts at $9/month (Basic) to $59/month (Premium)",
```

---

## Step-by-Step Enrichment Process

### 1. Pick a small batch (5-10 tools max per session)

Never try to enrich all tools at once. Work in small batches so you can verify each one.

### 2. For each tool, fetch its website

```
Read/fetch: tool.url
```

If the site doesn't load → **skip it, move to the next tool**.

### 3. Extract ONLY what you can verify from the page

| Field | Where to find it | Rules |
|-------|-------------------|-------|
| `description` | Homepage hero/tagline | 1-2 sentences. What it does + who it's for. No marketing fluff. |
| `features` | Features section, homepage | 3-5 bullet points. Use specific nouns and numbers from the site. |
| `pricingDetails` | Pricing page | Exact tier names and dollar amounts. If "Contact us" → write "Enterprise pricing (contact for details)". |
| `integrations` | Integrations page, footer, features | Only list integrations explicitly mentioned on the site. |
| `tags.price` | Pricing page | `"Free"` = completely free. `"Freemium"` = free tier + paid tiers. `"Paid"` = no free option. |
| `category` | Based on what it does | Use existing categories: `"Productivity"`, `"Code Assistance"`, `"Video & Audio"`, `"Image Generation"`, `"Copywriting"`, `"Marketing"` |

### 4. Update ONLY the fields you enriched

Do NOT modify fields that already have good data (like `dateAdded`, `maker`, `image`, `screenshot`). Only replace placeholder content.

### 5. Verify the edit compiles

```bash
npx tsc --noEmit lib/ai-tools-data.ts
```

---

## Rules to Prevent Data Destruction

1. **NEVER rewrite the entire file.** Only edit the specific tool entries you're enriching. Use targeted edits, not full file replacements.

2. **NEVER remove tools.** The file should only grow. If a tool seems invalid, leave it alone.

3. **NEVER touch enriched tools.** If a tool already has real features (not placeholders), specific integrations, and pricing — do not modify it.

4. **NEVER bulk-update all tools in one commit.** Maximum 10 tools per commit. This makes it easy to revert if something goes wrong.

5. **NEVER invent data.** If you can't find pricing info on the site, leave `pricingDetails` empty. If there are no integrations mentioned, don't add the field. An empty field is better than a wrong one.

6. **NEVER use these phrases** — they are markers of hallucinated/placeholder content:
   - "Improves productivity"
   - "Advanced AI features"
   - "Time-saving tools"
   - "AI-powered automation"
   - "Streamlined workflow"
   - "Easy integration"
   - "Cutting-edge technology"
   - "Innovative platform"
   - "Leverages AI"

7. **Commit after each batch** with a message listing the exact tools enriched:
   ```
   fix: enrich 5 tools with real website data (ToolA, ToolB, ToolC, ToolD, ToolE)
   ```

---

## Full Example: Before and After

### Before (placeholder)
```typescript
{
  name: "PropFirmCorner",
  description: "PropFirmCorner is a futures prop trading research platform...",
  url: "https://propfirmcorner.com",
  category: "Productivity",
  tags: { price: "Freemium" },
  image: "https://www.google.com/s2/favicons?domain=propfirmcorner.com&sz=128",
  screenshot: "/screenshots/propfirmcorner.webp",
  dateAdded: "2026-04-26",
  features: ["Improves productivity", "Advanced AI features", "Time-saving tools"],
}
```

### After (enriched by visiting propfirmcorner.com)
```typescript
{
  name: "PropFirmCorner",
  description: "Futures prop trading research platform with firm comparisons, rule breakdowns, payout tracking, and discount aggregation.",
  url: "https://propfirmcorner.com",
  category: "Productivity",
  tags: { price: "Free" },
  image: "https://www.google.com/s2/favicons?domain=propfirmcorner.com&sz=128",
  screenshot: "/screenshots/propfirmcorner.webp",
  dateAdded: "2026-04-26",
  features: [
    "Side-by-side prop firm comparison by rules, payouts, and platforms",
    "Editorial reviews with detailed rule breakdowns",
    "Profit and payout calculators for evaluation planning",
    "Live discount aggregation across firms"
  ],
  pricingDetails: "Free to use",
}
```

Notice: no integrations added because the site doesn't mention any. That's correct — don't invent them.

---

## Checklist Before Pushing

- [ ] Visited the actual website for every tool I enriched
- [ ] No placeholder phrases in any of my updates
- [ ] Did NOT modify any already-enriched tools
- [ ] Did NOT remove any tools
- [ ] File compiles: `npx tsc --noEmit lib/ai-tools-data.ts`
- [ ] Committed with a message listing the specific tools enriched
- [ ] Batch size ≤ 10 tools
