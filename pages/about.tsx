import Head from 'next/head'
import Image from 'next/image'
import { Cpu, ShieldCheck, Mail, ArrowRight, Clock } from 'lucide-react'

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
    <>
      <Head>
        <title>My Mission | Real AI Examples</title>
        <meta name="description" content="Why I built a database of 600+ practical AI ideas for business professionals and AI tinkerers. No hype, just real ways to get your time back." key="description" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
      </Head>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="max-w-5xl mx-auto text-center mb-24 md:mb-32 pt-12">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9] text-white drop-shadow-md">
            Real ideas. <br /><span className="font-instrument font-normal italic lowercase opacity-90">real results.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Helping business professionals and AI native operators get their time back.
          </p>
        </div>

        <div className="glass-sheet rounded-[48px] p-8 md:p-16 lg:p-24 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-16">
                <section className="bg-white rounded-[40px] border border-micro-layer-1 p-12 shadow-soft">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-micro-fg flex items-center justify-center text-white shadow-lg">
                            <Clock className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-micro-fg">The "Time" Problem</h2>
                    </div>
                    <div className="space-y-8 text-lg text-micro-muted font-medium leading-relaxed">
                        <p>Most AI content is a waste of time. You spend hours reading about "the future of work" and end up with nothing you can actually use in your workflow tomorrow morning.</p>
                        <p>I built this because I saw too many professionals and tinkerers struggling to figure out where AI actually fits into their daily tasks. You don't need a PhD in machine learning; you just need to know which repetitive tasks can be handled by a computer so you can focus on the work that matters.</p>
                    </div>
                </section>

                <section className="bg-white rounded-[40px] border border-micro-layer-1 p-12 shadow-soft">
                    <div className="flex items-center gap-5 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-micro-fg flex items-center justify-center text-white shadow-lg">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-micro-fg">The Practical Solution</h2>
                    </div>
                    <p className="text-lg text-micro-muted font-medium leading-relaxed">
                        Every idea in this database is designed to be practical and easy to start. We cut through the hype to find real-world ways to save 2-10 hours every week. Whether you're in sales, marketing, or ops, these are the patterns that actually move the needle for individuals who want to work smarter.
                    </p>
                </section>

                <div className="p-12 bg-micro-fg rounded-[40px] shadow-micro relative overflow-hidden group border border-micro-fg">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    <div className="relative z-10">
                        <div className="bg-white/10 backdrop-blur-md text-white/80 px-4 py-1.5 inline-block rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-8">A message from the founder</div>
                        <p className="text-2xl text-white font-medium italic leading-relaxed mb-10">
                            "I'm not a corporate developer—I'm a tinkerer who got tired of seeing AI used for parlor tricks instead of real work. I've spent thousands of hours figuring out which workflows actually save time. My goal is to help you skip the trial-and-error."
                        </p>
                        <div className="flex items-center gap-5 pt-10 border-t border-white/10">
                            <div className="w-20 h-20 rounded-3xl border-2 border-white/20 shadow-xl overflow-hidden -rotate-3 bg-white/5">
                                <Image src="/images/akhil.jpg" alt="Akhil MK" width={80} height={80} className="object-cover" />
                            </div>
                            <div>
                                <div className="text-white font-bold text-xl tracking-tight">Akhil MK</div>
                                <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">Founder @ Real AI Examples</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Column / Stats */}
            <div className="lg:col-span-5 space-y-16">
                <div className="bg-white rounded-[40px] border border-micro-layer-1 p-12 shadow-soft relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                        <Cpu className="w-48 h-48 text-micro-fg" />
                    </div>
                    <h3 className="font-bold text-[11px] text-micro-muted uppercase tracking-[0.2em] mb-16 border-b border-micro-layer-1 pb-4">The Numbers</h3>
                    <div className="space-y-12">
                        <div>
                            <div className="text-7xl font-bold text-micro-fg mb-2 tracking-tighter">600+</div>
                            <div className="text-[11px] font-bold text-micro-muted uppercase tracking-[0.2em]">Practical Ideas</div>
                        </div>
                        <div className="h-px bg-micro-layer-1"></div>
                        <div>
                            <div className="text-7xl font-bold text-micro-fg mb-2 tracking-tighter">100%</div>
                            <div className="text-[11px] font-bold text-micro-muted uppercase tracking-[0.2em] bg-micro-layer-1 px-3 py-1 rounded-lg inline-block">Hand-Verified</div>
                        </div>
                        <div className="h-px bg-micro-layer-1"></div>
                        <div>
                            <div className="text-7xl font-bold text-micro-fg mb-2 tracking-tighter">50+</div>
                            <div className="text-[11px] font-bold text-micro-muted uppercase tracking-[0.2em] bg-micro-layer-1 px-3 py-1 rounded-lg inline-block">Hours Saved Weekly</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[40px] border border-micro-layer-1 p-12 shadow-soft">
                    <div className="flex items-center gap-4 mb-8">
                        <Mail className="w-10 h-10 text-micro-fg" />
                        <h3 className="font-bold text-2xl text-micro-fg tracking-tight">Get in Touch</h3>
                    </div>
                    <p className="text-sm text-micro-muted font-medium mb-10 leading-relaxed uppercase tracking-wider">
                        Have a question about an idea? Want to share how you're using AI? I'd love to hear from you.
                    </p>
                    <a href="mailto:akhil@realaiexamples.com" className="flex items-center justify-between p-6 bg-micro-layer-1 rounded-3xl border border-transparent hover:border-micro-fg hover:bg-white transition-all group shadow-sm">
                        <span className="text-xs font-bold text-micro-fg uppercase tracking-widest leading-none">akhil@realaiexamples.com</span>
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-micro-fg group-hover:bg-micro-fg group-hover:text-white transition-all shadow-sm">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </a>
                </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
