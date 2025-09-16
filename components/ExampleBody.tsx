import type { EnrichedExampleRecord } from '../lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, User, Tag } from 'lucide-react'

interface ExampleBodyProps {
  example: EnrichedExampleRecord
}

export default function ExampleBody({ example }: ExampleBodyProps) {
  const publishDate = example.publish_date ? new Date(example.publish_date) : null
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'

  return (
    <>
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 mb-6">
          {example.category && (
            <Link 
              href={`/ai-examples/category/${categorySlug}`}
              className="inline-flex items-center gap-1 px-3 py-1 border rounded-full bg-white hover:bg-slate-50 transition-colors"
            >
              <Tag size={14} />
              {example.category}
            </Link>
          )}
          
          {publishDate && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime={example.publish_date}>
                {publishDate.toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{example.read_time || 1} min read</span>
          </div>

          {example.author_name && (
            <div className="flex items-center gap-1">
              <User size={14} />
              {example.author_link ? (
                <a 
                  href={example.author_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  {example.author_name}
                </a>
              ) : (
                <span>{example.author_name}</span>
              )}
            </div>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          {example.title}
        </h1>
        
        {example.summary && (
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
            {example.summary}
          </p>
        )}

        {/* Sponsor Info */}
        {example.sponsor && (
          <a 
            href={example.sponsor.website || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block my-4 p-3 bg-slate-100/80 rounded-lg hover:bg-slate-200/70 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Sponsored by</span>
              {example.sponsor.logo?.[0]?.url ? (
                <div className="relative h-8 w-24">
                  <img
                    src={example.sponsor.logo[0].url}
                    alt={`${example.sponsor.name} logo`}
                    className="object-contain h-full w-full"
                  />
                </div>
              ) : (
                <span className="text-sm font-semibold text-slate-700">{example.sponsor.name}</span>
              )}
            </div>
          </a>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4">
        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-4 mb-6">
            {example.screenshots.map((screenshot, i) => (
              <div key={i} className="relative w-full rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={screenshot.url}
                  alt={`${example.title} screenshot ${i + 1}`}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  quality={90}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        )}

        {example.workflow_steps && (
          <section className="mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
              🔧 How to replicate
            </h2>
            <div className="prose prose-sm max-w-none text-slate-700">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-white p-4 rounded-lg border">
                {example.workflow_steps}
              </pre>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
