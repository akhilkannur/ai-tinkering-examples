import type { EnrichedExampleRecord } from '../lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar, User, Tag } from 'lucide-react'
import SponsorDetailCard from './SponsorDetailCard'

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
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 leading-tight">
          {example.title}
        </h1>
        
        

        {/* Sponsor Info */}
        {example.sponsor && (
          <div className="my-4">
            <SponsorDetailCard sponsor={example.sponsor} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4">
        {example.summary && (
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6 font-roboto">
            {example.summary}
          </p>
        )}
        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-4 mb-4">
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
                {i === 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-4 text-sm">
                    {example.category && (
                      <Link 
                        href={`/ai-examples/category/${categorySlug}`}
                        className="inline-flex items-center gap-1 px-3 py-1 border rounded-full bg-accent text-secondary-bg hover:bg-blue-700 transition-colors [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]"
                      >
                        <Tag size={14} />
                        {example.category}
                      </Link>
                    )}
                    <div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
                      <Clock size={14} />
                      <span>{example.read_time || 1} min read</span>
                    </div>
                    {example.author_name && (
                      <div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)]">
                        <User size={14} />
                        {example.author_link ? (
                          <a 
                            href={example.author_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {example.author_name}
                          </a>
                        ) : (
                          <span>{example.author_name}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {example.workflow_steps && (
          <div className="mb-6 pl-4 border-l-4 border-slate-200">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 leading-tight">
              {example.workflow_steps}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
