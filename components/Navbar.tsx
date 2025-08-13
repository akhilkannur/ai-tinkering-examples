import Link from 'next/link'

export default function Navbar(){
  return (
    <header className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:text-slate-700 transition-colors">
          AI Tinkering Examples
        </Link>
        <nav className="flex items-center space-x-6 text-sm text-slate-600">
          <Link 
            href="/ai-examples" 
            className="hover:text-slate-900 transition-colors font-medium"
          >
            Browse Examples
          </Link>
          <a 
            href="#categories" 
            className="hover:text-slate-900 transition-colors"
          >
            Categories
          </a>
          <a 
            href="#newsletter" 
            className="hover:text-slate-900 transition-colors"
          >
            Newsletter
          </a>
        </nav>
      </div>
    </header>
  )
}
