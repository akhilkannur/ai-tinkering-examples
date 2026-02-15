const https = require('https');
const fs = require('fs');
const querystring = require('querystring');

// --- Configuration ---
const SUBREDDITS = [
    'salesops', 'RevenueOperations', 'marketingops', 'coldemail', 'leadgeneration',
    'emailmarketing', 'PPC', 'SEO', 'googlesheets', 'Automate',
    'SaaS', 'startups', 'smallbusiness', 'Entrepreneur', 'freelance',
    'SalesDevelopment', 'growthhacking', 'ClaudeAI', 'GeminiAI', 'PromptEngineering'
];

const AI_KEYWORDS = [
    'apollo', 'clay', 'instantly', 'hubspot', 'salesforce', 'sheets', 'excel',
    'bulk', 'scrape', 'scraping', 'enrich', 'enrichment', 'automate', 'automation',
    'workflow', 'extract', 'extraction', 'scale', 'script',
    'claude', 'gemini', 'llm', 'agent', 'gpt'
];

const REDDIT_API_HOST = 'oauth.reddit.com';
const REDDIT_WWW_HOST = 'www.reddit.com';
const USER_AGENT = 'Gemini-CLI-Scanner/0.1 by u/your_reddit_username'; // It's good practice to change this

// --- Helper Functions ---

/**
 * Gets an OAuth2 token from Reddit's API.
 * @returns {Promise<string|null>} A promise that resolves to the access token, or null on failure.
 */
function getAuthToken() {
    return new Promise((resolve, reject) => {
        const clientId = process.env.REDDIT_CLIENT_ID;
        const clientSecret = process.env.REDDIT_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return reject(new Error('Reddit Client ID or Secret not found in environment variables.'));
        }

        const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const postData = querystring.stringify({
            grant_type: 'client_credentials',
        });

        const options = {
            hostname: REDDIT_WWW_HOST,
            path: '/api/v1/access_token',
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                'User-Agent': USER_AGENT,
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed.access_token);
                    } catch (e) {
                        reject(new Error('Failed to parse auth token response.'));
                    }
                } else {
                    reject(new Error(`Failed to get auth token. Status: ${res.statusCode} - ${data}`));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(postData);
        req.end();
    });
}

/**
 * Searches a subreddit for posts matching a query.
 * @param {string} token - The OAuth2 access token.
 * @param {string} subreddit - The subreddit to search.
 * @returns {Promise<Array>} A promise that resolves to an array of post data.
 */
function searchSubreddit(token, subreddit) {
    return new Promise((resolve, reject) => {
        // Construct a search query using OR for all keywords
        const searchQuery = AI_KEYWORDS.join(' OR ');
        const queryParams = querystring.stringify({
            q: searchQuery,
            sort: 'new', // Get the most recent posts
            t: 'day',     // Limit search to the last 24 hours
            restrict_sr: 'on', // Restrict search to the specified subreddit
            limit: 25, // Max 100, but 25 is reasonable for a scan
        });

        const options = {
            hostname: REDDIT_API_HOST,
            path: `/r/${subreddit}/search.json?${queryParams}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'User-Agent': USER_AGENT,
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed.data.children.map(child => child.data));
                    } catch (e) {
                        console.error(`Error parsing data for r/${subreddit}:`, e.message);
                        resolve([]); // Resolve with empty array on parse error
                    }
                } else {
                    console.error(`Error searching r/${subreddit}. Status: ${res.statusCode}`);
                    resolve([]); // Resolve with empty array on API error
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Request error for r/${subreddit}:`, e.message);
            resolve([]); // Resolve with empty array on request error
        });
        req.end();
    });
}

// --- Main Execution ---

async function scan() {
    console.log('🚀 Starting Reddit scan with official API...');
    let token;

    try {
        token = await getAuthToken();
        console.log('✅ Authentication successful.');
    } catch (error) {
        console.error('❌ FATAL: Could not authenticate with Reddit.', error.message);
        return;
    }

    let allOpportunities = [];
    for (const sub of SUBREDDITS) {
        console.log(`   🔎 Scanning r/${sub}...`);
        const posts = await searchSubreddit(token, sub);
        
        const recentPosts = posts.filter(post => {
            // Additional check, even though API is set to `t=day`, let's filter for last 3 hours
            const postTime = post.created_utc * 1000;
            const threeHoursAgo = Date.now() - (3 * 60 * 60 * 1000);
            return postTime > threeHoursAgo;
        });

        if (recentPosts.length > 0) {
            console.log(`      Found ${recentPosts.length} potential opportunities in r/${sub}.`);
            allOpportunities.push(...recentPosts);
        }
        
        // Polite delay to respect rate limits
        await new Promise(r => setTimeout(r, 1100)); // Just over 1 second per sub
    }

    console.log(`
✅ Scan complete. Found ${allOpportunities.length} total raw posts.`);

    const formattedOpportunities = allOpportunities
        .map(post => ({
            subreddit: post.subreddit,
            score: post.score,
            title: post.title,
            url: `https://reddit.com${post.permalink}`,
            created: new Date(post.created_utc * 1000).toISOString(),
        }))
        .sort((a, b) => b.score - a.score);

    const outputPath = 'reddit_api_opportunities.json';
    fs.writeFileSync(outputPath, JSON.stringify(formattedOpportunities, null, 2));

    console.log(`
✨ Results saved to ${outputPath}`);
}

scan();
