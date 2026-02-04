// scripts/post-to-x.js
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Initialize X Client
const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_KEY_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

const recipesDir = path.join(process.cwd(), 'content/recipes');

async function postRandomRecipe() {
  try {
    // 1. Get all recipes
    const files = fs.readdirSync(recipesDir).filter(f => f.endsWith('.md'));
    const randomFile = files[Math.floor(Math.random() * files.length)];
    
    // 2. Parse the recipe
    const filePath = path.join(recipesDir, randomFile);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    
    if (!data.title || !data.id) {
      console.error('Invalid recipe data');
      return;
    }

    // 3. Format the tweet
    // Max 280 chars. 
    const title = data.title.toUpperCase();
    const tagline = data.tagline || '';
    const url = `https://realaiexamples.com/skills/${data.id}`;
    
    const tweetText = `🤖 AI BLUEPRINT: ${title}

${tagline}

Build it here: ${url}

#AI #Automation #SalesTech`;

    console.log('--- PREVIEWING TWEET ---');
    console.log(tweetText);
    console.log('------------------------');

    // 4. Send the tweet
    const { data: createdTweet } = await client.v2.tweet(tweetText);
    console.log('✅ Success! Tweet sent. ID:', createdTweet.id);

  } catch (error) {
    console.error('❌ Error sending tweet:', error);
    if (error.data) console.error('Details:', JSON.stringify(error.data, null, 2));
  }
}

postRandomRecipe();
