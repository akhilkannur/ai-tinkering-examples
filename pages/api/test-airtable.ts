import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchExamples } from '../../lib/airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const examples = await fetchExamples()
    const firstExample = examples[0]
    
    res.status(200).json({
      success: true,
      totalExamples: examples.length,
      firstExample: {
        title: firstExample?.title,
        hasScreenshots: !!firstExample?.screenshots,
        screenshotsCount: firstExample?.screenshots?.length || 0,
        screenshots: firstExample?.screenshots,
      },
      allExampleTitles: examples.map(ex => ({
        title: ex.title,
        hasScreenshots: !!ex.screenshots,
        screenshotCount: ex.screenshots?.length || 0
      }))
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}