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
      className="block p-3 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors shadow-md" {/* Adjusted colors and shadow */}
    >
      <div className="flex items-center gap-3 mb-1">
        {sponsor.logo?.[0]?.url && (
          <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-800"> {/* Adjusted background */}
            <Image 
              src={sponsor.logo[0].url}
              alt={`${sponsor.name} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-base font-semibold text-white">{sponsor.name}</h3> {/* Adjusted text color */}
        </div>
      </div>
      {sponsor.description && (
        <p className="text-xs text-gray-400 leading-relaxed"> {/* Adjusted text color */}
          {sponsor.description}
        </p>
      )}
    </a>
  )
}