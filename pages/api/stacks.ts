import type { NextApiRequest, NextApiResponse } from 'next';

const TRUSTMRR_API = 'https://trustmrr.com/api/v1';
const API_KEY = process.env.TRUSTMRR_API_KEY;

interface TrustMRRStartup {
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  website: string | null;
  country: string | null;
  category: string | null;
  xHandle: string | null;
  revenue: {
    last30Days: number;
    mrr: number;
    total: number;
  };
  growth30d: number | null;
  customers: number;
  activeSubscriptions: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'TrustMRR API key not configured' });
  }

  try {
    const { category = 'ai', page = '1', limit = '20', sort = 'revenue-desc' } = req.query;

    const params = new URLSearchParams({
      category: String(category),
      page: String(page),
      limit: String(limit),
      sort: String(sort),
    });

    const response = await fetch(`${TRUSTMRR_API}/startups?${params}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'TrustMRR API error' });
    }

    const data = await response.json();

    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
