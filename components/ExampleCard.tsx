import type { ExampleRecord } from '../lib/airtable'
import Link from 'next/link'

export default function ExampleCard({ example }: { example: ExampleRecord }) {
  const img = example.screenshots?.[0]?.url

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-100">
      <Link href={`/example/${example.slug}`} className="block">
        {img && (
          <div className="relative">
            <img
              src={img}
              alt={example.title}
              className="w-full h-44 object-cover"
            />
            <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full shadow">
              {example.read_time ?? 1} min read
            </span>
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
            {example.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-3">{example.summary}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs border border-slate-200 rounded-full bg-slate-50">
              {example.category}
            </span>
            {example.tags?.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs border border-slate-100 rounded-full bg-white text-slate-500"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}
