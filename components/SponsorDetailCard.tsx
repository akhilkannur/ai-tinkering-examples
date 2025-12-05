import type { SponsorRecord } from '../lib/airtable'
import Image from 'next/image'

interface SponsorDetailCardProps {
  sponsor: SponsorRecord
}

export default function SponsorDetailCard({ sponsor }: SponsorDetailCardProps) {
  if (!sponsor) return null

  const blurDataURL = sponsor.logo?.[0]?.thumbnails?.small?.url || sponsor.logo?.[0]?.thumbnails?.large?.url;

  return (
    <a 
      href={sponsor.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex py-1 px-2 border border-navy-dark rounded-none bg-secondary-bg shadow-none transform hover:-translate-y-1 hover:border-accent transition-all duration-300" 
    >
      <div className="flex items-center gap-3">
        {sponsor.logo?.[0]?.url && (
          <div className="relative w-8 h-8 flex-shrink-0 rounded-none overflow-hidden bg-white"> 
            <Image 
              src={sponsor.logo[0].thumbnails?.large?.url || sponsor.logo[0].url}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain"
              {...(blurDataURL && {
                placeholder: 'blur',
                blurDataURL: blurDataURL,
              })}
            />
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-mono font-semibold text-text-color">{sponsor.name}</h3> 
          {sponsor.description && (
            <p className="text-xs text-text-secondary leading-relaxed font-mono"> 
              {sponsor.description}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}
