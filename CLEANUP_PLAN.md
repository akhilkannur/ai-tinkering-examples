# Real AI Examples — Site Cleanup & Refocus Plan

> **Goal:** Strip the site down to what works, fix SEO damage, and create a sustainable flywheel that doesn't cause burnout.
>
> **Date:** March 25, 2026
>
> **Guiding principle:** Two things to maintain, max. One feeds the other.

---

## Current State Audit

### What exists today

| Section | Route | Page count | Source | Verdict |
|---|---|---|---|---|
| Homepage | `/` | 1 | Hardcoded featured ideas | ❌ REWRITE — currently pitches "668 ideas", looks AI-generated |
| Curated AI Examples | `/ai-examples` | 26 pages (22 local + Airtable) | `lib/social-examples-data.ts` + Airtable | ✅ KEEP — this IS the brand |
| Tool Directory | `/tools` + `/tools/[slug]` | ~109 in sitemap, 500 unique submissions | `lib/ai-tools-data.ts` + submissions | ✅ KEEP — only organic traction |
| Setup Service | `/agent-setup-service` | 1 | Standalone page | ✅ KEEP — monetization, but needs funnel |
| Blog | `/blog` | 19 posts | `content/blog/*.md` | ✅ KEEP — good supporting content |
| Skills (recipes) | `/skills/[id]` | 736 pages | `content/recipes/*.md` | ❌ REMOVE — AI-generated slop, no traffic |
| Ideas | `/ideas/[id]` | 658 pages | `lib/ideas-data.json` | ❌ REMOVE — duplicate of skills in different skin |
| How-To | `/how-to/[slug]` | 736 pages | `content/recipes/*.md` | ❌ REMOVE — yet another view of same recipes |
| 500 Ways | `/500-ways-to-use-llms-for-work` | 1 (lists all recipes) | recipes | ❌ REMOVE — mega-listicle of AI slop |
| Generators | `/generators/[task]` | 6 pages | recipes filtered by task | ❌ REMOVE — no search intent |
| Playbook | `/playbook/[slug]` | 6 in sitemap | recipes | ❌ REMOVE |
| AI Quiz | `/ai-workplace-quiz` | 1 | Component | ❌ REMOVE |
| Personality Quiz | `/ai-workplace-personality` | 1 | Component | ❌ REMOVE |
| Build Club | `/build-club` | 1 | Standalone | ❌ REMOVE |
| Prompt Bundle | `/prompt-bundle` | 1 | Standalone | ❌ REMOVE |
| Skill Architect | `/skill-architect` | 1 | Standalone | ❌ REMOVE |
| Context Library | `/context` | 1 | Standalone | ❌ REMOVE |
| Stacks | `/stacks` | 1 | Standalone | ❌ REMOVE |
| State of AI 2026 | `/state-of-ai-2026` | 1 | Standalone | ⚠️ OPTIONAL KEEP — if it has traffic |
| Learn AI | `/learn-ai` | 1 | Standalone | ❌ REMOVE |
| Ideas Database | `/ideas-database` | 1 | Shows all ideas | ❌ REMOVE |
| Setup Guides | `/setup/claude-code`, `/setup/gemini-cli` | 2 | Standalone | ⚠️ OPTIONAL KEEP — supports setup service |
| Investors | `/investors` | 1 | Standalone | ❌ REMOVE |
| Jobs | `/jobs` | 1 | Standalone | ❌ REMOVE |

### SEO Damage (Google Search Console)

- **661 URLs returning 404** — all under `/ai-examples/{recipe-slug}` (old route that mapped recipes as examples)
- These were crawled Jan 21-23, 2026 and Google flagged them as "Not found (404)"
- This is actively hurting crawl budget and domain trust

### The site after cleanup: ~140 pages (26 examples + ~109 tools + 19 blog + 5 core pages)

---

## Phase 1: Stop the Bleeding (404s & Sitemap) — Day 1

### 1.1 Fix the 661 broken URLs

The 404s are at `/ai-examples/{recipe-slug}` — these are old recipe URLs that Google crawled.

**Action:** In `pages/ai-examples/[...slug].tsx`, the catch-all route already tries to redirect recipes to `/how-to/automate-{id}`. But since we're removing `/how-to` too, we need these to return **410 Gone** (tells Google "this page is intentionally removed, stop crawling").

