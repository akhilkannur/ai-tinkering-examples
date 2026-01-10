import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import NewsletterForm from '../components/NewsletterForm'
import Footer from '../components/Footer'

export default function StateOfAI() {
  const pageTitle = "State of Practical AI 2026: The Operator's Report";
  const pageDescription = "The unvarnished truth about AI in 2026. Reply rates are down, hallucinations are real, but the winners are saving 90% on costs. Here is the tactical data.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />

        {/* Header: Tactical Briefing Style */}
        <div className="bg-secondary-bg border-b border-navy-dark py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-block px-3 py-1 border border-accent text-accent font-mono text-xs uppercase tracking-widest mb-4">
              Intelligence Report • Jan 2026
            </div>
            <h1 className="text-3xl sm:text-5xl font-headline font-bold mb-6 text-text-color uppercase tracking-tight">
              The State of <br className="hidden sm:block" />
              <span className="text-accent bg-accent/10 px-2">Practical AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary font-mono max-w-2xl leading-relaxed">
              Forget "Market Cap." This report covers reply rates, hallucination costs, and the actual ROI of AI agents in the field.
            </p>
          </div>
        </div>

        {/* Section 1: The Cold Email Crisis (Contrarian) */}
        <div className="max-w-4xl mx-auto px-4 py-16 border-b border-navy-dark">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-headline font-bold text-red-400 mb-2">
                ⚠ The "Spam" Crisis
              </h2>
              <p className="text-text-secondary max-w-md">
                Generic AI outreach is dying. Volume is up, but reply rates have crashed.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-secondary-bg p-6 border border-red-900/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 text-9xl font-bold text-red-500 leading-none pointer-events-none">📉</div>
              <div className="relative z-10">
                <div className="text-4xl font-mono font-bold text-red-400 mb-1">5-10%</div>
                <div className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">Avg. Reply Rate</div>
                <p className="text-sm text-text-secondary">
                  Standard "AI-generated" cold emails are being ignored at record rates in 2026 due to lack of personalization.
                </p>
              </div>
            </div>

            <div className="bg-secondary-bg p-6 border border-green-900/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10 text-9xl font-bold text-green-500 leading-none pointer-events-none">📈</div>
              <div className="relative z-10">
                <div className="text-4xl font-mono font-bold text-green-400 mb-1">35%+</div>
                <div className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4">Deep Personalization</div>
                <p className="text-sm text-text-secondary">
                  Campaigns using AI for <strong>signal-based research</strong> (not just writing) are seeing 3x engagement.
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Link */}
          <div className="mt-8 p-4 border border-accent/30 bg-accent/5 flex items-center justify-between">
            <div className="text-sm font-mono text-accent">
              <span className="font-bold mr-2">TACTIC:</span>
              Don't let AI write the email. Let it research the prospect.
            </div>
            <Link href="/ai-examples/sales/autonomous-sales-sniper" className="text-sm font-bold underline decoration-accent underline-offset-4 hover:text-white transition-colors">
              Get the Recipe →
            </Link>
          </div>
        </div>

        {/* Section 2: The Hallucination Tax (The Hidden Cost) */}
        <div className="max-w-4xl mx-auto px-4 py-16 border-b border-navy-dark">
          <h2 className="text-2xl font-headline font-bold mb-8">
            The "Hallucination Tax"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-1 md:col-span-2 bg-secondary-bg p-8 border border-navy-light">
              <h3 className="font-bold text-lg mb-4 text-accent">Fact-Checking Time</h3>
              <div className="flex items-end mb-2">
                <span className="text-5xl font-mono font-bold">4.3</span>
                <span className="text-xl ml-2 mb-2 text-text-secondary">hours/week</span>
              </div>
              <p className="text-sm text-text-secondary">
                The average knowledge worker spends over 4 hours weekly just verifying AI outputs. Blind trust is expensive.
              </p>
            </div>

            <div className="bg-secondary-bg p-8 border border-navy-light flex flex-col justify-center">
              <div className="text-3xl font-mono font-bold text-red-400 mb-2">18.7%</div>
              <div className="text-xs uppercase tracking-widest text-text-secondary">Error Rate (Legal)</div>
              <p className="text-xs text-text-secondary mt-2">
                Domain-specific tasks (like Legal/Medical) still see high hallucination rates in 2026.
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 border border-accent/30 bg-accent/5 flex items-center justify-between">
            <div className="text-sm font-mono text-accent">
              <span className="font-bold mr-2">TACTIC:</span>
              Always use "Human-in-the-Loop" for high-stakes outputs.
            </div>
            <Link href="/ai-examples/operations/contract-risk-detector" className="text-sm font-bold underline decoration-accent underline-offset-4 hover:text-white transition-colors">
              Get the Recipe →
            </Link>
          </div>
        </div>

        {/* Section 3: The Cost Arbitrage (The Big Win) */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-headline font-bold mb-8 text-green-400">
            The 50x Arbitrage
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl">
            Why are companies moving to AI Agents despite the flaws? The economics are undeniable for routine support tasks.
          </p>

          <div className="bg-secondary-bg border border-navy-dark p-8">
            <div className="space-y-8">
              {/* Human Cost Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2 font-mono">
                  <span>Human Agent Interaction</span>
                  <span className="text-red-400">~$5.00</span>
                </div>
                <div className="w-full bg-navy-dark h-8 rounded-sm overflow-hidden relative">
                  <div className="bg-red-500/80 h-full flex items-center px-4 text-xs font-bold text-white" style={{ width: '100%' }}>
                    Labor + Overhead + Training
                  </div>
                </div>
              </div>

              {/* AI Cost Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2 font-mono">
                  <span>AI Agent Interaction</span>
                  <span className="text-green-400">~$0.10</span>
                </div>
                <div className="w-full bg-navy-dark h-8 rounded-sm overflow-hidden relative">
                  <div className="bg-green-500 h-full flex items-center px-2 text-xs font-bold text-navy-dark" style={{ width: '5%' }}>
                    API
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-text-secondary">
                <strong>Result:</strong> 90% cost reduction for Tier 1 support tickets.
              </p>
            </div>
          </div>

           <div className="mt-8 p-4 border border-accent/30 bg-accent/5 flex items-center justify-between">
            <div className="text-sm font-mono text-accent">
              <span className="font-bold mr-2">TACTIC:</span>
              Start by automating "Level 1" support and routine queries.
            </div>
            <Link href="/ai-examples/customer-support/help-center-gap-finder" className="text-sm font-bold underline decoration-accent underline-offset-4 hover:text-white transition-colors">
              Get the Recipe →
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-secondary-bg border-t border-navy-dark py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">
              Turn this intel into <span className="text-accent">action.</span>
            </h2>
            <p className="text-text-secondary mb-8">
              We track the tools that actually work. Join 5,000+ tinkerers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
