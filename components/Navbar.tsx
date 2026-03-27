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
        isHomePage
          ? scrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 py-4'
            : 'bg-transparent py-6'
          : scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-4'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200 py-4'
      }`}>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-terminal-green rounded shadow-sm flex items-center justify-center transition-transform group-hover:scale-105"></div>
                <span className={`text-2xl font-display font-semibold tracking-wide uppercase ${
                  isHomePage ? 'text-white' : 'text-primary-text'
                }`}>Real AI Examples</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    router.pathname === link.href
                      ? isHomePage ? 'text-white font-semibold' : 'text-primary-text font-semibold'
                      : isHomePage ? 'text-zinc-400 hover:text-white' : 'text-secondary-text hover:text-primary-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className={`flex items-center justify-center w-10 h-10 rounded border transition-all shadow-sm ${
              isHomePage
                ? 'border-white/10 bg-white/5 hover:border-green-500/50 hover:bg-green-500/10 text-zinc-400 hover:text-green-500'
                : 'border-gray-200 bg-white hover:border-terminal-green hover:bg-terminal-green/5 text-secondary-text hover:text-terminal-green'
            }`}>
                <i className="ph ph-twitter-logo text-lg"></i>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded transition-all ${
                isHomePage ? 'text-white hover:bg-white/10' : 'text-primary-text hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 right-0 p-6 animate-in slide-in-from-top-4 duration-300 shadow-xl ${
          isHomePage
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10'
            : 'bg-white border-b border-gray-200'
        }`}>
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-medium rounded transition-colors ${
                  isHomePage
                    ? router.pathname === link.href
                      ? 'bg-white/10 text-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    : router.pathname === link.href
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