---
name: capturing-screenshots
description: "Captures perfect, uncropped screenshots of social media posts (Twitter/X, LinkedIn, Reddit, Threads, Bluesky, Instagram, GitHub) and web pages. Use when asked to screenshot, capture, or take a picture of a URL or social post."
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

### The Core Technique: Element-Based Screenshots

Instead of:
```js
// ❌ BAD — hardcoded clip breaks when content height varies
await page.screenshot({ clip: { x: 340, y: 50, width: 600, height: 600 } });
```

This skill does:
```js
// ✅ GOOD — Puppeteer auto-calculates bounding box from live DOM
const tweet = await page.$('article[data-testid="tweet"]');
await tweet.screenshot({ path: 'output.png' });
```

Puppeteer internally calls `getBoundingClientRect()` on the element, so the capture always matches the actual rendered size — no matter how tall the content is.

### Platform Auto-Detection

The script detects the platform from the URL and applies the right selectors:

| Platform | Selector | What It Captures |
|----------|----------|------------------|
| Twitter/X | `article[data-testid="tweet"]` | The tweet card exactly |
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

## Integration with create-example.js

To use this capture script from `scripts/create-example.js`, replace the existing `capture-screenshot.js` call:

```js
// In scripts/create-example.js, replace:
const captureScreenshotModule = require('./capture-screenshot.js');

// With:
const { execSync } = require('child_process');
function captureScreenshot(url, outputPath) {
  execSync(`node .agents/skills/capturing-screenshots/scripts/capture.js "${url}" -o "${outputPath}" --format webp --padding 0`, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
}
```

## Prerequisites

- Node.js 18+
- `puppeteer` (already in project's `package.json`)
- No additional dependencies required
