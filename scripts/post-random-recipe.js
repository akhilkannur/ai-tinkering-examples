const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Configuration
const RECIPES_DIR = path.join(__dirname, '../content/recipes');
const BASE_URL = 'https://realaiexamples.com/ai-examples';

async function main() {
  // 1. Check for API Keys
  const appKey = process.env.TWITTER_API_KEY;
  const appSecret = process.env.TWITTER_API_SECRET;
  const accessToken = process.env.TWITTER_ACCESS_TOKEN;
  const accessSecret = process.env.TWITTER_ACCESS_SECRET;

  if (!appKey || !appSecret || !accessToken || !accessSecret) {
    console.error('❌ Missing Twitter API keys in .env file.');
    console.error('Please add: TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET');
    console.error('You can get these from the Twitter Developer Portal (Free Tier).');
    process.exit(1);
  }

  // 2. Load all recipes
  let files;
  try {
    files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.md'));
  } catch (err) {
    console.error(`❌ Could not read recipes directory: ${RECIPES_DIR}`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error('❌ No recipes found in content/recipes');
    process.exit(1);
  }

  // 3. Pick a random recipe
  const randomFile = files[Math.floor(Math.random() * files.length)];
  const filePath = path.join(RECIPES_DIR, randomFile);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);

  // 4. Construct Tweet Content
  const title = data.title || randomFile.replace('.md', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const slug = randomFile.replace('.md', '');
  const url = `${BASE_URL}/${slug}`;
  const summary = data.description ? data.description.split('.')[0] + '.' : `Learn how to automate ${title.toLowerCase()}.`;

  // Randomize the message template
  const templates = [
    `🚀 New AI Workflow: ${title}\n\n${summary}\n\nCheck it out here: ${url}`,
    `🤖 Automate your work with: ${title}\n\nFull recipe: ${url}`,
    `✨ Fresh from the library: ${title}\n\n${url}`,
    `💡 Idea for today: ${title}\n\n${summary}\n\nLink: ${url}`
  ];

  const tweetText = templates[Math.floor(Math.random() * templates.length)];

  console.log(`📝 Preparing to tweet:\n${tweetText}\n`);

  // 5. Post to Twitter
  try {
    const client = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    });

    const rwClient = client.readWrite;
    await rwClient.v2.tweet(tweetText);
    console.log('✅ Tweet successfully posted!');
  } catch (error) {
    console.error('❌ Error posting to Twitter:', error);
    if (error.code === 403) {
      console.error('👉 This might be a permissions issue. Ensure your App permissions are set to "Read and Write" in the Developer Portal.');
    }
    process.exit(1);
  }
}

main();
