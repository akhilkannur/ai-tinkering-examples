const https = require('https');
const fs = require('fs');
const path = require('path');

// Subreddits to scan
const SUBREDDITS = ['ChatGPT', 'ClaudeAI', 'marketing', 'sales', 'SaaS'];

// Keywords to prioritize (must have at least one)
const AI_KEYWORDS = ['ai', 'chatgpt', 'claude', 'gemini', 'automate', 'workflow', 'bot', 'agent', 'script', 'tool'];

// Keywords to exclude (too technical or irrelevant)
const BLOCK_KEYWORDS = ['api', 'key', 'error', 'bug', 'deploy', 'hosting', 'server', 'down', 'outage'];

function fetchSubreddit(subreddit) {
  return new Promise((resolve) => {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data.children.map(child => child.data));
        } catch (e) {
          console.error(`Failed to parse ${subreddit}:`, e.message);
          resolve([]);
        }
      });
    }).on('error', (e) => {
      console.error(`Error fetching ${subreddit}:`, e.message);
      resolve([]);
    });
  });
}

async function scan() {
  console.log('🔍 Scanning Reddit for content gaps...');
  let allPosts = [];

  for (const sub of SUBREDDITS) {
    console.log(`   Scanning r/${sub}...`);
    const posts = await fetchSubreddit(sub);
    allPosts = [...allPosts, ...posts];
    // Polite delay
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log(`
Analyzing ${allPosts.length} raw posts...`);

  const opportunities = allPosts
    .filter(post => {
      const title = post.title.toLowerCase();
      const isQuestion = title.includes('?') || title.startsWith('how') || title.includes('way to');
      const hasAI = AI_KEYWORDS.some(k => title.includes(k));
      const isBlocked = BLOCK_KEYWORDS.some(k => title.includes(k));
      const hasVotes = post.score > 10; // Validation threshold

      return isQuestion && hasAI && !isBlocked && hasVotes;
    })
    .map(post => ({
      subreddit: post.subreddit,
      score: post.score,
      title: post.title,
      url: `https://reddit.com${post.permalink}`,
      created: new Date(post.created_utc * 1000).toISOString().split('T')[0]
    }))
    .sort((a, b) => b.score - a.score); // Highest validation first

  console.log(`✅ Found ${opportunities.length} validated content opportunities.\n`);

  // Print Top 10
  opportunities.slice(0, 10).forEach((op, i) => {
    console.log(`${i + 1}. [${op.score} pts] ${op.title}`);
    console.log(`   Link: ${op.url}`);
    console.log('---');
  });

  fs.writeFileSync('reddit_content_gaps.json', JSON.stringify(opportunities, null, 2));
}

scan();