**File:** `pages/ai-examples/[...slug].tsx`
```
// In getStaticProps, change the recipe redirect block:
// BEFORE:
if (recipe) {
  return { redirect: { destination: `/how-to/automate-${recipe.id}`, permanent: true } };
}

// AFTER:
// Return 410 Gone for old recipe URLs (they've been permanently removed)
// The notFound: true with proper headers handles this
```

**Better approach:** Create a custom 404/410 handler or add a middleware/redirect rule that returns 410 for any `/ai-examples/{slug}` that doesn't match a real curated example.

**Simplest approach:** Since `getStaticProps` already returns `notFound: true` for non-matching slugs, we just need to ensure:
1. The recipe redirect block is removed (don't redirect to `/how-to` since that's going away)
2. Configure Next.js to return 410 instead of 404 for these known-dead URLs

**Implementation option — next.config.js redirects:**
```js
// Add to next.config.js — redirect all old recipe URLs to homepage with 410
// Unfortunately Next.js doesn't support 410 in redirects, so use rewrites + custom page
// OR simply let them 404 — Google will eventually de-index them
// The KEY thing is to remove them from the sitemap
```

**Minimum viable fix:**
- Remove recipe URLs from sitemap
- Let the existing `notFound: true` handle them as 404s
- Google will de-index them over weeks

### 1.2 Clean the sitemap

**File:** `public/sitemap.xml` (or the script that generates it)

Remove ALL of these URL patterns:
- `/skills/*` (17 URLs currently in sitemap)
- `/playbook/*` (6 URLs)
- `/generators/*` (6 URLs)
- `/500-ways-to-use-llms-for-work`
- `/ai-workplace-quiz`
- `/ai-workplace-personality`
- `/build-club`
- `/prompt-bundle`
- `/context`
- `/investors`
- `/jobs`
- `/learn-ai`
- `/state-of-ai-2026` (unless keeping)

**Keep in sitemap:**
- `/` (homepage)
- `/about`
- `/ai-examples` (index)
- `/ai-examples/{category}/{slug}` (the 26 real curated examples — add them!)
- `/tools` (index)
- `/tools/[slug]` (individual tool pages)
- `/tools/for-marketers`, `/tools/for-developers`, `/tools/for-content-creators`, `/tools/free-ai-tools`
- `/blog/*` (19 blog posts)
- `/agent-setup-service`
- `/setup/claude-code`, `/setup/gemini-cli` (if keeping)
- `/privacy`, `/terms`

### 1.3 Add robots.txt noindex for dead sections

**File:** Create or update `public/robots.txt`
```
User-agent: *
Disallow: /skills/
Disallow: /ideas/
Disallow: /how-to/
Disallow: /generators/
Disallow: /playbook/
Disallow: /500-ways-to-use-llms-for-work
Disallow: /ai-workplace-quiz
Disallow: /ai-workplace-personality
Disallow: /build-club
Disallow: /prompt-bundle
Disallow: /context
Disallow: /investors
Disallow: /jobs
Disallow: /learn-ai
Disallow: /skill-architect
Disallow: /stacks
Disallow: /ideas-database

Sitemap: https://realaiexamples.com/sitemap.xml
```

### 1.4 Add noindex meta tags to pages being removed

For every page we're removing, add `<meta name="robots" content="noindex, nofollow" />` in the `<Head>` tag. This is belt-and-suspenders with robots.txt.

**Files to add noindex to:**
- `pages/skills/[id].tsx`
- `pages/ideas/[id].tsx`
- `pages/how-to/[slug].tsx`
- `pages/generators/[task].tsx`
- `pages/playbook/[slug].tsx`
- `pages/500-ways-to-use-llms-for-work.tsx`
- `pages/ai-workplace-quiz.tsx`
- `pages/ai-workplace-personality.tsx`
- `pages/build-club.tsx`
- `pages/prompt-bundle.tsx`
- `pages/context.tsx`
- `pages/investors/index.tsx`
- `pages/jobs/index.tsx`
- `pages/learn-ai.tsx`
- `pages/skill-architect.tsx`
- `pages/stacks.tsx`
- `pages/ideas-database.tsx`

> **Why noindex instead of deleting the pages immediately?**
> Deleting pages while they're still indexed causes more 404s.
> Step 1: noindex them → Google de-indexes over 2-4 weeks.
> Step 2: After they're de-indexed, delete the files in Phase 3.

