import { useEffect, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import type { EnrichedExampleRecord } from '../lib/airtable'
import ExampleBody from './ExampleBody'
// SocialSharing is no longer directly imported here as it's moved to ExampleBody

interface ExampleModalProps {
  example: EnrichedExampleRecord | null
  isOpen: boolean
  onClose: () => void
}

export default function ExampleModal({ example, isOpen, onClose }: ExampleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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

  return (
    <div 
      ref={modalRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={contentRef}
        className={`relative bg-white sm:rounded-2xl shadow-2xl sm:max-w-4xl max-h-full sm:max-h-[90vh] w-full h-full sm:h-auto transform transition-all duration-300 flex flex-col ${
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

        <div className="overflow-y-auto flex-grow pt-6"> {/* Removed max-h, added flex-grow */}
          <ExampleBody example={example} />
        </div>

        {example.original_link && ( // Only render this div if original_link exists
          <div className="border-t border-slate-100 p-4 bg-slate-50 rounded-b-2xl shadow-inner flex justify-center"> {/* Removed sticky bottom-0, added flex justify-center */}
            <a
              href={example.original_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 text-base font-bold border border-transparent rounded-full shadow-sm text-electric-blue bg-accent hover:bg-accent hover:text-electric-blue transition-all duration-300 transform hover:scale-105"
            >
              <ExternalLink size={16} />
              View Original
            </a>
          </div>
        )}
      </div>
    </div>
  )
}