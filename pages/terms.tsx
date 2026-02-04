import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Terms() {
  return (
    <div className="min-h-screen bg-primary-bg font-sans text-text-color selection:bg-accent/30 overflow-x-hidden">
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our blueprints and skills." key="description" />
      </Head>

      <Navbar />

      <main className="pt-40 pb-24">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <div className="text-center mb-16">
            <div className="text-accent font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Terms of Service</div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic text-white">Access Terms</h1>
          </div>
          
          <div className="bg-secondary-bg/50 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
            
            <div className="prose prose-invert max-w-none prose-sm md:prose-base text-text-secondary font-light leading-relaxed space-y-8 relative z-10">
                <p className="font-mono text-xs text-accent">Last Updated: January 17, 2026</p>
                
                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">1. Agreement to Terms</h2>
                    <p>By accessing or using Real AI Examples, you agree to be bound by these Terms of Service. If you do not agree, do not access our repository or download our assets.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">2. Intellectual Property</h2>
                    <p>All blueprints, code snippets, and skills provided on this site are the intellectual property of Real AI Examples. You are granted a non-exclusive license to use them for personal or professional workflows, but you may not resell them as standalone products.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">3. Limitation of Liability</h2>
                    <p>AI models can be unpredictable. We provide these blueprints "as is" and are not responsible for any data loss, system errors, or financial damages resulting from the execution of our instructions.</p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight mb-4">4. Usage Guidelines</h2>
                    <p>You agree not to use our blueprints for generating illegal content, spam, or malicious software. Violation of these rules will result in immediate termination of your access.</p>
                </section>

                <section className="pt-8 border-t border-white/5">
                    <p>System questions? Contact terminal support: <code className="text-accent">akhil@realaiexamples.com</code></p>
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