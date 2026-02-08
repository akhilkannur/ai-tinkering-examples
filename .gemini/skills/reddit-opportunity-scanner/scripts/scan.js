const https = require('https');

const SUBREDDITS = [
  'salesops', 'RevenueOperations', 'marketingops', 'coldemail', 'SalesDevelopment',
  'SaaS', 'growthhacking', 'startups', 'Solopreneur', 'googlesheets', 
  'Airtable', 'Zapier', 'MakeCom', 'ClaudeAI', 'PPC', 'adops', 
  'ecommerce', 'Shopify', 'SEO', 'nichewebsites'
];

const AI_KEYWORDS = [
  'apollo', 'clay', 'instantly', 'sheets', 'excel', 'automate', 'automation', 
  'workflow', 'script', 'claude', 'gemini', 'llm', 'agent', 'pseo', 
  'programmatic', 'competitor', 'ad library', 'enrichment', 'outreach', 
  'scraping', 'cleaning', 'hygiene', 'duplicate', 'airtable', 'zapier', 'make.com'
];

function fetchSubreddit(subreddit) {
  return new Promise((resolve) => {
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=25`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data.children.map(child => child.data));
        } catch (e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

async function scan() {
  let opportunities = [];
  const now = Date.now() / 1000;

  for (const sub of SUBREDDITS) {
    const posts = await fetchSubreddit(sub);
    const filtered = posts.filter(post => {
      const title = post.title.toLowerCase();
      const hasAI = AI_KEYWORDS.some(k => title.includes(k));
      const questionWords = ['how', 'why', 'what', 'where', 'help', 'any way', 'anyone', 'is there', 'can i', 'looking for'];
      const isQuestion = title.includes('?') || questionWords.some(w => title.startsWith(w)) || questionWords.some(w => title.includes(w + ' '));
      return hasAI && isQuestion;
    });
    
    filtered.forEach(p => {
        opportunities.push({
            subreddit: p.subreddit,
            title: p.title,
            url: `https://reddit.com${p.permalink}`,
            score: p.score
        });
    });
  }

  if (opportunities.length === 0) {
    console.log("No high-intent posts found right now.");
  } else {
    // Sort by score/freshness and pick the top one
    const best = opportunities.sort((a,b) => b.score - a.score)[0];
    console.log(`Subreddit: r/${best.subreddit}`);
    console.log(`Title: ${best.title}`);
    console.log(`URL: ${best.url}`);
  }
}

scan();
