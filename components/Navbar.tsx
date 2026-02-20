import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X, Terminal, Cpu, Zap } from 'lucide-react'
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
    { href: '/tools', label: 'TOOL DIRECTORY', mono: true },
    { href: '/blog', label: 'BLOG', mono: true },
    { href: '/about', label: 'ABOUT', mono: true },
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-4 border-black ${
        scrolled || !isHomePage ? 'bg-white py-2' : 'bg-white/90 py-4'
      }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-punk-lime font-display text-2xl transform -rotate-6 transition-transform group-hover:rotate-0">R</div>
                <span className="font-display text-xl tracking-tighter uppercase text-black">Real<span className="text-punk-magenta">AI</span>Examples</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 text-xs font-black tracking-widest transition-all duration-200 border-b-2 uppercase ${
                    router.pathname === link.href
                      ? 'bg-punk-lime border-black text-black'
                      : 'border-transparent text-black hover:bg-punk-lime hover:border-black'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#ccff00] border-2 border-black font-black uppercase text-xs hover:translate-x-0.5 hover:translate-y-0.5 transition-all brutalist-shadow-sm flex items-center gap-2"
            >
                <span>Get Pro</span>
                <Zap size={14} fill="currentColor" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:bg-punk-lime border-2 border-transparent hover:border-black transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b-4 border-black p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm font-black tracking-widest uppercase border-2 border-transparent ${
                  router.pathname === link.href
                    ? 'bg-punk-lime border-black text-black'
                    : 'text-black hover:bg-punk-lime hover:border-black'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0NW6p0szmXPS6jXW05hIP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-punk-lime border-2 border-black font-black uppercase text-sm brutalist-shadow-sm flex items-center justify-center gap-2"
                >
                    Get Pro <Zap size={16} fill="currentColor" />
                </a>
            </div>
          </div>
        </div>
      )}
    </nav>
    </>
  )
}