import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X } from 'lucide-react'
import Head from 'next/head'
import Image from 'next/image'

export default function Navbar() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'EXAMPLES', mono: true },
    { href: '/tools', label: 'TOOLS', mono: true },
    { href: '/blog', label: 'BLOG', mono: true },
  ]

  const isHomePage = router.pathname === '/'

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
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/`,
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/about`,
              ],
            }),
          }}
        />
      </Head>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || !isHomePage 
          ? 'bg-white/90 backdrop-blur-md border-b border-border-color py-4' 
          : 'bg-white/50 backdrop-blur-sm border-b border-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-lg md:px-[48px]">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-6 h-6 bg-accent-dark text-white flex items-center justify-center text-[0.75rem] font-semibold rounded-[4px_4px_12px_4px] transition-transform group-hover:scale-105">R</div>
                <span className="text-[1.25rem] font-semibold tracking-[-0.02em] text-primary-text uppercase">Real AI</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.875rem] font-medium transition-colors duration-200 ${
                    router.pathname === link.href
                      ? 'text-primary-text'
                      : 'text-secondary-text hover:text-primary-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary-text hover:bg-hero-tint rounded-md transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border-color p-lg animate-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-md py-lg text-[0.875rem] font-medium rounded-md transition-colors ${
                  router.pathname === link.href
                    ? 'bg-hero-tint text-primary-text'
                    : 'text-secondary-text hover:bg-hero-tint hover:text-primary-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  )
}