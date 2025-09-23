import type { EnrichedExampleRecord } from '../lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Tag } from 'lucide-react'
import SponsorDetailCard from './SponsorDetailCard'

interface ExampleBodyProps {
  example: EnrichedExampleRecord
}

export default function ExampleBody({ example }: ExampleBodyProps) {
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'

  return (
    <>
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 leading-tight">
          {example.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
          {example.category && (
            <Link 
              href={`/ai-examples/category/${categorySlug}`}
              className="inline-flex items-center gap-1 px-3 py-1 border border-transparent rounded-full bg-accent text-white hover:bg-pink-500 transition-colors"
            >
              <Tag size={14} />
              {example.category}
            </Link>
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
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-roboto">
            <span className="font-bold">{example.summary.split(' ')[0]}</span>{' '}
            {example.summary.split(' ').slice(1).join(' ')}
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
                
              </div>
            ))}
          </div>
        )}

        {example.workflow_steps && (
          <div className="mb-6 pl-4 border-l-4 border-slate-200">
            <p className="text-base text-slate-700 leading-relaxed font-roboto">
              <span className="font-bold">{example.workflow_steps.split(' ')[0]}</span>{' '}
              {example.workflow_steps.split(' ').slice(1).join(' ')}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
