"use client"

import { useState, useEffect } from 'react'
import type { SponsorRecord } from '../lib/airtable'
import Image from 'next/image'
import { X } from 'lucide-react'

interface SponsorPopupProps {
  sponsors: SponsorRecord[]
}

export default function SponsorPopup({ sponsors }: SponsorPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (sponsors.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % sponsors.length)
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [sponsors.length])

  if (!sponsors || sponsors.length === 0 || !isVisible) {
    return null
  }

  const currentSponsor = sponsors[currentIndex]

  return (
    <div className="fixed bottom-4 right-4 w-72 bg-white rounded-lg shadow-2xl border border-slate-200 z-50 p-4 animate-[slide-in-up_0.5s_ease-out]">
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Close sponsor popup"
      >
        <X size={16} />
      </button>
      <a href={currentSponsor.Link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
        {currentSponsor.Logo && (
          <div className="relative w-10 h-10 rounded-md overflow-hidden bg-white flex-shrink-0">
            <Image 
              src={currentSponsor.Logo[0].url} 
              alt={`${currentSponsor.Name} logo`} 
              fill
              className="object-contain"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-sm text-slate-800 group-hover:text-blue-600 transition-colors">
            {currentSponsor.Name}
          </p>
          <p className="text-xs text-slate-500">{currentSponsor.Snippet}</p>
        </div>
      </a>
    </div>
  )
}
