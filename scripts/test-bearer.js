// scripts/test-bearer.js
require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

async function testBearer() {
  try {
    console.log('Testing Twitter Bearer Token...');
    const client = new TwitterApi(process.env.X_BEARER_TOKEN);

    // Get a known user (e.g., twitter)
    const user = await client.v2.userByUsername('twitter');
    console.log('✅ Bearer Success! Found user:', user.data.username);
  } catch (error) {
    console.error('❌ Bearer failed:');
    if (error.data) {
      console.error(JSON.stringify(error.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

testBearer();
