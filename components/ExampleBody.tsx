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

        <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-[-0.02em] leading-tight text-primary-text mb-xl">
          {example.title}
        </h1>

        {/* Sponsor Info */}
        {example.sponsor && (
          <div className="mb-xl border-l-2 border-primary-text pl-xl py-md bg-hero-tint rounded-r-md">
            <SponsorDetailCard sponsor={example.sponsor} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-lg pb-xxl">
        {example.summary && (
          <p className="text-[1.125rem] font-normal text-secondary-text leading-relaxed mb-xl border-b border-border-color pb-xl">
            {example.summary}
          </p>
        )}
        
        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-xl mb-xxl">
            {example.screenshots.map((screenshot, i) => {
              const publicId = i === 0 ? example.cloudinaryPublicId : null;
              const imageUrl = optimizeImageUrl(screenshot.url, publicId, 1200) || screenshot.url;

              return (
                <div key={i} className="relative w-full overflow-hidden rounded-md border border-border-color bg-card-image-bg">
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
          <div className="mb-xxl p-xl bg-hero-tint rounded-md border border-border-color relative">
            <div className="absolute -top-3 left-6 bg-white border border-border-color px-md py-1 rounded-sm text-primary-text text-[0.75rem] font-semibold uppercase tracking-[0.05em]">Workflow Logic</div>
            <p className="text-[1rem] text-primary-text leading-relaxed font-normal whitespace-pre-wrap">
              {example.workflow_steps}
            </p>
          </div>
        )}

        {/* Social Sharing */}
        <div className="mt-xxl py-xl border-t border-border-color">
          <SocialSharing
            example={example}
            title={example.title}
            description={example.summary}
            compact={false}
          />
        </div>

        {/* Setup Service CTA */}
        <div className="mt-xxl p-xl bg-accent-dark text-white rounded-md shadow-lg text-center">
          <h3 className="text-[1.5rem] font-semibold tracking-tight mb-md">Want to build a workflow like this?</h3>
          <p className="text-[1rem] text-light-placeholder mb-xl max-w-lg mx-auto leading-relaxed">
            Book a 90-minute setup sprint. I'll install the AI tools on your machine and build 3 automations with you. $99, money-back guarantee.
          </p>
          <Link
            href="/agent-setup-service"
            className="inline-flex items-center gap-2 bg-white text-accent-dark px-xl py-sm rounded-sm text-[0.875rem] font-medium hover:bg-hero-tint transition-all"
          >
            Book My Sprint
          </Link>
        </div>
      </div>
    </>
  )
}
