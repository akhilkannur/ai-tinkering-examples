import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
        <meta name="description" content="Read our privacy policy to understand how we collect and protect your personal data." key="description" />
      </Head>

      <Navbar />

      <main className="pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-4xl relative">
          <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none">
             <div className="font-mono text-[200px] font-black uppercase leading-none">SECURE</div>
          </div>

          <div className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Privacy & Security</div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-12 text-white tracking-tighter uppercase italic">Privacy Policy</h1>
          
          <div className="bg-secondary-bg/50 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
            
            <div className="prose prose-invert max-w-none prose-sm md:prose-base text-text-secondary font-light leading-relaxed space-y-8 relative z-10">
                <p className="font-mono text-xs text-accent">Last Updated: January 17, 2026</p>
                
                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">1. Introduction</h2>
                    <p>Welcome to Real AI Examples ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">2. Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you, including:</p>
                    <ul className="list-disc ml-6 space-y-2 font-mono text-xs">
                        <li><strong className="text-white">Identity Data:</strong> Email address (if you subscribe to our newsletter).</li>
                        <li><strong className="text-white">Technical Data:</strong> IP address, browser type, and system fingerprint.</li>
                        <li><strong className="text-white">Usage Data:</strong> Information about how you interact with our blueprints.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">3. How We Use Your Data</h2>
                    <p>We use your data to provide our services, including sending newsletters if you have opted in, and to improve our repository through anonymous usage analytics.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">4. Third-Party Services</h2>
                    <p>We use third-party services like Google Analytics and Meta Pixel to help us understand how our site is used. These services may collect information sent by your browser as part of a web page request.</p>
                </section>

                <section className="pt-8 border-t border-white/5">
                    <p>If you have any questions about this privacy protocol, please contact us at: <code className="text-accent">akhil@realaiexamples.com</code></p>
                </section>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-text-secondary text-[10px] bg-[#0B1120] font-mono uppercase tracking-[0.3em] opacity-40">
        <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} REAL_AI_EXAMPLES_DPT. ALL_RIGHTS_RESERVED.</p>
        </div>
      </footer>
    </div>
  )
}