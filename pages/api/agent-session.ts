import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const LOG_FILE = path.join(process.cwd(), '.gemini/logs/current.json');

  // DEMO DATA for Vercel/Public Previews
  const demoSession = {
    id: 'demo_session_12345',
    agent: 'LinkedIn Lead Scraper Pro',
    status: 'completed',
    startTime: new Date().toISOString(),
    logs: [
      { timestamp: new Date().toISOString(), message: "Initializing Agentic Environment...", type: "system" },
      { timestamp: new Date().toISOString(), message: "Loading blueprint: LinkedIn Lead Scraper Pro", type: "system" },
      { timestamp: new Date().toISOString(), message: "Searching Google for high-intent B2B leads in SaaS...", type: "action" },
      { timestamp: new Date().toISOString(), message: "Found 42 potential targets on LinkedIn and Twitter.", type: "system" },
      { timestamp: new Date().toISOString(), message: "Extracting contact data for 'Founder' roles...", type: "action" },
      { timestamp: new Date().toISOString(), message: "Writing results to CSV...", type: "action" },
      { timestamp: new Date().toISOString(), message: "SUCCESS: Lead list generated.", type: "success" },
      { timestamp: new Date().toISOString(), message: "Analyzing lead quality using LLM...", type: "action" },
      { timestamp: new Date().toISOString(), message: "Generated summary report.", type: "success" },
      { timestamp: new Date().toISOString(), message: "Session Complete. Total Runtime: 14.5s", type: "system" }
    ],
    artifacts: [
      { name: "leads.csv", type: "csv", url: "#" },
      { name: "summary.md", type: "markdown", url: "#" }
    ]
  };

  if (!fs.existsSync(LOG_FILE)) {
    return res.status(200).json(demoSession);
  }

  try {
    const data = fs.readFileSync(LOG_FILE, 'utf-8');
    const session = JSON.parse(data);
    res.status(200).json(session);
  } catch (error) {
    res.status(200).json(demoSession);
  }
}
