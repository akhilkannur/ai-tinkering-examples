const fs = require('fs');
const path = require('path');
const https = require('https');

const args = process.argv.slice(2);
const url = args[0];
const useLocalCapture = args.includes('--local') || args.includes('-l'); // Flag to use local capture instead of Microlink
const useBeautifulCapture = args.includes('--beautiful') || args.includes('-b'); // Flag to create beautiful screenshots

if (!url) {
  console.error('Please provide a URL (e.g., Twitter link)');
  process.exit(1);
}

const MICROLINK_API = `https://api.microlink.io?url=${encodeURIComponent(url)}&meta=true&screenshot=true`;

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const stream = fs.createWriteStream(filepath);
        res.pipe(stream);
        stream.on('finish', () => {
            stream.close();
            resolve(filepath);
        });
        stream.on('error', reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

// Import the local screenshot capture function
async function captureLocalScreenshot(url, imageFilename) {
  const captureScreenshotModule = require('./capture-screenshot.js');
  // Extract just the filename without the directory structure for saving
  const fileName = path.basename(imageFilename);
  const tempPath = path.join(process.cwd(), 'public', 'screenshots', fileName);
  const targetDir = path.join(process.cwd(), 'public', 'images', 'examples');
  const targetPath = path.join(targetDir, fileName);

  // Ensure target directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // Capture to temporary location using the function directly
  await captureScreenshotModule(url, fileName);

  // Move the file to the target location
  if (fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, targetPath);
    console.log(`✅ Moved screenshot to: ${targetPath}`);
  }

  // If beautiful capture is requested, process the image
  if (useBeautifulCapture) {
    console.log('🎨 Beautifying screenshot...');
    const beautifyScreenshot = require('./beautify-screenshot.js');
    await beautifyScreenshot(targetPath, targetPath); // Overwrite with beautiful version
  }

  return targetPath;
}

// Function to extract and summarize content from the webpage
async function extractContentFromUrl(url) {
  const puppeteer = require('puppeteer');

  console.log(`📖 Extracting content from: ${url}`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Set viewport size
    await page.setViewport({
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
    });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Extract content based on platform
    let content = '';
    let title = '';

    if (url.includes('x.com') || url.includes('twitter.com')) {
      // For Twitter/X posts
      title = await page.evaluate(() => {
        const titleElement = document.querySelector('title');
        return titleElement ? titleElement.textContent : '';
      });

      content = await page.evaluate(() => {
        // Look for the main tweet content
        const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
        if (tweetElements.length > 0) {
          // Get the first tweet's text content
          const tweetText = tweetElements[0].querySelector('[data-testid="tweetText"]');
          if (tweetText) {
            return tweetText.innerText || tweetText.textContent;
          }
        }

        // Fallback: try to find tweet text in other selectors
        const tweetTextElements = document.querySelectorAll('article[data-testid="tweet"] div[dir="auto"]');
        for (const element of tweetTextElements) {
          if (element.textContent.trim().length > 0) {
            return element.textContent.trim();
          }
        }

        return 'Content extraction failed';
      });
    } else {
      // For other websites, extract main content
      title = await page.evaluate(() => {
        return document.title || '';
      });

      content = await page.evaluate(() => {
        // Try to find main content areas
        const selectors = [
          'main',
          'article',
          '[role="main"]',
          '.content',
          '.post-content',
          '.entry-content',
          'body'
        ];

        for (const selector of selectors) {
          const element = document.querySelector(selector);
          if (element) {
            // Get text content but remove excessive whitespace
            const text = element.textContent.trim();
            if (text.length > 0) {
              // Limit to first 300 characters to avoid huge content
              return text.substring(0, 300) + (text.length > 300 ? '...' : '');
            }
          }
        }

        // Fallback to body text
        return document.body ? document.body.textContent.substring(0, 300) + '...' : 'Content extraction failed';
      });
    }

    // Clean up the extracted content
    content = content.replace(/\s+/g, ' ').trim();

    // Generate insightful title and summary based on the content
    let insightfulTitle = '';
    let insightfulSummary = '';

    if (content.length > 0) {
      // Create an insightful summary based on content analysis
      const lowerContent = content.toLowerCase();

      // Extract author name from URL for more personal touch
      const authorName = url.split('/')[3] || 'Someone';

      // Identify key topics and themes
      if (lowerContent.includes('claude') || lowerContent.includes('ai') || lowerContent.includes('automation')) {
        if (lowerContent.includes('stripe') || lowerContent.includes('connect')) {
          insightfulTitle = 'Connecting Stripe with Claude Code';
          insightfulSummary = `${authorName} demonstrates how to integrate Stripe with Claude Code using read-only API keys. This practical AI application can streamline business operations and save hours of manual work.`;
        } else if (lowerContent.includes('workflow') || lowerContent.includes('automation')) {
          insightfulTitle = 'AI Workflow Automation';
          insightfulSummary = `${authorName} shares a practical automation technique that can save significant time. The specific implementation details make this immediately actionable.`;
        } else {
          insightfulTitle = 'AI Tool Usage Tip';
          insightfulSummary = `${authorName} reveals a valuable AI tool usage technique that can boost productivity. The actionable advice is ready to implement today.`;
        }
      } else if (lowerContent.includes('marketing') || lowerContent.includes('growth') || lowerContent.includes('strategy')) {
        insightfulTitle = 'Marketing Strategy';
        insightfulSummary = `${authorName} shares an actionable marketing strategy with proven results. The specific tactics mentioned are worth testing in your campaigns.`;
      } else if (lowerContent.includes('productivity') || lowerContent.includes('efficiency') || lowerContent.includes('tool')) {
        insightfulTitle = 'Productivity Tip';
        insightfulSummary = `${authorName} offers an effective productivity tip that can transform your workflow. The practical advice delivers clear benefits.`;
      } else {
        // Generic insight for other content
        insightfulTitle = 'Community Insight';
        insightfulSummary = `${authorName} shares a key takeaway that's worth your attention: "${content.substring(0, 80)}${content.length > 80 ? '...' : ''}". This insight offers practical value for professionals.`;
      }
    } else {
      insightfulTitle = 'Content from URL';
      insightfulSummary = 'Automated content extraction from the provided URL.';
    }

    await browser.close();

    return {
      title: insightfulTitle,
      summary: insightfulSummary.substring(0, 200)
    };
  } catch (error) {
    console.error(`❌ Error extracting content: ${error.message}`);
    await browser.close();

    // Return fallback content
    return {
      title: 'Content from URL',
      summary: 'Automated screenshot capture from provided URL. Content extraction failed, but visual representation available.'
    };
  }
}

