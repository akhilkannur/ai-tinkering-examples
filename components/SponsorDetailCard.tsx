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
      className="group inline-flex py-2 px-4 border-2 border-black bg-white brutalist-shadow-sm transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 items-center gap-4" 
    >
      <div className="flex items-center gap-4">
        {sponsor.logo?.[0]?.url && (
          <div className="relative w-10 h-10 flex-shrink-0 rounded-none overflow-hidden bg-white border border-black shadow-inner rotate-3 group-hover:rotate-0 transition-transform"> 
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
          <h3 className="text-sm font-display text-black uppercase leading-tight group-hover:text-[#ff00ff] transition-colors">{sponsor.name}</h3> 
          {sponsor.description && (
            <p className="text-[10px] font-black font-mono text-gray-500 uppercase tracking-widest leading-none mt-1"> 
              // {sponsor.description}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}
