import { EnrichedExampleRecord } from '../lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { optimizeImageUrl } from '../utils/cloudinary'

interface ExampleBodyProps {
  example: EnrichedExampleRecord
}

export default function ExampleBody({ example }: ExampleBodyProps) {
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'

  return (
    <>
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {example.category && (
            <Link
              href={`/ai-examples/category/${categorySlug}`}
              className="px-4 py-1.5 rounded-sm bg-micro-layer-1 text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted hover:text-micro-fg transition-colors"
            >
              {example.category}
            </Link>
          )}
          {example.author_name && (
            <div className="text-xs font-bold text-micro-muted uppercase tracking-widest">
              {example.author_link ? (
                <a
                  href={example.author_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-micro-fg transition-colors"
                >
                  Source: {example.author_name}
                </a>
              ) : (
                <span>Source: {example.author_name}</span>
              )}
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-micro-fg leading-tight mb-8">
          {example.title}
        </h1>
      </header>

      {/* Content */}
      <div>
        {example.summary && (
          <p className="text-lg text-micro-muted font-medium leading-relaxed mb-10 pb-10 border-b border-micro-layer-1">
            {example.summary}
          </p>
        )}

        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-8 mb-12">
            {example.screenshots.map((screenshot, i) => {
              const publicId = i === 0 ? example.cloudinaryPublicId : null;
              const imageUrl = optimizeImageUrl(screenshot.url, publicId, 1200) || screenshot.url;

              return (
                <div key={i} className="rounded-sm overflow-hidden border border-micro-layer-1 shadow-soft">
                  <Image
                    src={imageUrl}
                    alt={`${example.title} - Step ${i + 1}`}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        )}

        {example.workflow_steps && (
          <div className="mb-12 p-8 bg-micro-layer-1 rounded-sm border border-micro-layer-1">
            <p className="text-sm font-medium text-micro-muted leading-relaxed">
              {example.workflow_steps}
            </p>
          </div>
        )}
      </div>
    </>
  )
}