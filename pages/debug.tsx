import { GetServerSideProps } from 'next'
import { fetchExamples, testAirtableConnection } from '../lib/airtable'

interface DebugPageProps {
  config: {
    baseId: string | null
    apiKey: string | null
    tableName: string
  }
  connectionTest: boolean
  examples: any[]
  error?: string
}

export default function DebugPage({ config, connectionTest, examples, error }: DebugPageProps) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Airtable Debug Information</h1>
      
      {/* Configuration Status */}
      <section className="mb-8 p-6 border rounded-lg bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Configuration Status</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={config.baseId ? 'text-green-600' : 'text-red-600'}>
              {config.baseId ? '✅' : '❌'}
            </span>
            <span>NEXT_PUBLIC_AIRTABLE_BASE_ID: </span>
            <code className="bg-gray-200 px-2 py-1 rounded">
              {config.baseId ? `${config.baseId.slice(0, 8)}...` : 'Not set'}
            </code>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={config.apiKey ? 'text-green-600' : 'text-red-600'}>
              {config.apiKey ? '✅' : '❌'}
            </span>
            <span>AIRTABLE_API_KEY: </span>
            <code className="bg-gray-200 px-2 py-1 rounded">
              {config.apiKey ? `${config.apiKey.slice(0, 8)}...` : 'Not set'}
            </code>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            <span>Table Name: </span>
            <code className="bg-gray-200 px-2 py-1 rounded">
              {config.tableName}
            </code>
          </div>
        </div>
      </section>

      {/* Connection Test */}
      <section className="mb-8 p-6 border rounded-lg bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Connection Test</h2>
        <div className="flex items-center gap-2">
          <span className={connectionTest ? 'text-green-600' : 'text-red-600'}>
            {connectionTest ? '✅' : '❌'}
          </span>
          <span>
            {connectionTest ? 'Successfully connected to Airtable' : 'Failed to connect to Airtable'}
          </span>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
      </section>

      {/* Examples Data */}
      <section className="mb-8 p-6 border rounded-lg bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Examples Data</h2>
        <p className="mb-4">Found {examples.length} examples</p>
        
        {examples.length > 0 ? (
          <div className="space-y-4">
            {examples.slice(0, 3).map((example, index) => (
              <div key={index} className="p-4 bg-white border rounded">
                <h3 className="font-semibold">{example.title || 'No title'}</h3>
                <p className="text-sm text-slate-600">ID: {example.id}</p>
                <p className="text-sm text-slate-600">Slug: {example.slug}</p>
                <p className="text-sm text-slate-600">Category: {example.category || 'None'}</p>
                <p className="text-sm text-slate-600">
                  Screenshots: {example.screenshots?.length || 0}
                </p>
              </div>
            ))}
            {examples.length > 3 && (
              <p className="text-sm text-slate-600">
                ... and {examples.length - 3} more examples
              </p>
            )}
          </div>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-700">No examples found</p>
          </div>
        )}
      </section>

      {/* Environment Setup Instructions */}
      <section className="p-6 border rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
        <div className="text-sm space-y-2">
          <p>1. Create a <code>.env.local</code> file in your project root</p>
          <p>2. Add these variables:</p>
          <pre className="bg-gray-800 text-green-400 p-4 rounded mt-2">
{`NEXT_PUBLIC_AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_API_KEY=your_api_key_here
NEXT_PUBLIC_AIRTABLE_TABLE=Examples`}
          </pre>
          <p>3. Get your Base ID from your Airtable base URL (starts with "app")</p>
          <p>4. Get your API key from <a href="https://airtable.com/account" target="_blank" className="text-blue-600 underline">airtable.com/account</a></p>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const config = {
    baseId: process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID || null,
    apiKey: process.env.AIRTABLE_API_KEY || null,
    tableName: process.env.NEXT_PUBLIC_AIRTABLE_TABLE || 'Examples',
  }

  let connectionTest = false
  let examples: any[] = []
  let error: string | undefined

  try {
    connectionTest = await testAirtableConnection()
    examples = await fetchExamples()
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error occurred'
  }

  return {
    props: {
      config,
      connectionTest,
      examples,
      error,
    },
  }
}
