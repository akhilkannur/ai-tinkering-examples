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
      className="group inline-flex items-center gap-4 py-2 px-md bg-white border border-border-color rounded-md hover:border-secondary-text transition-all duration-300" 
    >
      <div className="flex items-center gap-4">
        {sponsor.logo?.[0]?.url && (
          <div className="relative w-8 h-8 flex-shrink-0 rounded-sm overflow-hidden bg-white border border-border-color"> 
            <Image 
              src={sponsor.logo[0].thumbnails?.large?.url || sponsor.logo[0].url}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain p-1"
              {...(blurDataURL && {
                placeholder: 'blur',
                blurDataURL: blurDataURL,
              })}
            />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-[0.875rem] font-semibold text-primary-text leading-tight group-hover:text-accent-dark transition-colors">{sponsor.name}</h3> 
          {sponsor.description && (
            <p className="text-[0.75rem] font-normal text-secondary-text leading-none mt-1"> 
              {sponsor.description}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}
