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
          ? 'bg-white/80 backdrop-blur-xl border-b border-micro-layer-1 py-4'
          : 'bg-transparent py-8'
      }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center gap-10">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${scrolled || !isHomePage ? 'bg-micro-fg' : 'bg-white'}`}></div>
                <span className={`text-2xl font-bold tracking-tight transition-colors ${scrolled || !isHomePage ? 'text-micro-fg' : 'text-white'}`}>Real AI Examples</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[12px] font-bold tracking-[0.1em] transition-colors duration-200 ${
                    router.pathname === link.href
                      ? (scrolled || !isHomePage ? 'text-micro-fg' : 'text-white')
                      : (scrolled || !isHomePage ? 'text-micro-muted hover:text-micro-fg' : 'text-white/70 hover:text-white')
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/prompt-bundle" className={`px-6 py-2.5 rounded-pill text-[11px] font-bold tracking-widest transition-all ${
              scrolled || !isHomePage 
                ? 'bg-micro-fg text-white hover:opacity-90 shadow-lg' 
                : 'bg-white text-micro-fg hover:bg-micro-layer-1 shadow-2xl'
            }`}>
              GET BUNDLE
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary-text hover:bg-gray-100 rounded transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-medium rounded transition-colors ${
                  router.pathname === link.href
                    ? 'bg-gray-100 text-primary-text'
                    : 'text-secondary-text hover:bg-gray-50 hover:text-primary-text'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
    </>
  )
}
