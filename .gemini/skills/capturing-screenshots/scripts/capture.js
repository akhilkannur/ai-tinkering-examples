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

// ─── Main Capture Logic ────────────────────────────────────────────────────

async function captureScreenshot() {
  const platform = detectPlatform(url);
  const config = PLATFORM_CONFIGS[platform];
  const effectiveSelector = customSelector || config.selector;

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
    // Determine output path
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

    // Ensure output directory exists
    const outDir = path.dirname(finalPath);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const screenshotOpts = {
      path: finalPath,
      type: format === 'jpg' ? 'jpeg' : format,
    };
    if (format !== 'png') {
      screenshotOpts.quality = quality;
    }

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
        const MAX_CAPTURE_HEIGHT = 1200;
        const PADDING = 12;

        // Inject CSS padding + margin to prevent sub-pixel clipping at high DPI
        // and ensure content isn't flush against page edges
        await element.evaluate((el, pad) => {
          el.style.padding = pad + 'px';
          el.style.margin = pad + 'px';
          el.style.boxSizing = 'content-box';
        }, PADDING);
        await new Promise(r => setTimeout(r, 200));

        // Re-read bounding box after padding is applied
        const box = await element.boundingBox();
        const isLong = box && box.height > MAX_CAPTURE_HEIGHT;

        if (isLong) {
          console.log(`📏 Long content (${Math.round(box.height)}px). Capping to ${MAX_CAPTURE_HEIGHT}px preview.`);
          // For long posts, inject a spacer before the element to guarantee
          // it isn't flush against the page top (which causes top-edge clipping).
          // For long posts, use element.screenshot which handles bounding box
          // correctly, but first cap the visible height via CSS.
          await element.evaluate((el, maxH) => {
            el.style.maxHeight = (maxH - 24) + 'px';
            el.style.overflow = 'hidden';
          }, MAX_CAPTURE_HEIGHT);
          await new Promise(r => setTimeout(r, 300));
          await element.screenshot(screenshotOpts);
        } else {
          await element.screenshot(screenshotOpts);
        }

        console.log(`✅ Element screenshot saved: ${finalPath}`);

        // Report dimensions
        const finalBox = await element.boundingBox();
        if (finalBox) {
          console.log(`📐 Captured: ${Math.round(finalBox.width)}×${Math.round(finalBox.height)}px (logical)`);
          console.log(`📐 Output:   ${Math.round(finalBox.width * scaleFactor)}×${Math.round(finalBox.height * scaleFactor)}px (actual @ ${scaleFactor}x)`);
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
