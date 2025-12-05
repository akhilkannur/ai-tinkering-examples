import type { EnrichedExampleRecord } from '../lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Tag } from 'lucide-react'
import SponsorDetailCard from './SponsorDetailCard'
import SocialSharing from './SocialSharing' // Import SocialSharing

interface ExampleBodyProps {
  example: EnrichedExampleRecord
}

export default function ExampleBody({ example }: ExampleBodyProps) {
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'

  return (
    <>
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-bold text-text-color mb-4 leading-tight">
          {example.title}
        </h1>
        <div className="flex items-center justify-between text-sm text-text-secondary mb-6 mt-4 font-mono">
          <div className="flex flex-wrap items-center gap-6"> {/* Group category and author */}
            {example.category && (
              <Link
                href={`/ai-examples/category/${categorySlug}`}
                className="inline-flex items-center gap-1 px-3 py-1 border border-accent rounded-none text-accent bg-transparent hover:bg-accent hover:text-electric-blue transition-colors"
              >
                <Tag size={14} />
                {example.category}
              </Link>
            )}
            {example.author_name && (
              <div className="flex items-center gap-1">
                <User size={14} />
                {example.author_link ? (
                  <a
                    href={example.author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {example.author_name}
                  </a>
                ) : (
                  <span>{example.author_name}</span>
                )}
              </div>
            )}
          </div>
          
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
          <p className="text-base sm:text-lg text-text-color leading-relaxed mb-6 font-sans">
            <span className="font-bold">{example.summary.split(' ')[0]}</span>{' '}
            {example.summary.split(' ').slice(1).join(' ')}
          </p>
        )}
        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-4 mb-4">
            {example.screenshots.map((screenshot, i) => (
              <div key={i} className="relative w-full rounded-none overflow-hidden border border-navy-dark bg-secondary-bg">
                <Image
                  src={screenshot.url}
                  alt={`${example.title} - ${example.summary || 'AI workflow example screenshot'} - Step ${i + 1}`}
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
          <div className="mb-6 pl-4 border-l-2 border-accent">
            <p className="text-base text-text-secondary leading-relaxed font-sans">
              <span className="font-bold text-text-color">{example.workflow_steps.split(' ')[0]}</span>{' '}
              {example.workflow_steps.split(' ').slice(1).join(' ')}
            </p>
          </div>
        )}

        {/* Social Sharing */}
        <div className="mt-8 py-4 border-t border-navy-dark">
          <SocialSharing
            example={example}
            title={example.title}
            description={example.summary}
            compact={false} // Use full version here
          />
        </div>
      </div>
    </>
  )
}
