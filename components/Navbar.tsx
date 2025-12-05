import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'
import Head from 'next/head'

import Image from 'next/image'

export default function Navbar() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/ai-examples', label: 'All examples' },
    { href: '/learn-ai', label: 'Learn AI One-on-One' }, // New link
    { href: '/ai-workplace-quiz', label: 'AI Quiz' },
    { href: '/about', label: 'About' },
  ]

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SiteNavigationElement',
              'name': ['Examples', 'About'],
              'url': [
                'https://realaiexamples.com/ai-examples',
                'https://realaiexamples.com/about',
              ],
            }),
          }}
        />
      </Head>
      <nav className="bg-secondary-bg/80 backdrop-blur-md sticky top-0 z-50 border-b border-navy-dark">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                  <Image src="/logo.png" alt="AI Examples Logo" width={32} height={32} className="object-cover" />
                </div>
                <span className="text-lg font-bold text-text-color group-hover:text-accent transition-colors">Real AI Examples</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center text-sm font-medium transition-colors duration-200 ${
                    router.pathname.startsWith(link.href)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-color'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Desktop Submit Button */}
          <div className="hidden md:flex md:items-center">
            <a
              href={process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-full shadow-sm text-sm font-semibold text-electric-blue bg-accent hover:bg-accent-hover transition-all duration-200 shadow-accent/20 hover:shadow-accent/40"
            >
              Submit an Example
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-color hover:text-text-color hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-secondary-bg border-b border-navy-dark">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  router.pathname.startsWith(link.href)
                    ? 'bg-accent/20 text-accent'
                    : 'text-text-secondary hover:bg-navy-dark hover:text-text-color'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-3 rounded-md text-base font-bold text-electric-blue bg-accent hover:bg-accent-hover mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Submit an Example
            </a>
          </div>
        </div>
      )}
    </nav>
    </>
  )
}


