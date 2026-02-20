import type { EnrichedExampleRecord } from '../lib/airtable'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Tag, ExternalLink } from 'lucide-react'
import { optimizeImageUrl } from '../utils/cloudinary'
import SponsorDetailCard from './SponsorDetailCard'
import SocialSharing from './SocialSharing'

interface ExampleBodyProps {
  example: EnrichedExampleRecord
}

export default function ExampleBody({ example }: ExampleBodyProps) {
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'

  return (
    <>
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center gap-4 mb-6">
            {example.category && (
              <Link
                href={`/ai-examples/category/${categorySlug}`}
                className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#ccff00] font-black text-[10px] uppercase border-2 border-black transform -rotate-1 brutalist-shadow-sm hover:rotate-0 transition-transform"
              >
                <Tag size={12} strokeWidth={3} />
                {example.category}
              </Link>
            )}
            {example.author_name && (
              <div className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-1 border border-black">
                {example.author_link ? (
                  <a
                    href={example.author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff00ff] transition-colors"
                  >
                    Source: {example.author_name}
                  </a>
                ) : (
                  <span>Source: {example.author_name}</span>
                )}
              </div>
            )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-display text-black mb-8 leading-tight uppercase glitch-text" data-text={example.title.toUpperCase()}>
          {example.title}
        </h1>

        {/* Sponsor Info */}
        {example.sponsor && (
          <div className="mb-8 border-l-8 border-[#ff00ff] pl-6 py-4 bg-gray-50">
            <SponsorDetailCard sponsor={example.sponsor} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6">
        {example.summary && (
          <p className="text-lg sm:text-xl text-black font-bold leading-relaxed mb-10 font-mono uppercase">
            // {example.summary}
          </p>
        )}
        
        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-10 mb-12">
            {example.screenshots.map((screenshot, i) => {
              const publicId = i === 0 ? example.cloudinaryPublicId : null;
              const imageUrl = optimizeImageUrl(screenshot.url, publicId, 1200) || screenshot.url;

              return (
                <div key={i} className="relative w-full overflow-hidden border-4 border-black brutalist-shadow-sm bg-gray-50">
                  <Image
                    src={imageUrl}
                    alt={`${example.title} - Step ${i + 1}`}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        )}

        {example.workflow_steps && (
          <div className="mb-12 border-4 border-black p-8 bg-[#ccff00]/10 border-dashed relative">
            <div className="absolute -top-4 left-6 bg-black text-white px-3 py-1 font-display text-xs uppercase border-2 border-black">Workflow Logic</div>
            <p className="text-base text-black leading-relaxed font-black font-mono uppercase">
              {example.workflow_steps}
            </p>
          </div>
        )}

        {/* Social Sharing */}
        <div className="mt-12 py-8 border-t-4 border-black border-dotted">
          <SocialSharing
            example={example}
            title={example.title}
            description={example.summary}
            compact={false}
          />
        </div>
      </div>
    </>
  )
}
