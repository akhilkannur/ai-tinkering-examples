import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'

import Image from 'next/image'

export default function Navbar() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/ai-examples', label: 'Examples' },
    { href: '/tools', label: 'Tools' },
    { href: '/jobs', label: 'Jobs' },
  ]

  return (
    <nav className="bg-primary-bg/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="AI Examples Logo" width={48} height={48} className="rounded-full" />
                <span className="text-xl font-black text-accent">AI Examples</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                    router.pathname.startsWith(link.href)
                      ? 'border-accent text-text-color'
                      : 'border-transparent text-light-purple hover:border-accent hover:text-text-color'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Desktop Submit Button */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a
              href="https://airtable.com/appUo7R0la4VUzOoT/shrk9A6i9TF4UjTfo"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full shadow-sm text-base font-bold text-primary-bg bg-accent hover:bg-bright-pink hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Submit an Example
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-light-purple hover:text-text-color focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-secondary-bg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  router.pathname.startsWith(link.href)
                    ? 'bg-accent text-primary-bg'
                    : 'text-text-color hover:bg-accent hover:text-primary-bg'
                }`}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://airtable.com/appUo7R0la4VUzOoT/shrk9A6i9TF4UjTfo"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-3 rounded-md text-base font-bold text-electric-blue bg-accent hover:bg-accent mt-4"
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              Submit an Example
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
