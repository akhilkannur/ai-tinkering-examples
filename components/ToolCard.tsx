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
      className="block p-3 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all duration-200 shadow-md h-full flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transform" 
    >
      <div className="flex items-center gap-3">
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
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{tool.toolName}</h3> 
        </div>
      </div>
    </a>
  )
}