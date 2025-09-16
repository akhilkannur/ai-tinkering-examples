import Airtable from 'airtable'

const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY
const tableName = process.env.NEXT_PUBLIC_AIRTABLE_SPONSORS_TABLE || 'Sponsors'

const base = baseId && apiKey ? new Airtable({ apiKey }).base(baseId) : null

export type SponsorRecord = {
  id: string
  Name: string
  Logo?: { url: string }[]
  Link?: string
  Snippet?: string
  Placement?: 'Category Snippet' | 'Popup'
  Category?: string[]
}

function processRecord(record: any): SponsorRecord {
  return {
    id: record.id,
    Name: record.get('Name') as string,
    Logo: record.get('Logo') as { url: string }[],
    Link: record.get('Link') as string,
    Snippet: record.get('Snippet') as string,
    Placement: record.get('Placement') as 'Category Snippet' | 'Popup',
    Category: record.get('Category') as string[],
  }
}

export async function fetchSponsors(): Promise<SponsorRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured for sponsors, returning empty array')
    return []
  }

  try {
    const records: SponsorRecord[] = []
    const result = await base(tableName).select({ view: 'Grid view' }).all()

    result.forEach(record => {
      try {
        const processedRecord = processRecord(record)
        records.push(processedRecord)
      } catch (error) {
        console.error(`❌ Error processing sponsor record ${record.id}:`, error)
      }
    })

    return records
  } catch (error) {
    console.error('❌ Error fetching sponsors from Airtable:', error)
    return []
  }
}
