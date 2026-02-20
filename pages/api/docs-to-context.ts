import { NextApiRequest, NextApiResponse } from 'next';
import { findDocumentationUrl } from '../../lib/docs-discovery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    // 1. Discovery Step
    let docUrl = url;
    if (!url.includes('docs.') && !url.includes('/docs')) {
      const foundUrl = await findDocumentationUrl(url);
      if (foundUrl) {
        docUrl = foundUrl;
      }
    }

    console.log(`🚀 API: Extracting context for: ${docUrl}`);

    // 2. Use Jina Reader to get clean Markdown (Serverless Friendly Scraper)
    const jinaUrl = `https://r.jina.ai/${docUrl}`;
    const scraperResponse = await fetch(jinaUrl);
    
    if (!scraperResponse.ok) {
      throw new Error(`Failed to scrape ${docUrl} via Jina Reader`);
    }

    const rawMarkdown = await scraperResponse.text();

    // 3. Use Gemini to "Agent-Optimize" the context
    let finalContent = rawMarkdown;
    
    if (apiKey) {
      console.log(`   🧠 Refining with Gemini...`);
      const prompt = `
        You are a Technical Writer. I will provide you with a raw Markdown scrape of a documentation page.
        Your task is to:
        1. Clean up any leftover navigation artifacts or junk.
        2. Ensure the technical hierarchy (H1, H2, H3) is logical.
        3. Keep all code blocks and API endpoint details exactly as they are.
        4. Add a top-level metadata section for an AI Agent.
        
        Return ONLY the refined Markdown.
        
        --- RAW CONTENT ---
        ${rawMarkdown.slice(0, 30000)} 
      `;

      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const geminiData = await geminiResponse.json();
      const refined = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (refined) {
        finalContent = refined;
      }
    }

    const domain = new URL(docUrl).hostname.replace(/\./g, '-');
    const fileName = `${domain}.md`;

    res.status(200).json({ 
      success: true, 
      url: docUrl, 
      content: finalContent,
      fileName: fileName
    });

  } catch (err: any) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
}