---

## Phase 2: Restructure Navigation & Homepage — Day 2-3

### 2.1 Simplify the Navbar

**File:** `components/Navbar.tsx`

```typescript
// BEFORE (7 links):
const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/ai-examples', label: 'LIBRARY' },
  { href: '/ideas-database', label: 'IDEAS DATABASE' },
  { href: '/agent-setup-service', label: 'SETUP' },
  { href: '/tools', label: 'TOOL DIRECTORY' },
  { href: '/blog', label: 'BLOG' },
  { href: '/about', label: 'ABOUT' },
];

// AFTER (5 links):
const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/ai-examples', label: 'EXAMPLES' },
  { href: '/tools', label: 'TOOLS' },
  { href: '/blog', label: 'BLOG' },
  { href: '/agent-setup-service', label: 'GET SETUP' },
];
```

### 2.2 Rewrite the Homepage

**File:** `pages/index.tsx`

The homepage should answer: **"What is this site?"** in 3 seconds.

**New structure:**
```
[Hero]
"Real AI Examples — See exactly how people are using AI at work."
"Not prompts. Not tools. Real workflows with screenshots and results."
[Browse Examples →]

[Featured Examples Grid — 6-8 of the best curated examples]
(Pull from social-examples-data.ts — the REAL ones, not the AI-generated ideas)

[Tool Directory Teaser]
"Explore 100+ AI tools submitted by builders"
[View Directory →]

[Setup Service CTA]
"Want to set this up yourself? I'll do it with you in 90 minutes."
[Book a Sprint — $99 →]

[Blog Teaser — latest 3 posts]
```

**Key change:** Featured items come from `lib/social-examples-data.ts` (the real 22 curated examples), NOT from the hardcoded `featuredIdeas` array which pulls from the AI-generated ideas.

### 2.3 Add Setup Service CTA to every example page

**File:** `pages/ai-examples/[...slug].tsx` or `components/ExampleBody.tsx`

At the bottom of every curated example, add a soft CTA:
```
---
💡 Want to build a workflow like this?
Book a 90-minute setup sprint. I'll install the tools and build 
3 automations with you. $99, money-back guarantee.
[Book My Sprint →]
---
```

This is the flywheel: Example → "I want that" → Setup service.

---

## Phase 3: Delete Dead Code — Week 2 (after Google de-indexes)

> **Wait 2-4 weeks after Phase 1 before doing this.**
> Check Google Search Console to confirm the noindexed pages are being removed.

### 3.1 Pages to delete

```
pages/skills/                          # entire directory
pages/skills/category/                 # entire directory
pages/ideas/                           # entire directory
pages/how-to/[slug].tsx                # keep how-to/index.tsx and market-saas-zero-budget.tsx if they have value
pages/generators/[task].tsx            # keep docs-to-context.tsx and skill-extractor.tsx if useful
pages/playbook/                        # entire directory
pages/500-ways-to-use-llms-for-work.tsx
pages/ai-workplace-quiz.tsx
pages/ai-workplace-personality.tsx
pages/build-club.tsx
pages/prompt-bundle.tsx
pages/context.tsx
pages/investors/index.tsx
pages/jobs/index.tsx
pages/learn-ai.tsx
pages/skill-architect.tsx
pages/stacks.tsx
pages/ideas-database.tsx
```

### 3.2 Components to delete (only used by removed pages)

Review each before deleting — confirm no remaining page imports them:
```
components/AiQuiz.tsx               # used by ai-workplace-quiz
components/ArchetypeQuiz.tsx        # used by ai-workplace-personality
components/QuizCertificate.tsx      # used by quiz
components/BuilderFlowchart.tsx     # check usage
components/DatabaseDownloadCta.tsx  # used by 500-ways & generators
components/StickyActionBar.tsx      # used by 500-ways & generators
components/StrategicKits.tsx        # check usage
components/JobCard.tsx              # used by jobs
```

### 3.3 Data files to delete (or archive)

```
lib/ideas-data.json                 # 11K lines, powers /ideas/[id]
content/recipes/*.md                # 736 files, powers /skills, /how-to, /playbook, /generators
lib/cookbook-data.ts                 # recipe types & helpers (check if tools pages depend on it)
```

