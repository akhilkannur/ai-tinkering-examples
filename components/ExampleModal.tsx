import { useEffect, useRef } from 'react'
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-accent-dark/90 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={contentRef}
        className={`relative bg-white rounded-md shadow-2xl sm:max-w-4xl max-h-full sm:max-h-[90vh] w-full h-full sm:h-auto transform transition-all duration-300 flex flex-col ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="absolute top-6 right-6 z-[110]">
          <button
            onClick={onClose}
            className="p-2 text-secondary-text hover:text-primary-text hover:bg-hero-tint rounded-md transition-all"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow pt-xxl pb-xl scrollbar-hide">
          <ExampleBody example={example} />
        </div>

        {example.original_link && (
          <div className="border-t border-border-color p-lg bg-hero-tint flex justify-center rounded-b-md">
            <a
              href={example.original_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-xl py-sm bg-accent-dark text-white rounded-sm text-[0.875rem] font-medium hover:bg-black transition-all"
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
