import type { NextApiRequest, NextApiResponse } from 'next'
import Airtable from 'airtable'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: 'Not found' })
  }

  const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
  const apiKey = process.env.AIRTABLE_API_KEY
  const tableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples'

  console.log('API Test - Environment variables:', {
    baseId: baseId ? `${baseId.slice(0, 8)}...` : 'missing',
    apiKey: apiKey ? `${apiKey.slice(0, 8)}...` : 'missing',
    tableName
  })

  if (!baseId) {
    return res.status(400).json({
      success: false,
      error: 'NEXT_PUBLIC_AIRTABLE_BASE_ID is missing',
      config: { baseId: false, apiKey: !!apiKey, tableName }
    })
  }

  if (!apiKey) {
    return res.status(400).json({
      success: false,
      error: 'AIRTABLE_API_KEY is missing',
      config: { baseId: !!baseId, apiKey: false, tableName }
    })
  }

  try {
    console.log('🔄 Testing Airtable connection...')
    
    const base = new Airtable({ apiKey }).base(baseId)
    
    // Test 1: Try to fetch one record
    console.log('Test 1: Fetching first record...')
    const testRecords = await base(tableName)
      .select({ maxRecords: 1 })
      .all()

    console.log(`✅ Test 1 passed: Found ${testRecords.length} record(s)`)

    if (testRecords.length === 0) {
      return res.json({
        success: true,
        message: 'Connection successful but no records found',
        recordCount: 0,
        config: { baseId: true, apiKey: true, tableName },
        suggestion: 'Check if your Airtable table has any records'
      })
    }

    // Test 2: Check field structure
    console.log('Test 2: Checking field structure...')
    const firstRecord = testRecords[0]
    const fields = firstRecord.fields
    const fieldNames = Object.keys(fields)

    console.log('Available fields:', fieldNames)

    // Test 3: Try to fetch all records
    console.log('Test 3: Fetching all records...')
    const allRecords = await base(tableName)
      .select({ view: 'Grid view' })
      .all()

    console.log(`✅ Test 3 passed: Found ${allRecords.length} total records`)

    // Sample record data
    const sampleRecord = {
      id: firstRecord.id,
      fields: Object.keys(firstRecord.fields).reduce((acc, key) => {
        const value = firstRecord.get(key)
        acc[key] = Array.isArray(value) ? `[Array of ${value.length} items]` : 
                   typeof value === 'string' && value.length > 50 ? `${value.slice(0, 50)}...` : 
                   value
        return acc
      }, {} as Record<string, any>)
    }

    return res.json({
      success: true,
      message: 'All tests passed!',
      recordCount: allRecords.length,
      config: { baseId: true, apiKey: true, tableName },
      fieldNames,
      sampleRecord,
      tests: {
        connection: '✅ Success',
        recordFetch: '✅ Success',
        fieldStructure: '✅ Success'
      }
    })

  } catch (error) {
    console.error('❌ Airtable test failed:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorDetails = {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    }

    // Check for specific error types
    if (errorMessage.includes('AUTHENTICATION_REQUIRED')) {
      return res.status(401).json({
        success: false,
        error: 'Authentication failed - check your AIRTABLE_API_KEY',
        details: errorDetails,
        config: { baseId: true, apiKey: false, tableName }
      })
    }

    if (errorMessage.includes('NOT_FOUND')) {
      return res.status(404).json({
        success: false,
        error: 'Base or table not found - check your NEXT_PUBLIC_AIRTABLE_BASE_ID and table name',
        details: errorDetails,
        config: { baseId: false, apiKey: true, tableName }
      })
    }

    return res.status(500).json({
      success: false,
      error: 'Airtable connection failed',
      details: errorDetails,
      config: { baseId: !!baseId, apiKey: !!apiKey, tableName }
    })
  }
}
