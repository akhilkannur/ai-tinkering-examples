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
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>Our Mission | Real AI Examples</title>
        <meta name="description" content="Why we built the world's most actionable library of AI blueprints. No hype, just reliable mission files for Gemini and Claude." key="description" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative">
        {/* Ambient background effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          {/* Hero Branding */}
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-[0.3em] mb-8 font-mono">
                <Terminal className="w-3.5 h-3.5" /> [ SYSTEM_MISSION_LOG: V2.0 ]
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 uppercase italic text-white">
              No Hype. <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Just Files.</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
              We're replacing "AI Thought Leadership" with high-reliability execution logic.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-12">
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-secondary-bg border border-white/10 flex items-center justify-center text-accent">
                            <Zap className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">The "Arguing" Problem</h2>
                    </div>
                    <div className="space-y-6 text-lg text-text-secondary font-light leading-relaxed">
                        <p>Most AI content is a waste of time. You spend three hours reading about "the future of work" and end up with zero useful files on your computer.</p>
                        <p>We built this because we spent too much time arguing with chatbots and not enough time doing work. We found that if you give Claude or Gemini a very specific, rigid instruction file, it actually does the job.</p>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-secondary-bg border border-white/10 flex items-center justify-center text-accent">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">The "Mission File" Solution</h2>
                    </div>
                    <p className="text-lg text-text-secondary font-light leading-relaxed">
                        Every blueprint in our library is designed to be a "Mission File"—a single document that tells an agent exactly who to be, what constraints to follow, and exactly what to produce. No fluff. No theory. Just boring, reliable text files that make AI useful for once.
                    </p>
                </section>

                <div className="p-8 bg-gradient-to-br from-secondary-bg to-primary-bg border border-white/5 rounded-3xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="text-accent font-mono text-[10px] uppercase tracking-widest mb-4">// OPERATOR_MESSAGE</div>
                        <p className="text-xl text-white font-medium italic leading-relaxed mb-8">
                            "I'm not a corporate engineer—I'm a builder who loves breaking things and fixing them. I build these blueprints for myself first, then I share them here."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent shadow-lg shadow-accent/20">
                                <Image src="/images/akhil.jpg" alt="Akhil MK" width={48} height={48} className="object-cover" />
                            </div>
                            <div>
                                <div className="text-white font-bold">Akhil MK</div>
                                <div className="text-xs font-mono text-text-secondary uppercase">Founder @ Real AI Examples</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Column / Stats */}
            <div className="lg:col-span-5 space-y-8">
                <div className="bg-secondary-bg border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Cpu className="w-32 h-32 text-accent" />
                    </div>
                    <h3 className="text-sm font-mono text-text-secondary uppercase tracking-[0.2em] mb-8">System_Stats</h3>
                    <div className="space-y-8">
                        <div>
                            <div className="text-4xl font-black text-white mb-1 tracking-tighter">700+</div>
                            <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold">Agent_Blueprints</div>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div>
                            <div className="text-4xl font-black text-white mb-1 tracking-tighter">1,400+</div>
                            <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold">Packaged_Skills</div>
                        </div>
                        <div className="h-px bg-white/5"></div>
                        <div>
                            <div className="text-4xl font-black text-white mb-1 tracking-tighter">100%</div>
                            <div className="text-xs font-mono text-accent uppercase tracking-widest font-bold">Human_Tested</div>
                        </div>
                    </div>
                </div>

                <div className="bg-accent/5 border border-accent/20 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Mail className="w-5 h-5 text-accent" />
                        <h3 className="text-white font-bold uppercase tracking-tight">Get in Touch</h3>
                    </div>
                    <p className="text-sm text-text-secondary font-light leading-relaxed mb-6">
                        Have a specific workflow you need built? Or found a bug in one of our mission files? Shoot me a message.
                    </p>
                    <a href="mailto:akhil@realaiexamples.com" className="flex items-center justify-between p-4 bg-primary-bg border border-white/5 rounded-xl hover:border-accent/30 transition-all group">
                        <span className="text-xs font-mono text-text-secondary group-hover:text-white transition-colors">akhil@realaiexamples.com</span>
                        <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-text-secondary text-[10px] bg-[#0B1120] font-mono uppercase tracking-[0.3em] opacity-40">
        <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} REAL_AI_EXAMPLES_DPT. MISSION_CRITICAL.</p>
        </div>
      </footer>
    </div>
  )
}