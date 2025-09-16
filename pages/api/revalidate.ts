import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Simple on-demand revalidation endpoint. Protect with a secret key in prod.
  const secret = process.env.REVALIDATE_SECRET || 'please-change-me'
  if (req.query.secret !== secret) return res.status(401).json({ message: 'Invalid token' })
  try {
    await res.revalidate('/')
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error')
  }
}
