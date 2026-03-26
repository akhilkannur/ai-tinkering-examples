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
      <header className="max-w-4xl mx-auto px-lg py-xl">
        <div className="flex flex-wrap items-center gap-md mb-lg">
            {example.category && (
              <Link
                href={`/ai-examples/category/${categorySlug}`}
                className="inline-flex items-center gap-2 px-lg py-sm rounded-pill border border-border-color text-secondary-text hover:border-secondary-text hover:text-primary-text text-[0.75rem] font-semibold uppercase tracking-[0.05em] transition-all"
              >
                <Tag size={12} />
                {example.category}
              </Link>
            )}
            {example.author_name && (
              <div className="text-[0.75rem] font-medium text-secondary-text">
                {example.author_link ? (
                  <a
                    href={example.author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-text underline underline-offset-4 decoration-border-color hover:decoration-secondary-text transition-colors"
                  >
                    Source: {example.author_name}
                  </a>
                ) : (
                  <span>Source: {example.author_name}</span>
                )}
              </div>
            )}
        </div>

        <h1 className="text-[clamp(1.5rem,4vw,3.5rem)] font-display font-black tracking-[-0.02em] leading-[0.9] text-primary-text mb-xl uppercase">
          {example.title}
        </h1>

        {/* Sponsor Info */}
        {example.sponsor && (
          <div className="mb-xl border-l-4 border-accent-dark pl-xl py-md bg-hero-tint">
            <SponsorDetailCard sponsor={example.sponsor} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-lg pb-xxl">
        {example.summary && (
          <p className="text-[12px] md:text-[14px] font-mono font-bold text-secondary-text leading-relaxed mb-xl border-b-2 border-accent-dark pb-xl uppercase tracking-widest">
            {example.summary}
          </p>
        )}
        
        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-xl mb-xxl">
            {example.screenshots.map((screenshot, i) => {
              const publicId = i === 0 ? example.cloudinaryPublicId : null;
              const imageUrl = optimizeImageUrl(screenshot.url, publicId, 1200) || screenshot.url;

              return (
                <div key={i} className="relative w-full overflow-hidden border-4 border-accent-dark shadow-brutalist-sm bg-card-image-bg">
                  <Image
                    src={imageUrl}
                    alt={`${example.title} - Step ${i + 1}`}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover transition-opacity duration-500 hover:opacity-95"
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        )}

        {example.workflow_steps && (
          <div className="mb-xxl p-xl bg-hero-tint border-4 border-accent-dark relative">
            <div className="absolute -top-4 left-6 bg-accent-dark text-white px-3 py-1 font-display text-[10px] uppercase border-2 border-accent-dark">Workflow Logic</div>
            <p className="text-[12px] font-mono font-bold text-primary-text leading-relaxed uppercase tracking-widest">
              {example.workflow_steps}
            </p>
          </div>
        )}

        {/* Social Sharing */}
        <div className="mt-xxl py-xl border-t-2 border-accent-dark border-dotted">
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
