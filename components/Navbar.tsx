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

      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled || !isHomePage
          ? 'bg-figment-bg/95 backdrop-blur-md border-b border-gray-200 py-4'
          : 'bg-transparent py-6'
      }`}>
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-8 h-8 bg-figment-brand rounded shadow-sm flex items-center justify-center transition-transform group-hover:scale-105"></div>
                <span className="text-2xl font-syne font-semibold tracking-wide text-figment-brand uppercase">Figment</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-syne font-medium tracking-wide transition-colors duration-200 ${
                    router.pathname === link.href
                      ? 'text-figment-brand font-semibold'
                      : 'text-figment-brand hover:opacity-70'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className="flex items-center justify-center w-10 h-10 rounded border border-gray-200 bg-white hover:border-figment-brand hover:bg-figment-brand/5 transition-all shadow-sm text-figment-brand hover:text-figment-brand">
                <i className="ph ph-twitter-logo text-lg"></i>
            </a>
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
        <div className="lg:hidden absolute top-full left-0 right-0 bg-figment-bg border-b border-gray-200 p-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-syne font-medium rounded transition-colors ${
                  router.pathname === link.href
                    ? 'bg-figment-brand text-figment-card-light'
                    : 'text-figment-brand hover:bg-figment-grid hover:text-figment-brand'
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