// Function to generate a slug from title
function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .substring(0, 50);
}

async function createSocialExample() {
  console.log(`🔍 Fetching metadata for: ${url}`);
  console.log(useLocalCapture ? '📸 Using local screenshot capture' : '🌐 Using Microlink API for screenshot');

  try {
    let title, description, author, authorHandle, imageUrl;

    if (useLocalCapture) {
      // For local capture, extract content from the URL
      const urlParts = url.split('/');
      authorHandle = urlParts[3] || 'unknown';

      // Extract content from the URL
      const contentData = await extractContentFromUrl(url);
      title = contentData.title;
      description = contentData.summary;
      author = 'Unknown';
    } else {
      // Use Microlink API as before
      const response = await fetch(MICROLINK_API);
      const data = await response.json();

      if (data.status !== 'success') {
        throw new Error('Microlink failed to fetch data');
      }

      const meta = data.data;
      title = (meta.title || 'New AI Automation').replace(/"/g, "'");
      description = (meta.description || 'No description found.').replace(/"/g, "'");
      author = meta.author || 'Unknown';
      authorHandle = url.split('/')[3] || author;

      imageUrl = meta.image?.url || meta.screenshot?.url;
    }

    const date = new Date().toISOString().split('T')[0];
    const slug = generateSlug(title);
    const id = `${authorHandle.toLowerCase()}-${slug}`;
    const imageFilename = `${date}-${id}.jpg`;

    if (useLocalCapture) {
      console.log(`📸 Capturing screenshot locally...`);
      await captureLocalScreenshot(url, `/images/examples/${imageFilename}`);
      console.log(`✅ Local screenshot saved to: /images/examples/${imageFilename}`);
    } else if (imageUrl) {
      console.log(`⬇️ Downloading image from Microlink...`);
      const imagePath = path.join(process.cwd(), 'public/images/examples', imageFilename);
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      await downloadImage(imageUrl, imagePath);
      console.log(`✅ Image saved to: /images/examples/${imageFilename}`);
    }

    // Clean up multiline strings and escape special characters properly
    const cleanTitle = title.replace(/[\r\n]/g, ' ').replace(/[\\"]/g, "'").substring(0, 100);
    const cleanSummary = description.substring(0, 200).replace(/[\\"]/g, "'");
    const cleanAuthor = author.replace(/[\\"]/g, "'");
    const cleanId = id.replace(/[\\"]/g, "'");
    const cleanSlug = id.replace(/[\\"]/g, "'");

    const newEntry = `
  {
    id: "${cleanId}",
    title: "${cleanTitle}",
    slug: "${cleanSlug}",
    summary: "${cleanSummary}",
    screenshots: [
      {
        url: "/images/examples/${imageFilename}",
        filename: "${imageFilename}",
        thumbnails: {
          small: { url: "/images/examples/${imageFilename}" },
          large: { url: "/images/examples/${imageFilename}" }
        }
      }
    ],
    category: "Marketing Ops",
    publish_date: "${date}",
    original_link: "${url}",
    author_name: "${cleanAuthor}",
    author_link: "https://x.com/${authorHandle}",
    tags: ["Automation"],
    Sponsored: false,
    sponsor: null
  },`;

    const filePath = path.join(process.cwd(), 'lib/social-examples-data.ts');
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the end of the array
    const lastBracketIndex = content.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
      const beforeBracket = content.substring(0, lastBracketIndex).trim();
      let prefix = "";

      // If the last character before the bracket is a closing brace and NOT a comma, add a comma
      if (beforeBracket.endsWith('}') && !beforeBracket.endsWith('},')) {
        prefix = ",";
      }

      content = content.substring(0, lastBracketIndex).trimEnd() + prefix + newEntry + "\n];";
      fs.writeFileSync(filePath, content);
      console.log(`\n🎉 Entry added to lib/social-examples-data.ts`);
    } else {
      console.error('❌ Could not find ]; in lib/social-examples-data.ts');
    }

  } catch (error) {
    console.error('🔥 Error:', error.message);
  }
}

createSocialExample();