import type { SponsorRecord } from '../lib/airtable'
import Image from 'next/image'

interface SponsorDetailCardProps {
  sponsor: SponsorRecord
}

export default function SponsorDetailCard({ sponsor }: SponsorDetailCardProps) {
  if (!sponsor) return null

  return (
    <a 
      href={sponsor.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-2 border border-[#001858] rounded-lg bg-primary-bg shadow-lg transform hover:-translate-y-1 hover:border-[#001858] transition-all duration-300" 
    >
      <div className="flex items-center gap-3">
        {sponsor.logo?.[0]?.url && (
          <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-slate-100"> 
            <Image 
              src={sponsor.logo[0].url}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-semibold text-text-color">{sponsor.name}</h3> 
          {sponsor.description && (
            <p className="text-xs text-text-color leading-relaxed"> 
              {sponsor.description}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}
