import { useState } from 'react'
import { EnrichedExampleRecord } from '../lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Mail, ArrowRight } from 'lucide-react'
import { optimizeImageUrl } from '../utils/cloudinary'

interface ExampleBodyProps {
  example: EnrichedExampleRecord
}

export default function ExampleBody({ example }: ExampleBodyProps) {
  const categorySlug = example.category?.toLowerCase().replace(/\s+/g, '-') || 'uncategorized'
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div id="example-body">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {example.category && (
            <Link
              href={`/ai-examples/category/${categorySlug}`}
              className="px-4 py-1.5 rounded-sm bg-micro-layer-1 text-[10px] font-bold uppercase tracking-[0.2em] text-micro-muted hover:text-micro-fg transition-colors"
            >
              {example.category}
            </Link>
          )}
          {example.author_name && (
            <div className="text-xs font-bold text-micro-muted uppercase tracking-widest">
              {example.author_link ? (
                <a
                  href={example.author_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-micro-fg transition-colors"
                >
                  Source: {example.author_name}
                </a>
              ) : (
                <span>Source: {example.author_name}</span>
              )}
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-micro-fg leading-tight mb-8">
          {example.title}
        </h1>
      </header>

      {/* Content */}
      <div className="prose-container">
        {example.summary && (
          <p className="text-lg text-micro-muted font-medium leading-relaxed mb-10 pb-10 border-b border-micro-layer-1">
            {example.summary}
          </p>
        )}

        {example.screenshots && example.screenshots.length > 0 && (
          <div className="space-y-8 mb-12">
            {example.screenshots.map((screenshot, i) => {
              const publicId = i === 0 ? example.cloudinaryPublicId : null;
              const imageUrl = optimizeImageUrl(screenshot.url, publicId, 1200) || screenshot.url;

              return (
                <div key={i} className="rounded-sm overflow-hidden border border-micro-layer-1 shadow-soft">
                  <Image
                    src={imageUrl}
                    alt={`${example.title} - Step ${i + 1}`}
                    width={1200}
                    height={675}
                    className="w-full h-auto object-cover"
                    priority={i === 0}
                  />
                </div>
              );
            })}
          </div>
        )}

        {example.workflow_steps && (
          <div className="mb-12 p-8 bg-micro-layer-1 rounded-sm border border-micro-layer-1">
            <p className="text-sm font-medium text-micro-muted leading-relaxed whitespace-pre-wrap">
              {example.workflow_steps}
            </p>
          </div>
        )}

        {/* High Conversion Signup Hook */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 bg-micro-fg text-white rounded-sm shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Mail size={120} strokeWidth={1} />
          </div>
          
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Don't miss the next <span className="text-terminal-lime italic">workflow drop.</span>
            </h3>
            <p className="text-white/70 text-base font-medium mb-8">
              Join 400+ operators getting one actionable AI blueprint every Sunday. No slop, just implementation.
            </p>

            {status === 'success' ? (
              <div className="py-4 px-6 bg-terminal-lime text-micro-fg font-black uppercase tracking-widest text-xs rounded-sm inline-block">
                ✓ Check your inbox to confirm
              </div>
            ) : (
              <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your best email"
                  required
                  className="flex-1 bg-white/10 border border-white/20 px-6 py-4 rounded-sm outline-none focus:border-terminal-lime transition-colors text-white placeholder:text-white/40 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="bg-white text-micro-fg px-8 py-4 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-terminal-lime transition-all active:scale-95 flex items-center justify-center gap-2 flex-shrink-0"
                >
                  {status === 'loading' ? '...' : 'Get the Blueprints'}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            
            {status === 'error' && (
              <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-4">
                Something went wrong. Try again?
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}