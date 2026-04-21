import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'
  const isToolsPage = router.pathname === '/tools' || router.pathname.startsWith('/tools/')
  const isBlogIndex = router.pathname === '/blog'
  const isAboutPage = router.pathname === '/about'

  return (
    <div className="bg-nature min-h-screen selection:bg-micro-layer-2">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-16 md:pt-48 md:pb-40">
        {isHomePage || isToolsPage || isBlogIndex || isAboutPage ? (
          children
        ) : (
          <main className="glass-sheet rounded-3xl md:rounded-[48px] overflow-hidden p-4 md:p-16 lg:p-24 min-h-[60vh]">
            {children}
          </main>
        )}
      </div>
      <Footer />
    </div>
  )
}
