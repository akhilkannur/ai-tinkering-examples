const https = require('https');
const fs = require('fs');
const path = require('path');

// Subreddits to scan
const SUBREDDITS = [
  'salesops', 'RevenueOperations', 'marketingops', 'coldemail', 'leadgeneration', 
  'emailmarketing', 'HubSpot', 'PPC', 'SEO', 'googlesheets', 'excel', 'Automate', 
  'SaaS', 'startups', 'smallbusiness', 'Entrepreneur', 'freelance', 
  'ChatGPT', 'ClaudeAI', 'OpenAI', 'GeminiAI', 'LocalLLaMA', 'PromptEngineering', 
  'ArtificialInteligence'
];

// Keywords to prioritize (must have at least one)
const AI_KEYWORDS = ['ai', 'chatgpt', 'claude', 'gemini', 'automate', 'workflow', 'bot', 'agent', 'script', 'tool', 'llm', 'openai', 'anthropic', 'stack', 'software', 'help'];

// Keywords to exclude (too technical or irrelevant)
const BLOCK_KEYWORDS = ['api', 'key', 'error', 'bug', 'deploy', 'hosting', 'server', 'down', 'outage', 'hiring', 'job'];

function fetchSubreddit(subreddit, type = 'hot') {
  return new Promise((resolve) => {
    const url = `https://www.reddit.com/r/${subreddit}/${type}.json?limit=50`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.data) {
            console.error(`Invalid response for ${subreddit} (${type})`);
            resolve([]);
            return;
          }
          resolve(json.data.children.map(child => child.data));
        } catch (e) {
          console.error(`Failed to parse ${subreddit} (${type}):`, e.message);
          resolve([]);
        }
      });
    }).on('error', (e) => {
      console.error(`Error fetching ${subreddit} (${type}):`, e.message);
      resolve([]);
    });
  });
}

async function scan() {
  console.log('🔍 Scanning Reddit for recent content gaps (last 48h)...');
  let allPosts = [];
  const now = Date.now() / 1000;
  const fortyEightHoursAgo = now - (48 * 60 * 60);

  for (const sub of SUBREDDITS) {
    console.log(`   Scanning r/${sub}...`);
    const hotPosts = await fetchSubreddit(sub, 'hot');
    const newPosts = await fetchSubreddit(sub, 'new');
    
    // Merge and de-duplicate
    const seen = new Set();
    [...hotPosts, ...newPosts].forEach(p => {
      if (!seen.has(p.id)) {
        allPosts.push(p);
        seen.add(p.id);
      }
    });

    // Polite delay
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`
Analyzing ${allPosts.length} unique posts...`);

  const opportunities = allPosts
    .filter(post => {
      const title = post.title.toLowerCase();
      const isQuestion = title.includes('?') || title.startsWith('how') || title.includes('way to') || title.includes('anyone');
      const hasAI = AI_KEYWORDS.some(k => title.includes(k));
      const isBlocked = BLOCK_KEYWORDS.some(k => title.includes(k));
      const isRecent = post.created_utc > fortyEightHoursAgo;
      const hasVotes = post.score >= 1; // Include all posts with at least one vote

      return isQuestion && hasAI && !isBlocked && isRecent && hasVotes;
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
