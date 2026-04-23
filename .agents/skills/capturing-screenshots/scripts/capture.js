#!/usr/bin/env node
/**
 * Smart Screenshot Capture Script
 * 
 * Uses element-based screenshotting (ElementHandle.screenshot()) instead of
 * hardcoded clip coordinates so content is never cropped.
 * 
 * Usage:
 *   node capture.js <url> [options]
 * 
 * Options:
 *   --output, -o <path>    Output file path (default: public/screenshots/<auto>.png)
 *   --selector, -s <sel>   Custom CSS selector to capture (auto-detected by platform)
 *   --full-page            Capture the entire page instead of a specific element
 *   --padding <px>         Padding around the captured element in pixels (default: 16)
 *   --width <px>           Viewport width (default: 1280)
 *   --scale <n>            Device scale factor for retina (default: 2)
 *   --format <type>        Output format: png, jpeg, webp (default: png)
 *   --quality <n>          JPEG/WebP quality 0-100 (default: 90)
 *   --wait <ms>            Extra wait time after load in ms (default: 3000)
 *   --dark                 Use dark mode / dark theme
 *   --no-cleanup           Skip removing overlays/login walls
 *   --debug                Show browser (non-headless) for debugging
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// ─── Argument Parsing ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
const url = args.find(a => a.startsWith('http'));

if (!url) {
  console.error('❌ Usage: node capture.js <url> [options]');
  console.error('   Example: node capture.js https://x.com/user/status/123456');
  process.exit(1);
}

function getFlag(flag) {
  return args.includes(flag);
}

function getOption(flag, fallback) {
  const idx = args.indexOf(flag);
  if (idx > -1 && args[idx + 1]) return args[idx + 1];
  // Check short form
  const shortMap = { '--output': '-o', '--selector': '-s' };
  if (shortMap[flag]) {
    const si = args.indexOf(shortMap[flag]);
    if (si > -1 && args[si + 1]) return args[si + 1];
  }
  return fallback;
}

const customSelector = getOption('--selector') || getOption('-s');
const outputPath = getOption('--output') || getOption('-o');
const fullPage = getFlag('--full-page');
const padding = parseInt(getOption('--padding', '40'), 10);
const viewportWidth = parseInt(getOption('--width', '1280'), 10);
const scaleFactor = parseInt(getOption('--scale', '2'), 10);
const format = getOption('--format', 'png');
const quality = parseInt(getOption('--quality', '90'), 10);
const extraWait = parseInt(getOption('--wait', '3000'), 10);
const darkMode = getFlag('--dark');
const noCleanup = getFlag('--no-cleanup');
const debug = getFlag('--debug');

// ─── Platform Detection ────────────────────────────────────────────────────

function detectPlatform(url) {
  if (url.includes('x.com') || url.includes('twitter.com')) return 'twitter';
  if (url.includes('linkedin.com')) return 'linkedin';
  if (url.includes('github.com')) return 'github';
  if (url.includes('reddit.com')) return 'reddit';
  if (url.includes('threads.net')) return 'threads';
  if (url.includes('instagram.com')) return 'instagram';
  if (url.includes('bsky.app')) return 'bluesky';
  if (url.includes('mastodon') || url.includes('fosstodon')) return 'mastodon';
  return 'generic';
}

// Platform-specific configs: selector to capture, overlay selectors to remove, and wait selector
const PLATFORM_CONFIGS = {
  twitter: {
    // Capture the tweet article element — auto-sizes to content
    selector: 'article[data-testid="tweet"]',
    waitFor: 'article[data-testid="tweet"]',
    overlaySelectors: [
      '#layers',                              // Login wall / signup prompt
      'div[data-testid="BottomBar"]',         // Bottom "Don't miss what's happening" bar
      'div[data-testid="sheetDialog"]',       // Sheet dialogs
      'div[role="dialog"]',                   // Modal dialogs
      '[data-testid="app-bar-close"]',        // Close buttons on overlays
    ],
    // Twitter needs specific cleanup in page.evaluate
    customCleanup: true,
  },
  linkedin: {
    selector: '.feed-shared-update-v2',
    waitFor: '.feed-shared-update-v2',
    overlaySelectors: [
      '.authentication-outlet',
      '.contextual-sign-in-modal',
      '.artdeco-modal-overlay',
      '[data-test-modal-id]',
    ],
  },
  github: {
    selector: null, // full page works well for GitHub
    waitFor: '.application-main',
    overlaySelectors: [],
  },
  reddit: {
    selector: 'shreddit-post, .Post',
    waitFor: 'shreddit-post, .Post',
    overlaySelectors: [
      '.XPromoPopup',
      '[data-testid="xpromo-nsfw-modal"]',
      '#credential_picker_container',
    ],
  },
  threads: {
    selector: 'div[data-pressable-container="true"]',
    waitFor: 'div[data-pressable-container="true"]',
    overlaySelectors: [
      '[role="dialog"]',
    ],
  },
  bluesky: {
    selector: 'article, [data-testid="postThreadItem"]',
    waitFor: 'article, [data-testid="postThreadItem"]',
    overlaySelectors: [],
  },
  mastodon: {
    selector: '.detailed-status, .status',
    waitFor: '.detailed-status, .status',
    overlaySelectors: [],
  },
  instagram: {
    selector: 'article[role="presentation"], article',
    waitFor: 'article',
    overlaySelectors: [
      '[role="dialog"]',
      '[data-testid="login-modal"]',
    ],
  },
  generic: {
    selector: null,
    waitFor: null,
    overlaySelectors: [
      '#cookie-banner',
      '[class*="cookie"]',
      '[class*="consent"]',
      '[class*="popup"]',
      '[class*="overlay"]',
    ],
  },
};

// ─── Twitter oEmbed Capture ────────────────────────────────────────────────
// Uses Twitter's embed page (platform.twitter.com/embed/Tweet.html) to render
// the tweet in isolation — no login walls, no sidebar, no layout shifts.
//
// HOW IT WORKS:
//   1. Extracts tweet ID from the URL
//   2. Loads Twitter's embed page directly (the same page used inside tweet embeds)
//   3. Waits for the <article> element to render
//   4. Screenshots the article with a 600px height cap (thumbnail-friendly)
//
// WHEN IT FALLS BACK:
//   - Twitter Articles/long-form posts render as just a link card in the embed,
//     so we detect that (article height < 150px) and return false to signal
//     the caller should use the direct-page capture approach instead.
//
// Returns: true if capture succeeded, false if caller should fall back to direct capture.

async function captureTwitterEmbed(tweetUrl, finalPath, screenshotOpts) {
  const tweetIdMatch = tweetUrl.match(/status\/(\d+)/);
  if (!tweetIdMatch) {
    console.log(`⚠️  Could not extract tweet ID, falling back to direct capture`);
    return false;
  }
  const tweetId = tweetIdMatch[1];

  const embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&lang=en`;
  console.log(`🐦 Loading Twitter embed: ${embedUrl}`);

  const MAX_CAPTURE_HEIGHT = 600;
  const MIN_ARTICLE_HEIGHT = 150; // Below this = likely just a link card (Twitter Article)

  const browser = await puppeteer.launch({
    headless: debug ? false : 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 600, height: 1200, deviceScaleFactor: scaleFactor });
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    if (darkMode) {
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    }

    await page.goto(embedUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    try {
      await page.waitForSelector('article', { timeout: 15000 });
      console.log(`✅ Tweet embed rendered`);
    } catch {
      console.log(`⚠️  Article not found in embed`);
      return false;
    }

    await new Promise(r => setTimeout(r, extraWait));

    const article = await page.$('article');
    if (!article) return false;

    const box = await article.boundingBox();
    if (!box) return false;

    // Detect Twitter Articles / link-only tweets: they render as a short card
    // with just a link (e.g. "x.com/i/article/...") instead of actual content.
    // Check both height AND content — articles show as ~220px with just a URL.
    const isLinkOnly = await page.evaluate(() => {
      const tweetText = document.querySelector('article')?.textContent || '';
      return tweetText.includes('x.com/i/article') || tweetText.includes('twitter.com/i/article');
    });
    if (isLinkOnly || box.height < MIN_ARTICLE_HEIGHT) {
      console.log(`⚠️  Embed shows link-only content (${Math.round(box.height)}px) — likely a Twitter Article. Falling back to direct capture.`);
      return false;
    }

    const captureHeight = Math.min(box.height, MAX_CAPTURE_HEIGHT);
    if (box.height > MAX_CAPTURE_HEIGHT) {
      console.log(`📏 Long tweet (${Math.round(box.height)}px). Capturing top ${MAX_CAPTURE_HEIGHT}px as thumbnail.`);
    }

    screenshotOpts.clip = {
      x: Math.max(0, box.x),
      y: Math.max(0, box.y),
      width: box.width,
      height: captureHeight,
    };
    await page.screenshot(screenshotOpts);
    console.log(`✅ Tweet screenshot saved: ${finalPath}`);
    console.log(`📐 Captured: ${Math.round(box.width)}×${Math.round(captureHeight)}px (logical)`);
    console.log(`📐 Output:   ${Math.round(box.width * scaleFactor)}×${Math.round(captureHeight * scaleFactor)}px (actual @ ${scaleFactor}x)`);
    return true;
  } finally {
    await browser.close();
  }
}

// ─── Main Capture Logic ────────────────────────────────────────────────────

async function captureScreenshot() {
  const platform = detectPlatform(url);
  const config = PLATFORM_CONFIGS[platform];
  const effectiveSelector = customSelector || config.selector;

  // Determine output path early (needed by both paths)
  let finalPath = outputPath;
  if (!finalPath) {
    const slug = url
      .replace(/https?:\/\//, '')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 60);
    const ext = format === 'jpeg' ? 'jpg' : format;
    const dir = path.join(process.cwd(), 'public', 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    finalPath = path.join(dir, `${slug}.${ext}`);
  }
  const outDir = path.dirname(finalPath);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const screenshotOpts = {
    path: finalPath,
    type: format === 'jpg' ? 'jpeg' : format,
  };
  if (format !== 'png') {
    screenshotOpts.quality = quality;
  }

  // Twitter: try oEmbed first (reliable for regular tweets).
  // Falls back to direct-page capture for Twitter Articles or if oEmbed fails.
  if (platform === 'twitter' && !customSelector && !fullPage) {
    console.log(`📸 Platform: twitter (trying oEmbed first)`);
    const success = await captureTwitterEmbed(url, finalPath, screenshotOpts);
    if (success) return;
    console.log(`🔄 Falling back to direct-page capture for this Twitter URL`);
  }

  console.log(`📸 Platform: ${platform}`);
  console.log(`🎯 Selector: ${effectiveSelector || '(full page)'}`);
  console.log(`📐 Viewport: ${viewportWidth}px @ ${scaleFactor}x`);

  const browser = await puppeteer.launch({
    headless: debug ? false : 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  });

  try {
    const page = await browser.newPage();

    // Realistic user agent to avoid bot detection
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.setViewport({
      width: viewportWidth,
      height: 900,
      deviceScaleFactor: scaleFactor,
    });

    // Dark mode preference
    if (darkMode) {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' },
      ]);
    }

    console.log(`🌐 Navigating to ${url}...`);
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    // Wait for primary content selector
    if (config.waitFor) {
      try {
        await page.waitForSelector(config.waitFor, { timeout: 20000 });
        console.log(`✅ Content loaded (${config.waitFor})`);
      } catch {
        console.log(`⚠️  Selector "${config.waitFor}" not found, waiting ${extraWait}ms...`);
      }
    }

    // Extra wait for content to stabilize (images, lazy-load, etc.)
    await new Promise(r => setTimeout(r, extraWait));

    // ─── Remove Overlays & Login Walls ─────────────────────────────────
    if (!noCleanup) {
      await page.evaluate((overlaySelectors, isTwitter) => {
        // Remove platform-specific overlays
        for (const sel of overlaySelectors) {
          document.querySelectorAll(sel).forEach(el => {
            el.remove();
          });
        }

        // Twitter-specific deep cleanup
        if (isTwitter) {
          // Remove the #layers container which holds login walls
          const layers = document.querySelector('#layers');
          if (layers) layers.remove();

          // Remove sticky header/title bar
          const titleContainer = document.querySelector('div[data-testid="titleContainer"]');
          if (titleContainer) titleContainer.remove();

          // Remove bottom bar
          const bottomBar = document.querySelector('div[data-testid="BottomBar"]');
          if (bottomBar) bottomBar.remove();

          // Unfreeze body scroll (Twitter locks it when overlays show)
          document.body.style.overflow = 'auto';
          document.body.style.position = 'static';
          document.documentElement.style.overflow = 'auto';
        }

        // Generic cleanup: remove common cookie banners
        const genericSelectors = [
          '#cookie-banner', '[class*="cookie-consent"]', '[class*="cookie-banner"]',
          '[class*="CookieConsent"]', '[id*="cookie"]',
        ];
        for (const sel of genericSelectors) {
          document.querySelectorAll(sel).forEach(el => el.remove());
        }

        // Remove all fixed/sticky position elements that could overlay content
        // (except the target content itself)
        const allFixed = document.querySelectorAll('*');
        allFixed.forEach(el => {
          const style = window.getComputedStyle(el);
          if (
            (style.position === 'fixed' || style.position === 'sticky') &&
            el.tagName !== 'ARTICLE' &&
            !el.closest('article')
          ) {
            // Check if it looks like a banner/overlay (small height = likely a bar)
            const rect = el.getBoundingClientRect();
            if (rect.height < 200 || rect.width > window.innerWidth * 0.8) {
              el.remove();
            }
          }
        });
      }, config.overlaySelectors, platform === 'twitter');

      console.log(`🧹 Cleaned up overlays`);
    }

    // Small pause after cleanup for re-render
    await new Promise(r => setTimeout(r, 500));

    // ─── Capture ───────────────────────────────────────────────────────

    if (fullPage || !effectiveSelector) {
      // Full page screenshot
      screenshotOpts.fullPage = true;
      await page.screenshot(screenshotOpts);
      console.log(`✅ Full-page screenshot saved: ${finalPath}`);
    } else {
      // Element-based screenshot — the key to avoiding cropping
      const element = await page.$(effectiveSelector);

      if (!element) {
        console.log(`⚠️  Element "${effectiveSelector}" not found, falling back to full page`);
        screenshotOpts.fullPage = true;
        await page.screenshot(screenshotOpts);
        console.log(`✅ Full-page fallback screenshot saved: ${finalPath}`);
      } else {
        // Use page.screenshot with a clip derived from the element's bounding box.
        // This avoids the left-margin clipping bug that element.screenshot() causes
        // when padding/margin is injected at high DPI scale factors.
        const box = await element.boundingBox();
        if (!box) {
          console.log(`⚠️  Could not get bounding box, falling back to full page`);
          screenshotOpts.fullPage = true;
          await page.screenshot(screenshotOpts);
          console.log(`✅ Full-page fallback screenshot saved: ${finalPath}`);
        } else {
          const MAX_CAPTURE_HEIGHT = 600; // Thumbnail-friendly: ~top 25-30% of most tweets
          const captureHeight = Math.min(box.height, MAX_CAPTURE_HEIGHT);

          if (box.height > MAX_CAPTURE_HEIGHT) {
            console.log(`📏 Long content (${Math.round(box.height)}px). Capturing top ${MAX_CAPTURE_HEIGHT}px as thumbnail.`);
          }

          // Scroll element into view to ensure clip coordinates are valid
          await element.evaluate(el => el.scrollIntoView({ block: 'start' }));
          await new Promise(r => setTimeout(r, 300));

          // Re-read box after scroll
          const scrolledBox = await element.boundingBox();
          const clipBox = scrolledBox || box;

          screenshotOpts.clip = {
            x: Math.max(0, clipBox.x),
            y: Math.max(0, clipBox.y),
            width: clipBox.width,
            height: captureHeight,
          };

          await page.screenshot(screenshotOpts);
          console.log(`✅ Element screenshot saved: ${finalPath}`);
          console.log(`📐 Captured: ${Math.round(clipBox.width)}×${Math.round(captureHeight)}px (logical)`);
          console.log(`📐 Output:   ${Math.round(clipBox.width * scaleFactor)}×${Math.round(captureHeight * scaleFactor)}px (actual @ ${scaleFactor}x)`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Screenshot failed: ${error.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

captureScreenshot();