> **Before deleting recipes:** Check that `pages/ai-examples/[...slug].tsx` no longer references `getAllRecipes()`. Remove that import and the recipe-redirect logic in `getStaticProps`.

### 3.4 Remove dead sitemap entries

If using static `public/sitemap.xml`, regenerate it with only the kept pages.
If using a script/API route, update the generation logic.

### 3.5 Clean up public/ assets

```
public/pdfs/                        # ~20+ PDFs for recipes — delete
public/downloads/skills/             # skill download files — delete
public/sitemap-pdfs.xml              # delete
```

---

## Phase 4: Grow the Core — Ongoing

### 4.1 Curated Examples (the content engine)

**Target:** 2-3 new curated examples per week.

**Where to find them:**
- Twitter/X — search "I built", "I automated", "claude code", "AI workflow"
- Reddit — r/ClaudeAI, r/ChatGPT, r/artificial, r/SaaS
- LinkedIn — follow AI builders
- Hacker News — Show HN posts about AI tools/workflows

**Format per example:**
1. Title: What the person did
2. Screenshot(s) of the actual workflow/result
3. 2-3 paragraphs of context (who, what tool, what problem)
4. Link to original source
5. Tags for categorization

**This is NOT AI-generated content.** This is curation — you find it, screenshot it, write a few lines of context. 15-20 minutes per example.

### 4.2 Tool Directory (the backlink engine)

**Keep doing what you're doing.** Tools submit themselves. You approve and list.

**Small improvements when you have energy:**
- Add "Featured this week" section on `/tools`
- Ask submitters to link back to their listing (backlink exchange)
- Tweet about interesting new submissions (free content + engagement)

### 4.3 Setup Service (monetization)

**Don't change the page.** It's well-written.

**Change the funnel:**
- Every curated example page gets the CTA (Phase 2.3)
- Blog posts about "how to set up Claude Code" etc. link to the service
- Setup guides (`/setup/claude-code`, `/setup/gemini-cli`) should funnel to the paid service for the "done with you" option

**The conversion path:**
```
Visitor finds example via Google → reads it → sees CTA → books sprint
```

This only works with volume. 26 examples won't drive enough traffic.
100+ examples with proper SEO = realistic funnel.

### 4.4 Blog (supporting content)

Keep the 19 existing posts. Write new ones only when:
- You actually built something worth sharing (like the screenshot engine post)
- A blog post supports SEO for a cluster (e.g., "How to use Claude Code for SEO audits" → links to curated examples of people doing that)

**Do NOT force blog output.** Quality > quantity here.

---

## Verification Results (March 25, 2026)

### Completed Successfully ✅
- **Phase 1.1**: Recipe redirect removed from `pages/ai-examples/[...slug].tsx` — no longer imports getAllRecipes or redirects to /how-to
- **Phase 1.3**: robots.txt updated with 17 Disallow rules for dead sections
- **Phase 1.4**: noindex meta added to 20 pages (verified via grep)
- **Phase 2.1**: Navbar simplified — removed "HOME" link (now 4 links: EXAMPLES, TOOLS, BLOG, GET SETUP)
- **Phase 2.2**: Homepage rewritten with curated examples grid, tools teaser, setup CTA
- **Phase 2.3**: Setup CTA added to ExampleBody.tsx (lines 109-121)
- **Footer cleaned**: Removed dead links (quiz, prompt-bundle, investors, jobs, learn-ai, stacks, context)
- **sitemap-pdfs.xml deleted**
- **Homepage redirect**: `/` now 301 redirects to `/ai-examples` (examples is the main thing)
- **Link audit fixed**: Updated all old references (`/`, `/#newsletter`, `/#blueprints`, `/#skills`, `/ideas-database`) to point to `/ai-examples` or `/blog`
- **Redirects updated**: `/skills` and `/blueprints` now redirect to `/ai-examples` in next.config.js

### Issues Found ⚠️
1. **Static sitemap.xml outdated**: Contains only 139 URLs, but build generates 181 URLs. The static file needs regeneration.
2. **Missing URLs in static sitemap**:
   - `/agent-setup-service` not included
   - Individual `/ai-examples/{category}/{slug}` pages missing
3. **Dead pages not deleted (Phase 3)**: Still present but noindexed — waiting for Google de-index

