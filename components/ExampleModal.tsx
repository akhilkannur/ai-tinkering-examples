import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { X, ExternalLink, User } from 'lucide-react'
import type { EnrichedExampleRecord } from '../lib/airtable'
import Image from 'next/image'
import { optimizeImageUrl } from '../utils/cloudinary'

interface ExampleModalProps {
  example: EnrichedExampleRecord | null
  isOpen: boolean
  onClose: () => void
}

export default function ExampleModal({ example, isOpen, onClose }: ExampleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Update URL when modal opens/closes
  useEffect(() => {
    if (isOpen && example) {
      const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
      const exampleUrl = `/ai-examples/${categorySlug}/${example.slug}`
      
      // Update URL without navigation
      window.history.pushState(null, '', exampleUrl)
    }
  }, [isOpen, example])

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, onClose])

  // Handle escape key and outside clicks
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !example) return null

  const imgs = example.screenshots || []

  return (
    <div 
      ref={modalRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={contentRef}
        className={`relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full mx-4 transform transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="flex-1 pr-4">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {example.title}
            </h1>
            {example.summary && (
              <p className="text-slate-600 mt-2 leading-relaxed">
                {example.summary}
              </p>
            )}
            
            {/* Sponsor Info */}
            {example.sponsor && (
              <a 
                href={example.sponsor.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 p-2 bg-slate-100/80 rounded-lg hover:bg-slate-200/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">Sponsored by</span>
                  {example.sponsor.logo?.[0]?.url ? (
                    <div className="relative h-6 w-20">
                      <Image
                        src={example.sponsor.logo[0].url}
                        alt={`${example.sponsor.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-slate-700">{example.sponsor.name}</span>
                  )}
                </div>
              </a>
            )}

            <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
              {example.read_time && (
                <span>{example.read_time} min read</span>
              )}
              {example.publish_date && (
                <span>
                  {new Date(example.publish_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[70vh] p-6">
          {/* Images */}
          {imgs.length > 0 && (
            <div className="space-y-4 mb-6">
              {imgs.map((screenshot, i) => {
                // Temporarily disable Cloudinary optimization
                // const optimizedImageUrl = optimizeImageUrl(screenshot.url, 800)
                const optimizedImageUrl = screenshot.url
                return (
                  <div key={i} className="relative w-full rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={optimizedImageUrl || screenshot.url}
                      alt={`${example.title} screenshot ${i + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                      quality={90}
                      priority={i === 0}
                    />
                  </div>
                )
              })}
            </div>
          )}

          {/* Workflow steps */}
          {example.workflow_steps && (
            <section className="mb-6 p-4 border border-slate-200 rounded-xl bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                🔧 How to replicate
              </h2>
              <div className="prose prose-sm max-w-none text-slate-700">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-white p-4 rounded-lg border">
                  {example.workflow_steps}
                </pre>
              </div>
            </section>
          )}

          {/* Tags */}
          {example.tags && example.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {example.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-6 bg-slate-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {example.category && (
                <span className="px-3 py-1 text-sm bg-white border border-slate-200 rounded-full text-slate-700">
                  {example.category}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {example.author_name && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <User size={16} />
                  {example.author_link ? (
                    <a 
                      href={example.author_link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-600 underline"
                    >
                      {example.author_name}
                    </a>
                  ) : (
                    <span>{example.author_name}</span>
                  )}
                </div>
              )}
              
              {example.original_link && (
                <a
                  href={example.original_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={16} />
                  View Original
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
