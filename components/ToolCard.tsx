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
      className="block p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors shadow-sm h-full flex flex-col justify-between"
    >
      <div>
        {tool.logo?.[0]?.url && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 mb-2">
            <Image 
              src={tool.logo[0].url}
              alt={`${tool.toolName} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h3 className="text-sm font-semibold text-slate-900 mb-0.5">{tool.toolName}</h3>
        {tool.shortDescription && (
          <p className="text-xs text-slate-600 mt-2 line-clamp-2">{tool.shortDescription}</p>
        )}
      </div>
    </a>
  )
}