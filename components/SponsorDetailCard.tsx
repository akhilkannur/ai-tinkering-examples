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
      className="block p-4 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors shadow-sm"
    >
      <div className="flex items-center gap-4 mb-2">
        {sponsor.logo?.[0]?.url && (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-slate-100">
            <Image 
              src={sponsor.logo[0].url}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{sponsor.name}</h3>
        </div>
      </div>
      {sponsor.description && (
        <p className="text-sm text-slate-600 leading-relaxed">
          {sponsor.description}
        </p>
      )}
    </a>
  )
}
