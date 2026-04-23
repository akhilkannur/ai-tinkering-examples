---
name: capturing-screenshots
description: "Captures perfect, uncropped screenshots of social media posts and adds them as examples to the site. Use when asked to screenshot, capture, or add an example from a URL or social post."
---

# Capturing Screenshots

Takes pixel-perfect, full-content screenshots of social media posts and web pages — no cropping, no login walls, no overlays.

## Why This Exists

Hardcoded `clip: { x, y, width, height }` coordinates break constantly because tweet/post heights vary with content length, images, threads, and embeds. This skill uses **element-based screenshotting** (`ElementHandle.screenshot()`) which lets Puppeteer auto-calculate the bounding box from the actual rendered DOM — the capture always matches the real content size.

## Quick Start

Run the capture script from the project root:

```bash
node .agents/skills/capturing-screenshots/scripts/capture.js <url>
```

### Common Examples

```bash
# Twitter/X post — auto-detects and captures just the tweet
node .agents/skills/capturing-screenshots/scripts/capture.js "https://x.com/user/status/123456"

# Save to a specific path
node .agents/skills/capturing-screenshots/scripts/capture.js "https://x.com/user/status/123456" -o public/images/examples/my-tweet.png

# LinkedIn post
node .agents/skills/capturing-screenshots/scripts/capture.js "https://linkedin.com/posts/user-123456"

# Reddit post
node .agents/skills/capturing-screenshots/scripts/capture.js "https://reddit.com/r/sub/comments/abc/title"

# Full page (no element targeting)
node .agents/skills/capturing-screenshots/scripts/capture.js "https://example.com" --full-page

# Dark mode + WebP format
node .agents/skills/capturing-screenshots/scripts/capture.js "https://x.com/user/status/123" --dark --format webp

# Debug mode (opens visible browser)
node .agents/skills/capturing-screenshots/scripts/capture.js "https://x.com/user/status/123" --debug
```

## Options

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `--output` | `-o` | `public/screenshots/<auto>.png` | Output file path |
| `--selector` | `-s` | Auto-detected | CSS selector of element to capture |
| `--full-page` | | false | Capture entire page instead of element |
| `--padding` | | 40 | Padding (px) around the captured element |
| `--width` | | 1280 | Viewport width in pixels |
| `--scale` | | 2 | Device scale factor (2 = retina) |
| `--format` | | png | Output format: `png`, `jpeg`, `webp` |
| `--quality` | | 90 | JPEG/WebP quality (0–100) |
| `--wait` | | 3000 | Extra wait (ms) after page load |
| `--dark` | | false | Use dark mode / dark theme |
| `--no-cleanup` | | false | Skip removing overlays/login walls |
| `--debug` | | false | Run browser in visible mode |

## How It Works

### Twitter/X: oEmbed Approach (Primary)

For Twitter/X URLs, the script uses Twitter's embed page directly (`platform.twitter.com/embed/Tweet.html`):
- No login walls, no sidebar, no layout shifts
- Consistent rendering every time  
- Images load reliably
- Height capped at 600px (thumbnail-friendly — shows top ~25% of long tweets)

If the embed detects a **Twitter Article** (long-form post that renders as just a link card), it automatically falls back to the direct-page capture approach.

### All Other URLs: Direct-Page Capture

For non-Twitter URLs (LinkedIn, Reddit, blogs, generic pages), the script navigates to the URL directly, waits for content to load, removes overlays/login walls, and captures the target element.

### Platform Auto-Detection

The script detects the platform from the URL and applies the right selectors:

| Platform | Selector | What It Captures |
|----------|----------|------------------|
| Twitter/X | oEmbed (embed page) | The tweet via Twitter's embed — falls back to direct capture for Articles |
| LinkedIn | `.feed-shared-update-v2` | The post card |
| Reddit | `shreddit-post, .Post` | The post content |
| Threads | `div[data-pressable-container="true"]` | The thread post |
| Bluesky | `article, [data-testid="postThreadItem"]` | The post |
| Mastodon | `.detailed-status, .status` | The toot/status |
| Instagram | `article[role="presentation"]` | The post |
| GitHub | *(full page)* | The repository page |
| Generic | *(full page)* | Entire page |

### Overlay & Login Wall Removal