### How Dead Pages Work
- Pages like `/skills`, `/how-to`, `/500-ways-to-use-llms-for-work` still exist as files
- Each has `<meta name="robots" content="noindex, nofollow" />` — Google won't index them
- robots.txt blocks crawlers: `Disallow: /skills/`, etc.
- Old URLs redirect to `/ai-examples` via next.config.js
- Phase 3 (deletion) planned for Week 4+ after Google de-indexes

### Next Steps
1. [x] Regenerate sitemap.xml to match build output (181 URLs)
2. [x] Deploy updated site (homepage redirect + link audit)
3. [ ] Monitor GSC for 404 reduction
4. [ ] Phase 3 deletion in 2-4 weeks

---

## Execution Order Summary

```
Week 1, Day 1:
  ✅ Add noindex meta to all pages being removed (Phase 1.4) — 19 files updated
  ✅ Update robots.txt (Phase 1.3) — blocks /skills/, /ideas/, /how-to/, /generators/, /playbook/ + standalone pages
  ✅ Clean sitemap.xml (Phase 1.2) — 175 → 137 URLs (removed 42 dead URLs, added setup service)
  ✅ Remove recipe redirect in ai-examples/[...slug].tsx (Phase 1.1) — removed getAllRecipes import + redirect logic
  ✅ Deleted sitemap-pdfs.xml
  ☑ Deploy (pending sitemap fix)

Week 1, Day 2-3:
  ✅ Simplify navbar (Phase 2.1) — 7 links → 5 links, removed "The Kit" purchase button
  ✅ Rewrite homepage (Phase 2.2) — now shows curated examples, tools teaser, setup CTA
  ✅ Add setup CTA to example pages (Phase 2.3) — CTA added to ExampleBody.tsx
  ✅ Clean footer — removed dead links (quiz, prompt bundle, investors, learn-ai, role pages)
  ☑ Deploy (pending sitemap fix)

Week 1, Day 4 (Link Audit - March 25):
  ✅ Homepage redirect: / → /ai-examples (301 permanent)
  ✅ Link audit: Fixed all old references (/#newsletter, /#blueprints, /#skills, /ideas-database) → /ai-examples
  ✅ Updated next.config.js: /skills and /blueprints now redirect to /ai-examples
  ✅ Deployed

Week 2-4:
  ☑ Monitor GSC — confirm noindexed pages dropping out
  ☐ Start adding 2-3 curated examples per week (Phase 4.1)

Week 4+:
  ☐ Delete dead pages, components, and data files (Phase 3)
  ☐ Final sitemap regeneration
  ☐ Continue example curation cadence
```

---

## Final Site Structure

```
realaiexamples.com/
├── /                          → 301 redirect to /ai-examples
├── /ai-examples               → Curated real-world AI examples (THE core)
│   ├── /category/{cat}        → Category filters
│   └── /{category}/{slug}     → Individual example pages (with setup CTA)
├── /tools                     → AI tool directory
│   ├── /[slug]                → Individual tool pages
│   ├── /for-marketers         → Filtered views
│   ├── /for-developers
│   ├── /for-content-creators
│   └── /free-ai-tools
├── /blog                      → Blog posts
│   └── /[slug]
├── /agent-setup-service       → Setup sprint booking page
├── /setup/claude-code         → Free guide (funnels to paid service)
├── /setup/gemini-cli          → Free guide (funnels to paid service)
├── /about                     → About page
├── /privacy                   → Legal
└── /terms                     → Legal
```

**Total pages:** ~150 focused, high-quality pages instead of 2000+ thin ones.

---

## What Success Looks Like

| Metric | Now | 3 months | 6 months |
|---|---|---|---|
| Indexed pages | ~2000 (mostly thin) | ~150 (all quality) | ~200+ (growing examples) |
| GSC 404 errors | 661 | <50 | 0 |
| Curated examples | 26 | 50+ | 100+ |
| Organic traffic | ~0 relevant | First rankings appearing | Steady long-tail traffic |
| Setup service bookings | 0 | 1-2/month | 5+/month |

---

## Risk: "But what if some of those pages WERE getting traffic?"

Before deleting anything, check Google Analytics for the last 90 days:
1. Go to GA → Pages → filter by `/skills/`, `/ideas/`, `/how-to/`
2. If any individual page has >50 sessions/month, keep it
3. If the entire section has <100 sessions total, nuke it confidently

**This is the one check worth doing before executing Phase 1.**
