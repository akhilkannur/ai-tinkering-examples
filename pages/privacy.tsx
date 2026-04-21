import Head from 'next/head'

export default function Privacy() {
  return (
    <div className="font-sans text-micro-fg selection:bg-terminal-lime selection:text-micro-bg">
      <Head>
        <title>Privacy Policy | Real AI Examples</title>
        <meta name="description" content="Read our privacy policy to understand how we collect and protect your personal data." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-micro-muted mb-12">Last Updated: April 21, 2026</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-micro-muted mb-4">Introduction</h2>
            <p className="text-lg font-medium leading-relaxed text-micro-fg/90">
              Welcome to Real AI Examples. We respect your privacy and are committed to protecting your personal data. This policy outlines how we handle your information.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-micro-muted mb-4">Data Collection</h2>
            <div className="space-y-4">
              <p className="text-lg font-medium leading-relaxed text-micro-fg/80">We collect minimal data to ensure the platform functions efficiently:</p>
              <ul className="space-y-4">
                <li className="text-lg font-medium"><strong className="text-micro-fg">Identity Data:</strong> Email address for newsletter delivery.</li>
                <li className="text-lg font-medium"><strong className="text-micro-fg">Technical Data:</strong> Anonymized metrics for performance optimization.</li>
                <li className="text-lg font-medium"><strong className="text-micro-fg">Usage Data:</strong> Interaction patterns to improve workflow value.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-micro-muted mb-4">Usage & Security</h2>
            <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
              We do not sell your personal data. All information is stored using industry-standard security protocols to prevent unauthorized access.
            </p>
          </section>

          <footer className="pt-12 border-t border-micro-layer-1">
            <p className="text-base font-medium text-micro-fg/60">
              Questions? <a href="mailto:akhil@realaiexamples.com" className="text-micro-fg underline decoration-terminal-lime decoration-2 underline-offset-4 hover:text-terminal-lime transition-colors">akhil@realaiexamples.com</a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  )
}
