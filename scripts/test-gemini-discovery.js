require('dotenv').config();
const https = require('https');

async function testGemini(domain) {
  const apiKey = process.env.GEMINI_API_KEY;
  const prompt = `You are a technical scout. Given the domain "${domain}", identify the most likely URL for their developer documentation, API reference, or knowledge base. Return ONLY the full URL and nothing else.`;

  console.log(`🧠 Asking Gemini about: ${domain}...`);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    console.log(`📡 Response for ${domain}:`, JSON.stringify(data, null, 2));
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log(`✨ Gemini Result: ${result}`);
  } catch (e) {
    console.error(`❌ Error: ${e.message}`);
  }
}

testGemini('hubspot.com');
testGemini('instantly.ai');
testGemini('clay.com');
