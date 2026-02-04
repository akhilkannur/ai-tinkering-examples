import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X, Terminal, Cpu } from 'lucide-react'
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
    { href: '/ai-examples', label: 'EXAMPLES', mono: true },
    { href: '/agent-setup-service', label: 'SETUP', mono: true },
    { href: '/build-club', label: 'BUILD CLUB', mono: true },
    { href: '/tools', label: 'TOOLS', mono: true },
    { href: '/about', label: 'MISSION', mono: true },
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
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/ai-examples`,
                `${process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com'}/about`,
              ],
            }),
          }}
        />
      </Head>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage ? 'bg-primary-bg/95 backdrop-blur-lg border-b border-white/5 py-2' : 'bg-transparent py-4'
      }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-12">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                    <div className="absolute -inset-1 bg-accent rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    <Image 
                    src="/favicon_transparent.png?v=2" 
                    alt="AI Examples" 
                    width={40} 
                    height={40} 
                    className="relative object-contain" 
                    />
                </div>
                <span className="text-lg font-black font-sans tracking-tighter text-slate-100 group-hover:text-accent transition-colors uppercase italic">Real AI Examples</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-mono font-bold tracking-[0.2em] transition-all duration-200 border border-transparent rounded-lg ${
                    router.pathname === link.href
                      ? 'text-accent bg-accent/5 border-accent/10'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-bg border-b border-white/5 p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-4 text-xs font-mono font-bold tracking-widest rounded-xl ${
                  router.pathname === link.href
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:bg-white/5'
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