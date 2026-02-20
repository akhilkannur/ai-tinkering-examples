import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our blueprints and skills." key="description" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 bg-black text-[#ccff00] border-2 border-black px-4 py-1.5 font-black text-xs uppercase mb-8 transform rotate-1 brutalist-shadow-sm">
              Usage Protocol
            </div>
            <h1 className="text-5xl md:text-8xl font-display mb-12 text-black uppercase leading-[0.9] glitch-text" data-text="ACCESS TERMS">Access Terms</h1>
          </div>
          
          <div className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="max-w-none space-y-10 relative z-10">
                <p className="font-black font-mono text-xs uppercase tracking-widest bg-black text-[#ff00ff] inline-block px-2 py-1">Last Updated: January 17, 2026</p>
                
                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#ccff00]">1. Agreement</h2>
                    <p className="font-bold leading-relaxed text-lg uppercase tracking-tight font-mono">// By accessing Real AI Examples, you agree to these Terms. If you do not agree, do not access our repository.</p>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#ff00ff]">2. Intellectual Property</h2>
                    <p className="font-bold leading-relaxed uppercase tracking-tight font-mono">// All blueprints and code provided are the property of Real AI Examples. You are granted a non-exclusive license for personal or professional workflows. <span className="bg-black text-[#ccff00] px-1">Reselling is strictly prohibited.</span></p>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#00ffff]">3. Liability</h2>
                    <p className="font-bold leading-relaxed uppercase tracking-tight font-mono">// AI is unpredictable. We provide assets "as is" and are not responsible for any data loss, system errors, or damages resulting from execution.</p>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#ccff00]">4. Guidelines</h2>
                    <p className="font-bold leading-relaxed uppercase tracking-tight font-mono">// Do not use our assets for illegal content, spam, or malicious software. Violation results in immediate termination of access.</p>
                </section>

                <section className="pt-12 border-t-4 border-black border-dashed">
                    <p className="font-display text-xl uppercase text-black">Questions? Contact support: <code className="bg-black text-[#ccff00] px-2 py-1 ml-2">akhil@realaiexamples.com</code></p>
                </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
