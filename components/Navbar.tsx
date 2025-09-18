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
    <nav className="">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="AI Examples Logo" width={64} height={64} />
                <span className="sr-only">AI Examples</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    router.pathname.startsWith(link.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
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
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#2398A7] hover:bg-[#1a7a85]"
            >
              Submit an Example
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  router.pathname.startsWith(link.href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-white bg-[#2398A7] hover:bg-[#1a7a85] mt-4"
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