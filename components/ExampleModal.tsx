import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { X, ExternalLink } from 'lucide-react'
import type { EnrichedExampleRecord } from '../lib/airtable'
import ExampleBody from './ExampleBody'

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
    } else if (!isOpen && example) {
      // When closing, revert URL to the main examples page
      router.push('/ai-examples', undefined, { shallow: true });
    }
  }, [isOpen, example, router])

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        onClose()
      } else {
        // If modal is closed and user navigates back, ensure URL is correct
        router.push('/ai-examples', undefined, { shallow: true });
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isOpen, onClose, router])

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
        <div className="absolute top-0 right-0 pt-4 pr-4 z-10">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[90vh] py-6">
          <ExampleBody example={example} />
        </div>

        <div className="border-t border-slate-100 p-6 bg-slate-50 rounded-b-2xl">
          <div className="flex items-center justify-end">
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
  )
}
