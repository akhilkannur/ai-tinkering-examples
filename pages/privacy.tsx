import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-micro-bg font-sans text-micro-fg selection:bg-terminal-lime selection:text-micro-bg">
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
        <meta name="description" content="Read our privacy policy to understand how we collect and protect your personal data." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Navbar />

      <main className="pt-32 md:pt-48 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-20">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.9]">Privacy <br/><span className="font-instrument font-normal italic lowercase opacity-60">Policy</span></h1>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-micro-muted mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-terminal-lime"></span>
              Last Updated: April 21, 2026
            </p>
          </header>

          <div className="space-y-16 max-w-3xl">
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">01 / Introduction</h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-micro-fg/90">
                Welcome to Real AI Examples. We respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your information in a way that allows us to provide a better service without compromising your security.
              </p>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">02 / Data Collection</h2>
              <div className="space-y-8">
                <p className="text-lg font-medium leading-relaxed text-micro-fg/80">We collect minimal data to ensure the platform functions efficiently:</p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <span className="font-mono text-terminal-lime">01</span>
                    <p className="text-lg font-medium"><strong className="text-micro-fg">Identity Data:</strong> Your email address, used exclusively for newsletter delivery if you opt-in.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-terminal-lime">02</span>
                    <p className="text-lg font-medium"><strong className="text-micro-fg">Technical Data:</strong> Anonymized metrics including browser type and device information for internal performance optimization.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-terminal-lime">03</span>
                    <p className="text-lg font-medium"><strong className="text-micro-fg">Usage Data:</strong> Aggregated interaction patterns to help us understand which AI workflows provide the most value.</p>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-micro-muted mb-6">03 / Usage & Security</h2>
              <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
                We use your data to improve the platform and communicate updates. We do not sell your personal data. All information is stored using industry-standard security protocols to prevent unauthorized access or accidental loss.
              </p>
            </section>

            <footer className="pt-20 border-t border-micro-layer-1">
              <p className="text-lg font-medium text-micro-fg/60">
                Questions about your data? Reach out: <a href="mailto:akhil@realaiexamples.com" className="text-micro-fg underline decoration-terminal-lime decoration-2 underline-offset-8 hover:text-terminal-lime transition-colors">akhil@realaiexamples.com</a>
              </p>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
