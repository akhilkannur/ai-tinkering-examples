import type { SponsorRecord } from '../lib/airtable'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface SponsorCardProps {
  sponsor: SponsorRecord
}

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  if (!sponsor) return null

  const blurDataURL = sponsor.logo?.[0]?.thumbnails?.small?.url || sponsor.logo?.[0]?.thumbnails?.large?.url;

  return (
    <a 
      href={sponsor.website} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-4 rounded-none border border-navy-dark bg-secondary-bg hover:border-accent transition-colors group"
    >
      <div className="flex items-center gap-4">
        {sponsor.logo && (
          <div className="relative w-12 h-12 rounded-none overflow-hidden bg-white flex-shrink-0">
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
        <div className="flex-grow">
          <p className="font-mono font-semibold text-text-color group-hover:text-accent transition-colors">
            {sponsor.name}
          </p>
        </div>
        <ExternalLink size={16} className="text-text-secondary group-hover:text-accent transition-colors flex-shrink-0" />
      </div>
    </a>
  )
}
