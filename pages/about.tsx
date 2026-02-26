import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { Terminal, Cpu, ShieldCheck, Zap, Mail, ArrowRight } from 'lucide-react'

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
    "description": "A specialized library of agent-ready AI workflows and blueprints for Sales, Marketing, and Ops professionals.",
    "sameAs": [
      "https://twitter.com/realaiexamples",
      "https://linkedin.com/company/realaiexamples"
    ]
  };

  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>My Mission | Real AI Examples</title>
        <meta name="description" content="Why I built the world's most actionable library of AI blueprints. No hype, just reliable mission files for Gemini and Claude." key="description" />
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
                <Terminal className="w-3.5 h-3.5" /> My Mission
            </div>
            <h1 className="text-5xl md:text-8xl font-display tracking-tight mb-8 uppercase leading-[0.9] text-black glitch-text" data-text="NO HYPE. JUST FILES.">
              No Hype. <span className="text-[#ff00ff]">Just Files.</span>
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-2xl mx-auto font-black leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-white border-2 border-black brutalist-shadow-sm">
              I'm replacing "AI Thought Leadership" with high-reliability execution logic.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-12">
                <section className="bg-white border-4 border-black p-8 brutalist-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ccff00] border-2 border-black brutalist-shadow-sm">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display text-black uppercase">The "Arguing" Problem</h2>
                    </div>
                    <div className="space-y-6 text-lg text-black font-bold leading-relaxed font-mono">
                        <p>// Most AI content is a waste of time. You spend three hours reading about "the future of work" and end up with zero useful files on your computer.</p>
                        <p>// I built this because I spent too much time arguing with chatbots and not enough time doing work. I found that if you give Claude or Gemini a very specific, rigid instruction file, it actually does the job.</p>
                    </div>
                </section>

                <section className="bg-white border-4 border-black p-8 brutalist-shadow">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-[#ff00ff] border-2 border-black brutalist-shadow-sm">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display text-black uppercase">The "Mission File" Solution</h2>
                    </div>
                    <p className="text-lg text-black font-bold leading-relaxed font-mono">
                        // Every blueprint in my library is designed to be a "Mission File" - a single document that tells an agent exactly who to be, what constraints to follow, and exactly what to produce. No fluff. No theory. Just boring, reliable text files that make AI useful for once.
                    </p>
                </section>

                <div className="p-8 bg-[#ccff00] border-4 border-black brutalist-shadow relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="bg-black text-white px-2 py-0.5 inline-block font-mono text-[10px] uppercase tracking-widest mb-4">A message from the founder</div>
                        <p className="text-xl text-black font-black italic leading-relaxed mb-8 uppercase">
                            "I'm not a developer - I'm a tinkerer who got obsessed with making AI actually work for real businesses. I've spent hundreds of hours breaking things, fixing them, and figuring out which workflows actually save time. Now I help founders skip the trial-and-error."
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
                    <h3 className="font-display text-xl text-black uppercase tracking-widest mb-12 decoration-wavy underline decoration-[#ff00ff]">System_Stats</h3>
                    <div className="space-y-10">
                        <div>
                            <div className="text-6xl font-display text-black mb-1 tracking-tighter">700+</div>
                            <div className="text-xs font-black font-mono text-[#ff00ff] uppercase tracking-widest">Agent_Blueprints</div>
                        </div>
                        <div className="h-1 bg-black"></div>
                        <div>
                            <div className="text-6xl font-display text-black mb-1 tracking-tighter">500+</div>
                            <div className="text-xs font-black font-mono text-[#ccff00] uppercase tracking-widest bg-black px-1 inline-block">Consolidated_Files</div>
                        </div>
                        <div className="h-1 bg-black"></div>
                        <div>
                            <div className="text-6xl font-display text-black mb-1 tracking-tighter">100%</div>
                            <div className="text-xs font-black font-mono text-[#00ffff] uppercase tracking-widest bg-black px-1 inline-block">Operator_Verified</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#ff00ff] border-4 border-black p-8 brutalist-shadow">
                    <div className="flex items-center gap-3 mb-6">
                        <Mail className="w-8 h-8 text-white stroke-[3px]" />
                        <h3 className="font-display text-2xl text-white uppercase tracking-tight">Get in Touch</h3>
                    </div>
                    <p className="text-sm text-white font-black uppercase mb-8 leading-relaxed">
                        Have a specific workflow you need built? Found a bug? Shoot me a message.
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
