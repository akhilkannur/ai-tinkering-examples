import Link from 'next/link'

export default function Navbar(){
  return (
    <header className="w-full border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">AI Tinkering Examples</Link>
        <nav className="space-x-4 text-sm text-slate-600">
          <a href="#categories">Categories</a>
          <a href="#newsletter">Newsletter</a>
        </nav>
      </div>
    </header>
  )
}
