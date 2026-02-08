import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const LOG_FILE = path.join(process.cwd(), '.gemini/logs/current.json');

  if (!fs.existsSync(LOG_FILE)) {
    return res.status(200).json({ status: 'idle', logs: [], artifacts: [] });
  }

  try {
    const data = fs.readFileSync(LOG_FILE, 'utf-8');
    const session = JSON.parse(data);
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read session data' });
  }
}
