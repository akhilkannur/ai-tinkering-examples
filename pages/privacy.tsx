import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-black selection:bg-[#ff00ff] selection:text-white overflow-x-hidden">
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
        <meta name="description" content="Read our privacy policy to understand how we collect and protect your personal data." key="description" />
      </Head>

      <Navbar />

      <main className="pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <div className="font-display text-[120px] font-black uppercase leading-none text-black rotate-12">SECURE</div>
          </div>

          <div className="inline-flex items-center gap-2 bg-black text-[#00ffff] border-2 border-black px-4 py-1.5 font-black text-xs uppercase mb-8 transform -rotate-1 brutalist-shadow-sm">
            Privacy & Security Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-display mb-12 text-black uppercase leading-[0.9] glitch-text" data-text="PRIVACY POLICY">Privacy Policy</h1>
          
          <div className="bg-white border-4 border-black p-8 md:p-12 brutalist-shadow relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="max-w-none space-y-10 relative z-10">
                <p className="font-black font-mono text-xs uppercase tracking-widest bg-black text-[#ccff00] inline-block px-2 py-1">Last Updated: January 17, 2026</p>
                
                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#ff00ff]">1. Introduction</h2>
                    <p className="font-bold leading-relaxed text-lg uppercase tracking-tight font-mono">// Welcome to Real AI Examples. We respect your privacy and are committed to protecting your personal data.</p>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#ccff00]">2. Data We Collect</h2>
                    <p className="font-bold leading-relaxed mb-6 uppercase tracking-tight font-mono">// We may collect, use, and store different kinds of data:</p>
                    <ul className="space-y-4 font-black font-mono text-xs uppercase">
                        <li className="flex items-start gap-3"><span className="bg-[#ff00ff] text-white px-1">IDENTITY:</span> Email address (if you subscribe).</li>
                        <li className="flex items-start gap-3"><span className="bg-[#ccff00] text-black px-1">TECHNICAL:</span> IP address, browser type, system fingerprint.</li>
                        <li className="flex items-start gap-3"><span className="bg-[#00ffff] text-black px-1">USAGE:</span> Information about how you interact with blueprints.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl md:text-3xl font-display text-black uppercase mb-4 decoration-wavy underline decoration-[#00ffff]">3. Usage</h2>
                    <p className="font-bold leading-relaxed uppercase tracking-tight font-mono">// We use your data to provide services, including newsletters, and to improve our repository through anonymous usage analytics.</p>
                </section>

                <section className="pt-12 border-t-4 border-black border-dashed">
                    <p className="font-display text-xl uppercase">Questions? Contact us at: <code className="bg-black text-[#ccff00] px-2 py-1 ml-2">akhil@realaiexamples.com</code></p>
                </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
