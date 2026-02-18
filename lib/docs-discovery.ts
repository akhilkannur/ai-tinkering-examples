import https from 'https';

/**
 * Tries to find the documentation URL for a given domain using both
 * "brute force" checks and Gemini's intelligence.
 */
export async function findDocumentationUrl(domain: string): Promise<string | null> {
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const baseDomain = cleanDomain.split('/')[0];
  const baseUrl = `https://${baseDomain}`;

  console.log(`🔍 Scouting for docs on ${baseDomain}...`);

  // 1. First, try Brute Force for common paths (Fast & No Cost)
  const candidates = [
    `https://docs.${baseDomain}`,
    `https://developers.${baseDomain}`,
    `https://help.${baseDomain}`,
    `https://${baseDomain}/docs`,
    `https://${baseDomain}/api`,
  ];

  for (const url of candidates) {
    if (await checkUrl(url)) {
      console.log(`   ✅ Brute-Force Found: ${url}`);
      return url;
    }
  }

  // 2. If Brute Force fails, use Gemini's Intelligence
  console.log(`   🧠 Brute force failed. Engaging Gemini Brain...`);
  try {
    const geminiUrl = await smartFindDocsWithGemini(baseUrl);
    if (geminiUrl && await checkUrl(geminiUrl)) {
      console.log(`   ✨ Gemini Found: ${geminiUrl}`);
      return geminiUrl;
    }
  } catch (e) {
    console.error(`   ❌ Gemini Discovery failed:`, e);
  }

  return null;
}

/**
 * Uses Gemini to analyze the domain and guess the most likely documentation URL.
 */
async function smartFindDocsWithGemini(baseUrl: string): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = `You are a technical scout. Given the domain "${baseUrl}", identify the most likely URL for their developer documentation, API reference, or knowledge base. Return ONLY the full URL and nothing else. If you are unsure, provide your best guess for a common SaaS pattern.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  
  if (result && result.startsWith('http')) {
    return result;
  }
  
  return null;
}

function checkUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 3000 }, (res) => {
      if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
        resolve(true);
      } else {
        resolve(false);
      }
    });

    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}
