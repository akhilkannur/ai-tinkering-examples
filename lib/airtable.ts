import Airtable from 'airtable'

// Configuration
const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
const apiKey = process.env.AIRTABLE_API_KEY
const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples'

console.log('Airtable Config:', {
  baseId: baseId ? `${baseId.slice(0, 8)}...` : 'missing',
  apiKey: apiKey ? `${apiKey.slice(0, 8)}...` : 'missing',
  tableName
})

if (!baseId || !apiKey) {
  console.error('❌ Airtable not configured properly!')
  console.error('Required environment variables:')
  console.error('- NEXT_PUBLIC_AIRTABLE_BASE_ID:', baseId ? '✓' : '❌ missing')
  console.error('- AIRTABLE_API_KEY:', apiKey ? '✓' : '❌ missing')
}

const base = baseId && apiKey ? new Airtable({ apiKey }).base(baseId) : null

export type ExampleRecord = {
  id: string
  title: string
  slug: string
  summary?: string | null
  screenshots?: { url: string; filename?: string }[] | null
  category?: string | null
  read_time?: number | null
  publish_date?: string | null
  workflow_steps?: string | null
  original_link?: string | null
  tags?: string[] | null
  author_name?: string | null
  author_link?: string | null
}

function processRecord(record: any): ExampleRecord {
  const title = record.get('Title') as string
  const slug = (record.get('Slug') as string) || 
    title?.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || 
    `record-${record.id}`

  return {
    id: record.id,
    title: title || 'Untitled',
    slug,
    summary: record.get('Summary') as string || null,
    screenshots: (record.get('Screenshots') as any[]) || null,
    category: record.get('Category') as string || null,
    read_time: record.get('Read time') as number || null,
    publish_date: record.get('Publish date') as string || null,
    workflow_steps: record.get('Workflow steps') as string || null,
    original_link: record.get('Original link') as string || null,
    tags: (record.get('Tags') as string[]) || null,
    author_name: record.get('Author name') as string || null,
    author_link: record.get('Author link') as string || null,
  }
}

export async function fetchExamples(): Promise<ExampleRecord[]> {
  if (!base) {
    console.warn('⚠️ Airtable not configured, returning empty array')
    return []
  }

  console.log('🔄 Fetching examples from Airtable...')
  
  try {
    const records: ExampleRecord[] = []
    
    // Use the promise-based approach instead of eachPage
    const result = await base(tableName)
      .select({
        view: 'Grid view',
        sort: [{ field: 'Publish date', direction: 'desc' }],
        // Remove maxRecords to get all records
      })
      .all()

    console.log(`✅ Found ${result.length} records in Airtable`)

    result.forEach(record => {
      try {
        const processedRecord = processRecord(record)
        records.push(processedRecord)
      } catch (error) {
        console.error(`❌ Error processing record ${record.id}:`, error)
      }
    })

    console.log(`✅ Successfully processed ${records.length} examples`)
    return records

  } catch (error) {
    console.error('❌ Error fetching examples from Airtable:', error)
    
    // Check if it's an authentication error
    if (error instanceof Error && error.message.includes('AUTHENTICATION_REQUIRED')) {
      console.error('🔐 Authentication failed. Check your AIRTABLE_API_KEY')
    }
    
    // Check if it's a base/table not found error
    if (error instanceof Error && error.message.includes('NOT_FOUND')) {
      console.error('🔍 Base or table not found. Check your NEXT_PUBLIC_AIRTABLE_BASE_ID and table name')
    }

    return []
  }
}

export async function fetchExampleBySlug(slug: string): Promise<ExampleRecord | null> {
  if (!base) {
    console.warn('⚠️ Airtable not configured')
    return null
  }

  console.log(`🔄 Fetching example with slug: ${slug}`)

  try {
    // First try to find by Slug field
    let records = await base(tableName)
      .select({ 
        filterByFormula: `{Slug} = "${slug}"`,
        maxRecords: 1 
      })
      .all()

    // If no records found by Slug, try to find by generated slug from Title
    if (records.length === 0) {
      console.log(`🔍 No record found with slug "${slug}", trying title-based search...`)
      
      // Get all records and find matching slug
      const allRecords = await base(tableName).select().all()
      
      for (const record of allRecords) {
        const processedRecord = processRecord(record)
        if (processedRecord.slug === slug) {
          records = [record]
          break
        }
      }
    }

    if (records.length === 0) {
      console.log(`❌ No example found with slug: ${slug}`)
      return null
    }

    const example = processRecord(records[0])
    console.log(`✅ Found example: ${example.title}`)
    return example

  } catch (error) {
    console.error(`❌ Error fetching example by slug "${slug}":`, error)
    return null
  }
}

// Helper function to test Airtable connection
export async function testAirtableConnection(): Promise<boolean> {
  if (!base) return false
  
  try {
    const result = await base(tableName).select({ maxRecords: 1 }).all()
    console.log('✅ Airtable connection successful')
    return true
  } catch (error) {
    console.error('❌ Airtable connection failed:', error)
    return false
  }
}
