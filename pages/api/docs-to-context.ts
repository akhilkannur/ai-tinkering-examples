import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { findDocumentationUrl } from '../../lib/docs-discovery';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    // 1. Discovery Step
    let docUrl = url;
    if (!url.includes('docs.') && !url.includes('/docs')) {
      const foundUrl = await findDocumentationUrl(url);
      if (foundUrl) {
        docUrl = foundUrl;
      }
    }

    console.log(`🚀 API: Starting context generation for: ${docUrl}`);

    // 2. Spawn the Puppeteer crawler
    const scriptPath = path.join(process.cwd(), 'scripts', 'docs-to-context.js');
    const child = spawn('node', [scriptPath, docUrl, '15']); // Limit to 15 pages for speed

    let output = '';
    let error = '';

    child.stdout.on('data', (data) => {
      output += data.toString();
      console.log(`   Crawler: ${data.toString().trim()}`);
    });

    child.stderr.on('data', (data) => {
      error += data.toString();
      console.error(`   Crawler Error: ${data.toString().trim()}`);
    });

    child.on('close', (code) => {
      if (code === 0) {
        // Find the generated file (filenames are domain-based)
        const domain = new URL(docUrl).hostname.replace(/\./g, '-');
        const fileName = `${domain}.md`;
        const filePath = `/context/${fileName}`;

        res.status(200).json({ 
          success: true, 
          url: docUrl, 
          file: filePath,
          fileName: fileName
        });
      } else {
        res.status(500).json({ error: 'Crawling failed', details: error });
      }
    });

  } catch (err: any) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
}
