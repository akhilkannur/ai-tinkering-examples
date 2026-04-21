import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen bg-micro-bg font-sans text-micro-fg selection:bg-terminal-lime selection:text-micro-bg">
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our content." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Navbar />

      <main className="pt-32 md:pt-48 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-20">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">Terms of <br/><span className="font-instrument font-normal italic lowercase opacity-60">Service</span></h1>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-micro-muted mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-terminal-lime"></span>
              Last Updated: April 21, 2026
            </p>
          </header>

          <div className="space-y-16 max-w-3xl">
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">01 / Agreement</h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-micro-fg/90">
                By accessing Real AI Examples ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">02 / Intellectual Property</h2>
              <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
                All content, including examples, workflows, and curated prompts, is the property of Real AI Examples. You are granted a limited license for personal or professional use. <strong className="text-micro-fg">Republishing, scraping, or reselling our curated content without explicit permission is strictly prohibited.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">03 / Disclaimer</h2>
              <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
                The Service is provided "as is." AI is an evolving field; we do not warrant that the workflows or prompts will be error-free or meet specific requirements. We are not responsible for any outcomes resulting from the implementation of these examples.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">04 / Prohibited Use</h2>
              <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
                You agree not to use the Service for any unlawful purpose, to infringe upon our intellectual property, or to participate in any activity that disrupts the platform's performance for other users.
              </p>
            </section>

            <footer className="pt-20 border-t border-micro-layer-1">
              <p className="text-lg font-medium text-micro-fg/60">
                Questions about our terms? Contact: <a href="mailto:akhil@realaiexamples.com" className="text-micro-fg underline decoration-terminal-lime decoration-2 underline-offset-8 hover:text-terminal-lime transition-colors">akhil@realaiexamples.com</a>
              </p>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