Before screenshotting, the script removes:
- Twitter's `#layers` login wall and bottom bar
- LinkedIn's sign-in modals
- Reddit's app-install prompts
- Cookie consent banners
- All fixed/sticky position overlays

## Workflow for Agents

When asked to capture a screenshot:

1. **Run the script** with the URL provided by the user
2. **Check the output** — the file path is printed to stdout
3. **If the screenshot looks wrong** (user reports issues):
   - Try `--debug` to see the browser
   - Try a custom `--selector` if auto-detection misses
   - Try `--wait 8000` if content loads slowly
   - Try `--no-cleanup` if cleanup removes actual content
4. **For the project's example cards**, save to: `public/images/examples/<filename>.webp` with `--format webp`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Tweet shows login wall | Script removes `#layers` automatically. If still showing, try `--wait 5000` |
| Content is cut off | Increase `--wait` (slow networks) or use `--full-page` |
| Wrong element captured | Use `--selector "your-css-selector"` to target the right element |
| Images not loaded | Increase `--wait 8000` |
| Blurry output | Increase `--scale 3` for higher DPI |
| Bot detection / blank page | The script uses a realistic user-agent; try `--debug` to investigate |
| Element not found | Falls back to full-page automatically with a warning |

## Adding a New Example (Full Workflow)

When the user asks to "add this as an example" or "screenshot this and add it to the site":

### Step 1: Capture the screenshot
```bash
node .agents/skills/capturing-screenshots/scripts/capture.js "<URL>" \
  -o public/images/examples/<slug>.webp --format webp --wait 3000
```
Use format: `<YYYY-MM-DD>-<handle>-<topic-slug>.webp` (e.g. `2026-01-28-shreyas-claude-chat-superpowers.webp`)

### Step 2: Read the post content
Open the URL in the browser or use `read_web_page` to extract the actual post text, author name, and context.

### Step 3: Write the description (Harry Dry style)

Write like Harry Dry at marketingexamples.com — short, punchy, no fluff:
- **title**: Punchy, specific. Lead with the outcome or action.
- **summary**: 1-2 short sentences. Active voice. Name + what they did + what happened. No buzzwords like "demonstrates", "streamline", "practical AI application".

**Style rules:**
- Short sentences. Active voice.
- Lead with the person's name and what they actually did.
- End with the result or the insight.
- No "reveals", "showcases", "leverages", "unlock", "game-changing".

**Good examples:**
- "Shreyas Doshi shared a Claude conversation that walks you through finding your superpowers and aligning your work to them. Deep, reflective stuff — not a quick hack."
- "Maxwell Finn built a Claude skill that audits landing pages for 20-30 invisible friction points. The trick: recursive self-improvement loops that keep running until the output scores high enough."
- "Laura plugged Stripe into Claude Code with a read-only API key. Now it pulls her business data on demand."

**Bad examples:**
- "David Roberts demonstrates a practical AI automation technique that can streamline content marketing workflows."
- "Laura Roeder showcases how to leverage AI tools for business operations optimization."

### Step 4: Add the entry to `lib/social-examples-data.ts`
Add a new object before the closing `];`:

```typescript
{
  id: "<handle>-<slug>",
  title: "<your title>",
  slug: "<handle>-<slug>",
  summary: "<your summary>",
  screenshots: [
    {
      url: "/images/examples/<filename>.webp",
      filename: "<filename>.webp",
      thumbnails: {
        small: { url: "/images/examples/<filename>.webp" },
        large: { url: "/images/examples/<filename>.webp" }
      }
    }
  ],
  category: "<Category>",
  publish_date: "<YYYY-MM-DD>",
  original_link: "<original URL>",
  author_name: "<Real Author Name>",
  author_link: "https://x.com/<handle>",
  tags: ["Tag1", "Tag2"],
  Sponsored: false,
  sponsor: null
},
```

**publish_date**: Use the actual post date from the source, NOT today's date.

### Categories to choose from
Pick the most relevant: `Marketing Ops`, `Sales Ops`, `Content Ops`, `Design Ops`, `Dev Ops`, `Data Ops`, `HR Ops`, `Finance Ops`, `Product Ops`, `SEO`, `Paid Media`, `General`

### Step 5: Verify
Run `npm run build` to ensure no TypeScript errors.

## Prerequisites

- Node.js 18+
- `puppeteer` (already in project's `package.json`)
- No additional dependencies required
