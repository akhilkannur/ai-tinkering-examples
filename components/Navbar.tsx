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
    { href: '/ai-examples', label: 'Real Examples' },
    { href: '/blog', label: 'Guides' },
    { href: '/tools', label: 'Tools' }, // Added Tools link
    { href: '/investors', label: 'Micro-PE Match' },
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
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/ai-examples`,
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/about`,
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
              <Link href="/" className="flex items-center gap-3 group">
                <Image 
                  src="/logo.png" 
                  alt="AI Examples Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain" 
                />
                <span className="text-xl font-bold font-sans text-text-color group-hover:text-accent transition-colors">Real AI Examples</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center text-base font-sans font-bold transition-colors duration-200 ${
                    router.pathname.startsWith(link.href)
                      ? 'text-accent'
                      : 'text-text-color hover:text-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          {/* Desktop Submit Button */}
          <div className="hidden md:flex md:items-center">
            {router.pathname.startsWith('/ai-examples') && (
              <a
                href={process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_FORM_URL || 'https://airtable.com/appUo7R0la4VUzOoT/shrX1v3Z8z2G7p9Z9'}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-none shadow-none text-sm font-sans font-bold text-electric-blue bg-accent hover:bg-accent-hover transition-all duration-200 hover:shadow-accent-glow"
              >
                Submit an Example
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-none text-text-color hover:text-text-color hover:bg-navy-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
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
                className={`block px-3 py-2 rounded-none text-base font-bold ${
                  router.pathname.startsWith(link.href)
                    ? 'bg-accent/20 text-accent'
                    : 'text-text-color hover:bg-navy-dark hover:text-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {router.pathname.startsWith('/ai-examples') && (
              <a
                href={process.env.NEXT_PUBLIC_AIRTABLE_SUBMIT_FORM_URL || 'https://airtable.com/appUo7R0la4VUzOoT/shrX1v3Z8z2G7p9Z9'}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-3 py-3 rounded-none text-base font-bold text-electric-blue bg-accent hover:bg-accent-hover mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit an Example
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
    </>
  )
}


