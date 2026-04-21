import Head from 'next/head'

export default function Terms() {
  return (
    <div className="font-sans text-micro-fg selection:bg-terminal-lime selection:text-micro-bg">
      <Head>
        <title>Terms of Service | Real AI Examples</title>
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using our content." key="description" />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-micro-muted mb-12">Last Updated: April 21, 2026</p>

        <div className="space-y-12">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-micro-muted mb-4">Agreement</h2>
            <p className="text-lg font-medium leading-relaxed text-micro-fg/90">
              By accessing Real AI Examples, you agree to be bound by these Terms of Service. If you do not agree to these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-micro-muted mb-4">Intellectual Property</h2>
            <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
              All content, including examples and workflows, is the property of Real AI Examples. <strong className="text-micro-fg">Republishing or reselling our curated content without explicit permission is strictly prohibited.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-micro-muted mb-4">Disclaimer</h2>
            <p className="text-lg font-medium leading-relaxed text-micro-fg/80">
              The Service is provided "as is." We do not warrant that the workflows or prompts will be error-free or meet specific requirements. 
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
