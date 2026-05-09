const https = require('https');

function fetchSubreddit(subreddit, type = 'top', time = 'month') {
  return new Promise((resolve) => {
    const url = `https://www.reddit.com/r/${subreddit}/${type}.json?limit=10&t=${time}`;
    
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data.children.map(child => child.data));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', (e) => {
      resolve([]);
    });
  });
}

async function run() {
  const posts = await fetchSubreddit('ChatGPTPro');
  posts.forEach((p, i) => {
    console.log(`--- POST ${i+1} ---`);
    console.log(`TITLE: ${p.title}`);
    console.log(`TEXT: ${p.selftext.substring(0, 500)}...`);
    console.log('\n');
  });
}

run();
