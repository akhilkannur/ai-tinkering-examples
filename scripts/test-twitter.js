// scripts/test-twitter.js
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

async function testConnection() {
  try {
    console.log('Testing Twitter API connection...');
    const client = new TwitterApi({
      appKey: process.env.X_API_KEY,
      appSecret: process.env.X_API_KEY_SECRET,
      accessToken: process.env.X_ACCESS_TOKEN,
      accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
    });

    const user = await client.v2.me();
    console.log('✅ Success! Authenticated as:', user.data.username);
    console.log('User ID:', user.data.id);
  } catch (error) {
    console.error('❌ Authentication failed:');
    if (error.data) {
      console.error(JSON.stringify(error.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

testConnection();
