import type { ToolRecord } from '../lib/airtable'
import Image from 'next/image'

interface ToolCardProps {
  tool: ToolRecord
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <a 
      href={tool.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors shadow-sm h-full flex flex-col justify-between"
    >
      <div>
        {tool.logo?.[0]?.url && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 mb-3">
            <Image 
              src={tool.logo[0].url}
              alt={`${tool.toolName} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-base font-semibold text-slate-900 mb-1">{tool.toolName}</h3>
        {tool.shortDescription && (
          <p className="text-xs text-slate-600 mt-2 line-clamp-3">{tool.shortDescription}</p>
        )}
      </div>
    </a>
  )
}
