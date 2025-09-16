import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg sm:text-xl font-bold hover:text-slate-700 transition-colors">
          AI Tinkering Examples
        </Link>
        <nav className="text-sm text-slate-600">
          <a 
            href="mailto:contact@your-domain.com" 
            className="hover:text-slate-900 transition-colors font-medium"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}
