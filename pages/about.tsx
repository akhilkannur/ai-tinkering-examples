import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Cpu, ShieldCheck, Zap, Mail, ArrowRight, Coffee, Clock } from 'lucide-react'

export default function AboutPage() {
  const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  
  // Brand Authority Schema
  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Real AI Examples",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "founder": {
      "@type": "Person",
      "name": "Akhil MK"
    },
    "description": "A database of 600+ practical AI ideas for business professionals and AI tinkerers.",
    "sameAs": [
      "https://twitter.com/realaiexamples",
      "https://linkedin.com/company/realaiexamples"
    ]
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>My Mission | Real AI Examples</title>
        <meta name="description" content="Why I built a database of 600+ practical AI ideas for business professionals and AI tinkerers. No hype, just real ways to get your time back." key="description" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* Hero Branding */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#ccff00] border-2 border-black font-black text-[10px] uppercase tracking-[0.3em] mb-8 transform -rotate-1 brutalist-shadow-sm">
                <Coffee className="w-3.5 h-3.5" /> My Mission
            </div>
            <h1 className="text-5xl md:text-8xl font-display tracking-tight mb-8 uppercase leading-[0.9] text-black" data-text="REAL IDEAS. REAL RESULTS.">
              Real Ideas. <span className="text-[#ff00ff]">Real Results.</span>
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm">
              Helping business professionals and AI tinkerers get their time back.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-12">
                <section className="bg-white border-4 border-black p-8 brutalist-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ccff00] border-2 border-black brutalist-shadow-sm">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display text-black uppercase">The "Time" Problem</h2>
                    </div>
                    <div className="space-y-6 text-lg text-black font-bold leading-relaxed">
                        <p>Most AI content is a waste of time. You spend hours reading about "the future of work" and end up with nothing you can actually use in your workflow tomorrow morning.</p>
                        <p>I built this because I saw too many professionals and tinkerers struggling to figure out where AI actually fits into their daily tasks. You don't need a PhD in machine learning; you just need to know which repetitive tasks can be handled by a computer so you can focus on the work that matters.</p>
                    </div>
                </section>

                <section className="bg-white border-4 border-black p-8 brutalist-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ff00ff] border-2 border-black brutalist-shadow-sm">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display text-black uppercase">The Practical Solution</h2>
                    </div>
                    <p className="text-lg text-black font-bold leading-relaxed">
                        Every idea in this database is designed to be practical and easy to start. We cut through the hype to find real-world ways to save 2-10 hours every week. Whether you're in sales, marketing, or ops, these are the patterns that actually move the needle for individuals who want to work smarter.
                    </p>
                </section>

                <div className="p-8 bg-[#ccff00] border-4 border-black brutalist-shadow relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="bg-black text-white px-2 py-0.5 inline-block font-mono text-[10px] uppercase tracking-widest mb-4">A message from the founder</div>
                        <p className="text-xl text-black font-black italic leading-relaxed mb-8 uppercase">
                            "I'm not a corporate developer—I'm a tinkerer who got tired of seeing AI used for parlor tricks instead of real work. I've spent thousands of hours figuring out which workflows actually save time. My goal is to help you skip the trial-and-error."
                        </p>
                        <div className="flex items-center gap-4 pt-6 border-t-2 border-black/20">
                            <div className="w-16 h-16 rounded-none border-4 border-black brutalist-shadow-sm overflow-hidden rotate-3">
                                <Image src="/images/akhil.jpg" alt="Akhil MK" width={64} height={64} className="object-cover" />
                            </div>
                            <div>
                                <div className="text-black font-display text-lg uppercase">Akhil MK</div>
                                <div className="text-xs font-black font-mono text-black/60 uppercase">Founder @ Real AI Examples</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Column / Stats */}
            <div className="lg:col-span-5 space-y-12">
                <div className="bg-white border-4 border-black p-8 brutalist-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu className="w-32 h-32 text-black" />
                    </div>
                    <h3 className="font-display text-xl text-black uppercase tracking-widest mb-12 decoration-wavy underline decoration-[#ff00ff]">The Numbers</h3>
                    <div className="space-y-10">
                        <div>
                            <div className="text-6xl font-display text-black mb-1 tracking-tighter">600+</div>
                            <div className="text-xs font-black font-mono text-[#ff00ff] uppercase tracking-widest">Practical Ideas</div>
                        </div>
                        <div className="h-1 bg-black"></div>
                        <div>
                            <div className="text-6xl font-display text-black mb-1 tracking-tighter">100%</div>
                            <div className="text-xs font-black font-mono text-[#ccff00] uppercase tracking-widest bg-black px-1 inline-block">Hand-Verified</div>
                        </div>
                        <div className="h-1 bg-black"></div>
                        <div>
                            <div className="text-6xl font-display text-black mb-1 tracking-tighter">50+</div>
                            <div className="text-xs font-black font-mono text-[#00ffff] uppercase tracking-widest bg-black px-1 inline-block">Hours Saved Weekly</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#ff00ff] border-4 border-black p-8 brutalist-shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Mail className="w-8 h-8 text-white stroke-[3px]" />
                        <h3 className="font-display text-2xl text-white uppercase tracking-tight">Get in Touch</h3>
                    </div>
                    <p className="text-sm text-white font-black uppercase mb-8 leading-relaxed">
                        Have a question about an idea? Want to share how you're using AI? I'd love to hear from you.
                    </p>
                    <a href="mailto:akhil@realaiexamples.com" className="flex items-center justify-between p-4 bg-white border-4 border-black hover:translate-x-1 hover:translate-y-1 transition-all group brutalist-shadow-sm">
                        <span className="text-xs font-black font-mono text-black uppercase tracking-widest">akhil@realaiexamples.com</span>
                        <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform stroke-[3px]" />
                    </a>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
