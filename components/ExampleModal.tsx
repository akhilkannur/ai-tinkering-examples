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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={contentRef}
        className={`relative bg-white border-4 border-black brutalist-shadow sm:max-w-4xl max-h-full sm:max-h-[90vh] w-full h-full sm:h-auto transform transition-all duration-300 flex flex-col ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        <div className="absolute top-4 right-4 z-[110]">
          <button
            onClick={onClose}
            className="p-2 bg-black text-white hover:bg-[#ff00ff] border-2 border-black transition-colors brutalist-shadow-sm"
            aria-label="Close modal"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="overflow-y-auto flex-grow pt-12 pb-8 scrollbar-hide">
          <ExampleBody example={example} />
        </div>

        {example.original_link && (
          <div className="border-t-4 border-black p-6 bg-gray-50 flex justify-center">
            <a
              href={example.original_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-black text-[#ccff00] font-display text-xl border-4 border-black brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase"
            >
              <ExternalLink size={20} strokeWidth={3} />
              View Original
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
