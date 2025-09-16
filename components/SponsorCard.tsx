import type { SponsorRecord } from '../lib/airtable'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

interface SponsorCardProps {
  sponsor: SponsorRecord
}

export default function SponsorCard({ sponsor }: SponsorCardProps) {
  if (!sponsor) return null

  return (
    <a 
      href={sponsor.Link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block p-4 rounded-lg border bg-slate-50 hover:bg-slate-100 transition-colors group"
    >
      <div className="flex items-center gap-4">
        {sponsor.Logo && (
          <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white flex-shrink-0">
            <Image 
              src={sponsor.Logo[0].url} 
              alt={`${sponsor.Name} logo`} 
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-grow">
          <p className="font-semibold text-slate-800 group-hover:text-blue-600">
            {sponsor.Name}
          </p>
          <p className="text-sm text-slate-600">{sponsor.Snippet}</p>
        </div>
        <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
      </div>
    </a>
  )
}
