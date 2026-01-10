import Head from 'next/head'
import Navbar from '../components/Navbar'
import NewsletterForm from '../components/NewsletterForm'
import Footer from '../components/Footer'

export default function StateOfAI() {
  const pageTitle = "The State of AI 2026: Statistics & Trends";
  const pageDescription = "Comprehensive statistics on AI adoption, generative AI market size, and ROI for 2026. Data-backed insights for business leaders.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <div className="min-h-screen bg-primary-bg font-sans text-text-color">
        <Navbar />

        {/* Hero Section */}
        <div className="relative border-b border-navy-dark bg-secondary-bg py-16 sm:py-24">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl sm:text-6xl font-headline font-bold mb-6 text-text-color uppercase tracking-tight">
              The State of AI <span className="text-accent">2026</span>
            </h1>
            <p className="text-xl text-text-secondary font-mono mb-8 max-w-2xl mx-auto">
              Adoption is no longer the goal—ROI is. Here are the 50+ statistics defining the artificial intelligence landscape this year.
            </p>
            <div className="inline-block px-4 py-2 border border-accent/30 rounded-full bg-accent/10 text-accent font-mono text-sm">
              Updated: January 2026
            </div>
          </div>
        </div>

        {/* Hero Stats Cards */}
        <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-bg border border-navy-light p-8 shadow-xl hover:border-accent transition-colors group">
              <div className="text-5xl font-headline font-bold text-accent mb-2 group-hover:scale-105 transition-transform">88%</div>
              <div className="text-lg font-bold text-text-color mb-3">Organization Adoption</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Of organizations now use AI in at least one business function, up from just 20% in 2017.
              </p>
            </div>
            
            <div className="bg-primary-bg border border-navy-light p-8 shadow-xl hover:border-accent transition-colors group">
              <div className="text-5xl font-headline font-bold text-accent mb-2 group-hover:scale-105 transition-transform">79%</div>
              <div className="text-lg font-bold text-text-color mb-3">GenAI Usage</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                Adoption of Generative AI has nearly tripled since 2023, becoming a standard tool in 3/4 companies.
              </p>
            </div>

            <div className="bg-primary-bg border border-navy-light p-8 shadow-xl hover:border-accent transition-colors group">
              <div className="text-5xl font-headline font-bold text-accent mb-2 group-hover:scale-105 transition-transform">10.3x</div>
              <div className="text-lg font-bold text-text-color mb-3">Top Performer ROI</div>
              <p className="text-text-secondary text-sm leading-relaxed">
                High-performing organizations are seeing over 10x returns on their AI investments within 12 months.
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          
          {/* Section 1: The Shift to Agents */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 border-l-4 border-accent pl-4">
              1. The Rise of AI Agents
            </h2>
            <div className="bg-secondary-bg border border-navy-dark p-6 mb-8">
              <p className="text-lg mb-4">
                2026 is being called the "Year of the Agent." We are moving beyond chat interfaces to autonomous systems that execute tasks.
              </p>
              <ul className="space-y-4 font-mono text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="text-accent mr-2">➜</span>
                  <span><strong>52%</strong> of enterprises are actively using AI agents as of late 2025.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">➜</span>
                  <span><strong>39%</strong> of large companies have launched more than 10 autonomous agents.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">➜</span>
                  <span><strong>15%</strong> of routine work decisions will be made autonomously by agentic AI by 2028 (Gartner).</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Market Size Visualization (CSS Bar Chart) */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 border-l-4 border-accent pl-4">
              2. Market Growth Forecast
            </h2>
            <p className="mb-6 text-text-secondary">
              The generative AI market is exploding. While estimates vary, the trajectory is undeniable.
            </p>
            
            <div className="bg-secondary-bg p-8 border border-navy-dark">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-mono">
                    <span>DemandSage (Conservative)</span>
                    <span className="text-accent">$37.89B</span>
                  </div>
                  <div className="w-full bg-navy-dark h-4 rounded-sm overflow-hidden">
                    <div className="bg-text-secondary h-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1 font-mono">
                    <span>Grand View Research</span>
                    <span className="text-accent">$69.85B</span>
                  </div>
                  <div className="w-full bg-navy-dark h-4 rounded-sm overflow-hidden">
                    <div className="bg-accent/70 h-full" style={{ width: '55%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1 font-mono">
                    <span>UMU Projection (Bull Case)</span>
                    <span className="text-accent">$126B</span>
                  </div>
                  <div className="w-full bg-navy-dark h-4 rounded-sm overflow-hidden">
                    <div className="bg-accent h-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center mt-6 text-text-secondary opacity-60">
                Figure 1: Projected 2026 Generative AI Market Size by Source
              </p>
            </div>
          </div>

          {/* Section 3: Workforce & Productivity */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8 border-l-4 border-accent pl-4">
              3. Workforce Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-navy-dark p-6 hover:bg-secondary-bg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-accent">Productivity Boost</h3>
                <p className="text-3xl font-headline mb-2">40-60 min</p>
                <p className="text-sm text-text-secondary">
                  Average time saved per day by daily AI users.
                </p>
              </div>
              <div className="border border-navy-dark p-6 hover:bg-secondary-bg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-accent">Worker Sentiment</h3>
                <p className="text-3xl font-headline mb-2">75%</p>
                <p className="text-sm text-text-secondary">
                  Of workers say AI improves the quality of their output.
                </p>
              </div>
              <div className="border border-navy-dark p-6 hover:bg-secondary-bg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-accent">Management Usage</h3>
                <p className="text-3xl font-headline mb-2">33%</p>
                <p className="text-sm text-text-secondary">
                  Of managers use AI daily, outpacing the 27% of general white-collar workers.
                </p>
              </div>
              <div className="border border-navy-dark p-6 hover:bg-secondary-bg transition-colors">
                <h3 className="font-bold text-lg mb-2 text-accent">Investment</h3>
                <p className="text-3xl font-headline mb-2">92%</p>
                <p className="text-sm text-text-secondary">
                  Of companies plan to increase AI budget in the next 3 years.
                </p>
              </div>
            </div>
          </div>

          {/* Sources Section */}
          <div className="mt-20 pt-10 border-t border-navy-dark text-sm text-text-secondary">
            <h4 className="font-bold mb-4 uppercase tracking-widest text-xs">Sources & Methodology</h4>
            <p className="mb-4 opacity-80">
              This report aggregates data from major 2024-2025 industry reports including McKinsey, Gartner, Google Cloud, and Grand View Research. Projections for 2026 are based on CAGR estimates from these primary sources.
            </p>
          </div>

        </div>

        {/* CTA Section */}
        <div className="bg-secondary-bg border-t border-navy-dark py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">
              Don't just read the stats. <span className="text-accent">Be the stat.</span>
            </h2>
            <p className="text-text-secondary mb-8">
              Join 5,000+ others getting practical AI workflows delivered weekly.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
