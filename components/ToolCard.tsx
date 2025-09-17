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
      className="block p-3 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors shadow-md h-full flex flex-col justify-between" 
    >
      <div className="flex items-center gap-3">
        {tool.logo?.[0]?.url && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800 mb-2"> 
            <Image 
              src={tool.logo[0].url}
              alt={`${tool.toolName} logo`}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-white">{tool.toolName}</h3> 
        </div>
      </div>
    </a>
  )
}